import * as React from "react";

interface EditorProps {
  playfield: string;
  onChange: any;
}

export function Editor(props: EditorProps) {
  return (
    <div>
      <textarea onChange={props.onChange} value={ props.playfield }/>
    </div>
  );
}
