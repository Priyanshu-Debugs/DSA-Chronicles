import { ProblemVisualizerMeta } from "../visualizerRegistry";
import { generateBinarySearchSteps } from "../problems/BinarySearchVisualizer";

// Helper Interface for 1D Array steps
export interface Array1DStep {
  array: (number | string)[];
  pointers: Record<string, number | null>;
  highlights?: Record<number, "active" | "compare" | "swap" | "sorted" | "inactive">;
  variables?: Record<string, any>;
  target?: number | string;
  description: string;
  codeLineMap?: Record<string, number>;
}

// 1. Check if Sorted
export function generateCheckSortedSteps(nums: number[]) {
  const steps: any[] = [];
  let isSorted = true;

  for (let i = 0; i < nums.length - 1; i++) {
    steps.push({
      array: nums,
      pointers: { i, "i+1": i + 1 },
      highlights: { [i]: "active", [i + 1]: "active" },
      variables: { current: nums[i], next: nums[i + 1] },
      description: `Compare nums[i] (${nums[i]}) with nums[i+1] (${nums[i + 1]}) to see if it is sorted.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 4, "javascript-optimal": 3 }
    });

    if (nums[i] > nums[i + 1]) {
      isSorted = false;
      steps.push({
        array: nums,
        pointers: { i, "i+1": i + 1 },
        highlights: { [i]: "swap", [i + 1]: "swap" },
        variables: { current: nums[i], next: nums[i + 1], isSorted: "False" },
        description: `Anomaly detected! nums[i] (${nums[i]}) is greater than nums[i+1] (${nums[i + 1]}). Array is not sorted.`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
      });
      break;
    }
  }

  if (isSorted) {
    steps.push({
      array: nums,
      pointers: {},
      highlights: {},
      variables: { isSorted: "True" },
      description: `All adjacent element pairs verified. The array is successfully sorted!`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 7, "javascript-optimal": 6 }
    });
  }

  return steps;
}

// 2. Binary Search Variant Steps (Lower Bound, Upper Bound, Search Insert)
export function generateBsVariantSteps(
  nums: number[],
  target: number,
  variant: "lower" | "upper" | "insert"
) {
  const steps: any[] = [];
  let low = 0;
  let high = nums.length - 1;
  let ans = nums.length;

  steps.push({
    array: nums,
    pointers: { low, high },
    highlights: {},
    variables: { answer: ans },
    target,
    description: `Initialize bounds: low = 0, high = ${high}. Default answer index is set to array length (${ans}).`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 3, "javascript-optimal": 2 }
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = nums[mid];
    let conditionMet = false;

    if (variant === "lower" || variant === "insert") {
      conditionMet = midVal >= target;
    } else {
      conditionMet = midVal > target;
    }

    steps.push({
      array: nums,
      pointers: { low, high, mid },
      highlights: { [mid]: "active" },
      variables: { answer: ans, mid_value: midVal },
      target,
      description: `Calculate mid = (${low} + ${high}) / 2 = ${mid} (value: ${midVal}). Compare mid value with target ${target}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
    });

    if (conditionMet) {
      ans = mid;
      high = mid - 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "sorted" },
        variables: { answer: ans, mid_value: midVal },
        target,
        description: `Condition met (${midVal} ${variant === "upper" ? ">" : ">="} ${target}). Potential answer found at index ${mid}. Shrink search space by moving high to mid - 1 = ${high}.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
      });
    } else {
      low = mid + 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "compare" },
        variables: { answer: ans, mid_value: midVal },
        target,
        description: `Condition NOT met (${midVal} is smaller). Search in the right half by moving low to mid + 1 = ${low}.`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 8, "javascript-optimal": 7 }
      });
    }
  }

  steps.push({
    array: nums,
    pointers: {},
    highlights: {},
    variables: { answer: ans },
    target,
    description: `Search space is empty. Binary search complete. Return index answer = ${ans}.`,
    codeLineMap: { "python-efficient": 8, "java-optimal": 10, "javascript-optimal": 9 }
  });

  return steps;
}

// 3. First or Last Occurrence
export function generateFirstLastOccurrenceSteps(nums: number[], target: number) {
  const steps: any[] = [];
  let first = -1;
  let last = -1;

  // First occurrence
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      array: nums,
      pointers: { low, high, mid },
      highlights: { [mid]: "active" },
      variables: { target, first_occurrence: first, last_occurrence: last, phase: "finding_first" },
      target,
      description: `Finding First: mid = ${mid} (value: ${nums[mid]}). Check if match.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
    });

    if (nums[mid] === target) {
      first = mid;
      high = mid - 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "sorted" },
        variables: { target, first_occurrence: first, last_occurrence: last, phase: "finding_first" },
        target,
        description: `Match found! Update first = ${mid}. Move high to mid - 1 to check for earlier occurrences.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
      });
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  // Last occurrence
  low = 0; high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      array: nums,
      pointers: { low, high, mid },
      highlights: { [mid]: "active" },
      variables: { target, first_occurrence: first, last_occurrence: last, phase: "finding_last" },
      target,
      description: `Finding Last: mid = ${mid} (value: ${nums[mid]}). Check if match.`,
      codeLineMap: { "python-efficient": 10, "java-optimal": 12, "javascript-optimal": 11 }
    });

    if (nums[mid] === target) {
      last = mid;
      low = mid + 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "sorted" },
        variables: { target, first_occurrence: first, last_occurrence: last, phase: "finding_last" },
        target,
        description: `Match found! Update last = ${mid}. Move low to mid + 1 to check for later occurrences.`,
        codeLineMap: { "python-efficient": 11, "java-optimal": 13, "javascript-optimal": 12 }
      });
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  steps.push({
    array: nums,
    pointers: {},
    highlights: {},
    variables: { first_occurrence: first, last_occurrence: last },
    target,
    description: `Binary search complete. First occurrence = ${first}, Last occurrence = ${last}.`,
    codeLineMap: { "python-efficient": 15, "java-optimal": 17, "javascript-optimal": 16 }
  });

  return steps;
}

// 4. Count Occurrences
export function generateCountOccurrencesSteps(nums: number[], target: number) {
  const baseSteps = generateFirstLastOccurrenceSteps(nums, target);
  // Enhance descriptions and count calculations
  const finalFirst = baseSteps[baseSteps.length - 1].variables?.first_occurrence ?? -1;
  const finalLast = baseSteps[baseSteps.length - 1].variables?.last_occurrence ?? -1;
  const count = finalFirst === -1 ? 0 : finalLast - finalFirst + 1;

  baseSteps.push({
    array: nums,
    pointers: {},
    highlights: {},
    variables: { first: finalFirst, last: finalLast, count },
    target,
    description: `Calculate total count: last (${finalLast}) - first (${finalFirst}) + 1 = ${count}.`,
    codeLineMap: { "python-efficient": 16, "java-optimal": 19, "javascript-optimal": 18 }
  });

  return baseSteps;
}

// 5. Find Peak Element
export function generatePeakElementSteps(nums: number[]) {
  const steps: any[] = [];
  const N = nums.length;
  let low = 0, high = N - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = nums[mid];
    const leftVal = mid > 0 ? nums[mid - 1] : -Infinity;
    const rightVal = mid < N - 1 ? nums[mid + 1] : -Infinity;

    steps.push({
      array: nums,
      pointers: { low, high, mid },
      highlights: { [mid]: "active" },
      variables: { leftVal, midVal, rightVal },
      description: `Mid = ${mid} (value: ${midVal}). Check neighbors: left = ${leftVal}, right = ${rightVal}.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 4, "javascript-optimal": 3 }
    });

    if (midVal > leftVal && midVal > rightVal) {
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "sorted" },
        variables: { peakIndex: mid, peakValue: midVal },
        description: `Peak element found! nums[mid] (${midVal}) is greater than both its neighbors.`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
      });
      return steps;
    } else if (midVal < rightVal) {
      low = mid + 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "compare" },
        variables: { low },
        description: `Right neighbor is larger (${rightVal} > ${midVal}). Peak must lie in the right half. Move low to mid + 1 = ${low}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 7, "javascript-optimal": 6 }
      });
    } else {
      high = mid - 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "compare" },
        variables: { high },
        description: `Left neighbor is larger. Peak must lie in the left half. Move high to mid - 1 = ${high}.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 9, "javascript-optimal": 8 }
      });
    }
  }

  return steps;
}

// 6. Search in Rotated Sorted Array
export function generateSearchRotatedSteps(nums: number[], target: number, duplicatesAllowed = false) {
  const steps: any[] = [];
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = nums[mid];

    steps.push({
      array: nums,
      pointers: { low, high, mid },
      highlights: { [mid]: "active" },
      variables: { target, midVal },
      target,
      description: `Mid = ${mid} (value: ${midVal}). Compare with target ${target}.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 4, "javascript-optimal": 3 }
    });

    if (midVal === target) {
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "sorted" },
        variables: { target, matchIndex: mid },
        target,
        description: `Target ${target} found at index ${mid}!`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
      });
      return steps;
    }

    if (duplicatesAllowed && nums[low] === midVal && midVal === nums[high]) {
      low++;
      high--;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [low]: "compare", [high]: "compare" },
        variables: { target, midVal },
        target,
        description: `Edge Case: Duplicate boundary values. Unable to determine sorted half. Shrink bounds: low = ${low}, high = ${high}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 7, "javascript-optimal": 6 }
      });
      continue;
    }

    // Left half sorted
    if (nums[low] <= midVal) {
      if (nums[low] <= target && target < midVal) {
        high = mid - 1;
        steps.push({
          array: nums,
          pointers: { low, high, mid },
          highlights: { [low]: "compare" },
          variables: { target },
          target,
          description: `Left half is sorted & target falls within it. Search in left half: move high to ${high}.`,
          codeLineMap: { "python-efficient": 8, "java-optimal": 9, "javascript-optimal": 8 }
        });
      } else {
        low = mid + 1;
        steps.push({
          array: nums,
          pointers: { low, high, mid },
          highlights: { [low]: "compare" },
          variables: { target },
          target,
          description: `Left half sorted but target is NOT in range. Search in right half: move low to ${low}.`,
          codeLineMap: { "python-efficient": 10, "java-optimal": 11, "javascript-optimal": 10 }
        });
      }
    } else { // Right half sorted
      if (midVal < target && target <= nums[high]) {
        low = mid + 1;
        steps.push({
          array: nums,
          pointers: { low, high, mid },
          highlights: { [high]: "compare" },
          variables: { target },
          target,
          description: `Right half is sorted & target falls within it. Search in right half: move low to ${low}.`,
          codeLineMap: { "python-efficient": 12, "java-optimal": 13, "javascript-optimal": 12 }
        });
      } else {
        high = mid - 1;
        steps.push({
          array: nums,
          pointers: { low, high, mid },
          highlights: { [high]: "compare" },
          variables: { target },
          target,
          description: `Right half sorted but target is NOT in range. Search in left half: move high to ${high}.`,
          codeLineMap: { "python-efficient": 14, "java-optimal": 15, "javascript-optimal": 14 }
        });
      }
    }
  }

  steps.push({
    array: nums,
    pointers: {},
    highlights: {},
    variables: { target, result: -1 },
    target,
    description: `Binary search space exhausted. Target ${target} is not in the rotated sorted array.`,
    codeLineMap: { "python-efficient": 15, "java-optimal": 16, "javascript-optimal": 15 }
  });

  return steps;
}

