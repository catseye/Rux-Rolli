import { State } from "../state";
import { DispatchType } from "../components/Store";

export interface Command {
  name: string,
  isPossible: (state: State) => boolean;
  transformer: (state: State) => State;
  effect: (dispatch: DispatchType) => void;
}

export class BaseCommand {
  name: string;

  isPossible(state: State): boolean {
    return false;
  }

  transformer(state: State): State {
    return state;
  }

  effect(dispatch: DispatchType): void {
  }
}
