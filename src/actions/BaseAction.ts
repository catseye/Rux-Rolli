import { State } from "../state";
import { DispatchType } from "../components/Store";

export interface Action {
  isPossible: (state: State) => boolean;
  transformer: (state: State) => State;
  effect?: (state: State, dispatch: DispatchType) => void;
  enact: (state: State, dispatch: DispatchType) => void;
}

export class BaseAction {
  isPossible(state: State): boolean {
    return false;
  }

  transformer(state: State): State {
    return state;
  }

  effect(state: State, dispatch: DispatchType): void {
  }
}
