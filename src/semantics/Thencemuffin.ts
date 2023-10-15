import { Configuration, newComposite, getTextChild, getPlayfieldChild, getStackChild } from "../configurations/Configuration";
import { newText, getString, getRanges, moveRange } from "../configurations/Text";
import { newRange } from "../configurations/Range";
import { newStack, push, pop } from "../configurations/Stack";
import { newPlayfield, setCursor, put, moveCursor } from "../configurations/Playfield";
import { newCursor } from "../configurations/Cursor";
import { Semantics, nextWith, haltWith, inputWith } from "../semantics";

/*

So we'll need something like this that exposes all the Configuration APIs
to the Lua VM:

export function setUpPrint(elem: any): void {
  elem.innerHTML = '';
  fengari.interop.push(fengari.L, function() {
    var s = fengari.interop.tojs(fengari.L, 2);
    elem.innerHTML += s + "\n";
  });
  fengari.lua.lua_setglobal(fengari.L, "veloPrint");
}

We'll also need to load the Lua versions of the three functions below.

Finally we'll need the Semantics to be calls to those Lua functions.

*/

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
    if (configuration.type !== "composite") {
      return haltWith(configuration);
    }
    const text = getTextChild(configuration, 0);
    const pf = getPlayfieldChild(configuration, 1);
    const stack = getStackChild(configuration, 2);
    if (!text || !pf || !stack) return haltWith(configuration);

    let range = getRanges(text)[0];
    if (range.index >= getString(text).length) return haltWith(configuration);
    let char = getString(text).charAt(range.index);
    let newText = moveRange(text, 0, 1);

    let newStack;
    if (char === 'S') {
      const tmp = pop(stack);
      newStack = tmp !== null ? tmp : stack;
    } else if (char === 'I') {
      return inputWith(newComposite([newText, pf, push(stack, "*")]));
    } else {
      newStack = push(stack, "A");
    }

    let newPf = pf;
    newPf = put(newPf, 2, 1, char);
    newPf = moveCursor(newPf, "IP", 1, 0);
    return nextWith(newComposite([newText, newPf, newStack]));
  },
  recv: function(configuration: Configuration, _input: string) {
    if (configuration.type !== "composite") {
      return haltWith(configuration);
    }
    const text = getTextChild(configuration, 0);
    const pf = getPlayfieldChild(configuration, 1);
    const stack = getStackChild(configuration, 2);
    if (!text || !pf || !stack) return haltWith(configuration);

    let newStack = push(stack, _input);

    return nextWith(newComposite([text, pf, newStack]));
  }
}
