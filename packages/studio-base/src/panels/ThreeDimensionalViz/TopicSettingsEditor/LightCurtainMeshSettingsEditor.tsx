// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Box, Stack } from "@mui/material";

import ColorPicker from "@foxglove/studio-base/components/ColorPicker";
import { SLabel } from "@foxglove/studio-base/panels/ThreeDimensionalViz/Interactions/styling";
import { DEFAULT_COLOR } from "@foxglove/studio-base/panels/ThreeDimensionalViz/commands/LightCurtainMesh";
import { Color, LightCurtainMesh } from "@foxglove/studio-base/types/Messages";
import { colors } from "@foxglove/studio-base/util/sharedStyleConstants";

import { TopicSettingsEditorProps } from ".";


export type LightCurtainMeshSettings = {
  color?: Color;
};

export default function LightCurtainMeshSettingsEditor(
  props: TopicSettingsEditorProps<LightCurtainMesh, LightCurtainMeshSettings>,
): JSX.Element {
  const { message, settings, onFieldChange } = props;

  if (!message) {
    return (
      <Box color={colors.TEXT_MUTED}>
        <small>Waiting for messages...</small>
      </Box>
    );
  }

  return (
    <Stack flex="auto">
      <SLabel>Color</SLabel>
      <ColorPicker
        color={settings.color ?? DEFAULT_COLOR}
        onChange={(newColor) => onFieldChange("color", newColor)}
        alphaType="alpha"
      />
    </Stack>
  );
}
