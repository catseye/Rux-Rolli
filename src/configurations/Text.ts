export interface Range {
  index: number;
  length: number;
}

export interface Text {
  type: 'text';
  contents: string;
  cursors: Array<Range>;
}

export function newRange(index: number, length: number): Range {
  return {
    index: index,
    length: length
  }
}

export function newText(contents: string, cursors: Array<Range>): Text {
  return {
    type: "text",
    contents: contents,
    cursors: cursors
  };
}

export function getString(t: Text): string {
  return t.contents;
}

export function getCursors(t: Text): Array<Range> {
  return t.cursors;
}

// TODO: polymorphism via typevars
export function mapText(t: Text, f: (index: number, s: String, c: Array<Range>) => any): Array<any> {
  // TODO: unsure of the Unicode-compliance of this
  let output = []
  let s = getString(t);
  let cursors = getCursors(t);
  for (var i = 0; i < s.length; i++) {
      let cursorsHere: Array<Range> = []
      for (var j = 0; j < cursors.length; j++) {
          const cursor: Range = cursors[j]
          if (i >= cursor.index && i < cursor.index + cursor.length) {
              cursorsHere.push(cursor);
          }
      }
      let result = f(i, s.charAt(i), cursorsHere);
      output.push(result);
  }
  return output;
}

export function moveCursor(t: Text, index: number, delta: number): Text {
  let newCursors = t.cursors.slice();
  const cursor = t.cursors[index]
  newCursors[index] = newRange(cursor.index + delta, cursor.length);
  return {
    type: 'text',
    contents: t.contents,
    cursors: newCursors
  };
}
