import { State } from "../state";
import { DispatchType } from "../components/Store";

export interface Action {
  name: string,
  isPossible: (state: State) => boolean;
  transformer: (state: State) => State;
  effect?: (state: State, dispatch: DispatchType) => void;
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
