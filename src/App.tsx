import * as React from "react";
import * as ReactDOM from "react-dom";

import { StoreContext, State } from "./components/Store";
import { EditAction, DoneEditingAction, RunAction, StopAction, StepAction, ResetAction } from "./actions";
import { MainStage } from "./components/MainStage";


function App(props: any) {
  const initialState: State = {
    status: 'Stopped',
    initial: 'THUSNESS',
    playfield: 'THUSNESS',
    intervalId: null
  };
  const [state, stateSetState] = React.useState<State>(initialState);

  const actions = {
    edit: new EditAction(),
    doneEditing: new DoneEditingAction(),
    run: new RunAction(),
    stop: new StopAction(),
    step: new StepAction(),
    reset: new ResetAction()
  }
  return (
    <StoreContext.Provider value={[state, stateSetState]}>
      <MainStage actions={actions}/>
    </StoreContext.Provider>
  );
}

// ========================================
  
ReactDOM.render(<App />, document.getElementById("root"));
  
