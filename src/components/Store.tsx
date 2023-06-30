import * as React from "react";

import { State, SetStateType } from "../state";
import { Configuration } from "../configurations/Configuration";

const defaultState: State = {
  status: 'Stopped',
  initial: "",
  configuration: null,
  intervalId: null,
  issuedCommands: []
};
const defaultSetState: SetStateType = function(f) { return f; };

export const StoreContext = React.createContext<[State, SetStateType]>([defaultState, defaultSetState]);

export function initializeStore(programText: string, configuration: Configuration) {
  const makeInitialState = (programText: string): State => {
    return {
      status: 'Stopped',
      initial: programText,
      configuration: configuration,
      intervalId: null,
      issuedCommands: []
    };
  };
  return React.useState<State>(makeInitialState(programText));
}
