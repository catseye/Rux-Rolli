export interface Playfield {
  type: 'playfield';
  store: Object;
}

export function newPlayfield(): Playfield {
  return {
    type: 'playfield',
    store: {},
  }
}

export function get(p: Playfield, x: number, y: number): string {
  return p.store[x + ',' + y];
}

/* FIXME: ahhhh this is mutable, isn't it.  We don't want it to be mutable, do we. */
export function put(p: Playfield, x: number, y: number, v: string | undefined): void {
  const key = x + ',' + y;
  if (v === undefined) {
    delete p.store[key];
  } else {
    p.store[key] = v;
  }
}

export function getExtents(p: Playfield): [number, number, number, number] {
  let count = 0;
  let minX: number = 0;
  let minY: number = 0;
  let maxX: number = 0;
  let maxY: number = 0;

  for (var cell in p.store) {
      var pos = cell.split(',');
      var x = parseInt(pos[0], 10);
      var y = parseInt(pos[1], 10);
      if (count === 0 || x < minX) minX = x;
      if (count === 0 || x > maxX) maxX = x;
      if (count === 0 || y < minY) minY = y;
      if (count === 0 || y > maxY) maxY = y;
      count++;
  }

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