import * as React from "react";

interface EditorProps {
  programText: string;
  onChange: any;
}

export function Editor(props: EditorProps) {
  return (
    <div>
      <textarea onChange={props.onChange} value={ props.programText }/>
    </div>
  );
}
