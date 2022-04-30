import * as React from "react";
import * as ReactDOM from "react-dom";

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
    if (state.issuedCommands.length > 0) {
      for (let i = state.issuedCommands.length - 1; i >= 0; i--) {
        const command = state.issuedCommands[i];
        // TODO: effect should always be a function here; but sometimes it isn't?
        if (command.effect) {
          const effect = command.effect.bind(command);
          console.log('EFFECT:', command.name);
          effect(state, setState);
        } else {
          console.log('??? command:', command, 'command.effect:', command.effect);
        }
      }
      setState((state) => {
        return {
          ...state,
          requestedEffect: []
        };
      })
    }
  }, [state.issuedCommands]);

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
  
