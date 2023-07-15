import { Configuration } from "./configurations/Configuration";

/*
 * TODO: LoadFunction ought to be able to return `null` to signal an
 * inability to load the given program text (e.g. syntax error).
 */
export type LoadFunction = (programText: string) => Configuration;

export interface NextAction {
  type: 'next';
  configuration: Configuration;
}

export function nextWith(c: Configuration): NextAction {
  return {type: 'next', configuration: c};
}

export interface HaltAction {
  type: 'halt';
  configuration: Configuration;
}

export function haltWith(c: Configuration): HaltAction {
  return {type: 'halt', configuration: c};
}

export interface InputAction {
  type: 'input';
  configuration: Configuration;
}

export function inputWith(c: Configuration): InputAction {
  return {type: 'input', configuration: c};
}

export type Action = NextAction | HaltAction | InputAction;

export type NextFunction = (configuration: Configuration) => Action;

export type RecvFunction = (configuration: Configuration, input: string) => Action;

export interface Semantics {
    load: LoadFunction;
    next: NextFunction;
    recv: RecvFunction;
};
