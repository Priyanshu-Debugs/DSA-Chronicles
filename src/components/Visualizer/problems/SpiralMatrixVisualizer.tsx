import React from "react";

export interface SpiralMatrixStep {
  grid: number[][];
  visited: boolean[][];
  currentRow: number;
  currentCol: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  result: number[];
  description: string;
  codeLine: number;
}

export function generateSpiralMatrixSteps(grid: number[][]): SpiralMatrixStep[] {
  const steps: SpiralMatrixStep[] = [];
  const R = grid.length;
  const C = grid[0].length;
  
  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  const result: number[] = [];
  
  let top = 0;
  let bottom = R - 1;
  let left = 0;
  let right = C - 1;

  steps.push({
    grid,
    visited: visited.map(row => [...row]),
    currentRow: -1,
    currentCol: -1,
    top,
    bottom,
    left,
    right,
    result: [],
    description: `Initialize boundaries: top = 0, bottom = ${bottom}, left = 0, right = ${right}. Result list is empty.`,
    codeLine: 5,
  });

  while (top <= bottom && left <= right) {
    // 1. Traverse Right
    for (let col = left; col <= right; col++) {
      result.push(grid[top][col]);
      visited[top][col] = true;
      steps.push({
        grid,
        visited: visited.map(row => [...row]),
        currentRow: top,
        currentCol: col,
        top,
        bottom,
        left,
        right,
        result: [...result],
        description: `Traversing Right: Add elements from top row. Visited index [${top}, ${col}] = ${grid[top][col]}.`,
        codeLine: 9,
      });
    }
    top++;
    steps.push({
      grid,
      visited: visited.map(row => [...row]),
      currentRow: -1,
      currentCol: -1,
      top,
      bottom,
      left,
      right,
      result: [...result],
      description: `Completed top row. Move top boundary boundary down to index ${top}.`,
      codeLine: 10,
    });

    // 2. Traverse Down
    for (let row = top; row <= bottom; row++) {
      result.push(grid[row][right]);
      visited[row][right] = true;
      steps.push({
        grid,
        visited: visited.map(row => [...row]),
        currentRow: row,
        currentCol: right,
        top,
        bottom,
        left,
        right,
        result: [...result],
        description: `Traversing Down: Add elements from right boundary column. Visited index [${row}, ${right}] = ${grid[row][right]}.`,
        codeLine: 11,
      });
    }
    right--;
    steps.push({
      grid,
      visited: visited.map(row => [...row]),
      currentRow: -1,
      currentCol: -1,
      top,
      bottom,
      left,
      right,
      result: [...result],
      description: `Completed right column. Move right boundary left to index ${right}.`,
      codeLine: 12,
    });

    // 3. Traverse Left
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        result.push(grid[bottom][col]);
        visited[bottom][col] = true;
        steps.push({
          grid,
          visited: visited.map(row => [...row]),
          currentRow: bottom,
          currentCol: col,
          top,
          bottom,
          left,
          right,
          result: [...result],
          description: `Traversing Left: Add elements from bottom boundary row. Visited index [${bottom}, ${col}] = ${grid[bottom][col]}.`,
          codeLine: 15,
        });
      }
      bottom--;
      steps.push({
        grid,
        visited: visited.map(row => [...row]),
        currentRow: -1,
        currentCol: -1,
        top,
        bottom,
        left,
        right,
        result: [...result],
        description: `Completed bottom row. Move bottom boundary up to index ${bottom}.`,
        codeLine: 16,
      });
    }

    // 4. Traverse Up
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        result.push(grid[row][left]);
        visited[row][left] = true;
        steps.push({
          grid,
          visited: visited.map(row => [...row]),
          currentRow: row,
          currentCol: left,
          top,
          bottom,
          left,
          right,
          result: [...result],
          description: `Traversing Up: Add elements from left boundary column. Visited index [${row}, ${left}] = ${grid[row][left]}.`,
          codeLine: 19,
        });
      }
      left++;
      steps.push({
        grid,
        visited: visited.map(row => [...row]),
        currentRow: -1,
        currentCol: -1,
        top,
        bottom,
        left,
        right,
        result: [...result],
        description: `Completed left column. Move left boundary right to index ${left}.`,
        codeLine: 20,
      });
    }
  }

  steps.push({
    grid,
    visited: visited.map(row => [...row]),
    currentRow: -1,
    currentCol: -1,
    top,
    bottom,
    left,
    right,
    result: [...result],
    description: `Spiral traversal completed! Visited all elements. Result: [${result.join(", ")}].`,
    codeLine: 23,
  });

  return steps;
}

export function SpiralMatrixVisualizer({ step }: { step: SpiralMatrixStep }) {
  return (
    <div className="flex flex-col items-center gap-6 w-full py-6 select-none">
      {/* Boundaries display */}
      <div className="flex gap-3 mb-2 flex-wrap justify-center font-mono text-[10px] font-black uppercase">
        <span className="bg-neoYellow border-2 border-black px-2 py-0.5 rounded shadow-neo-sm">Top: {step.top}</span>
        <span className="bg-neoPink border-2 border-black px-2 py-0.5 rounded shadow-neo-sm">Bottom: {step.bottom}</span>
        <span className="bg-neoBlue border-2 border-black px-2 py-0.5 rounded shadow-neo-sm">Left: {step.left}</span>
        <span className="bg-neoGreen border-2 border-black px-2 py-0.5 rounded shadow-neo-sm">Right: {step.right}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
        {/* The Grid Visual */}
        <div className="flex flex-col gap-2 border-4 border-black p-4 bg-white rounded-xl shadow-neo max-w-sm">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-2">
              {row.map((val, cIdx) => {
                const isCurrent = rIdx === step.currentRow && cIdx === step.currentCol;
                const isVisited = step.visited[rIdx][cIdx];

                let cellBg = "bg-white";
                let scaleClass = "";
                if (isCurrent) {
                  cellBg = "bg-neoYellow";
                  scaleClass = "scale-105";
                } else if (isVisited) {
                  cellBg = "bg-neoGreen/20";
                }

                return (
                  <div
                    key={cIdx}
                    className={`w-12 h-12 border-2 border-black rounded flex items-center justify-center font-black text-sm transition-all duration-200 ${cellBg} ${scaleClass}`}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Visited Array Visual */}
        <div className="flex flex-col w-full md:max-w-xs gap-2">
          <h4 className="font-black text-xs uppercase text-gray-500 border-b border-black pb-1">Popped Elements:</h4>
          <div className="flex flex-wrap gap-1.5 min-h-[48px] p-2 bg-neoCream border-2 border-black rounded-lg">
            {step.result.length === 0 ? (
              <span className="text-xs italic text-gray-400 font-bold uppercase p-1">No elements collected yet</span>
            ) : (
              step.result.map((val, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-neoGreen border border-black font-black text-xs shadow-neo-sm animate-scaleUp"
                >
                  {val}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
