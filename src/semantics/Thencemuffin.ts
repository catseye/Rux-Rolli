import { Configuration, Composite } from "../configurations/Configuration";
import { Text } from "../configurations/Text";
import { Stack, push } from "../configurations/Stack";
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
      let stack2 = push(stack, "A");
      const composite: Composite = {
        type: "composite",
        contents: [text, stack2]
      };
      return composite;
    }
    return null;
  }
}
  
  