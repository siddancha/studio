// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import type REGL from "regl";

import {
  Command,
  withPose,
  defaultBlend,
  CommonCommandProps,
  Vec3,
  Vec4,
  toRGBA
} from "@foxglove/regl-worldview";
import { LightCurtainMesh } from "@foxglove/studio-base/types/Messages";

type Uniforms = {
  color: Vec4;
};
type Attributes = {
  point: REGL.Buffer;
};
type CommandProps = LightCurtainMesh;

export const DEFAULT_COLOR = { r: 0, g: 0, b: 1, a: 0.6 };  // default is blue with 60% opacity

function numVertices(marker: LightCurtainMesh): number {
  const { width, height } = marker;
  return (width - 1) * (height - 1) * 6;  // rectangles * 2 (triangles) * 3 (vertices)
}

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

  getVertices(marker: LightCurtainMesh): Float32Array
  {
    const { width, height, data } = marker;

    function getPoint(r: number, c: number): Vec3
    {
      const start = (r * width + c) * 3;
      return [data[start], data[start + 1], data[start + 2]] as Vec3;
    }

    const vertices = new Float32Array(numVertices(marker) * 3);
    let p = 0;

    function addPoints(...points: Vec3[])
    {
      for (const point of points)
      {
        vertices[p++] = point[0];
        vertices[p++] = point[1];
        vertices[p++] = point[2];
      }
    }

    for (let r = 0; r < height - 1; r++)
    {
      for (let c = 0; c < width - 1; c++)
      {
        const point1: Vec3 = getPoint(r,   c  );
        const point2: Vec3 = getPoint(r,   c+1);
        const point3: Vec3 = getPoint(r+1, c  );
        const point4: Vec3 = getPoint(r+1, c+1);

        addPoints(point1, point2, point3);  // triangle 1
        addPoints(point2, point3, point4);  // triangle 2
      }
    }

    return vertices;
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
    // REGL code copied from singleColor() in @foxglove/regl-worldview/src/commands/Triangles.js
    primitive: "triangles",

    vert: `
    precision mediump float;

    attribute vec3 point;

    uniform mat4 projection, view;

    #WITH_POSE

    void main () {
      vec3 pos = applyPose(point);
      gl_Position = projection * view * vec4(pos, 1);
    }
    `,
    frag: `
    precision mediump float;

    uniform vec4 color;

    void main () {
      gl_FragColor = color;
    }
    `,
    blend: defaultBlend,

    depth: { enable: true, mask: false },

    attributes: {
      point: (_context, props: LightCurtainMesh) => {
        return cache.get(props);
      }
    },

    uniforms: {
      // make color a uniform so in the future it can be controlled by topic settings
      color: (_context: unknown, props: LightCurtainMesh) => {
        const val = props.color ?? DEFAULT_COLOR;
        return toRGBA(val);
      }
    },

    count: (_context, props: LightCurtainMesh) => numVertices(props)
  });
};

type Props = CommonCommandProps & {
  // TypeScript doesn't allow us to pass an array variable if `children` is set to an array type here
  // https://github.com/microsoft/TypeScript/issues/30711#issuecomment-485013588
  children: React.ReactNode;
};

export default function LightCurtainMesh(props: Props): JSX.Element {
  // We can click through OccupancyGrids.
  return <Command getChildrenForHitmap={undefined} {...props} reglCommand={lightCurtainMesh} />;
}
