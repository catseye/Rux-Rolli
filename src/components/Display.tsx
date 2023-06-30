import * as React from "react";

import { Configuration } from "../configurations/Configuration";
import { dump } from "../configurations/Playfield";

interface DisplayProps {
  configuration: Configuration;
}

export function Display(props: DisplayProps) {
  if (props.configuration.type === "text") {
    return (
      <div className="display-text">
        <pre>{ props.configuration.contents }</pre>
        <div>{ props.configuration.cursors }</div>
      </div>
    );
  } else if (props.configuration.type === "stack") {
    return (
      <div className="display-stack">
        { props.configuration.contents.map((s, index) => <span key={index}>{s}</span>) }
      </div>
    );
  } else if (props.configuration.type === "playfield") {
    return (
      <div className="display-playfield">
        { dump(props.configuration) }
      </div>
    );
  } else if (props.configuration.type === "composite") {
    return (
      <div className="display-composite">
        {props.configuration.contents.map((c, index) => <Display key={index} configuration={c} />)}
      </div>
    );
  }
}
