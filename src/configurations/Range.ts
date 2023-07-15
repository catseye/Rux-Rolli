export interface Range {
  index: number;
  length: number;
}

export function newRange(index: number, length: number): Range {
  return {
    index: index,
    length: length
  }
}
