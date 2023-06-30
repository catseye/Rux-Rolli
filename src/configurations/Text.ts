export interface Text {
  type: 'text';
  contents: string;
  cursors: Array<number>;
}

export function newText(contents: string, cursors: Array<number>): Text {
  return {
    type: "text",
    contents: contents,
    cursors: cursors
  };
}

export function getString(t: Text): string {
  return t.contents;
}

export function getCursors(t: Text): Array<number> {
  return t.cursors;
}

export function moveCursor(t: Text, index: number, delta: number): Text {
  let newCursors = t.cursors.slice();
  newCursors[index] += delta;
  return {
    type: 'text',
    contents: t.contents,
    cursors: newCursors
  };
}
