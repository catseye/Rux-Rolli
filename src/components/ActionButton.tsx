import * as React from "react";

import { State, SetStateType } from "../state";

import { StoreContext } from "./Store";
import { Action } from "../actions/BaseAction";

interface ActionButtonProps {
  action: Action;
  label: string;
}

export function makeClickHandler(action: Action, state: State, setState: SetStateType) {
  return function(e: React.MouseEvent) {
    action.enact(state, setState);
  };
}

export function ActionButton(props: ActionButtonProps) {
  const [state, setState] = React.useContext(StoreContext);
  const onClick = makeClickHandler(props.action, state, setState);
  const disabled = !props.action.isPossible(state);
  return (
    <button className="action-button" disabled={disabled} onClick={onClick}>
      {props.label}
    </button>
  );
}
