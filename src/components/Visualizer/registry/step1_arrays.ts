import { ProblemVisualizerMeta } from "../visualizerRegistry";
import { generateTwoSumSteps } from "../problems/TwoSumVisualizer";
import { generateSortColorsSteps } from "../problems/SortColorsVisualizer";
import { generateKadaneSteps } from "../problems/KadaneVisualizer";
import { generateSpiralMatrixSteps } from "../problems/SpiralMatrixVisualizer";

// Helper Interface for array steps
export interface GenericArrayStep {
  array: any[];
  pointers: Record<string, number | null>;
  highlights: Record<number, "active" | "compare" | "swap" | "sorted" | "inactive">;
  variables: Record<string, any>;
  description: string;
  codeLineMap: Record<string, number>;
}

// 1. Largest Element Step Generator
export function generateLargestElementSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  if (arr.length === 0) return [];
  
  let maxVal = arr[0];
  steps.push({
    array: [...arr],
    pointers: { i: 0 },
    highlights: { 0: "active" },
    variables: { max_value: maxVal },
    description: `Initialize max_value = ${maxVal} with the first element at index 0.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 1; i < arr.length; i++) {
    const isNewMax = arr[i] > maxVal;
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { max_value: maxVal, current: arr[i] },
      description: `Compare current element ${arr[i]} with max_value ${maxVal}.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (isNewMax) {
      maxVal = arr[i];
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "sorted" },
        variables: { max_value: maxVal },
        description: `New max_value found! Update max_value to ${maxVal}.`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
    }
  }

  steps.push({
    array: [...arr],
    pointers: { i: null },
    highlights: arr.map(() => "sorted"),
    variables: { max_value: maxVal },
    description: `Scan complete. The largest element in the array is ${maxVal}.`,
    codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 6 }
  });

  return steps;
}

// 2. Second Largest Step Generator
export function generateSecondLargestSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  if (arr.length < 2) return [];

  let largest = arr[0];
  let second = -1;

  steps.push({
    array: [...arr],
    pointers: { i: 0 },
    highlights: { 0: "active" },
    variables: { largest, second_largest: "N/A" },
    description: `Initialize largest = ${largest} with the element at index 0.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 1; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { largest, second_largest: second === -1 ? "N/A" : second, current: arr[i] },
      description: `Scanning element ${arr[i]} at index ${i}. Compare with largest (${largest}).`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (arr[i] > largest) {
      second = largest;
      largest = arr[i];
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "sorted" },
        variables: { largest, second_largest: second },
        description: `Element ${arr[i]} is greater than largest. Update largest = ${largest} and second_largest = ${second}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    } else if (arr[i] < largest && arr[i] > second) {
      second = arr[i];
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "swap" },
        variables: { largest, second_largest: second },
        description: `Element ${arr[i]} is smaller than largest but greater than second. Update second_largest = ${second}.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
    }
  }

  steps.push({
    array: [...arr],
    pointers: { i: null },
    highlights: arr.map(() => "sorted"),
    variables: { largest, second_largest: second },
    description: `Scan complete. The second largest element is ${second === -1 ? "none" : second}.`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 10, "javascript-optimal": 10 }
  });

  return steps;
}

// 3. Check Sorted Step Generator
export function generateCheckSortedSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  if (arr.length <= 1) return [];

  let isSorted = true;

  steps.push({
    array: [...arr],
    pointers: { i: 0 },
    highlights: { 0: "sorted" },
    variables: { is_sorted: "True" },
    description: "Start scanning the array from index 1 to compare elements.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 1; i < arr.length; i++) {
    const currentHighlights: Record<number, any> = { [i - 1]: "sorted", [i]: "compare" };
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: currentHighlights,
      variables: { previous: arr[i - 1], current: arr[i] },
      description: `Compare element at index ${i} (${arr[i]}) with previous element at index ${i - 1} (${arr[i - 1]}).`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (arr[i] < arr[i - 1]) {
      isSorted = false;
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i - 1]: "inactive", [i]: "swap" },
        variables: { is_sorted: "False" },
        description: `Unsorted pair found: ${arr[i]} is smaller than ${arr[i - 1]}. Array is NOT sorted!`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    pointers: { i: null },
    highlights: arr.map(() => "sorted"),
    variables: { is_sorted: "True" },
    description: "All adjacent element comparisons passed. The array is sorted.",
    codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 6 }
  });

  return steps;
}

// 4. Move Zeros Step Generator
export function generateMoveZerosSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const nums = [...arr];

  let write = 0;

  steps.push({
    array: [...nums],
    pointers: { write: 0, scan: 0 },
    highlights: {},
    variables: { write_pointer: 0 },
    description: "Initialize write pointer at index 0. Scan the array for non-zero elements.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let scan = 0; scan < nums.length; scan++) {
    const highlights: Record<number, any> = { [scan]: "compare" };
    if (write !== scan) highlights[write] = "active";

    steps.push({
      array: [...nums],
      pointers: { write, scan },
      highlights: { ...highlights },
      variables: { write_pointer: write, current_val: nums[scan] },
      description: `Checking element at index ${scan} (${nums[scan]}).`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (nums[scan] !== 0) {
      if (scan !== write) {
        const temp = nums[write];
        nums[write] = nums[scan];
        nums[scan] = temp;

        steps.push({
          array: [...nums],
          pointers: { write, scan },
          highlights: { [write]: "swap", [scan]: "swap" },
          variables: { write_pointer: write, swapped: `nums[${write}] ⇄ nums[${scan}]` },
          description: `Non-zero element ${nums[write]} found! Swap with write index ${write}.`,
          codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 5 }
        });
      }
      write++;
    }
  }

  steps.push({
    array: [...nums],
    pointers: { write: null, scan: null },
    highlights: nums.map((v, idx) => (idx < write ? "sorted" : "inactive")),
    variables: { final_state: "complete" },
    description: "Successfully moved all non-zero elements to front, preserving relative order.",
    codeLineMap: { "python-efficient": 5, "java-optimal": 9, "javascript-optimal": 8 }
  });

  return steps;
}

// 5. Linear Search Step Generator
export function generateLinearSearchSteps(arr: number[], target: number): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let foundIdx = -1;

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      pointers: { curr: i },
      highlights: { [i]: "compare" },
      variables: { target, current: arr[i] },
      description: `Compare element at index ${i} (${arr[i]}) with target ${target}.`,
      codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
    });

    if (arr[i] === target) {
      foundIdx = i;
      steps.push({
        array: [...arr],
        pointers: { curr: i },
        highlights: { [i]: "sorted" },
        variables: { target, index_found: i },
        description: `Found match! Target ${target} located at index ${i}.`,
        codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
      });
      break;
    }
  }

  if (foundIdx === -1) {
    steps.push({
      array: [...arr],
      pointers: { curr: null },
      highlights: arr.map(() => "inactive"),
      variables: { target, index_found: -1 },
      description: `Target ${target} was not found in the array. Return -1.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 5 }
    });
  }

  return steps;
}

// STEP GENERATOR FOR REMOVE DUPLICATES (Two-pointer in-place deduplication)
export interface RemoveDuplicatesStep {
  array: number[];
  pointers: { i: number | null; j: number | null };
  highlights: Record<number, "active" | "compare" | "swap" | "sorted" | "inactive">;
  variables: Record<string, any>;
  description: string;
  codeLineMap: Record<string, number>;
}

export function generateRemoveDuplicatesSteps(nums: number[]): RemoveDuplicatesStep[] {
  const steps: RemoveDuplicatesStep[] = [];
  const arr = [...nums];
  
  if (arr.length === 0) {
    steps.push({
      array: [...arr],
      pointers: { i: null, j: null },
      highlights: {},
      variables: { unique_count: 0 },
      description: "Array is empty. Return 0.",
      codeLineMap: {
        "python-efficient": 3,
        "python-easier": 3,
        "python-shorter": 2,
        "java-optimal": 3,
        "java-simple": 3,
        "javascript-optimal": 2
      }
    });
    return steps;
  }

  let i = 0;
  
  steps.push({
    array: [...arr],
    pointers: { i, j: null },
    highlights: { 0: "sorted" },
    variables: { unique_count: 1, last_unique: arr[i] },
    description: `Initialize pointer i = 0. The first element (${arr[0]}) is always unique.`,
    codeLineMap: {
      "python-efficient": 4, // write_idx = 0
      "python-easier": 4,    // i = 0
      "python-shorter": 2,   // nums[:] = sorted...
      "java-optimal": 4,     // int i = 0
      "java-simple": 3,      // int insertIndex = 1
      "javascript-optimal": 3 // let i = 0
    }
  });

  for (let j = 1; j < arr.length; j++) {
    // Highlighting current comparisons
    const highlights: Record<number, any> = {};
    for (let k = 0; k <= i; k++) highlights[k] = "sorted";
    highlights[j] = "compare";

    steps.push({
      array: [...arr],
      pointers: { i, j },
      highlights: { ...highlights },
      variables: { unique_count: i + 1, last_unique: arr[i], current: arr[j] },
      description: `Compare current element at j = ${j} (${arr[j]}) with last unique element at i = ${i} (${arr[i]}).`,
      codeLineMap: {
        "python-efficient": 5, // for scan_idx...
        "python-easier": 5,    // for j in range...
        "python-shorter": 2,
        "java-optimal": 5,     // for (int j = 1...
        "java-simple": 4,      // for (int i = 1...
        "javascript-optimal": 4 // for (let j = 1...
      }
    });

    if (arr[j] !== arr[i]) {
      i++;
      arr[i] = arr[j];
      
      const updateHighlights: Record<number, any> = {};
      for (let k = 0; k <= i; k++) updateHighlights[k] = "sorted";
      updateHighlights[i] = "swap"; // show index where new value is written

      steps.push({
        array: [...arr],
        pointers: { i, j },
        highlights: { ...updateHighlights },
        variables: { unique_count: i + 1, last_unique: arr[i], current: arr[j] },
        description: `Different element found! Increment i to ${i} and set nums[i] = nums[j] (${arr[j]}).`,
        codeLineMap: {
          "python-efficient": 7, // nums[write_idx] = nums[scan_idx]
          "python-easier": 7,    // nums[i] = nums[j]
          "python-shorter": 2,
          "java-optimal": 7,     // nums[i] = nums[j]
          "java-simple": 5,      // nums[insertIndex] = nums[i]
          "javascript-optimal": 6 // nums[i] = nums[j]
        }
      });
    } else {
      steps.push({
        array: [...arr],
        pointers: { i, j },
        highlights: { ...highlights, [j]: "inactive" },
        variables: { unique_count: i + 1, last_unique: arr[i], current: arr[j] },
        description: `Duplicate found at j = ${j} (${arr[j]}). Skip it and move scan pointer j forward.`,
        codeLineMap: {
          "python-efficient": 5,
          "python-easier": 5,
          "python-shorter": 2,
          "java-optimal": 5,
          "java-simple": 4,
          "javascript-optimal": 4
        }
      });
    }
  }

  // Final step
  const finalHighlights: Record<number, any> = {};
  for (let k = 0; k <= i; k++) finalHighlights[k] = "sorted";
  for (let k = i + 1; k < arr.length; k++) finalHighlights[k] = "inactive";

  steps.push({
    array: [...arr],
    pointers: { i: null, j: null },
    highlights: finalHighlights,
    variables: { unique_count: i + 1 },
    description: `Deduplication complete. First ${i + 1} elements are unique. Return length = ${i + 1}.`,
    codeLineMap: {
      "python-efficient": 8, // return write_idx + 1
      "python-easier": 8,    // return i + 1
      "python-shorter": 3,   // return len(nums)
      "java-optimal": 10,    // return i + 1
      "java-simple": 8,      // return insertIndex
      "javascript-optimal": 9 // return i + 1
    }
  });

  return steps;
}

export function generateLeftRotateByOneSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  if (arr.length <= 1) return [];

  const nums = [...arr];
  const temp = nums[0];
  
  steps.push({
    array: [...nums],
    pointers: { temp: 0 },
    highlights: { 0: "active" },
    variables: { temp },
    description: `Save the first element temp = nums[0] = ${temp}.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 1; i < nums.length; i++) {
    nums[i - 1] = nums[i];
    steps.push({
      array: [...nums],
      pointers: { i, temp: null },
      highlights: { [i - 1]: "swap", [i]: "compare" },
      variables: { temp, current: nums[i] },
      description: `Shift element from index ${i} (${nums[i]}) to index ${i - 1}.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });
  }

  nums[nums.length - 1] = temp;
  steps.push({
    array: [...nums],
    pointers: { temp: nums.length - 1 },
    highlights: { [nums.length - 1]: "sorted" },
    variables: { temp },
    description: `Put temp (${temp}) back at index ${nums.length - 1}. Rotation complete.`,
    codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 5 }
  });

  return steps;
}

