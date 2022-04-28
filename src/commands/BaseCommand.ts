import { State, SetStateType } from "../state";

export interface Command {
  name: string;
  isPossible: (state: State) => boolean;
  transformer: (state: State) => State;
  effect: null | ((state: State, setState: SetStateType) => void);
  enact: (state: State, setState: SetStateType) => void;
}

export class BaseCommand {
  name: string;
  effect = null;

  enact(state: State, setState: SetStateType): void {
    if (this.isPossible(state)) {
      const $this = this;
      setState((state) => {
        return {
          ...$this.transformer.bind($this),
          requestedEffect: $this.effect
        };
      });
    }
  }

  isPossible(state: State): boolean {
    return false;
  }

  transformer(state: State): State {
    return state;
  }
}