// 7. Find Minimum in Rotated Sorted Array
export function generateFindMinRotatedSteps(nums: number[]) {
  const steps: any[] = [];
  let low = 0;
  let high = nums.length - 1;
  let ans = Infinity;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = nums[mid];

    steps.push({
      array: nums,
      pointers: { low, high, mid },
      highlights: { [mid]: "active" },
      variables: { currentMin: ans },
      description: `Mid = ${mid} (value: ${midVal}). Check which half is sorted.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 4, "javascript-optimal": 3 }
    });

    if (nums[low] <= nums[high]) {
      ans = Math.min(ans, nums[low]);
      steps.push({
        array: nums,
        pointers: { low, high },
        highlights: { [low]: "sorted" },
        variables: { currentMin: ans },
        description: `Entire subarray from low (${low}) to high (${high}) is sorted. Leftmost value (${nums[low]}) can be minimum. Update currentMin = ${ans}.`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
      });
      break;
    }

    if (nums[low] <= midVal) {
      ans = Math.min(ans, nums[low]);
      low = mid + 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [low]: "compare" },
        variables: { currentMin: ans },
        description: `Left half is sorted. Subarray min is nums[low] (${nums[low]}). Update currentMin = ${ans}. Move low to mid + 1 = ${low}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 7, "javascript-optimal": 6 }
      });
    } else {
      ans = Math.min(ans, midVal);
      high = mid - 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "compare" },
        variables: { currentMin: ans },
        description: `Right half is sorted. Subarray min is mid value (${midVal}). Update currentMin = ${ans}. Move high to mid - 1 = ${high}.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 9, "javascript-optimal": 8 }
      });
    }
  }

  steps.push({
    array: nums,
    pointers: {},
    highlights: {},
    variables: { minimumValue: ans },
    description: `Binary search complete. Minimum element is ${ans}.`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 11, "javascript-optimal": 10 }
  });

  return steps;
}

// 8. Single Element in a Sorted Array
export function generateSingleElementSteps(nums: number[]) {
  const steps: any[] = [];
  const N = nums.length;
  if (N === 1) {
    steps.push({
      array: nums,
      pointers: {},
      highlights: { 0: "sorted" },
      variables: { singleElement: nums[0] },
      description: `Only 1 element in array. Returns nums[0] = ${nums[0]}.`,
      codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
    });
    return steps;
  }

  // Pre-checks
  if (nums[0] !== nums[1]) {
    steps.push({
      array: nums,
      pointers: {},
      highlights: { 0: "sorted" },
      variables: { singleElement: nums[0] },
      description: `Boundary check: first element doesn't match second. Returns ${nums[0]}.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });
    return steps;
  }
  if (nums[N - 1] !== nums[N - 2]) {
    steps.push({
      array: nums,
      pointers: {},
      highlights: { [N - 1]: "sorted" },
      variables: { singleElement: nums[N - 1] },
      description: `Boundary check: last element doesn't match second last. Returns ${nums[N - 1]}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });
    return steps;
  }

  let low = 1, high = N - 2;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      array: nums,
      pointers: { low, high, mid },
      highlights: { [mid]: "active" },
      variables: { midVal: nums[mid] },
      description: `Mid = ${mid} (value: ${nums[mid]}). Check duplicate alignment.`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    if (nums[mid] !== nums[mid - 1] && nums[mid] !== nums[mid + 1]) {
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "sorted" },
        variables: { singleElement: nums[mid] },
        description: `Single element found! nums[mid] (${nums[mid]}) is unique compared to its neighbors.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
      return steps;
    }

    // Parity alignment rules for duplicates
    const isEvenIndex = mid % 2 === 0;
    const isNextEqual = nums[mid] === nums[mid + 1];

    if ((isEvenIndex && isNextEqual) || (!isEvenIndex && !isNextEqual)) {
      low = mid + 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "compare" },
        variables: { low },
        description: `We are on left half of the unique element. Move low to mid + 1 = ${low}.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
    } else {
      high = mid - 1;
      steps.push({
        array: nums,
        pointers: { low, high, mid },
        highlights: { [mid]: "compare" },
        variables: { high },
        description: `We are on right half of the unique element. Move high to mid - 1 = ${high}.`,
        codeLineMap: { "python-efficient": 10, "java-optimal": 10, "javascript-optimal": 10 }
      });
    }
  }

  return steps;
}

// 9. Find Kth Element of Two Sorted Arrays / Partition Concatenation helper
export function generateFindKthTwoArraysSteps(nums1: number[], nums2: number[], k: number) {
  const steps: any[] = [];
  const N1 = nums1.length;
  const N2 = nums2.length;
  if (N1 > N2) return generateFindKthTwoArraysSteps(nums2, nums1, k);

  let low = Math.max(0, k - N2);
  let high = Math.min(k, N1);

  // Representation
  const concatArray = [...nums1, "|", ...nums2];
  const midDividerIdx = nums1.length;

  steps.push({
    array: concatArray,
    pointers: {},
    highlights: {},
    variables: { k, low, high },
    description: `Concatenated partition representation: Array 1 (length ${N1}) & Array 2 (length ${N2}). Start binary search bounds for partition.`,
    codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
  });

  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = k - cut1;

    const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const r1 = cut1 === N1 ? Infinity : nums1[cut1];
    const r2 = cut2 === N2 ? Infinity : nums2[cut2];

    const pointers: Record<string, number> = {};
    if (cut1 > 0) pointers[`L1`] = cut1 - 1;
    if (cut1 < N1) pointers[`R1`] = cut1;
    if (cut2 > 0) pointers[`L2`] = midDividerIdx + 1 + (cut2 - 1);
    if (cut2 < N2) pointers[`R2`] = midDividerIdx + 1 + cut2;

    steps.push({
      array: concatArray,
      pointers,
      highlights: {},
      variables: { l1, l2, r1, r2, cut1, cut2 },
      description: `Partition: Cut1 = ${cut1}, Cut2 = ${cut2}. Check bounds conditions: L1 (${l1}) <= R2 (${r2}) and L2 (${l2}) <= R1 (${r1}).`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
    });

    if (l1 <= r2 && l2 <= r1) {
      const res = Math.max(l1, l2);
      steps.push({
        array: concatArray,
        pointers,
        highlights: {},
        variables: { result: res },
        description: `Condition met! Maximum of left elements: max(${l1}, ${l2}) = ${res} is the Kth element.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 7, "javascript-optimal": 6 }
      });
      return steps;
    } else if (l1 > r2) {
      high = cut1 - 1;
    } else {
      low = cut1 + 1;
    }
  }

  return steps;
}

// 10. Rotation Count (Index of Min Element)
export function generateRotationCountSteps(nums: number[]) {
  const baseSteps = generateFindMinRotatedSteps(nums);
  const finalMinVal = baseSteps[baseSteps.length - 1].variables?.minimumValue ?? nums[0];
  const rotIdx = nums.indexOf(finalMinVal);

  baseSteps.push({
    array: nums,
    pointers: { pivot: rotIdx },
    highlights: { [rotIdx]: "sorted" },
    variables: { minimumValue: finalMinVal, rotationCount: rotIdx },
    description: `Minimum element is ${finalMinVal} at index ${rotIdx}. The array is rotated ${rotIdx} times.`,
    codeLineMap: { "python-efficient": 10, "java-optimal": 12, "javascript-optimal": 11 }
  });

  return baseSteps;
}