export function generateLeftRotateByDSteps(arr: number[], d: number): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const n = arr.length;
  if (n <= 1) return [];
  const shift = d % n;
  if (shift === 0) return [];

  const nums = [...arr];

  const reverse = (start: number, end: number, stageName: string) => {
    let l = start;
    let r = end;
    while (l < r) {
      steps.push({
        array: [...nums],
        pointers: { left: l, right: r },
        highlights: { [l]: "compare", [r]: "compare" },
        variables: { stage: stageName, l, r },
        description: `Comparing elements to swap in ${stageName}: nums[${l}] = ${nums[l]}, nums[${r}] = ${nums[r]}.`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
      const temp = nums[l];
      nums[l] = nums[r];
      nums[r] = temp;
      steps.push({
        array: [...nums],
        pointers: { left: l, right: r },
        highlights: { [l]: "swap", [r]: "swap" },
        variables: { stage: stageName, swapped: `nums[${l}] ⇄ nums[${r}]` },
        description: `Swapped elements at ${l} and ${r} in ${stageName}.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
      l++;
      r--;
    }
  };

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: {},
    variables: { d_effective: shift },
    description: `Start left rotation by d = ${d} places (effective rotation = ${shift}). We reverse sections.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  reverse(0, shift - 1, "first part (0 to d-1)");
  reverse(shift, n - 1, "second part (d to n-1)");
  reverse(0, n - 1, "entire array");

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: nums.map(() => "sorted"),
    variables: { status: "rotated" },
    description: `Successfully completed left rotation by ${d} places using reversing.`,
    codeLineMap: { "python-efficient": 6, "java-optimal": 7, "javascript-optimal": 7 }
  });

  return steps;
}

export function generateUnionIntersectionSteps(arr1: number[], arr2: number[]): any[] {
  const steps: any[] = [];
  const a1 = [...arr1];
  const a2 = [...arr2];
  const combined = [...a1, "|", ...a2];
  
  let i = 0;
  let j = 0;
  const n = a1.length;
  const m = a2.length;
  const union: number[] = [];

  steps.push({
    array: combined,
    pointers: { i: 0, j: n + 1 },
    highlights: {},
    variables: { union: "[]" },
    description: "Initialize pointers i = 0 (for array 1) and j = 0 (for array 2).",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  while (i < n && j < m) {
    const v1 = a1[i];
    const v2 = a2[j];
    
    steps.push({
      array: combined,
      pointers: { i, j: n + 1 + j },
      highlights: { [i]: "compare", [n + 1 + j]: "compare" },
      variables: { val1: v1, val2: v2, union: `[${union.join(", ")}]` },
      description: `Compare element in arr1 (${v1}) with element in arr2 (${v2}).`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (v1 <= v2) {
      if (union.length === 0 || union[union.length - 1] !== v1) {
        union.push(v1);
        steps.push({
          array: combined,
          pointers: { i, j: n + 1 + j },
          highlights: { [i]: "sorted" },
          variables: { union: `[${union.join(", ")}]` },
          description: `Add ${v1} from arr1 to Union (avoiding duplicates).`,
          codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
        });
      }
      i++;
    } else {
      if (union.length === 0 || union[union.length - 1] !== v2) {
        union.push(v2);
        steps.push({
          array: combined,
          pointers: { i, j: n + 1 + j },
          highlights: { [n + 1 + j]: "sorted" },
          variables: { union: `[${union.join(", ")}]` },
          description: `Add ${v2} from arr2 to Union (avoiding duplicates).`,
          codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
        });
      }
      j++;
    }
  }

  while (i < n) {
    const v1 = a1[i];
    if (union.length === 0 || union[union.length - 1] !== v1) {
      union.push(v1);
      steps.push({
        array: combined,
        pointers: { i, j: null },
        highlights: { [i]: "sorted" },
        variables: { union: `[${union.join(", ")}]` },
        description: `Add remaining element ${v1} from arr1 to Union.`,
        codeLineMap: { "python-efficient": 10, "java-optimal": 10, "javascript-optimal": 10 }
      });
    }
    i++;
  }

  while (j < m) {
    const v2 = a2[j];
    if (union.length === 0 || union[union.length - 1] !== v2) {
      union.push(v2);
      steps.push({
        array: combined,
        pointers: { i: null, j: n + 1 + j },
        highlights: { [n + 1 + j]: "sorted" },
        variables: { union: `[${union.join(", ")}]` },
        description: `Add remaining element ${v2} from arr2 to Union.`,
        codeLineMap: { "python-efficient": 12, "java-optimal": 12, "javascript-optimal": 12 }
      });
    }
    j++;
  }

  steps.push({
    array: combined,
    pointers: { i: null, j: null },
    highlights: combined.map((_, idx) => idx === n ? "inactive" : "sorted"),
    variables: { union: `[${union.join(", ")}]` },
    description: `Union calculation complete: [${union.join(", ")}]`,
    codeLineMap: { "python-efficient": 14, "java-optimal": 14, "javascript-optimal": 14 }
  });

  return steps;
}

export function generateMissingNumberSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const n = arr.length;
  const totalSum = (n * (n + 1)) / 2;
  
  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { expected_sum: totalSum, running_sum: 0 },
    description: `Expected sum of first ${n} natural numbers is ${totalSum}. Initialize running sum = 0.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  let runningSum = 0;
  for (let i = 0; i < arr.length; i++) {
    runningSum += arr[i];
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { expected_sum: totalSum, running_sum: runningSum, added_value: arr[i] },
      description: `Read index ${i} (${arr[i]}). Update running sum to ${runningSum}.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });
  }

  const missing = totalSum - runningSum;
  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map(() => "sorted"),
    variables: { expected_sum: totalSum, running_sum: runningSum, missing_number: missing },
    description: `Missing number is expected_sum (${totalSum}) - running_sum (${runningSum}) = ${missing}.`,
    codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
  });

  return steps;
}

export function generateMaxConsecutiveOnesSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let maxCount = 0;
  let currentCount = 0;

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { max_consecutive: 0, current_consecutive: 0 },
    description: "Initialize max_consecutive = 0, current_consecutive = 0.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < arr.length; i++) {
    const isOne = arr[i] === 1;
    if (isOne) {
      currentCount++;
      if (currentCount > maxCount) {
        maxCount = currentCount;
      }
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "sorted" },
        variables: { max_consecutive: maxCount, current_consecutive: currentCount },
        description: `Element is 1. Increment current_consecutive to ${currentCount}. Update max_consecutive to ${maxCount}.`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
    } else {
      currentCount = 0;
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "inactive" },
        variables: { max_consecutive: maxCount, current_consecutive: 0 },
        description: `Element is 0. Reset current_consecutive count back to 0.`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 6, "javascript-optimal": 6 }
      });
    }
  }

  steps.push({
    array: [...arr],
    pointers: { i: null },
    highlights: arr.map((v) => (v === 1 ? "sorted" : "inactive")),
    variables: { max_consecutive: maxCount },
    description: `Scan complete. The maximum consecutive 1s is ${maxCount}.`,
    codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });

  return steps;
}

