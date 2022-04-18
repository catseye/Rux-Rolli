import * as React from "react";

import { StoreContext, State } from "./Store";
import { ActionButton } from "./ActionButton";
import { Editor } from "./Editor";
import { editAction, doneEditingAction, runAction, stopAction, stepAction, resetAction } from "../actions";

export function MainStage(props: any) {
  const [state, setState] = React.useContext(StoreContext);
  const onEditorChange = function(event: any) {
    setState((state: State) => ({
      ...state,
      initial: event.target.value
    }));
  };
  return (
    <div>
      <div>
        <ActionButton action={editAction} label="Edit" />
        <ActionButton action={doneEditingAction} label="Done" />
        <ActionButton action={stepAction} label="Step" />
        <ActionButton action={runAction} label="Run" />
        <ActionButton action={stopAction} label="Stop" />
        <ActionButton action={resetAction} label="Reset" />
      </div>
      <div>
        {state.status === 'Editing' ?
          <Editor onChange={onEditorChange} playfield={ state.initial } /> :
          <pre>{ state.playfield}</pre>
        }
        <p>{ state.status }</p>
      </div>
    </div>
  );
}
