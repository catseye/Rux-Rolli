import { Text, mapText } from "../configurations/Text";

interface DisplayTextProps {
  text: Text;
}

export function DisplayText(props: DisplayTextProps) {
  return (
    <div className="display-text">
      { mapText(props.text, (char, cursors) => <DisplayCell char={char} cursors={cursors} />) }
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