export function generateSubarrayWithGivenSumSteps(arr: number[], target: number): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let start = 0;
  let currentSum = 0;
  let found = false;

  steps.push({
    array: [...arr],
    pointers: { start: 0, end: 0 },
    highlights: {},
    variables: { current_sum: 0, target },
    description: `Initialize sliding window pointers. target = ${target}, current_sum = 0.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let end = 0; end < arr.length; end++) {
    currentSum += arr[end];
    
    const highlights: Record<number, any> = {};
    for (let k = start; k <= end; k++) {
      highlights[k] = "active";
    }

    steps.push({
      array: [...arr],
      pointers: { start, end },
      highlights: { ...highlights, [end]: "compare" },
      variables: { current_sum: currentSum, target },
      description: `Expand window to index ${end} adding ${arr[end]}. Current window sum = ${currentSum}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    while (currentSum > target && start <= end) {
      currentSum -= arr[start];
      start++;
      
      const shrinkHighlights: Record<number, any> = {};
      for (let k = start; k <= end; k++) {
        shrinkHighlights[k] = "active";
      }

      steps.push({
        array: [...arr],
        pointers: { start, end },
        highlights: shrinkHighlights,
        variables: { current_sum: currentSum, target },
        description: `Sum exceeds target. Shrink window from left. New sum = ${currentSum}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    }

    if (currentSum === target) {
      found = true;
      const successHighlights: Record<number, any> = {};
      for (let k = start; k <= end; k++) {
        successHighlights[k] = "sorted";
      }
      steps.push({
        array: [...arr],
        pointers: { start, end },
        highlights: successHighlights,
        variables: { current_sum: currentSum, target, sub_array: `indices [${start}..${end}]` },
        description: `Found subarray with sum ${target} from index ${start} to ${end}!`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
      break;
    }
  }

  if (!found) {
    steps.push({
      array: [...arr],
      pointers: { start: null, end: null },
      highlights: arr.map(() => "inactive"),
      variables: { current_sum: currentSum, target, status: "not_found" },
      description: `No subarray matches target sum ${target}.`,
      codeLineMap: { "python-efficient": 9, "java-optimal": 10, "javascript-optimal": 10 }
    });
  }

  return steps;
}

export function generateSingleNumberSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let xorSum = 0;

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { running_xor: 0 },
    description: "Initialize XOR accumulator running_xor = 0.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < arr.length; i++) {
    const oldXor = xorSum;
    xorSum ^= arr[i];
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { running_xor: `${oldXor} ⊕ ${arr[i]} = ${xorSum}` },
      description: `XOR running value with element at index ${i} (${arr[i]}). New XOR value = ${xorSum}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });
  }

  steps.push({
    array: [...arr],
    pointers: { i: null },
    highlights: arr.map(() => "sorted"),
    variables: { single_number: xorSum },
    description: `Scan complete. The unique number appearing once is ${xorSum}.`,
    codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
  });

  return steps;
}

export function generateSearch2DMatrixSteps(grid: number[][], target: number): any[] {
  const steps: any[] = [];
  const R = grid.length;
  const C = grid[0].length;
  let low = 0;
  let high = R * C - 1;
  let found = false;

  const visited = Array.from({ length: R }, () => Array(C).fill(false));

  steps.push({
    grid,
    visited: visited.map(row => [...row]),
    currentRow: -1,
    currentCol: -1,
    top: 0,
    bottom: R - 1,
    left: 0,
    right: C - 1,
    result: [],
    description: `Binary search in flattened 2D grid matrix. Target = ${target}. Initialize boundaries low = 0, high = ${high}.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const r = Math.floor(mid / C);
    const c = mid % C;
    const midVal = grid[r][c];

    visited[r][c] = true;

    steps.push({
      grid,
      visited: visited.map(row => [...row]),
      currentRow: r,
      currentCol: c,
      top: low,
      bottom: high,
      left: 0,
      right: C - 1,
      result: [midVal],
      description: `Mid flattened index is ${mid}. Maps to row ${r}, col ${c}. Value = ${midVal}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (midVal === target) {
      found = true;
      steps.push({
        grid,
        visited: visited.map(row => [...row]),
        currentRow: r,
        currentCol: c,
        top: low,
        bottom: high,
        left: 0,
        right: C - 1,
        result: [midVal],
        description: `Target ${target} found at row ${r}, col ${c}!`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
      break;
    } else if (midVal < target) {
      low = mid + 1;
      steps.push({
        grid,
        visited: visited.map(row => [...row]),
        currentRow: -1,
        currentCol: -1,
        top: low,
        bottom: high,
        left: 0,
        right: C - 1,
        result: [],
        description: `${midVal} is less than target. Search right half: low = ${low}.`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
      });
    } else {
      high = mid - 1;
      steps.push({
        grid,
        visited: visited.map(row => [...row]),
        currentRow: -1,
        currentCol: -1,
        top: low,
        bottom: high,
        left: 0,
        right: C - 1,
        result: [],
        description: `${midVal} is greater than target. Search left half: high = ${high}.`,
        codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
      });
    }
  }

  if (!found) {
    steps.push({
      grid,
      visited: visited.map(row => [...row]),
      currentRow: -1,
      currentCol: -1,
      top: low,
      bottom: high,
      left: 0,
      right: C - 1,
      result: [],
      description: `Search space exhausted. Target ${target} not found in matrix.`,
      codeLineMap: { "python-efficient": 10, "java-optimal": 11, "javascript-optimal": 11 }
    });
  }

  return steps;
}

export function generateRowWithMax1sSteps(grid: number[][]): any[] {
  const steps: any[] = [];
  const R = grid.length;
  const C = grid[0].length;

  let maxRowIdx = -1;

  const visited = Array.from({ length: R }, () => Array(C).fill(false));

  steps.push({
    grid,
    visited: visited.map(row => [...row]),
    currentRow: -1,
    currentCol: -1,
    top: 0,
    bottom: R - 1,
    left: 0,
    right: C - 1,
    result: [],
    description: `Find row with maximum number of 1s in a row-wise sorted 2D grid matrix.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  let r = 0;
  let c = C - 1;

  while (r < R && c >= 0) {
    visited[r][c] = true;
    const isOne = grid[r][c] === 1;

    steps.push({
      grid,
      visited: visited.map(row => [...row]),
      currentRow: r,
      currentCol: c,
      top: r,
      bottom: R - 1,
      left: 0,
      right: c,
      result: [maxRowIdx !== -1 ? maxRowIdx : 0],
      description: `Inspecting grid[${r}][${c}] = ${grid[r][c]}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (isOne) {
      maxRowIdx = r;
      c--;
      steps.push({
        grid,
        visited: visited.map(row => [...row]),
        currentRow: r,
        currentCol: c + 1,
        top: r,
        bottom: R - 1,
        left: 0,
        right: c,
        result: [r],
        description: `Found 1! Row ${r} is the current leader. Shift column left to ${c}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    } else {
      r++;
      steps.push({
        grid,
        visited: visited.map(row => [...row]),
        currentRow: r - 1,
        currentCol: c,
        top: r,
        bottom: R - 1,
        left: 0,
        right: c,
        result: [maxRowIdx],
        description: `Found 0. Shift row down to ${r}.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
    }
  }

  steps.push({
    grid,
    visited: visited.map(row => [...row]),
    currentRow: -1,
    currentCol: -1,
    top: 0,
    bottom: R - 1,
    left: 0,
    right: C - 1,
    result: [maxRowIdx],
    description: `Scan complete. Row with max 1s is index ${maxRowIdx}.`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });

  return steps;
}

export function generateMajorityElementSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let candidate = -1;
  let count = 0;

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { candidate: "None", count: 0 },
    description: "Start Boyer-Moore Majority Vote. Initialize candidate = None, count = 0.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < arr.length; i++) {
    if (count === 0) {
      candidate = arr[i];
      count = 1;
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "active" },
        variables: { candidate, count },
        description: `Count is 0. Establish new candidate = ${candidate} and set count = 1.`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
    } else {
      const isMatch = arr[i] === candidate;
      if (isMatch) {
        count++;
      } else {
        count--;
      }
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "compare" },
        variables: { candidate, count },
        description: `Compare current element ${arr[i]} with candidate ${candidate}. New count = ${count}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    }
  }

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map((v) => (v === candidate ? "sorted" : "inactive")),
    variables: { majority_element: candidate, final_count: count },
    description: `Scan complete. Candidate ${candidate} is the majority element.`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });

  return steps;
}

export function generatePrintMaxSubarraySteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let maxSoFar = -Infinity;
  let currentMax = 0;
  let start = 0;
  let subStart = 0;
  let subEnd = 0;

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { max_sum: "N/A", current_sum: 0 },
    description: "Start Kadane's algorithm. Track indices of maximum sum subarray.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < arr.length; i++) {
    currentMax += arr[i];
    
    const highlights: Record<number, any> = {};
    for (let k = start; k <= i; k++) {
      highlights[k] = "active";
    }

    steps.push({
      array: [...arr],
      pointers: { start, current: i },
      highlights,
      variables: { max_sum: maxSoFar === -Infinity ? "N/A" : maxSoFar, current_sum: currentMax },
      description: `Add element at index ${i} (${arr[i]}) to current sum. New current_sum = ${currentMax}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (currentMax > maxSoFar) {
      maxSoFar = currentMax;
      subStart = start;
      subEnd = i;
      
      const matchHighlights: Record<number, any> = {};
      for (let k = subStart; k <= subEnd; k++) {
        matchHighlights[k] = "sorted";
      }

      steps.push({
        array: [...arr],
        pointers: { sub_start: subStart, sub_end: subEnd },
        highlights: matchHighlights,
        variables: { max_sum: maxSoFar, current_sum: currentMax },
        description: `New max_sum subarray found! Sum = ${maxSoFar} from index ${subStart} to ${subEnd}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    }

    if (currentMax < 0) {
      currentMax = 0;
      start = i + 1;
      steps.push({
        array: [...arr],
        pointers: { next_start: start },
        highlights: { [i]: "inactive" },
        variables: { max_sum: maxSoFar, current_sum: 0 },
        description: `Current sum is negative. Reset sum to 0. Move starting index to ${start}.`,
        codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
      });
    }
  }

  const finalHighlights: Record<number, any> = {};
  for (let k = 0; k < arr.length; k++) {
    if (k >= subStart && k <= subEnd) finalHighlights[k] = "sorted";
    else finalHighlights[k] = "inactive";
  }

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: finalHighlights,
    variables: { max_sum: maxSoFar, sub_array: `nums[${subStart}..${subEnd}]` },
    description: `Traversal complete. Maximum sum subarray has sum = ${maxSoFar} (subarray: [${arr.slice(subStart, subEnd + 1).join(", ")}]).`,
    codeLineMap: { "python-efficient": 10, "java-optimal": 11, "javascript-optimal": 11 }
  });

  return steps;
}

export function generateStockBuySellSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  if (arr.length === 0) return [];
  
  let minPrice = arr[0];
  let maxProfit = 0;

  steps.push({
    array: [...arr],
    pointers: { min_price_idx: 0 },
    highlights: { 0: "active" },
    variables: { min_price: minPrice, max_profit: 0 },
    description: `Set initial min_price = ${minPrice} at day 0. Initial profit = 0.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 1; i < arr.length; i++) {
    const profit = arr[i] - minPrice;
    const isNewMin = arr[i] < minPrice;
    const isNewMaxProfit = profit > maxProfit;

    steps.push({
      array: [...arr],
      pointers: { buy: arr.indexOf(minPrice), sell: i },
      highlights: { [i]: "compare" },
      variables: { min_price: minPrice, current_price: arr[i], profit },
      description: `Day ${i} price is ${arr[i]}. Potential profit = ${arr[i]} - ${minPrice} = ${profit}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (isNewMin) {
      minPrice = arr[i];
      steps.push({
        array: [...arr],
        pointers: { buy: i },
        highlights: { [i]: "active" },
        variables: { min_price: minPrice, max_profit: maxProfit },
        description: `New lowest buying price found! Update min_price = ${minPrice}.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
    } else if (isNewMaxProfit) {
      maxProfit = profit;
      steps.push({
        array: [...arr],
        pointers: { buy: arr.indexOf(minPrice), sell: i },
        highlights: { [i]: "sorted" },
        variables: { min_price: minPrice, max_profit: maxProfit },
        description: `New maximum profit found! Update max_profit = ${maxProfit}.`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
      });
    }
  }

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map((_, idx) => (arr[idx] === minPrice || arr[idx] === minPrice + maxProfit ? "sorted" : "inactive")),
    variables: { max_profit: maxProfit },
    description: `Maximum possible profit from this transaction is ${maxProfit}.`,
    codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });

  return steps;
}

export function generateRearrangeAlternatingSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const n = arr.length;
  const result = new Array(n).fill(0);
  let posIdx = 0;
  let negIdx = 1;

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { positive_write_idx: 0, negative_write_idx: 1, result: `[${result.join(", ")}]` },
    description: "Start alternating signs placement. Initialize posIdx = 0, negIdx = 1.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < n; i++) {
    const val = arr[i];
    if (val > 0) {
      result[posIdx] = val;
      steps.push({
        array: [...arr],
        pointers: { i, positive_write: posIdx },
        highlights: { [i]: "compare" },
        variables: { positive_write_idx: posIdx, negative_write_idx: negIdx, result: `[${result.join(", ")}]` },
        description: `Positive number ${val} written to result index ${posIdx}.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
      posIdx += 2;
    } else {
      result[negIdx] = val;
      steps.push({
        array: [...arr],
        pointers: { i, negative_write: negIdx },
        highlights: { [i]: "compare" },
        variables: { positive_write_idx: posIdx, negative_write_idx: negIdx, result: `[${result.join(", ")}]` },
        description: `Negative number ${val} written to result index ${negIdx}.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
      negIdx += 2;
    }
  }

  steps.push({
    array: result,
    pointers: {},
    highlights: result.map(() => "sorted"),
    variables: { result: `[${result.join(", ")}]` },
    description: `Rearrangement complete: [${result.join(", ")}]`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });

  return steps;
}

export function generateNextPermutationSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const nums = [...arr];
  const n = nums.length;
  
  steps.push({
    array: [...nums],
    pointers: {},
    highlights: {},
    variables: { breakpoint: -1 },
    description: "Start next permutation. Find the breakpoint index from the right.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  let pivot = -1;
  for (let i = n - 2; i >= 0; i--) {
    steps.push({
      array: [...nums],
      pointers: { i },
      highlights: { [i]: "compare", [i + 1]: "compare" },
      variables: { breakpoint: -1 },
      description: `Comparing elements nums[${i}] = ${nums[i]} and nums[${i+1}] = ${nums[i+1]}.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });
    if (nums[i] < nums[i + 1]) {
      pivot = i;
      steps.push({
        array: [...nums],
        pointers: { pivot },
        highlights: { [pivot]: "active" },
        variables: { breakpoint: pivot },
        description: `Breakpoint found at index ${pivot} (value: ${nums[pivot]}).`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
      break;
    }
  }

  if (pivot === -1) {
    nums.reverse();
    steps.push({
      array: [...nums],
      pointers: {},
      highlights: nums.map(() => "swap"),
      variables: { breakpoint: "None" },
      description: "Array is sorted in descending order. Reverse the entire array to get the smallest permutation.",
      codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });
    return steps;
  }

  let swapIdx = -1;
  for (let i = n - 1; i > pivot; i--) {
    steps.push({
      array: [...nums],
      pointers: { i, pivot },
      highlights: { [i]: "compare" },
      variables: { pivot_val: nums[pivot], current: nums[i] },
      description: `Scan from right to find element larger than breakpoint value (${nums[pivot]}). Compare with ${nums[i]}.`,
      codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
    });
    if (nums[i] > nums[pivot]) {
      swapIdx = i;
      steps.push({
        array: [...nums],
        pointers: { pivot, swapIdx },
        highlights: { [pivot]: "swap", [swapIdx]: "swap" },
        variables: { pivot_val: nums[pivot], swap_val: nums[swapIdx] },
        description: `Found target! Swap breakpoint nums[${pivot}] (${nums[pivot]}) with nums[${swapIdx}] (${nums[swapIdx]}).`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
      
      const temp = nums[pivot];
      nums[pivot] = nums[swapIdx];
      nums[swapIdx] = temp;
      break;
    }
  }

  steps.push({
    array: [...nums],
    pointers: { reverse_start: pivot + 1, end: n - 1 },
    highlights: {},
    variables: { breakpoint: pivot },
    description: `Reverse suffix elements from index ${pivot + 1} to the end.`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });

  let l = pivot + 1;
  let r = n - 1;
  while (l < r) {
    const t = nums[l];
    nums[l] = nums[r];
    nums[r] = t;
    l++;
    r--;
  }

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: nums.map(() => "sorted"),
    variables: { status: "complete" },
    description: `Next permutation found successfully.`,
    codeLineMap: { "python-efficient": 10, "java-optimal": 10, "javascript-optimal": 10 }
  });

  return steps;
}

export function generateLeadersSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const leaders: number[] = [];
  const n = arr.length;
  
  if (n === 0) return [];
  
  let currentMax = arr[n - 1];
  leaders.push(currentMax);

  steps.push({
    array: [...arr],
    pointers: { i: n - 1 },
    highlights: { [n - 1]: "sorted" },
    variables: { current_max: currentMax, leaders: `[${leaders.join(", ")}]` },
    description: `Rightmost element ${currentMax} is always a leader. Add to leaders.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = n - 2; i >= 0; i--) {
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { current_max: currentMax, leaders: `[${leaders.join(", ")}]` },
      description: `Compare elements: nums[${i}] = ${arr[i]} with current_max = ${currentMax}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (arr[i] >= currentMax) {
      currentMax = arr[i];
      leaders.push(currentMax);
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "sorted" },
        variables: { current_max: currentMax, leaders: `[${leaders.join(", ")}]` },
        description: `Element ${arr[i]} is >= current_max. It is a leader! Update current_max and add to leaders.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    }
  }

  leaders.reverse();
  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map((val) => (leaders.includes(val) ? "sorted" : "inactive")),
    variables: { leaders: `[${leaders.join(", ")}]` },
    description: `Reversed leaders array list: [${leaders.join(", ")}].`,
    codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
  });

  return steps;
}

export function generateLongestConsecutiveSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const s = new Set(arr);
  let maxLen = 0;

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { set_items: Array.from(s).join(", "), max_length: 0 },
    description: "Insert all elements into a Set to allow O(1) lookups.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    const isStartOfSeq = !s.has(val - 1);
    
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { current: val, has_left: s.has(val - 1) ? "Yes" : "No", max_length: maxLen },
      description: `Checking if ${val} is the start of a consecutive sequence (i.e. ${val - 1} is not in Set).`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (isStartOfSeq) {
      let currentVal = val;
      let currentLen = 1;
      
      while (s.has(currentVal + 1)) {
        currentVal++;
        currentLen++;
        steps.push({
          array: [...arr],
          pointers: { i },
          highlights: { [i]: "active" },
          variables: { seq_start: val, current: currentVal, current_len: currentLen },
          description: `Sequence continues: found ${currentVal} in Set. Increment current_len to ${currentLen}.`,
          codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
        });
      }
      
      if (currentLen > maxLen) {
        maxLen = currentLen;
      }
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "sorted" },
        variables: { max_length: maxLen },
        description: `Sequence ended at ${currentVal}. Sequence length is ${currentLen}. Maximum consecutive length is now ${maxLen}.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
    }
  }

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map(() => "sorted"),
    variables: { max_length: maxLen },
    description: `Search complete. The longest consecutive sequence length is ${maxLen}.`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });

  return steps;
}

export function generateSetMatrixZerosSteps(grid: number[][]): any[] {
  const steps: any[] = [];
  const R = grid.length;
  const C = grid[0].length;
  
  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  const newGrid = grid.map(row => [...row]);
  
  steps.push({
    grid,
    visited: visited.map(row => [...row]),
    currentRow: -1,
    currentCol: -1,
    top: 0,
    bottom: R - 1,
    left: 0,
    right: C - 1,
    result: [],
    description: "Analyze grid to identify rows and columns containing zeros.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  const zeroRows = new Set<number>();
  const zeroCols = new Set<number>();

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      visited[r][c] = true;
      if (grid[r][c] === 0) {
        zeroRows.add(r);
        zeroCols.add(c);
        steps.push({
          grid,
          visited: visited.map(row => [...row]),
          currentRow: r,
          currentCol: c,
          top: 0,
          bottom: R - 1,
          left: 0,
          right: C - 1,
          result: [],
          description: `Zero found at [row: ${r}, col: ${c}]. Mark row ${r} and col ${c} for clearing.`,
          codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
        });
      }
    }
  }

  for (const r of zeroRows) {
    for (let c = 0; c < C; c++) {
      newGrid[r][c] = 0;
    }
    steps.push({
      grid: newGrid.map(row => [...row]),
      visited: visited.map(row => [...row]),
      currentRow: r,
      currentCol: -1,
      top: 0,
      bottom: R - 1,
      left: 0,
      right: C - 1,
      result: [],
      description: `Clearing row ${r} because it contained a zero.`,
      codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
    });
  }

  for (const c of zeroCols) {
    for (let r = 0; r < R; r++) {
      newGrid[r][c] = 0;
    }
    steps.push({
      grid: newGrid.map(row => [...row]),
      visited: visited.map(row => [...row]),
      currentRow: -1,
      currentCol: c,
      top: 0,
      bottom: R - 1,
      left: 0,
      right: C - 1,
      result: [],
      description: `Clearing column ${c} because it contained a zero.`,
      codeLineMap: { "python-efficient": 10, "java-optimal": 10, "javascript-optimal": 10 }
    });
  }

  steps.push({
    grid: newGrid.map(row => [...row]),
    visited: visited.map(() => Array(C).fill(true)),
    currentRow: -1,
    currentCol: -1,
    top: 0,
    bottom: R - 1,
    left: 0,
    right: C - 1,
    result: [],
    description: "Matrix zero setting complete.",
    codeLineMap: { "python-efficient": 11, "java-optimal": 11, "javascript-optimal": 11 }
  });

  return steps;
}

export function generateRotateMatrixSteps(grid: number[][]): any[] {
  const steps: any[] = [];
  const R = grid.length;
  const C = grid[0].length;
  
  const currentGrid = grid.map(row => [...row]);
  const visited = Array.from({ length: R }, () => Array(C).fill(false));

  steps.push({
    grid: currentGrid.map(row => [...row]),
    visited: visited.map(row => [...row]),
    currentRow: -1,
    currentCol: -1,
    top: 0, bottom: R-1, left: 0, right: C-1,
    result: [],
    description: "Rotate 2D matrix 90 degrees clockwise. Phase 1: Transpose matrix.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < R; i++) {
    for (let j = i + 1; j < C; j++) {
      visited[i][j] = true;
      visited[j][i] = true;

      const temp = currentGrid[i][j];
      currentGrid[i][j] = currentGrid[j][i];
      currentGrid[j][i] = temp;

      steps.push({
        grid: currentGrid.map(row => [...row]),
        visited: visited.map(row => [...row]),
        currentRow: i,
        currentCol: j,
        top: 0, bottom: R-1, left: 0, right: C-1,
        result: [],
        description: `Transpose: Swap element grid[${i}][${j}] (${currentGrid[j][i]}) with grid[${j}][${i}] (${currentGrid[i][j]}).`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
    }
  }

  steps.push({
    grid: currentGrid.map(row => [...row]),
    visited: visited.map(() => Array(C).fill(false)),
    currentRow: -1,
    currentCol: -1,
    top: 0, bottom: R-1, left: 0, right: C-1,
    result: [],
    description: "Transpose completed. Phase 2: Reverse each row of the grid.",
    codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
  });

  const rowVisited = Array.from({ length: R }, () => Array(C).fill(false));

  for (let i = 0; i < R; i++) {
    let l = 0;
    let r = C - 1;
    while (l < r) {
      rowVisited[i][l] = true;
      rowVisited[i][r] = true;
      const t = currentGrid[i][l];
      currentGrid[i][l] = currentGrid[i][r];
      currentGrid[i][r] = t;

      steps.push({
        grid: currentGrid.map(row => [...row]),
        visited: rowVisited.map(row => [...row]),
        currentRow: i,
        currentCol: l,
        top: 0, bottom: R-1, left: 0, right: C-1,
        result: [],
        description: `Reversing row ${i}: Swap columns ${l} and ${r} (${currentGrid[i][r]} ⇄ ${currentGrid[i][l]}).`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
      l++;
      r--;
    }
  }

  steps.push({
    grid: currentGrid.map(row => [...row]),
    visited: rowVisited.map(() => Array(C).fill(true)),
    currentRow: -1,
    currentCol: -1,
    top: 0, bottom: R-1, left: 0, right: C-1,
    result: [],
    description: "Matrix rotated 90 degrees clockwise successfully.",
    codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });

  return steps;
}

export function generatePascalsTriangleSteps(numRows: number): any[] {
  const steps: any[] = [];
  const maxCols = numRows;
  const grid = Array.from({ length: numRows }, () => Array(maxCols).fill(0));
  const visited = Array.from({ length: numRows }, () => Array(maxCols).fill(false));

  steps.push({
    grid: grid.map(row => [...row]),
    visited: visited.map(row => [...row]),
    currentRow: -1, currentCol: -1,
    top: 0, bottom: numRows-1, left: 0, right: maxCols-1,
    result: [],
    description: `Construct Pascal's Triangle with ${numRows} rows.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let r = 0; r < numRows; r++) {
    grid[r][0] = 1;
    grid[r][r] = 1;
    visited[r][0] = true;
    visited[r][r] = true;

    steps.push({
      grid: grid.map(row => [...row]),
      visited: visited.map(row => [...row]),
      currentRow: r, currentCol: 0,
      top: 0, bottom: numRows-1, left: 0, right: maxCols-1,
      result: [],
      description: `Initialize row ${r} edge bounds with 1s.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    for (let c = 1; c < r; c++) {
      visited[r][c] = true;
      const leftVal = grid[r - 1][c - 1];
      const rightVal = grid[r - 1][c];
      const cellVal = leftVal + rightVal;
      grid[r][c] = cellVal;

      steps.push({
        grid: grid.map(row => [...row]),
        visited: visited.map(row => [...row]),
        currentRow: r, currentCol: c,
        top: 0, bottom: numRows-1, left: 0, right: maxCols-1,
        result: [],
        description: `Compute row ${r}, column ${c} = previous left (${leftVal}) + previous right (${rightVal}) = ${cellVal}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    }
  }

  steps.push({
    grid: grid.map(row => [...row]),
    visited: grid.map(row => row.map(v => v > 0)),
    currentRow: -1, currentCol: -1,
    top: 0, bottom: numRows-1, left: 0, right: maxCols-1,
    result: [],
    description: `Completed Pascal's Triangle generation up to ${numRows} rows.`,
    codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });

  return steps;
}

export function generateMajorityElementN3Steps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let candidate1 = -1, candidate2 = -1;
  let count1 = 0, count2 = 0;

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { candidate1: "None", count1: 0, candidate2: "None", count2: 0 },
    description: "Start Boyer-Moore voting for elements appearing > n/3 times. Track two candidates.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { candidate1, count1, candidate2, count2, current: val },
      description: `Checking element at index ${i} (${val}).`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (candidate1 === val) {
      count1++;
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "active" },
        variables: { candidate1, count1, candidate2, count2 },
        description: `Element matches candidate 1. Increment count1 to ${count1}.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
    } else if (candidate2 === val) {
      count2++;
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "active" },
        variables: { candidate1, count1, candidate2, count2 },
        description: `Element matches candidate 2. Increment count2 to ${count2}.`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
      });
    } else if (count1 === 0) {
      candidate1 = val;
      count1 = 1;
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "sorted" },
        variables: { candidate1, count1, candidate2, count2 },
        description: `count1 is 0. Establish candidate 1 = ${val}.`,
        codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
      });
    } else if (count2 === 0) {
      candidate2 = val;
      count2 = 1;
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "sorted" },
        variables: { candidate1, count1, candidate2, count2 },
        description: `count2 is 0. Establish candidate 2 = ${val}.`,
        codeLineMap: { "python-efficient": 11, "java-optimal": 11, "javascript-optimal": 11 }
      });
    } else {
      count1--;
      count2--;
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "swap" },
        variables: { candidate1, count1, candidate2, count2 },
        description: `Mismatch. Decrement both counters: count1 = ${count1}, count2 = ${count2}.`,
        codeLineMap: { "python-efficient": 13, "java-optimal": 13, "javascript-optimal": 13 }
      });
    }
  }

  const result: number[] = [];
  if (arr.filter(x => x === candidate1).length > Math.floor(arr.length / 3)) result.push(candidate1);
  if (arr.filter(x => x === candidate2).length > Math.floor(arr.length / 3)) result.push(candidate2);

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map(v => (result.includes(v) ? "sorted" : "inactive")),
    variables: { candidates: `[${candidate1}, ${candidate2}]`, result: `[${result.join(", ")}]` },
    description: `Second pass verification complete. Majority elements appearing > n/3 times are: [${result.join(", ")}].`,
    codeLineMap: { "python-efficient": 16, "java-optimal": 16, "javascript-optimal": 16 }
  });

  return steps;
}

export function generateThreeSumSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const nums = [...arr].sort((a, b) => a - b);
  const result: string[] = [];

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: {},
    variables: { triplets: "[]" },
    description: "3-Sum: Sort the array first to apply the two-pointer technique.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    steps.push({
      array: [...nums],
      pointers: { i, left, right },
      highlights: { [i]: "active", [left]: "compare", [right]: "compare" },
      variables: { current_val: nums[i], triplets: `[${result.join(", ")}]` },
      description: `Fixed pivot nums[${i}] = ${nums[i]}. Initialize left = ${left}, right = ${right}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      steps.push({
        array: [...nums],
        pointers: { i, left, right },
        highlights: { [i]: "active", [left]: "compare", [right]: "compare" },
        variables: { sum, target: 0, triplets: `[${result.join(", ")}]` },
        description: `Check sum: ${nums[i]} + ${nums[left]} + ${nums[right]} = ${sum}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });

      if (sum === 0) {
        const triplet = `[${nums[i]}, ${nums[left]}, ${nums[right]}]`;
        result.push(triplet);
        steps.push({
          array: [...nums],
          pointers: { i, left, right },
          highlights: { [i]: "sorted", [left]: "sorted", [right]: "sorted" },
          variables: { sum, triplets: `[${result.join(", ")}]` },
          description: `Sum is 0! Found triplet: ${triplet}.`,
          codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
        });
        
        left++;
        right--;
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: nums.map(() => "sorted"),
    variables: { triplets: `[${result.join(", ")}]` },
    description: `3-Sum search complete. Unique triplets: [${result.join(", ")}].`,
    codeLineMap: { "python-efficient": 14, "java-optimal": 14, "javascript-optimal": 14 }
  });

  return steps;
}

export function generateFourSumSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const nums = [...arr].sort((a, b) => a - b);
  const result: string[] = [];

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: {},
    variables: { quadruplets: "[]" },
    description: "4-Sum: Sort the array first to use two-pointers nesting.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let left = j + 1;
      let right = nums.length - 1;

      steps.push({
        array: [...nums],
        pointers: { i, j, left, right },
        highlights: { [i]: "active", [j]: "active", [left]: "compare", [right]: "compare" },
        variables: { current_sums: nums[i] + nums[j], quadruplets: `[${result.join(", ")}]` },
        description: `Fixed pointers i = ${i}, j = ${j}. Initialize left = ${left}, right = ${right}.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === 0) {
          const quad = `[${nums[i]}, ${nums[j]}, ${nums[left]}, ${nums[right]}]`;
          result.push(quad);
          steps.push({
            array: [...nums],
            pointers: { i, j, left, right },
            highlights: { [i]: "sorted", [j]: "sorted", [left]: "sorted", [right]: "sorted" },
            variables: { sum, quadruplets: `[${result.join(", ")}]` },
            description: `Sum is 0! Found quadruplet: ${quad}.`,
            codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
          });
          left++;
          right--;
          while (left < right && nums[left] === nums[left - 1]) left++;
          while (left < right && nums[right] === nums[right + 1]) right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }
  }

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: nums.map(() => "sorted"),
    variables: { quadruplets: `[${result.join(", ")}]` },
    description: `4-Sum search complete. Unique quadruplets: [${result.join(", ")}].`,
    codeLineMap: { "python-efficient": 11, "java-optimal": 11, "javascript-optimal": 11 }
  });

  return steps;
}

export function generateLargestSubarray0SumSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let maxLen = 0;
  let runningSum = 0;
  const sumMap = new Map<number, number>();

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { sum_map: "{}", max_len: 0 },
    description: "Initialize prefix sum hash map. Track running sums to find zero-sum intervals.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < arr.length; i++) {
    runningSum += arr[i];
    
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { current_val: arr[i], running_sum: runningSum, max_len: maxLen },
      description: `Read index ${i} (${arr[i]}). Updated running sum = ${runningSum}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (runningSum === 0) {
      maxLen = i + 1;
      const subHighlights: Record<number, any> = {};
      for (let k = 0; k <= i; k++) subHighlights[k] = "sorted";
      
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: subHighlights,
        variables: { running_sum: runningSum, max_len: maxLen },
        description: `Running sum is 0! Subarray from index 0 to ${i} has sum 0. Length = ${maxLen}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    } else if (sumMap.has(runningSum)) {
      const prevIdx = sumMap.get(runningSum)!;
      const len = i - prevIdx;
      if (len > maxLen) {
        maxLen = len;
      }
      
      const subHighlights: Record<number, any> = {};
      for (let k = prevIdx + 1; k <= i; k++) subHighlights[k] = "sorted";

      steps.push({
        array: [...arr],
        pointers: { start: prevIdx + 1, end: i },
        highlights: subHighlights,
        variables: { running_sum: runningSum, prev_index: prevIdx, length: len, max_len: maxLen },
        description: `Running sum ${runningSum} was seen before at index ${prevIdx}. Subarray sum is 0. Length = ${len}.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
    } else {
      sumMap.set(runningSum, i);
      steps.push({
        array: [...arr],
        pointers: { i },
        highlights: { [i]: "active" },
        variables: { running_sum: runningSum, max_len: maxLen },
        description: `Store running sum ${runningSum} at index ${i} in our map.`,
        codeLineMap: { "python-efficient": 10, "java-optimal": 10, "javascript-optimal": 10 }
      });
    }
  }

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map(() => "sorted"),
    variables: { max_length: maxLen },
    description: `Scan complete. The maximum length of a zero-sum subarray is ${maxLen}.`,
    codeLineMap: { "python-efficient": 11, "java-optimal": 11, "javascript-optimal": 11 }
  });

  return steps;
}

export function generateCountSubarraysXorKSteps(arr: number[], k: number): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let count = 0;
  let xr = 0;
  const xorMap = new Map<number, number>();
  xorMap.set(0, 1);

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { target_xor: k, current_xr: 0, count: 0 },
    description: `Initialize prefix XOR frequency map with {0: 1}. Target XOR = ${k}.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < arr.length; i++) {
    xr ^= arr[i];
    const target = xr ^ k;
    const additional = xorMap.get(target) || 0;
    count += additional;

    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { current_val: arr[i], running_xor: xr, lookup_target: target, matches_found: additional, total_subarrays: count },
      description: `Index ${i} (${arr[i]}). Running XOR xr = ${xr}. We search xr ^ k = ${target} in map.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    xorMap.set(xr, (xorMap.get(xr) || 0) + 1);
  }

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map(() => "sorted"),
    variables: { count },
    description: `Total count of subarrays with XOR sum ${k} is ${count}.`,
    codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
  });

  return steps;
}

export function generateMergeOverlappingIntervalsSteps(intervals: number[][]): any[] {
  const steps: any[] = [];
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const displayArr = sorted.map(pair => `[${pair.join(",")}]`);
  
  steps.push({
    array: [...displayArr],
    pointers: {},
    highlights: {},
    variables: { merged: "[]" },
    description: "Sort intervals based on start values to process them sequentially.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  const merged: number[][] = [];
  merged.push(sorted[0]);

  steps.push({
    array: [...displayArr],
    pointers: { curr: 0 },
    highlights: { 0: "active" },
    variables: { merged: `[[${sorted[0].join(",")}]]` },
    description: `Insert the first interval [${sorted[0].join(",")}] into the merged list.`,
    codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
  });

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    const highlights: Record<number, any> = { [i]: "compare" };
    merged.forEach(m => {
      const idx = sorted.findIndex(s => s[0] === m[0] && s[1] === m[1]);
      if (idx !== -1) highlights[idx] = "active";
    });

    steps.push({
      array: [...displayArr],
      pointers: { current: i, last_merged: sorted.indexOf(last) },
      highlights,
      variables: { current: `[${current.join(",")}]`, last_merged: `[${last.join(",")}]` },
      description: `Compare current interval [${current.join(",")}] with last merged interval [${last.join(",")}].`,
      codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });

    if (current[0] <= last[1]) {
      const oldEnd = last[1];
      last[1] = Math.max(last[1], current[1]);
      
      displayArr[sorted.indexOf(last)] = `[${last.join(",")}]`;

      steps.push({
        array: [...displayArr],
        pointers: { current: i, last_merged: sorted.indexOf(last) },
        highlights: { [i]: "swap", [sorted.indexOf(last)]: "swap" },
        variables: { new_merged_interval: `[${last.join(",")}]` },
        description: `Overlap detected! Merge intervals by extending end from ${oldEnd} to ${last[1]}.`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
      });
    } else {
      merged.push(current);
      steps.push({
        array: [...displayArr],
        pointers: { current: i },
        highlights: { [i]: "active" },
        variables: { merged: JSON.stringify(merged) },
        description: `No overlap. Add [${current.join(",")}] as a new interval to merged list.`,
        codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
      });
    }
  }

  const finalHighlights: Record<number, any> = {};
  displayArr.forEach((_, idx) => {
    const isMergedRepr = merged.some(m => sorted[idx] && sorted[idx][0] === m[0]);
    finalHighlights[idx] = isMergedRepr ? "sorted" : "inactive";
  });

  steps.push({
    array: merged.map(pair => `[${pair.join(",")}]`),
    pointers: {},
    highlights: merged.map(() => "sorted"),
    variables: { final_intervals: JSON.stringify(merged) },
    description: `Merge complete. Overlapping intervals merged: ${JSON.stringify(merged)}.`,
    codeLineMap: { "python-efficient": 10, "java-optimal": 10, "javascript-optimal": 10 }
  });

  return steps;
}

export function generateMergeSortedArraysSteps(arr1: number[], arr2: number[]): any[] {
  const steps: any[] = [];
  const a1 = [...arr1];
  const a2 = [...arr2];
  const n = a1.length;
  const m = a2.length;
  const combined = [...a1, "|", ...a2];

  steps.push({
    array: [...combined],
    pointers: { i: n - 1, j: n + 1 },
    highlights: {},
    variables: { arr1: `[${a1.join(",")}]`, arr2: `[${a2.join(",")}]` },
    description: "Compare elements from the end of array 1 and start of array 2. Swap if out of order.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  let i = n - 1;
  let j = 0;

  while (i >= 0 && j < m) {
    steps.push({
      array: [...combined],
      pointers: { i, j: n + 1 + j },
      highlights: { [i]: "compare", [n + 1 + j]: "compare" },
      variables: { val1: combined[i], val2: combined[n + 1 + j] },
      description: `Compare element at index ${i} of arr1 (${combined[i]}) with index ${j} of arr2 (${combined[n + 1 + j]}).`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if ((combined[i] as number) > (combined[n + 1 + j] as number)) {
      const temp = combined[i];
      combined[i] = combined[n + 1 + j];
      combined[n + 1 + j] = temp;

      steps.push({
        array: [...combined],
        pointers: { i, j: n + 1 + j },
        highlights: { [i]: "swap", [n + 1 + j]: "swap" },
        variables: { swapped: `arr1[${i}] ⇄ arr2[${j}]` },
        description: `Swap elements: arr1[${i}] is larger. Swap them in-place.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
      i--;
      j++;
    } else {
      break;
    }
  }

  steps.push({
    array: [...combined],
    pointers: {},
    highlights: {},
    variables: {},
    description: "Phase 2: Sort both individual arrays to restore sorted order.",
    codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
  });

  const part1 = combined.slice(0, n).map(Number).sort((x, y) => x - y);
  const part2 = combined.slice(n + 1).map(Number).sort((x, y) => x - y);
  const sortedCombined = [...part1, "|", ...part2];

  steps.push({
    array: [...sortedCombined],
    pointers: {},
    highlights: sortedCombined.map((v) => (v === "|" ? "inactive" : "sorted")),
    variables: { arr1: `[${part1.join(",")}]`, arr2: `[${part2.join(",")}]` },
    description: "Sort complete. Both arrays are now merged and sorted.",
    codeLineMap: { "python-efficient": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });

  return steps;
}

export function generateRepeatingMissingSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const n = arr.length;
  const count = new Array(n + 1).fill(0);
  
  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { frequency_table: `[${count.slice(1).join(", ")}]` },
    description: "Start scanning to identify repeating and missing numbers. Initialize frequency tracker.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
    steps.push({
      array: [...arr],
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { current_val: arr[i], frequency_table: `[${count.slice(1).join(", ")}]` },
      description: `Read value ${arr[i]}. Increment frequency counter.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });
  }

  let repeating = -1;
  let missing = -1;

  for (let i = 1; i <= n; i++) {
    if (count[i] === 2) repeating = i;
    else if (count[i] === 0) missing = i;
  }

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map((val) => (val === repeating ? "swap" : "sorted")),
    variables: { repeating, missing },
    description: `Analysis complete. Repeating element is ${repeating}, Missing element is ${missing}.`,
    codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
  });

  return steps;
}

export function generateCountInversionsSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const nums = [...arr];
  let inversions = 0;

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: {},
    variables: { inversion_count: 0 },
    description: "Initialize count of inversions = 0.",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      steps.push({
        array: [...nums],
        pointers: { i, j },
        highlights: { [i]: "compare", [j]: "compare" },
        variables: { val_i: nums[i], val_j: nums[j], current_inversions: inversions },
        description: `Check if nums[${i}] (${nums[i]}) > nums[${j}] (${nums[j]}) (Inversion check).`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });

      if (nums[i] > nums[j]) {
        inversions++;
        steps.push({
          array: [...nums],
          pointers: { i, j },
          highlights: { [i]: "swap", [j]: "swap" },
          variables: { val_i: nums[i], val_j: nums[j], current_inversions: inversions },
          description: `Inversion found! nums[${i}] > nums[${j}]. Increment inversion_count to ${inversions}.`,
          codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
        });
      }
    }
  }

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: nums.map(() => "sorted"),
    variables: { total_inversions: inversions },
    description: `Total number of inversions in the array is ${inversions}.`,
    codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
  });

  return steps;
}

export function generateReversePairsSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const nums = [...arr];
  let reversePairs = 0;

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: {},
    variables: { reverse_pairs_count: 0 },
    description: "Start searching for reverse pairs (nums[i] > 2 * nums[j] for i < j).",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const isReversePair = nums[i] > 2 * nums[j];
      steps.push({
        array: [...nums],
        pointers: { i, j },
        highlights: { [i]: "compare", [j]: "compare" },
        variables: { val_i: nums[i], twice_val_j: 2 * nums[j], reverse_pairs_count: reversePairs },
        description: `Check if nums[${i}] (${nums[i]}) > 2 * nums[${j}] (${2 * nums[j]}).`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });

      if (isReversePair) {
        reversePairs++;
        steps.push({
          array: [...nums],
          pointers: { i, j },
          highlights: { [i]: "swap", [j]: "swap" },
          variables: { val_i: nums[i], twice_val_j: 2 * nums[j], reverse_pairs_count: reversePairs },
          description: `Reverse pair found! Increment count to ${reversePairs}.`,
          codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
        });
      }
    }
  }

  steps.push({
    array: [...nums],
    pointers: {},
    highlights: nums.map(() => "sorted"),
    variables: { total_reverse_pairs: reversePairs },
    description: `Scan complete. Total number of reverse pairs is ${reversePairs}.`,
    codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
  });

  return steps;
}

export function generateMaxProductSubarraySteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const n = arr.length;
  if (n === 0) return [];

  let maxProduct = -Infinity;
  let prefix = 1;
  let suffix = 1;

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: {},
    variables: { max_product: "N/A" },
    description: "Start maximum product subarray search. Scan from both directions (Prefix & Suffix).",
    codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  for (let i = 0; i < n; i++) {
    if (prefix === 0) prefix = 1;
    if (suffix === 0) suffix = 1;

    prefix *= arr[i];
    suffix *= arr[n - 1 - i];

    const currentMax = Math.max(prefix, suffix);
    if (currentMax > maxProduct) {
      maxProduct = currentMax;
    }

    steps.push({
      array: [...arr],
      pointers: { prefix_ptr: i, suffix_ptr: n - 1 - i },
      highlights: { [i]: "compare", [n - 1 - i]: "compare" },
      variables: { prefix_val: prefix, suffix_val: suffix, current_max_product: maxProduct },
      description: `Compute running prefix product = ${prefix} and suffix product = ${suffix}. Max product = ${maxProduct}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });
  }

  steps.push({
    array: [...arr],
    pointers: {},
    highlights: arr.map(() => "sorted"),
    variables: { max_product: maxProduct },
    description: `Maximum product subarray value is ${maxProduct}.`,
    codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });

  return steps;
}

