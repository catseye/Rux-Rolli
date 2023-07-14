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

export function mapText(t: Text, f: (s: String, c: Array<number>) => any) {
  // TODO: unsure of the Unicode-compliance of this
  let output = []
  let s = getString(t);
  let cursors = getCursors(t);
  for (var i = 0; i < s.length; i++) {
      let cursorsHere: Array<number> = []
      for (var j = 0; j < cursors.length; j++) {
          if (cursors[j] === i) {
              cursorsHere.push(j);
          }
      }
      let result = f(s.charAt(i), cursorsHere);
      output.push(result);
  }
  return output;
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
