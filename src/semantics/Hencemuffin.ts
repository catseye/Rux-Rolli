import { Configuration } from "../state";
import { Semantics } from "../semantics";

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
  
  