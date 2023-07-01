
export interface Cursor {
  x: number,
  y: number,
  dx: number,
  dy: number,
}

export function newCursor(x: number, y: number, dx: number, dy: number): Cursor {
  return {
    x: x,
    y: y,
    dx: dx,
    dy: dy,
  }
}

export function moveBy(c: Cursor, dx: number, dy: number): Cursor {
  return {
    ...c,
    x: c.x + dx,
    y: c.y + dy,
  }
}

export function advance(c: Cursor): Cursor {
  return moveBy(c, c.dx, c.dy);
}

export function reflect(c: Cursor): Cursor {
  return {
    ...c,
    dx: -1 * c.dx,
    dy: -1 * c.dy,
  }
}

/*
    // This only works for 45-degree increments and "pseudo unit vector" deltas. //
public void rotate(int degrees) {
    int[][] table = {
        {0, -1},
        {1, -1},
        {1, 0},
        {1, 1},
        {0, 1},
        {-1, 1},
        {-1, 0},
        {-1, -1}
    };
    int index = -1;
    for (int i = 0; i <= 7; i++) {
        int px = table[i][0];
        int py = table[i][1];
        if (dx.intValue() == px && dy.intValue() == py) {
            index = i;
            break;
        }
    }
    if (index == -1) {
        return; // TODO: complain
    }
    int nuIndex = (index + (int)(degrees / 45));
    if (nuIndex < 0) nuIndex += 8;
    nuIndex %= 8;
    int nuDx = table[nuIndex][0];
    int nuDy = table[nuIndex][1];
    dx = new IntegerElement(nuDx);
    dy = new IntegerElement(nuDy);
}
*/

export function isHeaded(c: Cursor, dx: number, dy: number): boolean {
  return c.dx === dx && c.dy === dy;
}
