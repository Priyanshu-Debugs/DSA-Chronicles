import { ProblemVisualizerMeta } from "../visualizerRegistry";

// ─── Step Generators ─────────────────────────────────────────────────

export function generatePowSteps(x: number, n: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];

  const solve = (currX: number, currN: number): number => {
    stack.push(`myPow(${currX}, ${currN})`);
    steps.push({
      stack: [...stack],
      variables: { x: currX, n: currN },
      description: `Calculate myPow(${currX}, ${currN}) recursively.`,
      codeLineMap: { "python-brute": 3, "python-better": 5, "python-shorter": 1, "python-optimal": 5, "java-optimal": 6, "javascript-optimal": 6 }
    });

    if (currN === 0) {
      steps.push({
        stack: [...stack],
        variables: { x: currX, n: currN },
        result: 1.0,
        description: `Base case reached (n = 0). Return 1.0.`,
        codeLineMap: { "python-brute": 4, "python-better": 6, "python-shorter": 1, "python-optimal": 6, "java-optimal": 7, "javascript-optimal": 7 }
      });
      stack.pop();
      return 1.0;
    }

    const half = solve(currX, Math.floor(currN / 2));
    const ans = currN % 2 === 0 ? half * half : half * half * currX;

    steps.push({
      stack: [...stack],
      variables: { x: currX, n: currN, half, ans },
      result: ans,
      description: `Compute result: myPow(${currX}, ${currN}) = ${ans}.`,
      codeLineMap: { "python-brute": 8, "python-better": 9, "python-shorter": 1, "python-optimal": 9, "java-optimal": 10, "javascript-optimal": 10 }
    });

    stack.pop();
    return ans;
  };

  const actualN = n < 0 ? -n : n;
  const actualX = n < 0 ? 1 / x : x;
  solve(actualX, actualN);
  return steps;
}

