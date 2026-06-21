import React from "react";

export interface BinarySearchStep {
  nums: number[];
  low: number;
  high: number;
  mid: number;
  target: number;
  state: "searching" | "found" | "not_found";
  description: string;
  codeLine?: number;
  codeLineMap?: Record<string, number>;
}

export function generateBinarySearchSteps(nums: number[], target: number): BinarySearchStep[] {
  const steps: BinarySearchStep[] = [];
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    steps.push({
      nums,
      low,
      high,
      mid,
      target,
      state: "searching",
      description: `Calculate mid index: mid = (low + high) / 2 = (${low} + ${high}) / 2 = ${mid} (value: ${nums[mid]}). Target is ${target}.`,
      codeLineMap: {
        "python-efficient": 4, // mid = (low + high) // 2
        "python-easier": 6,    // mid = (low + high) // 2
        "python-shorter": 4,   // mid = (low + high) // 2
        "java-optimal": 6,     // int mid = low + (high - low) / 2
        "java-simple": 7,      // int mid = low + ...
        "javascript-optimal": 5 // const mid = Math.floor...
      }
    });

    if (nums[mid] === target) {
      steps.push({
        nums,
        low,
        high,
        mid,
        target,
        state: "found",
        description: `Found match! Value at index ${mid} matches target ${target}.`,
        codeLineMap: {
          "python-efficient": 5, // return mid
          "python-easier": 8,    // return mid
          "python-shorter": 7,   // return low
          "java-optimal": 7,     // return mid
          "java-simple": 8,      // return mid
          "javascript-optimal": 6 // return mid
        }
      });
      return steps;
    } else if (nums[mid] < target) {
      const prevLow = low;
      low = mid + 1;
      steps.push({
        nums,
        low,
        high,
        mid,
        target,
        state: "searching",
        description: `Since nums[mid] (${nums[mid]}) < target (${target}), search in the right half. Move low pointer from index ${prevLow} to mid + 1 = ${low}.`,
        codeLineMap: {
          "python-efficient": 7, // low = mid + 1
          "python-easier": 10,   // return helper(mid + 1, high)
          "python-shorter": 6,   // low = mid + 1
          "java-optimal": 8,     // low = mid + 1
          "java-simple": 9,      // return solve(..., mid + 1)
          "javascript-optimal": 7 // low = mid + 1
        }
      });
    } else {
      const prevHigh = high;
      high = mid - 1;
      steps.push({
        nums,
        low,
        high,
        mid,
        target,
        state: "searching",
        description: `Since nums[mid] (${nums[mid]}) > target (${target}), search in the left half. Move high pointer from index ${prevHigh} to mid - 1 = ${high}.`,
        codeLineMap: {
          "python-efficient": 9, // high = mid - 1
          "python-easier": 12,   // return helper(low, mid - 1)
          "python-shorter": 8,   // high = mid
          "java-optimal": 9,     // high = mid - 1
          "java-simple": 10,     // return solve(..., low, mid - 1)
          "javascript-optimal": 8 // high = mid - 1
        }
      });
    }
  }

  steps.push({
    nums,
    low,
    high,
    mid: -1,
    target,
    state: "not_found",
    description: `Search space is empty (low > high). Target ${target} is not in the array.`,
    codeLineMap: {
      "python-efficient": 10, // return -1
      "python-easier": 4,     // return -1
      "python-shorter": 9,    // return -1
      "java-optimal": 11,     // return -1
      "java-simple": 5,       // return -1
      "javascript-optimal": 10 // return -1
    }
  });

  return steps;
}

export function BinarySearchVisualizer({ step }: { step: BinarySearchStep }) {
  return (
    <div className="flex flex-col items-center gap-8 w-full py-6">
      {/* Target Status Info Badge */}
      <div className="flex gap-4 mb-4">
        <div className="bg-neoYellow border-4 border-black px-4 py-2 font-black text-sm uppercase rounded shadow-neo-sm">
          Target: {step.target}
        </div>
        <div className={`border-4 border-black px-4 py-2 font-black text-sm uppercase rounded shadow-neo-sm ${
          step.state === "found" ? "bg-neoGreen" : "bg-white"
        }`}>
          Status: {step.state === "found" ? "Found Target!" : step.state === "not_found" ? "Not Found" : "Searching..."}
        </div>
      </div>

      {/* Array block visuals */}
      <div className="flex flex-wrap gap-3 items-end justify-center select-none min-h-[140px] w-full max-w-xl">
        {step.nums.map((num, idx) => {
          const inSearchSpace = idx >= step.low && idx <= step.high;
          const isMid = idx === step.mid;
          const isLow = idx === step.low;
          const isHigh = idx === step.high;
          const isMatched = step.state === "found" && isMid;

          let blockBg = "bg-white opacity-40";
          let scaleClass = "";
          if (inSearchSpace) {
            blockBg = "bg-white border-black opacity-100";
            if (isMid) {
              blockBg = "bg-neoYellow";
              scaleClass = "scale-105";
            }
            if (isMatched) {
              blockBg = "bg-neoGreen";
              scaleClass = "scale-110";
            }
          }

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Pointer labels */}
              <div className="h-10 flex items-center justify-center font-black text-xs uppercase mb-1">
                {isMid && <span className="bg-neoYellow border-2 border-black px-1 py-0.5 rounded shadow-neo-sm text-[8px]">Mid</span>}
                {isLow && <span className="bg-neoBlue border-2 border-black px-1 py-0.5 rounded shadow-neo-sm text-[8px] mx-0.5">Low</span>}
                {isHigh && <span className="bg-neoPink border-2 border-black px-1 py-0.5 rounded shadow-neo-sm text-[8px] mx-0.5">High</span>}
              </div>

              {/* Box representation */}
              <div className={`w-12 h-12 border-4 border-black rounded-lg ${blockBg} ${scaleClass} shadow-neo flex items-center justify-center font-black text-lg transition-all duration-300`}>
                {num}
              </div>

              {/* Index indicator */}
              <span className="text-[10px] font-black text-gray-500 mt-2 font-mono">{idx}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
