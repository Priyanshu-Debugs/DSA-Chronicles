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
      tIndex: -1,
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
      if (beauty > 0) {
        totalBeauty += beauty;
        steps.push({
          s,
          t: s.slice(i, j + 1),
          sIndex: i,
          tIndex: j,
          freqMap: { max_freq: maxFreq, min_freq: minFreq, beauty },
          state: "checking",
          description: `Substring "${s.slice(i, j + 1)}": Max freq = ${maxFreq}, Min freq = ${minFreq}. Beauty = ${beauty}. Total beauty = ${totalBeauty}.`,
          codeLineMap: { "python-efficient": 6, "java-optimal": 8, "javascript-optimal": 6 }
        });
      }
    }
  }

  steps.push({
    s,
    t: "",
    sIndex: -1,
    tIndex: -1,
    freqMap: {},
    state: "match",
    description: `Beauty summing complete. Total sum of beauties of all substrings is ${totalBeauty}.`,
    codeLineMap: { "python-efficient": 10, "java-optimal": 12, "javascript-optimal": 10 }
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
    generateSteps: (input) => generateAnagramSteps(input.s, "(()())()"),
    solutions: {
      python: [
        {
          label: "Efficient",
          code: `def removeOuterParentheses(s):
    res, opened = [], 0
    for c in s:
        if c == '(' and opened > 0: res.append(c)
        if c == ')' and opened > 1: res.append(c)
        opened += 1 if c == '(' else -1
    return "".join(res)`
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
      array: ["the", "sky", "is", "blue"], // array format parsed by visualizer
      s: "the sky is blue"
    },
    generateSteps: (input) => generateReverseEveryWordSteps(input.s),
    solutions: {
      python: [
        {
          label: "Shorter",
          code: `def reverseWords(s):
    # Split by spaces and reverse word list
    return " ".join(s.split()[::-1])`
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
          label: "Efficient",
          code: `def largestOddNumber(s):
    # Scan from right to find odd digit
    for i in range(len(s) - 1, -1, -1):
        if int(s[i]) % 2 != 0:
            return s[:i+1]
    return ""`
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
          label: "Efficient",
          code: `def longestCommonPrefix(strs):
    if not strs: return ""
    min_word = min(strs, key=len)
    for i, char in enumerate(min_word):
        for word in strs:
            if word[i] != char:
                return min_word[:i]
    return min_word`
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
          label: "Efficient",
          code: `def rotateString(s, t):
    # S rotation must be a substring of S+S
    return len(s) == len(t) and t in (s + s)`
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
}`,
        },
      ],
      python: [
        {
          label: "Efficient (Hash Map count)",
          code: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
    counts = {}
    for char in s:
        counts[char] = counts.get(char, 0) + 1
    for char in t:
        if char not in counts or counts[char] == 0:
            return False
        counts[char] -= 1
    return True`,
        },
        {
          label: "Easier (Char Sorting)",
          code: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
    return sorted(s) == sorted(t)`,
        },
        {
          label: "Shorter (Custom Frequency)",
          code: `def isAnagram(s, t):
    return len(s) == len(t) and all(s.count(c) == t.count(c) for c in set(s))`,
        },
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
}`,
        },
        {
          label: "Simple (Char Sorting)",
          code: `import java.util.Arrays;
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        char[] sChars = s.toCharArray();
        char[] tChars = t.toCharArray();
        Arrays.sort(sChars);
        Arrays.sort(tChars);
        return Arrays.equals(sChars, tChars);
    }
}`,
        },
      ],
    },
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
          label: "Efficient",
          code: `def frequencySort(s):
    counts = collections.Counter(s)
    # Sort entries by frequency
    sorted_chars = sorted(counts.items(), key=lambda x: -x[1])
    return "".join(c * cnt for c, cnt in sorted_chars)`
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
          label: "Efficient",
          code: `def substrCount(s, k):
    # Returns count of substrings with at most k distinct
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
          label: "Efficient",
          code: `def longestPalindrome(s):
    start = end = 0
    # Expand around odd & even index centers
    for i in range(len(s)):
        l1, r1 = expand(s, i, i)
        l2, r2 = expand(s, i, i + 1)
        if r1 - l1 > end - start: start, end = l1, r1
        if r2 - l2 > end - start: start, end = l2, r2
    return s[start:end+1]`
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
          label: "Efficient",
          code: `def reverseWords(s):
    # Splits, reverses, joins
    return " ".join(s.split()[::-1])`
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
