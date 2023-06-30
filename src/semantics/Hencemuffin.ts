import { Semantics } from "../semantics";
import { Configuration } from "../configurations/Configuration";
import { newText } from "../configurations/Text";

/*
 * Hencemuffin: an inexcusably trivial esolang
 */
export const Hencemuffin: Semantics = {
  load: function(programText) {
    return newText(programText, []);
  },
  next: function(configuration: Configuration) {
    if (configuration.type === "text") {
      return {
        type: "text",
        contents: configuration.contents + "A",
        cursors: []
      };
    } else {
      return null;
    }
  }
}