import { ProblemVisualizerMeta } from "../visualizerRegistry";

// ─── Step Generators ─────────────────────────────────────────────────

export function generateMinBracketReversalsSteps(s: string): any[] {
  const steps: any[] = [];
  const chars = s.split("");
  const n = chars.length;

  if (n % 2 !== 0) {
    steps.push({
      array: chars,
      pointers: {},
      highlights: {},
      variables: { result: -1 },
      description: `String length is odd (${n}). An odd-length bracket expression can never be balanced. Return -1.`,
      codeLineMap: { "python-brute": 2, "python-better": 2, "python-shorter": 1, "python-optimal": 2, "java-optimal": 2, "javascript-optimal": 2 }
    });
    return steps;
  }

  // Use List (array) instead of Stack
  const unmatched: string[] = [];
  steps.push({
    array: chars,
    pointers: { i: 0 },
    highlights: {},
    variables: { unmatched: [], open: 0, close: 0 },
    description: `Start scan. We use an array/list to track unmatched brackets.`,
    codeLineMap: { "python-brute": 4, "python-better": 4, "python-shorter": 3, "python-optimal": 4, "java-optimal": 4, "javascript-optimal": 4 }
  });

  for (let i = 0; i < n; i++) {
    const ch = chars[i];
    const prevUnmatched = [...unmatched];
    if (ch === "{") {
      unmatched.push(ch);
      steps.push({
        array: chars,
        pointers: { i },
        highlights: { [i]: "active" },
        variables: { unmatched: [...unmatched], current_char: ch },
        description: `Found '{'. Append to our unmatched list. List becomes: [${unmatched.join(", ")}].`,
        codeLineMap: { "python-brute": 7, "python-better": 7, "python-shorter": 4, "python-optimal": 7, "java-optimal": 7, "javascript-optimal": 7 }
      });
    } else {
      if (unmatched.length > 0 && unmatched[unmatched.length - 1] === "{") {
        unmatched.pop();
        steps.push({
          array: chars,
          pointers: { i },
          highlights: { [i]: "sorted" },
          variables: { unmatched: [...unmatched], current_char: ch, matched_with: "{" },
          description: `Found '}'. Matches with '{' at end of list. Pop from list. List becomes: [${unmatched.join(", ")}].`,
          codeLineMap: { "python-brute": 10, "python-better": 10, "python-shorter": 4, "python-optimal": 10, "java-optimal": 10, "javascript-optimal": 10 }
        });
      } else {
        unmatched.push(ch);
        steps.push({
          array: chars,
          pointers: { i },
          highlights: { [i]: "active" },
          variables: { unmatched: [...unmatched], current_char: ch },
          description: `Found '}'. No matching '{' at end of list. Append to unmatched list. List becomes: [${unmatched.join(", ")}].`,
          codeLineMap: { "python-brute": 12, "python-better": 12, "python-shorter": 4, "python-optimal": 12, "java-optimal": 12, "javascript-optimal": 12 }
        });
      }
    }
  }

  // Count open and close brackets in the unmatched list
  let open = 0;
  let close = 0;
  for (const c of unmatched) {
    if (c === "{") open++;
    else close++;
  }

  const ans = Math.ceil(close / 2) + Math.ceil(open / 2);
  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { unmatched: [...unmatched], open_unmatched: open, close_unmatched: close, result: ans },
    description: `Scan complete. Unmatched brackets list: [${unmatched.join(", ")}]. Formula: ceil(${close}/2) + ceil(${open}/2) = ${ans} reversals.`,
    codeLineMap: { "python-brute": 15, "python-better": 15, "python-shorter": 5, "python-optimal": 15, "java-optimal": 15, "javascript-optimal": 15 }
  });

  return steps;
}

