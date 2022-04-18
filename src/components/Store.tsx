import * as React from "react";

export interface State {
  status: 'Editing' | 'Stopped' | 'Running';
  initial: string;
  playfield: string;
  intervalId: number | null;
}

// TODO: The 'any' should really be 'Dispatch<SetStateAction<State>>'
export const StoreContext = React.createContext<[State, any]>(null);
