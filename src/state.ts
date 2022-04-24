import { Configuration } from "./configurations/Configuration";

export interface State {
  status: 'Editing' | 'Stopped' | 'Running' | 'Terminated';
  initial: string;
  configuration: Configuration | null;
  intervalId: any;  // TODO "NodeJS.Timeout"
}

export type SetStateType = (fun:(s: State) => State) => void;
