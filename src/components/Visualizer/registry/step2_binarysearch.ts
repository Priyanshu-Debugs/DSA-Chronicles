import { ProblemVisualizerMeta } from "../visualizerRegistry";
import { generateBinarySearchSteps } from "../problems/BinarySearchVisualizer";

// Helper Interface for binary search steps
export interface BinarySearchSimulationStep {
  nums: number[];
  low: number;
  high: number;
  mid: number;
  target: number;
  state: "searching" | "found" | "not_found";
  description: string;
  variables: Record<string, any>;
  codeLineMap: Record<string, number>;
}

// Custom step generator for Binary Search variants (Lower Bound, Upper Bound, Search Insert)
export function generateBsVariantSteps(
  nums: number[],
  target: number,
  variant: "lower" | "upper" | "insert"
): BinarySearchSimulationStep[] {
  const steps: BinarySearchSimulationStep[] = [];
  let low = 0;
  let high = nums.length - 1;
  let ans = nums.length;

  steps.push({
    nums,
    low,
    high,
    mid: -1,
    target,
    state: "searching",
    description: `Initialize binary search bounds: low = 0, high = ${high}. Default answer index is set to array length (${ans}).`,
    variables: { answer: ans },
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
      nums,
      low,
      high,
      mid,
      target,
      state: "searching",
      description: `Calculate mid = (${low} + ${high}) / 2 = ${mid} (value: ${midVal}). Compare mid value with target ${target}.`,
      variables: { answer: ans, mid_value: midVal },
      codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
    });

    if (conditionMet) {
      ans = mid;
      high = mid - 1;
      steps.push({
        nums,
        low,
        high,
        mid,
        target,
        state: "searching",
        description: `Condition met (${midVal} ${variant === "upper" ? ">" : ">="} ${target}). Potential answer found at index ${mid}. Shrink search space by moving high to mid - 1 = ${high}.`,
        variables: { answer: ans, mid_value: midVal },
        codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
      });
    } else {
      low = mid + 1;
      steps.push({
        nums,
        low,
        high,
        mid,
        target,
        state: "searching",
        description: `Condition NOT met (${midVal} is smaller). Search in the right half by moving low to mid + 1 = ${low}.`,
        variables: { answer: ans, mid_value: midVal },
        codeLineMap: { "python-efficient": 7, "java-optimal": 8, "javascript-optimal": 7 }
      });
    }
  }

  steps.push({
    nums,
    low: -1,
    high: -1,
    mid: -1,
    target,
    state: "found",
    description: `Search space is empty. Binary search complete. Return index answer = ${ans}.`,
    variables: { answer: ans },
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
    # Space complexity: O(1)
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
    # Easy recursion with helper function
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
    # Extremely compact binary search structure
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
  }
};
