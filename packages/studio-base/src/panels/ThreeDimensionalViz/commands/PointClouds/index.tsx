// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import { useRef, useState } from "react";
import type REGL from "regl";

import { filterMap } from "@foxglove/den/collection";
import {
  Command,
  withPose,
  CommonCommandProps,
  AssignNextColorsFn,
  MouseEventObject,
  vec4ToRGBA,
  BaseShape,
  defaultBlend,
} from "@foxglove/regl-worldview";
import { toRgba } from "@foxglove/studio-base/panels/ThreeDimensionalViz/commands/PointClouds/selection";
import {
  DEFAULT_FLAT_COLOR,
  DEFAULT_MAX_COLOR,
  DEFAULT_MIN_COLOR,
} from "@foxglove/studio-base/panels/ThreeDimensionalViz/utils/pointCloudColors";
import { mightActuallyBePartial } from "@foxglove/studio-base/util/mightActuallyBePartial";

import VertexBufferCache from "./VertexBufferCache";
import { FLOAT_SIZE } from "./buffers";
import { DecodedMarker, decodeMarker } from "./decodeMarker";
import { updateMarkerCache } from "./memoization";
import { MemoizedMarker, MemoizedVertexBuffer, PointCloudMarker, VertexBuffer } from "./types";

enum ShaderColorMode {
  FLAT,
  RGB,
  RGBA,
  GRADIENT,
  RAINBOW,
  TURBO,
}

type Uniforms = {
  pointSize: number;
  isCircle: boolean;
  alpha: number;
  colorMode: ShaderColorMode;
  flatColor: [number, number, number, number];
  minGradientColor: [number, number, number, number];
  maxGradientColor: [number, number, number, number];
  minColorFieldValue: number;
  maxColorFieldValue: number;
};
type Attributes = {
  position: MemoizedVertexBuffer;
  color: number[] | MemoizedVertexBuffer;
};

const vertexShaderForSingleColor = `
precision mediump float;

// this comes from the camera
uniform mat4 projection, view;

#WITH_POSE

attribute vec3 position;
attribute float color; // color values in range [0-255]

uniform float pointSize;
uniform lowp int colorMode;
uniform float alpha;
uniform vec4 flatColor;
uniform vec4 minGradientColor;
uniform vec4 maxGradientColor;
uniform float minColorFieldValue;
uniform float maxColorFieldValue;

varying vec4 fragColor;

float getFieldValue() {
  return color;
}

float getFieldValue_UNORM() {
  float value = getFieldValue();
  float colorFieldRange = maxColorFieldValue - minColorFieldValue;
  if (abs(colorFieldRange) < 0.00001) {
    return 0.0;
  }
  return max(0.0, min((value - minColorFieldValue) / colorFieldRange, 1.0));
}

vec3 gradientColor() {
  float pct = getFieldValue_UNORM();
  return mix(minGradientColor, maxGradientColor, pct).rgb;
}

// taken from http://docs.ros.org/jade/api/rviz/html/c++/point__cloud__transformers_8cpp_source.html
// line 47
vec3 rainbowColor() {
  float pct = getFieldValue_UNORM();
  float h = (1.0 - pct) * 5.0 + 1.0;
  float i = floor(h);
  float f = fract(h);
  // if i is even
  if (mod(i, 2.0) < 1.0) {
    f = 1.0 - f;
  }
  float n = 1.0 - f;
  vec3 ret = vec3(0);
  if (i <= 1.0) {
    ret = vec3(n, 0.0, 1.0);
  } else if (i == 2.0) {
    ret = vec3(0.0, n, 1.0);
  } else if (i == 3.0) {
    ret = vec3(0.0, 1.0, n);
  } else if (i == 4.0) {
    ret = vec3(n, 1.0, 0.0);
  } else {
    ret = vec3(1.0, n, 0.0);
  }
  return 255.0 * ret;
}

// adapted from https://gist.github.com/mikhailov-work/0d177465a8151eb6ede1768d51d476c7
vec3 turboColor() {
  const vec4 kRedVec4 = vec4(0.13572138, 4.61539260, -42.66032258, 132.13108234);
  const vec4 kGreenVec4 = vec4(0.09140261, 2.19418839, 4.84296658, -14.18503333);
  const vec4 kBlueVec4 = vec4(0.10667330, 12.64194608, -60.58204836, 110.36276771);
  const vec2 kRedVec2 = vec2(-152.94239396, 59.28637943);
  const vec2 kGreenVec2 = vec2(4.27729857, 2.82956604);
  const vec2 kBlueVec2 = vec2(-89.90310912, 27.34824973);

  // Clamp the input between [0.0, 1.0], then scale to the range [0.01, 1.0]
  float x = clamp(getFieldValue_UNORM(), 0.0, 1.0) * 0.99 + 0.01;
  vec4 v4 = vec4(1.0, x, x * x, x * x * x);
  vec2 v2 = v4.zw * v4.z;
  return vec3(
    255.0 * (dot(v4, kRedVec4)   + dot(v2, kRedVec2)),
    255.0 * (dot(v4, kGreenVec4) + dot(v2, kGreenVec2)),
    255.0 * (dot(v4, kBlueVec4)  + dot(v2, kBlueVec2))
  );
}

void main () {
  gl_PointSize = pointSize;
  vec3 p = applyPose(position);
  gl_Position = projection * view * vec4(p, 1);

  if (colorMode == ${ShaderColorMode.GRADIENT}) {
    fragColor = vec4(gradientColor(), alpha);
  } else if (colorMode == ${ShaderColorMode.RAINBOW}) {
    fragColor = vec4(rainbowColor(), alpha);
  } else if (colorMode == ${ShaderColorMode.TURBO}) {
    fragColor = vec4(turboColor(), alpha);
  } else {
    fragColor = vec4(flatColor.rgb, alpha);
  }
}
`;

