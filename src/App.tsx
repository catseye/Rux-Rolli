import * as React from "react";
import * as ReactDOM from "react-dom";

import { State } from "./state";
import { StoreContext } from "./components/Store";
import { createControlActionsFrom } from "./actions/ControlAction";
import { Hencemuffin } from "./semantics/Hencemuffin";
import { MainStage } from "./components/MainStage";

interface AppProps {
}

function App(props: AppProps) {
  const actions = createControlActionsFrom(Hencemuffin.load, Hencemuffin.next);

  const initialState: State = {
    status: 'Stopped',
    initial: 'THUSNESS',
    configuration: Hencemuffin.load('THUSNESS'),
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
  
