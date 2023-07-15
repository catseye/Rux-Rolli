import * as React from "react";

import { StoreContext, initializeStore } from "./components/Store";
import { createCommandsFromSemantics } from "./commands/ControlCommand";
import { Semantics } from "./semantics";
import { Thencemuffin } from "./semantics/Thencemuffin";
import { MainStage } from "./components/MainStage";
import { State } from "./state";

const allSemantics = {
  Thencemuffin: Thencemuffin
};

interface SemanticsContainerProps {
  semantics: Semantics;
}

function SemanticsContainer(props: SemanticsContainerProps) {
  const commands = createCommandsFromSemantics(props.semantics);
  const programText = 'THUSINESS';
  const [state, setState] = initializeStore(programText, props.semantics.load(programText));

  React.useEffect(() => {
    if (state.issuedCommands.length > 0) {
      // We register this setState first, so that any setStates that
      // happen as part of the effects of the issued commands, below,
      // queue their own issuedCommands onto a new empty list.
      setState((state: State) => {
        return {
          ...state,
          issuedCommands: []
        };
      })
      for (let i = state.issuedCommands.length - 1; i >= 0; i--) {
        const command = state.issuedCommands[i];
        const effect = command.effect.bind(command);
        console.log('EFFECT:', command.name);
        effect(state, setState);
      }
    }
  }, [state.issuedCommands]);

  return (
    <StoreContext.Provider value={[state, setState]}>
      <MainStage commands={commands}/>
    </StoreContext.Provider>
  );
}

function App(_props: any) {
  return (
    <div>
      <h1>Thencemuffin</h1>
      <SemanticsContainer semantics={allSemantics.Thencemuffin} />
    </div>
  )
}
  
export default App
