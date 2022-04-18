import { clearInterval } from "timers";
import { State } from "./components/Store";


export interface Action {
  isPossible: (state: State) => boolean;
  transformer: (state: State) => State;
  effect?: ((state: State, setState: any) => void);
}


// ----------------------------------------------------------------- //

export function enact(action: Action, state: State, setState: any) {
  if (action.isPossible(state)) {
    if (action.effect) {
      action.effect(state, setState);
    }
    setState(action.transformer);
  }
}

// ----------------------------------------------------------------- //

export const editAction: Action = {
  isPossible: function(state) {
    return state.status === 'Stopped';
  },
  transformer: (state) => ({
    ...state,
    status: 'Editing'
  })
};

export const doneEditingAction: Action = {
  isPossible: function(state) {
    return state.status === 'Editing';
  },
  transformer: (state) => ({
    ...state,
    playfield: state.initial,
    status: 'Stopped'
  })
};

export const runAction: Action = {
  isPossible: function(state) {
    return state.status === 'Stopped';
  },
  transformer: (state) => ({
    ...state,
    status: 'Running'
  }),
  effect: (state, setState) => {
    const intervalId = setTimeout(() => {
      enact(stepAction, state, setState);
      setState((state: State) => ({
        ...state,
        intervalId: null
      }));
      runAction.effect(state, setState);
    }, 250);
    setState((state: State) => ({
      ...state,
      intervalId: intervalId
    }));
  }
};

export const stopAction: Action = {
  isPossible: function(state) {
    return state.status === 'Running';
  },
  transformer: (state) => ({
    ...state,
    status: 'Stopped'
  }),
  effect: (state, setState) => {
    if (state.intervalId) {
      clearTimeout(state.intervalId);
    }
    setState((state: State) => ({
      ...state,
      intervalId: null
    }));
  }
};

export const stepAction: Action = {
  isPossible: function(state) {
    return state.status === 'Stopped';
  },
  transformer: (state) => ({
    ...state,
    playfield: state.playfield + 'A'
  })
};

export const resetAction: Action = {
  isPossible: function(state) {
    return state.status === 'Stopped';
  },
  transformer: (state) => ({
    ...state,
    playfield: state.initial
  })
};
