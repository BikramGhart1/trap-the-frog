import { useEffect, useState } from "react";
import "../App.css";

const GRID_SIZE = 12;

function Board({setMoves}) {
  const [grid, setGrid] = useState(
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => false)
    )
  );
  const [frogStart, setFrogStart]=useState({row: 5, col: 8 });
  // const [isTrapped, setIsTrapped]=useState(false);
  const directions=[
      { dRow: -1, dCol: 0 }, // up
  { dRow: 1, dCol: 0 },  // down
  { dRow: 0, dCol: -1 }, // left
  { dRow: 0, dCol: 1 },  // right
  { dRow: -1, dCol: -1 }, // up-left
  { dRow: -1, dCol: 1 },  // up-right
  { dRow: 1, dCol: -1 },  // down-left
  { dRow: 1, dCol: 1 },   // down-right
  ];
  // let FROG_START = { row: 5, col: 8 };

  const canMoveTo=(row,col)=>{
    console.log("can move: ",grid[row][col]);
    if(grid[row][col]) return false;

    return true;
  }

  const toggleTile = (row, col) => {
    setGrid((prev) =>
      prev.map((r, rIdx) =>
        r.map((cell, cIdx) => (rIdx === row && cIdx === col ? !cell : cell))
      )
    );
    setMoves();
    // frogStart.row += 1;
    // frogStart.col -= 1;
    // setFrogStart((prev)=>({
    //   row:prev.row+1,
    //   col:prev.col-1,
    // }))
  };

  const gameOver=(row,col)=>{
    return(
      row === 0 ||
      row === GRID_SIZE -1 ||
      col === 0 ||
      col === GRID_SIZE -1
    );
  };

  const moveFrog=()=>{
    const shuffledDirections=[...directions].sort(()=>Math.random()-0.5)
    for (let dir of shuffledDirections){
      const newRow=frogStart.row+dir.dRow;
      const newCol=frogStart.col+dir.dCol;
      if (canMoveTo(newRow, newCol)){
        setFrogStart({row:newRow, col:newCol});
        break;
      }
    }
  }

  const isTrapped=(row,col)=>{
    for (let dir of directions){
      const newRow=dir.dRow+row;
      const newCol=dir.dCol+col;

      if(newRow>=0 && newRow<GRID_SIZE && newCol>=0 && newCol<GRID_SIZE && grid[newRow][newCol]===false){
        return false;
      }
    }
    return true;
  }

  useEffect(()=>{
    
    if(isTrapped(frogStart.row, frogStart.col)){
      alert("Frog Trapped! You win.");
      return;
    }
    moveFrog();
  },[grid])

  useEffect(()=>{
    if(gameOver(frogStart.row, frogStart.col)){
      alert("Frog escaped! You Lose.");
      return;
    }

  },[frogStart]);

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)` }} // dynamic columns
    >
      {grid.map((row, ridx) =>
        row.map((cell, cidx) => {
          const isFrog = ridx === frogStart.row && cidx === frogStart.col;
          return (
            <div
              key={`${ridx}-${cidx}`}
              className={`tile ${cell ? "obstacle" : "empty"}`} // toggle class
              onClick={() => toggleTile(ridx, cidx)}
            >
              {isFrog && <p className="text-center ">🐸</p>}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Board;