const vertexShaderForRgbaColor = `
precision mediump float;

// this comes from the camera
uniform mat4 projection, view;

#WITH_POSE

attribute vec3 position;
attribute vec4 color; // color values in range [0-255]

uniform float pointSize;
uniform lowp int colorMode;

varying vec4 fragColor;

void main () {
  gl_PointSize = pointSize;
  vec3 p = applyPose(position);
  gl_Position = projection * view * vec4(p, 1);

  fragColor = color;
}
`;

const fragmentShader = `
precision mediump float;
varying vec4 fragColor;
uniform float alpha;
uniform bool isCircle;
uniform lowp int colorMode;
void main () {
  if (isCircle) {
    // gl_PointCoord give us the coordinate of this pixel relative to the current point's position
    // In order to render a circle, we normalize and compute the distance from the current point.
    // Discard any fragments that are too far away from the center
    vec3 normal;
    normal.xy = gl_PointCoord * 2.0 - 1.0;
    float r2 = dot(normal.xy, normal.xy);
    if (r2 > 1.0) {
      discard;
    }
  }
  if (colorMode == ${ShaderColorMode.RGBA}) {
    gl_FragColor = vec4(fragColor / 255.0);
  } else {
    gl_FragColor = vec4(fragColor.rgb / 255.0, alpha);
  }
}
`;

function getEffectiveColorMode(props: DecodedMarker): ShaderColorMode {
  const { settings, hitmapColors, blend } = props;
  if (hitmapColors) {
    // We're providing a colors array in RGB format
    return ShaderColorMode.RGB;
  }

  if (blend?.color) {
    // Force to `flat` mode if constant color is required for blending.
    return ShaderColorMode.FLAT;
  }

  const { colorMode } = settings;
  switch (colorMode.mode) {
    case "flat":
      return ShaderColorMode.FLAT;
    case "gradient":
      return ShaderColorMode.GRADIENT;
    case "rainbow":
      return ShaderColorMode.RAINBOW;
    case "turbo":
      return ShaderColorMode.TURBO;
    case "rgb":
      return ShaderColorMode.RGB;
    case "rgba":
      return ShaderColorMode.RGBA;
  }
}

