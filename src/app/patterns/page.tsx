import React from "react";
import Link from "next/link";

interface PatternInfo {
  title: string;
  description: string;
  javaTip: string;
  pythonTip: string;
  javaCode: string;
  pythonCode: string;
}

const patterns: PatternInfo[] = [
  {
    title: "1. Two Pointers & Fast/Slow Pointers",
    description: "Used to traverse arrays/linked lists linearly, reducing nested comparisons. Ideal for checking cycle detection, palindrome confirmation, or partition configurations.",
    javaTip: "Use basic variable indices (int left = 0, right = arr.length - 1). Avoid using heavy objects inside loops.",
    pythonTip: "Use tuple unpacking to swap values in-place: arr[l], arr[r] = arr[r], arr[l]. Slicing arr[::-1] checks palindromes instantly.",
    javaCode: `// Java Two Sum (Sorted Array)
public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return new int[]{left + 1, right + 1};
        else if (sum < target) left++;
        else right--;
    }
    return new int[]{-1, -1};
}`,
    pythonCode: `# Python In-Place Reverse
def reverseArray(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`
  },
  {
    title: "2. Sliding Window",
    description: "Maintains a subset of array/string elements inside a window boundary. Expands and contracts dynamic indices to calculate subarray metrics efficiently.",
    javaTip: "Use Map.put() return values or map.getOrDefault(key, 0) + 1 for occurrences. Pre-allocate arrays if vocabulary scale is small (e.g. ASCII).",
    pythonTip: "Utilize collections.Counter for sliding comparisons. Take advantage of slicing for constant-time lookups on static constraints.",
    javaCode: `// Java Fixed-size Window: Max subarray sum of size K
public int maxSubArraySum(int[] arr, int k) {
    int maxVal = 0, currentSum = 0;
    for (int i = 0; i < arr.length; i++) {
        currentSum += arr[i];
        if (i >= k - 1) {
            maxVal = Math.max(maxVal, currentSum);
            currentSum -= arr[i - k + 1];
        }
    }
    return maxVal;
}`,
    pythonCode: `# Python Dynamic Window: Longest Substring Without Repeating Chars
def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    max_len = start = 0
    for idx, char in enumerate(s):
        if char in char_map and char_map[char] >= start:
            start = char_map[char] + 1
        char_map[char] = idx
        max_len = max(max_len, idx - start + 1)
    return max_len`
  }
];

export default function PatternsPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* Page Header */}
      <header className="bg-neoBlue border-4 border-black p-6 shadow-neo rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase mb-2">PATTERN EXPLORER & CHEAT SHEETS</h1>
          <p className="font-bold border-t-2 border-black pt-2 max-w-xl text-sm md:text-base">
            Core algorithm architectures with optimization tips and ready-to-use boilerplate.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-block bg-neoYellow border-4 border-black font-black text-sm md:text-base py-3 px-6 rounded-lg shadow-neo neo-clickable uppercase hover:-translate-y-0.5"
          >
            Back to Tracker
          </Link>
        </div>
      </header>

      {/* Patterns Loop */}
      <div className="space-y-6">
        {patterns.map((pat, idx) => (
          <div key={idx} className="bg-white border-4 border-black p-6 shadow-neo rounded-xl space-y-4">
            <h2 className="text-2xl font-black uppercase text-black">{pat.title}</h2>
            <p className="font-bold text-gray-700 text-sm md:text-base">{pat.description}</p>

            {/* Language Tips Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neoYellow border-2 border-black p-4 rounded-lg shadow-neo-sm">
                <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded">Java Optimizations</span>
                <p className="mt-2 text-xs font-bold text-gray-850">{pat.javaTip}</p>
              </div>
              <div className="bg-neoGreen border-2 border-black p-4 rounded-lg shadow-neo-sm">
                <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded">Python Optimizations</span>
                <p className="mt-2 text-xs font-bold text-gray-850">{pat.pythonTip}</p>
              </div>
            </div>

            {/* Code Snippets Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* Java code wrapper */}
              <div className="border-2 border-black rounded-lg overflow-hidden shadow-neo-sm bg-gray-900">
                <div className="bg-gray-800 text-white font-mono px-4 py-1.5 text-xs font-bold border-b-2 border-black flex justify-between">
                  <span>Java Boilerplate</span>
                  <span className="text-neoYellow font-black uppercase">java</span>
                </div>
                <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto">
                  <code>{pat.javaCode}</code>
                </pre>
              </div>

              {/* Python code wrapper */}
              <div className="border-2 border-black rounded-lg overflow-hidden shadow-neo-sm bg-gray-900">
                <div className="bg-gray-800 text-white font-mono px-4 py-1.5 text-xs font-bold border-b-2 border-black flex justify-between">
                  <span>Python Boilerplate</span>
                  <span className="text-neoBlue font-black uppercase">python</span>
                </div>
                <pre className="p-4 text-xs font-mono text-blue-300 overflow-x-auto">
                  <code>{pat.pythonCode}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
