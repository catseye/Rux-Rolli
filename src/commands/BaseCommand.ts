import { State, SetStateType } from "../state";

export class BaseCommand {
  name: string;

  enact(state: State, setState: SetStateType): void {
    if (this.isPossible(state)) {
      console.log('ENACT command:', this.name, ' state:', state);
      const $this = this;
      setState((state) => {
        return {
          ...$this.transformer.bind($this)(state),
          issuedCommands: Array.prototype.concat([$this], state.issuedCommands)
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

  /*
   * Note that the effect is executed *after* the state change;
   * so the `state` that is received as a parameter here, is the
   * latest state, and includes any changes made by `transformer`.
   */
  effect(state: State, setState: SetStateType): void {
  }
}
