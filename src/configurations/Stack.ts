export interface Stack {
  type: 'stack';
  contents: Array<string>;
}

export function newStack(a: Array<string>): Stack {
  return {
    type: 'stack',
    contents: a
  }
}

export function push(s: Stack, e: string): Stack {
  return {
    type: 'stack',
    contents: s.contents.concat([e])
  }
}

export function isEmpty(s: Stack): boolean {
  return s.contents.length === 0;
}

export function top(s: Stack): string | null {
  if (isEmpty(s)) return null;
  return s.contents[s.contents.length - 1];
}

export function pop(s: Stack): Stack | null {
  if (isEmpty(s)) return null;
  return {
    type: 'stack',
    contents: s.contents.slice(0, -1)
  };
}
