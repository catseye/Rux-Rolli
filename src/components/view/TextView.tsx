import { Text, mapText, Range } from "../../configurations/Text";

interface TextViewProps {
  text: Text;
}

export function TextView(props: TextViewProps) {
  return (
    <div className="display-text">
      { mapText(props.text, (index: number, char: String, cursors: Array<Range>) => <DisplayCell key={index} char={char} cursors={cursors} />) }
    </div>
  );
}

export function DisplayCell(props: any) {
    const char = props.char;
    const cursors = props.cursors;
    return (
        (cursors.length) ? ( <span style={{backgroundColor: "blue"}}>{ char }</span> ) : ( <span>{ char }</span> )
    )
}