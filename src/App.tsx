import * as React from "react";
import * as ReactDOM from "react-dom";

import { StoreContext, State } from "./components/Store";
import { MainStage } from "./components/MainStage";


function App(props: any) {
  const initialState: State = {
    status: 'Stopped',
    initial: 'THUSNESS',
    playfield: 'THUSNESS',
    intervalId: null
  };
  const [state, stateSetState] = React.useState<State>(initialState);

  return (
    <StoreContext.Provider value={[state, stateSetState]}>
      <MainStage />
    </StoreContext.Provider>
  );
}

// ========================================
  
ReactDOM.render(<App />, document.getElementById("root"));
  
