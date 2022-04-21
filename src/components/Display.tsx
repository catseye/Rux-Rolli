import * as React from "react";

interface DisplayProps {
  configuration: any;
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
