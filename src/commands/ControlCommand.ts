import { State } from "../state";

import { BaseCommand } from "./BaseCommand";
import { Semantics, LoadFunction, NextFunction } from "../semantics"
import { DispatchType, Action } from "../components/Store";


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
      configuration: configuration,
      intervalId: null
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

  effect(dispatch: DispatchType): void {
    const $this = this;
    const intervalId = setTimeout(() => {
      dispatch({type: 'ACTION', name: 'step'});
      $this.effect(dispatch);
    }, 250);
    dispatch({type: 'SET_TIMER', intervalId: intervalId});
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
      status: 'Stopped'
    }
  }

  effect(dispatch: DispatchType): void {
    /*
    if (state.intervalId) {
      clearTimeout(state.intervalId);
    }
    */
    dispatch({type: 'CLEAR_TIMER'});
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

export function createReducer(commands: ControlCommands) {

  const reducer = (state: State, action: Action): State => {
    console.log('action:', action, 'state:', state);
    switch (action.type) {
      case 'COMMAND':
      {
        const a: ControlCommand = commands[action.name];
        if (a) {
          state = a.transformer.bind(a)(state);
        } else {
          console.log('command name???', action.name, commands);
        };
        break;
      }
      case 'SET_PROGRAM_TEXT':
      {
        state = {
          ...state,
          initial: action.initial
        };
        break;
      }
      case 'SET_TIMER':
      {
        state = {
          ...state,
          intervalId: action.intervalId
        };
        break;
      }
      case 'CLEAR_TIMER':
      {
        state = {
          ...state,
          intervalId: null
        };
        break;
      }
    }
    return state;
  };

  return reducer;
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
