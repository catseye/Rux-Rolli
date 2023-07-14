import { Text, mapText } from "../../configurations/Text";

interface TextViewProps {
  text: Text;
}

export function TextView(props: TextViewProps) {
  // TODO key={index}, index in mapText!
  return (
    <div className="display-text">
      { mapText(props.text, (char: String, cursors: Array<number>) => <DisplayCell char={char} cursors={cursors} />) }
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