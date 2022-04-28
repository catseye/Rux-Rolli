import { State, SetStateType } from "../state";

import { BaseCommand } from "./BaseCommand";
import { Semantics, LoadFunction, NextFunction } from "../semantics"


class ControlCommand extends BaseCommand {
  load: LoadFunction;
  next: NextFunction;

  constructor(load: LoadFunction, next: NextFunction) {
    super();
    this.load = load;
    this.next = next;
  }
}

export class EditCommand extends ControlCommand {
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

export class DoneEditingCommand extends ControlCommand {
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
  // Used as the basis for both StepCommand's transformer and RunCommand's effect.
  const configuration = next(state.configuration);
  const status = configuration === null ? 'Terminated' : state.status;
  return {
    ...state,
    status: status,
    configuration: configuration,
    intervalId: null
  }
}

export class StepCommand extends ControlCommand {
  name = "step";

  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    return performStep(state, this.next);
  }
}

export class RunCommand extends ControlCommand {
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
      new RunCommand(this.load, this.next).effect(state, setState);
    }, 250);
    setState((state: State) => ({
      ...state,
      intervalId: intervalId
    }));
  }

}

export class StopCommand extends ControlCommand {
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

export class ResetCommand extends ControlCommand {
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

export interface ControlCommands {
  edit: ControlCommand;
  doneEditing: ControlCommand;
  run: ControlCommand;
  stop: ControlCommand;
  step: ControlCommand;
  reset: ControlCommand;
}

// ------------------------------------------

export function createCommandsFromSemantics(semantics: Semantics): ControlCommands {
  const load = semantics.load;
  const next = semantics.next;
  return {
    edit: new EditCommand(load, next),
    doneEditing: new DoneEditingCommand(load, next),
    run: new RunCommand(load, next),
    stop: new StopCommand(load, next),
    step: new StepCommand(load, next),
    reset: new ResetCommand(load, next)
  };
}
