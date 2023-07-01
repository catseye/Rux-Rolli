import { Map, List } from "immutable";

import { Cursor } from "./Cursor"

export interface Playfield {
  type: 'playfield';
  store: Map<List<number>, string>;
  def: string;
  cursors: Map<string, Cursor>;
}

export function newPlayfield(): Playfield {
  return {
    type: 'playfield',
    store: Map(),
    def: " ",
    cursors: Map(),
  }
}

export function setCursor(p: Playfield, name: string, c: Cursor): Playfield {
  return {
    ...p,
    cursors: p.cursors.set(name, c),
  }
}

export function getCursor(p: Playfield, name: string): Cursor | undefined {
  return p.cursors.get(name);
}

export function get(p: Playfield, x: number, y: number): string {
  return p.store.get(List([x, y])) || p.def;
}

export function put(p: Playfield, x: number, y: number, v: string): Playfield {
  return {
    ...p,
    store: p.store.set(List([x, y]), v),
  }
}

export function getExtents(p: Playfield): [number, number, number, number] {
  let count = 0;
  let minX: number = 0;
  let minY: number = 0;
  let maxX: number = 0;
  let maxY: number = 0;

  p.store.forEach(
    function(value, key) {
      var x = key.get(0) || 0;
      var y = key.get(1) || 0;
      if (count === 0 || x < minX) minX = x;
      if (count === 0 || x > maxX) maxX = x;
      if (count === 0 || y < minY) minY = y;
      if (count === 0 || y > maxY) maxY = y;
      count++;
    }
  )

  if (count === 0) {
    return [0, 0, -1, -1];
  } else {
    return [minX, minY, maxX, maxY];
  }
}

export function dump(p: Playfield): string {
  let text = "";
  let [minX, minY, maxX, maxY] = getExtents(p);
  for (var y = minY; y <= maxY; y++) {
      var row = "";
      for (var x = minX; x <= maxX; x++) {
          row += get(p, x, y);
      }
      text += row + "\n";
  }
  return text;
};