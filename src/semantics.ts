import { Configuration } from "./components/Store";

export type LoadFunction = (programText: string) => Configuration;
export type NextFunction = (configuration: Configuration) => Configuration;

export interface Semantics {
    load: LoadFunction;
    next: NextFunction;
};

/*
 * Hencemuffin: an inexcusably trivial esolang
 */
export const Hencemuffin: Semantics = {
  load: function(programText: string): Configuration {
    return {
      type: "text",
      contents: programText
    };
  },
  next: function(configuration: Configuration): Configuration {
    return {
      type: "text",
      contents: configuration.contents + "A"
    };
  }
}

