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

export class StepCommand extends ControlCommand {
  name = "step";

  isPossible(state: State): boolean {
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    const configuration = this.next(state.configuration);
    const status = configuration === null ? 'Terminated' : state.status;
    return {
      ...state,
      status: status,
      configuration: configuration
    }
  }

  effect = (state: State, setState: SetStateType): void => {
    // If we take a step, and we are in the 'Running' state,
    // then we set things up so that we take another step.
    // (But if we are in 'Stopped' or 'Terminated' we do nothing.)
    if (state.status === 'Running') {
      const $this = this;
      const intervalId = setTimeout(() => {
        $this.enact(state, setState);
      }, 250);
      setState((state: State) => ({
        ...state,
        intervalId: intervalId
      }));
    } else {
      if (state.intervalId) {
        clearTimeout(state.intervalId);
      }  
      setState((state: State) => ({
        ...state,
        intervalId: null
      }));
    }
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
    }
  }

  effect = (state: State, setState: SetStateType): void => {
    if (state.intervalId) {
      clearTimeout(state.intervalId);
    }
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
