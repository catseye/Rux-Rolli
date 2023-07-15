import { Semantics } from "../semantics";
import { Configuration } from "../configurations/Configuration";
import { newText, getString, getRanges } from "../configurations/Text";
import { nextWith, haltWith } from "../semantics";

/*
 * Hencemuffin: an inexcusably trivial esolang
 */
export const Hencemuffin: Semantics = {
  load: function(programText) {
    return newText(programText, []);
  },
  next: function(configuration: Configuration) {
    if (configuration.type !== "text") return haltWith(configuration);
    return nextWith(newText(getString(configuration) + "A", getRanges(configuration)));
  },
  recv: function(configuration: Configuration, _input: string) {
    return nextWith(configuration);
  }
}