// Implements a custom caching mechanism for vertex buffers.
// Any memoized vertex buffer needs to be re-created whenever the Regl context
// changes. That happens mostly when resizing the canvas or adding/removing new
// panels on Studio. Whenever Regl context changes, pointCloud() is called again
// and creates new instances for both position and color caches, leading to regenerating
// all buffers again.
// Memoized buffers are automatically deleted by WebGL whenever its context
// changes. There's no need to manually delete them.
const makePointCloudCommand = () => {
  // The same vertex buffer can be used for both positions and colors (see comments in color attribute below).
  // For that reason, we need to keep two independent caches.
  // We need to instantiate them outside of the actual command in order to provide independent
  // caches for each render pass. This prevents reseting caches when calling <PointClouds />
  // multiple times for the same frame, like when implementing highlighting.
  const positionBufferCache = new VertexBufferCache();
  const colorBufferCache = new VertexBufferCache();

  return (regl: REGL.Regl) => {
    const getCachedBuffer = (
      cache: VertexBufferCache,
      vertexBuffer: VertexBuffer,
    ): MemoizedVertexBuffer => {
      const { buffer, offset, stride } = vertexBuffer;
      let memoized = cache.get(vertexBuffer);
      if (
        !memoized ||
        memoized.vertexBuffer.buffer !== buffer ||
        memoized.offset !== FLOAT_SIZE * offset ||
        memoized.stride !== FLOAT_SIZE * stride
      ) {
        // If this is a new vertex buffer or if its content has changed somehow
        // (rendering to hitmap or different settings), create a new memoized
        // GPU buffer with the correct offset and stride and add it to the cache.
        memoized = {
          vertexBuffer,
          buffer: regl.buffer(buffer),
          offset: FLOAT_SIZE * offset,
          stride: FLOAT_SIZE * stride,
          divisor: 0,
        };
        cache.set(vertexBuffer, memoized);
      }
      return memoized;
    };

    const pointCloudCommand = withPose<
      Uniforms,
      Attributes,
      DecodedMarker,
      Record<string, never>,
      REGL.DefaultContext
    >({
      blend: defaultBlend,
      primitive: "points",
      vert: (_context, props) => {
        // We use different shaders for different color modes because the size of the color
        // attribute is different and we need to avoid out of bounds reads:
        // https://github.com/foxglove/studio/pull/1559
        const mode = getEffectiveColorMode(props);
        switch (mode) {
          case ShaderColorMode.RGB:
          case ShaderColorMode.RGBA:
            return vertexShaderForRgbaColor;
          case ShaderColorMode.FLAT:
          case ShaderColorMode.GRADIENT:
          case ShaderColorMode.RAINBOW:
          case ShaderColorMode.TURBO:
            return vertexShaderForSingleColor;
        }
      },
      frag: fragmentShader,
      attributes: {
        position: (_context, props) => {
          return getCachedBuffer(positionBufferCache, props.positionBuffer);
        },
        color: (_context, props) => {
          const { hitmapColors, settings, blend } = props;
          const { colorMode } = mightActuallyBePartial(settings);
          if (hitmapColors) {
            // If colors are provided, we use those instead what is indicated by colorMode
            // This is a common scenario when rendering to the hitmap, for example.
            // Unfortunately, we cannot memoize hitmap colors since new objects can be added
            // to the scene hierarchy at any time.
            return hitmapColors;
          }

          if (blend?.color) {
            // If a constant color is provided for blending, ignore point colors. Send positions
            // instead (see comments below).
            return getCachedBuffer(positionBufferCache, props.positionBuffer);
          }

          // If we're using "flat" color mode, we pass the actual color in a uniform (see uniforms below)
          // But we still need to provide some color buffer, even if it's not going to be used.
          // Instead of creating a dummy buffer, we just send the one we have for position.
          // TODO (Hernan): I tried using the constant option provided by Regl, but it leads to
          // visual artifacts. I need to check if this is a bug in Regl.
          const colorBuffer =
            colorMode == undefined || colorMode.mode === "flat"
              ? props.positionBuffer
              : props.colorBuffer;
          return getCachedBuffer(colorBufferCache, colorBuffer!);
        },
      },

      uniforms: {
        pointSize: (_context, props) => {
          return props.settings.pointSize ?? 2;
        },
        isCircle: (_context, props) => {
          return props.settings.pointShape != undefined
            ? props.settings.pointShape === "circle"
            : true;
        },
        alpha: (_context, props) => {
          return props.settings.alpha ?? 1.0;
        },
        colorMode: (_context, props) => getEffectiveColorMode(props),
        flatColor: (_context, props) => {
          if (props.blend?.color) {
            // Use constant color for blending.
            return toRgba(vec4ToRGBA(props.blend.color));
          }
          return toRgba(props.settings.colorMode.flatColor ?? DEFAULT_FLAT_COLOR);
        },
        minGradientColor: (_context, props) => {
          return toRgba(props.settings.colorMode.minColor ?? DEFAULT_MIN_COLOR);
        },
        maxGradientColor: (_context, props) => {
          return toRgba(props.settings.colorMode.maxColor ?? DEFAULT_MAX_COLOR);
        },
        minColorFieldValue: (_context, props) => {
          return props.minColorValue;
        },
        maxColorFieldValue: (_context, props) => {
          return props.maxColorValue;
        },
      },

      count: (_context, props) => {
        return props.pointCount;
      },
    });

    const command = regl(pointCloudCommand);

    return (props: DecodedMarker[]) => {
      // Call 'onPreRender' for both caches before rendering a frame.
      positionBufferCache.onPreRender();
      colorBufferCache.onPreRender();

      if (props.length > 0) {
        const { depth, blend } = props[0]!;
        if (depth || blend) {
          // If there are custom rendering states, we create a new command
          // with those values to render the markers. NOTE: This assumes that all
          // markers will be rendered with the same overrides, which might not
          // be the case in the future.
          regl({
            ...pointCloudCommand,
            depth,
            blend,
          })(props);
        } else {
          command(props);
        }
      }

      // Call 'onPostRender' for both caches after rendering a frame
      // This will delete any unused GPU buffer and prevent memory leaks.
      positionBufferCache.onPostRender();
      colorBufferCache.onPostRender();
    };
  };
};

