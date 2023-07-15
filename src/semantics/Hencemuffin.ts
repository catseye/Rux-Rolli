import { Semantics } from "../semantics";
import { Configuration } from "../configurations/Configuration";
import { newText, getString, getRanges } from "../configurations/Text";

/*
 * Hencemuffin: an inexcusably trivial esolang
 */
export const Hencemuffin: Semantics = {
  load: function(programText) {
    return newText(programText, []);
  },
  next: function(configuration: Configuration) {
    if (configuration.type !== "text") return ['halt', configuration];
    return ['next', newText(getString(configuration) + "A", getRanges(configuration))];
  },
  recv: function(configuration: Configuration, _input: string) {
    return ['next', configuration];
  }
}