export function generateCountAndSaySteps(n: number): any[] {
  const steps: any[] = [];
  let currentStr = "1";

  steps.push({
    array: currentStr.split(""),
    pointers: {},
    highlights: {},
    variables: { term: 1, val: currentStr },
    description: `Base case: term 1 is "1".`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let i = 2; i <= n; i++) {
    const chars = currentStr.split("");
    let nextStr = "";
    let count = 1;
    
    for (let j = 0; j < chars.length; j++) {
      if (j + 1 < chars.length && chars[j] === chars[j + 1]) {
        count++;
      } else {
        nextStr += count.toString() + chars[j];
        steps.push({
          array: chars,
          pointers: { scan: j },
          highlights: { [j]: "active" },
          variables: { term: i, say: `Counted ${count} of '${chars[j]}'`, partialResult: nextStr },
          description: `Group finished: '${chars[j]}' repeated ${count} times. Append "${count}${chars[j]}" to result.`,
          codeLineMap: { "python-brute": 8, "python-better": 8, "python-shorter": 3, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
        });
        count = 1;
      }
    }
    
    currentStr = nextStr;
    steps.push({
      array: currentStr.split(""),
      pointers: {},
      highlights: {},
      variables: { term: i, val: currentStr },
      description: `Term ${i} is complete: "${currentStr}".`,
      codeLineMap: { "python-brute": 12, "python-better": 12, "python-shorter": 4, "python-optimal": 12, "java-optimal": 12, "javascript-optimal": 12 }
    });
  }

  return steps;
}

export function generateHashingInStringsSteps(s: string, p = 31, m = 1000000007): any[] {
  const steps: any[] = [];
  const chars = s.split("");
  let hashValue = 0;
  let power = 1;

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { base: p, mod: m, currentHash: 0 },
    description: `Compute rolling hash of "${s}" using base P=${p} and modulo M=${m}.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let i = 0; i < chars.length; i++) {
    const code = chars[i].charCodeAt(0) - "a".charCodeAt(0) + 1;
    const term = (code * power) % m;
    hashValue = (hashValue + term) % m;
    
    steps.push({
      array: chars,
      pointers: { i },
      highlights: { [i]: "active" },
      variables: { char: chars[i], val: code, termPower: power, currentHash: hashValue },
      description: `Add '${chars[i]}' (value ${code}): term = (${code} * ${power}) % ${m} = ${term}. New Hash = ${hashValue}.`,
      codeLineMap: { "python-brute": 5, "python-better": 5, "python-shorter": 3, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    power = (power * p) % m;
  }

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { finalHash: hashValue },
    description: `Polynomial hash calculation finished. Final hash value = ${hashValue}.`,
    codeLineMap: { "python-brute": 8, "python-better": 8, "python-shorter": 4, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });

  return steps;
}

export function generateRabinKarpSteps(s: string, pattern: string): any[] {
  const steps: any[] = [];
  const n = s.length;
  const m = pattern.length;
  const chars = s.split("");
  const pChars = pattern.split("");
  const d = 256; // base
  const q = 101; // prime mod

  let pHash = 0;
  let tHash = 0;
  let h = 1;

  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  for (let i = 0; i < m; i++) {
    pHash = (d * pHash + pattern.charCodeAt(i)) % q;
    tHash = (d * tHash + s.charCodeAt(i)) % q;
  }

  steps.push({
    array: chars,
    pointers: { windowStart: 0, windowEnd: m - 1 },
    highlights: {},
    variables: { pattern, patternHash: pHash, windowHash: tHash },
    description: `Compute initial hashes. Pattern hash = ${pHash}, first window hash = ${tHash}.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let i = 0; i <= n - m; i++) {
    const hl: Record<number, string> = {};
    for (let k = i; k < i + m; k++) hl[k] = "active";

    steps.push({
      array: chars,
      pointers: { windowStart: i, windowEnd: i + m - 1 },
      highlights: hl,
      variables: { patternHash: pHash, windowHash: tHash, offset: i },
      description: `Comparing hashes at index ${i}. Pattern hash = ${pHash}, window hash = ${tHash}.`,
      codeLineMap: { "python-brute": 5, "python-better": 5, "python-shorter": 2, "python-optimal": 5, "java-optimal": 5, "javascript-optimal": 5 }
    });

    if (pHash === tHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (s[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        for (let k = i; k < i + m; k++) hl[k] = "sorted";
        steps.push({
          array: chars,
          pointers: { windowStart: i, windowEnd: i + m - 1 },
          highlights: hl,
          variables: { patternHash: pHash, windowHash: tHash, matchIndex: i },
          description: `Hashes match! Verified substring matches pattern "${pattern}" exactly at index ${i}.`,
          codeLineMap: { "python-brute": 8, "python-better": 8, "python-shorter": 3, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
        });
      }
    }

    if (i < n - m) {
      tHash = (d * (tHash - s.charCodeAt(i) * h) + s.charCodeAt(i + m)) % q;
      if (tHash < 0) tHash += q;
    }
  }

  return steps;
}

export function generateZFunctionSteps(s: string): any[] {
  const steps: any[] = [];
  const n = s.length;
  const z = new Array(n).fill(0);
  const chars = s.split("");

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { z: [...z] },
    description: `Initialize Z-array of size ${n}. Z[i] stores length of longest common prefix of S and S[i..n-1].`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    const hl: Record<number, string> = { [i]: "active" };
    if (i <= r) {
      z[i] = Math.min(r - i + 1, z[i - l]);
    }
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      z[i]++;
    }
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
    
    for (let k = 0; k < z[i]; k++) {
      hl[k] = "sorted";
      hl[i + k] = "sorted";
    }

    steps.push({
      array: chars,
      pointers: { i, L: l, R: r },
      highlights: hl,
      variables: { z: [...z], current_z: z[i] },
      description: `Compute Z[${i}] = ${z[i]} using window [L=${l}, R=${r}]. Matches prefix of length ${z[i]}.`,
      codeLineMap: { "python-brute": 6, "python-better": 6, "python-shorter": 4, "python-optimal": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });
  }

  return steps;
}

export function generateKMPSteps(s: string, pattern: string): any[] {
  const steps: any[] = [];
  const n = s.length;
  const m = pattern.length;
  const lps = new Array(m).fill(0);

  // 1. Build LPS array steps
  let len = 0;
  let i = 1;
  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  steps.push({
    array: s.split(""),
    pointers: {},
    highlights: {},
    variables: { pattern, lps_array: [...lps] },
    description: `Constructed LPS array for pattern "${pattern}": [${lps.join(", ")}]. Starting KMP search.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  // 2. Perform search step
  let sIdx = 0;
  let pIdx = 0;
  while (sIdx < n) {
    const hl: Record<number, string> = { [sIdx]: "active" };
    steps.push({
      array: s.split(""),
      pointers: { sIdx, pIdx },
      highlights: hl,
      variables: { current_lps: [...lps], sChar: s[sIdx], pChar: pattern[pIdx] },
      description: `Comparing S[${sIdx}] = '${s[sIdx]}' and P[${pIdx}] = '${pattern[pIdx]}'.`,
      codeLineMap: { "python-brute": 6, "python-better": 6, "python-shorter": 2, "python-optimal": 6, "java-optimal": 6, "javascript-optimal": 6 }
    });

    if (pattern[pIdx] === s[sIdx]) {
      sIdx++;
      pIdx++;
    }

    if (pIdx === m) {
      const matchHl: Record<number, string> = {};
      for (let k = sIdx - m; k < sIdx; k++) matchHl[k] = "sorted";
      steps.push({
        array: s.split(""),
        pointers: {},
        highlights: matchHl,
        variables: { matchAt: sIdx - m },
        description: `Full pattern match found at starting index ${sIdx - m}!`,
        codeLineMap: { "python-brute": 10, "python-better": 10, "python-shorter": 3, "python-optimal": 10, "java-optimal": 10, "javascript-optimal": 10 }
      });
      pIdx = lps[pIdx - 1];
    } else if (sIdx < n && pattern[pIdx] !== s[sIdx]) {
      if (pIdx !== 0) {
        pIdx = lps[pIdx - 1];
      } else {
        sIdx++;
      }
    }
  }

  return steps;
}

export function generateShortestPalindromeSteps(s: string): any[] {
  const steps: any[] = [];
  const revS = s.split("").reverse().join("");
  const concat = s + "#" + revS;
  const n = concat.length;
  const lps = new Array(n).fill(0);

  steps.push({
    array: concat.split(""),
    pointers: {},
    highlights: {},
    variables: { concat, lps: [...lps] },
    description: `Concatenate string + '#' + reverse: "${concat}". Finding longest palindromic prefix.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  let len = 0;
  let i = 1;
  while (i < n) {
    if (concat[i] === concat[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  const palindromeLen = lps[n - 1];
  const toAdd = revS.substring(0, s.length - palindromeLen);
  const result = toAdd + s;

  steps.push({
    array: concat.split(""),
    pointers: {},
    highlights: {},
    variables: { lps: [...lps], longest_palindrome_prefix_len: palindromeLen, prepend: toAdd, finalResult: result },
    description: `LPS last value = ${palindromeLen}. Longest palindromic prefix has length ${palindromeLen}. Prepend reversed suffix "${toAdd}".`,
    codeLineMap: { "python-brute": 8, "python-better": 8, "python-shorter": 4, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });

  return steps;
}

export function generateLongestHappyPrefixSteps(s: string): any[] {
  const steps: any[] = [];
  const n = s.length;
  const lps = new Array(n).fill(0);

  steps.push({
    array: s.split(""),
    pointers: {},
    highlights: {},
    variables: { lps: [...lps] },
    description: `Initialize LPS array of size ${n} to compute longest proper prefix which is also a suffix.`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  let len = 0;
  let i = 1;
  while (i < n) {
    if (s[i] === s[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  const maxLen = lps[n - 1];
  const prefix = s.substring(0, maxLen);
  const hl: Record<number, string> = {};
  for (let k = 0; k < maxLen; k++) {
    hl[k] = "sorted";
    hl[n - maxLen + k] = "sorted";
  }

  steps.push({
    array: s.split(""),
    pointers: {},
    highlights: hl,
    variables: { lps: [...lps], matchLength: maxLen, prefix },
    description: `Completed LPS. Longest prefix-suffix length is ${maxLen}. Longest Happy Prefix is "${prefix}".`,
    codeLineMap: { "python-brute": 8, "python-better": 8, "python-shorter": 4, "python-optimal": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });

  return steps;
}

export function generateCountPalindromicSubsequencesSteps(s: string): any[] {
  const steps: any[] = [];
  const n = s.length;
  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const chars = s.split("");

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { dp_grid: dp.map(r => [...r]) },
    description: `Initialize DP table of size ${n}x${n}. dp[i][j] holds count of palindromic subsequences in subsegment S[i..j].`,
    codeLineMap: { "python-brute": 1, "python-better": 1, "python-shorter": 1, "python-optimal": 1, "java-optimal": 1, "javascript-optimal": 1 }
  });

  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
    steps.push({
      array: chars,
      pointers: { i, j: i },
      highlights: { [i]: "sorted" },
      variables: { dp_grid: dp.map(r => [...r]) },
      description: `Base case: Single characters are palindromes of length 1. dp[${i}][${i}] = 1.`,
      codeLineMap: { "python-brute": 4, "python-better": 4, "python-shorter": 2, "python-optimal": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });
  }

  for (let lenVal = 2; lenVal <= n; lenVal++) {
    for (let i = 0; i <= n - lenVal; i++) {
      const j = i + lenVal - 1;
      const hl: Record<number, string> = { [i]: "active", [j]: "active" };
      
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j] + dp[i][j - 1] + 1;
      } else {
        dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
      }

      steps.push({
        array: chars,
        pointers: { i, j },
        highlights: hl,
        variables: { dp_grid: dp.map(r => [...r]), current_val: dp[i][j] },
        description: `Segment S[${i}..${j}] ("${s.substring(i, j + 1)}"): s[${i}] ${s[i] === s[j] ? "==" : "!="} s[${j}]. dp[${i}][${j}] = ${dp[i][j]}.`,
        codeLineMap: { "python-brute": 9, "python-better": 9, "python-shorter": 3, "python-optimal": 9, "java-optimal": 9, "javascript-optimal": 9 }
      });
    }
  }

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { dp_grid: dp.map(r => [...r]), result: dp[0][n - 1] },
    description: `Completed counting. Total palindromic subsequences in "${s}" = ${dp[0][n - 1]}.`,
    codeLineMap: { "python-brute": 12, "python-better": 12, "python-shorter": 4, "python-optimal": 12, "java-optimal": 12, "javascript-optimal": 12 }
  });

  return steps;
}

// ─── Registry Object ─────────────────────────────────────────────────

export const step7StringsHardRegistry: Record<string, ProblemVisualizerMeta> = {
  "0_minimum_number_of_bracket_reversals_needed_to_make_an_expression_balanced": {
    problemName: "Minimum number of bracket reversals needed to make an expression balanced",
    category: "strings",
    description: "Determine the minimum count of bracket swaps required to make the expression balanced.",
    visualizerType: "stringmap",
    defaultInput: { s: "}{{{" },
    generateSteps: (input) => generateMinBracketReversalsSteps(input.s || "}{{{"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def countReversals(s):
    # Naive array/list-based validation simulator
    if len(s) % 2 != 0:
        return -1
    unmatched_list = []
    for ch in s:
        if ch == '{':
            unmatched_list.append(ch)
        else:
            if len(unmatched_list) > 0 and unmatched_list[-1] == '{':
                unmatched_list.pop()
            else:
                unmatched_list.append(ch)
    open_cnt = unmatched_list.count('{')
    close_cnt = unmatched_list.count('}')
    import math
    return math.ceil(close_cnt / 2) + math.ceil(open_cnt / 2)`
        },
        {
          label: "Better",
          code: `def countReversals(s):
    # Counter-based logic tracking current balance without structures
    if len(s) % 2 != 0:
        return -1
    open_cnt = 0
    close_cnt = 0
    for ch in s:
        if ch == '{':
            open_cnt += 1
        else:
            if open_cnt > 0:
                open_cnt -= 1
            else:
                close_cnt += 1
    import math
    return math.ceil(close_cnt / 2) + math.ceil(open_cnt / 2)`
        },
        {
          label: "Shorter",
          code: `def countReversals(s):
    if len(s) % 2: return -1
    while "{}" in s: s = s.replace("{}", "")
    o, c = s.count("{"), s.count("}")
    return (o + 1) // 2 + (c + 1) // 2`
        },
        {
          label: "Optimal",
          code: `def countReversals(s):
    # Single-pass optimal calculation without stack
    if len(s) % 2 != 0:
        return -1
    open_cnt = 0
    close_cnt = 0
    for ch in s:
        if ch == '{':
            open_cnt += 1
        else:
            if open_cnt > 0:
                open_cnt -= 1
            else:
                close_cnt += 1
    return (open_cnt + 1) // 2 + (close_cnt + 1) // 2`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int countReversals(String s) {
        if (s.length() % 2 != 0) return -1;
        int open = 0, close = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '{') {
                open++;
            } else {
                if (open > 0) open--;
                else close++;
            }
        }
        return (open + 1) / 2 + (close + 1) / 2;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function countReversals(s) {
  if (s.length % 2 !== 0) return -1;
  let open = 0, close = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '{') {
      open++;
    } else {
      if (open > 0) open--;
      else close++;
    }
  }
  return Math.ceil(open / 2) + Math.ceil(close / 2);
}`
        }
      ]
    }
  },
  "1_count_and_say": {
    problemName: "Count and say",
    category: "strings",
    description: "Generate the n-th term of the count-and-say sequence.",
    visualizerType: "stringmap",
    defaultInput: { n: 4 },
    generateSteps: (input) => generateCountAndSaySteps(input.n || 4),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def countAndSay(n):
    # Recursive pattern creation
    if n == 1:
        return "1"
    prev = countAndSay(n - 1)
    res = []
    i = 0
    while i < len(prev):
        count = 1
        while i + 1 < len(prev) and prev[i] == prev[i+1]:
            count += 1
            i += 1
        res.append(str(count) + prev[i])
        i += 1
    return "".join(res)`
        },
        {
          label: "Better",
          code: `def countAndSay(n):
    # Iterative list grouping
    val = "1"
    for _ in range(n - 1):
        next_val = []
        i = 0
        while i < len(val):
            count = 1
            while i + 1 < len(val) and val[i] == val[i+1]:
                count += 1
                i += 1
            next_val.append(f"{count}{val[i]}")
            i += 1
        val = "".join(next_val)
    return val`
        },
        {
          label: "Shorter",
          code: `def countAndSay(n):
    import re
    s = '1'
    for _ in range(n - 1):
        s = ''.join(str(len(m.group(0))) + m.group(1) for m in re.finditer(r'((.)\\2*)', s))
    return s`
        },
        {
          label: "Optimal",
          code: `def countAndSay(n):
    # Optimized iterative string builder
    val = "1"
    for _ in range(2, n + 1):
        next_val = []
        count = 1
        for idx in range(len(val)):
            if idx + 1 < len(val) and val[idx] == val[idx + 1]:
                count += 1
            else:
                next_val.append(str(count) + val[idx])
                count = 1
        val = "".join(next_val)
    return val`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String countAndSay(int n) {
        String s = "1";
        for (int i = 2; i <= n; i++) {
            StringBuilder sb = new StringBuilder();
            int count = 1;
            for (int j = 0; j < s.length(); j++) {
                if (j + 1 < s.length() && s.charAt(j) == s.charAt(j + 1)) {
                    count++;
                } else {
                    sb.append(count).append(s.charAt(j));
                    count = 1;
                }
            }
            s = sb.toString();
        }
        return s;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function countAndSay(n) {
  let s = "1";
  for (let i = 2; i <= n; i++) {
    let nextStr = "";
    let count = 1;
    for (let j = 0; j < s.length; j++) {
      if (j + 1 < s.length && s[j] === s[j + 1]) {
        count++;
      } else {
        nextStr += count + s[j];
        count = 1;
      }
    }
    s = nextStr;
  }
  return s;
}`
        }
      ]
    }
  },
  "2_hashing_in_strings_|_theory": {
    problemName: "Hashing In Strings | Theory",
    category: "strings",
    description: "Understand polynomial rolling hashing algorithms on strings.",
    visualizerType: "stringmap",
    defaultInput: { s: "abcd" },
    generateSteps: (input) => generateHashingInStringsSteps(input.s || "abcd"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def getHash(s):
    # Naive recalculation of powers
    p = 31
    m = 10**9 + 7
    h = 0
    for idx, ch in enumerate(s):
        val = ord(ch) - ord('a') + 1
        h = (h + val * (p ** idx)) % m
    return h`
        },
        {
          label: "Better",
          code: `def getHash(s):
    # Iterative with precomputed powers array
    p = 31
    m = 10**9 + 7
    powers = [1] * len(s)
    for i in range(1, len(s)):
        powers[i] = (powers[i-1] * p) % m
    h = 0
    for idx, ch in enumerate(s):
        val = ord(ch) - ord('a') + 1
        h = (h + val * powers[idx]) % m
    return h`
        },
        {
          label: "Shorter",
          code: `def getHash(s):
    from functools import reduce
    return reduce(lambda h, c: (h * 31 + ord(c) - 96) % (10**9 + 7), s, 0)`
        },
        {
          label: "Optimal",
          code: `def getHash(s):
    # Horner's method rolling hash computation
    p = 31
    m = 10**9 + 7
    hash_val = 0
    power = 1
    for ch in s:
        val = ord(ch) - ord('a') + 1
        hash_val = (hash_val + val * power) % m
        power = (power * p) % m
    return hash_val`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public long getHash(String s) {
        long p = 31;
        long m = 1000000007;
        long hashVal = 0;
        long power = 1;
        for (int i = 0; i < s.length(); i++) {
            long val = s.charAt(i) - 'a' + 1;
            hashVal = (hashVal + val * power) % m;
            power = (power * p) % m;
        }
        return hashVal;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function getHash(s) {
  const p = 31;
  const m = 1000000007;
  let hashVal = 0;
  let power = 1;
  for (let i = 0; i < s.length; i++) {
    const val = s.charCodeAt(i) - 97 + 1;
    hashVal = (hashVal + val * power) % m;
    power = (power * p) % m;
  }
  return hashVal;
}`
        }
      ]
    }
  },
  "3_rabin_karp": {
    problemName: "Rabin Karp",
    category: "strings",
    description: "Search pattern matches in a string using rolling hash logic.",
    visualizerType: "stringmap",
    defaultInput: { s: "abcca", pattern: "cc" },
    generateSteps: (input) => generateRabinKarpSteps(input.s || "abcca", input.pattern || "cc"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def search(txt, pat):
    # Naive sliding window O(N*M) checks
    n, m = len(txt), len(pat)
    res = []
    for i in range(n - m + 1):
        if txt[i:i+m] == pat:
            res.append(i)
    return res`
        },
        {
          label: "Better",
          code: `def search(txt, pat):
    # Simple Hash comparison slice-by-slice
    n, m = len(txt), len(pat)
    p_hash = hash(pat)
    res = []
    for i in range(n - m + 1):
        if hash(txt[i:i+m]) == p_hash:
            if txt[i:i+m] == pat:
                res.append(i)
    return res`
        },
        {
          label: "Shorter",
          code: `def search(txt, pat):
    return [i for i in range(len(txt) - len(pat) + 1) if txt.startswith(pat, i)]`
        },
        {
          label: "Optimal",
          code: `def search(txt, pat):
    # Rabin-Karp algorithm with rolling polynomial hash
    d = 256
    q = 101
    n, m = len(txt), len(pat)
    p_hash = 0
    t_hash = 0
    h = pow(d, m - 1, q)
    res = []
    for i in range(m):
        p_hash = (d * p_hash + ord(pat[i])) % q
        t_hash = (d * t_hash + ord(txt[i])) % q
    for i in range(n - m + 1):
        if p_hash == t_hash:
            if txt[i:i+m] == pat:
                res.append(i)
        if i < n - m:
            t_hash = (d * (t_hash - ord(txt[i]) * h) + ord(txt[i+m])) % q
            t_hash = (t_hash + q) % q
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public void search(String txt, String pat) {
        int d = 256;
        int q = 101;
        int n = txt.length();
        int m = pat.length();
        int p = 0;
        int t = 0;
        int h = 1;
        for (int i = 0; i < m - 1; i++) {
            h = (h * d) % q;
        }
        for (int i = 0; i < m; i++) {
            p = (d * p + pat.charAt(i)) % q;
            t = (d * t + txt.charAt(i)) % q;
        }
        for (int i = 0; i <= n - m; i++) {
            if (p == t) {
                boolean match = true;
                for (int j = 0; j < m; j++) {
                    if (txt.charAt(i + j) != pat.charAt(j)) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    System.out.println("Pattern found at index " + i);
                }
            }
            if (i < n - m) {
                t = (d * (t - txt.charAt(i) * h) + txt.charAt(i + m)) % q;
                if (t < 0) t += q;
            }
        }
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function search(txt, pat) {
  const d = 256;
  const q = 101;
  const n = txt.length;
  const m = pat.length;
  let p = 0, t = 0, h = 1;
  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }
  for (let i = 0; i < m; i++) {
    p = (d * p + pat.charCodeAt(i)) % q;
    t = (d * t + txt.charCodeAt(i)) % q;
  }
  const results = [];
  for (let i = 0; i <= n - m; i++) {
    if (p === t) {
      if (txt.substring(i, i + m) === pat) {
        results.push(i);
      }
    }
    if (i < n - m) {
      t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + m)) % q;
      if (t < 0) t += q;
    }
  }
  return results;
}`
        }
      ]
    }
  },
  "4_z-function": {
    problemName: "Z-Function",
    category: "strings",
    description: "Search matches in a string using computed Z-values.",
    visualizerType: "array1d",
    defaultInput: { s: "aabxaabxcaabxaabxr" },
    generateSteps: (input) => generateZFunctionSteps(input.s || "aabxaabxcaabxaabxr"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def getZarr(string):
    # Naive O(N^2) comparison of substrings
    n = len(string)
    z = [0] * n
    for i in range(1, n):
        count = 0
        while i + count < n and string[count] == string[i + count]:
            count += 1
        z[i] = count
    return z`
        },
        {
          label: "Better",
          code: `def getZarr(string):
          # Iterative L-R segment comparison
          n = len(string)
          z = [0] * n
          l, r = 0, 0
          for i in range(1, n):
              if i <= r:
                  z[i] = min(r - i + 1, z[i - l])
              while i + z[i] < n and string[z[i]] == string[i + z[i]]:
                  z[i] += 1
              if i + z[i] - 1 > r:
                  l = i
                  r = i + z[i] - 1
          return z`
        },
        {
          label: "Shorter",
          code: `def getZarr(s):
    return [0] + [next((j for j in range(len(s)-i+1) if s[j] != s[i+j]), len(s)-i) for i in range(1, len(s))]`
        },
        {
          label: "Optimal",
          code: `def getZarr(string):
    # Z-algorithm matching prefix segments
    n = len(string)
    z = [0] * n
    l, r = 0, 0
    for i in range(1, n):
        if i <= r:
            z[i] = min(r - i + 1, z[i - l])
        while i + z[i] < n and string[z[i]] == string[i + z[i]]:
            z[i] += 1
        if i + z[i] - 1 > r:
            l = i
            r = i + z[i] - 1
    return z`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int[] getZarr(String string) {
        int n = string.length();
        int[] z = new int[n];
        int l = 0, r = 0;
        for (int i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = Math.min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && string.charAt(z[i]) == string.charAt(i + z[i])) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }
        return z;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function getZarr(string) {
  const n = string.length;
  const z = new Array(n).fill(0);
  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    if (i <= r) {
      z[i] = Math.min(r - i + 1, z[i - l]);
    }
    while (i + z[i] < n && string[z[i]] === string[i + z[i]]) {
      z[i]++;
    }
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }
  return z;
}`
        }
      ]
    }
  },
  "5_kmp_algo_/_lps(pi)_array": {
    problemName: "KMP algo / LPS(pi) array",
    category: "strings",
    description: "Build prefix function values (LPS array) and search strings.",
    visualizerType: "stringmap",
    defaultInput: { s: "abacaba", pattern: "aba" },
    generateSteps: (input) => generateKMPSteps(input.s || "abacaba", input.pattern || "aba"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def getLPS(pat):
    # Naive search for matching suffix/prefix O(M^3)
    m = len(pat)
    lps = [0] * m
    for i in range(1, m):
        for length in range(i, 0, -1):
            if pat[0:length] == pat[i-length+1:i+1]:
                lps[i] = length
                break
    return lps`
        },
        {
          label: "Better",
          code: `def getLPS(pat):
    # Iterative linear LPS construction
    m = len(pat)
    lps = [0] * m
    length = 0
    i = 1
    while i < m:
        if pat[i] == pat[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps`
        },
        {
          label: "Shorter",
          code: `def getLPS(pat):
    # Minimal LPS construct
    lps = [0] * len(pat)
    j = 0
    for i in range(1, len(pat)):
        while j > 0 and pat[i] != pat[j]: j = lps[j-1]
        if pat[i] == pat[j]: j += 1; lps[i] = j
    return lps`
        },
        {
          label: "Optimal",
          code: `def getLPS(pat):
    # Standard KMP LPS generator O(M)
    m = len(pat)
    lps = [0] * m
    length = 0
    i = 1
    while i < m:
        if pat[i] == pat[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int[] computeLPS(String pat) {
        int m = pat.length();
        int[] lps = new int[m];
        int len = 0;
        int i = 1;
        while (i < m) {
            if (pat.charAt(i) == pat.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function computeLPS(pat) {
  const m = pat.length;
  const lps = new Array(m).fill(0);
  let len = 0;
  let i = 1;
  while (i < m) {
    if (pat[i] === pat[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}`
        }
      ]
    }
  },
  "6_shortest_palindrome": {
    problemName: "Shortest Palindrome",
    category: "strings",
    description: "Make a string palindromic by prepending minimal symbols.",
    visualizerType: "stringmap",
    defaultInput: { s: "aacecaaa" },
    generateSteps: (input) => generateShortestPalindromeSteps(input.s || "aacecaaa"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def shortestPalindrome(s):
    # Naive check of prefixes
    n = len(s)
    for i in range(n, -1, -1):
        if s[0:i] == s[0:i][::-1]:
            return s[i:][::-1] + s
    return ""`
        },
        {
          label: "Better",
          code: `def shortestPalindrome(s):
    # Recursive prefix check
    n = len(s)
    i = 0
    for j in range(n - 1, -1, -1):
        if s[i] == s[j]:
            i += 1
    if i == n:
        return s
    remain = s[i:]
    return remain[::-1] + shortestPalindrome(s[0:i]) + remain`
        },
        {
          label: "Shorter",
          code: `def shortestPalindrome(s):
    r = s[::-1]
    for i in range(len(s)):
        if s.startswith(r[i:]):
            return r[:i] + s
    return ""`
        },
        {
          label: "Optimal",
          code: `def shortestPalindrome(s):
    # Optimal LPS prefix match approach
    rev_s = s[::-1]
    concat = s + "#" + rev_s
    n = len(concat)
    lps = [0] * n
    for i in range(1, n):
        j = lps[i - 1]
        while j > 0 and concat[i] != concat[j]:
            j = lps[j - 1]
        if concat[i] == concat[j]:
            j += 1
        lps[i] = j
    pal_len = lps[-1]
    return rev_s[:len(s) - pal_len] + s`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String shortestPalindrome(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        String concat = s + "#" + rev;
        int n = concat.length();
        int[] lps = new int[n];
        for (int i = 1; i < n; i++) {
            int j = lps[i - 1];
            while (j > 0 && concat.charAt(i) != concat.charAt(j)) {
                j = lps[j - 1];
            }
            if (concat.charAt(i) == concat.charAt(j)) j++;
            lps[i] = j;
        }
        int palLen = lps[n - 1];
        return rev.substring(0, s.length() - palLen) + s;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function shortestPalindrome(s) {
  const rev = s.split("").reverse().join("");
  const concat = s + "#" + rev;
  const n = concat.length;
  const lps = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    let j = lps[i - 1];
    while (j > 0 && concat[i] !== concat[j]) {
      j = lps[j - 1];
    }
    if (concat[i] === concat[j]) j++;
    lps[i] = j;
  }
  const palLen = lps[n - 1];
  return rev.substring(0, s.length - palLen) + s;
}`
        }
      ]
    }
  },
  "7_longest_happy_prefix": {
    problemName: "Longest happy prefix",
    category: "strings",
    description: "Get the longest prefix string which is also a valid suffix.",
    visualizerType: "stringmap",
    defaultInput: { s: "level" },
    generateSteps: (input) => generateLongestHappyPrefixSteps(input.s || "level"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def longestPrefix(s):
    # Slice and compare prefixes/suffixes
    n = len(s)
    for i in range(n - 1, 0, -1):
        if s[0:i] == s[n-i:]:
            return s[0:i]
    return ""`
        },
        {
          label: "Better",
          code: `def longestPrefix(s):
    # Rolling hash matching prefix/suffix
    n = len(s)
    p = 31
    m = 10**9 + 7
    pref_hash = 0
    suff_hash = 0
    power = 1
    max_len = 0
    for i in range(n - 1):
        pref_hash = (pref_hash * p + (ord(s[i]) - 96)) % m
        suff_hash = (suff_hash + (ord(s[n - 1 - i]) - 96) * power) % m
        power = (power * p) % m
        if pref_hash == suff_hash:
            max_len = i + 1
    return s[:max_len]`
        },
        {
          label: "Shorter",
          code: `def longestPrefix(s):
    # Slice and verify
    return next((s[:i] for i in range(len(s)-1, 0, -1) if s.startswith(s[len(s)-i:])), "")`
        },
        {
          label: "Optimal",
          code: `def longestPrefix(s):
    # KMP LPS algorithm O(N)
    n = len(s)
    lps = [0] * n
    for i in range(1, n):
        j = lps[i - 1]
        while j > 0 and s[i] != s[j]:
            j = lps[j - 1]
        if s[i] == s[j]:
            j += 1
        lps[i] = j
    return s[:lps[-1]]`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String longestPrefix(String s) {
        int n = s.length();
        int[] lps = new int[n];
        for (int i = 1; i < n; i++) {
            int j = lps[i - 1];
            while (j > 0 && s.charAt(i) != s.charAt(j)) {
                j = lps[j - 1];
            }
            if (s.charAt(i) == s.charAt(j)) j++;
            lps[i] = j;
        }
        return s.substring(0, lps[n - 1]);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function longestPrefix(s) {
  const n = s.length;
  const lps = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    let j = lps[i - 1];
    while (j > 0 && s[i] !== s[j]) {
      j = lps[j - 1];
    }
    if (s[i] === s[j]) j++;
    lps[i] = j;
  }
  return s.substring(0, lps[n - 1]);
}`
        }
      ]
    }
  },
  "8_count_palindromic_subsequence_in_given_string": {
    problemName: "Count palindromic subsequence in given string",
    category: "strings",
    description: "Determine the total count of palindromic subsequences in a string using Dynamic Programming.",
    visualizerType: "stringmap",
    defaultInput: { s: "abcd" },
    generateSteps: (input) => generateCountPalindromicSubsequencesSteps(input.s || "abcd"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def countPS(s):
    # Naive exponential combinations checks
    n = len(s)
    res = 0
    def is_pal(sub):
        return len(sub) > 0 and sub == sub[::-1]
    def count(idx, current):
        nonlocal res
        if idx == n:
            if is_pal(current):
                res += 1
            return
        count(idx + 1, current + s[idx])
        count(idx + 1, current)
    count(0, "")
    return res`
        },
        {
          label: "Better",
          code: `def countPS(s):
    # Memoized DP recursive count
    n = len(s)
    memo = {}
    def solve(i, j):
        if i > j:
            return 0
        if i == j:
            return 1
        if (i, j) in memo:
            return memo[(i, j)]
        if s[i] == s[j]:
            res = solve(i+1, j) + solve(i, j-1) + 1
        else:
            res = solve(i+1, j) + solve(i, j-1) - solve(i+1, j-1)
        memo[(i, j)] = res
        return res
    return solve(0, n - 1)`
        },
        {
          label: "Shorter",
          code: `def countPS(s):
    # Compact DP list
    n = len(s)
    dp = [[0]*n for _ in range(n)]
    for i in range(n-1, -1, -1):
        dp[i][i] = 1
        for j in range(i+1, n):
            dp[i][j] = dp[i+1][j] + dp[i][j-1] + (1 if s[i] == s[j] else -dp[i+1][j-1])
    return dp[0][n-1]`
        },
        {
          label: "Optimal",
          code: `def countPS(s):
    # Tabulation DP approach O(N^2)
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    for i in range(n):
        dp[i][i] = 1
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i + 1][j] + dp[i][j - 1] + 1
            else:
                dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1]
    return dp[0][n - 1]`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int countPS(String s) {
        int n = s.length();
        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++) {
            dp[i][i] = 1;
        }
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                if (s.charAt(i) == s.charAt(j)) {
                    dp[i][j] = dp[i + 1][j] + dp[i][j - 1] + 1;
                } else {
                    dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
                }
            }
        }
        return dp[0][n - 1];
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function countPS(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j] + dp[i][j - 1] + 1;
      } else {
        dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
      }
    }
  }
  return dp[0][n - 1];
}`
        }
      ]
    }
  }
};
