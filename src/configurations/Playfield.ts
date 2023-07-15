import { Map, List } from "immutable";

import { Cursor, moveBy } from "./Cursor"

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
    function(_value: string, key: List<number>) {
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
  let [minX, minY, maxX, maxY] = getExtents(p);
  return dumpWithinExtents(p, minX, minY, maxX, maxY);
};

export function dumpWithinExtents(p: Playfield, minX: number, minY: number, maxX: number, maxY: number): string {
  let text = "";
  for (var y = minY; y <= maxY; y++) {
      var row = "";
      for (var x = minX; x <= maxX; x++) {
          row += get(p, x, y);
      }
      text += row + "\n";
  }
  return text;
};

export function mapPlayfieldRows(p: Playfield, f: (y: number) => any): any {
  let [_minX, minY, _maxX, maxY] = getExtents(p);
  let results = [];
  for (var y = minY; y <= maxY; y++) {
    results.push(f(y));
  }
  return results;
}

export function mapPlayfieldCells(p: Playfield, y: number, f: (x: number, contents: String, cursors: Array<Cursor>) => any): any {
  let [minX, _minY, maxX, _maxY] = getExtents(p);
  let results = [];
  var contents;
  for (var x = minX; x <= maxX; x++) {
    contents = get(p, x, y);

    let cursorsHere: Array<Cursor> = [];
    p.cursors.forEach((cursor, _name, _iter) => {
      if (cursor.x === x && cursor.y === y) {
        cursorsHere.push(cursor);
      }
    });

    results.push(f(x, contents, cursorsHere));
  }
  return results;
}

export function moveCursor(p: Playfield, name: string, dx: number, dy: number): Playfield {
  let cursor = p.cursors.get(name);
  if (!cursor) {
    console.log("ERROR: no cursor on this playfield named '" + name + "'!");
    return p;
  }
  cursor = moveBy(cursor, dx, dy);
  return {
    ...p,
    cursors: p.cursors.set(name, cursor),
  }
}
