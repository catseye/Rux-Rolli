import { Configuration, mapComposite } from "../configurations/Configuration";
import { mapStack } from "../configurations/Stack";
import { dumpWithinExtents } from "../configurations/Playfield";

import { DisplayText } from "./DisplayText";

interface DisplayProps {
  configuration: Configuration;
}

export function Display(props: DisplayProps) {
  if (props.configuration.type === "text") {
    return <DisplayText text={props.configuration} />;
  } else if (props.configuration.type === "stack") {
    return <DisplayStack stack={props.configuration} />;
  } else if (props.configuration.type === "playfield") {
    return <DisplayPlayfield playfield={props.configuration} />;
  } else if (props.configuration.type === "composite") {
    return <DisplayComposite composite={props.configuration} />;
  }
}

export function DisplayStack(props: any) {
  return (
    <div className="display-stack">
      { mapStack(props.stack, (s, index) => <span key={index}>{s}</span>) }
    </div>
  );
}

export function DisplayPlayfield(props: any) {
  return (
    <div className="display-playfield">
      { dumpWithinExtents(props.playfield, 0, 0, 10, 10) }
    </div>
  );
}

export function DisplayComposite(props: any) {
  return (
    <div className="display-composite">
      { mapComposite(props.composite, (c, index) => <Display key={index} configuration={c} />) }
    </div>
  );
}
