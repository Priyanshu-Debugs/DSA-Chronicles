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
  codeLineMap: Record<string, number>;
}

// Custom String Processing Simulator
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

export const step3StringsRegistry: Record<string, ProblemVisualizerMeta> = {
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
    # Single counter dictionary
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
    # Simple sort comparison
    if len(s) != len(t):
        return False
    return sorted(s) == sorted(t)`,
        },
        {
          label: "Shorter (Custom Frequency)",
          code: `def isAnagram(s, t):
    # Quick inline frequency list check
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
    visualizerType: "stringmap",
    defaultInput: {
      s: "the sky is blue",
      t: ""
    },
    generateSteps: (input) => generateStringProcessingSteps(input.s, "", "palindrome"),
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
        String[] words = s.trim().split("\\s+");
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
  return s.trim().split(/\\s+/).reverse().join(" ");
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
  }
};
