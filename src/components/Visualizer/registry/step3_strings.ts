import { ProblemVisualizerMeta } from "../visualizerRegistry";
import { generateAnagramSteps } from "../problems/AnagramVisualizer";

// Helper Interface for String Simulation Steps
export interface StringSimulationStep {
  s: string;
  t: string;
  sIndex: number;
  tIndex: number;
  freqMap: Record<string, any>;
  state: string;
  description: string;
  codeLineMap?: Record<string, number>;
}

// 1. String Processing Steps (Palindrome, Rotation)
export function generateStringProcessingSteps(
  s: string,
  t: string,
  type: "palindrome" | "rotation" | "prefix"
): StringSimulationStep[] {
  const steps: StringSimulationStep[] = [];

  if (type === "palindrome") {
    let left = 0;
    let right = s.length - 1;
    let isPal = true;

    steps.push({
      s,
      t,
      sIndex: left,
      tIndex: right,
      freqMap: {},
      state: "checking",
      description: `Initialize palindrome check pointers: left = 0 ('${s[0]}'), right = ${right} ('${s[right]}').`,
      codeLineMap: { "python-efficient": 2, "java-optimal": 3, "javascript-optimal": 2 }
    });

    while (left < right) {
      steps.push({
        s,
        t,
        sIndex: left,
        tIndex: right,
        freqMap: {},
        state: "checking",
        description: `Compare character at left index ${left} ('${s[left]}') with character at right index ${right} ('${s[right]}').`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
      });

      if (s[left].toLowerCase() !== s[right].toLowerCase()) {
        isPal = false;
        steps.push({
          s,
          t,
          sIndex: left,
          tIndex: right,
          freqMap: {},
          state: "mismatch",
          description: `Mismatch detected! Character '${s[left]}' at index ${left} is not equal to '${s[right]}' at index ${right}.`,
          codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
        });
        break;
      }
      left++;
      right--;
    }

    if (isPal) {
      steps.push({
        s,
        t,
        sIndex: -1,
        tIndex: -1,
        freqMap: {},
        state: "match",
        description: "All character comparisons matched successfully. String is a valid palindrome.",
        codeLineMap: { "python-efficient": 6, "java-optimal": 8, "javascript-optimal": 7 }
      });
    }
  } else if (type === "rotation") {
    const combined = s + s;
    const isRot = combined.includes(t) && s.length === t.length;

    steps.push({
      s,
      t,
      sIndex: -1,
      tIndex: -1,
      freqMap: { concatenated: combined },
      state: "checking",
      description: `Concatenate string S with itself: S + S = "${combined}". Check if string T ("${t}") is a substring of "${combined}".`,
      codeLineMap: { "python-efficient": 2, "java-optimal": 2, "javascript-optimal": 2 }
    });

    steps.push({
      s,
      t,
      sIndex: -1,
      tIndex: -1,
      freqMap: { concatenated: combined },
      state: isRot ? "match" : "mismatch",
      description: isRot
        ? `Match! String T ("${t}") is found inside "${combined}". S is a valid rotation of T.`
        : `No Match. String T ("${t}") was not found inside "${combined}" or lengths differ. S is NOT a rotation of T.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });
  }

  return steps;
}

// 2. Largest Odd Number in String
export function generateLargestOddSteps(s: string) {
  const steps: any[] = [];
  const chars = s.split("");
  let ans = "";

  for (let i = s.length - 1; i >= 0; i--) {
    const digit = parseInt(s[i]);
    const isOdd = digit % 2 !== 0;

    steps.push({
      array: chars,
      pointers: { i },
      highlights: { [i]: "active" },
      variables: { currentDigit: digit, isOdd: isOdd ? "True" : "False", currentLargest: ans },
      description: `Check digit at index ${i}: '${s[i]}' (${digit}). Check if it is odd.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
    });

    if (isOdd) {
      ans = s.slice(0, i + 1);
      steps.push({
        array: chars,
        pointers: { i },
        highlights: { [i]: "sorted" },
        variables: { oddDigitIndex: i, result: ans },
        description: `Found odd digit '${s[i]}' at index ${i}! The largest odd number prefix is s[0..${i}] = "${ans}".`,
        codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
      });
      return steps;
    }
  }

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { result: "" },
    description: `No odd digit found in the string. Returns empty string.`,
    codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
  });

  return steps;
}

// 3. Longest Common Prefix
export function generateLongestCommonPrefixSteps(words: string[]) {
  const steps: any[] = [];
  if (words.length === 0) return steps;

  const minWord = words.reduce((a, b) => a.length < b.length ? a : b);
  let prefix = "";

  steps.push({
    array: words,
    pointers: {},
    highlights: {},
    variables: { prefix },
    description: `Start comparison. Word list: [${words.join(", ")}]. Check character by character starting at index 0.`,
    codeLineMap: { "python-efficient": 3, "java-optimal": 4, "javascript-optimal": 3 }
  });

  for (let i = 0; i < minWord.length; i++) {
    const char = minWord[i];
    let match = true;

    for (let j = 0; j < words.length; j++) {
      steps.push({
        array: words,
        pointers: { wordToCheck: j },
        highlights: { [j]: "active" },
        variables: { checkingChar: char, charIndex: i, currentPrefix: prefix },
        description: `Compare character '${char}' at index ${i} with word '${words[j]}'.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
      });

      if (words[j][i] !== char) {
        match = false;
        break;
      }
    }

    if (!match) {
      steps.push({
        array: words,
        pointers: {},
        highlights: {},
        variables: { finalPrefix: prefix },
        description: `Mismatch detected at character index ${i}. Common prefix search completes.`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 8, "javascript-optimal": 7 }
      });
      break;
    }

    prefix += char;
  }

  return steps;
}

// 0. Remove Outermost Parentheses Step Generator
export function generateOuterParenthesesSteps(s: string) {
  const steps: any[] = [];
  let opened = 0;
  let result = "";

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const prevOpened = opened;
    
    let added = false;
    if (c === '(') {
      if (opened > 0) {
        result += c;
        added = true;
      }
      opened++;
    } else if (c === ')') {
      if (opened > 1) {
        result += c;
        added = true;
      }
      opened--;
    }

    steps.push({
      s,
      t: result,
      sIndex: i,
      tIndex: -1,
      freqMap: { opened: prevOpened, action: added ? `Appended '${c}'` : `Skipped outer '${c}'` },
      state: "checking",
      description: `Char '${c}' at index ${i}: opened count was ${prevOpened}. ${
        added ? `Appended to result: "${result}"` : `Omitted outermost parenthesis.`
      } New opened count: ${opened}.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 4, "javascript-optimal": 3 }
    });
  }

  steps.push({
    s,
    t: result,
    sIndex: s.length,
    tIndex: -1,
    freqMap: { final_result: result },
    state: "match",
    description: `Outermost parentheses removed. Final string: "${result}".`,
    codeLineMap: { "python-efficient": 6, "java-optimal": 7, "javascript-optimal": 6 }
  });

  return steps;
}

