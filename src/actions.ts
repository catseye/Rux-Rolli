import { State } from "./components/Store";


export interface Action {
  isPossible: (state: State) => boolean;
  transformer: (state: State) => State;
  effect?: (state: State, setState: any) => void;
  enact: (state: State, setState: any) => void;
}


class BaseAction {
  enact(state: State, setState: any): void {
    if (this.isPossible(state)) {
      this.effect(state, setState);
      setState(this.transformer);
    }
  }

  isPossible(state: State): boolean {
    return false;
  }

  transformer(state: State): State {
    return state;
  }

  effect(state: State, setState: any): void {
  }
}

export class EditAction extends BaseAction {
  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return {
      ...state,
      status: 'Editing'
    }
  }
}

export class DoneEditingAction extends BaseAction {
  isPossible(state: State): boolean {
    return state.status === 'Editing';
  }

  transformer(state: State): State {
    return {
      ...state,
      playfield: state.initial,
      status: 'Stopped'
    }
  }
}

export class RunAction extends BaseAction {
  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return {
      ...state,
      status: 'Running'
    }
  }

  effect(state: State, setState: any): void {
    const intervalId = setTimeout(() => {
      new StepAction().enact(state, setState);
      setState((state: State) => ({
        ...state,
        intervalId: null
      }));
      new RunAction().effect(state, setState);
    }, 250);
    setState((state: State) => ({
      ...state,
      intervalId: intervalId
    }));
  }

}

export class StopAction extends BaseAction {
  isPossible(state: State): boolean {
    return state.status === 'Running';
  }

  transformer(state: State): State {
    return {
      ...state,
      status: 'Stopped'
    }
  }

  effect(state: State, setState: any): void {
    if (state.intervalId) {
      clearTimeout(state.intervalId);
    }
    setState((state: State) => ({
      ...state,
      intervalId: null
    }));
  }
}

export class StepAction extends BaseAction {
  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return {
      ...state,
      playfield: state.playfield + 'A'
    }
  }
}

export class ResetAction extends BaseAction {
  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return {
      ...state,
      playfield: state.initial
    }
  }
}
