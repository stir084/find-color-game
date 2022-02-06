interface CellInfo{
  color: string;
  cellSize: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
function Cell({ color, cellSize, onClick }:CellInfo) {
  return (
    <div style={{ width: cellSize, height: cellSize, margin: '2px', backgroundColor: color }} onClick={onClick}>
    </div>
  );
}

export default Cell;

