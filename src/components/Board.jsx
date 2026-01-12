import { useState } from "react";
import "../App.css";

const GRID_SIZE = 12;
const FROG_START = { row: 5, col: 8 };

function Board() {
  const [grid, setGrid] = useState(
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => false)
    )
  );

  const toggleTile = (row, col) => {
    setGrid((prev) =>
      prev.map((r, rIdx) =>
        r.map((cell, cIdx) => (rIdx === row && cIdx === col ? !cell : cell))
      )
    );
  };

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)` }} // dynamic columns
    >
      {grid.map((row, ridx) =>
        row.map((cell, cidx) => {
          const isFrog = ridx === FROG_START.row && cidx === FROG_START.col;
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
