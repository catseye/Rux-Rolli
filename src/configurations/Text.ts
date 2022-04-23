export interface Text {
  type: 'text';
  contents: string;
  cursors: Array<number>;
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

// TODO: more operations on texts here
