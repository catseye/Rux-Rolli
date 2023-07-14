import { Stack, mapStack } from "../../configurations/Stack";

interface StackViewProps {
  stack: Stack;
}

export function StackView(props: StackViewProps) {
  return (
    <div className="display-stack">
      { mapStack(props.stack, (s, index) => <DisplayCell key={index} contents={s} />) }
    </div>
  );
}

export function DisplayCell(props: any) {
  return <span>{props.contents}</span>;
}
