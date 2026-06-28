import { a2zDsaSheetData } from "@/data/a2zDsaSheet";
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
export function getStepIdForProblem(problemId: string): string | null {
  for (const step of a2zDsaSheetData) {
    for (const lesson of step.lessons) {
      for (const topic of lesson.topics) {
        if (topic.problems.some((p) => p.id === problemId)) {
          return step.stepId;
        }
      }
    }
  }
  return null;
}

export function getProblemMeta(problemId: string, problemName: string): ProblemVisualizerMeta {
  if (combinedRegistry[problemId]) {
    return combinedRegistry[problemId];
  }

  // Determine Visual Archetype
  let visualizerType: "array1d" | "matrix2d" | "linkedlist" | "stringmap" | "recursion" = "array1d";
  let category: "arrays" | "binary-search" | "strings" | "linked-list" | "recursion" | "two-pointers" = "arrays";
  const normalizedId = problemId.toLowerCase();
  const normalizedName = problemName.toLowerCase();
  const stepId = getStepIdForProblem(problemId);

  if (
    normalizedId.includes("step-5") ||
    stepId === "step-12" || // Binary Tree
    stepId === "step-13" || // Binary Search Tree
    stepId === "step-14" || // Graphs
    stepId === "step-15" || // DP
    stepId === "step-16" || // Tries
    normalizedId.includes("recursion") ||
    normalizedName.includes("recursion") ||
    normalizedName.includes("atoi") ||
    normalizedName.includes("subsequence") ||
    normalizedName.includes("subset") ||
    normalizedName.includes("queen") ||
    normalizedName.includes("maze") ||
    normalizedName.includes("sudoku") ||
    (stepId === "step-9" && normalizedName.includes("stack")) // Stack is visualized as call stack frame
  ) {
    visualizerType = "recursion";
    category = "recursion";
  } else if (
    normalizedId.includes("step-4") ||
    stepId === "step-9" || // Queue in Step 9
    normalizedId.includes("linkedlist") ||
    normalizedId.includes("dll") ||
    normalizedName.includes("linked list") ||
    normalizedName.includes("node") ||
    normalizedName.includes("dll") ||
    normalizedName.includes("queue")
  ) {
    visualizerType = "linkedlist";
    category = "linked-list";
  } else if (stepId === "step-8") { // Bit Manipulation
    visualizerType = "array1d";
    category = "arrays";
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

      let callName = "solve";
      let baseCaseDesc = "Base case reached.";
      let recursiveDesc = (n: number) => `Push new execution scope for solve(n=${n}) onto the stack.`;

      if (stepId === "step-12" || stepId === "step-13") {
        callName = "dfs_tree";
        baseCaseDesc = "Reached leaf node (NULL). Returning up the tree traversal.";
        recursiveDesc = (n: number) => `DFS Traversal: visiting node at depth ${depth - n}. Recursively calling left/right children.`;
      } else if (stepId === "step-14") {
        callName = "dfs_graph";
        baseCaseDesc = "All adjacent vertices visited. Backtracking to parent vertex.";
        recursiveDesc = (n: number) => `DFS Graph: visiting vertex V${depth - n}. Pushing to call stack.`;
      } else if (stepId === "step-15") {
        callName = "dp_memoized";
        baseCaseDesc = "Subproblem result found in memo cache (O(1) lookup). Returning memoized value.";
        recursiveDesc = (n: number) => `DP Subproblem: computing dp[${n}]. Recurse on state transition relations.`;
      } else if (stepId === "step-16") {
        callName = "trie_lookup";
        baseCaseDesc = "Match checking finished. Returning terminal word match status.";
        recursiveDesc = (n: number) => `Trie Search: traversing edge char index ${depth - n}. Shifting node cursor.`;
      } else if (stepId === "step-9") {
        callName = "stack_push";
        baseCaseDesc = "Stack bottom scope.";
        recursiveDesc = (n: number) => `Stack Push: pushing item onto the execution stack frame.`;
      }

      // Grow Stack
      for (let i = depth; i >= 0; i--) {
        stack.push(`${callName}(n=${i})`);
        steps.push({
          stack: [...stack],
          variables: { current_n: i, is_base_case: i === 0 ? "True" : "False" },
          description: i === 0 ? baseCaseDesc : recursiveDesc(i),
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
          description: `Backtracking: completed ${popped}. Popping execution frame.`,
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
