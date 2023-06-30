import { Configuration, newComposite, getChildren } from "../configurations/Configuration";
import { Text, newText, getString, getCursors, moveCursor } from "../configurations/Text";
import { Stack, newStack, push, pop } from "../configurations/Stack";
import { Playfield, newPlayfield, get, put } from "../configurations/Playfield";
import { Semantics } from "../semantics";

/*
 * Thencemuffin: a just plain inexcusable esolang
 */
export const Thencemuffin: Semantics = {
  load: function(programText: string): Configuration {
    return newComposite([
      newText(programText, [0]),
      put(newPlayfield(), 0, 0, "X"),
      newStack([])
    ]);
  },
  next: function(configuration: Configuration): Configuration | null {
    if (configuration.type !== 'composite') return null;
    const children = getChildren(configuration);
    if (children[0].type !== 'text') return null;
    const text: Text = children[0];
    if (children[1].type !== 'playfield') return null;
    const pf: Playfield = children[1];
    if (children[2].type !== 'stack') return null;
    const stack: Stack = children[2];

    let newText = moveCursor(text, 0, 1);
    let cursorPos = getCursors(newText)[0];
    if (cursorPos >= getString(newText).length) return null;
    let char = getString(newText).charAt(cursorPos);

    let newStack: Stack;
    if (char === 'S') {
      const tmp = pop(stack);
      newStack = tmp !== null ? tmp : stack;
    } else {
      newStack = push(stack, "A");
    }
    const newPf = put(pf, 2, 0, char);
    return newComposite([newText, newPf, newStack]);
  }
}
  
  