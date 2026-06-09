import React from "react";
import Link from "next/link";

interface PatternInfo {
  title: string;
  description: string;
  wayToThink: string;
  javaTip: string;
  pythonTip: string;
  javaCode: string;
  pythonCode: string;
}

const patterns: PatternInfo[] = [
  {
    title: "1. Two Pointers & Fast/Slow Pointers",
    description: "Used to traverse arrays/linked lists linearly, reducing nested comparisons. Ideal for checking cycle detection, palindrome confirmation, or partition configurations.",
    wayToThink: "Mindset: Think of this when the data is sorted, or when you need to search pairs, swap elements from both ends, or detect cycles.\n\nVisual Cue: Two index markers (left/right or slow/fast) moving toward each other, in the same direction, or at different speeds.\n\nCognitive Heuristic: Reduce O(N^2) search space to O(N) by utilizing the sorted property or different rates of traversal.",
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
    wayToThink: "Mindset: Think of this when asked to find a subarray, substring, or subsegment that meets a specific constraint (e.g., maximum sum, longest unique sequence). Look for keywords like 'contiguous subarray', 'longest substring', or 'window of size K'.\n\nVisual Cue: A bounding box enclosing a range of elements that expands to the right to include elements and contracts from the left to satisfy conditions.\n\nCognitive Heuristic: Instead of recalculating the entire subset sum or frequency map, adjust the running state by adding the new element on the right and removing the old element on the left in O(1) time.",
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
  },
  {
    title: "3. Binary Search (Search Space Reduction)",
    description: "Finds items or boundaries in O(log N) time by continuously dividing a monotonic search space. Widely applicable to sorted data, or guessing thresholds where a validation function holds true.",
    wayToThink: "Mindset: Think of this when searching for an element in a sorted collection, or when finding the minimum/maximum possible value of a monotonic function (Binary Search on Answer). Look for keywords like 'sorted', 'rotated sorted', 'find minimum in log time', or optimization constraints like 'minimize the maximum cost'.\n\nVisual Cue: A search range [low, high] that is repeatedly cut in half by evaluating the middle index 'mid'.\n\nCognitive Heuristic: If you can determine that a target cannot lie in one half of the search range, eliminate that half completely. Target O(log N) time.",
    javaTip: "Avoid integer overflow when calculating mid by using low + (high - low) / 2 instead of (low + high) / 2.",
    pythonTip: "Use bisect.bisect_left(arr, x) or bisect.bisect_right(arr, x) to locate insertion points in O(log N) time.",
    javaCode: `// Java Binary Search (Find Target)
public int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    pythonCode: `# Python Binary Search (First Occurrence / Bisect Left)
def binarySearch(arr, target):
    low, high = 0, len(arr) - 1
    ans = -1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] >= target:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans`
  },
  {
    title: "4. Greedy Algorithms & Overlapping Intervals",
    description: "Makes locally optimal choices at each step, aiming for a global optimum. Extremely common when sorting intervals or events by start or end times to resolve overlap conflicts.",
    wayToThink: "Mindset: Think of this when the problem asks for an optimal choice at each step to reach a global optimum, or when dealing with interval scheduling, scheduling tasks, or merging ranges. Look for keywords like 'minimize meetings', 'merge intervals', 'maximum tasks', or 'non-overlapping'.\n\nVisual Cue: A set of horizontal lines representing intervals, sorted by start or end times, processed sequentially.\n\nCognitive Heuristic: Sort the intervals first. Make locally optimal choices (e.g. choose the interval that ends earliest to maximize remaining time) which will lead to a globally optimal solution.",
    javaTip: "Use custom comparator lambda expression (a, b) -> Integer.compare(a[0], b[0]) to sort primitive multi-dimensional arrays efficiently.",
    pythonTip: "Sorting intervals in-place using intervals.sort(key=lambda x: x[0]) avoids creating new list objects, conserving memory.",
    javaCode: `// Java Merge Intervals
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> result = new ArrayList<>();
    int[] currentInterval = intervals[0];
    result.add(currentInterval);
    for (int[] interval : intervals) {
        if (interval[0] <= currentInterval[1]) {
            currentInterval[1] = Math.max(currentInterval[1], interval[1]);
        } else {
            currentInterval = interval;
            result.add(currentInterval);
        }
    }
    return result.toArray(new int[result.size()][]);
}`,
    pythonCode: `# Python Merge Intervals
