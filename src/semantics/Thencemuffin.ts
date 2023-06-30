import { Configuration, newComposite } from "../configurations/Configuration";
import { Text, newText, moveCursor } from "../configurations/Text";
import { Stack, newStack, push, pop } from "../configurations/Stack";
import { Semantics } from "../semantics";

/*
 * Thencemuffin: a just plain inexcusable esolang
 */
export const Thencemuffin: Semantics = {
  load: function(programText: string): Configuration {
    return newComposite([
      newText(programText, [0]),
      newStack([])
    ]);
  },
  next: function(configuration: Configuration): Configuration | null {
    if (configuration.type !== 'composite') return null;
    if (configuration.contents[0].type !== 'text') return null;
    if (configuration.contents[1].type !== 'stack') return null;
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
    return newComposite([text2, stack2]);
  }
}
  
  