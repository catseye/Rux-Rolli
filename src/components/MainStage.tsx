import * as React from "react";

import { StoreContext, State } from "./Store";
import { ActionButton } from "./ActionButton";
import { Editor } from "./Editor";

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
        <ActionButton action={props.actions.edit} label="Edit" />
        <ActionButton action={props.actions.doneEditing} label="Done" />
        <ActionButton action={props.actions.step} label="Step" />
        <ActionButton action={props.actions.run} label="Run" />
        <ActionButton action={props.actions.stop} label="Stop" />
        <ActionButton action={props.actions.reset} label="Reset" />
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
