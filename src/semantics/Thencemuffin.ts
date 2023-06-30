import { Configuration, newComposite, getChildren } from "../configurations/Configuration";
import { Text, newText, getString, getCursors, moveCursor } from "../configurations/Text";
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
    const children = getChildren(configuration);
    if (children[0].type !== 'text') return null;
    if (children[1].type !== 'stack') return null;
    const text: Text = children[0];
    let text2 = moveCursor(text, 0, 1);
    if (text2.cursors[0] >= getString(text2).length) {
      return null;
    }
    let char = getString(text2).charAt(getCursors(text2)[0]);
    const stack: Stack = children[1];
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
  
  