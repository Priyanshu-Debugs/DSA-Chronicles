import { combinedRegistry } from "./registry";
import { generateLinkedListSteps } from "./problems/LinkedListVisualizer";
import { generateSpiralMatrixSteps } from "./problems/SpiralMatrixVisualizer";
import { generateAnagramSteps } from "./problems/AnagramVisualizer";

export interface LanguageCode {
  label: string;
  code: string;
}

export interface ProblemVisualizerMeta {
  problemName: string;
  category: "arrays" | "binary-search" | "strings" | "linked-list" | "recursion" | "two-pointers";
  description: string;
  visualizerType: "array1d" | "matrix2d" | "linkedlist" | "stringmap" | "recursion";
  solutions: {
    javascript: LanguageCode[];
    python: LanguageCode[];
    java: LanguageCode[];
  };
  defaultInput: any;
  generateSteps: (input: any) => any[];
}

// DYNAMIC UNIVERSAL FALLBACK REGISTRY GENERATOR
export function getProblemMeta(problemId: string, problemName: string): ProblemVisualizerMeta {
  if (combinedRegistry[problemId]) {
    return combinedRegistry[problemId];
  }

  // Determine Visual Archetype
  let visualizerType: "array1d" | "matrix2d" | "linkedlist" | "stringmap" | "recursion" = "array1d";
  let category: "arrays" | "binary-search" | "strings" | "linked-list" | "recursion" | "two-pointers" = "arrays";
  const normalizedId = problemId.toLowerCase();
  const normalizedName = problemName.toLowerCase();

  if (
    normalizedId.includes("step-5") ||
    normalizedId.includes("recursion") ||
    normalizedName.includes("recursion") ||
    normalizedName.includes("atoi") ||
    normalizedName.includes("subsequence") ||
    normalizedName.includes("subset") ||
    normalizedName.includes("queen") ||
    normalizedName.includes("maze") ||
    normalizedName.includes("sudoku")
  ) {
    visualizerType = "recursion";
    category = "recursion";
  } else if (
    normalizedId.includes("step-4") ||
    normalizedId.includes("linkedlist") ||
    normalizedId.includes("dll") ||
    normalizedName.includes("linked list") ||
    normalizedName.includes("node") ||
    normalizedName.includes("dll")
  ) {
    visualizerType = "linkedlist";
    category = "linked-list";
  } else if (
    normalizedName.includes("matrix") ||
    normalizedName.includes("grid") ||
    normalizedName.includes("2d") ||
    normalizedName.includes("zeros")
  ) {
    visualizerType = "matrix2d";
    category = "arrays";
  } else if (
    normalizedId.includes("step-3") ||
    normalizedId.includes("step-7") ||
    normalizedName.includes("string") ||
    normalizedName.includes("char") ||
    normalizedName.includes("word") ||
    normalizedName.includes("palindrome") ||
    normalizedName.includes("anagram")
  ) {
    visualizerType = "stringmap";
    category = "strings";
  } else if (
    normalizedId.includes("step-2") ||
    normalizedName.includes("search") ||
    normalizedName.includes("bound") ||
    normalizedName.includes("koko")
  ) {
    visualizerType = "array1d";
    category = "binary-search";
  }

  // Create Default Inputs
  let defaultInput: any = { array: [10, 20, 30, 40, 50] };
  if (visualizerType === "matrix2d") {
    defaultInput = {
      grid: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    };
  } else if (visualizerType === "stringmap") {
    defaultInput = { s: "code", t: "docs" };
  } else if (visualizerType === "recursion") {
    defaultInput = { array: [3] }; // representing stack depth n=3
  }

  // Create Universal Step Generator
  const generateSteps = (input: any): any[] => {
    const steps: any[] = [];

    if (visualizerType === "recursion") {
      const depth = input.array ? input.array[0] : 3;
      const stack: string[] = [];

      // Grow Stack
      for (let i = depth; i >= 0; i--) {
        stack.push(`solve(n=${i})`);
        steps.push({
          stack: [...stack],
          variables: { current_n: i, is_base_case: i === 0 ? "True" : "False" },
          description:
            i === 0
              ? `Recursion base case reached for solve(n=0). Returning base result.`
              : `Recursion depth: calling solve(n=${i}). Push new execution scope onto the stack.`,
          codeLine: i === 0 ? 5 : 3,
        });
      }

      // Pop Stack / Backtrack
      while (stack.length > 1) {
        const popped = stack.pop();
        const nextTop = stack[stack.length - 1];
        steps.push({
          stack: [...stack],
          result: 1,
          variables: { return_from: popped, current_scope: nextTop },
          description: `Backtracking: completed ${popped}. Returning output and popping scope off call stack.`,
          codeLine: 7,
        });
      }
    } else if (visualizerType === "linkedlist") {
      const arr = input.array || [1, 2, 3, 4, 5];
      const nodes = arr.map((val: any, idx: number) => ({
        id: idx,
        val,
        nextId: idx === arr.length - 1 ? null : idx + 1,
      }));
      const links: Record<number, number | null> = {};
      nodes.forEach((n: any) => {
        links[n.id] = n.nextId;
      });

      steps.push({
        nodes,
        pointers: { head: 0, curr: 0 },
        links: { ...links },
        problemType:
          normalizedName.includes("double") || normalizedName.includes("dll") ? "dll" : "reverse",
        description: `Start Linked List traversal for '${problemName}' from Head. Initialize current pointer.`,
        codeLine: 2,
      });

      for (let i = 1; i < nodes.length; i++) {
        steps.push({
          nodes,
          pointers: { head: 0, curr: i },
          links: { ...links },
          problemType:
            normalizedName.includes("double") || normalizedName.includes("dll") ? "dll" : "reverse",
          description: `Traversing: move current pointer forward to Node index ${i} (value: ${nodes[i].val}).`,
          codeLine: 4,
        });
      }

      steps.push({
        nodes,
        pointers: { head: 0, curr: null },
        links: { ...links },
        problemType:
          normalizedName.includes("double") || normalizedName.includes("dll") ? "dll" : "reverse",
        description: `Traversal complete. Reached NULL end of the Linked List.`,
        codeLine: 6,
      });
    } else if (visualizerType === "matrix2d") {
      const grid = input.grid || [
        [1, 2],
        [3, 4],
      ];
      const R = grid.length;
      const C = grid[0].length;
      const visited = Array.from({ length: R }, () => Array(C).fill(false));
      const res: number[] = [];

      steps.push({
        grid,
        visited: visited.map((row) => [...row]),
        currentRow: -1,
        currentCol: -1,
        top: 0,
        bottom: R - 1,
        left: 0,
        right: C - 1,
        result: [],
        description: `Initialize 2D grid matrix scan boundaries for '${problemName}'.`,
        codeLine: 2,
      });

      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
          visited[r][c] = true;
          res.push(grid[r][c]);
          steps.push({
            grid,
            visited: visited.map((row) => [...row]),
            currentRow: r,
            currentCol: c,
            top: 0,
            bottom: R - 1,
            left: 0,
            right: C - 1,
            result: [...res],
            description: `Scanning grid element at [row: ${r}, col: ${c}] = ${grid[r][c]}. Add to processed queue.`,
            codeLine: 4,
          });
        }
      }
    } else if (visualizerType === "stringmap") {
      const s = input.s || "input";
      const t = input.t || "trace";
      const freq: Record<string, number> = {};

      steps.push({
        s,
        t,
        sIndex: -1,
        tIndex: -1,
        freqMap: { ...freq },
        state: "scanning_s",
        description: `Start character sequence analysis for '${problemName}'. Process String S: "${s}".`,
        codeLine: 2,
      });

      for (let i = 0; i < s.length; i++) {
        freq[s[i]] = (freq[s[i]] || 0) + 1;
        steps.push({
          s,
          t,
          sIndex: i,
          tIndex: -1,
          freqMap: { ...freq },
          state: "scanning_s",
          description: `Processing S: read character '${s[i]}' at index ${i}. Increment frequency counters.`,
          codeLine: 4,
        });
      }
    } else {
      // Default array1d traversal simulation
      const arr = input.array || [10, 20, 30, 40];
      const target = input.target;
      const highlights: Record<number, any> = {};

      steps.push({
        array: arr,
        pointers: { curr: 0 },
        highlights: { ...highlights },
        variables: { current_value: arr[0], target_searched: target !== undefined ? target : "N/A" },
        target,
        description: `Start linear visual scan of elements for '${problemName}' from index 0.`,
        codeLine: 2,
      });

      for (let i = 1; i < arr.length; i++) {
        highlights[i - 1] = "inactive";
        steps.push({
          array: arr,
          pointers: { curr: i },
          highlights: { ...highlights, [i]: "active" },
          variables: { current_value: arr[i] },
          target,
          description: `Scanning: move cursor pointer to index ${i} (value: ${arr[i]}).`,
          codeLine: 4,
        });
      }

      steps.push({
        array: arr,
        pointers: { curr: null },
        highlights: arr.map(() => "sorted"),
        variables: { traversal: "completed" },
        target,
        description: `Scan complete for '${problemName}'. All elements traversed successfully.`,
        codeLine: 6,
      });
    }

    return steps;
  };

  // Compile Dynamic Solutions (Python tab selected by default!)
  const pythonCode = `# Python Solution: ${problemName}
def solve(input_data):
    # 1. Initialize variables & states
    # 2. Iterate elements and compare
    # 3. Return solution results
    pass`;

  const javaCode = `// Java Solution: ${problemName}
class Solution {
    public void solve(Object inputData) {
        // 1. Initialize variables
        // 2. Iterate elements and calculate
    }
}`;

  const jsCode = `// JavaScript Solution: ${problemName}
function solve(inputData) {
  // 1. Initialize variables
  // 2. Traverse elements
}`;

  return {
    problemName,
    category,
    description: `Animation visualizer for the problem: ${problemName}`,
    visualizerType,
    defaultInput,
    generateSteps,
    solutions: {
      python: [{ label: "Standard", code: pythonCode }],
      java: [{ label: "Standard", code: javaCode }],
      javascript: [{ label: "Standard", code: jsCode }],
    },
  };
}
