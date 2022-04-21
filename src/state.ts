export interface Text {
  type: 'text';
  contents: string;
}

export interface Playfield {
  type: 'playfield';
  contents: Array<Array<string>>;
}

export interface Stack {
  type: 'stack';
  contents: Array<string>;
}

export interface Composite {
  type: 'composite';
  contents: Array<Configuration>;
}

export type Configuration = Text | Playfield | Stack | Composite;

export interface State {
  status: 'Editing' | 'Stopped' | 'Running';
  initial: string;
  configuration: Configuration | null;
  intervalId: any;  // TODO "NodeJS.Timeout"
}

export type SetStateType = (fun:(s: State) => State) => void;
