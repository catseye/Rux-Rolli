import { Semantics } from "../semantics";
import { Configuration } from "../configurations/Configuration";
import { newText, getString, getCursors } from "../configurations/Text";

/*
 * Hencemuffin: an inexcusably trivial esolang
 */
export const Hencemuffin: Semantics = {
  load: function(programText) {
    return newText(programText, []);
  },
  next: function(configuration: Configuration) {
    if (configuration.type !== "text") return ['halt', configuration];
    return ['next', newText(getString(configuration) + "A", getCursors(configuration))];
  },
  recv: function(configuration: Configuration, input: string) {
    return ['next', configuration];
  }
}