import { Configuration } from "./configurations/Configuration";

/*
 * TODO: LoadFunction ought to be able to  return `null` to signal an
 * inability to load the given program text (e.g. syntax error).
 */
export type LoadFunction = (programText: string) => Configuration;

/*
 * NextFunction may return `null` to signal that the execution of the
 * program has halted.  The state will be put into the `Terminated` status
 * to indicate this.
 */
export type NextFunction = (configuration: Configuration) => Configuration | null;

export interface Semantics {
    load: LoadFunction;
    next: NextFunction;
};
