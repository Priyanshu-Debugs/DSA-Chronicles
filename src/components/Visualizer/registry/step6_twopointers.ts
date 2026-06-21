import { ProblemVisualizerMeta } from "../visualizerRegistry";

// ─── Type Alias ──────────────────────────────────────────────────────
interface GenericArrayStep {
  array: number[];
  pointers: Record<string, number | null>;
  highlights: Record<number, string> | string[];
  variables: Record<string, any>;
  description: string;
  codeLineMap: Record<string, number>;
}

// ─── Step Generators ─────────────────────────────────────────────────

export function generateLongestSubstringWithoutRepeatingSteps(s: string): any[] {
  const steps: any[] = [];
  const charArr = s.split("");
  const set = new Set<string>();
  let left = 0;
  let maxLen = 0;
  let bestL = 0, bestR = -1;

  steps.push({
    array: charArr,
    pointers: { left: 0, right: 0 },
    highlights: {},
    variables: { window: "", max_len: 0 },
    description: `Initialize sliding window. left = 0, right = 0. Find longest substring without repeating characters in "${s}".`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let right = 0; right < charArr.length; right++) {
    while (set.has(charArr[right])) {
      set.delete(charArr[left]);
      left++;
      const hl: Record<number, string> = {};
      for (let k = left; k < right; k++) hl[k] = "active";
      steps.push({
        array: charArr,
        pointers: { left, right },
        highlights: hl,
        variables: { window: charArr.slice(left, right).join(""), removing: charArr[left - 1], max_len: maxLen },
        description: `Duplicate '${charArr[right]}' found. Shrink window: remove '${charArr[left - 1]}', left = ${left}.`,
        codeLineMap: { "python-brute": 5, "python-better": 5, "python-shorter": 3, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
    }
    set.add(charArr[right]);
    const windowLen = right - left + 1;
    const hl: Record<number, string> = {};
    for (let k = left; k <= right; k++) hl[k] = "active";
    if (windowLen > maxLen) {
      maxLen = windowLen;
      bestL = left; bestR = right;
      for (let k = left; k <= right; k++) hl[k] = "sorted";
    }
    steps.push({
      array: charArr,
      pointers: { left, right },
      highlights: hl,
      variables: { window: charArr.slice(left, right + 1).join(""), window_len: windowLen, max_len: maxLen },
      description: `Add '${charArr[right]}' to window. Window = "${charArr.slice(left, right + 1).join("")}" (len ${windowLen}). Max = ${maxLen}.`,
      codeLineMap: { "python-brute": 7, "python-better": 7, "python-shorter": 4, "python-optimal": 7, "java-optimal": 7, "javascript-optimal": 7 }
    });
  }

  const finalHl: Record<number, string> = {};
  for (let k = 0; k < charArr.length; k++) finalHl[k] = (k >= bestL && k <= bestR) ? "sorted" : "inactive";
  steps.push({
    array: charArr,
    pointers: {},
    highlights: finalHl,
    variables: { result: maxLen, substring: charArr.slice(bestL, bestR + 1).join("") },
    description: `Complete. Longest substring without repeating characters has length ${maxLen}: "${charArr.slice(bestL, bestR + 1).join("")}".`,
    codeLineMap: { "python-brute": 9, "python-better": 8, "python-shorter": 5, "python-optimal": 8, "java-optimal": 9, "javascript-optimal": 9 }
  });
  return steps;
}

export function generateMaxConsecutiveOnesIIISteps(arr: number[], k: number): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let left = 0;
  let zeros = 0;
  let maxLen = 0;

  steps.push({
    array: [...arr], pointers: { left: 0, right: 0 }, highlights: {},
    variables: { zeros: 0, k, max_len: 0 },
    description: `Sliding window approach. Find longest subarray of 1s after flipping at most ${k} zeros.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let right = 0; right < arr.length; right++) {
    if (arr[right] === 0) zeros++;
    while (zeros > k) {
      if (arr[left] === 0) zeros--;
      left++;
      const hl: Record<number, string> = {};
      for (let i = left; i <= right; i++) hl[i] = "active";
      steps.push({
        array: [...arr], pointers: { left, right }, highlights: hl,
        variables: { zeros, k, max_len: maxLen },
        description: `Too many zeros (${zeros + 1} > ${k}). Shrink: left = ${left}.`,
        codeLineMap: { "python-brute": 6, "python-better": 6, "python-shorter": 4, "python-optimal": 6, "java-optimal": 6, "javascript-optimal": 6 }
      });
    }
    const windowLen = right - left + 1;
    maxLen = Math.max(maxLen, windowLen);
    const hl: Record<number, string> = {};
    for (let i = left; i <= right; i++) hl[i] = "active";
    steps.push({
      array: [...arr], pointers: { left, right }, highlights: hl,
      variables: { zeros, k, window_len: windowLen, max_len: maxLen },
      description: `Expand right to ${right} (val=${arr[right]}). Window len = ${windowLen}. Max = ${maxLen}.`,
      codeLineMap: { "python-brute": 8, "python-better": 8, "python-shorter": 5, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
    });
  }

  steps.push({
    array: [...arr], pointers: {}, highlights: arr.map(() => "inactive"),
    variables: { result: maxLen },
    description: `Complete. Maximum consecutive ones after flipping at most ${k} zeros = ${maxLen}.`,
    codeLineMap: { "python-brute": 9, "python-better": 9, "python-shorter": 6, "python-optimal": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });
  return steps;
}

export function generateFruitIntoBasketsSteps(arr: number[]): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const freq: Record<number, number> = {};
  let left = 0;
  let maxLen = 0;

  steps.push({
    array: [...arr], pointers: { left: 0, right: 0 }, highlights: {},
    variables: { baskets: "{}", max_len: 0 },
    description: "Sliding window with at most 2 distinct fruit types. Maximize window length.",
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let right = 0; right < arr.length; right++) {
    freq[arr[right]] = (freq[arr[right]] || 0) + 1;
    while (Object.keys(freq).length > 2) {
      freq[arr[left]]--;
      if (freq[arr[left]] === 0) delete freq[arr[left]];
      left++;
    }
    const windowLen = right - left + 1;
    maxLen = Math.max(maxLen, windowLen);
    const hl: Record<number, string> = {};
    for (let k = left; k <= right; k++) hl[k] = "active";
    steps.push({
      array: [...arr], pointers: { left, right }, highlights: hl,
      variables: { baskets: JSON.stringify(freq), window_len: windowLen, max_len: maxLen },
      description: `Add fruit ${arr[right]}. Window [${left}..${right}], types: ${Object.keys(freq).join(",")}. Max = ${maxLen}.`,
      codeLineMap: { "python-brute": 6, "python-better": 6, "python-shorter": 4, "python-optimal": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });
  }

  steps.push({
    array: [...arr], pointers: {}, highlights: arr.map(() => "inactive"),
    variables: { result: maxLen },
    description: `Complete. Max fruits with 2 baskets = ${maxLen}.`,
    codeLineMap: { "python-brute": 9, "python-better": 9, "python-shorter": 5, "python-optimal": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });
  return steps;
}

export function generateLongestRepeatingCharReplacementSteps(s: string, k: number): any[] {
  const steps: any[] = [];
  const charArr = s.split("");
  const freq: Record<string, number> = {};
  let left = 0;
  let maxFreq = 0;
  let maxLen = 0;

  steps.push({
    array: charArr, pointers: { left: 0, right: 0 }, highlights: {},
    variables: { k, max_freq: 0, max_len: 0 },
    description: `Sliding window. Replace at most ${k} characters to get longest repeating substring.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let right = 0; right < charArr.length; right++) {
    freq[charArr[right]] = (freq[charArr[right]] || 0) + 1;
    maxFreq = Math.max(maxFreq, freq[charArr[right]]);
    const windowLen = right - left + 1;

    if (windowLen - maxFreq > k) {
      freq[charArr[left]]--;
      left++;
    }

    const curLen = right - left + 1;
    maxLen = Math.max(maxLen, curLen);
    const hl: Record<number, string> = {};
    for (let i = left; i <= right; i++) hl[i] = "active";
    steps.push({
      array: charArr, pointers: { left, right }, highlights: hl,
      variables: { char: charArr[right], max_freq: maxFreq, window_len: curLen, replacements: curLen - maxFreq, max_len: maxLen },
      description: `Add '${charArr[right]}'. Window [${left}..${right}], maxFreq=${maxFreq}, replacements=${curLen - maxFreq}. Max = ${maxLen}.`,
      codeLineMap: { "python-brute": 7, "python-better": 6, "python-shorter": 4, "python-optimal": 6, "java-optimal": 7, "javascript-optimal": 7 }
    });
  }

  steps.push({
    array: charArr, pointers: {}, highlights: charArr.map(() => "inactive"),
    variables: { result: maxLen },
    description: `Complete. Longest repeating character substring after ${k} replacements = ${maxLen}.`,
    codeLineMap: { "python-brute": 10, "python-better": 8, "python-shorter": 5, "python-optimal": 8, "java-optimal": 9, "javascript-optimal": 9 }
  });
  return steps;
}

export function generateBinarySubarrayWithSumSteps(arr: number[], goal: number): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let count = 0;

  // atMost helper inline
  function atMost(g: number): number {
    if (g < 0) return 0;
    let l = 0, s = 0, c = 0;
    for (let r = 0; r < arr.length; r++) {
      s += arr[r];
      while (s > g) { s -= arr[l]; l++; }
      c += r - l + 1;
    }
    return c;
  }

  steps.push({
    array: [...arr], pointers: {}, highlights: {},
    variables: { goal, approach: "atMost(goal) - atMost(goal-1)" },
    description: `Count subarrays with sum exactly ${goal} using atMost trick.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  // Simulate the sliding window for atMost(goal)
  let left = 0, sum = 0;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum > goal) { sum -= arr[left]; left++; }
    count += right - left + 1;
    const hl: Record<number, string> = {};
    for (let k = left; k <= right; k++) hl[k] = "active";
    steps.push({
      array: [...arr], pointers: { left, right }, highlights: hl,
      variables: { sum, subarrays_ending_here: right - left + 1, total_count: count },
      description: `Window [${left}..${right}], sum=${sum}. Subarrays ending at ${right}: ${right - left + 1}. Running count = ${count}.`,
      codeLineMap: { "python-brute": 5, "python-better": 6, "python-shorter": 3, "python-optimal": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });
  }

  const totalGoal = count;
  const totalGoalMinus1 = atMost(goal - 1);
  const result = totalGoal - totalGoalMinus1;

  steps.push({
    array: [...arr], pointers: {}, highlights: arr.map(() => "sorted"),
    variables: { atMost_goal: totalGoal, atMost_goal_minus_1: totalGoalMinus1, result },
    description: `atMost(${goal}) = ${totalGoal}, atMost(${goal - 1}) = ${totalGoalMinus1}. Exact count = ${totalGoal} - ${totalGoalMinus1} = ${result}.`,
    codeLineMap: { "python-brute": 8, "python-better": 9, "python-shorter": 5, "python-optimal": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });
  return steps;
}

export function generateCountNiceSubarraysSteps(arr: number[], k: number): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  let count = 0;
  let left = 0, oddCount = 0;

  steps.push({
    array: [...arr], pointers: { left: 0, right: 0 }, highlights: {},
    variables: { k, odd_count: 0, total: 0 },
    description: `Count subarrays with exactly ${k} odd numbers. Using atMost(k) - atMost(k-1).`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let right = 0; right < arr.length; right++) {
    if (arr[right] % 2 !== 0) oddCount++;
    while (oddCount > k) {
      if (arr[left] % 2 !== 0) oddCount--;
      left++;
    }
    count += right - left + 1;
    const hl: Record<number, string> = {};
    for (let i = left; i <= right; i++) hl[i] = arr[i] % 2 !== 0 ? "compare" : "active";
    steps.push({
      array: [...arr], pointers: { left, right }, highlights: hl,
      variables: { odd_count: oddCount, subarrays: right - left + 1, total: count },
      description: `Window [${left}..${right}], odds=${oddCount}. Subarrays ending here: ${right - left + 1}. Total = ${count}.`,
      codeLineMap: { "python-brute": 6, "python-better": 6, "python-shorter": 4, "python-optimal": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });
  }

  steps.push({
    array: [...arr], pointers: {}, highlights: arr.map(() => "inactive"),
    variables: { result: count },
    description: `Complete. Nice subarrays with at most ${k} odds = ${count}.`,
    codeLineMap: { "python-brute": 8, "python-better": 8, "python-shorter": 5, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });
  return steps;
}

export function generateSubstringsAllThreeCharsSteps(s: string): any[] {
  const steps: any[] = [];
  const charArr = s.split("");
  const lastSeen: Record<string, number> = { a: -1, b: -1, c: -1 };
  let count = 0;

  steps.push({
    array: charArr, pointers: {}, highlights: {},
    variables: { last_a: -1, last_b: -1, last_c: -1, count: 0 },
    description: "Count substrings containing all three characters a, b, c. Track last seen positions.",
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let i = 0; i < charArr.length; i++) {
    lastSeen[charArr[i]] = i;
    const minLast = Math.min(lastSeen.a, lastSeen.b, lastSeen.c);
    if (minLast >= 0) count += minLast + 1;
    const hl: Record<number, string> = {};
    hl[i] = "active";
    if (lastSeen.a >= 0) hl[lastSeen.a] = "compare";
    if (lastSeen.b >= 0) hl[lastSeen.b] = "compare";
    if (lastSeen.c >= 0) hl[lastSeen.c] = "compare";
    steps.push({
      array: charArr, pointers: { i, last_a: lastSeen.a, last_b: lastSeen.b, last_c: lastSeen.c },
      highlights: hl,
      variables: { last_a: lastSeen.a, last_b: lastSeen.b, last_c: lastSeen.c, added: minLast >= 0 ? minLast + 1 : 0, count },
      description: `Index ${i}: '${charArr[i]}'. Last seen: a=${lastSeen.a}, b=${lastSeen.b}, c=${lastSeen.c}. Added ${minLast >= 0 ? minLast + 1 : 0}. Total = ${count}.`,
      codeLineMap: { "python-brute": 5, "python-better": 5, "python-shorter": 3, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });
  }

  steps.push({
    array: charArr, pointers: {}, highlights: charArr.map(() => "inactive"),
    variables: { result: count },
    description: `Complete. Number of substrings containing all three characters = ${count}.`,
    codeLineMap: { "python-brute": 8, "python-better": 7, "python-shorter": 4, "python-optimal": 7, "java-optimal": 7, "javascript-optimal": 7 }
  });
  return steps;
}

export function generateMaxPointsFromCardsSteps(arr: number[], k: number): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];
  const n = arr.length;
  let leftSum = 0;
  for (let i = 0; i < k; i++) leftSum += arr[i];
  let maxScore = leftSum;

  const hl0: Record<number, string> = {};
  for (let i = 0; i < k; i++) hl0[i] = "active";
  steps.push({
    array: [...arr], pointers: { left_end: k - 1 }, highlights: hl0,
    variables: { left_sum: leftSum, right_sum: 0, max_score: maxScore, k },
    description: `Start: take first ${k} cards. Sum = ${leftSum}. Max = ${maxScore}.`,
    codeLineMap: { "python-brute": 2, "python-better": 2, "python-shorter": 2, "python-optimal": 2, "java-optimal": 2, "javascript-optimal": 2 }
  });

  let rightSum = 0;
  for (let i = 0; i < k; i++) {
    leftSum -= arr[k - 1 - i];
    rightSum += arr[n - 1 - i];
    const total = leftSum + rightSum;
    maxScore = Math.max(maxScore, total);
    const hl: Record<number, string> = {};
    for (let j = 0; j < k - 1 - i; j++) hl[j] = "active";
    for (let j = n - 1 - i; j < n; j++) hl[j] = "compare";
    steps.push({
      array: [...arr], pointers: { left_end: k - 2 - i, right_start: n - 1 - i }, highlights: hl,
      variables: { left_sum: leftSum, right_sum: rightSum, total, max_score: maxScore },
      description: `Move: take ${k - 1 - i} from left, ${i + 1} from right. Score = ${leftSum} + ${rightSum} = ${total}. Max = ${maxScore}.`,
      codeLineMap: { "python-brute": 6, "python-better": 6, "python-shorter": 4, "python-optimal": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });
  }

  steps.push({
    array: [...arr], pointers: {}, highlights: arr.map(() => "inactive"),
    variables: { result: maxScore },
    description: `Complete. Maximum points from ${k} cards = ${maxScore}.`,
    codeLineMap: { "python-brute": 8, "python-better": 8, "python-shorter": 5, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });
  return steps;
}

export function generateLongestSubstringKDistinctSteps(s: string, k: number): any[] {
  const steps: any[] = [];
  const charArr = s.split("");
  const freq: Record<string, number> = {};
  let left = 0;
  let maxLen = 0;

  steps.push({
    array: charArr, pointers: { left: 0, right: 0 }, highlights: {},
    variables: { k, distinct: 0, max_len: 0 },
    description: `Find longest substring with at most ${k} distinct characters.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let right = 0; right < charArr.length; right++) {
    freq[charArr[right]] = (freq[charArr[right]] || 0) + 1;
    while (Object.keys(freq).length > k) {
      freq[charArr[left]]--;
      if (freq[charArr[left]] === 0) delete freq[charArr[left]];
      left++;
    }
    const windowLen = right - left + 1;
    maxLen = Math.max(maxLen, windowLen);
    const hl: Record<number, string> = {};
    for (let i = left; i <= right; i++) hl[i] = "active";
    steps.push({
      array: charArr, pointers: { left, right }, highlights: hl,
      variables: { distinct: Object.keys(freq).length, window: charArr.slice(left, right + 1).join(""), max_len: maxLen },
      description: `Window [${left}..${right}] = "${charArr.slice(left, right + 1).join("")}", distinct=${Object.keys(freq).length}. Max = ${maxLen}.`,
      codeLineMap: { "python-brute": 7, "python-better": 6, "python-shorter": 4, "python-optimal": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });
  }

  steps.push({
    array: charArr, pointers: {}, highlights: charArr.map(() => "inactive"),
    variables: { result: maxLen },
    description: `Complete. Longest substring with at most ${k} distinct chars = ${maxLen}.`,
    codeLineMap: { "python-brute": 9, "python-better": 8, "python-shorter": 5, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });
  return steps;
}

export function generateSubarraysKDifferentSteps(arr: number[], k: number): GenericArrayStep[] {
  const steps: GenericArrayStep[] = [];

  function atMost(goal: number): number {
    if (goal <= 0) return 0;
    const freq: Record<number, number> = {};
    let l = 0, c = 0;
    for (let r = 0; r < arr.length; r++) {
      freq[arr[r]] = (freq[arr[r]] || 0) + 1;
      while (Object.keys(freq).length > goal) {
        freq[arr[l]]--;
        if (freq[arr[l]] === 0) delete freq[arr[l]];
        l++;
      }
      c += r - l + 1;
    }
    return c;
  }

  steps.push({
    array: [...arr], pointers: {}, highlights: {},
    variables: { k, approach: "atMost(k) - atMost(k-1)" },
    description: `Count subarrays with exactly ${k} different integers. Use atMost(k) - atMost(k-1).`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  // Simulate atMost(k) window
  const freq: Record<number, number> = {};
  let left = 0, count = 0;
  for (let right = 0; right < arr.length; right++) {
    freq[arr[right]] = (freq[arr[right]] || 0) + 1;
    while (Object.keys(freq).length > k) {
      freq[arr[left]]--;
      if (freq[arr[left]] === 0) delete freq[arr[left]];
      left++;
    }
    count += right - left + 1;
    const hl: Record<number, string> = {};
    for (let i = left; i <= right; i++) hl[i] = "active";
    steps.push({
      array: [...arr], pointers: { left, right }, highlights: hl,
      variables: { distinct: Object.keys(freq).length, subarrays: right - left + 1, count },
      description: `atMost(${k}): window [${left}..${right}], distinct=${Object.keys(freq).length}. Subarrays = ${right - left + 1}. Total = ${count}.`,
      codeLineMap: { "python-brute": 5, "python-better": 6, "python-shorter": 3, "python-optimal": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });
  }

  const atMostK = count;
  const atMostKMinus1 = atMost(k - 1);
  const result = atMostK - atMostKMinus1;

  steps.push({
    array: [...arr], pointers: {}, highlights: arr.map(() => "sorted"),
    variables: { atMost_k: atMostK, atMost_k_minus_1: atMostKMinus1, result },
    description: `atMost(${k}) = ${atMostK}, atMost(${k - 1}) = ${atMostKMinus1}. Exactly ${k} different = ${result}.`,
    codeLineMap: { "python-brute": 9, "python-better": 9, "python-shorter": 5, "python-optimal": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });
  return steps;
}

export function generateMinWindowSubstringSteps(s: string, t: string): any[] {
  const steps: any[] = [];
  const sArr = s.split("");
  const need: Record<string, number> = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  const have: Record<string, number> = {};
  let formed = 0;
  const required = Object.keys(need).length;
  let left = 0;
  let minLen = Infinity;
  let bestL = 0, bestR = 0;

  steps.push({
    array: sArr, pointers: { left: 0, right: 0 }, highlights: {},
    variables: { t, need: JSON.stringify(need), formed: 0, required },
    description: `Find minimum window in "${s}" containing all chars of "${t}". Need ${required} unique chars.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let right = 0; right < sArr.length; right++) {
    const c = sArr[right];
    have[c] = (have[c] || 0) + 1;
    if (need[c] && have[c] === need[c]) formed++;

    while (formed === required) {
      const windowLen = right - left + 1;
      if (windowLen < minLen) {
        minLen = windowLen;
        bestL = left;
        bestR = right;
      }
      const hl: Record<number, string> = {};
      for (let i = left; i <= right; i++) hl[i] = "sorted";
      steps.push({
        array: sArr, pointers: { left, right }, highlights: hl,
        variables: { window: sArr.slice(left, right + 1).join(""), window_len: windowLen, min_len: minLen, formed },
        description: `Valid window [${left}..${right}] = "${sArr.slice(left, right + 1).join("")}" (len ${windowLen}). Min = ${minLen}. Shrink left.`,
        codeLineMap: { "python-brute": 8, "python-better": 8, "python-shorter": 5, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
      });
      const leftChar = sArr[left];
      have[leftChar]--;
      if (need[leftChar] && have[leftChar] < need[leftChar]) formed--;
      left++;
    }

    if (steps.length < 2 || (right % 2 === 0)) {
      const hl: Record<number, string> = {};
      for (let i = left; i <= right; i++) hl[i] = "active";
      steps.push({
        array: sArr, pointers: { left, right }, highlights: hl,
        variables: { char: c, formed, required, min_len: minLen === Infinity ? "∞" : minLen },
        description: `Expand right to ${right} ('${c}'). Formed = ${formed}/${required}.`,
        codeLineMap: { "python-brute": 5, "python-better": 5, "python-shorter": 3, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
    }
  }

  const finalHl: Record<number, string> = {};
  for (let i = 0; i < sArr.length; i++) finalHl[i] = (i >= bestL && i <= bestR) ? "sorted" : "inactive";
  steps.push({
    array: sArr, pointers: {}, highlights: finalHl,
    variables: { result: minLen === Infinity ? "" : sArr.slice(bestL, bestR + 1).join(""), length: minLen === Infinity ? 0 : minLen },
    description: minLen === Infinity ? "No valid window found." : `Complete. Min window = "${sArr.slice(bestL, bestR + 1).join("")}" (length ${minLen}).`,
    codeLineMap: { "python-brute": 10, "python-better": 10, "python-shorter": 6, "python-optimal": 10, "java-optimal": 10, "javascript-optimal": 10 }
  });
  return steps;
}

export function generateMinWindowSubsequenceSteps(s: string, t: string): any[] {
  const steps: any[] = [];
  const sArr = s.split("");
  let minLen = Infinity;
  let bestL = 0, bestR = 0;

  steps.push({
    array: sArr, pointers: {}, highlights: {},
    variables: { s, t, min_len: "∞" },
    description: `Find minimum window subsequence of "${t}" in "${s}". Forward-backward search.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  let start = 0;
  while (start < s.length) {
    // Forward pass
    let j = 0;
    let i = start;
    while (i < s.length && j < t.length) {
      if (s[i] === t[j]) j++;
      i++;
    }
    if (j < t.length) break;
    let end = i - 1;

    // Backward pass
    j = t.length - 1;
    i = end;
    while (i >= start && j >= 0) {
      if (s[i] === t[j]) j--;
      i--;
    }
    const windowStart = i + 1;
    const windowLen = end - windowStart + 1;

    if (windowLen < minLen) {
      minLen = windowLen;
      bestL = windowStart;
      bestR = end;
    }

    const hl: Record<number, string> = {};
    for (let k = windowStart; k <= end; k++) hl[k] = "sorted";
    steps.push({
      array: sArr, pointers: { window_start: windowStart, window_end: end }, highlights: hl,
      variables: { window: s.slice(windowStart, end + 1), window_len: windowLen, min_len: minLen },
      description: `Found subsequence window [${windowStart}..${end}] = "${s.slice(windowStart, end + 1)}" (len ${windowLen}). Min = ${minLen}.`,
      codeLineMap: { "python-brute": 7, "python-better": 7, "python-shorter": 4, "python-optimal": 7, "java-optimal": 7, "javascript-optimal": 7 }
    });

    start = windowStart + 1;
  }

  const finalHl: Record<number, string> = {};
  for (let i = 0; i < sArr.length; i++) finalHl[i] = (i >= bestL && i <= bestR) ? "sorted" : "inactive";
  steps.push({
    array: sArr, pointers: {}, highlights: finalHl,
    variables: { result: minLen === Infinity ? "" : s.slice(bestL, bestR + 1), length: minLen === Infinity ? 0 : minLen },
    description: minLen === Infinity ? "No valid window found." : `Complete. Min window subsequence = "${s.slice(bestL, bestR + 1)}" (length ${minLen}).`,
    codeLineMap: { "python-brute": 10, "python-better": 9, "python-shorter": 5, "python-optimal": 9, "java-optimal": 9, "javascript-optimal": 9 }
  });
  return steps;
}

// ─── Registry Object ─────────────────────────────────────────────────

export const step6TwoPointersRegistry: Record<string, ProblemVisualizerMeta> = {
  "0_longest_substring_without_repeating_characters": {
    problemName: "Longest Substring Without Repeating Characters",
    category: "two-pointers",
    description: "Find the length of the longest substring without repeating characters using a sliding window.",
    visualizerType: "stringmap",
    defaultInput: { s: "abcabcbb" },
    generateSteps: (input) => generateLongestSubstringWithoutRepeatingSteps(input.s || "abcabcbb"),
    solutions: {
      python: [
        { label: "Brute Force", code: `def lengthOfLongestSubstring(s):
    n = len(s)
    res = 0
    for i in range(n):
        seen = set()
        for j in range(i, n):
            if s[j] in seen:
                break
            seen.add(s[j])
            res = max(res, j - i + 1)
    return res` },
        { label: "Better", code: `def lengthOfLongestSubstring(s):
    last_seen = {}
    left = 0
    res = 0
    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right
        res = max(res, right - left + 1)
    return res` },
        { label: "Shorter", code: `def lengthOfLongestSubstring(s):
    seen, l, r = set(), 0, 0
    res = 0
    while r < len(s):
        while s[r] in seen: seen.discard(s[l]); l += 1
        seen.add(s[r]); res = max(res, r - l + 1); r += 1
    return res` },
        { label: "Optimal", code: `def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left++));
            }
            set.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left++]);
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}` },
      ],
    },
  },

  "1_max_consecutive_ones_iii": {
    problemName: "Max Consecutive Ones III",
    category: "two-pointers",
    description: "Find the longest subarray of 1s after flipping at most K zeros.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], target: 2 },
    generateSteps: (input) => generateMaxConsecutiveOnesIIISteps(input.array, input.target ?? 2),
    solutions: {
      python: [
        { label: "Brute Force", code: `def longestOnes(nums, k):
    n = len(nums)
    res = 0
    for i in range(n):
        zeros = 0
        for j in range(i, n):
            if nums[j] == 0:
                zeros += 1
            if zeros > k:
                break
            res = max(res, j - i + 1)
    return res` },
        { label: "Better", code: `def longestOnes(nums, k):
    left = 0
    zeros = 0
    res = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        res = max(res, right - left + 1)
    return res` },
        { label: "Shorter", code: `def longestOnes(nums, k):
    l = 0
    for r in range(len(nums)):
        k -= 1 - nums[r]
        if k < 0:
            k += 1 - nums[l]
            l += 1
    return r - l + 1` },
        { label: "Optimal", code: `def longestOnes(nums, k):
    left = 0
    max_len = 0
    zero_count = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zero_count += 1
        while zero_count > k:
            if nums[left] == 0:
                zero_count -= 1
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0, zeros = 0, maxLen = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > k) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function longestOnes(nums, k) {
  let left = 0, zeros = 0, maxLen = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}` },
      ],
    },
  },

  "2_fruit_into_baskets": {
    problemName: "Fruit Into Baskets",
    category: "two-pointers",
    description: "Find the longest subarray with at most 2 distinct elements (fruit types).",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 3, 2, 2] },
    generateSteps: (input) => generateFruitIntoBasketsSteps(input.array),
    solutions: {
      python: [
        { label: "Brute Force", code: `def totalFruit(fruits):
    n = len(fruits)
    res = 0
    for i in range(n):
        basket = set()
        for j in range(i, n):
            basket.add(fruits[j])
            if len(basket) > 2:
                break
            res = max(res, j - i + 1)
    return res` },
        { label: "Better", code: `def totalFruit(fruits):
    from collections import defaultdict
    freq = defaultdict(int)
    left = res = 0
    for right in range(len(fruits)):
        freq[fruits[right]] += 1
        while len(freq) > 2:
            freq[fruits[left]] -= 1
            if freq[fruits[left]] == 0:
                del freq[fruits[left]]
            left += 1
        res = max(res, right - left + 1)
    return res` },
        { label: "Shorter", code: `def totalFruit(fruits):
    f, l = {}, 0
    for r, v in enumerate(fruits):
        f[v] = f.get(v, 0) + 1
        if len(f) > 2:
            f[fruits[l]] -= 1
            if not f[fruits[l]]: del f[fruits[l]]
            l += 1
    return len(fruits) - l` },
        { label: "Optimal", code: `def totalFruit(fruits):
    freq = {}
    left = 0
    max_len = 0
    for right in range(len(fruits)):
        freq[fruits[right]] = freq.get(fruits[right], 0) + 1
        while len(freq) > 2:
            freq[fruits[left]] -= 1
            if freq[fruits[left]] == 0:
                del freq[fruits[left]]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < fruits.length; right++) {
            freq.merge(fruits[right], 1, Integer::sum);
            while (freq.size() > 2) {
                freq.merge(fruits[left], -1, Integer::sum);
                if (freq.get(fruits[left]) == 0) freq.remove(fruits[left]);
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function totalFruit(fruits) {
  const freq = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < fruits.length; right++) {
    freq.set(fruits[right], (freq.get(fruits[right]) || 0) + 1);
    while (freq.size > 2) {
      freq.set(fruits[left], freq.get(fruits[left]) - 1);
      if (freq.get(fruits[left]) === 0) freq.delete(fruits[left]);
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}` },
      ],
    },
  },

  "3_longest_repeating_character_replacement": {
    problemName: "Longest Repeating Character Replacement",
    category: "two-pointers",
    description: "Find the longest substring with same letters after replacing at most K characters.",
    visualizerType: "stringmap",
    defaultInput: { s: "AABABBA", target: 1 },
    generateSteps: (input) => generateLongestRepeatingCharReplacementSteps(input.s || "AABABBA", input.target ?? 1),
    solutions: {
      python: [
        { label: "Brute Force", code: `def characterReplacement(s, k):
    n = len(s)
    res = 0
    for i in range(n):
        freq = {}
        max_f = 0
        for j in range(i, n):
            freq[s[j]] = freq.get(s[j], 0) + 1
            max_f = max(max_f, freq[s[j]])
            if (j - i + 1) - max_f <= k:
                res = max(res, j - i + 1)
            else:
                break
    return res` },
        { label: "Better", code: `def characterReplacement(s, k):
    freq = {}
    left = 0
    max_freq = 0
    res = 0
    for right in range(len(s)):
        freq[s[right]] = freq.get(s[right], 0) + 1
        max_freq = max(max_freq, freq[s[right]])
        while (right - left + 1) - max_freq > k:
            freq[s[left]] -= 1
            left += 1
        res = max(res, right - left + 1)
    return res` },
        { label: "Shorter", code: `def characterReplacement(s, k):
    f, l, mf = {}, 0, 0
    for r in range(len(s)):
        f[s[r]] = f.get(s[r], 0) + 1
        mf = max(mf, f[s[r]])
        if r - l + 1 - mf > k: f[s[l]] -= 1; l += 1
    return len(s) - l` },
        { label: "Optimal", code: `def characterReplacement(s, k):
    freq = {}
    left = 0
    max_freq = 0
    max_len = 0
    for right in range(len(s)):
        freq[s[right]] = freq.get(s[right], 0) + 1
        max_freq = max(max_freq, freq[s[right]])
        if (right - left + 1) - max_freq > k:
            freq[s[left]] -= 1
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] freq = new int[26];
        int left = 0, maxFreq = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            freq[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq, freq[s.charAt(right) - 'A']);
            if (right - left + 1 - maxFreq > k) {
                freq[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function characterReplacement(s, k) {
  const freq = new Array(26).fill(0);
  let left = 0, maxFreq = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    freq[s.charCodeAt(right) - 65]++;
    maxFreq = Math.max(maxFreq, freq[s.charCodeAt(right) - 65]);
    if (right - left + 1 - maxFreq > k) {
      freq[s.charCodeAt(left) - 65]--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}` },
      ],
    },
  },

  "4_binary_subarray_with_sum": {
    problemName: "Binary Subarrays With Sum",
    category: "two-pointers",
    description: "Count subarrays with sum equal to goal using atMost sliding window trick.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 0, 1, 0, 1], target: 2 },
    generateSteps: (input) => generateBinarySubarrayWithSumSteps(input.array, input.target ?? 2),
    solutions: {
      python: [
        { label: "Brute Force", code: `def numSubarraysWithSum(nums, goal):
    count = 0
    n = len(nums)
    for i in range(n):
        s = 0
        for j in range(i, n):
            s += nums[j]
            if s == goal:
                count += 1
            elif s > goal:
                break
    return count` },
        { label: "Better", code: `def numSubarraysWithSum(nums, goal):
    from collections import defaultdict
    prefix = defaultdict(int)
    prefix[0] = 1
    s = 0
    count = 0
    for num in nums:
        s += num
        count += prefix[s - goal]
        prefix[s] += 1
    return count` },
        { label: "Shorter", code: `def numSubarraysWithSum(nums, goal):
    def atMost(g):
        if g < 0: return 0
        l = s = c = 0
        for r in range(len(nums)):
            s += nums[r]
            while s > g: s -= nums[l]; l += 1
            c += r - l + 1
        return c
    return atMost(goal) - atMost(goal - 1)` },
        { label: "Optimal", code: `def numSubarraysWithSum(nums, goal):
    def atMost(k):
        if k < 0:
            return 0
        left = 0
        total = 0
        count = 0
        for right in range(len(nums)):
            total += nums[right]
            while total > k:
                total -= nums[left]
                left += 1
            count += right - left + 1
        return count
    return atMost(goal) - atMost(goal - 1)` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        return atMost(nums, goal) - atMost(nums, goal - 1);
    }
    private int atMost(int[] nums, int k) {
        if (k < 0) return 0;
        int left = 0, sum = 0, count = 0;
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum > k) sum -= nums[left++];
            count += right - left + 1;
        }
        return count;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function numSubarraysWithSum(nums, goal) {
  function atMost(k) {
    if (k < 0) return 0;
    let left = 0, sum = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum > k) sum -= nums[left++];
      count += right - left + 1;
    }
    return count;
  }
  return atMost(goal) - atMost(goal - 1);
}` },
      ],
    },
  },

  "5_count_number_of_nice_subarrays": {
    problemName: "Count Number of Nice Subarrays",
    category: "two-pointers",
    description: "Count subarrays with exactly K odd numbers using the atMost technique.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 1, 2, 1, 1], target: 3 },
    generateSteps: (input) => generateCountNiceSubarraysSteps(input.array, input.target ?? 3),
    solutions: {
      python: [
        { label: "Brute Force", code: `def numberOfSubarrays(nums, k):
    count = 0
    n = len(nums)
    for i in range(n):
        odds = 0
        for j in range(i, n):
            if nums[j] % 2 != 0:
                odds += 1
            if odds == k:
                count += 1
            elif odds > k:
                break
    return count` },
        { label: "Better", code: `def numberOfSubarrays(nums, k):
    prefix = {0: 1}
    odds = 0
    count = 0
    for num in nums:
        if num % 2 != 0:
            odds += 1
        count += prefix.get(odds - k, 0)
        prefix[odds] = prefix.get(odds, 0) + 1
    return count` },
        { label: "Shorter", code: `def numberOfSubarrays(nums, k):
    def atMost(g):
        l = o = c = 0
        for r in range(len(nums)):
            o += nums[r] % 2
            while o > g: o -= nums[l] % 2; l += 1
            c += r - l + 1
        return c
    return atMost(k) - atMost(k - 1)` },
        { label: "Optimal", code: `def numberOfSubarrays(nums, k):
    def atMost(goal):
        left = 0
        odds = 0
        count = 0
        for right in range(len(nums)):
            if nums[right] % 2 != 0:
                odds += 1
            while odds > goal:
                if nums[left] % 2 != 0:
                    odds -= 1
                left += 1
            count += right - left + 1
        return count
    return atMost(k) - atMost(k - 1)` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
    private int atMost(int[] nums, int k) {
        int left = 0, odds = 0, count = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] % 2 != 0) odds++;
            while (odds > k) {
                if (nums[left] % 2 != 0) odds--;
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function numberOfSubarrays(nums, k) {
  function atMost(goal) {
    let left = 0, odds = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      if (nums[right] % 2 !== 0) odds++;
      while (odds > goal) {
        if (nums[left] % 2 !== 0) odds--;
        left++;
      }
      count += right - left + 1;
    }
    return count;
  }
  return atMost(k) - atMost(k - 1);
}` },
      ],
    },
  },

  "6_number_of_substring_containing_all_three_characters": {
    problemName: "Number of Substrings Containing All Three Characters",
    category: "two-pointers",
    description: "Count substrings containing at least one 'a', 'b', and 'c'.",
    visualizerType: "stringmap",
    defaultInput: { s: "abcabc" },
    generateSteps: (input) => generateSubstringsAllThreeCharsSteps(input.s || "abcabc"),
    solutions: {
      python: [
        { label: "Brute Force", code: `def numberOfSubstrings(s):
    count = 0
    n = len(s)
    for i in range(n):
        seen = set()
        for j in range(i, n):
            seen.add(s[j])
            if len(seen) == 3:
                count += n - j
                break
    return count` },
        { label: "Better", code: `def numberOfSubstrings(s):
    count = 0
    left = 0
    freq = {'a': 0, 'b': 0, 'c': 0}
    for right in range(len(s)):
        freq[s[right]] += 1
        while all(freq[c] > 0 for c in 'abc'):
            count += len(s) - right
            freq[s[left]] -= 1
            left += 1
    return count` },
        { label: "Shorter", code: `def numberOfSubstrings(s):
    last = {'a': -1, 'b': -1, 'c': -1}
    res = 0
    for i, c in enumerate(s):
        last[c] = i
        res += 1 + min(last.values())
    return res` },
        { label: "Optimal", code: `def numberOfSubstrings(s):
    last_seen = [-1, -1, -1]
    count = 0
    for i in range(len(s)):
        last_seen[ord(s[i]) - ord('a')] = i
        count += 1 + min(last_seen)
    return count` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int numberOfSubstrings(String s) {
        int[] lastSeen = {-1, -1, -1};
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            lastSeen[s.charAt(i) - 'a'] = i;
            count += 1 + Math.min(lastSeen[0], Math.min(lastSeen[1], lastSeen[2]));
        }
        return count;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function numberOfSubstrings(s) {
  const lastSeen = [-1, -1, -1];
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    lastSeen[s.charCodeAt(i) - 97] = i;
    count += 1 + Math.min(...lastSeen);
  }
  return count;
}` },
      ],
    },
  },

  "7_maximum_point_you_can_obtain_from_cards": {
    problemName: "Maximum Points You Can Obtain from Cards",
    category: "two-pointers",
    description: "Pick K cards from either end to maximize total score.",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 3, 4, 5, 6, 1], target: 3 },
    generateSteps: (input) => generateMaxPointsFromCardsSteps(input.array, input.target ?? 3),
    solutions: {
      python: [
        { label: "Brute Force", code: `def maxScore(cardPoints, k):
    from itertools import combinations
    n = len(cardPoints)
    indices = list(range(k)) + list(range(n - k, n))
    best = 0
    for combo in combinations(indices, k):
        best = max(best, sum(cardPoints[i] for i in combo))
    return best` },
        { label: "Better", code: `def maxScore(cardPoints, k):
    n = len(cardPoints)
    total = sum(cardPoints)
    window_size = n - k
    window_sum = sum(cardPoints[:window_size])
    min_sum = window_sum
    for i in range(window_size, n):
        window_sum += cardPoints[i] - cardPoints[i - window_size]
        min_sum = min(min_sum, window_sum)
    return total - min_sum` },
        { label: "Shorter", code: `def maxScore(cardPoints, k):
    s = sum(cardPoints[:k])
    m = s
    for i in range(k):
        s += cardPoints[-1 - i] - cardPoints[k - 1 - i]
        m = max(m, s)
    return m` },
        { label: "Optimal", code: `def maxScore(cardPoints, k):
    n = len(cardPoints)
    left_sum = sum(cardPoints[:k])
    max_score = left_sum
    right_sum = 0
    for i in range(k):
        left_sum -= cardPoints[k - 1 - i]
        right_sum += cardPoints[n - 1 - i]
        max_score = max(max_score, left_sum + right_sum)
    return max_score` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int leftSum = 0;
        for (int i = 0; i < k; i++) leftSum += cardPoints[i];
        int maxScore = leftSum;
        int rightSum = 0;
        for (int i = 0; i < k; i++) {
            leftSum -= cardPoints[k - 1 - i];
            rightSum += cardPoints[cardPoints.length - 1 - i];
            maxScore = Math.max(maxScore, leftSum + rightSum);
        }
        return maxScore;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function maxScore(cardPoints, k) {
  let leftSum = 0;
  for (let i = 0; i < k; i++) leftSum += cardPoints[i];
  let maxScore = leftSum;
  let rightSum = 0;
  for (let i = 0; i < k; i++) {
    leftSum -= cardPoints[k - 1 - i];
    rightSum += cardPoints[cardPoints.length - 1 - i];
    maxScore = Math.max(maxScore, leftSum + rightSum);
  }
  return maxScore;
}` },
      ],
    },
  },

  "0_longest_substring_with_at_most_k_distinct_characters": {
    problemName: "Longest Substring with At Most K Distinct Characters",
    category: "two-pointers",
    description: "Find the longest substring containing at most K distinct characters.",
    visualizerType: "stringmap",
    defaultInput: { s: "eceba", target: 2 },
    generateSteps: (input) => generateLongestSubstringKDistinctSteps(input.s || "eceba", input.target ?? 2),
    solutions: {
      python: [
        { label: "Brute Force", code: `def lengthOfLongestSubstringKDistinct(s, k):
    n = len(s)
    res = 0
    for i in range(n):
        seen = set()
        for j in range(i, n):
            seen.add(s[j])
            if len(seen) > k:
                break
            res = max(res, j - i + 1)
    return res` },
        { label: "Better", code: `def lengthOfLongestSubstringKDistinct(s, k):
    from collections import OrderedDict
    d = OrderedDict()
    left = res = 0
    for right, ch in enumerate(s):
        if ch in d:
            del d[ch]
        d[ch] = right
        if len(d) > k:
            _, left_val = d.popitem(last=False)
            left = left_val + 1
        res = max(res, right - left + 1)
    return res` },
        { label: "Shorter", code: `def lengthOfLongestSubstringKDistinct(s, k):
    f, l = {}, 0
    for r, c in enumerate(s):
        f[c] = f.get(c, 0) + 1
        if len(f) > k:
            f[s[l]] -= 1
            if not f[s[l]]: del f[s[l]]
            l += 1
    return len(s) - l` },
        { label: "Optimal", code: `def lengthOfLongestSubstringKDistinct(s, k):
    freq = {}
    left = 0
    max_len = 0
    for right in range(len(s)):
        freq[s[right]] = freq.get(s[right], 0) + 1
        while len(freq) > k:
            freq[s[left]] -= 1
            if freq[s[left]] == 0:
                del freq[s[left]]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        Map<Character, Integer> freq = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            freq.merge(s.charAt(right), 1, Integer::sum);
            while (freq.size() > k) {
                freq.merge(s.charAt(left), -1, Integer::sum);
                if (freq.get(s.charAt(left)) == 0) freq.remove(s.charAt(left));
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function lengthOfLongestSubstringKDistinct(s, k) {
  const freq = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    freq.set(s[right], (freq.get(s[right]) || 0) + 1);
    while (freq.size > k) {
      freq.set(s[left], freq.get(s[left]) - 1);
      if (freq.get(s[left]) === 0) freq.delete(s[left]);
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}` },
      ],
    },
  },

  "1_subarray_with_k_different_integers": {
    problemName: "Subarrays with K Different Integers",
    category: "two-pointers",
    description: "Count subarrays with exactly K distinct integers using atMost(K) - atMost(K-1).",
    visualizerType: "array1d",
    defaultInput: { array: [1, 2, 1, 2, 3], target: 2 },
    generateSteps: (input) => generateSubarraysKDifferentSteps(input.array, input.target ?? 2),
    solutions: {
      python: [
        { label: "Brute Force", code: `def subarraysWithKDistinct(nums, k):
    n = len(nums)
    count = 0
    for i in range(n):
        distinct = set()
        for j in range(i, n):
            distinct.add(nums[j])
            if len(distinct) == k:
                count += 1
            elif len(distinct) > k:
                break
    return count` },
        { label: "Better", code: `def subarraysWithKDistinct(nums, k):
    from collections import defaultdict
    def atMost(goal):
        freq = defaultdict(int)
        left = count = 0
        for right in range(len(nums)):
            freq[nums[right]] += 1
            while len(freq) > goal:
                freq[nums[left]] -= 1
                if freq[nums[left]] == 0:
                    del freq[nums[left]]
                left += 1
            count += right - left + 1
        return count
    return atMost(k) - atMost(k - 1)` },
        { label: "Shorter", code: `def subarraysWithKDistinct(nums, k):
    def at(g):
        f, l, c = {}, 0, 0
        for r in range(len(nums)):
            f[nums[r]] = f.get(nums[r], 0) + 1
            while len(f) > g: f[nums[l]] -= 1; (not f[nums[l]]) and f.pop(nums[l]); l += 1
            c += r - l + 1
        return c
    return at(k) - at(k - 1)` },
        { label: "Optimal", code: `def subarraysWithKDistinct(nums, k):
    def atMost(goal):
        freq = {}
        left = 0
        count = 0
        for right in range(len(nums)):
            freq[nums[right]] = freq.get(nums[right], 0) + 1
            while len(freq) > goal:
                freq[nums[left]] -= 1
                if freq[nums[left]] == 0:
                    del freq[nums[left]]
                left += 1
            count += right - left + 1
        return count
    return atMost(k) - atMost(k - 1)` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
    private int atMost(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0, count = 0;
        for (int right = 0; right < nums.length; right++) {
            freq.merge(nums[right], 1, Integer::sum);
            while (freq.size() > k) {
                freq.merge(nums[left], -1, Integer::sum);
                if (freq.get(nums[left]) == 0) freq.remove(nums[left]);
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function subarraysWithKDistinct(nums, k) {
  function atMost(goal) {
    const freq = new Map();
    let left = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);
      while (freq.size > goal) {
        freq.set(nums[left], freq.get(nums[left]) - 1);
        if (freq.get(nums[left]) === 0) freq.delete(nums[left]);
        left++;
      }
      count += right - left + 1;
    }
    return count;
  }
  return atMost(k) - atMost(k - 1);
}` },
      ],
    },
  },

  "2_minimum_window_substring": {
    problemName: "Minimum Window Substring",
    category: "two-pointers",
    description: "Find the smallest window in S that contains all characters of T.",
    visualizerType: "stringmap",
    defaultInput: { s: "ADOBECODEBANC", t: "ABC" },
    generateSteps: (input) => generateMinWindowSubstringSteps(input.s || "ADOBECODEBANC", input.t || "ABC"),
    solutions: {
      python: [
        { label: "Brute Force", code: `def minWindow(s, t):
    from collections import Counter
    need = Counter(t)
    n = len(s)
    res = ""
    for i in range(n):
        have = Counter()
        for j in range(i, n):
            have[s[j]] += 1
            if all(have[c] >= need[c] for c in need):
                if not res or j - i + 1 < len(res):
                    res = s[i:j+1]
                break
    return res` },
        { label: "Better", code: `def minWindow(s, t):
    from collections import Counter
    need = Counter(t)
    have = Counter()
    formed = 0
    required = len(need)
    left = 0
    res = (float('inf'), 0, 0)
    for right in range(len(s)):
        have[s[right]] += 1
        if s[right] in need and have[s[right]] == need[s[right]]:
            formed += 1
        while formed == required:
            if right - left + 1 < res[0]:
                res = (right - left + 1, left, right)
            have[s[left]] -= 1
            if s[left] in need and have[s[left]] < need[s[left]]:
                formed -= 1
            left += 1
    return "" if res[0] == float('inf') else s[res[1]:res[2]+1]` },
        { label: "Shorter", code: `def minWindow(s, t):
    from collections import Counter
    need, missing = Counter(t), len(t)
    i = I = J = 0
    for j, c in enumerate(s, 1):
        missing -= need[c] > 0
        need[c] -= 1
        if not missing:
            while need[s[i]] < 0: need[s[i]] += 1; i += 1
            if not J or j - i <= J - I: I, J = i, j
            need[s[i]] += 1; i += 1; missing += 1
    return s[I:J]` },
        { label: "Optimal", code: `def minWindow(s, t):
    from collections import Counter
    need = Counter(t)
    have = {}
    formed = 0
    required = len(need)
    left = 0
    min_len = float('inf')
    result = ""
    for right in range(len(s)):
        c = s[right]
        have[c] = have.get(c, 0) + 1
        if c in need and have[c] == need[c]:
            formed += 1
        while formed == required:
            if right - left + 1 < min_len:
                min_len = right - left + 1
                result = s[left:right+1]
            have[s[left]] -= 1
            if s[left] in need and have[s[left]] < need[s[left]]:
                formed -= 1
            left += 1
    return result` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public String minWindow(String s, String t) {
        int[] need = new int[128], have = new int[128];
        for (char c : t.toCharArray()) need[c]++;
        int required = 0;
        for (int n : need) if (n > 0) required++;
        int formed = 0, left = 0, minLen = Integer.MAX_VALUE, start = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            have[c]++;
            if (need[c] > 0 && have[c] == need[c]) formed++;
            while (formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    start = left;
                }
                char lc = s.charAt(left);
                have[lc]--;
                if (need[lc] > 0 && have[lc] < need[lc]) formed--;
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function minWindow(s, t) {
  const need = {}, have = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  let required = Object.keys(need).length;
  let formed = 0, left = 0, minLen = Infinity, start = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    have[c] = (have[c] || 0) + 1;
    if (need[c] && have[c] === need[c]) formed++;
    while (formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        start = left;
      }
      have[s[left]]--;
      if (need[s[left]] && have[s[left]] < need[s[left]]) formed--;
      left++;
    }
  }
  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}` },
      ],
    },
  },

  "3_minimum_window_subsequence": {
    problemName: "Minimum Window Subsequence",
    category: "two-pointers",
    description: "Find the minimum window in S such that T is a subsequence of the window.",
    visualizerType: "stringmap",
    defaultInput: { s: "abcdebdde", t: "bde" },
    generateSteps: (input) => generateMinWindowSubsequenceSteps(input.s || "abcdebdde", input.t || "bde"),
    solutions: {
      python: [
        { label: "Brute Force", code: `def minWindow(s1, s2):
    n = len(s1)
    res = ""
    for i in range(n):
        j = 0
        for k in range(i, n):
            if s1[k] == s2[j]:
                j += 1
            if j == len(s2):
                window = s1[i:k+1]
                if not res or len(window) < len(res):
                    res = window
                break
    return res` },
        { label: "Better", code: `def minWindow(s1, s2):
    m, n = len(s1), len(s2)
    res = ""
    start = 0
    while start < m:
        j = 0
        i = start
        while i < m and j < n:
            if s1[i] == s2[j]:
                j += 1
            i += 1
        if j < n:
            break
        end = i - 1
        j = n - 1
        while j >= 0:
            if s1[end] == s2[j]:
                j -= 1
            end -= 1
        end += 1
        if not res or i - end < len(res):
            res = s1[end:i]
        start = end + 1
    return res` },
        { label: "Shorter", code: `def minWindow(s1, s2):
    r, i = "", 0
    while i < len(s1):
        j = 0
        while i < len(s1) and j < len(s2):
            if s1[i] == s2[j]: j += 1
            i += 1
        if j < len(s2): break
        e = i - 1; j = len(s2) - 1
        while j >= 0:
            if s1[e] == s2[j]: j -= 1
            e -= 1
        e += 1
        if not r or i - e < len(r): r = s1[e:i]
        i = e + 1
    return r` },
        { label: "Optimal", code: `def minWindow(s1, s2):
    m, n = len(s1), len(s2)
    result = ""
    start = 0
    while start < m:
        # Forward pass: find subsequence
        j = 0
        i = start
        while i < m and j < n:
            if s1[i] == s2[j]:
                j += 1
            i += 1
        if j < n:
            break
        # Backward pass: minimize window
        end = i - 1
        j = n - 1
        while j >= 0:
            if s1[end] == s2[j]:
                j -= 1
            end -= 1
        begin = end + 1
        if not result or i - begin < len(result):
            result = s1[begin:i]
        start = begin + 1
    return result` },
      ],
      java: [
        { label: "Optimal", code: `class Solution {
    public String minWindow(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        String result = "";
        int start = 0;
        while (start < m) {
            int i = start, j = 0;
            while (i < m && j < n) {
                if (s1.charAt(i) == s2.charAt(j)) j++;
                i++;
            }
            if (j < n) break;
            int end = i - 1;
            j = n - 1;
            while (j >= 0) {
                if (s1.charAt(end) == s2.charAt(j)) j--;
                end--;
            }
            int begin = end + 1;
            if (result.isEmpty() || i - begin < result.length()) {
                result = s1.substring(begin, i);
            }
            start = begin + 1;
        }
        return result;
    }
}` },
      ],
      javascript: [
        { label: "Optimal", code: `function minWindow(s1, s2) {
  let result = "";
  let start = 0;
  while (start < s1.length) {
    let i = start, j = 0;
    while (i < s1.length && j < s2.length) {
      if (s1[i] === s2[j]) j++;
      i++;
    }
    if (j < s2.length) break;
    let end = i - 1;
    j = s2.length - 1;
    while (j >= 0) {
      if (s1[end] === s2[j]) j--;
      end--;
    }
    const begin = end + 1;
    if (!result || i - begin < result.length) {
      result = s1.substring(begin, i);
    }
    start = begin + 1;
  }
  return result;
}` },
      ],
    },
  },
};
