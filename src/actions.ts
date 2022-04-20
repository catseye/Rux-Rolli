import { State } from "./components/Store";


export interface Action {
  isPossible: (state: State) => boolean;
  transformer: (state: State) => State;
  effect?: (state: State, setState: any) => void;
  enact: (state: State, setState: any) => void;
}

type LoadFunction = (programText: string) => any;
type NextFunction = (configuration: any) => any;

class BaseAction {
  enact(state: State, setState: any): void {
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
  load: LoadFunction;

  constructor(load: LoadFunction) {
    super();
    this.load = load;
  }

  isPossible(state: State): boolean {
    return state.status === 'Editing';
  }

  transformer(state: State): State {
    return {
      ...state,
      playfield: this.load(state.initial),
      status: 'Stopped'
    }
  }
}

export class RunAction extends BaseAction {
  next: NextFunction;

  constructor(next: NextFunction) {
    super();
    this.next = next;
  }

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
      new StepAction(this.next).enact(state, setState);
      setState((state: State) => ({
        ...state,
        intervalId: null
      }));
      new RunAction(this.next).effect(state, setState);
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
  next: NextFunction;

  constructor(next: NextFunction) {
    super();
    this.next = next;
  }

  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return {
      ...state,
      playfield: this.next(state.playfield)
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

// ------------------------------------------

export function createActionsFrom(load: LoadFunction, next: NextFunction) {
  return {
    edit: new EditAction(),
    doneEditing: new DoneEditingAction(load),
    run: new RunAction(next),
    stop: new StopAction(),
    step: new StepAction(next),
    reset: new ResetAction()
  };
}
