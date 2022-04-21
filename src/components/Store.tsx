import * as React from "react";

export interface Configuration {
  type: 'text' | 'playfield' | 'stack';
  contents: string;
}

export interface State {
  status: 'Editing' | 'Stopped' | 'Running';
  initial: string;
  configuration: Configuration | null;
  intervalId: number | null;
}

// TODO: The 'any' should really be 'Dispatch<SetStateAction<State>>'
export const StoreContext = React.createContext<[State, any]>(null);
