import { Configuration, mapComposite } from "../../configurations/Configuration";

import { TextView } from "./TextView";
import { StackView } from "./StackView";
import { PlayfieldView } from "./PlayfieldView";

interface DisplayProps {
  configuration: Configuration;
}

export function ConfigurationView(props: DisplayProps) {
  if (props.configuration.type === "text") {
    return <TextView text={props.configuration} />;
  } else if (props.configuration.type === "stack") {
    return <StackView stack={props.configuration} />;
  } else if (props.configuration.type === "playfield") {
    return <PlayfieldView playfield={props.configuration} />;
  } else if (props.configuration.type === "composite") {
    return <CompositeView composite={props.configuration} />;
  }
}

export function CompositeView(props: any) {
  return (
    <div className="display-composite">
      { mapComposite(props.composite, (c, index) => <ConfigurationView key={index} configuration={c} />) }
    </div>
  );
}
