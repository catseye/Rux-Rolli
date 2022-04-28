import * as React from "react";

import { ChangeEvent } from "react";

import { ControlCommands } from "../commands/ControlCommand";

import { StoreContext } from "./Store";
import { CommandButton } from "./CommandButton";
import { Editor } from "./Editor";
import { Display } from "./Display";

interface MainStageProps {
  commands: ControlCommands;
}

export function MainStage(props: MainStageProps) {
  const [state, dispatch] = React.useContext(StoreContext);
  const onEditorChange = function(ev: ChangeEvent<HTMLTextAreaElement>) {
    dispatch({type: 'SET_PROGRAM_TEXT', initial: ev.target.value});
  };
  return (
    <div>
      <div>
        <CommandButton command={props.commands.edit} label="Edit" />
        <CommandButton command={props.commands.doneEditing} label="Done" />
        <CommandButton command={props.commands.step} label="Step" />
        <CommandButton command={props.commands.run} label="Run" />
        <CommandButton command={props.commands.stop} label="Stop" />
        <CommandButton command={props.commands.reset} label="Reset" />
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
