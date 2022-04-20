import * as React from "react";
import * as ReactDOM from "react-dom";

import { StoreContext, State } from "./components/Store";
import { createActionsFrom } from "./actions";
import { MainStage } from "./components/MainStage";


function App(props: any) {
  const initialState: State = {
    status: 'Stopped',
    initial: 'THUSNESS',
    playfield: 'THUSNESS',
    intervalId: null
  };
  const [state, stateSetState] = React.useState<State>(initialState);

  const load = function(programText: string) {
    return programText;
  }
  const next = function(configuration: any) {
    return configuration + "A";
  }
  const actions = createActionsFrom(load, next);

  return (
    <StoreContext.Provider value={[state, stateSetState]}>
      <MainStage actions={actions}/>
    </StoreContext.Provider>
  );
}

// ========================================
  
ReactDOM.render(<App />, document.getElementById("root"));
  
