import { Configuration, newComposite, getChildren } from "../configurations/Configuration";
import { Text, newText, newRange, getString, getCursors, moveCursor } from "../configurations/Text";
import { Stack, newStack, push, pop } from "../configurations/Stack";
import { Playfield, newPlayfield, get, put } from "../configurations/Playfield";
import { Semantics } from "../semantics";

/*
 * Thencemuffin: a just plain inexcusable esolang
 */
export const Thencemuffin: Semantics = {
  load: function(programText: string): Configuration {
    return newComposite([
      newText(programText, [newRange(0, 1)]),
      put(newPlayfield(), 0, 0, "X"),
      newStack([])
    ]);
  },
  next: function(configuration: Configuration) {
    if (configuration.type !== 'composite') return ['halt', configuration];
    const children = getChildren(configuration);
    if (children[0].type !== 'text') return ['halt', configuration];
    const text: Text = children[0];
    if (children[1].type !== 'playfield') return ['halt', configuration];
    const pf: Playfield = children[1];
    if (children[2].type !== 'stack') return ['halt', configuration];
    const stack: Stack = children[2];

    let newText = moveCursor(text, 0, 1);
    let cursor = getCursors(newText)[0];
    if (cursor.index >= getString(newText).length) return ['halt', configuration];
    let char = getString(newText).charAt(cursor.index);

    let newStack: Stack;
    if (char === 'S') {
      const tmp = pop(stack);
      newStack = tmp !== null ? tmp : stack;
    } else {
      newStack = push(stack, "A");
    }
    const newPf = put(pf, 2, 1, char);
    return ['next', newComposite([newText, newPf, newStack])];
  },
  recv: function(configuration: Configuration, _input: string) {
    return ['next', configuration];
  }
}
  
  