// 11. Search in 2D Matrix (1D Flattened BS on grid visual)
export function generateSearch2DMatrixSteps(grid: number[][], target: number) {
  const steps: any[] = [];
  const R = grid.length;
  const C = grid[0].length;
  let low = 0;
  let high = R * C - 1;

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
    description: `Start binary search on 2D Matrix. Virtual flattened bounds: low = 0, high = ${high}.`,
    codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const r = Math.floor(mid / C);
    const c = mid % C;
    const midVal = grid[r][c];

    // Show eliminated ranges in visited
    const newVisited = visited.map((row, rowIdx) =>
      row.map((val, colIdx) => {
        const flatIdx = rowIdx * C + colIdx;
        return flatIdx < low || flatIdx > high;
      })
    );

    steps.push({
      grid,
      visited: newVisited,
      currentRow: r,
      currentCol: c,
      top: 0,
      bottom: R - 1,
      left: 0,
      right: C - 1,
      result: [],
      description: `Virtual mid = ${mid} -> coordinate [${r}, ${c}] (value: ${midVal}). Target = ${target}.`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    if (midVal === target) {
      steps.push({
        grid,
        visited: newVisited,
        currentRow: r,
        currentCol: c,
        top: 0,
        bottom: R - 1,
        left: 0,
        right: C - 1,
        result: [midVal],
        description: `Match found! Matrix element at [${r}, ${c}] matches target ${target}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
      return steps;
    } else if (midVal < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const finalVisited = visited.map((row, rowIdx) =>
    row.map((val, colIdx) => {
      const flatIdx = rowIdx * C + colIdx;
      return flatIdx < low || flatIdx > high;
    })
  );

  steps.push({
    grid,
    visited: finalVisited,
    currentRow: -1,
    currentCol: -1,
    top: 0,
    bottom: R - 1,
    left: 0,
    right: C - 1,
    result: [],
    description: `Binary search bounds exhausted. Target ${target} not found in matrix.`,
    codeLineMap: { "python-efficient": 10, "java-optimal": 10, "javascript-optimal": 10 }
  });

  return steps;
}

// 12. Find Peak Element 2D (Col Binary Search)
export function generateFindPeak2DSteps(grid: number[][]) {
  const steps: any[] = [];
  const R = grid.length;
  const C = grid[0].length;
  let lowCol = 0, highCol = C - 1;

  const visited = Array.from({ length: R }, () => Array(C).fill(false));

  while (lowCol <= highCol) {
    const midCol = Math.floor((lowCol + highCol) / 2);
    
    // Find max row in column midCol
    let maxRow = 0;
    for (let r = 0; r < R; r++) {
      if (grid[r][midCol] > grid[maxRow][midCol]) {
        maxRow = r;
      }
    }
    const val = grid[maxRow][midCol];
    const leftVal = midCol > 0 ? grid[maxRow][midCol - 1] : -1;
    const rightVal = midCol < C - 1 ? grid[maxRow][midCol + 1] : -1;

    // Gray out cols outside bounds
    const newVisited = visited.map((row, rIdx) =>
      row.map((val, cIdx) => cIdx < lowCol || cIdx > highCol)
    );

    steps.push({
      grid,
      visited: newVisited,
      currentRow: maxRow,
      currentCol: midCol,
      top: 0, bottom: R - 1,
      left: lowCol, right: highCol,
      result: [],
      description: `Col Mid = ${midCol}. Max value in col is grid[${maxRow}][${midCol}] = ${val}. Compare with neighbors: left = ${leftVal}, right = ${rightVal}.`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
    });

    if (val >= leftVal && val >= rightVal) {
      steps.push({
        grid,
        visited: newVisited,
        currentRow: maxRow,
        currentCol: midCol,
        top: 0, bottom: R - 1,
        left: lowCol, right: highCol,
        result: [val],
        description: `Peak found! grid[${maxRow}][${midCol}] = ${val} is greater than its horizontal neighbors.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 7, "javascript-optimal": 6 }
      });
      return steps;
    } else if (val < leftVal) {
      highCol = midCol - 1;
    } else {
      lowCol = midCol + 1;
    }
  }

  return steps;
}

// 13. Matrix Median
export function generateMatrixMedianSteps(grid: number[][]) {
  const steps: any[] = [];
  const R = grid.length;
  const C = grid[0].length;
  const targetCount = Math.floor((R * C) / 2) + 1;

  let low = Infinity;
  let high = -Infinity;
  for (let r = 0; r < R; r++) {
    low = Math.min(low, grid[r][0]);
    high = Math.max(high, grid[r][C - 1]);
  }

  const visited = Array.from({ length: R }, () => Array(C).fill(false));

  steps.push({
    grid,
    visited,
    currentRow: -1, currentCol: -1,
    top: 0, bottom: R - 1, left: 0, right: C - 1,
    result: [],
    description: `Median BS on range. Target count is ${targetCount} numbers <= mid. Range: low = ${low}, high = ${high}.`,
    codeLineMap: { "python-efficient": 3, "java-optimal": 4, "javascript-optimal": 3 }
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Count <= mid in each row
    let count = 0;
    for (let r = 0; r < R; r++) {
      let rCount = 0;
      for (let c = 0; c < C; c++) {
        if (grid[r][c] <= mid) rCount++;
      }
      count += rCount;
    }

    steps.push({
      grid,
      visited,
      currentRow: -1, currentCol: -1,
      top: 0, bottom: R - 1, left: 0, right: C - 1,
      result: [],
      description: `Mid value = ${mid}. Count of numbers <= ${mid} is ${count}.`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
    });

    if (count < targetCount) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  steps.push({
    grid,
    visited,
    currentRow: -1, currentCol: -1,
    top: 0, bottom: R - 1, left: 0, right: C - 1,
    result: [low],
    description: `Binary search complete. Median value found is ${low}.`,
    codeLineMap: { "python-efficient": 10, "java-optimal": 12, "javascript-optimal": 11 }
  });

  return steps;
}

// 14. Square Root / Search Space range steps generator helper
export function generateSqrtSteps(n: number) {
  const steps: any[] = [];
  const range: number[] = [];
  for (let i = 1; i <= Math.min(n, 12); i++) range.push(i);

  let low = 1, high = n;
  let ans = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midSq = mid * mid;

    steps.push({
      array: range,
      pointers: { low: range.indexOf(low) === -1 ? null : range.indexOf(low), 
                 high: range.indexOf(high) === -1 ? null : range.indexOf(high), 
                 mid: range.indexOf(mid) === -1 ? null : range.indexOf(mid) },
      highlights: { [range.indexOf(mid)]: "active" },
      variables: { low, high, mid, "mid^2": midSq, ans },
      description: `Mid = ${mid}. mid^2 = ${midSq}. Compare with N = ${n}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
    });

    if (midSq <= n) {
      ans = mid;
      low = mid + 1;
      steps.push({
        array: range,
        pointers: {},
        highlights: {},
        variables: { low, high, mid, ans },
        description: `mid^2 (${midSq}) <= N (${n}). Update ans = ${mid}. Search right half: move low to ${low}.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
      });
    } else {
      high = mid - 1;
      steps.push({
        array: range,
        pointers: {},
        highlights: {},
        variables: { low, high, mid, ans },
        description: `mid^2 (${midSq}) > N (${n}). Search left half: move high to ${high}.`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 8, "javascript-optimal": 7 }
      });
    }
  }

  steps.push({
    array: range,
    pointers: {},
    highlights: {},
    variables: { floorSquareRoot: ans },
    description: `Binary search complete. Floor square root of ${n} is ${ans}.`,
    codeLineMap: { "python-efficient": 8, "java-optimal": 10, "javascript-optimal": 9 }
  });

  return steps;
}

// 15. Nth Root
export function generateNthRootSteps(n: number, m: number) {
  const steps: any[] = [];
  const range: number[] = [];
  for (let i = 1; i <= Math.min(m, 12); i++) range.push(i);

  let low = 1, high = m;
  let ans = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midPower = Math.pow(mid, n);

    steps.push({
      array: range,
      pointers: { mid: range.indexOf(mid) },
      highlights: { [range.indexOf(mid)]: "active" },
      variables: { low, high, mid, [`mid^${n}`]: midPower, target: m },
      description: `Mid = ${mid}. mid^${n} = ${midPower}. Compare with M = ${m}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
    });

    if (midPower === m) {
      ans = mid;
      steps.push({
        array: range,
        pointers: {},
        highlights: {},
        variables: { result: ans },
        description: `Perfect Match! mid^${n} is exactly equal to ${m}. Return root ${mid}.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
      });
      return steps;
    } else if (midPower < m) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  steps.push({
    array: range,
    pointers: {},
    highlights: {},
    variables: { result: ans },
    description: `No integer root found. Returns ${ans}.`,
    codeLineMap: { "python-efficient": 8, "java-optimal": 10, "javascript-optimal": 9 }
  });

  return steps;
}

