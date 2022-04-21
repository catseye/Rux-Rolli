import { Semantics } from "../semantics";

/*
 * Hencemuffin: an inexcusably trivial esolang
 */
export const Hencemuffin: Semantics = {
  load: function(programText) {
    return {
      type: "text",
      contents: programText
    };
  },
  next: function(configuration) {
    return {
      type: "text",
      contents: configuration.contents + "A"
    };
  }
}
  
  