export const step1ArraysRegistry: Record<string, ProblemVisualizerMeta> = {
  "0_2sum_problem": {
    problemName: "Two Sum",
    category: "arrays",
    description: "Find two indices in an array such that their values add up to a specific target.",
    visualizerType: "array1d",
    defaultInput: {
      array: [2, 7, 11, 15, 3, 6],
      target: 9,
    },
    generateSteps: (input) => generateTwoSumSteps(input.array, input.target),
    solutions: {
      javascript: [
        {
          label: "Optimal",
          code: `function twoSum(nums, target) {
  const map = new Map(); // Store number -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        },
      ],
      python: [
        {
          label: "Efficient (Hash Map)",
          code: `def twoSum(nums, target):
    # Single-pass Hash Map lookup
    seen = {}
    for idx, val in enumerate(nums):
        complement = target - val
        if complement in seen:
            return [seen[complement], idx]
        seen[val] = idx
    return []`,
        },
        {
          label: "Easier (Two-Pointer)",
          code: `def twoSum(nums, target):
    # Pairs with original indices sorted by value
    sorted_pairs = sorted((val, idx) for idx, val in enumerate(nums))
    left, right = 0, len(sorted_pairs) - 1
    
    while left < right:
        current_sum = sorted_pairs[left][0] + sorted_pairs[right][0]
        if current_sum == target:
            return [sorted_pairs[left][1], sorted_pairs[right][1]]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
        },
        {
          label: "Shorter (Nested Loop)",
          code: `def twoSum(nums, target):
    # Short brute force without hash map overhead
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
        },
      ],
      java: [
        {
          label: "Optimal (HashMap)",
          code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
        },
        {
          label: "Simple (Brute Force)",
          code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[] { i, j };
                }
            }
        }
        return new int[] {};
    }
}`,
        },
      ],
    },
  },
  "0_largest_element_in_an_array": {
    problemName: "Largest Element in Array",
    category: "arrays",
    description: "Scan the array once to find the maximum element value.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 8, 7, 56, 90, 12, 45]
    },
    generateSteps: (input) => generateLargestElementSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Single Pass)",
          code: `def largest(arr):
    max_val = arr[0]
    for x in arr:
        if x > max_val:
            max_val = x
    return max_val`
        },
        {
          label: "Shorter (Max Function)",
          code: `def largest(arr):
    return max(arr)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int largest(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function largest(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`
        }
      ]
    }
  },
  "1_second_largest_element_in_an_array_without_sorting": {
    problemName: "Second Largest Element",
    category: "arrays",
    description: "Find the second largest unique value in the array in a single traversal.",
    visualizerType: "array1d",
    defaultInput: {
      array: [12, 35, 1, 10, 34, 1]
    },
    generateSteps: (input) => generateSecondLargestSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def getSecondLargest(arr):
    largest = arr[0]
    second = -1
    for x in arr:
        if x > largest:
            second = largest
            largest = x
        elif x < largest and x > second:
            second = x
    return second`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int getSecondLargest(int[] arr) {
        int largest = arr[0];
        int second = -1;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > largest) {
                second = largest;
                largest = arr[i];
            } else if (arr[i] < largest && arr[i] > second) {
                second = arr[i];
            }
        }
        return second;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function getSecondLargest(arr) {
  let largest = arr[0];
  let second = -1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      second = largest;
      largest = arr[i];
    } else if (arr[i] < largest && arr[i] > second) {
      second = arr[i];
    }
  }
  return second;
}`
        }
      ]
    }
  },
  "2_check_if_the_array_is_sorted": {
    problemName: "Check if Sorted",
    category: "arrays",
    description: "Determine whether the array elements are sorted in non-decreasing order.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 2, 4, 7, 7, 12]
    },
    generateSteps: (input) => generateCheckSortedSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def isSorted(arr):
    for i in range(1, len(arr)):
        if arr[i] < arr[i-1]:
            return False
    return True`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean arraySortedOrNot(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return false;
            }
        }
        return true;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}`
        }
      ]
    }
  },
  "3_remove_duplicates_from_sorted_array": {
    problemName: "Remove duplicates from Sorted array",
    category: "arrays",
    description: "Given a sorted array nums, remove the duplicates in-place such that each unique element appears only once. Return the new length.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 1, 2, 2, 2, 3, 4, 4]
    },
    generateSteps: (input) => generateRemoveDuplicatesSteps(input.array),
    solutions: {
      javascript: [
        {
          label: "Optimal",
          code: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}`
        }
      ],
      python: [
        {
          label: "Efficient (Two Pointer)",
          code: `def removeDuplicates(nums):
    # Modifies array in-place, returning new length
    if not nums: return 0
    write_idx = 0
    for scan_idx in range(1, len(nums)):
        if nums[scan_idx] != nums[write_idx]:
            write_idx += 1
            nums[write_idx] = nums[scan_idx]
    return write_idx + 1`
        },
        {
          label: "Easier (Loop Comparison)",
          code: `def removeDuplicates(nums):
    # Track the last unique index comparison
    if not nums: return 0
    i = 0
    for j in range(1, len(nums)):
        if nums[j] != nums[i]:
            i += 1
            nums[i] = nums[j]
    return i + 1`
        },
        {
          label: "Shorter (Slice Assignment)",
          code: `def removeDuplicates(nums):
    # Compact slice set replacement
    nums[:] = sorted(set(nums))
    return len(nums)`
        }
      ],
      java: [
        {
          label: "Optimal (Two Pointer)",
          code: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int i = 0;
        for (int j = 1; j < nums.length; j++) {
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }
        return i + 1;
    }
}`
        },
        {
          label: "Simple (Index Copy)",
          code: `class Solution {
    public int removeDuplicates(int[] nums) {
        int insertIndex = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[insertIndex] = nums[i];
                insertIndex++;
            }
        }
        return insertIndex;
    }
}`
        }
      ]
    }
  },
  "6_move_zeros_to_end": {
    problemName: "Move Zeros to End",
    category: "arrays",
    description: "Shift all 0s in the array to the end in-place while preserving relative order.",
    visualizerType: "array1d",
    defaultInput: {
      array: [0, 1, 0, 3, 12]
    },
    generateSteps: (input) => generateMoveZerosSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def moveZeroes(nums):
    write = 0
    for scan in range(len(nums)):
        if nums[scan] != 0:
            nums[write], nums[scan] = nums[scan], nums[write]
            write += 1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0;
        for (int scan = 0; scan < nums.length; scan++) {
            if (nums[scan] != 0) {
                int temp = nums[write];
                nums[write] = nums[scan];
                nums[scan] = temp;
                write++;
            }
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function moveZeroes(nums) {
  let write = 0;
  for (let scan = 0; scan < nums.length; scan++) {
    if (nums[scan] !== 0) {
      let temp = nums[write];
      nums[write] = nums[scan];
      nums[scan] = temp;
      write++;
    }
  }
}`
        }
      ]
    }
  },
  "7_linear_search": {
    problemName: "Linear Search",
    category: "arrays",
    description: "Scan elements sequentially from index 0 to locate the index of target value.",
    visualizerType: "array1d",
    defaultInput: {
      array: [10, 20, 30, 40, 50],
      target: 30
    },
    generateSteps: (input) => generateLinearSearchSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def search(arr, target):
    for i, x in enumerate(arr):
        if x == target:
            return i
    return -1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`
        }
      ]
    }
  },
  "1_sort_an_array_of_0’s_1’s_and_2’s": {
    problemName: "Sort Colors (0, 1, 2)",
    category: "arrays",
    description: "Sort an array containing elements 0, 1, and 2 in linear time O(N) and constant space O(1).",
    visualizerType: "array1d",
    defaultInput: {
      array: [2, 0, 2, 1, 1, 0, 2, 1, 0],
    },
    generateSteps: (input) => generateSortColorsSteps(input.array),
    solutions: {
      javascript: [
        {
          label: "Optimal",
          code: `function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}`,
        },
      ],
      python: [
        {
          label: "Efficient (Three-pointer)",
          code: `def sortColors(nums):
    # Dutch National Flag Algorithm
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else: # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1`,
        },
        {
          label: "Easier (Two-Pass Counting)",
          code: `def sortColors(nums):
    # Count frequencies first, then overwrite
    counts = [0, 0, 0]
    for num in nums:
        counts[num] += 1
        
    idx = 0
    for color in range(3):
        for _ in range(counts[color]):
            nums[idx] = color
            idx += 1`,
        },
        {
          label: "Shorter (Bubbling)",
          code: `def sortColors(nums):
    # Short bubble swaps of 0s to left, 2s to right
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] > nums[j]:
                nums[i], nums[j] = nums[j], nums[i]`,
        },
      ],
      java: [
        {
          label: "Optimal (One-Pass)",
          code: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++; mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[high];
                nums[high] = nums[mid];
                nums[mid] = temp;
                high--;
            }
        }
    }
}`,
        },
        {
          label: "Simple (Counting Sort)",
          code: `class Solution {
    public void sortColors(int[] nums) {
        int c0 = 0, c1 = 0, c2 = 0;
        for (int x : nums) {
            if (x == 0) c0++;
            else if (x == 1) c1++;
            else c2++;
        }
        int i = 0;
        while (c0-- > 0) nums[i++] = 0;
        while (c1-- > 0) nums[i++] = 1;
        while (c2-- > 0) nums[i++] = 2;
    }
}`,
        },
      ],
    },
  },
  "3_kadane’s_algorithm,_maximum_subarray_sum": {
    problemName: "Kadane's Algorithm",
    category: "arrays",
    description: "Find the contiguous subarray within a one-dimensional numerical array that has the largest sum.",
    visualizerType: "array1d",
    defaultInput: {
      array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    },
    generateSteps: (input) => generateKadaneSteps(input.array),
    solutions: {
      javascript: [
        {
          label: "Optimal",
          code: `function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  return maxSoFar;
}`,
        },
      ],
      python: [
        {
          label: "Efficient (Kadane's)",
          code: `def maxSubArray(nums):
    # Track current sum and max sum found
    max_so_far = nums[0]
    current_max = nums[0]
    for i in range(1, len(nums)):
        current_max = max(nums[i], current_max + nums[i])
        max_so_far = max(max_so_far, current_max)
    return max_so_far`,
        },
        {
          label: "Easier (Reset to Zero)",
          code: `def maxSubArray(nums):
    # Easy intuition: reset local sum to 0 if negative
    max_sum = float('-inf')
    current_sum = 0
    for num in nums:
        current_sum += num
        if current_sum > max_sum:
            max_sum = current_sum
        if current_sum < 0:
            current_sum = 0
    return max_sum`,
        },
        {
          label: "Shorter (Dynamic Programming)",
          code: `def maxSubArray(nums):
    # Super compact dynamic programming array mutation
    for i in range(1, len(nums)):
        if nums[i-1] > 0:
            nums[i] += nums[i-1]
    return max(nums)`,
        },
      ],
      java: [
        {
          label: "Optimal (DP)",
          code: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }
}`,
        },
        {
          label: "Simple (Iterative)",
          code: `class Solution {
    public int maxSubArray(int[] nums) {
        int max = Integer.MIN_VALUE;
        int sum = 0;
        for (int num : nums) {
            sum += num;
            if (sum > max) {
                max = sum;
            }
            if (sum < 0) {
                sum = 0;
            }
        }
        return max;
    }
}`,
        },
      ],
    },
  },
  "12_print_the_matrix_in_spiral_manner": {
    problemName: "Spiral Matrix",
    category: "arrays",
    description: "Print/Return elements of a 2D matrix in spiral order (clockwise starting from top-left).",
    visualizerType: "matrix2d",
    defaultInput: {
      grid: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
    },
    generateSteps: (input) => generateSpiralMatrixSteps(input.grid),
    solutions: {
      javascript: [
        {
          label: "Optimal",
          code: `function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0) return result;
  
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;
    
    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }
  return result;
}`,
        },
      ],
      python: [
        {
          label: "Efficient (Boundary Trace)",
          code: `def spiralOrder(matrix):
    if not matrix: return []
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        for i in range(left, right + 1):
            res.append(matrix[top][i])
        top += 1
        for i in range(top, bottom + 1):
            res.append(matrix[i][right])
        right -= 1
        
        if top <= bottom:
            for i in range(right, left - 1, -1):
                res.append(matrix[bottom][i])
            bottom -= 1
        if left <= right:
            for i in range(bottom, top - 1, -1):
                res.append(matrix[i][left])
            left += 1
    return res`,
        },
        {
          label: "Easier (Simulated Directions)",
          code: `def spiralOrder(matrix):
    if not matrix: return []
    rows, cols = len(matrix), len(matrix[0])
    seen = [[False] * cols for _ in matrix]
    res = []
    
    dr = [0, 1, 0, -1] # Direction row offsets
    dc = [1, 0, -1, 0] # Direction col offsets
    r, c, di = 0, 0, 0
    
    for _ in range(rows * cols):
        res.append(matrix[r][c])
        seen[r][c] = True
        nr, nc = r + dr[di], c + dc[di]
        
        if 0 <= nr < rows and 0 <= nc < cols and not seen[nr][nc]:
            r, c = nr, nc
        else:
            di = (di + 1) % 4
            r, c = r + dr[di], c + dc[di]
    return res`,
        },
        {
          label: "Shorter (Rotate & Pop)",
          code: `def spiralOrder(matrix):
    # Trick: pop top row and zip/transpose matrix counter-clockwise
    res = []
    mat = [list(r) for r in matrix]
    while mat:
        res.extend(mat.pop(0))
        mat = list(zip(*mat))[::-1] # rotate rest
    return res`,
        },
      ],
      java: [
        {
          label: "Optimal (Boundaries)",
          code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if (matrix.length == 0) return res;
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) res.add(matrix[top][i]);
            top++;
            for (int i = top; i <= bottom; i++) res.add(matrix[i][right]);
            right--;
            
            if (top <= bottom) {
                for (int i = right; i >= left; i--) res.add(matrix[bottom][i]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.add(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
}`,
        },
        {
          label: "Simple (Simulated)",
          code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if (matrix == null || matrix.length == 0) return res;
        int R = matrix.length, C = matrix[0].length;
        boolean[][] seen = new boolean[R][C];
        int[] dr = {0, 1, 0, -1};
        int[] dc = {1, 0, -1, 0};
        int r = 0, c = 0, di = 0;
        
        for (int i = 0; i < R * C; i++) {
            res.add(matrix[r][c]);
            seen[r][c] = true;
            int cr = r + dr[di];
            int cc = c + dc[di];
            
            if (0 <= cr && cr < R && 0 <= cc && cc < C && !seen[cr][cc]) {
                r = cr;
                c = cc;
            } else {
                di = (di + 1) % 4;
                r += dr[di];
                c += dc[di];
            }
        }
        return res;
    }
}`,
        },
      ],
    },
  },
  "4_left_rotate_an_array_by_one_place": {
    problemName: "Left Rotate Array by One",
    category: "arrays",
    description: "Rotate the array elements to the left by one position.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 3, 4, 5] },
    generateSteps: (input) => generateLeftRotateByOneSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (In-place)",
          code: `def rotateLeft(arr):
    temp = arr[0]
    for i in range(1, len(arr)):
        arr[i-1] = arr[i]
    arr[-1] = temp`
        },
        {
          label: "Shorter (Slicing)",
          code: `def rotateLeft(arr):
    arr[:] = arr[1:] + arr[:1]`
        },
        {
          label: "Easier (Pop & Append)",
          code: `def rotateLeft(arr):
    arr.append(arr.pop(0))`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public void rotate(int[] arr) {
        int temp = arr[0];
        for (int i = 1; i < arr.length; i++) {
            arr[i - 1] = arr[i];
        }
        arr[arr.length - 1] = temp;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function rotate(arr) {
  const temp = arr[0];
  for (let i = 1; i < arr.length; i++) {
    arr[i - 1] = arr[i];
  }
  arr[arr.length - 1] = temp;
}`
        }
      ]
    }
  },
  "5_left_rotate_an_array_by_d_places": {
    problemName: "Left Rotate Array by D Places",
    category: "arrays",
    description: "Rotate the array left by D positions using block reversal.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 3, 4, 5, 6, 7], target: 3 },
    generateSteps: (input) => generateLeftRotateByDSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient (Reversal)",
          code: `def rotateLeftD(arr, d):
    n = len(arr)
    d = d % n
    def rev(l, r):
        while l < r:
            arr[l], arr[r] = arr[r], arr[l]
            l, r = l + 1, r - 1
    rev(0, d - 1)
    rev(d, n - 1)
    rev(0, n - 1)`
        },
        {
          label: "Shorter (Slice)",
          code: `def rotateLeftD(arr, d):
    n = len(arr)
    d = d % n
    arr[:] = arr[d:] + arr[:d]`
        },
        {
          label: "Easier (Auxiliary Array)",
          code: `def rotateLeftD(arr, d):
    n = len(arr)
    d = d % n
    temp = arr[:d]
    for i in range(d, n):
        arr[i - d] = arr[i]
    for i in range(d):
        arr[n - d + i] = temp[i]`
        }
      ],
      java: [
        {
          label: "Optimal (Reversal)",
          code: `class Solution {
    public void rotate(int[] arr, int d) {
        int n = arr.length;
        d = d % n;
        reverse(arr, 0, d - 1);
        reverse(arr, d, n - 1);
        reverse(arr, 0, n - 1);
    }
    private void reverse(int[] arr, int l, int r) {
        while (l < r) {
            int temp = arr[l];
            arr[l] = arr[r];
            arr[r] = temp;
            l++; r--;
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function rotate(arr, d) {
  const n = arr.length;
  d = d % n;
  const reverse = (l, r) => {
    while (l < r) {
      [arr[l], arr[r]] = [arr[r], arr[l]];
      l++; r--;
    }
  };
  reverse(0, d - 1);
  reverse(d, n - 1);
  reverse(0, n - 1);
}`
        }
      ]
    }
  },
  "8_find_the_union_and_intersection_of_two_sorted_arrays": {
    problemName: "Union of Two Sorted Arrays",
    category: "arrays",
    description: "Merge two sorted arrays and return their unique union elements.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 3, 4, 5], target: 5 },
    generateSteps: (input) => generateUnionIntersectionSteps(input.array, [2, 3, 5, 7]),
    solutions: {
      python: [
        {
          label: "Efficient (Two Pointer)",
          code: `def findUnion(a1, a2):
    i, j = 0, 0
    res = []
    while i < len(a1) and j < len(a2):
        if a1[i] <= a2[j]:
            if not res or res[-1] != a1[i]:
                res.append(a1[i])
            i += 1
        else:
            if not res or res[-1] != a2[j]:
                res.append(a2[j])
            j += 1
    while i < len(a1):
        if not res or res[-1] != a1[i]:
            res.append(a1[i])
        i += 1
    while j < len(a2):
        if not res or res[-1] != a2[j]:
            res.append(a2[j])
        j += 1
    return res`
        },
        {
          label: "Shorter (Set Union)",
          code: `def findUnion(a1, a2):
    return sorted(list(set(a1) | set(a2)))`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
class Solution {
    public static ArrayList<Integer> findUnion(int[] a1, int[] a2) {
        int i = 0, j = 0;
        ArrayList<Integer> res = new ArrayList<>();
        while (i < a1.length && j < a2.length) {
            if (a1[i] <= a2[j]) {
                if (res.size() == 0 || res.get(res.size() - 1) != a1[i]) res.add(a1[i]);
                i++;
            } else {
                if (res.size() == 0 || res.get(res.size() - 1) != a2[j]) res.add(a2[j]);
                j++;
            }
        }
        while (i < a1.length) {
            if (res.size() == 0 || res.get(res.size() - 1) != a1[i]) res.add(a1[i]);
            i++;
        }
        while (j < a2.length) {
            if (res.size() == 0 || res.get(res.size() - 1) != a2[j]) res.add(a2[j]);
            j++;
        }
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findUnion(a1, a2) {
  let i = 0, j = 0;
  const res = [];
  while (i < a1.length && j < a2.length) {
    if (a1[i] <= a2[j]) {
      if (res.length === 0 || res[res.length - 1] !== a1[i]) res.push(a1[i]);
      i++;
    } else {
      if (res.length === 0 || res[res.length - 1] !== a2[j]) res.push(a2[j]);
      j++;
    }
  }
  while (i < a1.length) {
    if (res.length === 0 || res[res.length - 1] !== a1[i]) res.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    if (res.length === 0 || res[res.length - 1] !== a2[j]) res.push(a2[j]);
    j++;
  }
  return res;
}`
        }
      ]
    }
  },
  "9_find_missing_number_in_an_array": {
    problemName: "Find Missing Number",
    category: "arrays",
    description: "Given an array of size N-1 containing numbers from 0 to N, find the missing number.",
    visualizerType: "array1d",
    defaultInput: { array: [3, 0, 1] },
    generateSteps: (input) => generateMissingNumberSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Sum)",
          code: `def missingNumber(nums):
    n = len(nums)
    expected_sum = (n * (n + 1)) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum`
        },
        {
          label: "Shorter (XOR)",
          code: `def missingNumber(nums):
    res = len(nums)
    for i, x in enumerate(nums):
        res ^= i ^ x
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = (n * (n + 1)) / 2;
        int actual = 0;
        for (int x : nums) actual += x;
        return expected - actual;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((acc, curr) => acc + curr, 0);
  return expected - actual;
}`
        }
      ]
    }
  },
  "10_maximum_consecutive_ones": {
    problemName: "Max Consecutive Ones",
    category: "arrays",
    description: "Find the maximum number of consecutive 1s in a binary array.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 1, 0, 1, 1, 1] },
    generateSteps: (input) => generateMaxConsecutiveOnesSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Single Pass)",
          code: `def findMaxConsecutiveOnes(nums):
    max_count = 0
    current_count = 0
    for x in nums:
        if x == 1:
            current_count += 1
            max_count = max(max_count, current_count)
        else:
            current_count = 0
    return max_count`
        },
        {
          label: "Shorter (Join & Split)",
          code: `def findMaxConsecutiveOnes(nums):
    return max(len(s) for s in ''.join(map(str, nums)).split('0'))`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int maxCount = 0;
        int currentCount = 0;
        for (int x : nums) {
            if (x == 1) {
                currentCount++;
                maxCount = Math.max(maxCount, currentCount);
            } else {
                currentCount = 0;
            }
        }
        return maxCount;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findMaxConsecutiveOnes(nums) {
  let maxCount = 0;
  let currentCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount);
    } else {
      currentCount = 0;
    }
  }
  return maxCount;
}`
        }
      ]
    }
  },
  "11_subarray_with_given_sum": {
    problemName: "Subarray with Given Sum",
    category: "arrays",
    description: "Find the continuous subarray that sums up to a given target sum.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 3, 7, 5], target: 12 },
    generateSteps: (input) => generateSubarrayWithGivenSumSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient (Sliding Window)",
          code: `def subarraySum(arr, target):
    start = 0
    current_sum = 0
    for end in range(len(arr)):
        current_sum += arr[end]
        while current_sum > target and start <= end:
            current_sum -= arr[start]
            start += 1
        if current_sum == target:
            return [start + 1, end + 1]
    return [-1]`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
class Solution {
    public ArrayList<Integer> subarraySum(int[] arr, int target) {
        int start = 0;
        int currentSum = 0;
        ArrayList<Integer> res = new ArrayList<>();
        for (int end = 0; end < arr.length; end++) {
            currentSum += arr[end];
            while (currentSum > target && start <= end) {
                currentSum -= arr[start];
                start++;
            }
            if (currentSum == target) {
                res.add(start + 1);
                res.add(end + 1);
                return res;
            }
        }
        res.add(-1);
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function subarraySum(arr, target) {
  let start = 0;
  let currentSum = 0;
  for (let end = 0; end < arr.length; end++) {
    currentSum += arr[end];
    while (currentSum > target && start <= end) {
      currentSum -= arr[start];
      start++;
    }
    if (currentSum === target) {
      return [start + 1, end + 1];
    }
  }
  return [-1];
}`
        }
      ]
    }
  },
  "12_find_the_missing_number": {
    problemName: "Find the Missing Number",
    category: "arrays",
    description: "Given an array of size N-1 containing numbers from 1 to N, find the missing number.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 4, 6, 3, 7, 8] },
    generateSteps: (input) => generateMissingNumberSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Sum)",
          code: `def missingNumber(nums):
    n = len(nums) + 1
    expected_sum = (n * (n + 1)) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length + 1;
        int expected = (n * (n + 1)) / 2;
        int actual = 0;
        for (int x : nums) actual += x;
        return expected - actual;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function missingNumber(nums) {
  const n = nums.length + 1;
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((acc, curr) => acc + curr, 0);
  return expected - actual;
}`
        }
      ]
    }
  },
  "13_find_the_number_that_appears_once,_and_other_numbers_twice.": {
    problemName: "Single Number",
    category: "arrays",
    description: "Find the element that appears only once in an array where every other element appears twice.",
    visualizerType: "array1d",
    defaultInput: { array: [4, 1, 2, 1, 2] },
    generateSteps: (input) => generateSingleNumberSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (XOR)",
          code: `def singleNumber(nums):
    res = 0
    for x in nums:
        res ^= x
    return res`
        },
        {
          label: "Shorter (Math)",
          code: `def singleNumber(nums):
    return 2 * sum(set(nums)) - sum(nums)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int x : nums) res ^= x;
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function singleNumber(nums) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    res ^= nums[i];
  }
  return res;
}`
        }
      ]
    }
  },
  "14_search_an_element_in_a_2d_matrix": {
    problemName: "Search in a 2D Matrix",
    category: "arrays",
    description: "Search for a target value in a 2D matrix sorted row-wise and column-wise.",
    visualizerType: "matrix2d",
    defaultInput: {
      grid: [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60]
      ],
      target: 3
    },
    generateSteps: (input) => generateSearch2DMatrixSteps(input.grid, input.target),
    solutions: {
      python: [
        {
          label: "Efficient (Binary Search)",
          code: `def searchMatrix(matrix, target):
    if not matrix: return False
    R, C = len(matrix), len(matrix[0])
    low, high = 0, R * C - 1
    while low <= high:
        mid = (low + high) // 2
        mid_val = matrix[mid // C][mid % C]
        if mid_val == target:
            return True
        elif mid_val < target:
            low = mid + 1
        else:
            high = mid - 1
    return False`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0) return false;
        int R = matrix.length;
        int C = matrix[0].length;
        int low = 0, high = R * C - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int midVal = matrix[mid / C][mid % C];
            if (midVal == target) return true;
            else if (midVal < target) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function searchMatrix(matrix, target) {
  if (matrix.length === 0) return false;
  const R = matrix.length;
  const C = matrix[0].length;
  let low = 0, high = R * C - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = matrix[Math.floor(mid / C)][mid % C];
    if (midVal === target) return true;
    else if (midVal < target) low = mid + 1;
    else high = mid - 1;
  }
  return false;
}`
        }
      ]
    }
  },
  "15_find_the_row_with_maximum_number_of_1’s": {
    problemName: "Row with Max 1s",
    category: "arrays",
    description: "Locate the row index containing the maximum number of 1s in a row-sorted boolean matrix.",
    visualizerType: "matrix2d",
    defaultInput: {
      grid: [
        [0, 1, 1, 1],
        [0, 0, 1, 1],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ]
    },
    generateSteps: (input) => generateRowWithMax1sSteps(input.grid),
    solutions: {
      python: [
        {
          label: "Efficient (Top-Right Pointer)",
          code: `def rowWithMax1s(matrix):
    R, C = len(matrix), len(matrix[0])
    max_row = -1
    c = C - 1
    for r in range(R):
        while c >= 0 and matrix[r][c] == 1:
            max_row = r
            c -= 1
    return max_row`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int rowWithMax1s(int[][] matrix) {
        int R = matrix.length;
        int C = matrix[0].length;
        int maxRow = -1;
        int c = C - 1;
        for (int r = 0; r < R; r++) {
            while (c >= 0 && matrix[r][c] == 1) {
                maxRow = r;
                c--;
            }
        }
        return maxRow;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function rowWithMax1s(matrix) {
  const R = matrix.length;
  const C = matrix[0].length;
  let maxRow = -1;
  let c = C - 1;
  for (let r = 0; r < R; r++) {
    while (c >= 0 && matrix[r][c] === 1) {
      maxRow = r;
      c--;
    }
  }
  return maxRow;
}`
        }
      ]
    }
  },
  "2_majority_element_(>n/2_times)": {
    problemName: "Majority Element",
    category: "arrays",
    description: "Find the element that appears more than floor(N/2) times in the array.",
    visualizerType: "array1d",
    defaultInput: { array: [2, 2, 1, 1, 1, 2, 2] },
    generateSteps: (input) => generateMajorityElementSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Boyer-Moore)",
          code: `def majorityElement(nums):
    candidate = None
    count = 0
    for x in nums:
        if count == 0:
            candidate = x
            count = 1
        elif x == candidate:
            count += 1
        else:
            count -= 1
    return candidate`
        },
        {
          label: "Shorter (Sorting)",
          code: `def majorityElement(nums):
    return sorted(nums)[len(nums)//2]`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int majorityElement(int[] nums) {
        int candidate = nums[0];
        int count = 1;
        for (int i = 1; i < nums.length; i++) {
            if (count == 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function majorityElement(nums) {
  let candidate = nums[0];
  let count = 1;
  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }
  }
  return candidate;
}`
        }
      ]
    }
  },
  "4_print_subarray_with_maximum_subarray_sum_(extended_version_of_above_problem)": {
    problemName: "Print Max Subarray",
    category: "arrays",
    description: "Find and return the actual maximum sum subarray path.",
    visualizerType: "array1d",
    defaultInput: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
    generateSteps: (input) => generatePrintMaxSubarraySteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Kadane's Indices)",
          code: `def maxSubArrayPrint(nums):
    max_so_far = float('-inf')
    current_max = 0
    start = 0
    sub_start = sub_end = 0
    for i, x in enumerate(nums):
        current_max += x
        if current_max > max_so_far:
            max_so_far = current_max
            sub_start = start
            sub_end = i
        if current_max < 0:
            current_max = 0
            start = i + 1
    return nums[sub_start:sub_end + 1]`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int[] maxSubArrayPrint(int[] nums) {
        int max = Integer.MIN_VALUE, sum = 0;
        int start = 0, subStart = 0, subEnd = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            if (sum > max) {
                max = sum;
                subStart = start;
                subEnd = i;
            }
            if (sum < 0) {
                sum = 0;
                start = i + 1;
            }
        }
        int[] res = new int[subEnd - subStart + 1];
        System.arraycopy(nums, subStart, res, 0, res.length);
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function maxSubArrayPrint(nums) {
  let max = -Infinity, sum = 0;
  let start = 0, subStart = 0, subEnd = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum > max) {
      max = sum;
      subStart = start;
      subEnd = i;
    }
    if (sum < 0) {
      sum = 0;
      start = i + 1;
    }
  }
  return nums.slice(subStart, subEnd + 1);
}`
        }
      ]
    }
  },
  "5_stock_buy_and_sell": {
    problemName: "Stock Buy and Sell",
    category: "arrays",
    description: "Determine the maximum single-transaction profit from buying and selling stock.",
    visualizerType: "array1d",
    defaultInput: { array: [7, 1, 5, 3, 6, 4] },
    generateSteps: (input) => generateStockBuySellSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Single Pass)",
          code: `def maxProfit(prices):
    min_price = prices[0]
    max_profit = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_profit:
            max_profit = p - min_price
    return max_profit`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = prices[0];
        int maxProfit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } else if (prices[i] - minPrice > maxProfit) {
                maxProfit = prices[i] - minPrice;
            }
        }
        return maxProfit;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else {
      maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    }
  }
  return maxProfit;
}`
        }
      ]
    }
  },
  "6_rearrange_the_array_in_alternating_positive_and_negative_items": {
    problemName: "Rearrange Signs",
    category: "arrays",
    description: "Rearrange positive and negative numbers alternately in O(N) time.",
    visualizerType: "array1d",
    defaultInput: { array: [3, 1, -2, -5, 2, -4] },
    generateSteps: (input) => generateRearrangeAlternatingSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Two Pointer Write)",
          code: `def rearrangeArray(nums):
    n = len(nums)
    res = [0] * n
    pos, neg = 0, 1
    for x in nums:
        if x > 0:
            res[pos] = x
            pos += 2
        else:
            res[neg] = x
            neg += 2
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int[] rearrangeArray(int[] nums) {
        int[] res = new int[nums.length];
        int pos = 0, neg = 1;
        for (int x : nums) {
            if (x > 0) {
                res[pos] = x;
                pos += 2;
            } else {
                res[neg] = x;
                neg += 2;
            }
        }
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function rearrangeArray(nums) {
  const res = new Array(nums.length).fill(0);
  let pos = 0, neg = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      res[pos] = nums[i];
      pos += 2;
    } else {
      res[neg] = nums[i];
      neg += 2;
    }
  }
  return res;
}`
        }
      ]
    }
  },
  "7_next_permutation": {
    problemName: "Next Permutation",
    category: "arrays",
    description: "Rearrange array into lexicographically next greater permutation of numbers.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 3] },
    generateSteps: (input) => generateNextPermutationSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Pivot-Swap-Reverse)",
          code: `def nextPermutation(nums):
    n = len(nums)
    pivot = -1
    for i in range(n - 2, -1, -1):
        if nums[i] < nums[i + 1]:
            pivot = i
            break
    if pivot == -1:
        nums.reverse()
        return
    for i in range(n - 1, pivot, -1):
        if nums[i] > nums[pivot]:
            nums[i], nums[pivot] = nums[pivot], nums[i]
            break
    nums[pivot+1:] = reversed(nums[pivot+1:])`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public void nextPermutation(int[] nums) {
        int n = nums.length, pivot = -1;
        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) {
                pivot = i; break;
            }
        }
        if (pivot == -1) {
            reverse(nums, 0, n - 1); return;
        }
        for (int i = n - 1; i > pivot; i--) {
            if (nums[i] > nums[pivot]) {
                int temp = nums[i];
                nums[i] = nums[pivot];
                nums[pivot] = temp;
                break;
            }
        }
        reverse(nums, pivot + 1, n - 1);
    }
    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            int temp = nums[l]; nums[l] = nums[r]; nums[r] = temp;
            l++; r--;
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function nextPermutation(nums) {
  const n = nums.length;
  let pivot = -1;
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      pivot = i; break;
    }
  }
  if (pivot === -1) {
    nums.reverse(); return;
  }
  for (let i = n - 1; i > pivot; i--) {
    if (nums[i] > nums[pivot]) {
      [nums[i], nums[pivot]] = [nums[pivot], nums[i]];
      break;
    }
  }
  let l = pivot + 1, r = n - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++; r--;
  }
}`
        }
      ]
    }
  },
  "8_leaders_in_an_array_problem": {
    problemName: "Leaders in Array",
    category: "arrays",
    description: "Find all elements in array that are greater than or equal to all elements to their right.",
    visualizerType: "array1d",
    defaultInput: { array: [16, 17, 4, 3, 5, 2] },
    generateSteps: (input) => generateLeadersSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Right-to-Left)",
          code: `def leaders(arr):
    n = len(arr)
    leaders_list = []
    current_max = arr[-1]
    leaders_list.append(current_max)
    for i in range(n - 2, -1, -1):
        if arr[i] >= current_max:
            current_max = arr[i]
            leaders_list.append(current_max)
    return leaders_list[::-1]`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.Collections;
