import * as React from "react";

import { State, SetStateType } from "../state";

import { StoreContext } from "./Store";
import { BaseCommand } from "../commands/BaseCommand";

interface CommandButtonProps {
  command: BaseCommand;
  label: string;
}

export function makeClickHandler(command: BaseCommand, state: State, setState: SetStateType) {
  return function(_event: React.MouseEvent) {
    command.enact.bind(command)(state, setState);
  };
}

export function CommandButton(props: CommandButtonProps) {
  const [state, setState] = React.useContext(StoreContext);
  const onClick = makeClickHandler(props.command, state, setState);
  const disabled = (!props.command.isPossible(state)) || (!props.command.isAvailableToUser(state));
  return (
    <button className="command-button" disabled={disabled} onClick={onClick}>
      {props.label}
    </button>
  );
}
