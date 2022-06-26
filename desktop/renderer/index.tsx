// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

// Make Electron type definitions available globally, such as extensions to File and other built-ins
/// <reference types="electron" />

import * as Sentry from "@sentry/electron/renderer";
import { BrowserTracing } from "@sentry/tracing";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { Sockets } from "@foxglove/electron-socket/renderer";
import Logger from "@foxglove/log";
import {
  AppSetting,
  installDevtoolsFormatters,
  overwriteFetch,
  waitForFonts,
} from "@foxglove/studio-base";

import pkgInfo from "../../package.json";
import { Storage } from "../common/types";
import Root from "./Root";
import NativeStorageAppConfiguration from "./services/NativeStorageAppConfiguration";

const log = Logger.getLogger(__filename);

log.debug("initializing renderer");

// preload injects the crash reporting global based on app settings received from the main process
const isCrashReportingEnabled =
  (global as { allowCrashReporting?: boolean }).allowCrashReporting ?? false;

if (isCrashReportingEnabled && typeof process.env.SENTRY_DSN === "string") {
  log.info("initializing Sentry in renderer");
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    autoSessionTracking: true,
    release: `${process.env.SENTRY_PROJECT}@${pkgInfo.version}`,
    // Remove the default breadbrumbs integration - it does not accurately track breadcrumbs and
    // creates more noise than benefit.
    integrations: (integrations) => {
      return integrations
        .filter((integration) => integration.name !== "Breadcrumbs")
        .concat([
          new BrowserTracing({
            startTransactionOnLocationChange: false, // location changes as a result of non-navigation interactions such as seeking
          }),
        ]);
    },
    tracesSampleRate: 0.05,
  });
}

installDevtoolsFormatters();
overwriteFetch();

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("missing #root element");
}

const isDevelopment = process.env.NODE_ENV === "development";

async function main() {
  // Initialize the RPC channel for electron-socket. This method is called first
  // since the window.onmessage handler needs to be installed before
  // window.onload fires
  await Sockets.Create();

  // consider moving waitForFonts into App to display an app loading screen
  await waitForFonts();

  const appConfiguration = await NativeStorageAppConfiguration.Initialize(
    (global as { storageBridge?: Storage }).storageBridge!,
    {
      defaults: {
        [AppSetting.OPEN_DIALOG]: true,
        [AppSetting.ENABLE_REACT_STRICT_MODE]: isDevelopment,
        [AppSetting.EXPERIMENTAL_BAG_PLAYER]: true,
        [AppSetting.EXPERIMENTAL_DATA_PLATFORM_PLAYER]: isDevelopment,
        [AppSetting.EXPERIMENTAL_MCAP_PLAYER]: isDevelopment,
      },
    },
  );

  const enableStrictMode = appConfiguration.get(AppSetting.ENABLE_REACT_STRICT_MODE) as boolean;
  const root = <Root appConfiguration={appConfiguration} />;
  ReactDOM.render(enableStrictMode ? <StrictMode>{root}</StrictMode> : root, rootEl, () => {
    // Integration tests look for this console log to indicate the app has rendered once
    log.debug("App rendered");
  });
}

void main();
