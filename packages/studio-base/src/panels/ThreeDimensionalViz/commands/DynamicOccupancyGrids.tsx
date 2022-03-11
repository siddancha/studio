import type REGL from "regl";

import { Command, withPose, defaultBlend, CommonCommandProps } from "@foxglove/regl-worldview";
import { TextureCacheDynGrid } from "@foxglove/studio-base/panels/ThreeDimensionalViz/commands/utils";
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

const dynamicOoccupancyGrids = (regl: REGL.Regl) => {
  // make a buffer holding the verticies of a 1x1 plane
  // it will be resized in the shader
  const positionBuffer = regl.buffer([0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0]);

  const cache = new TextureCacheDynGrid(regl);

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

    void main () {
      // look up the point in our data texture corresponding to
      // the current point being shaded
      vec4 point = texture2D(data, uv);

      // use occupancy only for now
      float t = 1.0 - point.r * 2.55;
      gl_FragColor = vec4(t, t, t, vAlpha);
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
        return props.alpha ?? 0.5;
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
