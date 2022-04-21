export interface Configuration {
  type: 'text' | 'playfield' | 'stack' | 'tape';
  contents: string;
}

export interface State {
  status: 'Editing' | 'Stopped' | 'Running';
  initial: string;
  configuration: Configuration | null;
  intervalId: any;  // TODO "NodeJS.Timeout"
}

export type SetStateType = (fun:(s: State) => State) => void;
