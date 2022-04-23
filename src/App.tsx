import * as React from "react";
import * as ReactDOM from "react-dom";

import { State } from "./state";
import { StoreContext } from "./components/Store";
import { createControlActionsFromSemantics } from "./actions/ControlAction";
import { Semantics } from "./semantics";
import { Hencemuffin } from "./semantics/Hencemuffin";
import { Thencemuffin } from "./semantics/Thencemuffin";
import { MainStage } from "./components/MainStage";

const allSemantics = {
  Hencemuffin: Hencemuffin,
  Thencemuffin: Thencemuffin
};

interface SemanticsContainerProps {
  semantics: Semantics;
}

function SemanticsContainer(props: SemanticsContainerProps) {
  const actions = createControlActionsFromSemantics(props.semantics);

  const programText = 'THUSNESS';

  const initialState: State = {
    status: 'Stopped',
    initial: programText,
    configuration: props.semantics.load(programText),
    intervalId: null
  };
  const [state, stateSetState] = React.useState<State>(initialState);

  return (
    <StoreContext.Provider value={[state, stateSetState]}>
      <MainStage actions={actions}/>
    </StoreContext.Provider>
  );
}

function App(props: any) {
  return (
    <div>
      <SemanticsContainer semantics={allSemantics.Hencemuffin} />
      <SemanticsContainer semantics={allSemantics.Thencemuffin} />
    </div>
  )
}
// ========================================
  
ReactDOM.render(<App />, document.getElementById("root"));
  
