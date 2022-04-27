import { State } from "../state";
import { DispatchType } from "../components/Store";

export interface Action {
  name: string,
  isPossible: (state: State) => boolean;
  transformer: (state: State) => State;
  effect: (dispatch: DispatchType) => void;
}

export class BaseAction {
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
