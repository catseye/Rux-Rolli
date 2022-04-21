import * as React from "react";
import * as ReactDOM from "react-dom";

import { StoreContext, State } from "./components/Store";
import { createActionsFrom } from "./actions";
import { MainStage } from "./components/MainStage";


function App(props: any) {

  const load = function(programText: string) {
    return {
      type: "text",
      contents: programText
    };
  }
  const next = function(configuration: any) {
    return {
      type: "text",
      contents: configuration.contents + "A"
    };
  }
  const actions = createActionsFrom(load, next);

  const initialState: State = {
    status: 'Stopped',
    initial: 'THUSNESS',
    configuration: load('THUSNESS'),
    intervalId: null
  };
  const [state, stateSetState] = React.useState<State>(initialState);

  return (
    <StoreContext.Provider value={[state, stateSetState]}>
      <MainStage actions={actions}/>
    </StoreContext.Provider>
  );
}

// ========================================
  
ReactDOM.render(<App />, document.getElementById("root"));
  
