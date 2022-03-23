import type REGL from "regl";

import {
  Command,
  withPose,
  defaultBlend,
  CommonCommandProps,
  Vec4,
  toRGBA
} from "@foxglove/regl-worldview";

import { LightCurtainMesh } from "@foxglove/studio-base/types/Messages";

type Uniforms = {
  alpha: number;
  color: Vec4;
};
type Attributes = {
  point: REGL.Buffer;
};
type CommandProps = LightCurtainMesh;

class BufferCacheEntry {
  marker: LightCurtainMesh;
  buffer: REGL.Buffer;
  // regl context
  regl: REGL.Regl;

  constructor(regl: REGL.Regl, marker: LightCurtainMesh) {
    this.marker = marker;
    this.regl = regl;
    this.buffer = regl.buffer(this.getVertices(marker));
  }

  getVertices(marker: LightCurtainMesh): number[]
  {
    // const { width, height, mesh_data } = marker;

    // const data = new Uint8Array(3 * occupancy.length);
    // for (let i = 0; i < occupancy.length; i++)
    // {
    //   data[3 * i + 0] = occupancy[i]!;  // in [0, 100]
    //   data[3 * i + 1] = 125 + velocity_x[i]!;  // now in [0, 250]
    //   data[3 * i + 2] = 125 + velocity_z[i]!;  // now in [0, 250]
    // }

    // return {
    //   format: "rgb",
    //   mipmap: false,
    //   data: data,
    //   width: info.width,
    //   height: info.height,
    // };

    return [0, 10, 0,
            10, 10, 0,
            0, 0, 0,
            10, 10, 0,
            0, 0, 0,
            10, 0, 0];
  }

  // get the buffer for a marker
  // if the marker is not the same reference
  // generate a new buffer, otherwise keep the old one
  // uploading new buffer data to the gpu is something
  // you only want to do when required - it takes several milliseconds
  getBuffer(marker: LightCurtainMesh) {
    if (this.marker === marker) {
      return this.buffer;
    }
    this.marker = marker;
    this.buffer = this.buffer(this.getVertices(marker));
    return this.buffer;
  }
}

class BufferCache {
  store: {
    [key: string]: BufferCacheEntry;
  } = {};
  // regl context
  regl: REGL.Regl;

  constructor(regl: REGL.Regl) {
    this.regl = regl;
  }

  // returns a regl buffer for a given marker
  get(marker: LightCurtainMesh): REGL.Buffer {
    const { name } = marker;
    const item = this.store[name];
    if (!item) {
      // if the item is missing initialize a new entry
      const entry = new BufferCacheEntry(this.regl, marker);
      this.store[name] = entry;
      return entry.buffer;
    }
    return item.getBuffer(marker);
  }
}

const lightCurtainMesh = (regl: REGL.Regl) =>
{
  const cache = new BufferCache(regl);

  return withPose<Uniforms, Attributes, CommandProps, Record<string, never>, REGL.DefaultContext>({
    primitive: "triangle strip",

    vert: `
    precision mediump float;

    uniform mat4 projection, view;

    attribute vec3 point;

    #WITH_POSE

    void main () {
      vec3 pos = applyPose(point);
      gl_Position = projection * view * vec4(pos, 1);
    }
    `,
    frag: `
    precision mediump float;

    uniform float alpha;
    uniform vec4 color;

    void main () {
      gl_FragColor = vec4(color.r, color.g, color.b, alpha);
    }
    `,
    blend: defaultBlend,

    depth: { enable: true, mask: false },

    attributes: {
      point: (_context, props: LightCurtainMesh) => {
        return cache.get(props);;
      }
    },

    uniforms: {
      // make alpha a uniform so in the future it can be controlled by topic settings
      alpha: (_context, props) => {
        // TODO: expose a topic setting in studio so that the user can control this
        return props.alpha ?? 1.0;
      },
      // make color a uniform so in the future it can be controlled by topic settings
      color: (_context: unknown, props: LightCurtainMesh) => {
        // TODO: expose a topic setting in studio so that the user can control this
        const val = props.color ?? { r: 0, g: 0, b: 1, a: 1 };
        return toRGBA(val);
      }
    },

    count: (_context, props: LightCurtainMesh) => 18
  });
};

type Props = CommonCommandProps & {
  // TypeScript doesn't allow us to pass an array variable if `children` is set to an array type here
  // https://github.com/microsoft/TypeScript/issues/30711#issuecomment-485013588
  children: React.ReactNode;
};

export default function LightCurtainMeshs(props: Props): JSX.Element {
  // We can click through OccupancyGrids.
  return <Command getChildrenForHitmap={undefined} {...props} reglCommand={lightCurtainMesh} />;
}
