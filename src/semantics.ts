import { Configuration } from "./configurations/Configuration";

export type LoadFunction = (programText: string) => Configuration;
export type NextFunction = (configuration: Configuration) => Configuration;

export interface Semantics {
    load: LoadFunction;
    next: NextFunction;
};