class Solution {
    static ArrayList<Integer> leaders(int arr[]) {
        ArrayList<Integer> res = new ArrayList<>();
        int max = arr[arr.length - 1];
        res.add(max);
        for (int i = arr.length - 2; i >= 0; i--) {
            if (arr[i] >= max) {
                max = arr[i];
                res.add(max);
            }
        }
        Collections.reverse(res);
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function leaders(arr) {
  const res = [];
  let max = arr[arr.length - 1];
  res.push(max);
  for (let i = arr.length - 2; i >= 0; i--) {
    if (arr[i] >= max) {
      max = arr[i];
      res.push(max);
    }
  }
  return res.reverse();
}`
        }
      ]
    }
  },
  "9_longest_consecutive_sequence_in_an_array": {
    problemName: "Longest Consecutive",
    category: "arrays",
    description: "Given unsorted array, return the length of the longest consecutive elements sequence.",
    visualizerType: "array1d",
    defaultInput: { array: [100, 4, 200, 1, 3, 2] },
    generateSteps: (input) => generateLongestConsecutiveSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Hash Set)",
          code: `def longestConsecutive(nums):
    num_set = set(nums)
    max_len = 0
    for x in nums:
        if x - 1 not in num_set:
            curr = x
            curr_len = 1
            while curr + 1 in num_set:
                curr += 1
                curr_len += 1
            max_len = max(max_len, curr_len)
    return max_len`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.HashSet;
class Solution {
    public int longestConsecutive(int[] nums) {
        HashSet<Integer> set = new HashSet<>();
        for (int x : nums) set.add(x);
        int maxLen = 0;
        for (int x : nums) {
            if (!set.contains(x - 1)) {
                int curr = x;
                int len = 1;
                while (set.contains(curr + 1)) {
                    curr++; len++;
                }
                maxLen = Math.max(maxLen, len);
            }
        }
        return maxLen;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLen = 0;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (!set.has(x - 1)) {
      let curr = x;
      let len = 1;
      while (set.has(curr + 1)) {
        curr++; len++;
      }
      maxLen = Math.max(maxLen, len);
    }
  }
  return maxLen;
}`
        }
      ]
    }
  },
  "10_set_matrix_zeros": {
    problemName: "Set Matrix Zeros",
    category: "arrays",
    description: "If an element in an MxN matrix is 0, set its entire row and column to 0 in-place.",
    visualizerType: "matrix2d",
    defaultInput: {
      grid: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
    },
    generateSteps: (input) => generateSetMatrixZerosSteps(input.grid),
    solutions: {
      python: [
        {
          label: "Efficient (Zero Flags)",
          code: `def setZeroes(matrix):
    R, C = len(matrix), len(matrix[0])
    row_flags = [False] * R
    col_flags = [False] * C
    for r in range(R):
        for c in range(C):
            if matrix[r][c] == 0:
                row_flags[r] = True
                col_flags[c] = True
    for r in range(R):
        for c in range(C):
            if row_flags[r] or col_flags[c]:
                matrix[r][c] = 0`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public void setZeroes(int[][] matrix) {
        int R = matrix.length;
        int C = matrix[0].length;
        boolean[] rowFlags = new boolean[R];
        boolean[] colFlags = new boolean[C];
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (matrix[r][c] == 0) {
                    rowFlags[r] = true;
                    colFlags[c] = true;
                }
            }
        }
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (rowFlags[r] || colFlags[c]) {
                    matrix[r][c] = 0;
                }
            }
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function setZeroes(matrix) {
  const R = matrix.length;
  const C = matrix[0].length;
  const rowFlags = new Array(R).fill(false);
  const colFlags = new Array(C).fill(false);
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (matrix[r][c] === 0) {
        rowFlags[r] = true;
        colFlags[c] = true;
      }
    }
  }
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (rowFlags[r] || colFlags[c]) {
        matrix[r][c] = 0;
      }
    }
  }
}`
        }
      ]
    }
  },
  "11_rotate_matrix_by_90_degrees": {
    problemName: "Rotate Matrix 90°",
    category: "arrays",
    description: "Rotate the 2D image matrix clockwise by 90 degrees in-place.",
    visualizerType: "matrix2d",
    defaultInput: {
      grid: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
    },
    generateSteps: (input) => generateRotateMatrixSteps(input.grid),
    solutions: {
      python: [
        {
          label: "Efficient (Transpose & Reverse)",
          code: `def rotate(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for r in matrix:
        r.reverse()`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        for (int i = 0; i < n; i++) {
            int l = 0, r = n - 1;
            while (l < r) {
                int temp = matrix[i][l];
                matrix[i][l] = matrix[i][r];
                matrix[i][r] = temp;
                l++; r--;
            }
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}`
        }
      ]
    }
  },
  "0_pascal’s_triangle": {
    problemName: "Pascal's Triangle",
    category: "arrays",
    description: "Generate rows of Pascal's triangle matching rows depth target.",
    visualizerType: "matrix2d",
    defaultInput: { grid: [[0]], target: 5 },
    generateSteps: (input) => generatePascalsTriangleSteps(input.target),
    solutions: {
      python: [
        {
          label: "Efficient (Row Construction)",
          code: `def generate(numRows):
    triangle = []
    for r in range(numRows):
        row = [1] * (r + 1)
        for c in range(1, r):
            row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c]
        triangle.append(row)
    return triangle`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>();
        for (int r = 0; r < numRows; r++) {
            List<Integer> row = new ArrayList<>();
            for (int c = 0; c <= r; c++) {
                if (c == 0 || c == r) {
                    row.add(1);
                } else {
                    row.add(triangle.get(r - 1).get(c - 1) + triangle.get(r - 1).get(c));
                }
            }
            triangle.add(row);
        }
        return triangle;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function generate(numRows) {
  const triangle = [];
  for (let r = 0; r < numRows; r++) {
    const row = new Array(r + 1).fill(1);
    for (let c = 1; c < r; c++) {
      row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c];
    }
    triangle.push(row);
  }
  return triangle;
}`
        }
      ]
    }
  },
  "1_majority_element_(n/3_times)": {
    problemName: "Majority Element II (n/3)",
    category: "arrays",
    description: "Find all elements that appear more than floor(N/3) times using voting algorithm.",
    visualizerType: "array1d",
    defaultInput: { array: [3, 2, 3] },
    generateSteps: (input) => generateMajorityElementN3Steps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Boyer-Moore n/3)",
          code: `def majorityElement(nums):
    c1, c2, cnt1, cnt2 = None, None, 0, 0
    for x in nums:
        if c1 == x: cnt1 += 1
        elif c2 == x: cnt2 += 1
        elif cnt1 == 0: c1, cnt1 = x, 1
        elif cnt2 == 0: c2, cnt2 = x, 1
        else: cnt1, cnt2 = cnt1 - 1, cnt2 - 1
    res = []
    if nums.count(c1) > len(nums) // 3: res.append(c1)
    if nums.count(c2) > len(nums) // 3: res.append(c2)
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int c1 = 0, c2 = 0, cnt1 = 0, cnt2 = 0;
        for (int x : nums) {
            if (c1 == x) cnt1++;
            else if (c2 == x) cnt2++;
            else if (cnt1 == 0) { c1 = x; cnt1 = 1; }
            else if (cnt2 == 0) { c2 = x; cnt2 = 1; }
            else { cnt1--; cnt2--; }
        }
        int v1 = 0, v2 = 0;
        for (int x : nums) {
            if (x == c1) v1++;
            else if (x == c2) v2++;
        }
        List<Integer> res = new ArrayList<>();
        if (v1 > nums.length / 3) res.add(c1);
        if (v2 > nums.length / 3) res.add(c2);
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function majorityElement(nums) {
  let c1 = null, c2 = null, cnt1 = 0, cnt2 = 0;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (c1 === x) cnt1++;
    else if (c2 === x) cnt2++;
    else if (cnt1 === 0) { c1 = x; cnt1 = 1; }
    else if (cnt2 === 0) { c2 = x; cnt2 = 1; }
    else { cnt1--; cnt2--; }
  }
  let v1 = 0, v2 = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === c1) v1++;
    else if (nums[i] === c2) v2++;
  }
  const res = [];
  if (v1 > Math.floor(nums.length / 3)) res.push(c1);
  if (v2 > Math.floor(nums.length / 3)) res.push(c2);
  return res;
}`
        }
      ]
    }
  },
  "2_3-sum_problem": {
    problemName: "3-Sum Problem",
    category: "arrays",
    description: "Identify all unique triplets in array that sum up to zero.",
    visualizerType: "array1d",
    defaultInput: { array: [-1, 0, 1, 2, -1, -4] },
    generateSteps: (input) => generateThreeSumSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Three Pointers)",
          code: `def threeSum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]: continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                res.append([nums[i], nums[left], nums[right]])
                left, right = left + 1, right - 1
                while left < right and nums[left] == nums[left - 1]: left += 1
                while left < right && nums[right] == nums[right + 1]: right -= 1
            elif s < 0: left += 1
            else: right -= 1
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++; right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (sum < 0) left++;
                else right--;
            }
        }
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        left++; right--;
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return res;
}`
        }
      ]
    }
  },
  "3_4-sum_problem": {
    problemName: "4-Sum Problem",
    category: "arrays",
    description: "Identify all unique quadruplets in array that sum up to zero.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 0, -1, 0, -2, 2] },
    generateSteps: (input) => generateFourSumSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Nested Two Pointers)",
          code: `def fourSum(nums):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]: continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]: continue
            left, right = j + 1, n - 1
            while left < right:
                s = nums[i] + nums[j] + nums[left] + nums[right]
                if s == 0:
                    res.append([nums[i], nums[j], nums[left], nums[right]])
                    left, right = left + 1, right - 1
                    while left < right and nums[left] == nums[left - 1]: left += 1
                    while left < right and nums[right] == nums[right + 1]: right -= 1
                elif s < 0: left += 1
                else: right -= 1
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    public List<List<Integer>> fourSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int left = j + 1, right = n - 1;
                while (left < right) {
                    int sum = nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == 0) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                        left++; right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    } else if (sum < 0) left++;
                    else right--;
                }
            }
        }
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function fourSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  const n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let left = j + 1, right = n - 1;
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === 0) {
          res.push([nums[i], nums[j], nums[left], nums[right]]);
          left++; right--;
          while (left < right && nums[left] === nums[left - 1]) left++;
          while (left < right && nums[right] === nums[right + 1]) right--;
        } else if (sum < 0) left++;
        else right--;
      }
    }
  }
  return res;
}`
        }
      ]
    }
  },
  "4_largest_subarray_with_0_sum": {
    problemName: "Max Subarray 0 Sum",
    category: "arrays",
    description: "Determine the maximum length of continuous subarray whose elements sum to 0.",
    visualizerType: "array1d",
    defaultInput: { array: [15, -2, 2, -8, 1, 7, 10, 23] },
    generateSteps: (input) => generateLargestSubarray0SumSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Sum Map lookup)",
          code: `def maxLen(arr):
    sum_map = {}
    max_len = 0
    running_sum = 0
    for i, x in enumerate(arr):
        running_sum += x
        if running_sum == 0:
            max_len = i + 1
        elif running_sum in sum_map:
            max_len = max(max_len, i - sum_map[running_sum])
        else:
            sum_map[running_sum] = i
    return max_len`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.HashMap;
class Solution {
    int maxLen(int arr[], int n) {
        HashMap<Integer, Integer> map = new HashMap<>();
        int maxLen = 0, runningSum = 0;
        for (int i = 0; i < n; i++) {
            runningSum += arr[i];
            if (runningSum == 0) {
                maxLen = i + 1;
            } else if (map.containsKey(runningSum)) {
                maxLen = Math.max(maxLen, i - map.get(runningSum));
            } else {
                map.put(runningSum, i);
            }
        }
        return maxLen;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function maxLen(arr) {
  const map = new Map();
  let maxLen = 0, runningSum = 0;
  for (let i = 0; i < arr.length; i++) {
    runningSum += arr[i];
    if (runningSum === 0) {
      maxLen = i + 1;
    } else if (map.has(runningSum)) {
      maxLen = Math.max(maxLen, i - map.get(runningSum));
    } else {
      map.set(runningSum, i);
    }
  }
  return maxLen;
}`
        }
      ]
    }
  },
  "5_count_number_of_subarrays_with_given_xor_k": {
    problemName: "Subarrays with XOR K",
    category: "arrays",
    description: "Determine the total count of contiguous subarrays yielding XOR sum K.",
    visualizerType: "array1d",
    defaultInput: { array: [4, 2, 2, 6, 4], target: 6 },
    generateSteps: (input) => generateCountSubarraysXorKSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient (XOR Prefix Map)",
          code: `def subarraysWithXorK(arr, k):
    count = 0
    xr = 0
    xor_map = {0: 1}
    for x in arr:
        xr ^= x
        target = xr ^ k
        if target in xor_map:
            count += xor_map[target]
        xor_map[xr] = xor_map.get(xr, 0) + 1
    return count`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.HashMap;
class Solution {
    public int subarraysWithXorK(int[] arr, int k) {
        int count = 0, xr = 0;
        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        for (int x : arr) {
            xr ^= x;
            int target = xr ^ k;
            if (map.containsKey(target)) {
                count += map.get(target);
            }
            map.put(xr, map.getOrDefault(xr, 0) + 1);
        }
        return count;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function subarraysWithXorK(arr, k) {
  let count = 0, xr = 0;
  const map = new Map();
  map.set(0, 1);
  for (let i = 0; i < arr.length; i++) {
    xr ^= arr[i];
    const target = xr ^ k;
    if (map.has(target)) {
      count += map.get(target);
    }
    map.set(xr, (map.get(xr) || 0) + 1);
  }
  return count;
}`
        }
      ]
    }
  },
  "6_merge_overlapping_subintervals": {
    problemName: "Merge Intervals",
    category: "arrays",
    description: "Merge overlapping intervals and return combined distinct range intervals.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 3, 2, 6, 8, 10, 15, 18] },
    generateSteps: (input) => {
      const arr = input.array || [1,3,2,6,8,10,15,18];
      const intervals: number[][] = [];
      for (let i = 0; i < arr.length; i += 2) {
        if (arr[i+1] !== undefined) intervals.push([arr[i], arr[i+1]]);
      }
      return generateMergeOverlappingIntervalsSteps(intervals.length > 0 ? intervals : [[1,3],[2,6]]);
    },
    solutions: {
      python: [
        {
          label: "Efficient (Sort & Merge)",
          code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for current in intervals:
        if not merged or merged[-1][1] < current[0]:
            merged.append(current)
        else:
            merged[-1][1] = max(merged[-1][1], current[1])
    return merged`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (let i = 0; i < intervals.length; i++) {
    const current = intervals[i];
    if (merged.length === 0 || merged[merged.length - 1][1] < current[0]) {
      merged.push(current);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], current[1]);
    }
  }
  return merged;
}`
        }
      ]
    }
  },
  "7_merge_two_sorted_arrays_without_extra_space": {
    problemName: "Merge Sorted Arrays",
    category: "arrays",
    description: "Merge two sorted arrays in-place without using extra auxiliary memory.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 3, 5, 7], target: 4 },
    generateSteps: (input) => generateMergeSortedArraysSteps(input.array, [2, 4, 6, 8]),
    solutions: {
      python: [
        {
          label: "Efficient (Three Pointers swap)",
          code: `def merge(arr1, arr2):
    n, m = len(arr1), len(arr2)
    i = n - 1
    j = 0
    while i >= 0 and j < m:
        if arr1[i] > arr2[j]:
            arr1[i], arr2[j] = arr2[j], arr1[i]
            i, j = i - 1, j + 1
        else:
            break
    arr1.sort()
    arr2.sort()`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.Arrays;
class Solution {
    public void merge(int[] arr1, int[] arr2) {
        int n = arr1.length, m = arr2.length;
        int i = n - 1, j = 0;
        while (i >= 0 && j < m) {
            if (arr1[i] > arr2[j]) {
                int temp = arr1[i];
                arr1[i] = arr2[j];
                arr2[j] = temp;
                i--; j++;
            } else {
                break;
            }
        }
        Arrays.sort(arr1);
        Arrays.sort(arr2);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function merge(arr1, arr2) {
  let i = arr1.length - 1;
  let j = 0;
  while (i >= 0 && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      [arr1[i], arr2[j]] = [arr2[j], arr1[i]];
      i--; j++;
    } else {
      break;
    }
  }
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
}`
        }
      ]
    }
  },
  "8_find_the_repeating_and_missing_number": {
    problemName: "Repeating & Missing",
    category: "arrays",
    description: "Identify the repeating number and the missing number in array.",
    visualizerType: "array1d",
    defaultInput: { array: [3, 1, 2, 5, 3] },
    generateSteps: (input) => generateRepeatingMissingSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Math Difference)",
          code: `def findTwoElement(arr):
    n = len(arr)
    Sn = (n * (n + 1)) // 2
    S2n = (n * (n + 1) * (2 * n + 1)) // 6
    S, S2 = sum(arr), sum(x*x for x in arr)
    val1 = S - Sn
    val2 = S2 - S2n
    val2 = val2 // val1
    x = (val1 + val2) // 2
    y = val2 - x
    return [x, y]`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    int[] findTwoElement(int arr[], int n) {
        long Sn = ((long)n * (n + 1)) / 2;
        long S2n = ((long)n * (n + 1) * (2 * n + 1)) / 6;
        long S = 0, S2 = 0;
        for (int x : arr) {
            S += x;
            S2 += (long)x * x;
        }
        long val1 = S - Sn;
        long val2 = S2 - S2n;
        val2 = val2 / val1;
        int x = (int)((val1 + val2) / 2);
        int y = (int)(val2 - x);
        return new int[]{x, y};
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findTwoElement(arr) {
  const n = arr.length;
  const Sn = (n * (n + 1)) / 2;
  const S2n = (n * (n + 1) * (2 * n + 1)) / 6;
  let S = 0, S2 = 0;
  for (let i = 0; i < n; i++) {
    S += arr[i];
    S2 += arr[i] * arr[i];
  }
  const val1 = S - Sn;
  let val2 = S2 - S2n;
  val2 = val2 / val1;
  const x = (val1 + val2) / 2;
  const y = val2 - x;
  return [x, y];
}`
        }
      ]
    }
  },
  "9_count_inversions": {
    problemName: "Count Inversions",
    category: "arrays",
    description: "Determine total counts of element pairs (nums[i], nums[j]) where i < j and nums[i] > nums[j].",
    visualizerType: "array1d",
    defaultInput: { array: [2, 4, 1, 3, 5] },
    generateSteps: (input) => generateCountInversionsSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Merge Sort approach)",
          code: `def countInversions(arr):
    def merge(temp, left, mid, right):
        i, j, k = left, mid + 1, left
        inv_count = 0
        while i <= mid and j <= right:
            if arr[i] <= arr[j]:
                temp[k] = arr[i]; i += 1
            else:
                temp[k] = arr[j]; j += 1
                inv_count += (mid - i + 1)
            k += 1
        while i <= mid:
            temp[k] = arr[i]; i += 1; k += 1
        while j <= right:
            temp[k] = arr[j]; j += 1; k += 1
        for x in range(left, right + 1):
            arr[x] = temp[x]
        return inv_count
    
    def mergeSort(temp, left, right):
        inv_count = 0
        if left < right:
            mid = (left + right) // 2
            inv_count += mergeSort(temp, left, mid)
            inv_count += mergeSort(temp, mid + 1, right)
            inv_count += merge(temp, left, mid, right)
        return inv_count
        
    return mergeSort([0]*len(arr), 0, len(arr)-1)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    static long inversionCount(long arr[], long n) {
        long[] temp = new long[(int)n];
        return mergeSort(arr, temp, 0, (int)n - 1);
    }
    static long mergeSort(long arr[], long temp[], int left, int right) {
        long invCount = 0;
        if (left < right) {
            int mid = (left + right) / 2;
            invCount += mergeSort(arr, temp, left, mid);
            invCount += mergeSort(arr, temp, mid + 1, right);
            invCount += merge(arr, temp, left, mid, right);
        }
        return invCount;
    }
    static long merge(long arr[], long temp[], int left, int mid, int right) {
        int i = left, j = mid + 1, k = left;
        long invCount = 0;
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
                invCount += (mid - i + 1);
            }
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        for (i = left; i <= right; i++) arr[i] = temp[i];
        return invCount;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function countInversions(arr) {
  const merge = (temp, left, mid, right) => {
    let i = left, j = mid + 1, k = left;
    let invCount = 0;
    while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) {
        temp[k++] = arr[i++];
      } else {
        temp[k++] = arr[j++];
        invCount += (mid - i + 1);
      }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (i = left; i <= right; i++) arr[i] = temp[i];
    return invCount;
  };
  const mergeSort = (temp, left, right) => {
    let invCount = 0;
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      invCount += mergeSort(temp, left, mid);
      invCount += mergeSort(temp, mid + 1, right);
      invCount += merge(temp, left, mid, right);
    }
    return invCount;
  };
  return mergeSort(new Array(arr.length), 0, arr.length - 1);
}`
        }
      ]
    }
  },
  "10_reverse_pairs": {
    problemName: "Reverse Pairs",
    category: "arrays",
    description: "Determine count of index pairs (i, j) where i < j and nums[i] > 2 * nums[j].",
    visualizerType: "array1d",
    defaultInput: { array: [1, 3, 2, 3, 1] },
    generateSteps: (input) => generateReversePairsSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Merge Sort Count)",
          code: `def reversePairs(nums):
    def countPairs(left, mid, right):
        cnt = 0
        j = mid + 1
        for i in range(left, mid + 1):
            while j <= right and nums[i] > 2 * nums[j]:
                j += 1
            cnt += (j - (mid + 1))
        return cnt

    def merge(left, mid, right):
        temp = []
        i, j = left, mid + 1
        while i <= mid and j <= right:
            if nums[i] <= nums[j]:
                temp.append(nums[i]); i += 1
            else:
                temp.append(nums[j]); j += 1
        while i <= mid: temp.append(nums[i]); i += 1
        while j <= right: temp.append(nums[j]); j += 1
        for x in range(left, right + 1):
            nums[x] = temp[x - left]

    def mergeSort(left, right):
        if left >= right: return 0
        mid = (left + right) // 2
        cnt = mergeSort(left, mid)
        cnt += mergeSort(mid + 1, right)
        cnt += countPairs(left, mid, right)
        merge(left, mid, right)
        return cnt

    return mergeSort(0, len(nums) - 1)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
