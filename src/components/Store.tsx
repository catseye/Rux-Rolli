import * as React from "react";

import { Dispatch, SetStateAction } from "react";

export interface Configuration {
  type: 'text' | 'playfield' | 'stack';
  contents: string;
}

export interface State {
  status: 'Editing' | 'Stopped' | 'Running';
  initial: string;
  configuration: Configuration | null;
  intervalId: any;  // TODO "NodeJS.Timeout"
}

export type SetStateType = Dispatch<SetStateAction<State>>;

export const StoreContext = React.createContext<[State, SetStateType]>(null);
