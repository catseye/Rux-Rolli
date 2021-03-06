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

export type Configuration = Text | Playfield | Stack | Composite;