class Solution {
    public int reversePairs(int[] nums) {
        return mergeSort(nums, 0, nums.length - 1);
    }
    private int mergeSort(int[] nums, int left, int right) {
        if (left >= right) return 0;
        int mid = left + (right - left) / 2;
        int cnt = mergeSort(nums, left, mid);
        cnt += mergeSort(nums, mid + 1, right);
        cnt += countPairs(nums, left, mid, right);
        merge(nums, left, mid, right);
        return cnt;
    }
    private int countPairs(int[] nums, int left, int mid, int right) {
        int cnt = 0, j = mid + 1;
        for (int i = left; i <= mid; i++) {
            while (j <= right && (long)nums[i] > 2 * (long)nums[j]) {
                j++;
            }
            cnt += (j - (mid + 1));
        }
        return cnt;
    }
    private void merge(int[] nums, int left, int mid, int right) {
        ArrayList<Integer> temp = new ArrayList<>();
        int i = left, j = mid + 1;
        while (i <= mid && j <= right) {
            if (nums[i] <= nums[j]) {
                temp.add(nums[i++]);
            } else {
                temp.add(nums[j++]);
            }
        }
        while (i <= mid) temp.add(nums[i++]);
        while (j <= right) temp.add(nums[j++]);
        for (int x = left; x <= right; x++) {
            nums[x] = temp.get(x - left);
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function reversePairs(nums) {
  const countPairs = (left, mid, right) => {
    let cnt = 0, j = mid + 1;
    for (let i = left; i <= mid; i++) {
      while (j <= right && nums[i] > 2 * nums[j]) {
        j++;
      }
      cnt += (j - (mid + 1));
    }
    return cnt;
  };
  const merge = (left, mid, right) => {
    const temp = [];
    let i = left, j = mid + 1;
    while (i <= mid && j <= right) {
      if (nums[i] <= nums[j]) temp.push(nums[i++]);
      else temp.push(nums[j++]);
    }
    while (i <= mid) temp.push(nums[i++]);
    while (j <= right) temp.push(nums[j++]);
    for (let x = left; x <= right; x++) {
      nums[x] = temp[x - left];
    }
  };
  const mergeSort = (left, right) => {
    if (left >= right) return 0;
    const mid = Math.floor((left + right) / 2);
    let cnt = mergeSort(left, mid);
    cnt += mergeSort(mid + 1, right);
    cnt += countPairs(left, mid, right);
    merge(left, mid, right);
    return cnt;
  };
  return mergeSort(0, nums.length - 1);
}`
        }
      ]
    }
  },
  "11_maximum_product_subarray": {
    problemName: "Max Product Subarray",
    category: "arrays",
    description: "Find the contiguous subarray within array that has the largest product.",
    visualizerType: "array1d",
    defaultInput: { array: [2, 3, -2, 4] },
    generateSteps: (input) => generateMaxProductSubarraySteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient (Two Direction Scan)",
          code: `def maxProduct(nums):
    max_prod = float('-inf')
    prefix = suffix = 1
    n = len(nums)
    for i in range(n):
        if prefix == 0: prefix = 1
        if suffix == 0: suffix = 1
        prefix *= nums[i]
        suffix *= nums[n - 1 - i]
        max_prod = max(max_prod, prefix, suffix)
    return max_prod`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int maxProduct(int[] nums) {
        int n = nums.length;
        double maxProd = Integer.MIN_VALUE;
        double prefix = 1, suffix = 1;
        for (int i = 0; i < n; i++) {
            if (prefix == 0) prefix = 1;
            if (suffix == 0) suffix = 1;
            prefix *= nums[i];
            suffix *= nums[n - 1 - i];
            maxProd = Math.max(maxProd, Math.max(prefix, suffix));
        }
        return (int)maxProd;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function maxProduct(nums) {
  let maxProd = -Infinity;
  let prefix = 1, suffix = 1;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (prefix === 0) prefix = 1;
    if (suffix === 0) suffix = 1;
    prefix *= nums[i];
    suffix *= nums[n - 1 - i];
    maxProd = Math.max(maxProd, prefix, suffix);
  }
  return maxProd;
}`
        }
      ]
    }
  }
};
