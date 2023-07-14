import { Stack, mapStack } from "../../configurations/Stack";

interface StackViewProps {
  stack: Stack;
}

export function StackView(props: StackViewProps) {
  return (
    <div className="display-stack">
      { mapStack(props.stack, (s, index) => <span key={index}>{s}</span>) }
    </div>
  );
}

/*
export function DisplayCell(props: any) {
    const char = props.char;
    const cursors = props.cursors;
    return (
        (cursors.length) ? ( <span style={{backgroundColor: "blue"}}>{ char }</span> ) : ( <span>{ char }</span> )
    )
}
*/