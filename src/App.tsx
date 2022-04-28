import * as React from "react";
import * as ReactDOM from "react-dom";

import { State } from "./state";
import { StoreContext, initializeStore } from "./components/Store";
import { createCommandsFromSemantics } from "./commands/ControlCommand";
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
  const commands = createCommandsFromSemantics(props.semantics);
  const programText = 'THUSNESS';
  const [state, setState] = initializeStore(programText, props.semantics.load(programText));

  React.useEffect(() => {
    if (state.requestedEffect) {
      console.log('requestedEffect', state.requestedEffect)
      state.requestedEffect(state, setState);
      setState((state) => {
        return {
          ...state,
          requestedEffect: null
        };
      })
    }
  });

  return (
    <StoreContext.Provider value={[state, setState]}>
      <MainStage commands={commands}/>
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
  
