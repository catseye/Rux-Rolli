import * as React from "react";
import * as ReactDOM from "react-dom";

import { StoreContext, State, Configuration } from "./components/Store";
import { createActionsFrom } from "./actions";
import { MainStage } from "./components/MainStage";

interface AppProps {
}

function App(props: AppProps) {

  const load = function(programText: string): Configuration {
    return {
      type: "text",
      contents: programText
    };
  }
  const next = function(configuration: Configuration): Configuration {
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
  
