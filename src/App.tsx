import * as React from "react";
import * as ReactDOM from "react-dom";

import { State } from "./state";
import { StoreContext } from "./components/Store";
import { createControlActionsFromSemantics } from "./actions/ControlAction";
import { Hencemuffin } from "./semantics/Hencemuffin";
import { Thencemuffin } from "./semantics/Thencemuffin";
import { MainStage } from "./components/MainStage";

const allSemantics = {
  Hencemuffin: Hencemuffin,
  Thencemuffin: Thencemuffin
};

interface AppProps {
}

function App(props: AppProps) {
  const semantics = allSemantics["Hencemuffin"];

  const actions = createControlActionsFromSemantics(semantics);

  const programText = 'THUSNESS';

  const initialState: State = {
    status: 'Stopped',
    initial: programText,
    configuration: semantics.load(programText),
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
  
