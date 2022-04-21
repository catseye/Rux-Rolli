import * as React from "react";

import { MouseEvent } from "react";

import { StoreContext, State } from "./Store";
import { Action } from "../actions";

// more strict than the one defined in Store
type SetStateType = (fun:(s: State) => State) => void;

interface ActionButtonProps {
  action: Action;
  label: string;
}

export function makeClickHandler(action: Action, state: State, setState: SetStateType) {
  return function(e: MouseEvent) {
    action.enact(state, setState);
  };
}

export function ActionButton(props: ActionButtonProps) {
  const [state, setState] = React.useContext(StoreContext);
  const onClick = makeClickHandler(props.action, state, setState);
  const disabled = !props.action.isPossible(state);
  return (
    <button className="action_button" disabled={disabled} onClick={onClick}>
      {props.label}
    </button>
  );
}
