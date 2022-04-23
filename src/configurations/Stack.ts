export interface Stack {
  type: 'stack';
  contents: Array<string>;
}

export function push(s: Stack, e: string): Stack {
  return {
    type: 'stack',
    contents: s.contents.concat([e])
  }
}

export function pop(s: Stack): [Stack, string] {
  return [
    {
      type: 'stack',
      contents: s.contents.slice(0, -1)
    },
    s.contents[s.contents.length - 1]
  ];
}
