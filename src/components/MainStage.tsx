import * as React from "react";

import { ChangeEvent } from "react";

import { ControlCommands } from "../commands/ControlCommand";
import { State } from "../state";

import { StoreContext } from "./Store";
import { CommandButton } from "./CommandButton";
import { Editor } from "./Editor";
import { ConfigurationView } from "./view/View";

interface MainStageProps {
  commands: ControlCommands;
}

export function MainStage(props: MainStageProps) {
  const [state, setState] = React.useContext(StoreContext);
  const onEditorChange = function(ev: ChangeEvent<HTMLTextAreaElement>) {
    setState((state: State) => ({
      ...state,
      initial: ev.target.value
    }));
  };

  const onInputChange = function(ev: ChangeEvent<HTMLInputElement>) {
    setState((state: State) => ({
      ...state,
      inputBuffer: ev.target.value
    }));
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
        <StatusIndicator status={state.status} />
        <InputArea value={state.inputBuffer} onChange={onInputChange} />
      </div>
      <div>
        {state.status === 'Editing' ?
          <Editor onChange={onEditorChange} programText={ state.initial } /> :
          <ConfigurationView configuration={ state.configuration } />
        }
      </div>
    </div>
  );
}

export function StatusIndicator(props: any) {
  return <span style={{margin: "1em", color: "yellowgreen"}}>{ props.status }</span>
}

function InputArea(props: any) {
  return (
    <label>
      <input
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
}
