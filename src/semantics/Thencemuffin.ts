import { Configuration, Text, Stack, Composite } from "../state";
import { Semantics } from "../semantics";

/*
 * Thencemuffin: a just plain inexcusable esolang
 */
export const Thencemuffin: Semantics = {
  load: function(programText: string): Configuration {
    const text: Text = {
      type: "text",
      contents: programText
    };
    const stack: Stack = {
      type: "stack",
      contents: []
    }
    const composite: Composite = {
      type: "composite",
      contents: [text, stack]
    };
    return composite;
  },
  next: function(configuration: Configuration): Configuration {
    if (configuration.type === 'composite' &&
        configuration.contents[0].type === 'text' &&
        configuration.contents[1].type === 'stack') {
      const text: Text = configuration.contents[0];
      const stack: Stack = configuration.contents[1];
      // TODO transform stack somehow
      const composite: Composite = {
        type: "composite",
        contents: [text, stack]
      };
      return composite;
    }
    return null;
  }
}
  
  