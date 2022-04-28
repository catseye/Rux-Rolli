import * as React from "react";

import { Configuration } from "../configurations/Configuration";

interface DisplayProps {
  configuration: Configuration;
}

export function Display(props: DisplayProps) {
  if (!props.configuration) {
    // TODO This is less than ideal.  We probably want to
    // display the state in which it halted instead.
    // Such would require a different way of signalling halted.
    return <div>Game Over</div>;
  } else if (props.configuration.type === "text") {
    return (
      <div className="display-text">
        <pre>{ props.configuration.contents }</pre>
        <div>{ props.configuration.cursors }</div>
      </div>
    );
  } else if (props.configuration.type === "stack") {
    return (
      <div className="display-stack">
        { props.configuration.contents.map((s) => <span>{s}</span>) }
      </div>
    );
  } else if (props.configuration.type === "composite") {
    return (
      <div className="display-composite">
        {props.configuration.contents.map((c) => <Display configuration={c} />)}
      </div>
    );
  } else {
    return (
      <div>
        <em>Invalid configuration type "{props.configuration.type}"</em>
      </div>
    );
  }
}
