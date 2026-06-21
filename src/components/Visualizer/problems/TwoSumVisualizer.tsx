import React from "react";

export interface TwoSumStep {
  nums: number[];
  left: number;
  right: number;
  currentSum: number;
  target: number;
  state: "searching" | "found" | "not_found";
  description: string;
  codeLine?: number;
  codeLineMap?: Record<string, number>;
}

export function generateTwoSumSteps(nums: number[], target: number): TwoSumStep[] {
  const steps: TwoSumStep[] = [];
  
  // Sort elements along with their original indices
  const sortedPairs = nums
    .map((val, idx) => ({ val, idx }))
    .sort((a, b) => a.val - b.val);
  
  const sortedVals = sortedPairs.map(p => p.val);
  let left = 0;
  let right = sortedVals.length - 1;

  steps.push({
    nums: sortedVals,
    left,
    right,
    currentSum: 0,
    target,
    state: "searching",
    description: `Initialize two pointers: left = 0 (value: ${sortedVals[left]}) and right = ${right} (value: ${sortedVals[right]}). Sorted array: [${sortedVals.join(", ")}].`,
    codeLineMap: {
      "python-efficient": 2, // seen = {}
      "python-easier": 4,    // left, right = 0, len(sorted_pairs) - 1
      "python-shorter": 3,   // n = len(nums)
      "java-optimal": 5,     // Map<Integer, Integer> map...
      "java-simple": 2,      // nested loops
      "javascript-optimal": 2 // const map = new Map()
    }
  });

  while (left < right) {
    const currentSum = sortedVals[left] + sortedVals[right];
    
    steps.push({
      nums: sortedVals,
      left,
      right,
      currentSum,
      target,
      state: "searching",
      description: `Check the sum of elements at left and right: ${sortedVals[left]} + ${sortedVals[right]} = ${currentSum}. Target is ${target}.`,
      codeLineMap: {
        "python-efficient": 3, // for idx, val...
        "python-easier": 7,    // current_sum = sorted_pairs[left][0]...
        "python-shorter": 5,   // for j in range...
        "java-optimal": 6,     // for (int i = 0...
        "java-simple": 4,      // if (nums[i]...
        "javascript-optimal": 3 // for (let i = 0...
      }
    });

    if (currentSum === target) {
      steps.push({
        nums: sortedVals,
        left,
        right,
        currentSum,
        target,
        state: "found",
        description: `Success! Found elements ${sortedVals[left]} (index ${sortedPairs[left].idx}) and ${sortedVals[right]} (index ${sortedPairs[right].idx}) that sum to target ${target}.`,
        codeLineMap: {
          "python-efficient": 5, // return
          "python-easier": 9,    // return
          "python-shorter": 6,   // return
          "java-optimal": 9,     // return
          "java-simple": 5,      // return
          "javascript-optimal": 5 // return
        }
      });
      return steps;
    } else if (currentSum < target) {
      const prevLeft = left;
      left++;
      steps.push({
        nums: sortedVals,
        left,
        right,
        currentSum,
        target,
        state: "searching",
        description: `Since current sum ${currentSum} < target ${target}, we need a larger sum. Move left pointer from index ${prevLeft} to ${left}.`,
        codeLineMap: {
          "python-efficient": 6, // seen[val] = idx
          "python-easier": 11,   // left += 1
          "python-shorter": 5,   // for j in...
          "java-optimal": 11,    // map.put
          "java-simple": 4,      // loop
          "javascript-optimal": 7 // map.set
        }
      });
    } else {
      const prevRight = right;
      right--;
      steps.push({
        nums: sortedVals,
        left,
        right,
        currentSum,
        target,
        state: "searching",
        description: `Since current sum ${currentSum} > target ${target}, we need a smaller sum. Move right pointer from index ${prevRight} to ${right}.`,
        codeLineMap: {
          "python-efficient": 6, // seen[val] = idx
          "python-easier": 13,   // right -= 1
          "python-shorter": 5,   // loop
          "java-optimal": 11,    // map.put
          "java-simple": 4,      // loop
          "javascript-optimal": 7 // map.set
        }
      });
    }
  }

  steps.push({
    nums: sortedVals,
    left: -1,
    right: -1,
    currentSum: 0,
    target,
    state: "not_found",
    description: `Pointers met. No pair found that sums up to the target.`,
    codeLineMap: {
      "python-efficient": 7, // return []
      "python-easier": 14,   // return []
      "python-shorter": 7,   // return []
      "java-optimal": 13,    // return empty
      "java-simple": 8,      // return empty
      "javascript-optimal": 9 // return []
    }
  });

  return steps;
}

export function TwoSumVisualizer({ step }: { step: TwoSumStep }) {
  return (
    <div className="flex flex-col items-center gap-8 w-full py-6">
      {/* Top Target/Sum Status Badge */}
      <div className="flex gap-4 mb-4">
        <div className="bg-neoYellow border-4 border-black px-4 py-2 font-black text-sm uppercase rounded shadow-neo-sm">
          Target: {step.target}
        </div>
        <div className={`border-4 border-black px-4 py-2 font-black text-sm uppercase rounded shadow-neo-sm ${
          step.state === "found" ? "bg-neoGreen" : "bg-white"
        }`}>
          Current Sum: {step.currentSum || "N/A"}
        </div>
      </div>

      {/* Array Elements Visual */}
      <div className="flex flex-wrap gap-4 items-end justify-center select-none min-h-[140px] w-full max-w-lg">
        {step.nums.map((num, idx) => {
          const isLeft = idx === step.left;
          const isRight = idx === step.right;
          const isMatched = step.state === "found" && (isLeft || isRight);

          let nodeBg = "bg-white";
          if (isMatched) nodeBg = "bg-neoGreen";
          else if (isLeft) nodeBg = "bg-neoBlue";
          else if (isRight) nodeBg = "bg-neoPink";

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Pointer labels above nodes */}
              <div className="h-10 flex items-center justify-center font-black text-xs uppercase mb-1">
                {isLeft && <span className="bg-neoBlue border-2 border-black px-1.5 py-0.5 rounded shadow-neo-sm animate-bounce text-[10px]">Left</span>}
                {isRight && <span className="bg-neoPink border-2 border-black px-1.5 py-0.5 rounded shadow-neo-sm animate-bounce text-[10px]">Right</span>}
              </div>

              {/* Node box */}
              <div className={`w-14 h-14 border-4 border-black rounded-lg ${nodeBg} shadow-neo flex items-center justify-center font-black text-xl transition-all duration-300 transform ${
                isMatched ? "scale-110" : ""
              }`}>
                {num}
              </div>

              {/* Index indicator */}
              <span className="text-[10px] font-black text-gray-500 mt-2 font-mono">i={idx}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
