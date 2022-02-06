// import styled from "styled-components";


// const StyledCell = styled.div`
//   width: ${(props) => props.cellSize};
//   height: ${(props) => props.cellSize};
//   margin: 2px; 
//   background-color: ${(props) => props.backgroundColor};
// `;
// function Cell({ color, cellSize, onClick }) {
//   return (
//     <StyledCell cellSize={cellSize} backgroundColor={color} onClick={onClick}>
//     </StyledCell>
//   );
// }

// export default Cell;

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

