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
      console.log('ENACT command:', this.name, ' state:', state);
      const $this = this;
      setState((state) => {
        return {
          ...$this.transformer.bind($this)(state),
          issuedCommands: Array.prototype.concat([$this], [state.issuedCommands])
        };
      });
    } else {
      console.log('ENACT -- not possible! command:', this.name, ' state:', state);
    }
  }

  isPossible(state: State): boolean {
    return false;
  }

  transformer(state: State): State {
    return state;
  }
}
