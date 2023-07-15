import { State, SetStateType } from "../state";

import { BaseCommand } from "./BaseCommand";
import { Semantics, Action, LoadFunction, NextFunction, RecvFunction } from "../semantics"
import { Configuration } from "../configurations/Configuration";


/* STUB */
function getAvailableInput(): string | null {
  return "g";
}


class ControlCommand extends BaseCommand {
  load: LoadFunction;
  next: NextFunction;
  recv: RecvFunction;

  constructor(load: LoadFunction, next: NextFunction, recv: RecvFunction) {
    super();
    this.load = load;
    this.next = next;
    this.recv = recv;
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
    return state.status === 'Stopped' || state.status == 'Running';
  }

  isAvailableToUser(state: State): boolean {
    /*
     * Even though it is possible to `step` in the 'Running' state, the
     * `step` command is not available to the user in that state.
     */
    return state.status === 'Stopped';
  }

  transformer(state: State): State {
    const next: NextFunction = this.next.bind(this);
    const action = next(state.configuration);
    return this.handleAction(state, action);
  }

  handleAction(state: State, action: Action): State {
    if (action.type === 'next') {
      return {
        ...state,
        configuration: action.configuration
      }
    } else if (action.type === 'input') {
      if (state.inputBuffer === '') {
        return {
          ...state,
          status: 'WaitingForInput',
        }
      } else
      {
        const char = state.inputBuffer.charAt(0);
        const recv: RecvFunction = this.recv.bind(this);
        const newAction = recv(action.configuration, char);
        const newState = {
          ...state,
          inputBuffer: state.inputBuffer.substring(1)
        }
        // TODO: make this a loop instead of recursion
        return this.handleAction(newState, newAction);
      }
    } else { // action.type === 'halt'
      return {
        ...state,
        status: 'Terminated',
      }
    }
  }

  effect(state: State, setState: SetStateType): void {
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

  effect(state: State, setState: SetStateType): void {
    // Immediately after transitioning to 'Running' state, take
    // a step (which will, in this state, trigger subsequent steps).
    (new StepCommand(this.load, this.next, this.recv)).enact(state, setState);
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

  effect(state: State, setState: SetStateType): void {
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
  const recv = semantics.recv;
  return {
    edit: new EditCommand(load, next, recv),
    doneEditing: new DoneEditingCommand(load, next, recv),
    run: new RunCommand(load, next, recv),
    stop: new StopCommand(load, next, recv),
    step: new StepCommand(load, next, recv),
    reset: new ResetCommand(load, next, recv)
  };
}
