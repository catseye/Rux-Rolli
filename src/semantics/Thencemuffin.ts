import { Configuration, newComposite, getTextChild, getPlayfieldChild, getStackChild } from "../configurations/Configuration";
import { newText, newRange, getString, getCursors, moveCursor as moveRange } from "../configurations/Text";
import { newStack, push, pop } from "../configurations/Stack";
import { newPlayfield, setCursor, put, moveCursor } from "../configurations/Playfield";
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
    const text = getTextChild(configuration, 0);
    const pf = getPlayfieldChild(configuration, 1);
    const stack = getStackChild(configuration, 2);
    if (!text || !pf || !stack) return ['halt', configuration];

    let newText = moveRange(text, 0, 1);
    let cursor = getCursors(newText)[0];
    if (cursor.index >= getString(newText).length) return ['halt', configuration];
    let char = getString(newText).charAt(cursor.index);

    let newStack;
    if (char === 'S') {
      const tmp = pop(stack);
      newStack = tmp !== null ? tmp : stack;
    } else {
      newStack = push(stack, "A");
    }

    let newPf = pf;
    newPf = put(newPf, 2, 1, char);
    newPf = moveCursor(newPf, "IP", 1, 0);
    return ['next', newComposite([newText, newPf, newStack])];
  },
  recv: function(configuration: Configuration, _input: string) {
    return ['next', configuration];
  }
}
  
  