// 4. Isomorphic Strings (Using stringmap visualizer to show maps)
export function generateIsomorphicSteps(s: string, t: string) {
  const steps: any[] = [];
  const mapST: Record<string, string> = {};
  const mapTS: Record<string, string> = {};
  let isIsomorphic = true;

  for (let i = 0; i < s.length; i++) {
    const c1 = s[i];
    const c2 = t[i];

    steps.push({
      s,
      t,
      sIndex: i,
      tIndex: i,
      freqMap: { ...mapST },
      state: "checking",
      description: `Check mapping at index ${i}: '${c1}' -> '${c2}'.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 4, "javascript-optimal": 4 }
    });

    if (mapST[c1] && mapST[c1] !== c2) {
      isIsomorphic = false;
      steps.push({
        s,
        t,
        sIndex: i,
        tIndex: i,
        freqMap: { ...mapST },
        state: "mismatch",
        description: `Mismatch! '${c1}' is already mapped to '${mapST[c1]}', which is not '${c2}'. Not isomorphic.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
      });
      break;
    }

    if (mapTS[c2] && mapTS[c2] !== c1) {
      isIsomorphic = false;
      steps.push({
        s,
        t,
        sIndex: i,
        tIndex: i,
        freqMap: { ...mapST },
        state: "mismatch",
        description: `Mismatch! '${c2}' is already mapped to '${mapTS[c2]}', which is not '${c1}'. Not isomorphic.`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 7, "javascript-optimal": 7 }
      });
      break;
    }

    mapST[c1] = c2;
    mapTS[c2] = c1;
  }

  if (isIsomorphic) {
    steps.push({
      s,
      t,
      sIndex: s.length,
      tIndex: t.length,
      freqMap: { ...mapST },
      state: "anagram", // acts as general match state
      description: `All character mappings verified. Strings are isomorphic.`,
      codeLineMap: { "python-efficient": 10, "java-optimal": 10, "javascript-optimal": 10 }
    });
  }

  return steps;
}

// 5. Sort Characters by Frequency
export function generateSortByFrequencySteps(s: string) {
  const steps: any[] = [];
  const freq: Record<string, number> = {};

  // 1. Build frequency map
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    freq[c] = (freq[c] || 0) + 1;
    steps.push({
      s,
      t: "",
      sIndex: i,
      tIndex: -1,
      freqMap: { ...freq },
      state: "scanning_s",
      description: `Scanning: increment freq of '${c}'. Map: ${JSON.stringify(freq)}.`,
      codeLineMap: { "python-efficient": 3, "java-optimal": 4, "javascript-optimal": 3 }
    });
  }

  // Sort entries
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  let result = "";

  sorted.forEach(([char, count]) => {
    result += char.repeat(count);
    steps.push({
      s,
      t: result,
      sIndex: s.length,
      tIndex: result.length - 1,
      freqMap: { ...freq },
      state: "scanning_t",
      description: `Append char '${char}' repeated ${count} times. Result: "${result}".`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 7, "javascript-optimal": 5 }
    });
  });

  return steps;
}

