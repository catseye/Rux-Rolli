import * as React from "react";

import { ChangeEvent } from "react";

import { StoreContext, State } from "./Store";
import { ActionButton } from "./ActionButton";
import { Editor } from "./Editor";
import { Display } from "./Display";

interface MainStageProps {
  actions: any;
}

export function MainStage(props: MainStageProps) {
  const [state, setState] = React.useContext(StoreContext);
  const onEditorChange = function(ev: ChangeEvent<HTMLTextAreaElement>) {
    setState((state: State) => ({
      ...state,
      initial: ev.target.value
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
          <Editor onChange={onEditorChange} programText={ state.initial } /> :
          <Display configuration={ state.configuration } />
        }
        <p>{ state.status }</p>
      </div>
    </div>
  );
}
