import * as React from "react";

import { Configuration, mapComposite } from "../configurations/Configuration";
import { getString, getCursors } from "../configurations/Text";
import { mapStack } from "../configurations/Stack";
import { dump } from "../configurations/Playfield";

interface DisplayProps {
  configuration: Configuration;
}

export function Display(props: DisplayProps) {
  if (props.configuration.type === "text") {
    const text = props.configuration;
    return (
      <div className="display-text">
        <pre>{ getString(text) }</pre>
        <div>{ getCursors(text) }</div>
      </div>
    );
  } else if (props.configuration.type === "stack") {
    const stack = props.configuration;
    return (
      <div className="display-stack">
        { mapStack(stack, (s, index) => <span key={index}>{s}</span>) }
      </div>
    );
  } else if (props.configuration.type === "playfield") {
    const playfield = props.configuration;
    return (
      <div className="display-playfield">
        { dump(playfield) }
      </div>
    );
  } else if (props.configuration.type === "composite") {
    const composite = props.configuration;
    return (
      <div className="display-composite">
        { mapComposite(composite, (c, index) => <Display key={index} configuration={c} />) }
      </div>
    );
  }
}
