import { State } from "../state";

import { BaseAction } from "./BaseAction";
import { Semantics, LoadFunction, NextFunction } from "../semantics"
import { DispatchType } from "../components/Store";


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
    return state.status === 'Stopped' || state.status === 'Terminated';
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

function performStep(state: State, next: NextFunction) {
  // Used as the basis for both StepAction's transformer and RunAction's effect.
  const configuration = next(state.configuration);
  const status = configuration === null ? 'Terminated' : state.status;
  return {
    ...state,
    status: status,
    configuration: configuration,
    intervalId: null
  }
}

export class StepAction extends ControlAction {
  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return performStep(state, this.next);
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

  effect(state: State, dispatch: DispatchType): void {
    const intervalId = setTimeout(() => {
      dispatch({type: 'STEP'});
      new RunAction(this.load, this.next).effect(state, dispatch);
    }, 250);
    dispatch({type: 'SET_TIMER', intervalId: intervalId});
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

  effect(state: State, dispatch: DispatchType): void {
    if (state.intervalId) {
      clearTimeout(state.intervalId);
    }
    dispatch({type: 'CLEAR_TIMER'});
  }
}

export class ResetAction extends ControlAction {
  isPossible(state: State): boolean {
    return state.status === 'Stopped' || state.status === 'Terminated';
  }

  transformer(state: State): State {
    return {
      ...state,
      status: 'Stopped',
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
