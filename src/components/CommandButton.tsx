import * as React from "react";

import { DispatchType, StoreContext } from "./Store";
import { Command } from "../commands/BaseCommand";

interface CommandButtonProps {
  command: Command;
  label: string;
}

export function makeClickHandler(command: Command, dispatch: DispatchType) {
  return function(e: React.MouseEvent) {
    command.effect(dispatch);
    const message = {type: 'COMMAND', name: command.name};
    dispatch(message);
  };
}

export function CommandButton(props: CommandButtonProps) {
  const [state, dispatch] = React.useContext(StoreContext);
  const onClick = makeClickHandler(props.command, dispatch);
  const disabled = !props.command.isPossible(state);
  return (
    <button className="command-button" disabled={disabled} onClick={onClick}>
      {props.label}
    </button>
  );
}
