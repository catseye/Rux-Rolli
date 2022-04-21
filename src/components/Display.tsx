import * as React from "react";

import { Configuration } from "../configurations/Configuration";

interface DisplayProps {
  configuration: Configuration;
}

export function Display(props: DisplayProps) {
  if (props.configuration.type === "text") {
    return (
        <pre>{ props.configuration.contents }</pre>
    );
  } else {
    return (
        <div>
          <em>Invalid configuration type "{props.configuration.type}"</em>
        </div>
    );
  }
}
