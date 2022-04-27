import * as React from "react";

import { State } from "../state";

import { DispatchType, StoreContext } from "./Store";
import { Action } from "../actions/BaseAction";

interface ActionButtonProps {
  action: Action;
  label: string;
}

export function makeClickHandler(action: Action, state: State, dispatch: DispatchType) {
  return function(e: React.MouseEvent) {
    action.enact(state, dispatch);
  };
}

export function ActionButton(props: ActionButtonProps) {
  const [state, dispatch] = React.useContext(StoreContext);
  const onClick = makeClickHandler(props.action, state, dispatch);
  const disabled = !props.action.isPossible(state);
  return (
    <button className="action-button" disabled={disabled} onClick={onClick}>
      {props.label}
    </button>
  );
}
