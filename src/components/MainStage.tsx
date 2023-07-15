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
    setState((state: State) => {
        if (state.status === 'WaitingForInput') {
          // FIXME: what if it wasn't previously running?
          props.commands.run.enact(state, setState);
        }
        return {
        ...state,
        inputBuffer: ev.target.value
      }
    });
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
  let statusText = props.status;
  if (statusText === "WaitingForInput") { statusText = "Waiting for Input"; }
  let statusColor = "orange";
  if (props.status === 'Stopped') {
    statusColor = "grey";
  } else if (props.status === 'Running') {
    statusColor = "green";
  } else if (props.status === 'Terminated') {
    statusColor = "red";
  }
  return <span style={{margin: "1em", color: statusColor, minWidth: "10em", display: "inline-block"}}>{ statusText }</span>
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