// 6. Maximum Nesting Depth of Parentheses
export function generateNestingDepthSteps(s: string) {
  const steps: any[] = [];
  const chars = s.split("");
  let maxDepth = 0;
  let currentDepth = 0;

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "(") {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
    } else if (c === ")") {
      currentDepth--;
    }

    steps.push({
      array: chars,
      pointers: { i },
      highlights: { [i]: "active" },
      variables: { currentChar: c, currentDepth, maxDepth },
      description: `Read '${c}'. Updated nesting depth: ${currentDepth}. Max depth recorded: ${maxDepth}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
    });
  }

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { maxDepth },
    description: `Scan complete. Maximum parentheses nesting depth is ${maxDepth}.`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 11, "javascript-optimal": 9 }
  });

  return steps;
}

// 7. Roman to Integer
export function generateRomanToIntSteps(s: string) {
  const steps: any[] = [];
  const chars = s.split("");
  const romanMap: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
  };

  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    const c1 = romanMap[s[i]];
    const c2 = i + 1 < s.length ? romanMap[s[i + 1]] : 0;

    if (c1 < c2) {
      sum += (c2 - c1);
      steps.push({
        array: chars,
        pointers: { i, "i+1": i + 1 },
        highlights: { [i]: "active", [i + 1]: "active" },
        variables: { currentVal: c1, nextVal: c2, operation: `Add ${c2 - c1}`, currentSum: sum },
        description: `Subtractive combination found: '${s[i]}${s[i + 1]}' = ${c2 - c1}. Add to sum.`,
        codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
      });
      i++; // Skip next character
    } else {
      sum += c1;
      steps.push({
        array: chars,
        pointers: { i },
        highlights: { [i]: "active" },
        variables: { currentVal: c1, operation: `Add ${c1}`, currentSum: sum },
        description: `Additive numeral found: '${s[i]}' = ${c1}. Add to sum.`,
        codeLineMap: { "python-efficient": 8, "java-optimal": 9, "javascript-optimal": 8 }
      });
    }
  }

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { totalValue: sum },
    description: `Conversion complete. Total integer value is ${sum}.`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 11, "javascript-optimal": 10 }
  });

  return steps;
}

// 8. Implement Atoi
export function generateAtoiSteps(s: string) {
  const steps: any[] = [];
  const chars = s.split("");

  let i = 0;
  // Skip spaces
  while (i < s.length && s[i] === " ") {
    i++;
  }

  steps.push({
    array: chars,
    pointers: { i },
    highlights: {},
    variables: { index: i, sign: 1, parsed: 0 },
    description: `Skip leading whitespace. Scan starts at index ${i}.`,
    codeLineMap: { "python-efficient": 3, "java-optimal": 3, "javascript-optimal": 3 }
  });

  let sign = 1;
  if (i < s.length && (s[i] === "+" || s[i] === "-")) {
    sign = s[i] === "-" ? -1 : 1;
    steps.push({
      array: chars,
      pointers: { i },
      highlights: { [i]: "compare" },
      variables: { index: i, sign, parsed: 0 },
      description: `Sign token detected: '${s[i]}'. Sign multiplier set to ${sign}.`,
      codeLineMap: { "python-efficient": 4, "java-optimal": 5, "javascript-optimal": 4 }
    });
    i++;
  }

  let result = 0;
  const INT_MIN = -2147483648;
  const INT_MAX = 2147483647;

  while (i < s.length) {
    const c = s[i];
    if (c < "0" || c > "9") {
      steps.push({
        array: chars,
        pointers: { i },
        highlights: { [i]: "swap" },
        variables: { result, sign, finalResult: result * sign },
        description: `Non-digit character '${c}' encountered. Stop parsing.`,
        codeLineMap: { "python-efficient": 9, "java-optimal": 11, "javascript-optimal": 9 }
      });
      break;
    }

    const digit = parseInt(c);
    result = result * 10 + digit;

    // Check bounds
    if (result * sign > INT_MAX) {
      steps.push({
        array: chars,
        pointers: { i },
        highlights: {},
        variables: { result: INT_MAX },
        description: `Integer overflow detected. Clamp output to INT_MAX (${INT_MAX}).`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 8, "javascript-optimal": 7 }
      });
      return steps;
    }
    if (result * sign < INT_MIN) {
      steps.push({
        array: chars,
        pointers: { i },
        highlights: {},
        variables: { result: INT_MIN },
        description: `Integer underflow detected. Clamp output to INT_MIN (${INT_MIN}).`,
        codeLineMap: { "python-efficient": 7, "java-optimal": 8, "javascript-optimal": 7 }
      });
      return steps;
    }

    steps.push({
      array: chars,
      pointers: { i },
      highlights: { [i]: "active" },
      variables: { currentDigit: digit, accumulatedValue: result, signedVal: result * sign },
      description: `Parsed digit '${c}'. Updated accumulated number value to ${result}.`,
      codeLineMap: { "python-efficient": 6, "java-optimal": 7, "javascript-optimal": 6 }
    });

    i++;
  }

  const finalVal = result * sign;
  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { result: finalVal },
    description: `Conversion complete. Return final parsed integer: ${finalVal}.`,
    codeLineMap: { "python-efficient": 10, "java-optimal": 12, "javascript-optimal": 10 }
  });

  return steps;
}

// 9. Count Number of Substrings (exactly K distinct)
export function generateCountSubstringsSteps(s: string, k: number) {
  const steps: any[] = [];
  const chars = s.split("");
  let count = 0;

  // Let's show a simulated count sliding window for visualization
  for (let i = 0; i < s.length; i++) {
    const freq: Record<string, number> = {};
    let distinct = 0;

    for (let j = i; j < s.length; j++) {
      const c = s[j];
      if (!freq[c]) {
        distinct++;
        freq[c] = 0;
      }
      freq[c]++;

      if (distinct === k) {
        count++;
        steps.push({
          array: chars,
          pointers: { left: i, right: j },
          highlights: { [i]: "compare", [j]: "compare" },
          variables: { distinctChars: distinct, currentSubString: s.slice(i, j + 1), totalSubstrings: count },
          description: `Found valid substring "${s.slice(i, j + 1)}" with exactly ${k} distinct characters.`,
          codeLineMap: { "python-efficient": 5, "java-optimal": 5, "javascript-optimal": 5 }
        });
      } else if (distinct > k) {
        break;
      }
    }
  }

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { totalSubstrings: count },
    description: `Substrings counting complete. Found ${count} matching substrings.`,
    codeLineMap: { "python-efficient": 8, "java-optimal": 8, "javascript-optimal": 8 }
  });

  return steps;
}

// 10. Longest Palindromic Substring
export function generateLongestPalindromeSteps(s: string) {
  const steps: any[] = [];
  const chars = s.split("");
  let start = 0, end = 0;

  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { longest: "" },
    description: `Initialize search. We will expand around each index center to locate palindromes.`,
    codeLineMap: { "python-efficient": 3, "java-optimal": 4, "javascript-optimal": 3 }
  });

  for (let i = 0; i < s.length; i++) {
    // Odd expand
    let l1 = i, r1 = i;
    while (l1 >= 0 && r1 < s.length && s[l1] === s[r1]) {
      if (r1 - l1 > end - start) {
        start = l1;
        end = r1;
      }
      l1--;
      r1++;
    }

    // Even expand
    let l2 = i, r2 = i + 1;
    while (l2 >= 0 && r2 < s.length && s[l2] === s[r2]) {
      if (r2 - l2 > end - start) {
        start = l2;
        end = r2;
      }
      l2--;
      r2++;
    }

    steps.push({
      array: chars,
      pointers: { center: i },
      highlights: { [i]: "active" },
      variables: { center: i, currentLongest: s.slice(start, end + 1) },
      description: `Expanded around center index ${i}. Current longest palindrome is "${s.slice(start, end + 1)}".`,
      codeLineMap: { "python-efficient": 5, "java-optimal": 6, "javascript-optimal": 5 }
    });
  }

  const ans = s.slice(start, end + 1);
  steps.push({
    array: chars,
    pointers: {},
    highlights: {},
    variables: { longestPalindrome: ans },
    description: `Search complete. Longest palindromic substring is "${ans}".`,
    codeLineMap: { "python-efficient": 9, "java-optimal": 11, "javascript-optimal": 9 }
  });

  return steps;
}

// 11. Sum of Beauty of Substrings
export function generateSumOfBeautySteps(s: string) {
  const steps: any[] = [];
  let totalBeauty = 0;

  for (let i = 0; i < s.length; i++) {
    const freq = Array(26).fill(0);
    for (let j = i; j < s.length; j++) {
      const charCode = s.charCodeAt(j) - 97;
      freq[charCode]++;

      // Calculate min & max frequency
      let maxFreq = 0;
      let minFreq = Infinity;
      for (let c = 0; c < 26; c++) {
        if (freq[c] > 0) {
          maxFreq = Math.max(maxFreq, freq[c]);
          minFreq = Math.min(minFreq, freq[c]);
        }
      }

      const beauty = maxFreq - minFreq;
      totalBeauty += beauty;

      const charFreqMap: Record<string, number> = {};
      for (let c = 0; c < 26; c++) {
        if (freq[c] > 0) {
          charFreqMap[String.fromCharCode(97 + c)] = freq[c];
        }
      }

      steps.push({
        s,
        t: s.slice(i, j + 1),
        sIndex: i,
        tIndex: j,
        freqMap: {
          ...charFreqMap,
          max_freq: maxFreq,
          min_freq: minFreq,
          beauty,
          total_beauty: totalBeauty
        },
        state: "checking",
        description: `Substring "${s.slice(i, j + 1)}": Max freq = ${maxFreq}, Min freq = ${minFreq}. Beauty = ${beauty}. Total beauty = ${totalBeauty}.`,
        codeLineMap: {
          "python-efficient": 6,
          "java-optimal": 8,
          "javascript-optimal": 6,
          "python-shorter": 5,
          "python-brute": 6
        }
      });
    }
  }

  steps.push({
    s,
    t: "",
    sIndex: -1,
    tIndex: -1,
    freqMap: { total_beauty: totalBeauty },
    state: "match",
    description: `Beauty summing complete. Total sum of beauties of all substrings is ${totalBeauty}.`,
    codeLineMap: {
      "python-efficient": 10,
      "java-optimal": 12,
      "javascript-optimal": 10,
      "python-shorter": 8,
      "python-brute": 8
    }
  });

  return steps;
}

// 12. Reverse Every Word in A String
export function generateReverseEveryWordSteps(s: string) {
  const steps: any[] = [];
  const words = s.trim().split(/\s+/);

  steps.push({
    array: words,
    pointers: {},
    highlights: {},
    variables: { wordsCount: words.length },
    description: `Tokenized S into word tokens list: [${words.join(", ")}]. Reverse the sequence.`,
    codeLineMap: { "python-efficient": 2, "java-optimal": 3, "javascript-optimal": 2 }
  });

  const reversed = [...words].reverse();
  steps.push({
    array: reversed,
    pointers: {},
    highlights: {},
    variables: { result: reversed.join(" ") },
    description: `Reversed words sequence: [${reversed.join(", ")}]. Joint result: "${reversed.join(" ")}".`,
    codeLineMap: { "python-efficient": 3, "java-optimal": 7, "javascript-optimal": 3 }
  });

  return steps;
}

export const step3StringsRegistry: Record<string, ProblemVisualizerMeta> = {
  "0_remove_outermost_paranthesis": {
    problemName: "Remove Outermost Parentheses",
    category: "strings",
    description: "Remove the outermost parentheses of every primitive string in S.",
    visualizerType: "stringmap",
    defaultInput: {
      s: "(()())(())",
      t: ""
    },
    generateSteps: (input) => generateOuterParenthesesSteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def removeOuterParentheses(s):
    res, opened = [], 0
    for c in s:
        if c == '(' and opened > 0: res.append(c)
        if c == ')' and opened > 1: res.append(c)
        opened += 1 if c == '(' else -1
    return "".join(res)`
        },
        {
          label: "Efficient",
          code: `def removeOuterParentheses(s):
    res, opened = [], 0
    for c in s:
        if c == '(' and opened > 0: res.append(c)
        if c == ')' and opened > 1: res.append(c)
        opened += 1 if c == '(' else -1
    return "".join(res)`
        },
        {
          label: "Brute Force",
          code: `def removeOuterParentheses(s):
    res, opened, start = "", 0, 0
    for i, c in enumerate(s):
        if c == '(': opened += 1
        else: opened -= 1
        if opened == 0:
            res += s[start + 1:i]
            start = i + 1
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String removeOuterParentheses(String s) {
        StringBuilder sb = new StringBuilder();
        int opened = 0;
        for (char c : s.toCharArray()) {
            if (c == '(' && opened++ > 0) sb.append(c);
            if (c == ')' && opened-- > 1) sb.append(c);
        }
        return sb.toString();
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function removeOuterParentheses(s) {
  let res = "", opened = 0;
  for (let c of s) {
    if (c === '(' && opened++ > 0) res += c;
    if (c === ')' && opened-- > 1) res += c;
  }
  return res;
}`
        }
      ]
    }
  },
  "1_reverse_words_in_a_given_string_/_palindrome_check_": {
    problemName: "Reverse Words in String",
    category: "strings",
    description: "Reverse the order of words in string S, separating them with a single space.",
    visualizerType: "array1d",
    defaultInput: {
      array: ["the", "sky", "is", "blue"],
      s: "the sky is blue"
    },
    generateSteps: (input) => generateReverseEveryWordSteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def reverseWords(s):
    return " ".join(s.split()[::-1])`
        },
        {
          label: "Efficient",
          code: `def reverseWords(s):
    words = s.split()
    l, r = 0, len(words) - 1
    while l < r:
        words[l], words[r] = words[r], words[l]
        l, r = l + 1, r - 1
    return " ".join(words)`
        },
        {
          label: "Brute Force",
          code: `def reverseWords(s):
    words = s.split()
    res = []
    for i in range(len(words) - 1, -1, -1):
        res.append(words[i])
    return " ".join(res)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(" ");
        }
        return sb.toString();
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function reverseWords(s) {
  return s.trim().split(/\\\\s+/).reverse().join(" ");
}`
        }
      ]
    }
  },
  "2_largest_odd_number_in_a_string": {
    problemName: "Largest Odd Number",
    category: "strings",
    description: "Find the largest valued odd integer that is a non-empty substring of S.",
    visualizerType: "array1d",
    defaultInput: { s: "35427" },
    generateSteps: (input) => generateLargestOddSteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def largestOddNumber(s):
    return s.rstrip("02468")`
        },
        {
          label: "Efficient",
          code: `def largestOddNumber(s):
    for i in range(len(s) - 1, -1, -1):
        if int(s[i]) % 2 != 0:
            return s[:i+1]
    return ""`
        },
        {
          label: "Brute Force",
          code: `def largestOddNumber(s):
    max_odd = ""
    for i in range(len(s)):
        for j in range(i, len(s)):
            sub = s[i:j+1]
            if int(sub[-1]) % 2 != 0:
                if not max_odd or int(sub) > int(max_odd):
                    max_odd = sub
    return max_odd`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String largestOddNumber(String s) {
        for (int i = s.length() - 1; i >= 0; i--) {
            if ((s.charAt(i) - '0') % 2 != 0) {
                return s.substring(0, i + 1);
            }
        }
        return "";
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function largestOddNumber(s) {
  for (let i = s.length - 1; i >= 0; i--) {
    if (parseInt(s[i]) % 2 !== 0) {
      return s.substring(0, i + 1);
    }
  }
  return "";
}`
        }
      ]
    }
  },
  "3_longest_common_prefix": {
    problemName: "Longest Common Prefix",
    category: "strings",
    description: "Find the longest common prefix string amongst an array of strings.",
    visualizerType: "array1d",
    defaultInput: { array: ["flower", "flow", "flight"] },
    generateSteps: (input) => generateLongestCommonPrefixSteps(input.array),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def longestCommonPrefix(strs):
    if not strs: return ""
    s1, s2 = min(strs), max(strs)
    for i, c in enumerate(s1):
        if i >= len(s2) or c != s2[i]:
            return s1[:i]
    return s1`
        },
        {
          label: "Efficient",
          code: `def longestCommonPrefix(strs):
    if not strs: return ""
    min_word = min(strs, key=len)
    for i, char in enumerate(min_word):
        for word in strs:
            if word[i] != char:
                return min_word[:i]
    return min_word`
        },
        {
          label: "Brute Force",
          code: `def longestCommonPrefix(strs):
    if not strs: return ""
    prefix = strs[0]
    for i in range(1, len(strs)):
        new_pref = ""
        for j in range(min(len(prefix), len(strs[i]))):
            if prefix[j] == strs[i][j]:
                new_pref += prefix[j]
            else:
                break
        prefix = new_pref
    return prefix`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}`
        }
      ]
    }
  },
  "4_isomorphic_string": {
    problemName: "Isomorphic Strings",
    category: "strings",
    description: "Determine if two strings s and t are isomorphic (bijective character mappings).",
    visualizerType: "stringmap",
    defaultInput: {
      s: "egg",
      t: "add"
    },
    generateSteps: (input) => generateIsomorphicSteps(input.s, input.t),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def isIsomorphic(s, t):
    return len(set(s)) == len(set(t)) == len(set(zip(s, t)))`
        },
        {
          label: "Efficient",
          code: `def isIsomorphic(s, t):
    mapST, mapTS = {}, {}
    for c1, c2 in zip(s, t):
        if c1 in mapST and mapST[c1] != c2:
            return False
        if c2 in mapTS and mapTS[c2] != c1:
            return False
        mapST[c1] = c2
        mapTS[c2] = c1
    return True`
        },
        {
          label: "Brute Force",
          code: `def isIsomorphic(s, t):
    if len(s) != len(t): return False
    for i in range(len(s)):
        if s.find(s[i]) != t.find(t[i]):
            return False
    return True`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        int[] mapS = new int[256];
        int[] mapT = new int[256];
        for (int i = 0; i < s.length(); i++) {
            if (mapS[s.charAt(i)] != mapT[t.charAt(i)]) return false;
            mapS[s.charAt(i)] = i + 1;
            mapT[t.charAt(i)] = i + 1;
        }
        return true;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function isIsomorphic(s, t) {
  const mapS = {}, mapT = {};
  for (let i = 0; i < s.length; i++) {
    if (mapS[s[i]] !== mapT[t[i]]) return false;
    mapS[s[i]] = i + 1;
    mapT[t[i]] = i + 1;
  }
  return true;
}`
        }
      ]
    }
  },
  "5_check_whether_one_string_is_a_rotation_of_another_": {
    problemName: "Rotate String Check",
    category: "strings",
    description: "Return true if string S can become T after some number of cyclic shifts.",
    visualizerType: "stringmap",
    defaultInput: {
      s: "abcde",
      t: "cdeab"
    },
    generateSteps: (input) => generateStringProcessingSteps(input.s, input.t, "rotation"),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def rotateString(s, t):
    return len(s) == len(t) and t in (s + s)`
        },
        {
          label: "Efficient",
          code: `def rotateString(s, t):
    if len(s) != len(t): return False
    if s == t: return True
    for i in range(len(s)):
        if s[i:] + s[:i] == t:
            return True
    return False`
        },
        {
          label: "Brute Force",
          code: `def rotateString(s, t):
    if len(s) != len(t): return False
    s_chars = list(s)
    for _ in range(len(s)):
        first = s_chars.pop(0)
        s_chars.append(first)
        if "".join(s_chars) == t:
            return True
    return False`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean rotateString(String s, String t) {
        return s.length() == t.length() && (s + s).contains(t);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function rotateString(s, t) {
  return s.length === t.length && (s + s).includes(t);
}`
        }
      ]
    }
  },
  "6_check_if_two_strings_are_anagram_of_each_other": {
    problemName: "Valid Anagram",
    category: "strings",
    description: "Determine if string t is an anagram of s (contains same characters in different orders).",
    visualizerType: "stringmap",
    defaultInput: {
      s: "anagram",
      t: "nagaram",
    },
    generateSteps: (input) => generateAnagramSteps(input.s, input.t),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def isAnagram(s, t):
    return sorted(s) == sorted(t)`
        },
        {
          label: "Efficient",
          code: `def isAnagram(s, t):
    if len(s) != len(t): return False
    counts = {}
    for char in s:
        counts[char] = counts.get(char, 0) + 1
    for char in t:
        if char not in counts or counts[char] == 0:
            return False
        counts[char] -= 1
    return True`
        },
        {
          label: "Brute Force",
          code: `def isAnagram(s, t):
    if len(s) != len(t): return False
    t_list = list(t)
    for char in s:
        if char in t_list:
            t_list.remove(char)
        else:
            return False
    return len(t_list) == 0`
        }
      ],
      java: [
        {
          label: "Optimal (Frequency Array)",
          code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counter = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counter[s.charAt(i) - 'a']++;
            counter[t.charAt(i) - 'a']--;
        }
        for (int count : counter) {
            if (count != 0) return false;
        }
        return true;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`
        }
      ]
    }
  },
  "0_sort_characters_by_frequency": {
    problemName: "Sort Chars by Frequency",
    category: "strings",
    description: "Sort characters in the string in decreasing order based on frequency of occurrence.",
    visualizerType: "stringmap",
    defaultInput: { s: "tree" },
    generateSteps: (input) => generateSortByFrequencySteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def frequencySort(s):
    import collections
    return "".join(c * cnt for c, cnt in collections.Counter(s).most_common())`
        },
        {
          label: "Efficient",
          code: `def frequencySort(s):
    import collections
    counts = collections.Counter(s)
    sorted_chars = sorted(counts.items(), key=lambda x: -x[1])
    return "".join(c * cnt for c, cnt in sorted_chars)`
        },
        {
          label: "Brute Force",
          code: `def frequencySort(s):
    unique_chars = list(set(s))
    for i in range(len(unique_chars)):
        for j in range(i + 1, len(unique_chars)):
            c1, c2 = unique_chars[i], unique_chars[j]
            if s.count(c1) < s.count(c2):
                unique_chars[i], unique_chars[j] = unique_chars[j], unique_chars[i]
    res = ""
    for char in unique_chars:
        res += char * s.count(char)
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String frequencySort(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) counts.put(c, counts.getOrDefault(c, 0) + 1);
        List<Character> chars = new ArrayList<>(counts.keySet());
        chars.sort((a, b) -> counts.get(b) - counts.get(a));
        StringBuilder sb = new StringBuilder();
        for (char c : chars) {
            sb.append(String.valueOf(c).repeat(counts.get(c)));
        }
        return sb.toString();
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function frequencySort(s) {
  const counts = {};
  for (let c of s) counts[c] = (counts[c] || 0) + 1;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([c, cnt]) => c.repeat(cnt))
    .join("");
}`
        }
      ]
    }
  },
  "1_maximum_nesting_depth_of_paranthesis": {
    problemName: "Max Parentheses Depth",
    category: "strings",
    description: "Find the maximum nesting depth of parentheses in the mathematical expression string S.",
    visualizerType: "array1d",
    defaultInput: { s: "(1+(2*3)+((8)/4))+1" },
    generateSteps: (input) => generateNestingDepthSteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def maxDepth(s):
    import itertools
    depths = list(itertools.accumulate(1 if c == '(' else -1 if c == ')' else 0 for c in s))
    return max(depths) if depths else 0`
        },
        {
          label: "Efficient",
          code: `def maxDepth(s):
    max_d = curr = 0
    for c in s:
        if c == '(':
            curr += 1
            max_d = max(max_d, curr)
        elif c == ')':
            curr -= 1
    return max_d`
        },
        {
          label: "Brute Force",
          code: `def maxDepth(s):
    stack = []
    max_d = 0
    for c in s:
        if c == '(':
            stack.append('(')
            max_d = max(max_d, len(stack))
        elif c == ')':
            if stack:
                stack.pop()
    return max_d`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int maxDepth(String s) {
        int maxD = 0, curr = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') maxD = Math.max(maxD, ++curr);
            else if (c == ')') curr--;
        }
        return maxD;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function maxDepth(s) {
  let maxD = 0, curr = 0;
  for (let c of s) {
    if (c === '(') maxD = Math.max(maxD, ++curr);
    else if (c === ')') curr--;
  }
  return maxD;
}`
        }
      ]
    }
  },
  "2_roman_number_to_integer_and_vice_versa": {
    problemName: "Roman to Integer",
    category: "strings",
    description: "Convert a Roman numeral string S into its corresponding decimal integer representation.",
    visualizerType: "array1d",
    defaultInput: { s: "MCMXCIV" },
    generateSteps: (input) => generateRomanToIntSteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def romanToInt(s):
    r_map = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000}
    s = s.replace("IV", "IIII").replace("IX", "VIIII").replace("XL", "XXXX").replace("XC", "LXXXX").replace("CD", "CCCC").replace("CM", "DCCCC")
    return sum(r_map[c] for c in s)`
        },
        {
          label: "Efficient",
          code: `def romanToInt(s):
    r_map = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000}
    total = i = 0
    while i < len(s):
        c1 = r_map[s[i]]
        c2 = r_map[s[i+1]] if i+1 < len(s) else 0
        if c1 < c2:
            total += (c2 - c1)
            i += 2
        else:
            total += c1
            i += 1
    return total`
        },
        {
          label: "Brute Force",
          code: `def romanToInt(s):
    r_map = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000}
    total = 0
    i = 0
    while i < len(s):
        if i + 1 < len(s) and s[i:i+2] in ["IV", "IX", "XL", "XC", "CD", "CM"]:
            total += r_map[s[i+1]] - r_map[s[i]]
            i += 2
        else:
            total += r_map[s[i]]
            i += 1
    return total`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> map = Map.of('I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000);
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int c1 = map.get(s.charAt(i));
            int c2 = i + 1 < s.length() ? map.get(s.charAt(i + 1)) : 0;
            if (c1 < c2) {
                total += (c2 - c1); i++;
            } else {
                total += c1;
            }
        }
        return total;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function romanToInt(s) {
  const map = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const c1 = map[s[i]];
    const c2 = i + 1 < s.length ? map[s[i+1]] : 0;
    if (c1 < c2) {
      total += (c2 - c1); i++;
    } else {
      total += c1;
    }
  }
  return total;
}`
        }
      ]
    }
  },
  "3_implement_atoi": {
    problemName: "Implement Atoi",
    category: "strings",
    description: "Convert a string to a 32-bit signed integer (similar to C/C++'s atoi function).",
    visualizerType: "array1d",
    defaultInput: { s: "   -42" },
    generateSteps: (input) => generateAtoiSteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def myAtoi(s):
    import re
    match = re.match(r'^\\s*([+-]?\\d+)', s)
    if not match: return 0
    val = int(match.group(1))
    return max(-2147483648, min(2147483647, val))`
        },
        {
          label: "Efficient",
          code: `def myAtoi(s):
    s = s.lstrip()
    if not s: return 0
    sign = -1 if s[0] == '-' else 1
    if s[0] in ('-', '+'): s = s[1:]
    res = i = 0
    while i < len(s) and s[i].isdigit():
        res = res * 10 + int(s[i])
        if res * sign > 2147483647: return 2147483647
        if res * sign < -2147483648: return -2147483648
        i += 1
    return res * sign`
        },
        {
          label: "Brute Force",
          code: `def myAtoi(s):
    cleaned = ""
    for c in s:
        if not cleaned and c == " ": continue
        if not cleaned and c in ["-", "+"]:
            cleaned += c
            continue
        if c.isdigit():
            cleaned += c
        else:
            break
    if not cleaned or cleaned in ["-", "+"]: return 0
    val = int(cleaned)
    if val > 2147483647: return 2147483647
    if val < -2147483648: return -2147483648
    return val`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int myAtoi(String s) {
        int i = 0, n = s.length(), sign = 1;
        while (i < n && s.charAt(i) == ' ') i++;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            sign = s.charAt(i) == '-' ? -1 : 1; i++;
        }
        long res = 0;
        while (i < n && Character.isDigit(s.charAt(i))) {
            res = res * 10 + (s.charAt(i) - '0');
            if (res * sign > Integer.MAX_VALUE) return Integer.MAX_VALUE;
            if (res * sign < Integer.MIN_VALUE) return Integer.MIN_VALUE;
            i++;
        }
        return (int) res * sign;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function myAtoi(s) {
  let i = 0, sign = 1, res = 0;
  while (i < s.length && s[i] === ' ') i++;
  if (i < s.length && (s[i] === '+' || s[i] === '-')) {
    sign = s[i] === '-' ? -1 : 1; i++;
  }
  const INT_MAX = 2147483647, INT_MIN = -2147483648;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    res = res * 10 + parseInt(s[i]);
    if (res * sign > INT_MAX) return INT_MAX;
    if (res * sign < INT_MIN) return INT_MIN;
    i++;
  }
  return res * sign;
}`
        }
      ]
    }
  },
  "4_count_number_of_substrings": {
    problemName: "Count Substrings",
    category: "strings",
    description: "Count number of substrings with exactly K distinct characters.",
    visualizerType: "array1d",
    defaultInput: {
      s: "aba",
      target: 2
    },
    generateSteps: (input) => generateCountSubstringsSteps(input.s, input.target),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def substrCount(s, k):
    def atMost(k):
        counts, left, ans = {}, 0, 0
        for right, c in enumerate(s):
            counts[c] = counts.get(c, 0) + 1
            while len(counts) > k:
                counts[s[left]] -= 1
                if counts[s[left]] == 0: del counts[s[left]]
                left += 1
            ans += (right - left + 1)
        return ans
    return atMost(k) - atMost(k - 1)`
        },
        {
          label: "Efficient",
          code: `def substrCount(s, k):
    def atMost(k):
        counts = {}
        left = ans = distinct = 0
        for right, c in enumerate(s):
            if counts.get(c, 0) == 0: distinct += 1
            counts[c] = counts.get(c, 0) + 1
            while distinct > k:
                counts[s[left]] -= 1
                if counts[s[left]] == 0: distinct -= 1
                left += 1
            ans += (right - left + 1)
        return ans
    return atMost(k) - atMost(k - 1)`
        },
        {
          label: "Brute Force",
          code: `def substrCount(s, k):
    ans = 0
    for i in range(len(s)):
        distinct = set()
        for j in range(i, len(s)):
            distinct.add(s[j])
            if len(distinct) == k:
                ans += 1
            elif len(distinct) > k:
                break
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    long substrCount (String s, int k) {
        return atMost(s, k) - atMost(s, k - 1);
    }
    private long atMost(String s, int k) {
        int[] freq = new int[26];
        int left = 0, distinct = 0;
        long ans = 0;
        for (int right = 0; right < s.length(); right++) {
            if (freq[s.charAt(right) - 'a']++ == 0) distinct++;
            while (distinct > k) {
                if (--freq[s.charAt(left) - 'a'] == 0) distinct--;
                left++;
            }
            ans += (right - left + 1);
        }
        return ans;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function substrCount(s, k) {
  function atMost(k) {
    const freq = {};
    let left = 0, distinct = 0, ans = 0;
    for (let right = 0; right < s.length; right++) {
      if (!freq[s[right]] || freq[s[right]] === 0) {
        distinct++;
        freq[s[right]] = 0;
      }
      freq[s[right]]++;
      while (distinct > k) {
        freq[s[left]]--;
        if (freq[s[left]] === 0) distinct--;
        left++;
      }
      ans += (right - left + 1);
    }
    return ans;
  }
  return atMost(k) - atMost(k - 1);
}`
        }
      ]
    }
  },
  "5_longest_palindromic_substring[do_it_without_dp]": {
    problemName: "Longest Palindrome Sub",
    category: "strings",
    description: "Locate the longest palindromic substring in S using expansion around centers.",
    visualizerType: "array1d",
    defaultInput: { s: "babad" },
    generateSteps: (input) => generateLongestPalindromeSteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def longestPalindrome(s):
    if s == s[::-1]: return s
    ans = ""
    for i in range(len(s)):
        for j in range(len(s), i, -1):
            if len(s[i:j]) <= len(ans): break
            if s[i:j] == s[i:j][::-1]:
                ans = s[i:j]
                break
    return ans`
        },
        {
          label: "Efficient",
          code: `def longestPalindrome(s):
    start = end = 0
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l, r = l - 1, r + 1
        return l + 1, r - 1
    for i in range(len(s)):
        l1, r1 = expand(i, i)
        l2, r2 = expand(i, i + 1)
        if r1 - l1 > end - start: start, end = l1, r1
        if r2 - l2 > end - start: start, end = l2, r2
    return s[start:end+1]`
        },
        {
          label: "Brute Force",
          code: `def longestPalindrome(s):
    ans = ""
    for i in range(len(s)):
        for j in range(i, len(s)):
            sub = s[i:j+1]
            if sub == sub[::-1] and len(sub) > len(ans):
                ans = sub
    return ans`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String longestPalindrome(String s) {
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(s, i, i);
            int len2 = expand(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function longestPalindrome(s) {
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    const len1 = expand(s, i, i);
    const len2 = expand(s, i, i + 1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.substring(start, end + 1);
}`
        }
      ]
    }
  },
  "6_sum_of_beauty_of_all_substring": {
    problemName: "Sum of Substring Beauty",
    category: "strings",
    description: "Find the sum of beauty of all substrings of S (difference between max & min character frequencies).",
    visualizerType: "stringmap",
    defaultInput: { s: "aabcb" },
    generateSteps: (input) => generateSumOfBeautySteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def beautySum(s):
    import collections
    return sum(
        max(counts.values()) - min(counts.values())
        for i in range(len(s))
        for j in range(i, len(s))
        for counts in [collections.Counter(s[i:j+1])]
    )`
        },
        {
          label: "Efficient",
          code: `def beautySum(s):
    total = 0
    for i in range(len(s)):
        freq = [0] * 26
        for j in range(i, len(s)):
            freq[ord(s[j]) - 97] += 1
            counts = [f for f in freq if f > 0]
            total += (max(counts) - min(counts))
    return total`
        },
        {
          label: "Brute Force",
          code: `def beautySum(s):
    total = 0
    for i in range(len(s)):
        for j in range(i, len(s)):
            sub = s[i:j+1]
            freq = {}
            for c in sub: freq[c] = freq.get(c, 0) + 1
            total += max(freq.values()) - min(freq.values())
    return total`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int beautySum(String s) {
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int[] freq = new int[26];
            for (int j = i; j < s.length(); j++) {
                freq[s.charAt(j) - 'a']++;
                int max = 0, min = Integer.MAX_VALUE;
                for (int f : freq) {
                    if (f > 0) {
                        max = Math.max(max, f);
                        min = Math.min(min, f);
                    }
                }
                total += (max - min);
            }
        }
        return total;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function beautySum(s) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const freq = Array(26).fill(0);
    for (let j = i; j < s.length; j++) {
      freq[s.charCodeAt(j) - 97]++;
      let max = 0, min = Infinity;
      for (let f of freq) {
        if (f > 0) {
          max = Math.max(max, f);
          min = Math.min(min, f);
        }
      }
      total += (max - min);
    }
  }
  return total;
}`
        }
      ]
    }
  },
  "7_reverse_every_word_in_a_string": {
    problemName: "Reverse Every Word",
    category: "strings",
    description: "Reverse the order of words in string S, separating them with a single space.",
    visualizerType: "array1d",
    defaultInput: {
      array: ["the", "sky", "is", "blue"],
      s: "the sky is blue"
    },
    generateSteps: (input) => generateReverseEveryWordSteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def reverseWords(s):
    return " ".join(s.split()[::-1])`
        },
        {
          label: "Efficient",
          code: `def reverseWords(s):
    words = s.split()
    n = len(words)
    for i in range(n // 2):
        words[i], words[n - 1 - i] = words[n - 1 - i], words[i]
    return " ".join(words)`
        },
        {
          label: "Brute Force",
          code: `def reverseWords(s):
    words = []
    word = ""
    for c in s:
        if c != " ":
            word += c
        else:
            if word:
                words.append(word)
                word = ""
    if word: words.append(word)
    rev = []
    for w in words: rev.insert(0, w)
    return " ".join(rev)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(" ");
        }
        return sb.toString();
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function reverseWords(s) {
  return s.trim().split(/\\\\s+/).reverse().join(" ");
}`
        }
      ]
    }
  }
};
