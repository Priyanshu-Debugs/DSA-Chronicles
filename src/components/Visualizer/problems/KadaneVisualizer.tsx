import React from "react";

export interface KadaneStep {
  nums: number[];
  currentIndex: number;
  startIndex: number;
  endIndex: number;
  bestStart: number;
  bestEnd: number;
  currentSum: number;
  maxSum: number;
  description: string;
  codeLine?: number;
  codeLineMap?: Record<string, number>;
}

export function generateKadaneSteps(nums: number[]): KadaneStep[] {
  const steps: KadaneStep[] = [];
  
  let maxSum = nums[0];
  let currentSum = nums[0];
  let currentIndex = 0;
  let startIndex = 0;
  let endIndex = 0;
  let bestStart = 0;
  let bestEnd = 0;

  steps.push({
    nums,
    currentIndex,
    startIndex,
    endIndex,
    bestStart,
    bestEnd,
    currentSum,
    maxSum,
    description: `Initialize: Set max_so_far = ${maxSum} and current_max = ${currentSum}. Start scanning from index 0.`,
    codeLineMap: {
      "python-efficient": 2, // max_so_far = nums[0]
      "python-easier": 2,    // max_sum = float('-inf')
      "python-shorter": 2,   // for i in range...
      "java-optimal": 2,     // int maxSoFar = nums[0]
      "java-simple": 2,      // int max = Integer.MIN_VALUE
      "javascript-optimal": 1 // let maxSoFar = nums[0]
    }
  });

  for (let i = 1; i < nums.length; i++) {
    currentIndex = i;
    
    // Kadane transition
    if (nums[i] > currentSum + nums[i]) {
      currentSum = nums[i];
      startIndex = i;
      endIndex = i;
      steps.push({
        nums,
        currentIndex,
        startIndex,
        endIndex,
        bestStart,
        bestEnd,
        currentSum,
        maxSum,
        description: `At index ${i} (value: ${nums[i]}), adding to previous sum (${currentSum - nums[i]}) is worse. Start a new subarray window here.`,
        codeLineMap: {
          "python-efficient": 5, // current_max = max(nums[i]...)
          "python-easier": 7,    // current_sum = 0 if negative check
          "python-shorter": 3,   // nums[i] += nums[i-1] mutation
          "java-optimal": 5,     // currentMax = Math.max...
          "java-simple": 4,      // sum += num
          "javascript-optimal": 4 // currentMax = Math.max...
        }
      });
    } else {
      currentSum = currentSum + nums[i];
      endIndex = i;
      steps.push({
        nums,
        currentIndex,
        startIndex,
        endIndex,
        bestStart,
        bestEnd,
        currentSum,
        maxSum,
        description: `At index ${i} (value: ${nums[i]}), adding to running sum is beneficial. Extend the subarray window to index ${i}. Current sum = ${currentSum}.`,
        codeLineMap: {
          "python-efficient": 5, // current_max = max
          "python-easier": 5,    // current_sum += num
          "python-shorter": 3,   // nums[i] += nums[i-1] mutation
          "java-optimal": 5,     // currentMax = Math.max
          "java-simple": 4,      // sum += num
          "javascript-optimal": 4 // currentMax = Math.max
        }
      });
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      bestStart = startIndex;
      bestEnd = endIndex;
      steps.push({
        nums,
        currentIndex,
        startIndex,
        endIndex,
        bestStart,
        bestEnd,
        currentSum,
        maxSum,
        description: `New maximum found! Update max_so_far to ${maxSum}. Best subarray range updated: [${bestStart} to ${bestEnd}].`,
        codeLineMap: {
          "python-efficient": 6, // max_so_far = max(...)
          "python-easier": 6,    // max_sum = current_sum
          "python-shorter": 3,   // DP transition
          "java-optimal": 6,     // maxSoFar = Math.max
          "java-simple": 5,      // max = sum
          "javascript-optimal": 5 // maxSoFar = Math.max
        }
      });
    }
  }

  steps.push({
    nums,
    currentIndex: nums.length,
    startIndex,
    endIndex,
    bestStart,
    bestEnd,
    currentSum,
    maxSum,
    description: `Scan complete! The maximum subarray sum is ${maxSum}, spanning indices ${bestStart} to ${bestEnd} (values: [${nums.slice(bestStart, bestEnd + 1).join(", ")}]).`,
    codeLineMap: {
      "python-efficient": 7, // return max_so_far
      "python-easier": 9,    // return max_sum
      "python-shorter": 4,   // return max(nums)
      "java-optimal": 8,     // return maxSoFar
      "java-simple": 11,     // return max
      "javascript-optimal": 7 // return maxSoFar
    }
  });

  return steps;
}

export function KadaneVisualizer({ step }: { step: KadaneStep }) {
  return (
    <div className="flex flex-col items-center gap-6 w-full py-6">
      {/* Dynamic Variables display */}
      <div className="flex gap-4 mb-2 flex-wrap justify-center">
        <div className="bg-neoBlue border-4 border-black px-4 py-2 font-black text-sm uppercase rounded shadow-neo-sm">
          Current Sum: {step.currentSum}
        </div>
        <div className="bg-neoGreen border-4 border-black px-4 py-2 font-black text-sm uppercase rounded shadow-neo-sm">
          Max Sum: {step.maxSum}
        </div>
        <div className="bg-neoPink border-4 border-black px-4 py-2 font-black text-sm uppercase rounded shadow-neo-sm">
          Best Subarray: [{step.bestStart}, {step.bestEnd}]
        </div>
      </div>

      {/* Array Elements Visual with Highlight Windows */}
      <div className="flex flex-wrap gap-3 items-end justify-center select-none min-h-[140px] w-full max-w-xl">
        {step.nums.map((num, idx) => {
          const isScanning = idx === step.currentIndex;
          const inCurrentWindow = idx >= step.startIndex && idx <= step.endIndex && step.currentIndex < step.nums.length;
          const inBestWindow = idx >= step.bestStart && idx <= step.bestEnd && step.currentIndex === step.nums.length;

          let cardBg = "bg-white";
          let borderStyle = "border-4 border-black";
          if (inCurrentWindow) {
            cardBg = "bg-neoBlue/30";
            borderStyle = "border-4 border-black border-dashed";
          } else if (inBestWindow) {
            cardBg = "bg-neoGreen";
            borderStyle = "border-4 border-black";
          }

          if (isScanning) {
            cardBg = "bg-neoYellow";
          }

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Labels */}
              <div className="h-10 flex items-center justify-center font-black text-xs uppercase mb-1">
                {isScanning && <span className="bg-neoYellow border-2 border-black px-1.5 py-0.5 rounded shadow-neo-sm text-[8px] animate-bounce">Scan</span>}
                {idx === step.startIndex && inCurrentWindow && <span className="bg-neoBlue border-2 border-black px-1 py-0.5 rounded shadow-neo-sm text-[8px]">Start</span>}
                {idx === step.endIndex && inCurrentWindow && idx !== step.startIndex && <span className="bg-neoPink border-2 border-black px-1 py-0.5 rounded shadow-neo-sm text-[8px]">End</span>}
              </div>

              {/* Box representation */}
              <div className={`w-12 h-12 rounded-lg ${cardBg} ${borderStyle} shadow-neo flex items-center justify-center font-black text-lg transition-all duration-200`}>
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
