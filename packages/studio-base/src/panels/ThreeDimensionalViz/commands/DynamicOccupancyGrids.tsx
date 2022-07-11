// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import type REGL from "regl";

import { Command, withPose, defaultBlend, CommonCommandProps } from "@foxglove/regl-worldview";
import { TextureCache } from "@foxglove/studio-base/panels/ThreeDimensionalViz/commands/utils";
import { DynamicOccupancyGridMessage } from "@foxglove/studio-base/types/Messages";

type Uniforms = {
  width: number;
  height: number;
  resolution: number;
  alpha: number;
  data: REGL.Texture2D;
};
type Attributes = {
  point: REGL.Buffer;
};
type CommandProps = DynamicOccupancyGridMessage;

function getTextureOptions(marker:DynamicOccupancyGridMessage): REGL.Texture2DOptions
{
  const { info, occupancy, velocity_x, velocity_z } = marker;

  const data = new Uint8Array(3 * occupancy.length);
  for (let i = 0; i < occupancy.length; i++)
  {
    data[3 * i + 0] = occupancy[i]!;  // in [0, 100]
    data[3 * i + 1] = 125 + velocity_x[i]!;  // now in [0, 250]
    data[3 * i + 2] = 125 + velocity_z[i]!;  // now in [0, 250]
  }

  return {
    format: "rgb",
    mipmap: false,
    data,
    width: info.width,
    height: info.height,
  };
}

const dynamicOoccupancyGrids = (regl: REGL.Regl) => {
  // make a buffer holding the verticies of a 1x1 plane
  // it will be resized in the shader
  const positionBuffer = regl.buffer([0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0]);

  const cache = new TextureCache(regl, getTextureOptions);

  return withPose<Uniforms, Attributes, CommandProps, Record<string, never>, REGL.DefaultContext>({
    primitive: "triangle strip",

    vert: `
    precision lowp float;

    uniform mat4 projection, view;
    uniform float width, height, resolution, alpha;

    attribute vec3 point;

    #WITH_POSE

    varying vec2 uv;
    varying float vAlpha;

    void main () {
      // set the texture uv to the unscaled vertext point
      uv = vec2(point.x, point.y);

      // compute the plane vertex dimensions
      float planeWidth = width * resolution;
      float planeHeight = height * resolution;

      vec3 loc = applyPose(point * vec3(planeWidth, planeHeight, 1.));
      vAlpha = alpha;
      gl_Position = projection * view * vec4(loc, 1);
    }
    `,
    frag: `
    precision lowp float;

    varying vec2 uv;
    varying float vAlpha;

    uniform sampler2D data;

    // taken from https://stackoverflow.com/a/17897228/1814274
    vec3 hsv2rgb(vec3 c)
    {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main () {
      // look up the point in our data texture corresponding to
      // the current point being shaded
      vec4 point = texture2D(data, uv);

      float  o = point.r * 2.55; // lies in [0, 1]
      float vx = point.g * 2.04 - 1.0; // lies in [-1, 1]
      float vz = point.b * 2.04 - 1.0; // lies in [-1, 1]

      // compute hsv from occupancy and velocity
      // TODO: computing hsv on the CPU instead of the GPU might speed things up
      float h = 0.5 + 0.5 * (atan(vz, vx) / 3.14159265359);  // lies in [0, 1]
      float s = min(sqrt(vx * vx + vz * vz), 1.0); // lies in [0, 1]
      float v = o;  // lies in [0, 1]

      vec3 color = hsv2rgb(vec3(h, s, v));
      gl_FragColor = vec4(color.r, color.g, color.b, vAlpha);
    }
    `,
    blend: defaultBlend,

    depth: { enable: true, mask: false },

    attributes: {
      point: positionBuffer,
    },

    uniforms: {
      width: regl.prop("info.width"),
      height: regl.prop("info.height"),
      resolution: regl.prop("info.resolution"),
      // make alpha a uniform so in the future it can be controlled by topic settings
      alpha: (_context, props) => {
        // TODO: expose a topic setting in studio so that the user can control this
        return props.alpha ?? 1.0;
      },
      data: (_context: unknown, props: DynamicOccupancyGridMessage) => {
        return cache.get(props);
      },
    },

    count: 4,
  });
};

type Props = CommonCommandProps & {
  // TypeScript doesn't allow us to pass an array variable if `children` is set to an array type here
  // https://github.com/microsoft/TypeScript/issues/30711#issuecomment-485013588
  children: React.ReactNode;
};

export default function DynamicOccupancyGrids(props: Props): JSX.Element {
  // We can click through OccupancyGrids.
  return <Command getChildrenForHitmap={undefined} {...props} reglCommand={dynamicOoccupancyGrids} />;
}
