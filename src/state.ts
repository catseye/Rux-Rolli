import { BaseCommand } from "./commands/BaseCommand";
import { Configuration } from "./configurations/Configuration";

export interface State {
  status: 'Editing' | 'Stopped' | 'Running' | 'WaitingForInput' | 'Terminated';
  initial: string;
  configuration: Configuration;
  inputBuffer: string;
  intervalId: any;  // TODO "NodeJS.Timeout"
  issuedCommands: Array<BaseCommand>;
}

export type SetStateType = (fun:(s: State) => State) => void;
