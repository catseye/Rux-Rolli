import { State, SetStateType } from "../state";

export interface Command {
  name: string;
  isPossible: (state: State) => boolean;
  transformer: (state: State) => State;
  effect?: (state: State, setState: SetStateType) => void;
  enact: (state: State, setState: SetStateType) => void;
}

export class BaseCommand {
  name: string;

  enact(state: State, setState: SetStateType): void {
    if (this.isPossible(state)) {
      this.effect(state, setState);
      setState(this.transformer.bind(this));
    }
  }

  isPossible(state: State): boolean {
    return false;
  }

  transformer(state: State): State {
    return state;
  }

  effect(state: State, setState: SetStateType): void {
  }
}
