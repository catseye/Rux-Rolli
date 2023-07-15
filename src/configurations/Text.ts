import { Range, newRange } from "./Range"

export interface Text {
  type: 'text';
  contents: string;
  ranges: Array<Range>;
}

export function newText(contents: string, ranges: Array<Range>): Text {
  return {
    type: "text",
    contents: contents,
    ranges: ranges
  };
}

export function getString(t: Text): string {
  return t.contents;
}

export function getRanges(t: Text): Array<Range> {
  return t.ranges;
}

// TODO: polymorphism via typevars
export function mapText(t: Text, f: (index: number, s: String, ranges: Array<Range>) => any): Array<any> {
  // TODO: unsure of the Unicode-compliance of this
  let output = []
  let s = t.contents;
  let ranges = t.ranges;
  for (var i = 0; i < s.length; i++) {
      let rangesHere: Array<Range> = []
      for (var j = 0; j < ranges.length; j++) {
          const range = ranges[j]
          if (i >= range.index && i < range.index + range.length) {
            rangesHere.push(range);
          }
      }
      let result = f(i, s.charAt(i), rangesHere);
      output.push(result);
  }
  return output;
}

export function moveRange(t: Text, index: number, delta: number): Text {
  let newRanges = t.ranges.slice();
  const range = t.ranges[index]
  newRanges[index] = newRange(range.index + delta, range.length);
  return {
    type: 'text',
    contents: t.contents,
    ranges: newRanges
  };
}
