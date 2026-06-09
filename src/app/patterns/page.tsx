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
    wayToThink: "[How to Spot the Pattern]\n- Look for sorted inputs where you need to search pairs, find combinations, or swap elements in-place.\n- Look for Linked List questions that ask to detect cycles, find the middle node, or locate the K-th node from the end.\n- Often constraints demand O(1) auxiliary space and O(N) time complexity.\n\n[Mental Simulation]\n- Imagine two pointer sliders. For boundary reduction (e.g. sorted 2-Sum), they start at opposite ends. For speed tracking (e.g. Floyd's cycle finding), they start together but one steps twice as fast.\n\n[Key Decision Points]\n- Inwards Walk: If the running calculation (e.g., sum) is smaller than target, advance the left pointer (left++) to get a larger value. If the calculation is too large, decrement the right pointer (right--) to search smaller values.\n- Speed Walk: If the fast pointer reaches null, there is no cycle. If the fast pointer overlaps the slow pointer (slow == fast), a cycle is confirmed.\n\n[Common Pitfalls]\n- Watch out for off-by-one errors in while conditions: determine whether left < right or left <= right is appropriate (choose <= if the pointers are allowed to meet at the same index).\n- In Linked Lists, check that fast.next is not null before checking fast.next.next to avoid NullPointerExceptions.",
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
    wayToThink: "[How to Spot the Pattern]\n- The problem involves a contiguous (consecutive) range of elements in an array or string.\n- It asks for the maximum, minimum, or optimal size of a subarray/substring satisfying a particular constraint (e.g., longest substring without repeating characters, subarray sum equal to K).\n\n[Mental Simulation]\n- Imagine a camera view bounding box. It expands its right boundary to capture new data. Once the criteria are violated, it shrinks its left boundary until the view is valid again.\n\n[Key Decision Points]\n- Expand: Increment the right pointer to bring the next element into the window. Update your running state (sum, counts, hash map) with this new element.\n- Contract: Use a while loop to increment the left pointer and remove elements from the state as long as the constraints are violated (e.g., sum is too large, too many distinct elements).\n- Record: Once the state is valid, capture the size of the window (right - left + 1) or update the global optimal value before the next expansion.\n\n[Common Pitfalls]\n- Forgetting to clean up the state of the element being removed at the left index before incrementing left.\n- Off-by-one window calculations: always verify that your length formula is (right - left + 1).",
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
    wayToThink: "[How to Spot the Pattern]\n- The input collection is sorted, or partially sorted (rotated, mountain array).\n- The target complexity constraint is O(log N).\n- The problem is an optimization question asking to find 'the minimum value such that X is achieved' or 'the maximum value where validation succeeds', and the feasibility function is monotonic (e.g., if X is valid, then any value greater than X is also valid).\n\n[Mental Simulation]\n- Divide and conquer in your head. Compute a midpoint index. Check if the element at mid is the target or if mid satisfies the condition. Based on that, throw away half of the options and narrow your window.\n\n[Key Decision Points]\n- Standard Search: If target == arr[mid], return mid. If target > arr[mid], discard the left half by setting low = mid + 1. Otherwise, high = mid - 1.\n- Search Space on Answer: Define a helper method isValid(candidate). If isValid(mid) is true, mid is a candidate solution. Record it and continue searching the left half (high = mid - 1) to find a smaller/better solution. If false, search the right half (low = mid + 1).\n\n[Common Pitfalls]\n- Avoid integer overflow when calculating mid: always write low + (high - low) / 2 instead of (low + high) / 2.\n- Infinite loops: ensure your pointers low and high progress properly at mid transitions (avoid leaving low and high unchanged).",
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
    wayToThink: "[How to Spot the Pattern]\n- The problem involves scheduling events, resources, deadlines, merging ranges, or tasks overlapping on a time scale.\n- Keywords like 'minimum meetings to arrange', 'merge overlapping schedules', 'maximum non-overlapping activities'.\n- A greedy choice can be proven to be part of the optimal solution (no backward updates needed).\n\n[Mental Simulation]\n- Arrange intervals horizontally. Sort them by end time. Always pick the event that ends earliest. This leaves the maximum possible time slot available for subsequent events.\n\n[Key Decision Points]\n- Sort Order: Sort by start time if you need to merge overlapping intervals (so you can combine consecutive rows). Sort by end time if you need to maximize the count of non-overlapping intervals.\n- Overlap Detection: For two sorted intervals (A and B), they overlap if and only if B.start <= A.end. If they overlap, adjust B's endpoints or skip B depending on the goal.\n\n[Common Pitfalls]\n- Sorting incorrectly (e.g. sorting by start time instead of end time when resolving activity selection).\n- Off-by-one comparison on boundaries: make sure to verify whether touching intervals (start == end) count as overlapping according to the problem prompt.",
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
    wayToThink: "[How to Spot the Pattern]\n- The data model is connected, branching, or represents a spatial map (2D matrix grid, node trees, networks).\n- BFS is indicated when finding the shortest path in an unweighted graph, level-by-level relationships, or mapping minimum distance metrics.\n- DFS is indicated when solving puzzles requiring combinations (backtracking), exploring every single route, detecting cycles, or sorting dependencies (topological sort).\n\n[Mental Simulation]\n- BFS: Imagine ripples expanding outwards on water from a single point. You explore all direct neighbors before taking a step to their neighbors.\n- DFS: Imagine navigating a dark maze. You take a path until you hit a wall, write down that you visited it, and step back one intersection to explore the next available fork.\n\n[Key Decision Points]\n- Cycle Prevention: For general graphs and matrix traversals, you MUST maintain a visited lookup set or matrix to prevent infinite loops.\n- Queue vs Recursion: BFS relies on a Queue (First-In-First-Out) where you process elements level-by-level. DFS is natural with recursive function calls (Call Stack) or an explicit Stack.\n- Shortest Path State: In BFS, store the current depth alongside the node inside the queue (or process in batches using a queue size loop) to get the path weight cleanly.\n\n[Common Pitfalls]\n- StackOverflowError in recursive DFS: ensure you have defined robust base cases that trigger backtracking immediately when out-of-bounds or invalid.\n- Forgetting to mark a node as visited when adding it to the queue in BFS, resulting in duplicate processing and time-limit-exceeded (TLE) errors.",
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
    wayToThink: "[How to Spot the Pattern]\n- The problem exhibits optimal substructure (the global optimal solution relies on optimal local subproblems) and overlapping subproblems (you find yourself repeating calculations for the same inputs).\n- Keywords: 'maximum profit', 'minimum moves', 'number of combinations', 'longest common sequence', 'knapsack'.\n\n[Mental Simulation]\n- Think of building a spreadsheet. You initialize baseline values in row 0. Every subsequent cell is populated by checking values directly above it or to the left, taking the max/min of those options plus the current cell's value.\n\n[Key Decision Points]\n- Define the State: Identify the parameters that change at each step (e.g. index i, remaining weight limit w, available coins c).\n- State Transition: Formulate the recurrence formula: e.g. dp[i][w] = Math.max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]]).\n- Memoization vs Tabulation: Top-down memoization is easier to code recursively; bottom-up tabulation avoids stack overflow overhead and can be space-optimized easily.\n\n[Common Pitfalls]\n- Incorrect base-case initialization: ensure index bounds like 0 are handled correctly to prevent index-out-of-bounds or wrong sums.\n- Memory Limit Exceeded: if dp[i] only looks at the immediately preceding row dp[i-1], compress the 2D array into a 1D array to save space.",
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
