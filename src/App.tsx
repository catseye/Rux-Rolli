import * as React from "react";
import * as ReactDOM from "react-dom";

import { State } from "./state";
import { StoreContext, initializeStore } from "./components/Store";
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
  const [state, dispatch] = initializeStore(programText, props.semantics.load(programText), actions);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
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
  
