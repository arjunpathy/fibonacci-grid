import { useState } from "react";
import Cell from "./Cell";
import "./Grid.css";

const GRID_LENGTH = 50;
const FIBONACCI_SEQUENCE = [1, 1, 2, 3, 5];
const len = FIBONACCI_SEQUENCE.length;

const Grid = () => {

  const [grid, setGrid] = useState(Array.from({ length: GRID_LENGTH }, () => Array(GRID_LENGTH).fill(0)));
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [fibonacciCells, setFibonacciCells] = useState([]);

  const handleClick = (row, col) => {
    const newGrid = grid.map((row) => [...row]);
    const cellsToHighlight = [];

    for (let i = 0; i < GRID_LENGTH; i++) {
      newGrid[row][i] = newGrid[row][i] ? newGrid[row][i] + 1 : 1;
      newGrid[i][col] = newGrid[i][col] ? newGrid[i][col] + 1 : 1;
      cellsToHighlight.push([row, i]);
      cellsToHighlight.push([i, col]);
    }
    newGrid[row][col] -= 1; // Clicked cell shouldn't be incremented twice
    setGrid(newGrid);
    setHighlightedCells(cellsToHighlight);

    // Set a timeout to clear the highlight
    setTimeout(() => {setHighlightedCells([]);}, 500);

    checkAndClearFibonacci(newGrid, row, col);
  };

  const checkAndClearFibonacci = (newGrid) => {
    let fibo = [];

    for (let i = 0; i < GRID_LENGTH; i++) {
      for (let j = 0; j < GRID_LENGTH; j++) {
        
        // check for fibonacci only if the last fibonacci number is present in grid to avoid unnecessary checks
        if (newGrid[i][j] === FIBONACCI_SEQUENCE[len - 1]) {       

          // Left to Right"
          if (j >= len - 1) {
            let sequenceArray = newGrid[i].slice(j - len + 1, j + 1);
            if (isFibonacci(sequenceArray)) 
              fibo.push(...sequenceArray.map((_, idx) => [i, j - len + 1 + idx]));
          }

          // "Right to Left"
          if (j <= GRID_LENGTH - len) {
            let sequenceArray = newGrid[i].slice(j, j + len);
            sequenceArray = sequenceArray.reverse();
            if (isFibonacci(sequenceArray)) 
              fibo.push(...sequenceArray.map((_, idx) => [i, j + idx]));
          }

          // "Top to Bottom"
          if (i >= len - 1) {
            let sequenceArray = newGrid.slice(i - len + 1, i + 1).map((r) => r[j]);
            if (isFibonacci(sequenceArray)) 
              fibo.push(...sequenceArray.map((_, idx) => [i - len + 1 + idx, j]));
          }
          
          // "Bottom to Top"
          if (i <= GRID_LENGTH - len) {
            let sequenceArray = newGrid.slice(i, i + len).map((r) => r[j]);
            sequenceArray = sequenceArray.reverse();
            if (isFibonacci(sequenceArray)) 
              fibo.push(...sequenceArray.map((_, idx) => [i + idx, j]));
          }

          if (fibo.length) {
            setFibonacciCells([...fibo]);
            setTimeout(() => clearFibonacci(newGrid, fibo), 1000);
          }

        }
      }
    }
  };

  const clearFibonacci = (newGrid, fibo) => {
    for (let i = 0; i < fibo.length; i++) {
      let [r, c] = fibo[i];
      newGrid[r][c] = 0;
    }
    setGrid([...newGrid]);
    setFibonacciCells([]);
  };

  const isFibonacci = (arr) =>{return  arr.every((ele, index) => ele === FIBONACCI_SEQUENCE[index]);} // returns true if the arr is a fibonacci sequence

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${GRID_LENGTH}, 20px)` }}
    >
      {grid.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const isHighlighted = highlightedCells.some(([r, c]) => r === rowIndex && c === colIndex);
          const isFibonacci = fibonacciCells.some(([r, c]) => r === rowIndex && c === colIndex);
          const cellColorCondition = [isHighlighted,isFibonacci];
          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={value}
              handleClick={() => handleClick(rowIndex, colIndex)}
              cellColorCondition = {cellColorCondition}
            />
          );
        })
      )}
    </div>
  );
};

export default Grid;
