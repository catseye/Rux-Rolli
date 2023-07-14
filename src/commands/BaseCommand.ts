import { State, SetStateType } from "../state";

export class BaseCommand {
  name = "unnamed"

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

  /*
   * When the system is in a certain state, certain commands may not be
   * possible to enact.  This method supports describing that case.
   */
  isPossible(state: State): boolean {
    return false;
  }

  /*
   * Occasionally, even when a command is possible, it will not be available
   * to the user.  This method supports describing that case.
   */
  isAvailableToUser(state: State): boolean {
    return true;
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
