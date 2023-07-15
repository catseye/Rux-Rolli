import { Stack } from "./Stack";
import { Text } from "./Text";
import { Playfield } from "./Playfield";

/*
 * We can't comfortably put this one in its own module,
 * because it would induce a circular dependency.
 */
export interface Composite {
  type: 'composite';
  contents: Array<Configuration>;
}

export function newComposite(contents: Array<Configuration>) : Composite {
  return {
    type: 'composite',
    contents: contents
  };
}

export function getChildren(c: Composite): Array<Configuration> {
  return c.contents;
}

export function getTextChild(c: Configuration, index: number): Text | null {
  if (c.type !== 'composite') return null;
  const child = c.contents[index];
  return (child.type === 'text') ? child : null;
}

export function getPlayfieldChild(c: Configuration, index: number): Playfield | null {
  if (c.type !== 'composite') return null;
  const child = c.contents[index];
  return (child.type === 'playfield') ? child : null;
}

export function getStackChild(c: Configuration, index: number): Stack | null {
  if (c.type !== 'composite') return null;
  const child = c.contents[index];
  return (child.type === 'stack') ? child : null;
}

export function mapComposite(c: Composite, f: (x: Configuration, index: number) => any): any {
  return c.contents.map(f);
}

export type Configuration = Text | Playfield | Stack | Composite;
