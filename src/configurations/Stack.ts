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
      contents: s.contents // FIXME
    },
    "foo"
  ];
}

// TODO: operations on stacks here