def mergeIntervals(intervals):
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for current in intervals[1:]:
        prev_start, prev_end = merged[-1]
        curr_start, curr_end = current
        if curr_start <= prev_end:
            merged[-1][1] = max(prev_end, curr_end)
        else:
            merged.append(current)
    return merged`
  },
  {
    title: "5. BFS & DFS (Tree / Graph Traversals)",
    description: "Traverses nodes of trees, graphs, or matrix grids. BFS explores level-by-level (closest nodes first), while DFS explores exhaustively down branch pathways before backtracking.",
    wayToThink: "Mindset: Think of this when traversing, searching, or exploring paths in trees, graphs, grids, or nested structures. BFS is ideal for finding the shortest path in unweighted graphs or level-by-level traversal. DFS is ideal for exhaustively exploring paths, checking connectivity, or finding cycles. Look for keywords like 'shortest path', 'connected components', 'all paths', 'level order', or 'backtracking'.\n\nVisual Cue: A tree structure expanding layer-by-layer horizontally (BFS) or diving deep along a single branch to a leaf node before backtracking (DFS).\n\nCognitive Heuristic: BFS uses a Queue (FIFO) to visit neighbors in radial rings of increasing distance. DFS uses recursion or a Stack (LIFO) to plunge down to a dead end before backtracking. Keep track of visited nodes to avoid infinite cycles in graphs.",
    javaTip: "Use Queue<Integer> q = new ArrayDeque<>() instead of LinkedList in Java for faster operations and less memory overhead.",
    pythonTip: "Use collections.deque for O(1) double-ended queue operations in BFS, and remember to configure recursion limit sys.setrecursionlimit for deep trees/graphs.",
    javaCode: `// Java BFS for Graph (Adjacency List)
import java.util.*;

public List<Integer> bfs(int vertices, List<List<Integer>> adj, int startNode) {
    List<Integer> result = new ArrayList<>();
    boolean[] visited = new boolean[vertices];
    Queue<Integer> queue = new LinkedList<>();
    visited[startNode] = true;
    queue.add(startNode);
    while (!queue.isEmpty()) {
        int curr = queue.poll();
        result.add(curr);
        for (int neighbor : adj.get(curr)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.add(neighbor);
            }
        }
    }
    return result;
}`,
    pythonCode: `# Python DFS for Graph (Recursive)
def dfs(node, adj, visited, path):
    visited.add(node)
    path.append(node)
    for neighbor in adj[node]:
        if neighbor not in visited:
            dfs(neighbor, adj, visited, path)
    return path`
  },
  {
    title: "6. Dynamic Programming (Knapsack & State Transitions)",
    description: "Solves optimization problems by combining solutions to overlapping subproblems. Remembers previous results via bottom-up tabulation or top-down memoization.",
    wayToThink: "Mindset: Think of this when a problem has overlapping subproblems and optimal substructure. If you find yourself solving the exact same subproblem multiple times, or if you need to find min/max values or total number of ways. Look for keywords like 'maximum profit', 'minimum steps', 'number of distinct ways', 'knapsack', or optimization of recursive solutions.\n\nVisual Cue: A 1D or 2D grid/table filling up cell-by-cell, where each cell's value depends on already calculated cells directly above or to the left.\n\nCognitive Heuristic: Express the solution recursively. Then, cache calculations in a memoization table (Top-Down DFS + Memoization) or build the solution up iteratively from base cases (Bottom-Up DP).",
    javaTip: "Optimize DP space from O(N * W) to O(W) using a single 1D array if the state transitions only reference values from the previous row.",
    pythonTip: "Use the @functools.lru_cache(None) decorator to automatically memoize Python functions without managing a custom cache dictionary.",
    javaCode: `// Java 0-1 Knapsack Bottom-Up DP
public int knapsack(int[] val, int[] wt, int W) {
    int n = val.length;
    int[][] dp = new int[n + 1][W + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`,
    pythonCode: `# Python Fibonacci with Memoization (Top-Down)
def fib(n, memo=None):
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]`
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

            {/* Mindset & Way to Think Panel */}
            <div className="bg-neoPurple border-2 border-black p-4 rounded-lg shadow-neo-sm text-black">
              <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded">
                Way to Think
              </span>
              <p className="mt-2 text-sm font-black whitespace-pre-line leading-relaxed">
                {pat.wayToThink}
              </p>
            </div>

            {/* Language Tips Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neoYellow border-2 border-black p-4 rounded-lg shadow-neo-sm">
                <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded">Java Optimizations</span>
                <p className="mt-2 text-xs font-bold text-gray-800">{pat.javaTip}</p>
              </div>
              <div className="bg-neoGreen border-2 border-black p-4 rounded-lg shadow-neo-sm">
                <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded">Python Optimizations</span>
                <p className="mt-2 text-xs font-bold text-gray-800">{pat.pythonTip}</p>
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
