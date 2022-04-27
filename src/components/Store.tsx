import * as React from "react";

import { Configuration } from "../configurations/Configuration";
import { State } from "../state";

export const StoreContext = React.createContext<[State, DispatchType]>(null);

export type Action = any;

export function initializeStore(programText: string, configuration: Configuration) {
  const initialState: State = {
    status: 'Stopped',
    initial: programText,
    configuration: configuration,
    intervalId: null
  };
  const reducer = (state: State, action: Action) => {
    return state
  };
  return React.useReducer<React.Reducer<State, Action>, any>(reducer, initialState, null);
}

export type DispatchType = (a: Action) => void;
