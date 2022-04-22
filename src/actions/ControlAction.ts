import { State, SetStateType } from "../state";

import { BaseAction } from "./BaseAction";
import { Semantics, LoadFunction, NextFunction } from "../semantics"


class ControlAction extends BaseAction {
  load: LoadFunction;
  next: NextFunction;

  constructor(load: LoadFunction, next: NextFunction) {
    super();
    this.load = load;
    this.next = next;
  }
}

export class EditAction extends ControlAction {
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

export class DoneEditingAction extends ControlAction {
  isPossible(state: State): boolean {
    return state.status === 'Editing';
  }

  transformer(state: State): State {
    return {
      ...state,
      configuration: this.load(state.initial),
      status: 'Stopped'
    }
  }
}

export class RunAction extends ControlAction {
  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return {
      ...state,
      status: 'Running'
    }
  }

  effect(state: State, setState: SetStateType): void {
    const intervalId = setTimeout(() => {
      new StepAction(this.load, this.next).enact(state, setState);
      setState((state: State) => ({
        ...state,
        intervalId: null
      }));
      new RunAction(this.load, this.next).effect(state, setState);
    }, 250);
    setState((state: State) => ({
      ...state,
      intervalId: intervalId
    }));
  }

}

export class StopAction extends ControlAction {
  isPossible(state: State): boolean {
    return state.status === 'Running';
  }

  transformer(state: State): State {
    return {
      ...state,
      status: 'Stopped'
    }
  }

  effect(state: State, setState: SetStateType): void {
    if (state.intervalId) {
      clearTimeout(state.intervalId);
    }
    setState((state: State) => ({
      ...state,
      intervalId: null
    }));
  }
}

export class StepAction extends ControlAction {
  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return {
      ...state,
      configuration: this.next(state.configuration)
    }
  }
}

export class ResetAction extends ControlAction {
  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return {
      ...state,
      configuration: this.load(state.initial)
    }
  }
}

// ------------------------------------------

export function createControlActionsFromSemantics(semantics: Semantics) {
  const load = semantics.load;
  const next = semantics.next;
  return {
    edit: new EditAction(load, next),
    doneEditing: new DoneEditingAction(load, next),
    run: new RunAction(load, next),
    stop: new StopAction(load, next),
    step: new StepAction(load, next),
    reset: new ResetAction(load, next)
  };
}
