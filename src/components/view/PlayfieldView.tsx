import { Cursor } from "../../configurations/Cursor"
import { Playfield, mapPlayfieldRows, mapPlayfieldCells } from "../../configurations/Playfield";

interface PlayfieldViewProps {
  playfield: Playfield;
}

export function PlayfieldView(props: PlayfieldViewProps) {
  return (
    <div className="display-playfield">
      { mapPlayfieldRows(props.playfield, (y: number) => <RowView key={y} playfield={props.playfield} y={y} />) }
    </div>
  );
}

export function RowView(props: any) {
  return (
    <div>
      { mapPlayfieldCells(
          props.playfield, props.y,
          (x: number, contents: String, cursors: Array<Cursor>) => (
            <CellView key={x} x={x} y={props.y} contents={contents} cursors={cursors} />
          )
        )
      }
    </div>
  );
}

export function CellView(props: any) {
  const contents = props.contents;
  const cursors = props.cursors;
  return (
      (cursors.length) ? ( <span style={{backgroundColor: "blue"}}>{ contents }</span> ) : ( <span>{ contents }</span> )
  )
}