// 16. Koko Eating Bananas
export function generateKokoSteps(piles: number[], h: number) {
  const steps: any[] = [];
  let low = 1;
  let high = Math.max(...piles);
  let ans = high;

  steps.push({
    array: piles,
    pointers: {},
    highlights: {},
    variables: { low, high, ans },
    description: `Search space for speed rate k is [1, ${high}]. Try speeds to eat all piles within ${h} hours.`,
    codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Calculate hours at mid speed
    let hours = 0;
    piles.forEach(p => hours += Math.ceil(p / mid));

    steps.push({
      array: piles,
      pointers: {},
      highlights: {},
      variables: { currentSpeed: mid, totalHoursRequired: hours, minSpeedLimit: ans },
      description: `Testing eating speed rate = ${mid} bananas/hour. Hours needed is ${hours} hours.`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    if (hours <= h) {
      ans = mid;
      high = mid - 1;
      steps.push({
        array: piles,
        pointers: {},
        highlights: {},
        variables: { currentSpeed: mid, hours, ans },
        description: `Eating rate ${mid} is feasible (${hours} <= ${h} limit). Save potential ans = ${mid}. Search lower speeds: move high to ${high}.`,
        codeLineMap: { "python-efficient": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    } else {
      low = mid + 1;
      steps.push({
        array: piles,
        pointers: {},
        highlights: {},
        variables: { currentSpeed: mid, hours, ans },
        description: `Eating rate ${mid} is too slow (${hours} > ${h} limit). Move low to ${low}.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
    }
  }

  steps.push({
    array: piles,
    pointers: {},
    highlights: {},
    variables: { optimalSpeed: ans },
    description: `Binary search complete. Minimum banana eating speed is ${ans} bananas/hour.`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 10, "javascript-optimal": 9 }
  });

  return steps;
}

// 17. Minimum Days to make M Bouquets
export function generateBloomDaySteps(bloomDay: number[], m: number, k: number) {
  const steps: any[] = [];
  const totalNeeded = m * k;
  if (bloomDay.length < totalNeeded) {
    steps.push({
      array: bloomDay,
      pointers: {},
      highlights: {},
      variables: { result: -1 },
      description: `Not enough flowers to make ${m} bouquets of size ${k}. Returns -1.`,
      codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
    });
    return steps;
  }

  let low = Math.min(...bloomDay);
  let high = Math.max(...bloomDay);
  let ans = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Check if we can make m bouquets at day mid
    let bouquets = 0;
    let count = 0;
    bloomDay.forEach(day => {
      if (day <= mid) {
        count++;
        if (count === k) {
          bouquets++;
          count = 0;
        }
      } else {
        count = 0;
      }
    });

    steps.push({
      array: bloomDay,
      pointers: {},
      highlights: {},
      variables: { currentDay: mid, bouquetsCreated: bouquets, target: m },
      description: `Test day limit = ${mid}. We can formulate ${bouquets} bouquets.`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    if (bouquets >= m) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return steps;
}

// 18. Find Smallest Divisor
export function generateSmallestDivisorSteps(nums: number[], threshold: number) {
  const steps: any[] = [];
  let low = 1;
  let high = Math.max(...nums);
  let ans = high;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    let sum = 0;
    nums.forEach(n => sum += Math.ceil(n / mid));

    steps.push({
      array: nums,
      pointers: {},
      highlights: {},
      variables: { divisor: mid, divisionSum: sum, limit: threshold },
      description: `Try divisor = ${mid}. Sum of elements divided is ${sum}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (sum <= threshold) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return steps;
}

// 19. Capacity to Ship Packages within D Days
export function generateShipCapacitySteps(weights: number[], days: number) {
  const steps: any[] = [];
  let low = Math.max(...weights);
  let high = weights.reduce((a, b) => a + b, 0);
  let ans = high;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Check days required at capacity mid
    let daysNeeded = 1;
    let currentWeight = 0;
    weights.forEach(w => {
      if (currentWeight + w > mid) {
        daysNeeded++;
        currentWeight = w;
      } else {
        currentWeight += w;
      }
    });

    steps.push({
      array: weights,
      pointers: {},
      highlights: {},
      variables: { testCapacity: mid, daysNeeded, limit: days },
      description: `Test shipping capacity = ${mid}. Ship days needed is ${daysNeeded}.`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    if (daysNeeded <= days) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return steps;
}

// 20. Aggressive Cows
export function generateAggressiveCowsSteps(stalls: number[], cows: number) {
  const steps: any[] = [];
  const sortedStalls = [...stalls].sort((a, b) => a - b);
  let low = 1;
  let high = sortedStalls[sortedStalls.length - 1] - sortedStalls[0];
  let ans = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Check if mid is feasible
    let placed = 1;
    let lastPos = sortedStalls[0];
    for (let i = 1; i < sortedStalls.length; i++) {
      if (sortedStalls[i] - lastPos >= mid) {
        placed++;
        lastPos = sortedStalls[i];
      }
    }

    steps.push({
      array: sortedStalls,
      pointers: {},
      highlights: {},
      variables: { minDistance: mid, cowsPlaced: placed, totalCows: cows },
      description: `Test minimum distance = ${mid}. We can place ${placed} cows.`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    if (placed >= cows) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return steps;
}

// 21. Book Allocation / Workload Split
export function generateBookAllocationSteps(books: number[], students: number) {
  const steps: any[] = [];
  if (students > books.length) {
    steps.push({
      array: books,
      pointers: {},
      highlights: {},
      variables: { result: -1 },
      description: `Fewer books than students. Allocation impossible. Return -1.`,
      codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
    });
    return steps;
  }

  let low = Math.max(...books);
  let high = books.reduce((a, b) => a + b, 0);
  let ans = high;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Check feasibility
    let currentSum = 0;
    let studentsAssigned = 1;
    books.forEach(pages => {
      if (currentSum + pages > mid) {
        studentsAssigned++;
        currentSum = pages;
      } else {
        currentSum += pages;
      }
    });

    steps.push({
      array: books,
      pointers: {},
      highlights: {},
      variables: { maxPagesPerStudent: mid, studentsNeeded: studentsAssigned, totalStudents: students },
      description: `Test page boundary = ${mid}. Workload requires ${studentsAssigned} students.`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    if (studentsAssigned <= students) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return steps;
}

// 22. Kth Missing Positive Number
export function generateKthMissingPositiveSteps(nums: number[], k: number) {
  const steps: any[] = [];
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const missing = nums[mid] - (mid + 1);

    steps.push({
      array: nums,
      pointers: { low, high, mid },
      highlights: { [mid]: "active" },
      variables: { missingCount: missing, k },
      description: `Mid = ${mid} (value: ${nums[mid]}). Missing positive numbers count <= this index is: ${nums[mid]} - (${mid} + 1) = ${missing}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
    });

    if (missing < k) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const ans = low + k;
  steps.push({
    array: nums,
    pointers: {},
    highlights: {},
    variables: { low, high, result: ans },
    description: `Binary search complete. Kth missing positive number is low + k = ${low} + ${k} = ${ans}.`,
    codeLineMap: { "python-efficient": 8, "java-optimal": 10, "javascript-optimal": 9 }
  });

  return steps;
}

export const step2BinarySearchRegistry: Record<string, ProblemVisualizerMeta> = {
  "0_binary_search_to_find_x_in_sorted_array_": {
    problemName: "Binary Search",
    category: "binary-search",
    description: "Search for a target value in a sorted array by repeatedly dividing the search interval in half.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 3, 5, 7, 9, 11, 13, 15],
      target: 9,
    },
    generateSteps: (input) => generateBinarySearchSteps(input.array, input.target),
    solutions: {
      javascript: [
        {
          label: "Optimal",
          code: `function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
        },
      ],
      python: [
        {
          label: "Efficient (Iterative)",
          code: `def binarySearch(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
        },
        {
          label: "Easier (Recursive)",
          code: `def binarySearch(nums, target):
    def helper(low, high):
        if low > high:
            return -1
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            return helper(mid + 1, high)
        else:
            return helper(low, mid - 1)
            
    return helper(0, len(nums) - 1)`,
        },
        {
          label: "Shorter (Custom Bisect)",
          code: `def binarySearch(nums, target):
    low, high = 0, len(nums) - 1
    while low < high:
        mid = (low + high) // 2
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid
    return low if nums[low] == target else -1`,
        },
      ],
      java: [
        {
          label: "Optimal (Iterative)",
          code: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
        },
        {
          label: "Simple (Recursive)",
          code: `class Solution {
    public int search(int[] nums, int target) {
        return solve(nums, target, 0, nums.length - 1);
    }
    
    private int solve(int[] nums, int target, int low, int high) {
        if (low > high) return -1;
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) return solve(nums, target, mid + 1, high);
        return solve(nums, target, low, mid - 1);
    }
}`,
        },
      ],
    },
  },
  "1_implement_lower_bound": {
    problemName: "Implement Lower Bound",
    category: "binary-search",
    description: "Find the smallest index in a sorted array where the element value is greater than or equal to target X.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 2, 8, 10, 11, 12, 19],
      target: 5
    },
    generateSteps: (input) => generateBsVariantSteps(input.array, input.target, "lower"),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def lowerBound(arr, x):
    low, high = 0, len(arr) - 1
    ans = len(arr)
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] >= x:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int lowerBound(int[] arr, int x) {
        int low = 0, high = arr.length - 1;
        int ans = arr.length;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] >= x) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function lowerBound(arr, x) {
  let low = 0, high = arr.length - 1;
  let ans = arr.length;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] >= x) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "2_implement_upper_bound": {
    problemName: "Implement Upper Bound",
    category: "binary-search",
    description: "Find the smallest index in a sorted array where the element value is strictly greater than target X.",
    visualizerType: "array1d",
    defaultInput: {
      array: [2, 4, 6, 8, 10, 12],
      target: 6
    },
    generateSteps: (input) => generateBsVariantSteps(input.array, input.target, "upper"),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def upperBound(arr, x):
    low, high = 0, len(arr) - 1
    ans = len(arr)
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] > x:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int upperBound(int[] arr, int x) {
        int low = 0, high = arr.length - 1;
        int ans = arr.length;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] > x) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function upperBound(arr, x) {
  let low = 0, high = arr.length - 1;
  let ans = arr.length;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] > x) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "3_search_insert_position": {
    problemName: "Search Insert Position",
    category: "binary-search",
    description: "Return the index of target if found in sorted array, else return the index where it should be inserted.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 3, 5, 6],
      target: 5
    },
    generateSteps: (input) => generateBsVariantSteps(input.array, input.target, "insert"),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def searchInsert(nums, target):
    low, high = 0, len(nums) - 1
    ans = len(nums)
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] >= target:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        int ans = nums.length;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] >= target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function searchInsert(nums, target) {
  let low = 0, high = nums.length - 1;
  let ans = nums.length;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] >= target) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "4_check_if_input_array_is_sorted": {
    problemName: "Check if Sorted",
    category: "binary-search",
    description: "Verify if elements in the given array are sorted in non-decreasing order.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 4, 8, 10, 11] },
    generateSteps: (input) => generateCheckSortedSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def isSorted(arr):
    for i in range(len(arr) - 1):
        if arr[i] > arr[i+1]:
            return False
    return True`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean arraySortedOrNot(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) return false;
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
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}`
        }
      ]
    }
  },
  "5_find_the_first_or_last_occurrence_of_a_given_number_in_a_sorted_array_": {
    problemName: "First & Last Occurrence",
    category: "binary-search",
    description: "Find the starting and ending indices of a target value in a sorted array.",
    visualizerType: "array1d",
    defaultInput: {
      array: [5, 7, 7, 8, 8, 10],
      target: 8
    },
    generateSteps: (input) => generateFirstLastOccurrenceSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def searchRange(nums, target):
    first, last = -1, -1
    # Find first
    l, h = 0, len(nums) - 1
    while l <= h:
        mid = (l + h) // 2
        if nums[mid] == target:
            first = mid
            h = mid - 1
        elif nums[mid] < target: l = mid + 1
        else: h = mid - 1
    # Find last
    l, h = 0, len(nums) - 1
    while l <= h:
        mid = (l + h) // 2
        if nums[mid] == target:
            last = mid
            l = mid + 1
        elif nums[mid] < target: l = mid + 1
        else: h = mid - 1
    return [first, last]`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int[] result = {-1, -1};
        // First occurrence
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                result[0] = mid;
                high = mid - 1;
            } else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        // Last occurrence
        low = 0; high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                result[1] = mid;
                low = mid + 1;
            } else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return result;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function searchRange(nums, target) {
  let first = -1, last = -1;
  let l = 0, h = nums.length - 1;
  while (l <= h) {
    const mid = Math.floor((l + h) / 2);
    if (nums[mid] === target) { first = mid; h = mid - 1; }
    else if (nums[mid] < target) l = mid + 1;
    else h = mid - 1;
  }
  l = 0; h = nums.length - 1;
  while (l <= h) {
    const mid = Math.floor((l + h) / 2);
    if (nums[mid] === target) { last = mid; l = mid + 1; }
    else if (nums[mid] < target) l = mid + 1;
    else h = mid - 1;
  }
  return [first, last];
}`
        }
      ]
    }
  },
  "6_count_occurrences_of_a_number_in_a_sorted_array_with_duplicates_": {
    problemName: "Count Occurrences",
    category: "binary-search",
    description: "Given a sorted array of duplicates, find the count of occurrences of a target number.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 1, 2, 2, 2, 2, 3],
      target: 2
    },
    generateSteps: (input) => generateCountOccurrencesSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def count(arr, x):
    # Combines first & last index search
    first = findFirst(arr, x)
    if first == -1: return 0
    last = findLast(arr, x)
    return last - first + 1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    int count(int[] arr, int n, int x) {
        int first = findFirst(arr, x);
        if (first == -1) return 0;
        int last = findLast(arr, x);
        return last - first + 1;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function count(arr, x) {
  const first = findFirst(arr, x);
  if (first === -1) return 0;
  const last = findLast(arr, x);
  return last - first + 1;
}`
        }
      ]
    }
  },
  "7_find_peak_element": {
    problemName: "Find Peak Element",
    category: "binary-search",
    description: "Find an element in array that is strictly greater than its adjacent neighbors.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 1, 3, 5, 6, 4] },
    generateSteps: (input) => generatePeakElementSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def findPeakElement(nums):
    n = len(nums)
    low, high = 0, n - 1
    while low <= high:
        mid = (low + high) // 2
        # Check boundary peaks
        left = nums[mid-1] if mid > 0 else float('-inf')
        right = nums[mid+1] if mid < n - 1 else float('-inf')
        if nums[mid] > left and nums[mid] > right:
            return mid
        elif nums[mid] < right:
            low = mid + 1
        else:
            high = mid - 1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int findPeakElement(int[] nums) {
        int n = nums.length;
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            long left = mid > 0 ? nums[mid - 1] : Long.MIN_VALUE;
            long right = mid < n - 1 ? nums[mid + 1] : Long.MIN_VALUE;
            if (nums[mid] > left && nums[mid] > right) return mid;
            if (nums[mid] < right) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findPeakElement(nums) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const left = mid > 0 ? nums[mid - 1] : -Infinity;
    const right = mid < nums.length - 1 ? nums[mid + 1] : -Infinity;
    if (nums[mid] > left && nums[mid] > right) return mid;
    if (nums[mid] < right) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
        }
      ]
    }
  },
  "8_search_in_rotated_sorted_array_i": {
    problemName: "Search in Rotated Sorted I",
    category: "binary-search",
    description: "Search for a target value in a rotated sorted array with unique elements.",
    visualizerType: "array1d",
    defaultInput: {
      array: [4, 5, 6, 7, 0, 1, 2],
      target: 0
    },
    generateSteps: (input) => generateSearchRotatedSteps(input.array, input.target, false),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target: return mid
        # Left half sorted
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else: # Right half sorted
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
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
          code: `function search(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[low] <= nums[mid]) {
      if (nums[low] <= target && target < nums[mid]) high = mid - 1;
      else low = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[high]) low = mid + 1;
      else high = mid - 1;
    }
  }
  return -1;
}`
        }
      ]
    }
  },
  "9_search_in_rotated_sorted_array_ii": {
    problemName: "Search in Rotated Sorted II",
    category: "binary-search",
    description: "Search for a target value in a rotated sorted array which may contain duplicate elements.",
    visualizerType: "array1d",
    defaultInput: {
      array: [2, 5, 6, 0, 0, 1, 2],
      target: 0
    },
    generateSteps: (input) => generateSearchRotatedSteps(input.array, input.target, true),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target: return True
        # Handle duplicates boundary shrink
        if nums[low] == nums[mid] == nums[high]:
            low += 1
            high -= 1
            continue
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]: high = mid - 1
            else: low = mid + 1
        else:
            if nums[mid] < target <= nums[high]: low = mid + 1
            else: high = mid - 1
    return False`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return true;
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++; high--;
                continue;
            }
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return false;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function search(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return true;
    if (nums[low] === nums[mid] && nums[mid] === nums[high]) {
      low++; high--;
      continue;
    }
    if (nums[low] <= nums[mid]) {
      if (nums[low] <= target && target < nums[mid]) high = mid - 1;
      else low = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[high]) low = mid + 1;
      else high = mid - 1;
    }
  }
  return false;
}`
        }
      ]
    }
  },
  "10_find_minimum_in_rotated_sorted_array": {
    problemName: "Find Min in Rotated Array",
    category: "binary-search",
    description: "Locate the minimum element value in a rotated sorted array of unique elements.",
    visualizerType: "array1d",
    defaultInput: { array: [4, 5, 6, 7, 0, 1, 2] },
    generateSteps: (input) => generateFindMinRotatedSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def findMin(nums):
    low, high = 0, len(nums) - 1
    ans = float('inf')
    while low <= high:
        # Full sorted range check
        if nums[low] <= nums[high]:
            return min(ans, nums[low])
        mid = (low + high) // 2
        if nums[low] <= nums[mid]:
            ans = min(ans, nums[low])
            low = mid + 1
        else:
            ans = min(ans, nums[mid])
            high = mid - 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int findMin(int[] nums) {
        int low = 0, high = nums.length - 1;
        int ans = Integer.MAX_VALUE;
        while (low <= high) {
            if (nums[low] <= nums[high]) return Math.min(ans, nums[low]);
            int mid = low + (high - low) / 2;
            if (nums[low] <= nums[mid]) {
                ans = Math.min(ans, nums[low]);
                low = mid + 1;
            } else {
                ans = Math.min(ans, nums[mid]);
                high = mid - 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findMin(nums) {
  let low = 0, high = nums.length - 1;
  let ans = Infinity;
  while (low <= high) {
    if (nums[low] <= nums[high]) return Math.min(ans, nums[low]);
    const mid = Math.floor((low + high) / 2);
    if (nums[low] <= nums[mid]) {
      ans = Math.min(ans, nums[low]);
      low = mid + 1;
    } else {
      ans = Math.min(ans, nums[mid]);
      high = mid - 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "11_single_element_in_a_sorted_array": {
    problemName: "Single Element in Sorted",
    category: "binary-search",
    description: "Given a sorted array where every element appears twice except one, find that single unique element.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 1, 2, 3, 3, 4, 4, 8, 8] },
    generateSteps: (input) => generateSingleElementSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def singleNonDuplicate(nums):
    n = len(nums)
    if n == 1: return nums[0]
    if nums[0] != nums[1]: return nums[0]
    if nums[n-1] != nums[n-2]: return nums[n-1]
    low, high = 1, n - 2
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] != nums[mid-1] and nums[mid] != nums[mid+1]:
            return nums[mid]
        # Align even/odd checks
        if (mid % 2 == 0 and nums[mid] == nums[mid+1]) or \\
           (mid % 2 != 0 and nums[mid] == nums[mid-1]):
            low = mid + 1
        else:
            high = mid - 1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int singleNonDuplicate(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        if (nums[0] != nums[1]) return nums[0];
        if (nums[n - 1] != nums[n - 2]) return nums[n - 1];
        int low = 1, high = n - 2;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] != nums[mid - 1] && nums[mid] != nums[mid + 1]) return nums[mid];
            if ((mid % 2 == 0 && nums[mid] == nums[mid + 1]) ||
                (mid % 2 != 0 && nums[mid] == nums[mid - 1])) {
                low = mid + 1;
            } else {
                high = mid - 1;
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
          code: `function singleNonDuplicate(nums) {
  const n = nums.length;
  if (n === 1) return nums[0];
  if (nums[0] !== nums[1]) return nums[0];
  if (nums[n - 1] !== nums[n - 2]) return nums[n - 1];
  let low = 1, high = n - 2;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] !== nums[mid - 1] && nums[mid] !== nums[mid + 1]) return nums[mid];
    if ((mid % 2 === 0 && nums[mid] === nums[mid + 1]) || 
        (mid % 2 !== 0 && nums[mid] === nums[mid - 1])) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}`
        }
      ]
    }
  },
  "12_find_kth_element_of_two_sorted_arrays": {
    problemName: "Find Kth Element of Two Arrays",
    category: "binary-search",
    description: "Given two sorted arrays, find the element at K-th position in their combined sorted array representation.",
    visualizerType: "array1d",
    defaultInput: {
      array: [2, 3, 6, 7, 9],
      array2: [1, 4, 8, 10], // custom target input processed below
      target: 5 // represents 'k'
    },
    generateSteps: (input) => generateFindKthTwoArraysSteps(input.array, input.array2 || [1, 4, 8, 10], input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def kthElement(nums1, nums2, k):
    n1, n2 = len(nums1), len(nums2)
    if n1 > n2: return kthElement(nums2, nums1, k)
    low, high = max(0, k - n2), min(k, n1)
    while low <= high:
        cut1 = (low + high) // 2
        cut2 = k - cut1
        l1 = nums1[cut1-1] if cut1 > 0 else float('-inf')
        l2 = nums2[cut2-1] if cut2 > 0 else float('-inf')
        r1 = nums1[cut1] if cut1 < n1 else float('inf')
        r2 = nums2[cut2] if cut2 < n2 else float('inf')
        if l1 <= r2 and l2 <= r1:
            return max(l1, l2)
        elif l1 > r2: high = cut1 - 1
        else: low = cut1 + 1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public long kthElement(int[] nums1, int[] nums2, int k) {
        int n1 = nums1.length, n2 = nums2.length;
        if (n1 > n2) return kthElement(nums2, nums1, k);
        int low = Math.max(0, k - n2), high = Math.min(k, n1);
        while (low <= high) {
            int cut1 = (low + high) / 2;
            int cut2 = k - cut1;
            int l1 = cut1 == 0 ? Integer.MIN_VALUE : nums1[cut1 - 1];
            int l2 = cut2 == 0 ? Integer.MIN_VALUE : nums2[cut2 - 1];
            int r1 = cut1 == n1 ? Integer.MAX_VALUE : nums1[cut1];
            int r2 = cut2 == n2 ? Integer.MAX_VALUE : nums2[cut2];
            if (l1 <= r2 && l2 <= r1) return Math.max(l1, l2);
            else if (l1 > r2) high = cut1 - 1;
            else low = cut1 + 1;
        }
        return -1;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function kthElement(nums1, nums2, k) {
  const n1 = nums1.length, n2 = nums2.length;
  if (n1 > n2) return kthElement(nums2, nums1, k);
  let low = Math.max(0, k - n2), high = Math.min(k, n1);
  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = k - cut1;
    const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const r1 = cut1 === n1 ? Infinity : nums1[cut1];
    const r2 = cut2 === n2 ? Infinity : nums2[cut2];
    if (l1 <= r2 && l2 <= r1) return Math.max(l1, l2);
    else if (l1 > r2) high = cut1 - 1;
    else low = cut1 + 1;
  }
  return -1;
}`
        }
      ]
    }
  },
  "13_find_out_how_many_times_has_an_array_been_rotated": {
    problemName: "Rotation Count",
    category: "binary-search",
    description: "Determine the number of times a sorted array has been rotated cyclic rightward.",
    visualizerType: "array1d",
    defaultInput: { array: [4, 5, 6, 7, 0, 1, 2] },
    generateSteps: (input) => generateRotationCountSteps(input.array),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def findKRotation(arr):
    # Same as finding index of minimum element
    low, high = 0, len(arr) - 1
    ans = float('inf')
    index = -1
    while low <= high:
        if arr[low] <= arr[high]:
            if arr[low] < ans:
                index = low
            break
        mid = (low + high) // 2
        if arr[low] <= arr[mid]:
            if arr[low] < ans:
                ans = arr[low]
                index = low
            low = mid + 1
        else:
            if arr[mid] < ans:
                ans = arr[mid]
                index = mid
            high = mid - 1
    return index`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    int findKRotation(int arr[], int n) {
        int low = 0, high = n - 1;
        int ans = Integer.MAX_VALUE;
        int index = -1;
        while (low <= high) {
            if (arr[low] <= arr[high]) {
                if (arr[low] < ans) index = low;
                break;
            }
            int mid = low + (high - low) / 2;
            if (arr[low] <= arr[mid]) {
                if (arr[low] < ans) {
                    ans = arr[low];
                    index = low;
                }
                low = mid + 1;
            } else {
                if (arr[mid] < ans) {
                    ans = arr[mid];
                    index = mid;
                }
                high = mid - 1;
            }
        }
        return index;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findKRotation(arr) {
  let low = 0, high = arr.length - 1;
  let ans = Infinity;
  let index = -1;
  while (low <= high) {
    if (arr[low] <= arr[high]) {
      if (arr[low] < ans) index = low;
      break;
    }
    const mid = Math.floor((low + high) / 2);
    if (arr[low] <= arr[mid]) {
      if (arr[low] < ans) {
        ans = arr[low];
        index = low;
      }
      low = mid + 1;
    } else {
      if (arr[mid] < ans) {
        ans = arr[mid];
        index = mid;
      }
      high = mid - 1;
    }
  }
  return index;
}`
        }
      ]
    }
  },
  "0_search_in_a_2d_matrix_": {
    problemName: "Search in 2D Matrix",
    category: "binary-search",
    description: "Search for a target value in an m x n 2D integer matrix where rows and columns are sorted.",
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
          label: "Efficient",
          code: `def searchMatrix(matrix, target):
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
        int R = matrix.length, C = matrix[0].length;
        int low = 0, high = R * C - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int val = matrix[mid / C][mid % C];
            if (val == target) return true;
            else if (val < target) low = mid + 1;
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
  const R = matrix.length, C = matrix[0].length;
  let low = 0, high = R * C - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const val = matrix[Math.floor(mid / C)][mid % C];
    if (val === target) return true;
    else if (val < target) low = mid + 1;
    else high = mid - 1;
  }
  return false;
}`
        }
      ]
    }
  },
  "1_find_peak_element_": {
    problemName: "Find Peak Element 2D",
    category: "binary-search",
    description: "Find a peak element in a 2D grid matrix where peak is greater than or equal to adjacent elements.",
    visualizerType: "matrix2d",
    defaultInput: {
      grid: [
        [1, 4, 3, 2],
        [9, 3, 8, 2],
        [2, 4, 6, 1]
      ]
    },
    generateSteps: (input) => generateFindPeak2DSteps(input.grid),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def findPeakGrid(matrix):
    R, C = len(matrix), len(matrix[0])
    lowCol, highCol = 0, C - 1
    while lowCol <= highCol:
        midCol = (lowCol + highCol) // 2
        # Find max element in midCol column
        maxRow = 0
        for r in range(R):
            if matrix[r][midCol] > matrix[maxRow][midCol]:
                maxRow = r
        val = matrix[maxRow][midCol]
        left = matrix[maxRow][midCol-1] if midCol > 0 else -1
        right = matrix[maxRow][midCol+1] if midCol < C - 1 else -1
        if val >= left and val >= right:
            return [maxRow, midCol]
        elif val < left: highCol = midCol - 1
        else: lowCol = midCol + 1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int[] findPeakGrid(int[][] matrix) {
        int R = matrix.length, C = matrix[0].length;
        int lowCol = 0, highCol = C - 1;
        while (lowCol <= highCol) {
            int midCol = lowCol + (highCol - lowCol) / 2;
            int maxRow = 0;
            for (int r = 0; r < R; r++) {
                if (matrix[r][midCol] > matrix[maxRow][midCol]) maxRow = r;
            }
            int val = matrix[maxRow][midCol];
            int left = midCol > 0 ? matrix[maxRow][midCol - 1] : -1;
            int right = midCol < C - 1 ? matrix[maxRow][midCol + 1] : -1;
            if (val >= left && val >= right) return new int[]{maxRow, midCol};
            if (val < left) highCol = midCol - 1;
            else lowCol = midCol + 1;
        }
        return new int[]{-1, -1};
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findPeakGrid(matrix) {
  const R = matrix.length, C = matrix[0].length;
  let lowCol = 0, highCol = C - 1;
  while (lowCol <= highCol) {
    const midCol = Math.floor((lowCol + highCol) / 2);
    let maxRow = 0;
    for (let r = 0; r < R; r++) {
      if (matrix[r][midCol] > matrix[maxRow][midCol]) maxRow = r;
    }
    const val = matrix[maxRow][midCol];
    const left = midCol > 0 ? matrix[maxRow][midCol - 1] : -1;
    const right = midCol < C - 1 ? matrix[maxRow][midCol + 1] : -1;
    if (val >= left && val >= right) return [maxRow, midCol];
    if (val < left) highCol = midCol - 1;
    else lowCol = midCol + 1;
  }
  return [-1, -1];
}`
        }
      ]
    }
  },
  "2_matrix_median": {
    problemName: "Matrix Median",
    category: "binary-search",
    description: "Find the median element in a row-wise sorted 2D matrix.",
    visualizerType: "matrix2d",
    defaultInput: {
      grid: [
        [1, 3, 5],
        [2, 6, 9],
        [3, 6, 9]
      ]
    },
    generateSteps: (input) => generateMatrixMedianSteps(input.grid),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def median(matrix, r, c):
    low = min(matrix[i][0] for i in range(r))
    high = max(matrix[i][c-1] for i in range(r))
    target = (r * c) // 2 + 1
    while low <= high:
        mid = (low + high) // 2
        # Count elements <= mid
        count = sum(bisect.bisect_right(matrix[i], mid) for i in range(r))
        if count < target: low = mid + 1
        else: high = mid - 1
    return low`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    int median(int matrix[][], int R, int C) {
        int low = Integer.MAX_VALUE, high = Integer.MIN_VALUE;
        for (int i = 0; i < R; i++) {
            low = Math.min(low, matrix[i][0]);
            high = Math.max(high, matrix[i][C - 1]);
        }
        int target = (R * C) / 2 + 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int count = 0;
            for (int i = 0; i < R; i++) {
                count += countLessEqual(matrix[i], mid);
            }
            if (count < target) low = mid + 1;
            else high = mid - 1;
        }
        return low;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function median(matrix) {
  const R = matrix.length, C = matrix[0].length;
  let low = Infinity, high = -Infinity;
  for (let i = 0; i < R; i++) {
    low = Math.min(low, matrix[i][0]);
    high = Math.max(high, matrix[i][C - 1]);
  }
  const target = Math.floor((R * C) / 2) + 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let count = 0;
    for (let i = 0; i < R; i++) {
      count += countLessEqual(matrix[i], mid);
    }
    if (count < target) low = mid + 1;
    else high = mid - 1;
  }
  return low;
}`
        }
      ]
    }
  },
  "0_find_square_root_of_a_number_in_log_n": {
    problemName: "Square Root of Number",
    category: "binary-search",
    description: "Compute the floor square root of an integer N using binary search.",
    visualizerType: "array1d",
    defaultInput: { target: 36 },
    generateSteps: (input) => generateSqrtSteps(input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def floorSqrt(n):
    low, high = 1, n
    ans = 0
    while low <= high:
        mid = (low + high) // 2
        if mid * mid <= n:
            ans = mid
            low = mid + 1
        else:
            high = mid - 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    long floorSqrt(long n) {
        long low = 1, high = n;
        long ans = 0;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (mid * mid <= n) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function floorSqrt(n) {
  let low = 1, high = n;
  let ans = 0;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (mid * mid <= n) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "1_find_the_nth_root_of_a_number_using_binary_search": {
    problemName: "Nth Root of Number",
    category: "binary-search",
    description: "Find the exact integer Nth root of M if it exists, otherwise return -1.",
    visualizerType: "array1d",
    defaultInput: {
      array: [3], // n
      target: 27 // m
    },
    generateSteps: (input) => generateNthRootSteps(input.array[0], input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def NthRoot(n, m):
    low, high = 1, m
    while low <= high:
        mid = (low + high) // 2
        mid_pow = mid ** n
        if mid_pow == m:
            return mid
        elif mid_pow < m:
            low = mid + 1
        else:
            high = mid - 1
    return -1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int NthRoot(int n, int m) {
        int low = 1, high = m;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            double val = Math.pow(mid, n);
            if (val == m) return mid;
            else if (val < m) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function NthRoot(n, m) {
  let low = 1, high = m;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const val = Math.pow(mid, n);
    if (val === m) return mid;
    else if (val < m) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
        }
      ]
    }
  },
  "2_koko_eating_bananas": {
    problemName: "Koko Eating Bananas",
    category: "binary-search",
    description: "Determine the minimum speed K (bananas/hour) to eat all piles within H hours.",
    visualizerType: "array1d",
    defaultInput: {
      array: [3, 6, 7, 11],
      target: 8 // h
    },
    generateSteps: (input) => generateKokoSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def minEatingSpeed(piles, h):
    low, high = 1, max(piles)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        # Calculate hours needed at mid speed
        hours = sum(math.ceil(p / mid) for p in piles)
        if hours <= h:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1, high = 0;
        for (int p : piles) high = Math.max(high, p);
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int hours = 0;
            for (int p : piles) hours += Math.ceil((double) p / mid);
            if (hours <= h) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function minEatingSpeed(piles, h) {
  let low = 1, high = Math.max(...piles);
  let ans = high;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let hours = 0;
    for (let p of piles) hours += Math.ceil(p / mid);
    if (hours <= h) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "3_minimum_days_to_make_m_bouquets": {
    problemName: "Bouquets Bloom Day",
    category: "binary-search",
    description: "Find the minimum days to bloom flowers to formulate M bouquets of size K.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 10, 3, 10, 2],
      target: 3 // m
    },
    generateSteps: (input) => generateBloomDaySteps(input.array, input.target, 2), // custom size k=2
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def minDays(bloomDay, m, k):
    if len(bloomDay) < m * k: return -1
    low, high = min(bloomDay), max(bloomDay)
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if canMake(bloomDay, m, k, mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        if ((long) m * k > bloomDay.length) return -1;
        int low = Integer.MAX_VALUE, high = Integer.MIN_VALUE;
        for (int day : bloomDay) {
            low = Math.min(low, day);
            high = Math.max(high, day);
        }
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canMake(bloomDay, m, k, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function minDays(bloomDay, m, k) {
  if (bloomDay.length < m * k) return -1;
  let low = Math.min(...bloomDay), high = Math.max(...bloomDay);
  let ans = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canMake(bloomDay, m, k, mid)) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "4_find_the_smallest_divisor": {
    problemName: "Smallest Divisor",
    category: "binary-search",
    description: "Find the smallest positive integer divisor such that the sum of division results <= threshold.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 2, 5, 9],
      target: 6 // threshold
    },
    generateSteps: (input) => generateSmallestDivisorSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def smallestDivisor(nums, threshold):
    low, high = 1, max(nums)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        sum_val = sum(math.ceil(n / mid) for n in nums)
        if sum_val <= threshold:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int smallestDivisor(int[] nums, int threshold) {
        int low = 1, high = 0;
        for (int n : nums) high = Math.max(high, n);
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int sum = 0;
            for (int n : nums) sum += Math.ceil((double) n / mid);
            if (sum <= threshold) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function smallestDivisor(nums, threshold) {
  let low = 1, high = Math.max(...nums);
  let ans = high;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let sum = 0;
    for (let n of nums) sum += Math.ceil(n / mid);
    if (sum <= threshold) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "5_capacity_to_ship_packages_within_d_days": {
    problemName: "Shipping Capacity",
    category: "binary-search",
    description: "Find the minimum weight capacity of a ship that will result in shipping all packages within D days.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      target: 5 // days
    },
    generateSteps: (input) => generateShipCapacitySteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def shipWithinDays(weights, days):
    low, high = max(weights), sum(weights)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        if canShip(weights, days, mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int low = 0, high = 0;
        for (int w : weights) {
            low = Math.max(low, w);
            high += w;
        }
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canShip(weights, days, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function shipWithinDays(weights, days) {
  let low = Math.max(...weights);
  let high = weights.reduce((a, b) => a + b, 0);
  let ans = high;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canShip(weights, days, mid)) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "6_median_of_two_sorted_arrays": {
    problemName: "Median of Two Sorted",
    category: "binary-search",
    description: "Given two sorted arrays, return the median value in O(log (m+n)) runtime.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 3, 8],
      array2: [7, 9, 10, 11] // Target median check helper
    },
    generateSteps: (input) => generateFindKthTwoArraysSteps(input.array, input.array2 || [7, 9, 10, 11], Math.floor((input.array.length + (input.array2?.length || 4)) / 2) + 1),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def findMedianSortedArrays(nums1, nums2):
    n1, n2 = len(nums1), len(nums2)
    if n1 > n2: return findMedianSortedArrays(nums2, nums1)
    low, high = 0, n1
    while low <= high:
        cut1 = (low + high) // 2
        cut2 = (n1 + n2 + 1) // 2 - cut1
        l1 = nums1[cut1-1] if cut1 > 0 else float('-inf')
        l2 = nums2[cut2-1] if cut2 > 0 else float('-inf')
        r1 = nums1[cut1] if cut1 < n1 else float('inf')
        r2 = nums2[cut2] if cut2 < n2 else float('inf')
        if l1 <= r2 and l2 <= r1:
            if (n1 + n2) % 2 == 0:
                return (max(l1, l2) + min(r1, r2)) / 2.0
            return max(l1, l2)
        elif l1 > r2: high = cut1 - 1
        else: low = cut1 + 1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int n1 = nums1.length, n2 = nums2.length;
        if (n1 > n2) return findMedianSortedArrays(nums2, nums1);
        int low = 0, high = n1;
        while (low <= high) {
            int cut1 = (low + high) / 2;
            int cut2 = (n1 + n2 + 1) / 2 - cut1;
            int l1 = cut1 == 0 ? Integer.MIN_VALUE : nums1[cut1 - 1];
            int l2 = cut2 == 0 ? Integer.MIN_VALUE : nums2[cut2 - 1];
            int r1 = cut1 == n1 ? Integer.MAX_VALUE : nums1[cut1];
            int r2 = cut2 == n2 ? Integer.MAX_VALUE : nums2[cut2];
            if (l1 <= r2 && l2 <= r1) {
                if ((n1 + n2) % 2 == 0) return (Math.max(l1, l2) + Math.min(r1, r2)) / 2.0;
                else return Math.max(l1, l2);
            } else if (l1 > r2) high = cut1 - 1;
            else low = cut1 + 1;
        }
        return 0.0;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findMedianSortedArrays(nums1, nums2) {
  const n1 = nums1.length, n2 = nums2.length;
  if (n1 > n2) return findMedianSortedArrays(nums2, nums1);
  let low = 0, high = n1;
  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = Math.floor((n1 + n2 + 1) / 2) - cut1;
    const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const r1 = cut1 === n1 ? Infinity : nums1[cut1];
    const r2 = cut2 === n2 ? Infinity : nums2[cut2];
    if (l1 <= r2 && l2 <= r1) {
      if ((n1 + n2) % 2 === 0) return (Math.max(l1, l2) + Math.min(r1, r2)) / 2.0;
      else return Math.max(l1, l2);
    } else if (l1 > r2) high = cut1 - 1;
    else low = cut1 + 1;
  }
  return 0.0;
}`
        }
      ]
    }
  },
  "7_aggressive_cows": {
    problemName: "Aggressive Cows",
    category: "binary-search",
    description: "Find the largest minimum distance possible between cows placed in sorted stall positions.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 2, 8, 4, 9], // stall coords
      target: 3 // cows
    },
    generateSteps: (input) => generateAggressiveCowsSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def solve(n, k, stalls):
    stalls.sort()
    low, high = 1, stalls[-1] - stalls[0]
    ans = 0
    while low <= high:
        mid = (low + high) // 2
        if canPlace(stalls, k, mid):
            ans = mid
            low = mid + 1
        else:
            high = mid - 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public static int solve(int n, int k, int[] stalls) {
        Arrays.sort(stalls);
        int low = 1, high = stalls[n - 1] - stalls[0];
        int ans = 0;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canPlace(stalls, k, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function solve(stalls, k) {
  stalls.sort((a, b) => a - b);
  let low = 1, high = stalls[stalls.length - 1] - stalls[0];
  let ans = 0;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canPlace(stalls, k, mid)) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "8_book_allocation_problem": {
    problemName: "Book Allocation",
    category: "binary-search",
    description: "Allocate books to M students such that the maximum pages allocated to a student is minimized.",
    visualizerType: "array1d",
    defaultInput: {
      array: [12, 34, 67, 90],
      target: 2 // students
    },
    generateSteps: (input) => generateBookAllocationSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def findPages(arr, n, m):
    if m > n: return -1
    low, high = max(arr), sum(arr)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        if isPossible(arr, m, mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public static int findPages(int[] arr, int n, int m) {
        if (m > n) return -1;
        int low = 0, high = 0;
        for (int pages : arr) {
            low = Math.max(low, pages);
            high += pages;
        }
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (isPossible(arr, m, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findPages(arr, m) {
  if (m > arr.length) return -1;
  let low = Math.max(...arr), high = arr.reduce((a, b) => a + b, 0);
  let ans = high;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (isPossible(arr, m, mid)) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "9_split_array_–_largest_sum": {
    problemName: "Split Array Largest Sum",
    category: "binary-search",
    description: "Split array into K subarrays such that the minimized maximum sum of any subarray is obtained.",
    visualizerType: "array1d",
    defaultInput: {
      array: [7, 2, 5, 10, 8],
      target: 2 // k split size
    },
    generateSteps: (input) => generateBookAllocationSteps(input.array, input.target), // Same constraint allocation logic
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def splitArray(nums, k):
    low, high = max(nums), sum(nums)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        if canSplit(nums, k, mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int splitArray(int[] nums, int k) {
        int low = 0, high = 0;
        for (int n : nums) {
            low = Math.max(low, n);
            high += n;
        }
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canSplit(nums, k, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function splitArray(nums, k) {
  let low = Math.max(...nums), high = nums.reduce((a, b) => a + b, 0);
  let ans = high;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canSplit(nums, k, mid)) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}`
        }
      ]
    }
  },
  "10_kth_missing_positive_number": {
    problemName: "Kth Missing Positive",
    category: "binary-search",
    description: "Given a sorted array of positive integers, locate the K-th positive integer missing from the array.",
    visualizerType: "array1d",
    defaultInput: {
      array: [2, 3, 4, 7, 11],
      target: 5 // k
    },
    generateSteps: (input) => generateKthMissingPositiveSteps(input.array, input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def findKthPositive(arr, k):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        missing = arr[mid] - (mid + 1)
        if missing < k:
            low = mid + 1
        else:
            high = mid - 1
    return low + k`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int findKthPositive(int[] arr, int k) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int missing = arr[mid] - (mid + 1);
            if (missing < k) low = mid + 1;
            else high = mid - 1;
        }
        return low + k;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findKthPositive(arr, k) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const missing = arr[mid] - (mid + 1);
    if (missing < k) low = mid + 1;
    else high = mid - 1;
  }
  return low + k;
}`
        }
      ]
    }
  },
  "11_minimize_max_distance_to_gas_station": {
    problemName: "Minimize Gas Distance",
    category: "binary-search",
    description: "Add K gas stations such that the maximum distance between adjacent gas stations is minimized.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      target: 9 // k
    },
    generateSteps: (input) => generateKokoSteps(input.array, input.target), // Maps to eating divisor logic bounds
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def findSmallestMaxDist(stations, k):
    low = 0
    high = max(stations[i+1] - stations[i] for i in range(len(stations)-1))
    # Float binary search
    while high - low > 1e-6:
        mid = (low + high) / 2.0
        if canPlace(stations, k, mid):
            high = mid
        else:
            low = mid
    return high`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public static double findSmallestMaxDist(int stations[], int k) {
        double low = 0;
        double high = 0;
        for (int i = 0; i < stations.length - 1; i++) {
            high = Math.max(high, stations[i+1] - stations[i]);
        }
        while (high - low > 1e-6) {
            double mid = low + (high - low) / 2.0;
            if (canPlace(stations, k, mid)) high = mid;
            else low = mid;
        }
        return high;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findSmallestMaxDist(stations, k) {
  let low = 0, high = 0;
  for (let i = 0; i < stations.length - 1; i++) {
    high = Math.max(high, stations[i+1] - stations[i]);
  }
  while (high - low > 1e-6) {
    const mid = (low + high) / 2.0;
    if (canPlace(stations, k, mid)) high = mid;
    else low = mid;
  }
  return high;
}`
        }
      ]
    }
  },
  "12_median_of_2_sorted_arrays": {
    problemName: "Median of Two Sorted",
    category: "binary-search",
    description: "Given two sorted arrays, return the median value in O(log (m+n)) runtime.",
    visualizerType: "array1d",
    defaultInput: {
      array: [1, 3, 8],
      array2: [7, 9, 10, 11]
    },
    generateSteps: (input) => generateFindKthTwoArraysSteps(input.array, input.array2 || [7, 9, 10, 11], Math.floor((input.array.length + (input.array2?.length || 4)) / 2) + 1),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def findMedianSortedArrays(nums1, nums2):
    n1, n2 = len(nums1), len(nums2)
    if n1 > n2: return findMedianSortedArrays(nums2, nums1)
    low, high = 0, n1
    while low <= high:
        cut1 = (low + high) // 2
        cut2 = (n1 + n2 + 1) // 2 - cut1
        l1 = nums1[cut1-1] if cut1 > 0 else float('-inf')
        l2 = nums2[cut2-1] if cut2 > 0 else float('-inf')
        r1 = nums1[cut1] if cut1 < n1 else float('inf')
        r2 = nums2[cut2] if cut2 < n2 else float('inf')
        if l1 <= r2 and l2 <= r1:
            if (n1 + n2) % 2 == 0:
                return (max(l1, l2) + min(r1, r2)) / 2.0
            return max(l1, l2)
        elif l1 > r2: high = cut1 - 1
        else: low = cut1 + 1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int n1 = nums1.length, n2 = nums2.length;
        if (n1 > n2) return findMedianSortedArrays(nums2, nums1);
        int low = 0, high = n1;
        while (low <= high) {
            int cut1 = (low + high) / 2;
            int cut2 = (n1 + n2 + 1) / 2 - cut1;
            int l1 = cut1 == 0 ? Integer.MIN_VALUE : nums1[cut1 - 1];
            int l2 = cut2 == 0 ? Integer.MIN_VALUE : nums2[cut2 - 1];
            int r1 = cut1 == n1 ? Integer.MAX_VALUE : nums1[cut1];
            int r2 = cut2 == n2 ? Integer.MAX_VALUE : nums2[cut2];
            if (l1 <= r2 && l2 <= r1) {
                if ((n1 + n2) % 2 == 0) return (Math.max(l1, l2) + Math.min(r1, r2)) / 2.0;
                else return Math.max(l1, l2);
            } else if (l1 > r2) high = cut1 - 1;
            else low = cut1 + 1;
        }
        return 0.0;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findMedianSortedArrays(nums1, nums2) {
  const n1 = nums1.length, n2 = nums2.length;
  if (n1 > n2) return findMedianSortedArrays(nums2, nums1);
  let low = 0, high = n1;
  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = Math.floor((n1 + n2 + 1) / 2) - cut1;
    const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const r1 = cut1 === n1 ? Infinity : nums1[cut1];
    const r2 = cut2 === n2 ? Infinity : nums2[cut2];
    if (l1 <= r2 && l2 <= r1) {
      if ((n1 + n2) % 2 === 0) return (Math.max(l1, l2) + Math.min(r1, r2)) / 2.0;
      else return Math.max(l1, l2);
    } else if (l1 > r2) high = cut1 - 1;
    else low = cut1 + 1;
  }
  return 0.0;
}`
        }
      ]
    }
  },
  "13_kth_element_of_2_sorted_arrays": {
    problemName: "Find Kth Element of Two Arrays",
    category: "binary-search",
    description: "Given two sorted arrays, find the element at K-th position in their combined sorted array representation.",
    visualizerType: "array1d",
    defaultInput: {
      array: [2, 3, 6, 7, 9],
      array2: [1, 4, 8, 10],
      target: 5
    },
    generateSteps: (input) => generateFindKthTwoArraysSteps(input.array, input.array2 || [1, 4, 8, 10], input.target),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def kthElement(nums1, nums2, k):
    n1, n2 = len(nums1), len(nums2)
    if n1 > n2: return kthElement(nums2, nums1, k)
    low, high = max(0, k - n2), min(k, n1)
    while low <= high:
        cut1 = (low + high) // 2
        cut2 = k - cut1
        l1 = nums1[cut1-1] if cut1 > 0 else float('-inf')
        l2 = nums2[cut2-1] if cut2 > 0 else float('-inf')
        r1 = nums1[cut1] if cut1 < n1 else float('inf')
        r2 = nums2[cut2] if cut2 < n2 else float('inf')
        if l1 <= r2 and l2 <= r1:
            return max(l1, l2)
        elif l1 > r2: high = cut1 - 1
        else: low = cut1 + 1`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public long kthElement(int[] nums1, int[] nums2, int k) {
        int n1 = nums1.length, n2 = nums2.length;
        if (n1 > n2) return kthElement(nums2, nums1, k);
        int low = Math.max(0, k - n2), high = Math.min(k, n1);
        while (low <= high) {
            int cut1 = (low + high) / 2;
            int cut2 = k - cut1;
            int l1 = cut1 == 0 ? Integer.MIN_VALUE : nums1[cut1 - 1];
            int l2 = cut2 == 0 ? Integer.MIN_VALUE : nums2[cut2 - 1];
            int r1 = cut1 == n1 ? Integer.MAX_VALUE : nums1[cut1];
            int r2 = cut2 == n2 ? Integer.MAX_VALUE : nums2[cut2];
            if (l1 <= r2 && l2 <= r1) return Math.max(l1, l2);
            else if (l1 > r2) high = cut1 - 1;
            else low = cut1 + 1;
        }
        return -1;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function kthElement(nums1, nums2, k) {
  const n1 = nums1.length, n2 = nums2.length;
  if (n1 > n2) return kthElement(nums2, nums1, k);
  let low = Math.max(0, k - n2), high = Math.min(k, n1);
  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = k - cut1;
    const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const r1 = cut1 === n1 ? Infinity : nums1[cut1];
    const r2 = cut2 === n2 ? Infinity : nums2[cut2];
    if (l1 <= r2 && l2 <= r1) return Math.max(l1, l2);
    else if (l1 > r2) high = cut1 - 1;
    else low = cut1 + 1;
  }
  return -1;
}`
        }
      ]
    }
  }
};
