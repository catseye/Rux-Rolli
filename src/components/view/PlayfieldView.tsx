import { Playfield, dumpWithinExtents } from "../../configurations/Playfield";

interface PlayfieldViewProps {
  playfield: Playfield;
}

export function PlayfieldView(props: PlayfieldViewProps) {
  return (
    <div className="display-playfield">
      { dumpWithinExtents(props.playfield, 0, 0, 10, 10) }
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