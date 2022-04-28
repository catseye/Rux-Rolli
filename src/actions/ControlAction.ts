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
  name = "edit";

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
  name = "doneEditing";

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
  name = "step";

  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return performStep(state, this.next);
  }
}

export class RunAction extends ControlAction {
  name = "run";

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
      setState((state: State) => performStep(state, this.next));
      new RunAction(this.load, this.next).effect(state, setState);
    }, 250);
    setState((state: State) => ({
      ...state,
      intervalId: intervalId
    }));
  }

}

export class StopAction extends ControlAction {
  name = "stop";

  isPossible(state: State): boolean {
    return state.status === 'Running';
  }

  transformer(state: State): State {
    return {
      ...state,
      status: 'Stopped',
      requestedEffect: 'CancelTimer'
    }
  }

  effect(state: State, setState: SetStateType): void {
    // if (state.intervalId) {
    //   clearTimeout(state.intervalId);
    // }
    // setState((state: State) => ({
    //   ...state,
    //   intervalId: null
    // }));
  }
}

export class ResetAction extends ControlAction {
  name = "reset";

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

export interface ControlActions {
  edit: ControlAction;
  doneEditing: ControlAction;
  run: ControlAction;
  stop: ControlAction;
  step: ControlAction;
  reset: ControlAction;
}

// ------------------------------------------

export function createControlActionsFromSemantics(semantics: Semantics): ControlActions {
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
