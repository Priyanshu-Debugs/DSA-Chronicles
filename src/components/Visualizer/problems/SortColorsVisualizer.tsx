import React from "react";

export interface SortColorsStep {
  nums: number[];
  low: number;
  mid: number;
  high: number;
  swapIndices: [number, number] | null;
  description: string;
  codeLine?: number;
  codeLineMap?: Record<string, number>;
}

export function generateSortColorsSteps(nums: number[]): SortColorsStep[] {
  const steps: SortColorsStep[] = [];
  const arr = [...nums];
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;

  steps.push({
    nums: [...arr],
    low,
    mid,
    high,
    swapIndices: null,
    description: `Initialize low = 0, mid = 0, and high = ${high}. All elements are unsorted.`,
    codeLineMap: {
      "python-efficient": 2, // low, mid, high = 0, 0, len(nums) - 1
      "python-easier": 2,    // counts = [0, 0, 0]
      "python-shorter": 2,   // for i in range...
      "java-optimal": 2,     // int low = 0, mid = 0...
      "java-simple": 2,      // int c0 = 0...
      "javascript-optimal": 1 // let low = 0...
    }
  });

  while (mid <= high) {
    if (arr[mid] === 0) {
      steps.push({
        nums: [...arr],
        low,
        mid,
        high,
        swapIndices: low !== mid ? [low, mid] : null,
        description: `Element at mid (${arr[mid]}) is 0. Swap mid with low (index ${low}). Then increment low and mid.`,
        codeLineMap: {
          "python-efficient": 5, // nums[low], nums[mid] = ...
          "python-easier": 4,    // counts[num] += 1
          "python-shorter": 4,   // swap check
          "java-optimal": 5,     // swap
          "java-simple": 4,      // if (x == 0)
          "javascript-optimal": 4 // swap
        }
      });
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      steps.push({
        nums: [...arr],
        low,
        mid,
        high,
        swapIndices: null,
        description: `Element at mid (${arr[mid]}) is 1. Already in correct middle group. Just increment mid.`,
        codeLineMap: {
          "python-efficient": 9, // mid += 1
          "python-easier": 4,    // counts
          "python-shorter": 4,   // loop
          "java-optimal": 10,    // mid++
          "java-simple": 5,      // else if
          "javascript-optimal": 7 // mid++
        }
      });
      mid++;
    } else { // arr[mid] === 2
      steps.push({
        nums: [...arr],
        low,
        mid,
        high,
        swapIndices: mid !== high ? [mid, high] : null,
        description: `Element at mid (${arr[mid]}) is 2. Swap mid with high (index ${high}). Then decrement high.`,
        codeLineMap: {
          "python-efficient": 11, // nums[mid], nums[high] = ...
          "python-easier": 4,     // counts
          "python-shorter": 4,    // swap
          "java-optimal": 13,     // swap
          "java-simple": 6,       // else c2++
          "javascript-optimal": 9 // swap
        }
      });
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }

  steps.push({
    nums: [...arr],
    low,
    mid,
    high,
    swapIndices: null,
    description: `Sorting complete! All 0s (Red) are on the left, 1s (White) in the middle, and 2s (Blue) on the right.`,
    codeLineMap: {
      "python-efficient": 13, // exit loop
      "python-easier": 7,     // overwriting array loop
      "python-shorter": 4,    // loop exit
      "java-optimal": 17,     // exit
      "java-simple": 9,       // overwriting while loops
      "javascript-optimal": 12 // exit
    }
  });

  return steps;
}

export function SortColorsVisualizer({ step }: { step: SortColorsStep }) {
  return (
    <div className="flex flex-col items-center gap-8 w-full py-6">
      {/* Pointer labels & legend */}
      <div className="flex gap-4 flex-wrap justify-center mb-2">
        <div className="flex items-center gap-1.5 font-bold text-xs uppercase">
          <span className="w-4 h-4 bg-neoRed border-2 border-black rounded-sm" /> 0 (Red)
        </div>
        <div className="flex items-center gap-1.5 font-bold text-xs uppercase">
          <span className="w-4 h-4 bg-white border-2 border-black rounded-sm" /> 1 (White)
        </div>
        <div className="flex items-center gap-1.5 font-bold text-xs uppercase">
          <span className="w-4 h-4 bg-neoBlue border-2 border-black rounded-sm" /> 2 (Blue)
        </div>
      </div>

      {/* Array Elements Visual */}
      <div className="flex flex-wrap gap-3 items-end justify-center select-none min-h-[140px] w-full max-w-xl">
        {step.nums.map((num, idx) => {
          const isLow = idx === step.low;
          const isMid = idx === step.mid;
          const isHigh = idx === step.high;
          const isSwapping = step.swapIndices && step.swapIndices.includes(idx);

          // Neubrutalist styling depending on color code:
          let cardBg = "bg-white";
          let textColor = "text-black";
          if (num === 0) cardBg = "bg-neoRed";
          else if (num === 1) cardBg = "bg-white";
          else if (num === 2) {
            cardBg = "bg-neoBlue";
            textColor = "text-white";
          }

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Pointer labels */}
              <div className="h-10 flex items-center justify-center font-black text-xs uppercase mb-1">
                {isMid && <span className="bg-neoYellow border-2 border-black px-1 py-0.5 rounded shadow-neo-sm text-[8px] mx-0.5 animate-bounce">Mid</span>}
                {isLow && <span className="bg-neoGreen border-2 border-black px-1 py-0.5 rounded shadow-neo-sm text-[8px] mx-0.5">Low</span>}
                {isHigh && <span className="bg-neoPink border-2 border-black px-1 py-0.5 rounded shadow-neo-sm text-[8px] mx-0.5">High</span>}
              </div>

              {/* Box element */}
              <div className={`w-12 h-12 border-4 border-black rounded-lg ${cardBg} ${textColor} shadow-neo flex items-center justify-center font-black text-lg transition-all duration-300 ${
                isSwapping ? "ring-4 ring-yellow-400 scale-105 border-dashed" : ""
              }`}>
                {num}
              </div>

              {/* Index */}
              <span className="text-[10px] font-black text-gray-500 mt-2 font-mono">{idx}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
