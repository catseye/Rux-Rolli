import { Configuration, Composite } from "../configurations/Configuration";
import { Text, moveCursor } from "../configurations/Text";
import { Stack, newStack, push, pop } from "../configurations/Stack";
import { Semantics } from "../semantics";

/*
 * Thencemuffin: a just plain inexcusable esolang
 */
export const Thencemuffin: Semantics = {
  load: function(programText: string): Configuration {
    const text: Text = {
      type: "text",
      contents: programText,
      cursors: [0]
    };
    const stack = newStack([]);
    const composite: Composite = {
      type: "composite",
      contents: [text, stack]
    };
    return composite;
  },
  next: function(configuration: Configuration): Configuration | null {
    if (configuration === null) return null;
    if (configuration.type === 'composite' &&
        configuration.contents[0].type === 'text' &&
        configuration.contents[1].type === 'stack') {
      const text: Text = configuration.contents[0];
      let text2 = moveCursor(text, 0, 1);
      if (text2.cursors[0] >= text2.contents.length) {
        return null;
      }
      let char = text2.contents.charAt(text2.cursors[0]);
      const stack: Stack = configuration.contents[1];
      let stack2: Stack;
      if (char === 'S') {
        const stack3 = pop(stack);
        stack2 = stack3 !== null ? stack3 : stack;
      } else {
        stack2 = push(stack, "A");
      }
      const composite: Composite = {
        type: "composite",
        contents: [text2, stack2]
      };
      return composite;
    }
    return null;
  }
}
  
  