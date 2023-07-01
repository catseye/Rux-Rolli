import { Configuration } from "./configurations/Configuration";

/*
 * TODO: LoadFunction ought to be able to return `null` to signal an
 * inability to load the given program text (e.g. syntax error).
 */
export type LoadFunction = (programText: string) => Configuration;

export type Action = 'next' | 'halt' | 'input';

export type NextFunction = (configuration: Configuration) => [Action, Configuration];

export type RecvFunction = (configuration: Configuration, input: string) => [Action, Configuration];

export interface Semantics {
    load: LoadFunction;
    next: NextFunction;
    recv: RecvFunction;
};
