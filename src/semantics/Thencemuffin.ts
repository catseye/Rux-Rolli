import { Configuration, newComposite, getChildren } from "../configurations/Configuration";
import { Text, newText, newRange, getString, getCursors, moveCursor as moveRange } from "../configurations/Text";
import { Stack, newStack, push, pop } from "../configurations/Stack";
import { Playfield, newPlayfield, setCursor, put, moveCursor } from "../configurations/Playfield";
import { newCursor } from "../configurations/Cursor";
import { Semantics } from "../semantics";

/*
 * Thencemuffin: a just plain inexcusable esolang
 */
export const Thencemuffin: Semantics = {
  load: function(programText: string): Configuration {
    let playfield = newPlayfield();
    playfield = setCursor(playfield, "IP", newCursor(0, 0, 1, 0));
    playfield = put(playfield, 0, 0, "X");
    return newComposite([
      newText(programText, [newRange(0, 1)]),
      playfield,
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

    let newText = moveRange(text, 0, 1);
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

    let newPf: Playfield = pf;
    newPf = put(newPf, 2, 1, char);
    newPf = moveCursor(newPf, "IP", 1, 0);
    return ['next', newComposite([newText, newPf, newStack])];
  },
  recv: function(configuration: Configuration, _input: string) {
    return ['next', configuration];
  }
}
  
  