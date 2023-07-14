import { ChangeEventHandler } from "react";

interface EditorProps {
  programText: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export function Editor(props: EditorProps) {
  return (
    <div>
      <textarea onChange={props.onChange} value={ props.programText }/>
    </div>
  );
}