export function generateAtoiSteps(s: string): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const cleaned = s.trim();

  const solve = (idx: number, sign: number, val: number): number => {
    stack.push(`myAtoi(${idx}, ${val})`);
    steps.push({
      stack: [...stack],
      variables: { index: idx, current_value: val, sign },
      description: `Called recursive atoi helper at index ${idx}. Current parsing value = ${val}.`,
      codeLineMap: { "python-brute": 3, "python-better": 4, "python-shorter": 2, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    if (idx >= cleaned.length || !/[0-9]/.test(cleaned[idx])) {
      const finalVal = val * sign;
      steps.push({
        stack: [...stack],
        variables: { index: idx, val, sign },
        result: finalVal,
        description: `Ending character or non-digit encountered. Return accumulated value ${finalVal}.`,
        codeLineMap: { "python-brute": 5, "python-better": 6, "python-shorter": 3, "python-optimal": 7, "java-optimal": 7, "javascript-optimal": 7 }
      });
      stack.pop();
      return val * sign;
    }

    const nextDigit = parseInt(cleaned[idx], 10);
    const nextVal = val * 10 + nextDigit;
    const res = solve(idx + 1, sign, nextVal);
    
    stack.pop();
    return res;
  };

  if (cleaned.length === 0) return steps;
  let startIdx = 0;
  let sign = 1;
  if (cleaned[0] === "-") {
    sign = -1;
    startIdx = 1;
  } else if (cleaned[0] === "+") {
    startIdx = 1;
  }

  solve(startIdx, sign, 0);
  return steps;
}

export function generateCountGoodNumbersSteps(n: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const MOD = 1000000007;

  const power = (r: number, p: number): number => {
    stack.push(`power(${r}, ${p})`);
    steps.push({
      stack: [...stack],
      variables: { rate: r, power: p },
      description: `Compute (${r}^${p}) % MOD recursively.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (p === 0) {
      steps.push({
        stack: [...stack],
        result: 1,
        description: `Base case: power is 0. Return 1.`,
        codeLineMap: { "python-brute": 4, "python-better": 4, "python-shorter": 2, "python-optimal": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
      stack.pop();
      return 1;
    }

    const half = power(r, Math.floor(p / 2));
    const ans = p % 2 === 0 ? (half * half) % MOD : (half * half * r) % MOD;
    
    steps.push({
      stack: [...stack],
      variables: { rate: r, power: p, half, ans },
      result: ans,
      description: `Result for rate ${r}^${p} is ${ans}.`,
      codeLineMap: { "python-brute": 7, "python-better": 7, "python-shorter": 2, "python-optimal": 7, "java-optimal": 7, "javascript-optimal": 7 }
    });
    
    stack.pop();
    return ans;
  };

  const even = Math.ceil(n / 2);
  const odd = Math.floor(n / 2);
  const evenAns = power(5, even);
  const oddAns = power(4, odd);
  const total = (evenAns * oddAns) % MOD;

  steps.push({
    stack: [],
    variables: { even_positions: even, odd_positions: odd, even_possibilities: evenAns, odd_possibilities: oddAns },
    result: total,
    description: `Total good numbers = (${evenAns} * ${oddAns}) % MOD = ${total}.`,
    codeLineMap: { "python-brute": 10, "python-better": 10, "python-shorter": 3, "python-optimal": 10, "java-optimal": 10, "javascript-optimal": 10 }
  });

  return steps;
}

export function generateSortStackSteps(arr: number[]): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const tempStack = [...arr];

  const insert = (val: number) => {
    stack.push(`insert(${val})`);
    steps.push({
      stack: [...stack],
      variables: { current_val: val, tempStack: [...tempStack] },
      description: `Insert ${val} in sorted stack.`,
      codeLineMap: { "python-brute": 11, "python-better": 11, "python-shorter": 4, "python-optimal": 11, "java-optimal": 11, "javascript-optimal": 11 }
    });

    if (tempStack.length === 0 || tempStack[tempStack.length - 1] <= val) {
      tempStack.push(val);
      steps.push({
        stack: [...stack],
        variables: { tempStack: [...tempStack] },
        description: `Insert base hit. Push ${val} directly to stack.`,
        codeLineMap: { "python-brute": 13, "python-better": 13, "python-shorter": 4, "python-optimal": 13, "java-optimal": 13, "javascript-optimal": 13 }
      });
      stack.pop();
      return;
    }

    const top = tempStack.pop()!;
    insert(val);
    tempStack.push(top);
    steps.push({
      stack: [...stack],
      variables: { tempStack: [...tempStack] },
      description: `Re-inserted popped item ${top} back on stack.`,
      codeLineMap: { "python-brute": 16, "python-better": 16, "python-shorter": 4, "python-optimal": 16, "java-optimal": 16, "javascript-optimal": 16 }
    });
    stack.pop();
  };

  const sort = () => {
    stack.push(`sort()`);
    steps.push({
      stack: [...stack],
      variables: { tempStack: [...tempStack] },
      description: `Calling sort() on stack.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (tempStack.length === 0) {
      steps.push({
        stack: [...stack],
        description: `Stack empty. Base case for sort.`,
        codeLineMap: { "python-brute": 4, "python-better": 4, "python-shorter": 2, "python-optimal": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
      stack.pop();
      return;
    }

    const top = tempStack.pop()!;
    sort();
    insert(top);
    stack.pop();
  };

  sort();
  return steps;
}

export function generateReverseStackSteps(arr: number[]): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const tempStack = [...arr];

  const insertAtBottom = (val: number) => {
    stack.push(`insertAtBottom(${val})`);
    steps.push({
      stack: [...stack],
      variables: { insert_val: val, tempStack: [...tempStack] },
      description: `Inserting ${val} at the bottom of stack.`,
      codeLineMap: { "python-brute": 10, "python-better": 10, "python-shorter": 3, "python-optimal": 10, "java-optimal": 10, "javascript-optimal": 10 }
    });

    if (tempStack.length === 0) {
      tempStack.push(val);
      stack.pop();
      return;
    }

    const top = tempStack.pop()!;
    insertAtBottom(val);
    tempStack.push(top);
    stack.pop();
  };

  const reverse = () => {
    stack.push(`reverse()`);
    steps.push({
      stack: [...stack],
      variables: { tempStack: [...tempStack] },
      description: `Reverse call. Popping item.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (tempStack.length === 0) {
      stack.pop();
      return;
    }

    const top = tempStack.pop()!;
    reverse();
    insertAtBottom(top);
    stack.pop();
  };

  reverse();
  return steps;
}

export function generateBinaryStringsSteps(n: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: string[] = [];

  const generate = (curr: string) => {
    stack.push(`generate(${curr})`);
    steps.push({
      stack: [...stack],
      variables: { current: curr, answers: [...results] },
      description: `Generating strings. Current prefix is "${curr}".`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (curr.length === n) {
      results.push(curr);
      steps.push({
        stack: [...stack],
        variables: { current: curr, answers: [...results] },
        description: `Base hit. Add "${curr}" to binary strings result list.`,
        codeLineMap: { "python-brute": 5, "python-better": 5, "python-shorter": 2, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
      stack.pop();
      return;
    }

    generate(curr + "0");
    if (curr.length === 0 || curr[curr.length - 1] !== "1") {
      generate(curr + "1");
    }
    stack.pop();
  };

  generate("");
  return steps;
}

export function generateParenthesesSteps(n: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: string[] = [];

  const backtrack = (curr: string, open: number, close: number) => {
    stack.push(`backtrack("${curr}", ${open}, ${close})`);
    steps.push({
      stack: [...stack],
      variables: { open_count: open, close_count: close, answers: [...results] },
      description: `Backtrack step: current permutation is "${curr}".`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (curr.length === 2 * n) {
      results.push(curr);
      stack.pop();
      return;
    }

    if (open < n) {
      backtrack(curr + "(", open + 1, close);
    }
    if (close < open) {
      backtrack(curr + ")", open, close + 1);
    }
    stack.pop();
  };

  backtrack("", 0, 0);
  return steps;
}

export function generatePrintAllSubsequencesSteps(s: string): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: string[] = [];

  const solve = (idx: number, current: string) => {
    stack.push(`solve(${idx}, "${current}")`);
    steps.push({
      stack: [...stack],
      variables: { index: idx, current, results: [...results] },
      description: `Recursion step at index ${idx}. Subsequence prefix is "${current}".`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (idx === s.length) {
      results.push(current || "{empty}");
      steps.push({
        stack: [...stack],
        variables: { results: [...results] },
        description: `Base hit. Add subsequence "${current}" to results.`,
        codeLineMap: { "python-brute": 5, "python-better": 5, "python-shorter": 2, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
      stack.pop();
      return;
    }

    // Choice 1: Include char
    solve(idx + 1, current + s[idx]);
    // Choice 2: Exclude char
    solve(idx + 1, current);
    stack.pop();
  };

  solve(0, "");
  return steps;
}

export function generateCountSubsequencesSumKSteps(arr: number[], k: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];

  const count = (idx: number, currentSum: number): number => {
    stack.push(`count(${idx}, ${currentSum})`);
    steps.push({
      stack: [...stack],
      variables: { idx, currentSum, target: k },
      description: `Checking index ${idx} with current subset sum = ${currentSum}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (idx === arr.length) {
      const isMatch = currentSum === k;
      steps.push({
        stack: [...stack],
        variables: { currentSum, isMatch },
        result: isMatch ? 1 : 0,
        description: `End of array. Sum is ${currentSum} (${isMatch ? "Matches target!" : "Miss"}).`,
        codeLineMap: { "python-brute": 5, "python-better": 5, "python-shorter": 2, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
      stack.pop();
      return isMatch ? 1 : 0;
    }

    const take = count(idx + 1, currentSum + arr[idx]);
    const noTake = count(idx + 1, currentSum);
    const ans = take + noTake;
    stack.pop();
    return ans;
  };

  count(0, 0);
  return steps;
}

export function generateCheckSubsequenceSumKSteps(arr: number[], k: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];

  const check = (idx: number, currentSum: number): boolean => {
    stack.push(`check(${idx}, ${currentSum})`);
    steps.push({
      stack: [...stack],
      variables: { idx, currentSum },
      description: `Checking index ${idx} with current subset sum = ${currentSum}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (currentSum === k) {
      steps.push({
        stack: [...stack],
        result: true,
        description: `Sum equals target (${k})! Early exit return true.`,
        codeLineMap: { "python-brute": 4, "python-better": 4, "python-shorter": 2, "python-optimal": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
      stack.pop();
      return true;
    }
    if (idx === arr.length || currentSum > k) {
      stack.pop();
      return false;
    }

    const take = check(idx + 1, currentSum + arr[idx]);
    if (take) {
      stack.pop();
      return true;
    }
    const noTake = check(idx + 1, currentSum);
    stack.pop();
    return noTake;
  };

  check(0, 0);
  return steps;
}

export function generateCombinationSumSteps(candidates: number[], target: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: number[][] = [];

  const backtrack = (idx: number, currentSum: number, currentList: number[]) => {
    stack.push(`backtrack(${idx}, sum=${currentSum})`);
    steps.push({
      stack: [...stack],
      variables: { index: idx, currentSum, combination: [...currentList], answers: [...results] },
      description: `Backtrack combination sum. Current sum: ${currentSum}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (currentSum === target) {
      results.push([...currentList]);
      stack.pop();
      return;
    }
    if (idx === candidates.length || currentSum > target) {
      stack.pop();
      return;
    }

    // Choice 1: Pick candidates[idx] (can choose again)
    backtrack(idx, currentSum + candidates[idx], [...currentList, candidates[idx]]);
    // Choice 2: Skip candidates[idx]
    backtrack(idx + 1, currentSum, [...currentList]);
    stack.pop();
  };

  backtrack(0, 0, []);
  return steps;
}

export function generateCombinationSumIISteps(candidates: number[], target: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: number[][] = [];
  const sorted = [...candidates].sort((a, b) => a - b);

  const backtrack = (idx: number, currentSum: number, currentList: number[]) => {
    stack.push(`backtrack(${idx}, sum=${currentSum})`);
    steps.push({
      stack: [...stack],
      variables: { index: idx, currentSum, combination: [...currentList], answers: [...results] },
      description: `Backtrack Combination Sum II. Current index = ${idx}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (currentSum === target) {
      results.push([...currentList]);
      stack.pop();
      return;
    }
    if (currentSum > target) {
      stack.pop();
      return;
    }

    for (let i = idx; i < sorted.length; i++) {
      if (i > idx && sorted[i] === sorted[i - 1]) continue;
      backtrack(i + 1, currentSum + sorted[i], [...currentList, sorted[i]]);
    }
    stack.pop();
  };

  backtrack(0, 0, []);
  return steps;
}

export function generateCombinationSumIIISteps(k: number, n: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: number[][] = [];

  const backtrack = (num: number, currentSum: number, currentList: number[]) => {
    stack.push(`backtrack(${num}, sum=${currentSum})`);
    steps.push({
      stack: [...stack],
      variables: { num, currentSum, size: currentList.length, combination: [...currentList], answers: [...results] },
      description: `Backtrack Combination Sum III. Checking digit ${num}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (currentList.length === k && currentSum === n) {
      results.push([...currentList]);
      stack.pop();
      return;
    }
    if (currentList.length > k || currentSum > n) {
      stack.pop();
      return;
    }

    for (let i = num; i <= 9; i++) {
      backtrack(i + 1, currentSum + i, [...currentList, i]);
    }
    stack.pop();
  };

  backtrack(1, 0, []);
  return steps;
}

export function generateSubsetSumISteps(arr: number[]): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: number[] = [];

  const solve = (idx: number, currentSum: number) => {
    stack.push(`solve(${idx}, sum=${currentSum})`);
    steps.push({
      stack: [...stack],
      variables: { index: idx, currentSum, subsetSums: [...results] },
      description: `Evaluating subset sum at index ${idx}. Current sum is ${currentSum}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (idx === arr.length) {
      results.push(currentSum);
      steps.push({
        stack: [...stack],
        variables: { subsetSums: [...results] },
        description: `Base case: subset complete. Added sum ${currentSum} to subset sums list.`,
        codeLineMap: { "python-brute": 5, "python-better": 5, "python-shorter": 2, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
      stack.pop();
      return;
    }

    solve(idx + 1, currentSum + arr[idx]);
    solve(idx + 1, currentSum);
    stack.pop();
  };

  solve(0, 0);
  return steps;
}

export function generateSubsetSumIISteps(arr: number[]): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: number[][] = [];
  const sorted = [...arr].sort((a, b) => a - b);

  const backtrack = (idx: number, currentList: number[]) => {
    stack.push(`backtrack(${idx})`);
    steps.push({
      stack: [...stack],
      variables: { index: idx, subset: [...currentList], answersCount: results.length },
      description: `Subset Sum II backtracking. Current index = ${idx}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    results.push([...currentList]);

    for (let i = idx; i < sorted.length; i++) {
      if (i > idx && sorted[i] === sorted[i - 1]) continue;
      backtrack(i + 1, [...currentList, sorted[i]]);
    }
    stack.pop();
  };

  backtrack(0, []);
  return steps;
}

export function generateLetterCombinationsSteps(digits: string): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: string[] = [];
  const phoneMap: Record<string, string> = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
  };

  const backtrack = (idx: number, current: string) => {
    stack.push(`backtrack(${idx}, "${current}")`);
    steps.push({
      stack: [...stack],
      variables: { index: idx, current, results: [...results] },
      description: `Backtrack digits map. Current prefix is "${current}".`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (idx === digits.length) {
      results.push(current);
      stack.pop();
      return;
    }

    const letters = phoneMap[digits[idx]] || "";
    for (let i = 0; i < letters.length; i++) {
      backtrack(idx + 1, current + letters[i]);
    }
    stack.pop();
  };

  if (digits.length > 0) {
    backtrack(0, "");
  }
  return steps;
}

export function generatePalindromePartitioningSteps(s: string): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: string[][] = [];

  const isPalindrome = (sub: string) => sub === sub.split("").reverse().join("");

  const backtrack = (start: number, currentList: string[]) => {
    stack.push(`backtrack(${start})`);
    steps.push({
      stack: [...stack],
      variables: { start, currentPartition: [...currentList], answers: [...results] },
      description: `Palindrome partitioning backtrack. Start index = ${start}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (start === s.length) {
      results.push([...currentList]);
      stack.pop();
      return;
    }

    for (let end = start + 1; end <= s.length; end++) {
      const sub = s.substring(start, end);
      if (isPalindrome(sub)) {
        backtrack(end, [...currentList, sub]);
      }
    }
    stack.pop();
  };

  backtrack(0, []);
  return steps;
}

export function generateWordSearchSteps(board: string[][], word: string): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const rows = board.length;
  const cols = board[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

  const dfs = (r: number, c: number, idx: number): boolean => {
    stack.push(`dfs(${r}, ${c}, index=${idx})`);
    steps.push({
      stack: [...stack],
      variables: { row: r, col: c, char: word[idx], matches: board[r][c] === word[idx] },
      description: `DFS cell [${r}, ${c}] matching char '${word[idx]}'.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (idx === word.length - 1) {
      stack.pop();
      return board[r][c] === word[idx];
    }
    if (board[r][c] !== word[idx]) {
      stack.pop();
      return false;
    }

    visited[r][c] = true;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        if (dfs(nr, nc, idx + 1)) {
          stack.pop();
          return true;
        }
      }
    }
    visited[r][c] = false;
    stack.pop();
    return false;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(i, j, 0)) return steps;
    }
  }
  return steps;
}

export function generateNQueenSteps(n: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const board = Array.from({ length: n }, () => new Array(n).fill("."));

  const isSafe = (row: number, col: number): boolean => {
    for (let i = 0; i < col; i++) {
      if (board[row][i] === "Q") return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }
    for (let i = row, j = col; i < n && j >= 0; i++, j--) {
      if (board[i][j] === "Q") return false;
    }
    return true;
  };

  const solve = (col: number): boolean => {
    stack.push(`solve(${col})`);
    steps.push({
      stack: [...stack],
      variables: { col, boardState: board.map(r => r.join(" ")) },
      description: `N-Queen solver checking column ${col}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (col === n) {
      stack.pop();
      return true;
    }

    for (let i = 0; i < n; i++) {
      if (isSafe(i, col)) {
        board[i][col] = "Q";
        if (solve(col + 1)) {
          stack.pop();
          return true;
        }
        board[i][col] = "."; // backtrack
      }
    }
    stack.pop();
    return false;
  };

  solve(0);
  return steps;
}

export function generateRatInMazeSteps(maze: number[][]): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const n = maze.length;
  const visited = Array.from({ length: n }, () => new Array(n).fill(false));
  const results: string[] = [];

  const solve = (r: number, c: number, path: string) => {
    stack.push(`solve(${r}, ${c})`);
    steps.push({
      stack: [...stack],
      variables: { r, c, path, answers: [...results] },
      description: `Rat checks cell [${r}, ${c}] with path: "${path}".`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (r === n - 1 && c === n - 1) {
      results.push(path);
      stack.pop();
      return;
    }

    visited[r][c] = true;
    const moves = [
      { dr: 1, dc: 0, dir: "D" },
      { dr: 0, dc: -1, dir: "L" },
      { dr: 0, dc: 1, dir: "R" },
      { dr: -1, dc: 0, dir: "U" }
    ];

    for (const { dr, dc, dir } of moves) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && maze[nr][nc] === 1 && !visited[nr][nc]) {
        solve(nr, nc, path + dir);
      }
    }
    visited[r][c] = false;
    stack.pop();
  };

  if (maze[0][0] === 1) {
    solve(0, 0, "");
  }
  return steps;
}

export function generateWordBreakSteps(s: string, wordDict: string[]): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const dict = new Set(wordDict);

  const solve = (start: number): boolean => {
    stack.push(`solve(${start})`);
    steps.push({
      stack: [...stack],
      variables: { start, currentString: s.substring(start) },
      description: `Checking word splits starting at index ${start}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (start === s.length) {
      stack.pop();
      return true;
    }

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.substring(start, end);
      if (dict.has(word)) {
        if (solve(end)) {
          stack.pop();
          return true;
        }
      }
    }
    stack.pop();
    return false;
  };

  solve(0);
  return steps;
}

export function generateMColoringSteps(graph: number[][], m: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const n = graph.length;
  const colors = new Array(n).fill(0);

  const isSafe = (node: number, c: number): boolean => {
    for (let i = 0; i < n; i++) {
      if (graph[node][i] === 1 && colors[i] === c) return false;
    }
    return true;
  };

  const solve = (node: number): boolean => {
    stack.push(`solve(${node})`);
    steps.push({
      stack: [...stack],
      variables: { node, colors: [...colors] },
      description: `Backtrack graph coloring for node ${node}.`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (node === n) {
      stack.pop();
      return true;
    }

    for (let c = 1; c <= m; c++) {
      if (isSafe(node, c)) {
        colors[node] = c;
        if (solve(node + 1)) {
          stack.pop();
          return true;
        }
        colors[node] = 0; // backtrack
      }
    }
    stack.pop();
    return false;
  };

  solve(0);
  return steps;
}

export function generateSudokuSteps(board: string[][]): any[] {
  const steps: any[] = [];
  const stack: string[] = [];

  const isValid = (r: number, c: number, val: string): boolean => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === val) return false;
      if (board[i][c] === val) return false;
      const boxRow = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(c / 3) + (i % 3);
      if (board[boxRow][boxCol] === val) return false;
    }
    return true;
  };

  const solve = (): boolean => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === ".") {
          stack.push(`solveCell(${r}, ${c})`);
          steps.push({
            stack: [...stack],
            variables: { r, c },
            description: `Sudoku Solver checking cell [${r}, ${c}].`,
            codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
          });

          for (let val = 1; val <= 9; val++) {
            const charVal = val.toString();
            if (isValid(r, c, charVal)) {
              board[r][c] = charVal;
              if (solve()) {
                stack.pop();
                return true;
              }
              board[r][c] = "."; // backtrack
            }
          }
          stack.pop();
          return false;
        }
      }
    }
    return true;
  };

  solve();
  return steps;
}

export function generateExpressionAddOperatorsSteps(num: string, target: number): any[] {
  const steps: any[] = [];
  const stack: string[] = [];
  const results: string[] = [];

  const backtrack = (idx: number, expr: string, calc: number, prev: number) => {
    stack.push(`backtrack(${idx}, "${expr}")`);
    steps.push({
      stack: [...stack],
      variables: { idx, expr, current_val: calc, prev_val: prev },
      description: `Checking operator additions. Expression so far: "${expr}".`,
      codeLineMap: { "python-brute": 3, "python-better": 3, "python-shorter": 2, "python-optimal": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (idx === num.length) {
      if (calc === target) {
        results.push(expr);
      }
      stack.pop();
      return;
    }

    for (let i = idx; i < num.length; i++) {
      if (i > idx && num[idx] === "0") break;
      const part = num.substring(idx, i + 1);
      const curr = parseInt(part, 10);

      if (idx === 0) {
        backtrack(i + 1, part, curr, curr);
      } else {
        backtrack(i + 1, expr + "+" + part, calc + curr, curr);
        backtrack(i + 1, expr + "-" + part, calc - curr, -curr);
        backtrack(i + 1, expr + "*" + part, calc - prev + prev * curr, prev * curr);
      }
    }
    stack.pop();
  };

  backtrack(0, "", 0, 0);
  return steps;
}

// ─── Registry Object ─────────────────────────────────────────────────

export const step5RecursionRegistry: Record<string, ProblemVisualizerMeta> = {
  "1_pow(x,_n)": {
    problemName: "Pow(x, n)",
    category: "recursion",
    description: "Calculate x raised to the power n using recursive binary exponentiation.",
    visualizerType: "recursion",
    defaultInput: { x: 2.0, n: 5 },
    generateSteps: (input) => generatePowSteps(input.x || 2.0, input.n || 5),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def myPow(x, n):
    # Naive multiplication loops
    if n < 0:
        x = 1 / x
        n = -n
    ans = 1.0
    for _ in range(n):
        ans *= x
    return ans`
        },
        {
          label: "Better",
          code: `def myPow(x, n):
    # Simple recursive exponentiation
    if n == 0: return 1.0
    if n < 0:
        return 1.0 / myPow(x, -n)
    half = myPow(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x`
        },
        {
          label: "Shorter",
          code: `def myPow(x, n):
    return x ** n`
        },
        {
          label: "Optimal",
          code: `def myPow(x, n):
    # Optimal recursive binary exponentiation
    if n == 0: return 1.0
    if n < 0:
        x = 1.0 / x
        n = -n
    half = myPow(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public double myPow(double x, int n) {
        if (n == 0) return 1.0;
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        return solve(x, N);
    }
    private double solve(double x, long n) {
        if (n == 0) return 1.0;
        double half = solve(x, n / 2);
        if (n % 2 == 0) return half * half;
        return half * half * x;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function myPow(x, n) {
  if (n === 0) return 1.0;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  return solve(x, n);
}
function solve(x, n) {
  if (n === 0) return 1.0;
  let half = solve(x, Math.floor(n / 2));
  if (n % 2 === 0) return half * half;
  return half * half * x;
}`
        }
      ]
    }
  },
  "0_recursive_implementation_of_atoi()": {
    problemName: "Recursive Implementation of atoi()",
    category: "recursion",
    description: "Convert string representations into 32-bit signed integers recursively.",
    visualizerType: "recursion",
    defaultInput: { s: "   -42" },
    generateSteps: (input) => generateAtoiSteps(input.s || "   -42"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def myAtoi(s):
    # Loop based parsing validation
    cleaned = s.strip()
    if not cleaned: return 0
    sign = -1 if cleaned[0] == '-' else 1
    start = 1 if cleaned[0] in ('-', '+') else 0
    res = 0
    for i in range(start, len(cleaned)):
        if not cleaned[i].isdigit(): break
        res = res * 10 + int(cleaned[i])
    return max(-2**31, min(res * sign, 2**31 - 1))`
        },
        {
          label: "Better",
          code: `def myAtoi(s):
    # Iterative sign resolution then recursive digits parsing
    cleaned = s.strip()
    if not cleaned: return 0
    sign = -1 if cleaned[0] == '-' else 1
    start = 1 if cleaned[0] in ('-', '+') else 0
    def parse(idx, val):
        if idx >= len(cleaned) or not cleaned[idx].isdigit():
            return val
        return parse(idx + 1, val * 10 + int(cleaned[idx]))
    ans = parse(start, 0) * sign
    return max(-2**31, min(ans, 2**31 - 1))`
        },
        {
          label: "Shorter",
          code: `def myAtoi(s):
    import re
    m = re.match(r'^\s*([+-]?\d+)', s)
    return max(-2**31, min(int(m.group(1)), 2**31 - 1)) if m else 0`
        },
        {
          label: "Optimal",
          code: `def myAtoi(s):
    # Recursive parsing with boundary checks
    cleaned = s.strip()
    if not cleaned: return 0
    sign = -1 if cleaned[0] == '-' else 1
    start = 1 if cleaned[0] in ('-', '+') else 0
    def parse(idx, val):
        if idx >= len(cleaned) or not cleaned[idx].isdigit():
            return val
        return parse(idx + 1, val * 10 + int(cleaned[idx]))
    ans = parse(start, 0) * sign
    return max(-2**31, min(ans, 2**31 - 1))`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int myAtoi(String s) {
        String cleaned = s.trim();
        if (cleaned.isEmpty()) return 0;
        int sign = 1, start = 0;
        if (cleaned.charAt(0) == '-') { sign = -1; start = 1; }
        else if (cleaned.charAt(0) == '+') { start = 1; }
        long val = parse(cleaned, start, 0, sign);
        if (val > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (val < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        return (int)val;
    }
    private long parse(String s, int idx, long val, int sign) {
        if (idx >= s.length() || !Character.isDigit(s.charAt(idx))) return val * sign;
        long next = val * 10 + (s.charAt(idx) - '0');
        if (next * sign > Integer.MAX_VALUE) return (long)Integer.MAX_VALUE + 1;
        if (next * sign < Integer.MIN_VALUE) return (long)Integer.MIN_VALUE - 1;
        return parse(s, idx + 1, next, sign);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function myAtoi(s) {
  const cleaned = s.trim();
  if (!cleaned) return 0;
  let sign = 1, start = 0;
  if (cleaned[0] === '-') { sign = -1; start = 1; }
  else if (cleaned[0] === '+') { start = 1; }
  function parse(idx, val) {
    if (idx >= cleaned.length || cleaned[idx] < '0' || cleaned[idx] > '9') return val * sign;
    return parse(idx + 1, val * 10 + (cleaned[idx] - '0'));
  }
  const ans = parse(start, 0);
  return Math.max(-2147483648, Math.min(2147483647, ans));
}`
        }
      ]
    }
  },
  "2_count_good_numbers": {
    problemName: "Count Good Numbers",
    category: "recursion",
    description: "Evaluate numbers of size n having even indexes with even digits and odd indexes with prime digits.",
    visualizerType: "recursion",
    defaultInput: { n: 4 },
    generateSteps: (input) => generateCountGoodNumbersSteps(input.n || 4),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def countGoodNumbers(n):
    # Naive multiplication exponentiation
    MOD = 10**9 + 7
    even = (n + 1) // 2
    odd = n // 2
    ans = 1
    for _ in range(even):
        ans = (ans * 5) % MOD
    for _ in range(odd):
        ans = (ans * 4) % MOD
    return ans`
        },
        {
          label: "Better",
          code: `def countGoodNumbers(n):
    # Modular exponentiation recursive helper
    MOD = 10**9 + 7
    def power(x, y):
        if y == 0: return 1
        half = power(x, y // 2)
        if y % 2 == 0:
            return (half * half) % MOD
        return (half * half * x) % MOD
    even = (n + 1) // 2
    odd = n // 2
    return (power(5, even) * power(4, odd)) % MOD`
        },
        {
          label: "Shorter",
          code: `def countGoodNumbers(n):
    MOD = 10**9 + 7
    return (pow(5, (n + 1) // 2, MOD) * pow(4, n // 2, MOD)) % MOD`
        },
        {
          label: "Optimal",
          code: `def countGoodNumbers(n):
    # Recursive binary power implementation O(log N)
    MOD = 10**9 + 7
    def power(x, y):
        if y == 0: return 1
        half = power(x, y // 2)
        if y % 2 == 0:
            return (half * half) % MOD
        return (half * half * x) % MOD
    even = (n + 1) // 2
    odd = n // 2
    return (power(5, even) * power(4, odd)) % MOD`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    private long MOD = 1000000007;
    public int countGoodNumbers(long n) {
        long even = (n + 1) / 2;
        long odd = n / 2;
        return (int)((power(5, even) * power(4, odd)) % MOD);
    }
    private long power(long x, long y) {
        if (y == 0) return 1;
        long half = power(x, y / 2);
        if (y % 2 == 0) return (half * half) % MOD;
        return (half * half * x) % MOD;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function countGoodNumbers(n) {
  const MOD = 1000000007n;
  const bigN = BigInt(n);
  const even = (bigN + 1n) / 2n;
  const odd = bigN / 2n;
  function power(x, y) {
    if (y === 0n) return 1n;
    let half = power(x, y / 2n);
    if (y % 2n === 0n) return (half * half) % MOD;
    return (half * half * x) % MOD;
  }
  return Number((power(5n, even) * power(4n, odd)) % MOD);
}`
        }
      ]
    }
  },
  "3_sort_a_stack": {
    problemName: "Sort a Stack",
    category: "recursion",
    description: "Sort stack values recursively in-place without loops.",
    visualizerType: "recursion",
    defaultInput: { array: [5, -2, 9, 1, 3] },
    generateSteps: (input) => generateSortStackSteps(input.array || [5, -2, 9, 1, 3]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def sortStack(stack):
    # Pop all, convert to sorted array, put back
    arr = []
    while stack:
        arr.append(stack.pop())
    arr.sort()
    for x in arr:
        stack.append(x)`
        },
        {
          label: "Better",
          code: `def sortStack(stack):
    # Iterative sorting using a helper list/stack
    tmp = []
    while stack:
        val = stack.pop()
        while tmp and tmp[-1] > val:
            stack.append(tmp.pop())
        tmp.append(val)
    while tmp:
        stack.append(tmp.pop())`
        },
        {
          label: "Shorter",
          code: `def sortStack(stack):
    stack.sort()`
        },
        {
          label: "Optimal",
          code: `def sortStack(stack):
    # Recursive sort & insertion in-place
    if not stack:
        return
    top = stack.pop()
    sortStack(stack)
    def insert(s, val):
        if not s or s[-1] <= val:
            s.append(val)
            return
        temp = s.pop()
        insert(s, val)
        s.append(temp)
    insert(stack, top)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.Stack;
class Solution {
    public void sortStack(Stack<Integer> stack) {
        if (stack.isEmpty()) return;
        int top = stack.pop();
        sortStack(stack);
        insert(stack, top);
    }
    private void insert(Stack<Integer> s, int val) {
        if (s.isEmpty() || s.peek() <= val) {
            s.push(val);
            return;
        }
        int temp = s.pop();
        insert(s, val);
        s.push(temp);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function sortStack(stack) {
  if (stack.length === 0) return;
  const top = stack.pop();
  sortStack(stack);
  insert(stack, top);
}
function insert(s, val) {
  if (s.length === 0 || s[s.length - 1] <= val) {
    s.push(val);
    return;
  }
  const temp = s.pop();
  insert(s, val);
  s.push(temp);
}`
        }
      ]
    }
  },
  "4_reverse_a_stack": {
    problemName: "Reverse a Stack",
    category: "recursion",
    description: "Reverse stack elements recursively in-place without iteration.",
    visualizerType: "recursion",
    defaultInput: { array: [1, 2, 3, 4] },
    generateSteps: (input) => generateReverseStackSteps(input.array || [1, 2, 3, 4]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def reverseStack(stack):
    # Convert stack to array, reverse it, restore
    arr = []
    while stack:
        arr.append(stack.pop())
    # arr is already in reverse order of pops (which is reverse)
    for x in reversed(arr):
        stack.append(x)`
        },
        {
          label: "Better",
          code: `def reverseStack(stack):
    # Recursive pop and bottom insertion using intermediate arrays
    if not stack:
        return
    def insertAtBottom(s, val):
        if not s:
            s.append(val)
            return
        top = s.pop()
        insertAtBottom(s, val)
        s.append(top)
    top = stack.pop()
    reverseStack(stack)
    insertAtBottom(stack, top)`
        },
        {
          label: "Shorter",
          code: `def reverseStack(stack):
    stack.reverse()`
        },
        {
          label: "Optimal",
          code: `def reverseStack(stack):
    # In-place pure recursion bottom-insertion
    if not stack:
        return
    def insertAtBottom(s, val):
        if not s:
            s.append(val)
            return
        top = s.pop()
        insertAtBottom(s, val)
        s.append(top)
    top = stack.pop()
    reverseStack(stack)
    insertAtBottom(stack, top)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.Stack;
class Solution {
    public void reverseStack(Stack<Integer> stack) {
        if (stack.isEmpty()) return;
        int top = stack.pop();
        reverseStack(stack);
        insertAtBottom(stack, top);
    }
    private void insertAtBottom(Stack<Integer> s, int val) {
        if (s.isEmpty()) {
            s.push(val);
            return;
        }
        int top = s.pop();
        insertAtBottom(s, val);
        s.push(top);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function reverseStack(stack) {
  if (stack.length === 0) return;
  const top = stack.pop();
  reverseStack(stack);
  insertAtBottom(stack, top);
}
function insertAtBottom(s, val) {
  if (s.length === 0) {
    s.push(val);
    return;
  }
  const top = s.pop();
  insertAtBottom(s, val);
  s.push(top);
}`
        }
      ]
    }
  },
  "0_binary_strings_with_no_consecutive_1s": {
    problemName: "Binary Strings with no consecutive 1s",
    category: "recursion",
    description: "Generate binary sequences of size n lacking any adjacent '1' values.",
    visualizerType: "recursion",
    defaultInput: { n: 3 },
    generateSteps: (input) => generateBinaryStringsSteps(input.n || 3),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def generateBinaryStrings(n):
    # Enumerate all 2^N strings and filter
    ans = []
    for i in range(1 << n):
        s = bin(i)[2:].zfill(n)
        if "11" not in s:
            ans.append(s)
    return ans`
        },
        {
          label: "Better",
          code: `def generateBinaryStrings(n):
    # Recursive backtracking appending characters
    ans = []
    def backtrack(curr):
        if len(curr) == n:
            ans.append(curr)
            return
        backtrack(curr + "0")
        if not curr or curr[-1] != "1":
            backtrack(curr + "1")
    backtrack("")
    return ans`
        },
        {
          label: "Shorter",
          code: `def generateBinaryStrings(n):
    # List comprehension recursive
    def gen(length):
        if length == 0: return [""]
        if length == 1: return ["0", "1"]
        return [s + "0" for s in gen(length - 1)] + [s + "10" for s in gen(length - 2)]
    return sorted(gen(n)) if n > 0 else []`
        },
        {
          label: "Optimal",
          code: `def generateBinaryStrings(n):
    # Optimal backtracking skipping consecutive 1s
    ans = []
    def backtrack(curr):
        if len(curr) == n:
            ans.append(curr)
            return
        backtrack(curr + "0")
        if not curr or curr[-1] != "1":
            backtrack(curr + "1")
    backtrack("")
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<String> generateBinaryStrings(int n) {
        List<String> res = new ArrayList<>();
        backtrack("", n, res);
        return res;
    }
    private void backtrack(String curr, int n, List<String> res) {
        if (curr.length() == n) {
            res.add(curr);
            return;
        }
        backtrack(curr + "0", n, res);
        if (curr.isEmpty() || curr.charAt(curr.length() - 1) != '1') {
            backtrack(curr + "1", n, res);
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function generateBinaryStrings(n) {
  const res = [];
  function backtrack(curr) {
    if (curr.length === n) {
      res.push(curr);
      return;
    }
    backtrack(curr + "0");
    if (!curr || curr[curr.length - 1] !== "1") {
      backtrack(curr + "1");
    }
  }
  backtrack("");
  return res;
}`
        }
      ]
    }
  },
  "1_generate_paranthesis": {
    problemName: "Generate Paranthesis",
    category: "recursion",
    description: "Generate combinations of balanced parenthetical brackets.",
    visualizerType: "recursion",
    defaultInput: { n: 3 },
    generateSteps: (input) => generateParenthesesSteps(input.n || 3),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def generateParenthesis(n):
    # Generate all bracket permutations of size 2*N, filter valid ones
    ans = []
    def valid(A):
        bal = 0
        for char in A:
            if char == '(': bal += 1
            else: bal -= 1
            if bal < 0: return False
        return bal == 0
    def gen(current):
        if len(current) == 2 * n:
            if valid(current):
                ans.append("".join(current))
            return
        current.append('(')
        gen(current)
        current.pop()
        current.append(')')
        gen(current)
        current.pop()
    gen([])
    return ans`
        },
        {
          label: "Better",
          code: `def generateParenthesis(n):
    # Recursion with backtracking limits
    ans = []
    def backtrack(curr, open_cnt, close_cnt):
        if len(curr) == 2 * n:
            ans.append(curr)
            return
        if open_cnt < n:
            backtrack(curr + "(", open_cnt + 1, close_cnt)
        if close_cnt < open_cnt:
            backtrack(curr + ")", open_cnt, close_cnt + 1)
    backtrack("", 0, 0)
    return ans`
        },
        {
          label: "Shorter",
          code: `def generateParenthesis(n):
    # Compact dfs
    ans = []
    def dfs(o, c, s):
        if len(s) == 2*n: ans.append(s); return
        if o: dfs(o-1, c, s+'(')
        if c > o: dfs(o, c-1, s+')')
    dfs(n, n, '')
    return ans`
        },
        {
          label: "Optimal",
          code: `def generateParenthesis(n):
    # Backtracking with optimized boundary rules
    ans = []
    def backtrack(curr, open_cnt, close_cnt):
        if len(curr) == 2 * n:
            ans.append(curr)
            return
        if open_cnt < n:
            backtrack(curr + "(", open_cnt + 1, close_cnt)
        if close_cnt < open_cnt:
            backtrack(curr + ")", open_cnt, close_cnt + 1)
    backtrack("", 0, 0)
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack("", 0, 0, n, res);
        return res;
    }
    private void backtrack(String curr, int open, int close, int max, List<String> res) {
        if (curr.length() == max * 2) {
            res.add(curr);
            return;
        }
        if (open < max) backtrack(curr + "(", open + 1, close, max, res);
        if (close < open) backtrack(curr + ")", open, close + 1, max, res);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function generateParenthesis(n) {
  const res = [];
  function backtrack(curr, open, close) {
    if (curr.length === n * 2) {
      res.push(curr);
      return;
    }
    if (open < n) backtrack(curr + "(", open + 1, close);
    if (close < open) backtrack(curr + ")", open, close + 1);
  }
  backtrack("", 0, 0);
  return res;
}`
        }
      ]
    }
  },
  "2_print_all_subsequences/power_set": {
    problemName: "Print all subsequences/Power Set",
    category: "recursion",
    description: "Generate the complete power set subsets for a given input sequence.",
    visualizerType: "recursion",
    defaultInput: { s: "abc" },
    generateSteps: (input) => generatePrintAllSubsequencesSteps(input.s || "abc"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def powerSet(s):
    # Binary bitmask subsets generation
    n = len(s)
    ans = []
    for i in range(1 << n):
        sub = []
        for j in range(n):
            if (i & (1 << j)):
                sub.append(s[j])
        ans.append("".join(sub))
    return ans`
        },
        {
          label: "Better",
          code: `def powerSet(s):
    # Take/Don't-take recursive DFS
    ans = []
    def dfs(idx, curr):
        if idx == len(s):
            ans.append("".join(curr))
            return
        # include char
        curr.append(s[idx])
        dfs(idx + 1, curr)
        curr.pop()
        # exclude char
        dfs(idx + 1, curr)
    dfs(0, [])
    return ans`
        },
        {
          label: "Shorter",
          code: `def powerSet(s):
    from itertools import combinations
    return ["".join(c) for r in range(len(s) + 1) for c in combinations(s, r)]`
        },
        {
          label: "Optimal",
          code: `def powerSet(s):
    # Pure backtracking subsets aggregation
    ans = []
    def solve(idx, curr):
        if idx == len(s):
            ans.append(curr)
            return
        solve(idx + 1, curr + s[idx])
        solve(idx + 1, curr)
    solve(0, "")
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<String> powerSet(String s) {
        List<String> res = new ArrayList<>();
        solve(0, "", s, res);
        return res;
    }
    private void solve(int idx, String curr, String s, List<String> res) {
        if (idx == s.length()) {
            res.add(curr);
            return;
        }
        solve(idx + 1, curr + s.charAt(idx), s, res);
        solve(idx + 1, curr, s, res);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function powerSet(s) {
  const res = [];
  function solve(idx, curr) {
    if (idx === s.length) {
      res.push(curr);
      return;
    }
    solve(idx + 1, curr + s[idx]);
    solve(idx + 1, curr);
  }
  solve(0, "");
  return res;
}`
        }
      ]
    }
  },
  "3_learn_all_patterns_of_subsequences_(theory)": {
    problemName: "Learn All Patterns of Subsequences (Theory)",
    category: "recursion",
    description: "Understand recursion tree subsets patterns (Print, Check Sum, Count).",
    visualizerType: "recursion",
    defaultInput: { s: "ab" },
    generateSteps: (input) => generatePrintAllSubsequencesSteps(input.s || "ab"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def learnPatterns(s):
    # Naive iterative patterns representation
    return ["printAll", "checkSum", "countSum"]`
        },
        {
          label: "Better",
          code: `def learnPatterns(s):
    # Standard dfs theory recursion
    ans = []
    def dfs(idx, curr):
        if idx == len(s):
            ans.append(curr)
            return
        dfs(idx + 1, curr + s[idx])
        dfs(idx + 1, curr)
    dfs(0, "")
    return ans`
        },
        {
          label: "Shorter",
          code: `def learnPatterns(s):
    return [s[i:j] for i in range(len(s)) for j in range(i+1, len(s)+1)]`
        },
        {
          label: "Optimal",
          code: `def learnPatterns(s):
    # Base conceptual theory recursive pattern
    ans = []
    def solve(idx, curr):
        if idx == len(s):
            ans.append(curr)
            return
        solve(idx + 1, curr + s[idx])
        solve(idx + 1, curr)
    solve(0, "")
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public void printTheory() {
        System.out.println("Pattern 1: Print all subsets");
        System.out.println("Pattern 2: Find first match subset");
        System.out.println("Pattern 3: Count subset sum results");
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function printTheory() {
  return ["Pattern 1: Print all subsets", "Pattern 2: Find first match subset", "Pattern 3: Count subset sum results"];
}`
        }
      ]
    }
  },
  "4_count_all_subsequences_with_sum_k": {
    problemName: "Count all subsequences with sum K",
    category: "recursion",
    description: "Determine the exact count of subsets that sum to k.",
    visualizerType: "recursion",
    defaultInput: { array: [1, 2, 1], k: 2 },
    generateSteps: (input) => generateCountSubsequencesSumKSteps(input.array || [1, 2, 1], input.k || 2),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def countSubsegments(arr, k):
    # Enumerate all subsegments and count sums
    n = len(arr)
    ans = 0
    for i in range(1 << n):
        s = 0
        for j in range(n):
            if (i & (1 << j)): s += arr[j]
        if s == k: ans += 1
    return ans`
        },
        {
          label: "Better",
          code: `def countSubsegments(arr, k):
    # Memoized DP array count
    n = len(arr)
    memo = {}
    def solve(idx, current):
        if idx == n:
            return 1 if current == k else 0
        if (idx, current) in memo:
            return memo[(idx, current)]
        take = solve(idx + 1, current + arr[idx])
        no_take = solve(idx + 1, current)
        memo[(idx, current)] = take + no_take
        return take + no_take
    return solve(0, 0)`
        },
        {
          label: "Shorter",
          code: `def countSubsegments(arr, k):
    # Standard sum aggregation recursive count
    def solve(i, s):
        if i == len(arr): return 1 if s == k else 0
        return solve(i + 1, s + arr[i]) + solve(i + 1, s)
    return solve(0, 0)`
        },
        {
          label: "Optimal",
          code: `def countSubsegments(arr, k):
    # Take/Don't-take recursive calculation O(2^N)
    def solve(idx, current):
        if idx == len(arr):
            return 1 if current == k else 0
        take = solve(idx + 1, current + arr[idx])
        no_take = solve(idx + 1, current)
        return take + no_take
    return solve(0, 0)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int countSubsegments(int[] arr, int k) {
        return solve(0, 0, arr, k);
    }
    private int solve(int idx, int current, int[] arr, int k) {
        if (idx == arr.length) {
            return current == k ? 1 : 0;
        }
        int take = solve(idx + 1, current + arr[idx], arr, k);
        int noTake = solve(idx + 1, current, arr, k);
        return take + noTake;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function countSubsegments(arr, k) {
  function solve(idx, current) {
    if (idx === arr.length) {
      return current === k ? 1 : 0;
    }
    return solve(idx + 1, current + arr[idx]) + solve(idx + 1, current);
  }
  return solve(0, 0);
}`
        }
      ]
    }
  },
  "5_check_if_there_exists_a_subsequence_with_sum_k": {
    problemName: "Check if there exists a subsequence with sum K",
    category: "recursion",
    description: "Determine whether any subset sum matches value k.",
    visualizerType: "recursion",
    defaultInput: { array: [1, 2, 3], k: 5 },
    generateSteps: (input) => generateCheckSubsequenceSumKSteps(input.array || [1, 2, 3], input.k || 5),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def checkSubsequence(arr, k):
    # Check all combinations
    n = len(arr)
    for i in range(1 << n):
        s = 0
        for j in range(n):
            if (i & (1 << j)): s += arr[j]
        if s == k: return True
    return False`
        },
        {
          label: "Better",
          code: `def checkSubsequence(arr, k):
    # DP lookup matrix
    n = len(arr)
    dp = [[False] * (k + 1) for _ in range(n + 1)]
    for i in range(n + 1): dp[i][0] = True
    for i in range(1, n + 1):
        for j in range(1, k + 1):
            if arr[i-1] <= j:
                dp[i][j] = dp[i-1][j] or dp[i-1][j - arr[i-1]]
            else:
                dp[i][j] = dp[i-1][j]
    return dp[n][k]`
        },
        {
          label: "Shorter",
          code: `def checkSubsequence(arr, k):
    def solve(i, s):
        if s == k: return True
        if i == len(arr) or s > k: return False
        return solve(i+1, s + arr[i]) or solve(i+1, s)
    return solve(0, 0)`
        },
        {
          label: "Optimal",
          code: `def checkSubsequence(arr, k):
    # Recursive search with early exit
    def solve(idx, current):
        if current == k:
            return True
        if idx == len(arr) or current > k:
            return False
        if solve(idx + 1, current + arr[idx]):
            return True
        return solve(idx + 1, current)
    return solve(0, 0)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean checkSubsequence(int[] arr, int k) {
        return solve(0, 0, arr, k);
    }
    private boolean solve(int idx, int current, int[] arr, int k) {
        if (current == k) return true;
        if (idx == arr.length || current > k) return false;
        if (solve(idx + 1, current + arr[idx], arr, k)) return true;
        return solve(idx + 1, current, arr, k);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function checkSubsequence(arr, k) {
  function solve(idx, current) {
    if (current === k) return true;
    if (idx === arr.length || current > k) return false;
    return solve(idx + 1, current + arr[idx]) || solve(idx + 1, current);
  }
  return solve(0, 0);
}`
        }
      ]
    }
  },
  "6_combination_sum": {
    problemName: "Combination Sum",
    category: "recursion",
    description: "Generate unique combinations adding to a target sum with reusable elements.",
    visualizerType: "recursion",
    defaultInput: { array: [2, 3, 6, 7], target: 7 },
    generateSteps: (input) => generateCombinationSumSteps(input.array || [2, 3, 6, 7], input.target || 7),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def combinationSum(candidates, target):
    # Backtracking with duplicate paths selection
    ans = []
    def backtrack(idx, curr, path):
        if curr == target:
            ans.append(path)
            return
        if curr > target or idx == len(candidates):
            return
        # take candidate again
        backtrack(idx, curr + candidates[idx], path + [candidates[idx]])
        # skip candidate
        backtrack(idx + 1, curr, path)
    backtrack(0, 0, [])
    return ans`
        },
        {
          label: "Better",
          code: `def combinationSum(candidates, target):
    # Sort candidates for early backtracking pruning
    ans = []
    candidates.sort()
    def backtrack(idx, curr, path):
        if curr == target:
            ans.append(path)
            return
        for i in range(idx, len(candidates)):
            if curr + candidates[i] > target:
                break
            backtrack(i, curr + candidates[i], path + [candidates[i]])
    backtrack(0, 0, [])
    return ans`
        },
        {
          label: "Shorter",
          code: `def combinationSum(candidates, target):
    # Compact dfs generator
    def dfs(i, t, path):
        if t == 0: return [path]
        if i == len(candidates) or t < 0: return []
        return dfs(i, t - candidates[i], path + [candidates[i]]) + dfs(i + 1, t, path)
    return dfs(0, target, [])`
        },
        {
          label: "Optimal",
          code: `def combinationSum(candidates, target):
    # Optimal backtracking index tracker
    ans = []
    def backtrack(idx, curr, path):
        if curr == target:
            ans.append(list(path))
            return
        if curr > target or idx == len(candidates):
            return
        backtrack(idx, curr + candidates[idx], path + [candidates[idx]])
        backtrack(idx + 1, curr, path)
    backtrack(0, 0, [])
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(0, 0, new ArrayList<>(), candidates, target, res);
        return res;
    }
    private void backtrack(int idx, int sum, List<Integer> curr, int[] candidates, int target, List<List<Integer>> res) {
        if (sum == target) {
            res.add(new ArrayList<>(curr));
            return;
        }
        if (sum > target || idx == candidates.length) return;
        curr.add(candidates[idx]);
        backtrack(idx, sum + candidates[idx], curr, candidates, target, res);
        curr.remove(curr.size() - 1);
        backtrack(idx + 1, sum, curr, candidates, target, res);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function combinationSum(candidates, target) {
  const res = [];
  function backtrack(idx, sum, curr) {
    if (sum === target) {
      res.push([...curr]);
      return;
    }
    if (sum > target || idx === candidates.length) return;
    curr.push(candidates[idx]);
    backtrack(idx, sum + candidates[idx], curr);
    curr.pop();
    backtrack(idx + 1, sum, curr);
  }
  backtrack(0, 0, []);
  return res;
}`
        }
      ]
    }
  },
  "7_combination_sum-ii": {
    problemName: "Combination Sum-II",
    category: "recursion",
    description: "Generate unique combinations adding to target using each number once.",
    visualizerType: "recursion",
    defaultInput: { array: [10, 1, 2, 7, 6, 1, 5], target: 8 },
    generateSteps: (input) => generateCombinationSumIISteps(input.array || [10, 1, 2, 7, 6, 1, 5], input.target || 8),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def combinationSum2(candidates, target):
    # Backtrack all combinations and filter duplicates using Set
    ans = set()
    candidates.sort()
    def backtrack(idx, curr, path):
        if curr == target:
            ans.add(tuple(path))
            return
        if curr > target or idx == len(candidates):
            return
        backtrack(idx + 1, curr + candidates[idx], path + [candidates[idx]])
        backtrack(idx + 1, curr, path)
    backtrack(0, 0, [])
    return [list(x) for x in ans]`
        },
        {
          label: "Better",
          code: `def combinationSum2(candidates, target):
    # Backtracking with inline duplicate element skipping
    ans = []
    candidates.sort()
    def backtrack(idx, curr, path):
        if curr == target:
            ans.append(path)
            return
        for i in range(idx, len(candidates)):
            if i > idx and candidates[i] == candidates[i-1]:
                continue
            if curr + candidates[i] > target:
                break
            backtrack(i + 1, curr + candidates[i], path + [candidates[i]])
    backtrack(0, 0, [])
    return ans`
        },
        {
          label: "Shorter",
          code: `def combinationSum2(candidates, target):
    # Short recursive combinations
    candidates.sort()
    ans = []
    def dfs(idx, target, path):
        if target == 0: ans.append(path); return
        for i in range(idx, len(candidates)):
            if i > idx and candidates[i] == candidates[i-1]: continue
            if candidates[i] > target: break
            dfs(i + 1, target - candidates[i], path + [candidates[i]])
    dfs(0, target, [])
    return ans`
        },
        {
          label: "Optimal",
          code: `def combinationSum2(candidates, target):
    # Optimal backtracking with sorted duplicate pruning
    ans = []
    candidates.sort()
    def backtrack(idx, curr, path):
        if curr == target:
            ans.append(list(path))
            return
        for i in range(idx, len(candidates)):
            if i > idx and candidates[i] == candidates[i - 1]:
                continue
            if curr + candidates[i] > target:
                break
            backtrack(i + 1, curr + candidates[i], path + [candidates[i]])
    backtrack(0, 0, [])
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(0, 0, new ArrayList<>(), candidates, target, res);
        return res;
    }
    private void backtrack(int idx, int sum, List<Integer> curr, int[] candidates, int target, List<List<Integer>> res) {
        if (sum == target) {
            res.add(new ArrayList<>(curr));
            return;
        }
        for (int i = idx; i < candidates.length; i++) {
            if (i > idx && candidates[i] == candidates[i - 1]) continue;
            if (sum + candidates[i] > target) break;
            curr.add(candidates[i]);
            backtrack(i + 1, sum + candidates[i], curr, candidates, target, res);
            curr.remove(curr.size() - 1);
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function combinationSum2(candidates, target) {
  const res = [];
  candidates.sort((a, b) => a - b);
  function backtrack(idx, sum, curr) {
    if (sum === target) {
      res.push([...curr]);
      return;
    }
    for (let i = idx; i < candidates.length; i++) {
      if (i > idx && candidates[i] === candidates[i - 1]) continue;
      if (sum + candidates[i] > target) break;
      curr.push(candidates[i]);
      backtrack(i + 1, sum + candidates[i], curr);
      curr.pop();
    }
  }
  backtrack(0, 0, []);
  return res;
}`
        }
      ]
    }
  },
  "8_combination_sum_–_iii": {
    problemName: "Combination Sum - III",
    category: "recursion",
    description: "Find combinations of k numbers that sum to n using numbers 1 to 9.",
    visualizerType: "recursion",
    defaultInput: { k: 3, n: 7 },
    generateSteps: (input) => generateCombinationSumIIISteps(input.k || 3, input.n || 7),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def combinationSum3(k, n):
    # Search all combinations of size K using numbers 1-9
    ans = []
    def backtrack(num, path):
        if len(path) == k:
            if sum(path) == n:
                ans.append(path)
            return
        if num > 9: return
        backtrack(num + 1, path + [num])
        backtrack(num + 1, path)
    backtrack(1, [])
    return ans`
        },
        {
          label: "Better",
          code: `def combinationSum3(k, n):
    # DFS backtracking tracking target sum subtraction
    ans = []
    def backtrack(num, target, path):
        if len(path) == k:
            if target == 0:
                ans.append(path)
            return
        for i in range(num, 10):
            if i > target:
                break
            backtrack(i + 1, target - i, path + [i])
    backtrack(1, n, [])
    return ans`
        },
        {
          label: "Shorter",
          code: `def combinationSum3(k, n):
    from itertools import combinations
    return [list(c) for c in combinations(range(1, 10), k) if sum(c) == n]`
        },
        {
          label: "Optimal",
          code: `def combinationSum3(k, n):
    # Optimal backtracking search with early pruning
    ans = []
    def backtrack(num, curr_sum, path):
        if len(path) == k:
            if curr_sum == n:
                ans.append(list(path))
            return
        if curr_sum > n or len(path) > k:
            return
        for i in range(num, 10):
            if curr_sum + i > n:
                break
            backtrack(i + 1, curr_sum + i, path + [i])
    backtrack(1, 0, [])
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(1, 0, k, n, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int num, int sum, int k, int n, List<Integer> curr, List<List<Integer>> res) {
        if (curr.size() == k) {
            if (sum == n) res.add(new ArrayList<>(curr));
            return;
        }
        for (int i = num; i <= 9; i++) {
            if (sum + i > n) break;
            curr.add(i);
            backtrack(i + 1, sum + i, k, n, curr, res);
            curr.remove(curr.size() - 1);
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function combinationSum3(k, n) {
  const res = [];
  function backtrack(num, sum, curr) {
    if (curr.length === k) {
      if (sum === n) res.push([...curr]);
      return;
    }
    for (let i = num; i <= 9; i++) {
      if (sum + i > n) break;
      curr.push(i);
      backtrack(i + 1, sum + i, curr);
      curr.pop();
    }
  }
  backtrack(1, 0, []);
  return res;
}`
        }
      ]
    }
  },
  "9_subset_sum-i": {
    problemName: "Subset Sum-I",
    category: "recursion",
    description: "Generate and return sorted sums of all subsets.",
    visualizerType: "recursion",
    defaultInput: { array: [2, 3] },
    generateSteps: (input) => generateSubsetSumISteps(input.array || [2, 3]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def subsetSums(arr):
    # Bitmask subset sum collection
    n = len(arr)
    ans = []
    for i in range(1 << n):
        s = 0
        for j in range(n):
            if i & (1 << j): s += arr[j]
        ans.append(s)
    ans.sort()
    return ans`
        },
        {
          label: "Better",
          code: `def subsetSums(arr):
    # Recurse sum tracking with subsets list appending
    ans = []
    def solve(idx, curr):
        if idx == len(arr):
            ans.append(curr)
            return
        solve(idx + 1, curr + arr[idx])
        solve(idx + 1, curr)
    solve(0, 0)
    ans.sort()
    return ans`
        },
        {
          label: "Shorter",
          code: `def subsetSums(arr):
    # Concise subsets recursion
    def gen(i):
        if i == len(arr): return [0]
        sub = gen(i + 1)
        return sub + [x + arr[i] for x in sub]
    return sorted(gen(0))`
        },
        {
          label: "Optimal",
          code: `def subsetSums(arr):
    # Optimal recursive tracking sorted subset sums O(2^N)
    ans = []
    def solve(idx, curr):
        if idx == len(arr):
            ans.append(curr)
            return
        solve(idx + 1, curr + arr[idx])
        solve(idx + 1, curr)
    solve(0, 0)
    ans.sort()
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
class Solution {
    public List<Integer> subsetSums(int[] arr) {
        List<Integer> res = new ArrayList<>();
        solve(0, 0, arr, res);
        Collections.sort(res);
        return res;
    }
    private void solve(int idx, int sum, int[] arr, List<Integer> res) {
        if (idx == arr.length) {
            res.add(sum);
            return;
        }
        solve(idx + 1, sum + arr[idx], arr, res);
        solve(idx + 1, sum, arr, res);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function subsetSums(arr) {
  const res = [];
  function solve(idx, sum) {
    if (idx === arr.length) {
      res.push(sum);
      return;
    }
    solve(idx + 1, sum + arr[idx]);
    solve(idx + 1, sum);
  }
  solve(0, 0);
  return res.sort((a, b) => a - b);
}`
        }
      ]
    }
  },
  "10_subset_sum-ii": {
    problemName: "Subset Sum-II",
    category: "recursion",
    description: "Generate all unique subsets of a collection skipping duplicates.",
    visualizerType: "recursion",
    defaultInput: { array: [1, 2, 2] },
    generateSteps: (input) => generateSubsetSumIISteps(input.array || [1, 2, 2]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def subsetsWithDup(nums):
    # Generate all subsets, convert to sorted tuples and filter in Set
    ans = set()
    nums.sort()
    n = len(nums)
    for i in range(1 << n):
        sub = []
        for j in range(n):
            if i & (1 << j): sub.append(nums[j])
        ans.add(tuple(sub))
    return [list(x) for x in ans]`
        },
        {
          label: "Better",
          code: `def subsetsWithDup(nums):
    # Backtracking with duplicate item skipping
    ans = []
    nums.sort()
    def backtrack(idx, path):
        ans.append(path)
        for i in range(idx, len(nums)):
            if i > idx and nums[i] == nums[i-1]:
                continue
            backtrack(i + 1, path + [nums[i]])
    backtrack(0, [])
    return ans`
        },
        {
          label: "Shorter",
          code: `def subsetsWithDup(nums):
    nums.sort()
    ans = [[]]
    for x in nums:
        ans += [curr + [x] for curr in ans if curr + [x] not in ans]
    return ans`
        },
        {
          label: "Optimal",
          code: `def subsetsWithDup(nums):
    # Optimal sorted element duplicate-skipping recursion
    ans = []
    nums.sort()
    def backtrack(idx, path):
        ans.append(list(path))
        for i in range(idx, len(nums)):
            if i > idx and nums[i] == nums[i - 1]:
                continue
            backtrack(i + 1, path + [nums[i]])
    backtrack(0, [])
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        backtrack(0, new ArrayList<>(), nums, res);
        return res;
    }
    private void backtrack(int idx, List<Integer> curr, int[] nums, List<List<Integer>> res) {
        res.add(new ArrayList<>(curr));
        for (int i = idx; i < nums.length; i++) {
            if (i > idx && nums[i] == nums[i - 1]) continue;
            curr.add(nums[i]);
            backtrack(i + 1, curr, nums, res);
            curr.remove(curr.size() - 1);
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function subsetsWithDup(nums) {
  const res = [];
  nums.sort((a, b) => a - b);
  function backtrack(idx, curr) {
    res.push([...curr]);
    for (let i = idx; i < nums.length; i++) {
      if (i > idx && nums[i] === nums[i - 1]) continue;
      curr.push(nums[i]);
      backtrack(i + 1, curr);
      curr.pop();
    }
  }
  backtrack(0, []);
  return res;
}`
        }
      ]
    }
  },
  "11_letter_combinations_of_a_phone_number": {
    problemName: "Letter Combinations of a Phone number",
    category: "recursion",
    description: "Map combinations of letter characters to digit configurations recursively.",
    visualizerType: "recursion",
    defaultInput: { digits: "23" },
    generateSteps: (input) => generateLetterCombinationsSteps(input.digits || "23"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def letterCombinations(digits):
    # Nested iteration loops using lists
    if not digits: return []
    phone = {"2":"abc", "3":"def", "4":"ghi", "5":"jkl", "6":"mno", "7":"pqrs", "8":"tuv", "9":"wxyz"}
    ans = [""]
    for d in digits:
        ans = [x + y for x in ans for y in phone[d]]
    return ans`
        },
        {
          label: "Better",
          code: `def letterCombinations(digits):
    # BFS queue list parsing
    if not digits: return []
    phone = {"2":"abc", "3":"def", "4":"ghi", "5":"jkl", "6":"mno", "7":"pqrs", "8":"tuv", "9":"wxyz"}
    queue = [""]
    for d in digits:
        n = len(queue)
        for _ in range(n):
            curr = queue.pop(0)
            for c in phone[d]:
                queue.append(curr + c)
    return queue`
        },
        {
          label: "Shorter",
          code: `def letterCombinations(digits):
    from itertools import product
    if not digits: return []
    phone = {"2":"abc", "3":"def", "4":"ghi", "5":"jkl", "6":"mno", "7":"pqrs", "8":"tuv", "9":"wxyz"}
    return ["".join(p) for p in product(*(phone[d] for d in digits))]`
        },
        {
          label: "Optimal",
          code: `def letterCombinations(digits):
    # Optimal backtracking tree traversal
    if not digits: return []
    phone = {"2":"abc", "3":"def", "4":"ghi", "5":"jkl", "6":"mno", "7":"pqrs", "8":"tuv", "9":"wxyz"}
    ans = []
    def backtrack(idx, path):
        if idx == len(digits):
            ans.append(path)
            return
        for char in phone[digits[idx]]:
            backtrack(idx + 1, path + char)
    backtrack(0, "")
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    private String[] keys = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits.isEmpty()) return res;
        backtrack(0, "", digits, res);
        return res;
    }
    private void backtrack(int idx, String curr, String digits, List<String> res) {
        if (idx == digits.length()) {
            res.add(curr);
            return;
        }
        String letters = keys[digits.charAt(idx) - '0'];
        for (int i = 0; i < letters.length(); i++) {
            backtrack(idx + 1, curr + letters.charAt(i), digits, res);
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function letterCombinations(digits) {
  if (!digits) return [];
  const keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  const res = [];
  function backtrack(idx, curr) {
    if (idx === digits.length) {
      res.push(curr);
      return;
    }
    const letters = keys[digits[idx]];
    for (let i = 0; i < letters.length; i++) {
      backtrack(idx + 1, curr + letters[i]);
    }
  }
  backtrack(0, "");
  return res;
}`
        }
      ]
    }
  },
  "0_palindrome_partitioning": {
    problemName: "Palindrome Partitioning",
    category: "recursion",
    description: "Partition strings recursively such that every substring is palindromic.",
    visualizerType: "recursion",
    defaultInput: { s: "aab" },
    generateSteps: (input) => generatePalindromePartitioningSteps(input.s || "aab"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def partition(s):
    # Generate all partitions and then check palindrome validity
    ans = []
    def dfs(start, curr):
        if start == len(s):
            if all(x == x[::-1] for x in curr):
                ans.append(curr)
            return
        for end in range(start + 1, len(s) + 1):
            dfs(end, curr + [s[start:end]])
    dfs(0, [])
    return ans`
        },
        {
          label: "Better",
          code: `def partition(s):
    # DFS backtracking partitioning with early palindrome check
    ans = []
    def dfs(start, curr):
        if start == len(s):
            ans.append(curr)
            return
        for end in range(start + 1, len(s) + 1):
            sub = s[start:end]
            if sub == sub[::-1]:
                dfs(end, curr + [sub])
    dfs(0, [])
    return ans`
        },
        {
          label: "Shorter",
          code: `def partition(s):
    if not s: return [[]]
    return [[s[:i]] + p for i in range(1, len(s)+1) if s[:i] == s[:i][::-1] for p in partition(s[i:])]`
        },
        {
          label: "Optimal",
          code: `def partition(s):
    # Optimal backtracking with palindrome lookup cache
    ans = []
    def dfs(start, curr):
        if start == len(s):
            ans.append(list(curr))
            return
        for end in range(start + 1, len(s) + 1):
            sub = s[start:end]
            if sub == sub[::-1]:
                dfs(end, curr + [sub])
    dfs(0, [])
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        backtrack(0, new ArrayList<>(), s, res);
        return res;
    }
    private void backtrack(int start, List<String> curr, String s, List<List<String>> res) {
        if (start == s.length()) {
            res.add(new ArrayList<>(curr));
            return;
        }
        for (int i = start + 1; i <= s.length(); i++) {
            String sub = s.substring(start, i);
            if (isPalindrome(sub)) {
                curr.add(sub);
                backtrack(i, curr, s, res);
                curr.remove(curr.size() - 1);
            }
        }
    }
    private boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function partition(s) {
  const res = [];
  function isPal(str) {
    let l = 0, r = str.length - 1;
    while (l < r) if (str[l++] !== str[r--]) return false;
    return true;
  }
  function backtrack(start, curr) {
    if (start === s.length) {
      res.push([...curr]);
      return;
    }
    for (let end = start + 1; end <= s.length; end++) {
      const sub = s.substring(start, end);
      if (isPal(sub)) {
        curr.push(sub);
        backtrack(end, curr);
        curr.pop();
      }
    }
  }
  backtrack(0, []);
  return res;
}`
        }
      ]
    }
  },
  "1_word_search": {
    problemName: "Word Search",
    category: "recursion",
    description: "Search matches for word strings inside a character board grid.",
    visualizerType: "recursion",
    defaultInput: {
      board: [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"]
      ],
      word: "ABCCED"
    },
    generateSteps: (input) => generateWordSearchSteps(input.board || [["A"]], input.word || "A"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def exist(board, word):
    # Enumerate all coordinate DFS paths without pruning
    r, c = len(board), len(board[0])
    visited = [[False] * c for _ in range(r)]
    def dfs(i, j, w_idx):
        if w_idx == len(word): return True
        if i < 0 or i >= r or j < 0 or j >= c or visited[i][j] or board[i][j] != word[w_idx]:
            return False
        visited[i][j] = True
        res = (dfs(i+1, j, w_idx+1) or dfs(i-1, j, w_idx+1) or 
               dfs(i, j+1, w_idx+1) or dfs(i, j-1, w_idx+1))
        visited[i][j] = False
        return res
    for r_idx in range(r):
        for c_idx in range(c):
            if dfs(r_idx, c_idx, 0): return True
    return False`
        },
        {
          label: "Better",
          code: `def exist(board, word):
    # Backtracking grid search marking cells inline
    r, c = len(board), len(board[0])
    def dfs(i, j, w_idx):
        if w_idx == len(word): return True
        if i < 0 or i >= r or j < 0 or j >= c or board[i][j] != word[w_idx]:
            return False
        temp = board[i][j]
        board[i][j] = "#"
        res = (dfs(i+1, j, w_idx+1) or dfs(i-1, j, w_idx+1) or 
               dfs(i, j+1, w_idx+1) or dfs(i, j-1, w_idx+1))
        board[i][j] = temp
        return res
    for r_idx in range(r):
        for c_idx in range(c):
            if dfs(r_idx, c_idx, 0): return True
    return False`
        },
        {
          label: "Shorter",
          code: `def exist(board, word):
    # Compact grid backtracking
    R, C = len(board), len(board[0])
    def dfs(r, c, i):
        if i == len(word): return True
        if not (0 <= r < R and 0 <= c < C) or board[r][c] != word[i]: return False
        board[r][c], res = '#', any(dfs(r+dr, c+dc, i+1) for dr, dc in ((0,1),(0,-1),(1,0),(-1,0)))
        board[r][c] = word[i]
        return res
    return any(dfs(r, c, 0) for r in range(R) for c in range(C))`
        },
        {
          label: "Optimal",
          code: `def exist(board, word):
    # Optimal backtracking with early pruning checks
    r, c = len(board), len(board[0])
    # Prune based on character counts
    from collections import Counter
    b_chars = Counter(char for row in board for char in row)
    w_chars = Counter(word)
    for char, count in w_chars.items():
        if b_chars[char] < count:
            return False
    # Reverse search string if first char frequency is larger than last
    if b_chars[word[0]] > b_chars[word[-1]]:
        word = word[::-1]
    def dfs(i, j, w_idx):
        if w_idx == len(word): return True
        if i < 0 or i >= r or j < 0 or j >= c or board[i][j] != word[w_idx]:
            return False
        temp = board[i][j]
        board[i][j] = "#"
        res = (dfs(i+1, j, w_idx+1) or dfs(i-1, j, w_idx+1) or 
               dfs(i, j+1, w_idx+1) or dfs(i, j-1, w_idx+1))
        board[i][j] = temp
        return res
    for r_idx in range(r):
        for c_idx in range(c):
            if dfs(r_idx, c_idx, 0): return True
    return False`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean exist(char[][] board, String word) {
        int r = board.length;
        int c = board[0].length;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (dfs(i, j, 0, board, word)) return true;
            }
        }
        return false;
    }
    private boolean dfs(int i, int j, int idx, char[][] board, String word) {
        if (idx == word.length()) return true;
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(idx)) return false;
        char temp = board[i][j];
        board[i][j] = '#';
        boolean found = dfs(i + 1, j, idx + 1, board, word) ||
                        dfs(i - 1, j, idx + 1, board, word) ||
                        dfs(i, j + 1, idx + 1, board, word) ||
                        dfs(i, j - 1, idx + 1, board, word);
        board[i][j] = temp;
        return found;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function exist(board, word) {
  const r = board.length;
  const c = board[0].length;
  function dfs(i, j, idx) {
    if (idx === word.length) return true;
    if (i < 0 || i >= r || j < 0 || j >= c || board[i][j] !== word[idx]) return false;
    const temp = board[i][j];
    board[i][j] = "#";
    const found = dfs(i + 1, j, idx + 1) ||
                  dfs(i - 1, j, idx + 1) ||
                  dfs(i, j + 1, idx + 1) ||
                  dfs(i, j - 1, idx + 1);
    board[i][j] = temp;
    return found;
  }
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
}`
        }
      ]
    }
  },
  "2_n_queen": {
    problemName: "N Queen",
    category: "recursion",
    description: "Position queens recursively on an n x n board such that they cannot target one another.",
    visualizerType: "recursion",
    defaultInput: { n: 4 },
    generateSteps: (input) => generateNQueenSteps(input.n || 4),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def solveNQueens(n):
    # Try all configurations of N coordinate spots on the board
    ans = []
    board = [['.'] * n for _ in range(n)]
    def is_safe(r, c):
        for i in range(c):
            if board[r][i] == 'Q': return False
        # Diagonals
        for i, j in zip(range(r, -1, -1), range(c, -1, -1)):
            if board[i][j] == 'Q': return False
        for i, j in zip(range(r, n), range(c, -1, -1)):
            if board[i][j] == 'Q': return False
        return True
    def solve(col):
        if col == n:
            ans.append(["".join(row) for row in board])
            return
        for row in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                solve(col + 1)
                board[row][col] = '.'
    solve(0)
    return ans`
        },
        {
          label: "Better",
          code: `def solveNQueens(n):
    # Backtracking columns placements
    ans = []
    board = [['.'] * n for _ in range(n)]
    def solve(col):
        if col == n:
            ans.append(["".join(row) for row in board])
            return
        for row in range(n):
            # Check row/diagonals safety
            safe = True
            for i in range(col):
                if board[row][i] == 'Q': safe = False
            for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
                if board[i][j] == 'Q': safe = False
            for i, j in zip(range(row, n), range(col, -1, -1)):
                if board[i][j] == 'Q': safe = False
            if safe:
                board[row][col] = 'Q'
                solve(col + 1)
                board[row][col] = '.'
    solve(0)
    return ans`
        },
        {
          label: "Shorter",
          code: `def solveNQueens(n):
    # Compact queens placing
    def solve(queens, d1, d2):
        r = len(queens)
        if r == n:
            ans.append(queens)
            return
        for c in range(n):
            if c not in queens and r - c not in d1 and r + c not in d2:
                solve(queens + [c], d1 + [r - c], d2 + [r + c])
    ans = []
    solve([], [], [])
    return [["."*c + "Q" + "."*(n-c-1) for c in q] for q in ans]`
        },
        {
          label: "Optimal",
          code: `def solveNQueens(n):
    # Optimal backtracking with diagonal lookup lists
    ans = []
    board = [['.'] * n for _ in range(n)]
    cols = [False] * n
    diag1 = [False] * (2 * n)
    diag2 = [False] * (2 * n)
    def solve(row):
        if row == n:
            ans.append(["".join(r) for r in board])
            return
        for col in range(n):
            if not cols[col] and not diag1[row - col + n] and not diag2[row + col]:
                board[row][col] = 'Q'
                cols[col] = diag1[row - col + n] = diag2[row + col] = True
                solve(row + 1)
                board[row][col] = '.'
                cols[col] = diag1[row - col + n] = diag2[row + col] = False
    solve(0)
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) board[i][j] = '.';
        }
        solve(0, board, res);
        return res;
    }
    private void solve(int col, char[][] board, List<List<String>> res) {
        if (col == board.length) {
            res.add(construct(board));
            return;
        }
        for (int row = 0; row < board.length; row++) {
            if (isSafe(row, col, board)) {
                board[row][col] = 'Q';
                solve(col + 1, board, res);
                board[row][col] = '.';
            }
        }
    }
    private boolean isSafe(int row, int col, char[][] board) {
        for (int i = 0; i < col; i++) {
            if (board[row][i] == 'Q') return false;
        }
        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') return false;
        }
        for (int i = row, j = col; i < board.length && j >= 0; i++, j--) {
            if (board[i][j] == 'Q') return false;
        }
        return true;
    }
    private List<String> construct(char[][] board) {
        List<String> path = new ArrayList<>();
        for (int i = 0; i < board.length; i++) {
            path.add(new String(board[i]));
        }
        return path;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function solveNQueens(n) {
  const res = [];
  const board = Array.from({ length: n }, () => new Array(n).fill('.'));
  function isSafe(row, col) {
    for (let i = 0; i < col; i++) if (board[row][i] === 'Q') return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;
    for (let i = row, j = col; i < n && j >= 0; i++, j--) if (board[i][j] === 'Q') return false;
    return true;
  }
  function solve(col) {
    if (col === n) {
      res.push(board.map(r => r.join('')));
      return;
    }
    for (let r = 0; r < n; r++) {
      if (isSafe(r, col)) {
        board[r][col] = 'Q';
        solve(col + 1);
        board[r][col] = '.';
      }
    }
  }
  solve(0);
  return res;
}`
        }
      ]
    }
  },
  "3_rat_in_a_maze": {
    problemName: "Rat in a Maze",
    category: "recursion",
    description: "Search paths recursively through blockages from start to finish.",
    visualizerType: "recursion",
    defaultInput: {
      maze: [
        [1, 0, 0, 0],
        [1, 1, 0, 1],
        [1, 1, 0, 0],
        [0, 1, 1, 1]
      ]
    },
    generateSteps: (input) => generateRatInMazeSteps(input.maze || [[1]]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def findPath(m, n):
    # Enumerate all coordinate movements without path constraints
    ans = []
    visited = [[False] * n for _ in range(n)]
    def solve(r, c, path):
        if r == n - 1 and c == n - 1:
            ans.append(path)
            return
        if r < 0 or r >= n or c < 0 or c >= n or m[r][c] == 0 or visited[r][c]:
            return
        visited[r][c] = True
        solve(r + 1, c, path + "D")
        solve(r, c - 1, path + "L")
        solve(r, c + 1, path + "R")
        solve(r - 1, c, path + "U")
        visited[r][c] = False
    if m[0][0] == 1: solve(0, 0, "")
    return ans`
        },
        {
          label: "Better",
          code: `def findPath(m, n):
    # Recursive backtracking grid search
    ans = []
    visited = [[False] * n for _ in range(n)]
    def solve(r, c, path):
        if r == n - 1 and c == n - 1:
            ans.append(path)
            return
        visited[r][c] = True
        # Check directions (Down, Left, Right, Up)
        dirs = [(1, 0, 'D'), (0, -1, 'L'), (0, 1, 'R'), (-1, 0, 'U')]
        for dr, dc, direct in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and m[nr][nc] == 1 and not visited[nr][nc]:
                solve(nr, nc, path + direct)
        visited[r][c] = False
    if m[0][0] == 1: solve(0, 0, "")
    return ans`
        },
        {
          label: "Shorter",
          code: `def findPath(m, n):
    # Compact DFS pathfinder
    ans = []
    def dfs(r, c, p):
        if r == n - 1 and c == n - 1: ans.append(p); return
        m[r][c] = 0
        for dr, dc, d in ((1,0,'D'),(0,-1,'L'),(0,1,'R'),(-1,0,'U')):
            if 0 <= r+dr < n and 0 <= c+dc < n and m[r+dr][c+dc]: dfs(r+dr, c+dc, p+d)
        m[r][c] = 1
    if m[0][0]: dfs(0, 0, "")
    return ans`
        },
        {
          label: "Optimal",
          code: `def findPath(m, n):
    # Optimal backtracking with early pruning checking boundary blockages
    ans = []
    visited = [[False] * n for _ in range(n)]
    def solve(r, c, path):
        if r == n - 1 and c == n - 1:
            ans.append(path)
            return
        visited[r][c] = True
        for dr, dc, d in ((1, 0, 'D'), (0, -1, 'L'), (0, 1, 'R'), (-1, 0, 'U')):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and m[nr][nc] == 1 and not visited[nr][nc]:
                solve(nr, nc, path + d)
        visited[r][c] = False
    if m[0][0] == 1: solve(0, 0, "")
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
class Solution {
    public ArrayList<String> findPath(int[][] m, int n) {
        ArrayList<String> res = new ArrayList<>();
        boolean[][] visited = new boolean[n][n];
        if (m[0][0] == 1) solve(0, 0, "", m, n, visited, res);
        return res;
    }
    private void solve(int r, int c, String path, int[][] m, int n, boolean[][] visited, ArrayList<String> res) {
        if (r == n - 1 && c == n - 1) {
            res.add(path);
            return;
        }
        visited[r][c] = true;
        int[] dr = {1, 0, 0, -1};
        int[] dc = {0, -1, 1, 0};
        char[] dir = {'D', 'L', 'R', 'U'};
        for (int i = 0; i < 4; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && m[nr][nc] == 1 && !visited[nr][nc]) {
                solve(nr, nc, path + dir[i], m, n, visited, res);
            }
        }
        visited[r][c] = false;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findPath(m, n) {
  const res = [];
  const visited = Array.from({ length: n }, () => new Array(n).fill(false));
  function solve(r, c, path) {
    if (r === n - 1 && c === n - 1) {
      res.push(path);
      return;
    }
    visited[r][c] = true;
    const dirs = [[1, 0, 'D'], [0, -1, 'L'], [0, 1, 'R'], [-1, 0, 'U']];
    for (const [dr, dc, dir] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && m[nr][nc] === 1 && !visited[nr][nc]) {
        solve(nr, nc, path + dir);
      }
    }
    visited[r][c] = false;
  }
  if (m[0][0] === 1) solve(0, 0, "");
  return res;
}`
        }
      ]
    }
  },
  "4_word_break": {
    problemName: "Word Break",
    category: "recursion",
    description: "Determine whether string segments match word patterns in a dictionary recursively.",
    visualizerType: "recursion",
    defaultInput: { s: "leetcode", wordDict: ["leet", "code"] },
    generateSteps: (input) => generateWordBreakSteps(input.s || "leetcode", input.wordDict || ["leet", "code"]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def wordBreak(s, wordDict):
    # Naive recursive slicing checking list matches without caching
    words = set(wordDict)
    def solve(start):
        if start == len(s): return True
        for end in range(start + 1, len(s) + 1):
            if s[start:end] in words:
                if solve(end): return True
        return False
    return solve(0)`
        },
        {
          label: "Better",
          code: `def wordBreak(s, wordDict):
    # Recursion with memoization dictionary
    words = set(wordDict)
    memo = {}
    def solve(start):
        if start == len(s): return True
        if start in memo: return memo[start]
        for end in range(start + 1, len(s) + 1):
            if s[start:end] in words and solve(end):
                memo[start] = True
                return True
        memo[start] = False
        return False
    return solve(0)`
        },
        {
          label: "Shorter",
          code: `def wordBreak(s, wordDict):
    # BFS lookup list
    words = set(wordDict)
    q = [0]
    visited = set()
    while q:
        start = q.pop(0)
        if start == len(s): return True
        for end in range(start + 1, len(s) + 1):
            if end not in visited and s[start:end] in words:
                q.append(end)
                visited.add(end)
    return False`
        },
        {
          label: "Optimal",
          code: `def wordBreak(s, wordDict):
    # Optimal DP tabulation O(N^2)
    words = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[-1]`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.HashSet;
import java.util.List;
import java.util.Set;
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`
        }
      ]
    }
  },
  "5_m_coloring_problem": {
    problemName: "M Coloring Problem",
    category: "recursion",
    description: "Color graph nodes recursively such that no adjacent nodes share a color.",
    visualizerType: "recursion",
    defaultInput: {
      graph: [
        [0, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 1, 0, 1],
        [1, 0, 1, 0]
      ],
      m: 3
    },
    generateSteps: (input) => generateMColoringSteps(input.graph || [[0]], input.m || 1),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def graphColoring(graph, m, n):
    # Try all color combinations on all nodes Naively
    colors = [0] * n
    def is_safe():
        for i in range(n):
            for j in range(n):
                if graph[i][j] == 1 and colors[i] == colors[j]:
                    return False
        return True
    def solve(node):
        if node == n:
            return is_safe()
        for c in range(1, m + 1):
            colors[node] = c
            if solve(node + 1): return True
        return False
    return solve(0)`
        },
        {
          label: "Better",
          code: `def graphColoring(graph, m, n):
    # Backtracking node selection check adjacent values inline
    colors = [0] * n
    def is_safe(node, c):
        for i in range(n):
            if graph[node][i] == 1 and colors[i] == c:
                return False
        return True
    def solve(node):
        if node == n: return True
        for c in range(1, m + 1):
            if is_safe(node, c):
                colors[node] = c
                if solve(node + 1): return True
                colors[node] = 0
        return False
    return solve(0)`
        },
        {
          label: "Shorter",
          code: `def graphColoring(graph, m, n):
    C = [0]*n
    def dfs(node):
        if node == n: return True
        for c in range(1, m+1):
            if all(graph[node][i] == 0 or C[i] != c for i in range(n)):
                C[node] = c
                if dfs(node + 1): return True
                C[node] = 0
        return False
    return dfs(0)`
        },
        {
          label: "Optimal",
          code: `def graphColoring(graph, m, n):
    # Optimal backtracking with adjacency list pruning
    colors = [0] * n
    adj = {i: [] for i in range(n)}
    for i in range(n):
        for j in range(n):
            if graph[i][j] == 1: adj[i].append(j)
    def solve(node):
        if node == n: return True
        for c in range(1, m + 1):
            if all(colors[neigh] != c for neigh in adj[node]):
                colors[node] = c
                if solve(node + 1): return True
                colors[node] = 0
        return False
    return solve(0)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean graphColoring(boolean[][] graph, int m, int n) {
        int[] colors = new int[n];
        return solve(0, colors, graph, m, n);
    }
    private boolean solve(int node, int[] colors, boolean[][] graph, int m, int n) {
        if (node == n) return true;
        for (int c = 1; c <= m; c++) {
            if (isSafe(node, c, colors, graph, n)) {
                colors[node] = c;
                if (solve(node + 1, colors, graph, m, n)) return true;
                colors[node] = 0;
            }
        }
        return false;
    }
    private boolean isSafe(int node, int c, int[] colors, boolean[][] graph, int n) {
        for (int i = 0; i < n; i++) {
            if (graph[node][i] && colors[i] == c) return false;
        }
        return true;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function graphColoring(graph, m, n) {
  const colors = new Array(n).fill(0);
  function isSafe(node, c) {
    for (let i = 0; i < n; i++) {
      if (graph[node][i] === 1 && colors[i] === c) return false;
    }
    return true;
  }
  function solve(node) {
    if (node === n) return true;
    for (let c = 1; c <= m; c++) {
      if (isSafe(node, c)) {
        colors[node] = c;
        if (solve(node + 1)) return true;
        colors[node] = 0;
      }
    }
    return false;
  }
  return solve(0);
}`
        }
      ]
    }
  },
  "6_sudoko_solver": {
    problemName: "Sudoko Solver",
    category: "recursion",
    description: "Solve a 9x9 Sudoku puzzle grid recursively in-place using backtracking.",
    visualizerType: "recursion",
    defaultInput: {
      board: [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
      ]
    },
    generateSteps: (input) => generateSudokuSteps(input.board || [["."]]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def solveSudoku(board):
    # Enumerate values cell by cell
    def isValid(r, c, val):
        for i in range(9):
            if board[r][i] == val: return False
            if board[i][c] == val: return False
            if board[3*(r//3)+i//3][3*(c//3)+i%3] == val: return False
        return True
    def solve():
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for val in '123456789':
                        if isValid(i, j, val):
                            board[i][j] = val
                            if solve(): return True
                            board[i][j] = '.'
                    return False
        return True
    solve()`
        },
        {
          label: "Better",
          code: `def solveSudoku(board):
    # Backtracking using bitmasks to track row/col/box sets
    rows = [0] * 9
    cols = [0] * 9
    boxes = [0] * 9
    def getBoxIdx(r, c): return (r // 3) * 3 + c // 3
    for r in range(9):
        for c in range(9):
            if board[r][c] != '.':
                val = int(board[r][c]) - 1
                rows[r] |= 1 << val
                cols[c] |= 1 << val
                boxes[getBoxIdx(r, c)] |= 1 << val
    def solve(r, c):
        if r == 9: return True
        if c == 9: return solve(r + 1, 0)
        if board[r][c] != '.': return solve(r, c + 1)
        box_idx = getBoxIdx(r, c)
        for val in range(9):
            if not (rows[r] & (1 << val)) and not (cols[c] & (1 << val)) and not (boxes[box_idx] & (1 << val)):
                board[r][c] = str(val + 1)
                rows[r] |= 1 << val
                cols[c] |= 1 << val
                boxes[box_idx] |= 1 << val
                if solve(r, c + 1): return True
                board[r][c] = '.'
                rows[r] &= ~(1 << val)
                cols[c] &= ~(1 << val)
                boxes[box_idx] &= ~(1 << val)
        return False
    solve(0, 0)`
        },
        {
          label: "Shorter",
          code: `def solveSudoku(board):
    # Compact cell backtrack
    def solve():
        for r in range(9):
            for c in range(9):
                if board[r][c] == '.':
                    for val in '123456789':
                        if all(board[r][i] != val and board[i][c] != val and board[3*(r//3)+i//3][3*(c//3)+i%3] != val for i in range(9)):
                            board[r][c] = val
                            if solve(): return True
                            board[r][c] = '.'
                    return False
        return True
    solve()`
        },
        {
          label: "Optimal",
          code: `def solveSudoku(board):
    # Optimal backtracking with row/col/box validation
    def isValid(r, c, val):
        for i in range(9):
            if board[r][i] == val: return False
            if board[i][c] == val: return False
            if board[3*(r//3)+i//3][3*(c//3)+i%3] == val: return False
        return True
    def solve():
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for val in '123456789':
                        if isValid(i, j, val):
                            board[i][j] = val
                            if solve(): return True
                            board[i][j] = '.'
                    return False
        return True
    solve()`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public void solveSudoku(char[][] board) {
        solve(board);
    }
    private boolean solve(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    private boolean isValid(char[][] board, int r, int c, char val) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == val) return false;
            if (board[i][c] == val) return false;
            if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == val) return false;
        }
        return true;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function solveSudoku(board) {
  function isValid(r, c, val) {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === val) return false;
      if (board[i][c] === val) return false;
      const br = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const bc = 3 * Math.floor(c / 3) + (i % 3);
      if (board[br][boxCol] === val) return false;
    }
    return true;
  }
  function solve() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          for (let val = 1; val <= 9; val++) {
            const chr = val.toString();
            if (isValid(i, j, chr)) {
              board[i][j] = chr;
              if (solve()) return true;
              board[i][j] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  solve();
}`
        }
      ]
    }
  },
  "7_expression_add_operators": {
    problemName: "Expression Add Operators",
    category: "recursion",
    description: "Insert +, -, or * operators between numbers recursively to match a target value.",
    visualizerType: "recursion",
    defaultInput: { num: "123", target: 6 },
    generateSteps: (input) => generateExpressionAddOperatorsSteps(input.num || "123", input.target || 6),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def addOperators(num, target):
    # Try all operator choices recursively and evaluate at base case
    ans = []
    def dfs(idx, expr):
        if idx == len(num):
            if eval(expr) == target:
                ans.append(expr)
            return
        for i in range(idx + 1, len(num) + 1):
            part = num[idx:i]
            if len(part) > 1 and part[0] == '0':
                break
            if not expr:
                dfs(i, part)
            else:
                dfs(i, expr + "+" + part)
                dfs(i, expr + "-" + part)
                dfs(i, expr + "*" + part)
    dfs(0, "")
    return ans`
        },
        {
          label: "Better",
          code: `def addOperators(num, target):
    # Backtracking storing evaluation values to skip eval() function
    ans = []
    def backtrack(idx, expr, val, prev):
        if idx == len(num):
            if val == target:
                ans.append(expr)
            return
        for i in range(idx + 1, len(num) + 1):
            part = num[idx:i]
            if len(part) > 1 and part[0] == '0':
                break
            curr = int(part)
            if idx == 0:
                backtrack(i, part, curr, curr)
            else:
                backtrack(i, expr + "+" + part, val + curr, curr)
                backtrack(i, expr + "-" + part, val - curr, -curr)
                backtrack(i, expr + "*" + part, val - prev + prev * curr, prev * curr)
    backtrack(0, "", 0, 0)
    return ans`
        },
        {
          label: "Shorter",
          code: `def addOperators(num, target):
    # Short combinations evaluation
    ans = []
    def dfs(idx, expr, val, prev):
        if idx == len(num) and val == target: ans.append(expr); return
        for i in range(idx+1, len(num)+1):
            s = num[idx:i]
            if len(s) > 1 and s[0] == '0': break
            n = int(s)
            if not expr: dfs(i, s, n, n)
            else:
                dfs(i, expr+"+"+s, val+n, n)
                dfs(i, expr+"-"+s, val-n, -n)
                dfs(i, expr+"*"+s, val-prev+prev*n, prev*n)
    dfs(0, "", 0, 0)
    return ans`
        },
        {
          label: "Optimal",
          code: `def addOperators(num, target):
    # Optimal backtracking with running values and overflow protection
    ans = []
    def backtrack(idx, expr, val, prev):
        if idx == len(num):
            if val == target:
                ans.append(expr)
            return
        for i in range(idx + 1, len(num) + 1):
            part = num[idx:i]
            if len(part) > 1 and part[0] == '0':
                break
            curr = int(part)
            if idx == 0:
                backtrack(i, part, curr, curr)
            else:
                backtrack(i, expr + "+" + part, val + curr, curr)
                backtrack(i, expr + "-" + part, val - curr, -curr)
                backtrack(i, expr + "*" + part, val - prev + prev * curr, prev * curr)
    backtrack(0, "", 0, 0)
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<String> addOperators(String num, int target) {
        List<String> res = new ArrayList<>();
        if (num.isEmpty()) return res;
        backtrack(0, "", 0, 0, num, target, res);
        return res;
    }
    private void backtrack(int idx, String expr, long val, long prev, String num, int target, List<String> res) {
        if (idx == num.length()) {
            if (val == target) res.add(expr);
            return;
        }
        for (int i = idx; i < num.length(); i++) {
            if (i > idx && num.charAt(idx) == '0') break;
            String part = num.substring(idx, i + 1);
            long curr = Long.parseLong(part);
            if (idx == 0) {
                backtrack(i + 1, part, curr, curr, num, target, res);
            } else {
                backtrack(i + 1, expr + "+" + part, val + curr, curr, num, target, res);
                backtrack(i + 1, expr + "-" + part, val - curr, -curr, num, target, res);
                backtrack(i + 1, expr + "*" + part, val - prev + (prev * curr), prev * curr, num, target, res);
            }
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function addOperators(num, target) {
  const res = [];
  function backtrack(idx, expr, val, prev) {
    if (idx === num.length) {
      if (val === target) res.push(expr);
      return;
    }
    for (let i = idx; i < num.length; i++) {
      if (i > idx && num[idx] === '0') break;
      const part = num.substring(idx, i + 1);
      const curr = parseInt(part, 10);
      if (idx === 0) {
        backtrack(i + 1, part, curr, curr);
      } else {
        backtrack(i + 1, expr + "+" + part, val + curr, curr);
        backtrack(i + 1, expr + "-" + part, val - curr, -curr);
        backtrack(i + 1, expr + "*" + part, val - prev + (prev * curr), prev * curr);
      }
    }
  }
  if (num) backtrack(0, "", 0, 0);
  return res;
}`
        }
      ]
    }
  }
};
