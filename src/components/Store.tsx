import * as React from "react";

import { State, SetStateType } from "../state";
import { Configuration } from "../configurations/Configuration";

export const StoreContext = React.createContext<[State, SetStateType]>(null);

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
