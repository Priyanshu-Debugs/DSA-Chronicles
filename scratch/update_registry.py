with open("src/components/Visualizer/visualizerRegistry.ts", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add import for a2zDsaSheetData
import_statement = 'import { a2zDsaSheetData } from "@/data/a2zDsaSheet";'
if import_statement not in content:
    content = import_statement + "\n" + content
    print("Added a2zDsaSheetData import.")

# 2. Add getStepIdForProblem helper function
helper_func = """export function getStepIdForProblem(problemId: string): string | null {
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

"""

if "getStepIdForProblem" not in content:
    # Insert helper before getProblemMeta definition
    target_idx = content.find("export function getProblemMeta(")
    if target_idx != -1:
        content = content[:target_idx] + helper_func + content[target_idx:]
        print("Inserted getStepIdForProblem helper function.")

# 3. Add mapping logic in getProblemMeta
mapping_insert_target = """  let category: "arrays" | "binary-search" | "strings" | "linked-list" | "recursion" | "two-pointers" = "arrays";
  const normalizedId = problemId.toLowerCase();
  const normalizedName = problemName.toLowerCase();"""

mapping_replacement = """  let category: "arrays" | "binary-search" | "strings" | "linked-list" | "recursion" | "two-pointers" = "arrays";
  const normalizedId = problemId.toLowerCase();
  const normalizedName = problemName.toLowerCase();
  const stepId = getStepIdForProblem(problemId);"""

if mapping_insert_target in content and "stepId =" not in content:
    content = content.replace(mapping_insert_target, mapping_replacement)
    print("Added stepId retrieval in getProblemMeta.")

# 4. Modify visualizerType and category resolution in getProblemMeta
target_check = """  if (
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
  } else if ("""

replacement_check = """  if (
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
  } else if ("""

if target_check in content:
    content = content.replace(target_check, replacement_check)
    print("Updated visualizer archetype routing checks.")

# 5. Modify default input values
target_defaults = """  let defaultInput: any = { array: [10, 20, 30, 40, 50] };
  if (visualizerType === "matrix2d") {"""

replacement_defaults = """  let defaultInput: any = { array: [10, 20, 30, 40, 50] };
  if (stepId === "step-8") {
    defaultInput = { array: [1, 0, 1, 0, 1] }; // Binary bits representation
  } else if (visualizerType === "matrix2d") {"""

if target_defaults in content and "stepId === \"step-8\"" not in content:
    content = content.replace(target_defaults, replacement_defaults)
    print("Updated default inputs for bit manipulation.")

# 6. Customize Recursion steps generator
target_recursion_gen = """    if (visualizerType === "recursion") {
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
      }"""

replacement_recursion_gen = """    if (visualizerType === "recursion") {
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
      }"""

if target_recursion_gen in content:
    content = content.replace(target_recursion_gen, replacement_recursion_gen)
    print("Customized recursion steps generator for step-specific titles.")

with open("src/components/Visualizer/visualizerRegistry.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Finished updating visualizerRegistry.ts!")