function instancedGetChildrenForHitmap<
  T extends BaseShape & {
    hitmapColors?: Uint8Array | number[];
    width?: number;
    height?: number;
    settings?: {
      pointSize?: number;
    };
  },
>(props: T[], assignNextColors: AssignNextColorsFn, excludedObjects: MouseEventObject[]): T[] {
  return filterMap(props, (prop) => {
    // exclude all points if one has been interacted with because iterating through all points
    // in pointcloud object is expensive
    const isInExcludedObjects = excludedObjects.find(({ object }) => object === prop);
    if (isInExcludedObjects) {
      return undefined;
    }
    const hitmapProp = { ...prop };
    const { width, height } = prop;
    if (width == undefined || width === 0 || height == undefined || height === 0) {
      return undefined;
    }
    const instanceCount = Math.ceil(width * height);
    if (instanceCount < 1) {
      return undefined;
    }
    const idColors = assignNextColors(prop, instanceCount);
    const allColors = new Uint8Array(idColors.length * 4);
    idColors.forEach((color, idx) => {
      allColors[idx * 4 + 0] = color[0] * 255;
      allColors[idx * 4 + 1] = color[1] * 255;
      allColors[idx * 4 + 2] = color[2] * 255;
      allColors[idx * 4 + 3] = 255;
    });
    hitmapProp.hitmapColors = allColors;
    // expand the interaction area
    hitmapProp.settings = hitmapProp.settings ? { ...hitmapProp.settings } : {};
    hitmapProp.settings.pointSize = (hitmapProp.settings.pointSize ?? 2) * 5;
    return hitmapProp;
  });
}

type Props = CommonCommandProps & {
  // TypeScript doesn't allow us to pass an array variable if `children` is set to an array type here
  // https://github.com/microsoft/TypeScript/issues/30711#issuecomment-485013588
  children: React.ReactNode;

  clearCachedMarkers?: boolean;
};

export default function PointClouds({ children, clearCachedMarkers, ...rest }: Props): JSX.Element {
  const [command] = useState(() => makePointCloudCommand());
  const markerCache = useRef(new Map<Uint8Array, MemoizedMarker>());
  markerCache.current = updateMarkerCache(markerCache.current, children as PointCloudMarker[]);

  const decodedMarkers = !(clearCachedMarkers ?? false)
    ? [...markerCache.current.values()].map((decoded) => decoded.marker)
    : (children as PointCloudMarker[]).map(decodeMarker);
  return (
    <Command getChildrenForHitmap={instancedGetChildrenForHitmap} {...rest} reglCommand={command}>
      {decodedMarkers}
    </Command>
  );
}
