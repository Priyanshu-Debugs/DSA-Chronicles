"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Pattern {
  id: number;
  name: string;
  cat: string;
  icon: string;
  kw: string[];
  r: string[];
  t: string[];
  d: string[];
  p: string[];
  cl: string[];
  tc: string;
}

const ACC: Record<string, string> = {
  Arrays: "#378ADD",
  Strings: "#D4A317",
  Search: "#1D9E75",
  "Linked List": "#5DCAA5",
  "Stack/Queue": "#D85A30",
  Hashing: "#BA7517",
  Recursion: "#993C1D",
  Trees: "#639922",
  Heap: "#D4537E",
  Greedy: "#EF9F27",
  Graphs: "#7F77DD",
  "Advanced Math": "#0F6E56",
  DP: "#534AB7"
};

const CATS = ["All", "Arrays", "Strings", "Search", "Linked List", "Stack/Queue", "Hashing", "Recursion", "Trees", "Heap", "Greedy", "Graphs", "Advanced Math", "DP"];

const PATTERNS: Pattern[] = [
  {
    id: 1, name: "Two Pointers", cat: "Arrays", icon: "ti-arrows-left-right",
    kw: ["sorted array", "pair sum", "palindrome", "in-place", "merge sorted"],
    r: ["Sorted array — find pair/triplet summing to target", "Remove/move elements in-place without extra space", "Palindrome check or reversal problems", "Merge two sorted arrays", "When brute force is O(n²) and array is sorted"],
    t: ["Converging (left=0, right=n-1): use for sorted, approach from both ends", "Same-direction (fast/slow): cycle detection, find middle of linked list", "What moves left? What moves right? Define invariant before coding", "For 3Sum: fix outer element, two-pointer the inner subarray", "Skip duplicates: while arr[left]==arr[left+1]: left++ after match"],
    d: ["Sort if not sorted (check if allowed)", "left = 0, right = len(arr) - 1", "while left < right: evaluate current pair", "If sum < target → left++; if sum > target → right--", "Collect/return result when condition is met"],
    p: ["arr.sort() — in-place O(n log n)", "sorted(arr) — returns new sorted list", "arr[::-1] — reverse via slice", "enumerate(arr) — index + value together", "zip(arr, arr[1:]) — clean adjacent pairs"],
    cl: ["Two Sum II", "3Sum", "Container With Most Water", "Valid Palindrome", "Trapping Rain Water"],
    tc: "O(n log n) sort + O(n) scan  |  O(1) space"
  },
  {
    id: 2, name: "Sliding Window", cat: "Arrays", icon: "ti-border-sides",
    kw: ["subarray", "substring", "k elements", "longest", "minimum window", "contiguous"],
    r: ["Subarray/substring with some property (max sum, unique chars, etc.)", "'Longest/shortest subarray where condition holds'", "Fixed window of size k — max/min sum or average", "At most k distinct, exactly k elements, minimum window substring", "Any O(n²) brute force iterating over subarrays is a signal"],
    t: ["Fixed window: slide right, drop left element (window stays size k)", "Variable window: expand right freely, shrink from left on violation", "What does the window TRACK? (sum, freq dict, count of valid chars)", "What is the VIOLATION that forces left pointer to advance?", "Exactly k trick: solve 'at most k' − 'at most k−1'"],
    d: ["left = 0, result = 0 (or float('-inf') for max)", "for right in range(len(arr)): add arr[right] to window state", "while violation: remove arr[left] from state; left++", "result = max(result, right − left + 1) after shrinking", "For fixed k: drop arr[right − k] when right >= k"],
    p: ["collections.defaultdict(int) — frequency map for window", "collections.Counter() — character frequency in one line", "collections.deque — monotonic window for max/min", "dict.get(key, 0) — safe frequency lookup", "right − left + 1 — current window size formula"],
    cl: ["Max Sum Subarray K", "Longest Substring No Repeat", "Minimum Window Substring", "Fruit Into Baskets"],
    tc: "O(n) single pass  |  O(k) space"
  },
  {
    id: 3, name: "Prefix Sum", cat: "Arrays", icon: "ti-math",
    kw: ["subarray sum", "range sum query", "cumulative sum", "sum equals k", "count subarrays"],
    r: ["Range sum query: sum from index i to j efficiently", "'Subarray sum equals k' — classic prefix + hashmap", "Count subarrays with property (sum, divisible by k)", "2D rectangle sum queries", "Repeated sum queries over ranges → O(1) per query after O(n) build"],
    t: ["prefix[i] = sum of arr[0] through arr[i−1] (1-indexed = cleaner)", "Range [l, r] = prefix[r+1] − prefix[l]", "Subarray sum = k: look for complement = curr_prefix − k in map", "CRITICAL: init seen = '{0: 1}' to handle subarrays starting from index 0", "2D: prefix[i][j] = rows + cols − diagonal + cell"],
    d: ["prefix = [0]*(n+1)", "for i in range(n): prefix[i+1] = prefix[i] + arr[i]", "Range sum: prefix[r+1] − prefix[l]", "Subarray=k: seen='{0:1}'; curr=0; ans=0", "  for x in arr: curr+=x; ans+=seen.get(curr−k,0); seen[curr]+=1"],
    p: ["itertools.accumulate(arr) — prefix sums as iterator", "list(accumulate(arr, initial=0)) — includes leading 0", "collections.defaultdict(int) — prefix + count map", "dict.get(key, 0) — safe complement lookup"],
    cl: ["Subarray Sum = K", "Range Sum Query", "Continuous Subarray Sum", "Product Except Self"],
    tc: "O(n) build  |  O(1) per query  |  O(n) space"
  },
  {
    id: 4, name: "Intervals", cat: "Arrays", icon: "ti-ruler",
    kw: ["merge intervals", "insert interval", "meeting rooms", "overlap", "non-overlapping schedule"],
    r: ["Merge a list of possibly-overlapping intervals", "Insert new interval into sorted list and merge if needed", "Minimum rooms/tracks needed (max overlapping at any moment)", "Remove minimum intervals to make all non-overlapping", "Any range or timeline scheduling problem"],
    t: ["Sort by START time as almost always the first step", "Two intervals [a,b] [c,d] overlap iff c <= b", "Merge: new_end = max(prev_end, curr_end)", "Meeting rooms: sort starts and ends separately; two-pointer", "Min removal: sort by end, greedy keep non-conflicting (like interval scheduling)"],
    d: ["intervals.sort(key=lambda x: x[0])  # sort by start", "merged = [intervals[0]]", "for start, end in intervals[1:]:", "  if start <= merged[−1][1]:  # overlap", "    merged[−1][1] = max(merged[−1][1], end)", "  else: merged.append([start, end])"],
    p: ["sorted(intervals, key=lambda x: x[0]) — sort by start", "max(curr_end, prev_end) — extend end", "heapq — meeting rooms (track earliest-ending meeting)", "bisect — insert interval insertion point"],
    cl: ["Merge Intervals", "Insert Interval", "Meeting Rooms II", "Non-overlapping Intervals"],
    tc: "O(n log n) sort + O(n) merge  |  O(n) space"
  },
  {
    id: 5, name: "Trie", cat: "Strings", icon: "ti-sitemap",
    kw: ["autocomplete", "prefix search", "starts with", "word break", "multiple string prefix"],
    r: ["Autocomplete, prefix matching, starts-with queries", "Search words in a dictionary structure efficiently", "Count/find words with a given prefix", "Word break problem using dictionary lookups", "Multiple string prefix problems (more efficient than per-word scan)"],
    t: ["Each node: children dict + is_end boolean flag", "Insert: walk/create nodes char by char; mark is_end=True at last char", "Search: walk nodes char by char; return is_end at final char", "Prefix check: same as search but return True at end (no is_end check)", "Dict for children (sparse) vs array[26] for only lowercase letters"],
    d: ["class TrieNode: self.children={}; self.is_end=False", "Insert: node=root; for c in word: node=node.children.setdefault(c,TrieNode())", "  node.is_end = True", "Search: node=root; for c in word: if c not in node.children: return False", "  return node.is_end"],
    p: ["collections.defaultdict — children map", "dict.setdefault(key, TrieNode()) — create child if absent", "c in node.children — O(1) check", "trie = lambda: defaultdict(trie) — compact nested trie"],
    cl: ["Implement Trie", "Word Search II", "Add and Search Words", "Replace Words"],
    tc: "Insert/Search: O(L) word length  |  O(N·L) space"
  },
  {
    id: 6, name: "Binary Search", cat: "Search", icon: "ti-zoom-in",
    kw: ["sorted", "rotated array", "find target", "minimum feasible", "first/last occurrence"],
    r: ["Sorted array — find element, boundary, or insertion point", "Search space is monotonic: predicate is F...F T...T exactly once", "'Minimum/maximum value such that condition holds' — search on answer", "Rotated sorted array, find peak, search in matrix", "Answer space is large but each candidate is checkable in O(n) or less"],
    t: ["Is the search space the array, or the answer range (1 to 10^9)?", "Define clearly: what is TRUE and FALSE in your predicate?", "lo <= hi for exact match; lo < hi when finding a boundary", "Save mid as answer candidate, then keep narrowing to confirm", "mid = lo + (hi − lo) // 2 avoids integer overflow"],
    d: ["lo = 0 (or min answer), hi = len-1 (or max answer)", "while lo <= hi: mid = lo + (hi − lo) // 2", "if arr[mid] == target: return mid", "if arr[mid] < target: lo = mid + 1  else: hi = mid − 1", "For boundary: result = mid; then narrow (hi=mid-1 or lo=mid+1)"],
    p: ["bisect.bisect_left(arr, x) — leftmost insertion index", "bisect.bisect_right(arr, x) — rightmost insertion index", "bisect.insort(arr, x) — insert maintaining sort order", "lo + (hi − lo) // 2 — overflow-safe midpoint", "math.ceil() / math.floor() — for answer-space binary search"],
    cl: ["Binary Search", "Search Rotated Array", "Koko Eating Bananas", "Median Two Sorted Arrays", "Find Peak Element"],
    tc: "O(log n)  |  O(1) space"
  },
  {
    id: 7, name: "Linked List", cat: "Linked List", icon: "ti-link",
    kw: ["detect cycle", "reverse list", "middle node", "merge sorted", "nth from end"],
    r: ["Detect cycle in linked list (Floyd's)", "Find start of a cycle", "Reverse a linked list fully or partially", "Merge two sorted linked lists", "Find Nth node from the end"],
    t: ["Fast (2x) + slow (1x): when fast reaches end, slow is at middle", "Cycle: fast laps slow inside cycle — they meet", "Cycle start: after meet, reset one to head, both advance 1x → meet at entry", "Dummy node: when head itself might be deleted or inserted before", "Reversal order: save next FIRST, point backward, then advance"],
    d: ["Dummy: dummy = ListNode(0); dummy.next = head", "Reversal: prev=None, curr=head", "  next_node=curr.next; curr.next=prev; prev=curr; curr=next_node", "Fast/slow: slow=fast=head", "  while fast and fast.next: slow=slow.next; fast=fast.next.next"],
    p: ["while curr and curr.next — guard before .next.next", "dummy = ListNode(0); dummy.next = head — safe head manipulation", "for _ in range(k): fast=fast.next — advance k steps", "slow, fast = head, head — start both at same node"],
    cl: ["Reverse Linked List", "Detect Cycle", "Merge Two Sorted Lists", "Remove Nth From End", "LRU Cache"],
    tc: "O(n)  |  O(1) pointer manipulation"
  },
  {
    id: 8, name: "Fast & Slow Pointers", cat: "Linked List", icon: "ti-run",
    kw: ["detect cycle", "cycle start", "happy number", "middle of list", "find duplicate"],
    r: ["Detect cycle in a linked list", "Find the START of a cycle (not just detect it)", "Find middle of linked list in single pass", "Happy number (cycle in implicit number sequence)", "Find duplicate in array without extra space (Floyd's in array)"],
    t: ["Fast moves 2 steps; slow moves 1 step per iteration", "If cycle exists: fast WILL lap slow — they meet inside cycle", "If no cycle: fast reaches null first", "Cycle start: after meeting, reset one to head, advance both at 1x", "They will meet exactly at the cycle entry point"],
    d: ["slow = fast = head", "while fast and fast.next: slow=slow.next; fast=fast.next.next", "if not (fast and fast.next): return None  # no cycle", "# Find cycle start:", "slow = head", "while slow != fast: slow=slow.next; fast=fast.next", "return slow  # cycle entry node"],
    p: ["slow = fast = head — both start at same node", "fast.next.next — check fast.next exists FIRST", "while fast and fast.next — safe termination condition", "slow == fast — object identity (not value comparison)"],
    cl: ["Linked List Cycle", "Cycle II", "Find Duplicate", "Happy Number", "Middle of List"],
    tc: "O(n)  |  O(1) space"
  },
  {
    id: 9, name: "Stack", cat: "Stack/Queue", icon: "ti-layers-intersect",
    kw: ["valid parentheses", "next greater", "expression eval", "undo history", "nested structure"],
    r: ["Matching/balancing: brackets, tags, nested delimiters", "Next Greater or Next Smaller Element for each index", "Expression evaluation or nested structure parsing", "'Most recent' or 'last-seen' element needed at any point", "Converting a recursive DFS to an iterative one"],
    t: ["LIFO: last pushed is first processed — great for 'most recent'", "Push on encounter; pop when you can resolve/match", "For matching: push open brackets; pop on close; verify match", "Indices or values? Store indices — needed for distance and range", "What is on the stack at any point? Define that invariant clearly"],
    d: ["stack = []", "Push: stack.append(element)", "Pop: stack.pop() — removes and returns top", "Peek: stack[-1] — look without removing", "Empty: not stack"],
    p: ["list.append() / list.pop() — O(1) push/pop on right end", "stack[-1] — O(1) peek", "not stack — clean empty check", "collections.deque — O(1) both ends (usually list is fine)"],
    cl: ["Valid Parentheses", "Daily Temperatures", "Min Stack", "Largest Rectangle Histogram", "Decode String"],
    tc: "O(n) — each element pushed/popped once  |  O(n) space"
  },
  {
    id: 10, name: "Monotonic Stack", cat: "Stack/Queue", icon: "ti-trending-up",
    kw: ["next greater", "next smaller", "previous greater", "largest rectangle", "trapping rain water"],
    r: ["Next Greater / Next Smaller Element for each index", "Previous Greater / Previous Smaller (scan right to left)", "Largest Rectangle in Histogram (width from popped span)", "Trapping Rain Water (bounded by height on both sides)", "Any problem needing nearest larger/smaller element"],
    t: ["Increasing stack: pop when current is SMALLER (finds next smaller for popped)", "Decreasing stack: pop when current is LARGER (finds next greater for popped)", "ALWAYS store indices — values alone lose position for distance/width", "When you pop: that popped element's answer = current index", "Elements left in stack after loop: no answer → assign n or −1"],
    d: ["stack = []  # stores indices", "for i, val in enumerate(arr):", "  while stack and arr[stack[-1]] < val:  # adjust condition per problem", "    idx = stack.pop(); result[idx] = i", "  stack.append(i)", "for idx in stack: result[idx] = n  # no right answer found"],
    p: ["enumerate(arr) — must iterate with index", "stack[-1] — peek top index", "arr[stack[-1]] — get value at top index", "stack.pop() — pop when monotonicity violated"],
    cl: ["Next Greater Element", "Daily Temperatures", "Largest Rectangle", "Trapping Rain Water", "Stock Span"],
    tc: "O(n) — each element pushed/popped once  |  O(n) space"
  },
  {
    id: 11, name: "BFS / Queue", cat: "Stack/Queue", icon: "ti-wave-sine",
    kw: ["shortest path", "minimum steps", "level order", "unweighted graph", "word ladder", "multi-source"],
    r: ["Shortest path in an UNWEIGHTED graph or grid", "Level-order traversal of a tree", "'Minimum number of steps/moves/ops to reach state'", "Multi-source BFS: multiple start nodes expand simultaneously", "Explore in waves — all nodes at distance d before d+1"],
    t: ["BFS = explore all nodes at distance d before any at d+1", "State = what makes a unique configuration? (cell, word, tuple)", "Mark visited WHEN ENQUEUING not when dequeuing — prevents duplicates", "Level counting: for _ in range(len(q)) processes one full level", "Weighted graph? BFS fails — use Dijkstra (heap) instead"],
    d: ["from collections import deque", "q = deque([(start, 0)]); visited = '{start}'", "while q: state, dist = q.popleft()", "  if state == target: return dist", "  for nxt in neighbors(state):", "    if nxt not in visited: visited.add(nxt); q.append((nxt, dist+1))"],
    p: ["collections.deque — O(1) popleft() vs list's O(n)", "deque.append() — enqueue right", "deque.popleft() — dequeue left", "set() for visited — O(1) membership", "for _ in range(len(q)) — process exactly one level"],
    cl: ["Tree Level Order", "Word Ladder", "Rotting Oranges", "Shortest Path Grid", "01 Matrix"],
    tc: "O(V + E)  |  O(V) visited space"
  },
  {
    id: 12, name: "Hash Map / Set", cat: "Hashing", icon: "ti-table",
    kw: ["two sum", "frequency count", "group anagrams", "complement", "seen before", "O(1) lookup"],
    r: ["'Have we seen this before?' — set for O(1) membership", "'How many times does X appear?' — Counter / freq dict", "Two Sum: find complement = target − current", "Group elements by a key (anagrams, same sum, same remainder)", "Prefix sum + complement: store prefix sums in map, look up target"],
    t: ["What am I mapping? value→index, value→count, prefix→index?", "For Two Sum: store complement → index (not value → index)", "Prefix sum: initialize seen = '{0: 1}' for subarrays starting at index 0", "Just need membership? Set is faster and cleaner than dict", "Tuple key: tuple(sorted(word)) groups anagrams by their sorted form"],
    d: ["d = {}", "For Two Sum: if target−x in d: found; d[x] = i", "For frequency: d[x] = d.get(x, 0) + 1", "For prefix sum: if (curr − k) in seen: count += seen[curr−k]", "seen[curr] = seen.get(curr, 0) + 1"],
    p: ["collections.defaultdict(int/list/set) — no KeyError", "collections.Counter(arr) — instant frequency map", "Counter.most_common(k) — top-k elements in O(n log k)", "dict.get(key, default) — safe access with fallback", "tuple(sorted(word)) — hashable anagram key"],
    cl: ["Two Sum", "Group Anagrams", "Subarray Sum = K", "Longest Consecutive", "Top K Frequent"],
    tc: "O(n)  |  O(n) space"
  },
  {
    id: 13, name: "Backtracking", cat: "Recursion", icon: "ti-corner-left-up",
    kw: ["all combinations", "all permutations", "all subsets", "find all solutions", "N-queens", "word search"],
    r: ["Generate all combinations, permutations, or subsets", "Find ALL possible solutions to a constraint problem", "N-Queens, Sudoku, word search in 2D grid", "Any exponential-space problem requiring all paths", "'Enumerate all valid arrangements'"],
    t: ["Template: choose → explore → un-choose (the backtrack)", "Base case: result complete → append a COPY to answers", "Pruning: skip invalid choices early to cut dead branches", "Combinations: pass start index to prevent reuse (i = start)", "Duplicates: sort first; skip arr[i]==arr[i−1] at same depth level"],
    d: ["def backtrack(start, path, result):", "  if base_case: result.append(path[:])  # must copy!", "  for i in range(start, len(nums)):", "    if prune_condition: continue", "    path.append(nums[i])         # choose", "    backtrack(i+1, path, result) # explore", "    path.pop()                   # unchoose"],
    p: ["result.append(path[:]) — copy the path, never the reference", "path.append() + path.pop() — the choose/unchoose pair", "set() for used positions in permutation problems", "sorted(nums) — sort first to enable duplicate skipping", "itertools.combinations/permutations — verify your results"],
    cl: ["Subsets", "Permutations", "Combination Sum", "N-Queens", "Word Search"],
    tc: "O(2^n) subsets  |  O(n!) permutations"
  },
  {
    id: 14, name: "Tree DFS", cat: "Trees", icon: "ti-binary-tree",
    kw: ["tree depth", "path sum", "inorder BST", "diameter", "LCA", "validate BST", "serialize"],
    r: ["Any tree traversal: inorder, preorder, postorder", "Path sum, max path, diameter calculations", "Validate BST, find LCA (Lowest Common Ancestor)", "Serialize and deserialize tree structures", "Problems requiring all paths to be explored"],
    t: ["Preorder (root first): when parent info is needed before children", "Inorder (left→root→right): BST gives sorted order — key for BST problems", "Postorder (children first): when child results are needed to compute parent", "What am I RETURNING up? (height, bool, min/max, count)", "What am I PASSING DOWN? (running sum, target, bounds for BST)"],
    d: ["Base case: if not node: return appropriate default", "left_res = dfs(node.left); right_res = dfs(node.right)", "Combine: max(left,right)+1 for height; left and right for valid", "For cross-root paths: use nonlocal result to track global max", "Return combined result upward to parent"],
    p: ["if not node: return — clean base case", "dfs(node.left), dfs(node.right) — recurse both", "max(left, right) + 1 — height pattern", "nonlocal result — modify outer var in nested function", "sys.setrecursionlimit(10000) — for deep trees"],
    cl: ["Max Depth", "Path Sum", "Lowest Common Ancestor", "Serialize/Deserialize", "Diameter"],
    tc: "O(n)  |  O(h) stack where h = height"
  },
  {
    id: 15, name: "Heap / Priority Queue", cat: "Heap", icon: "ti-chevrons-up",
    kw: ["k largest", "k smallest", "kth element", "merge k sorted", "scheduling", "running median"],
    r: ["K largest or K smallest elements from array or stream", "Kth largest/smallest — static or dynamic stream", "Merge K sorted lists/arrays efficiently", "Task scheduling with priorities or deadlines", "Dijkstra's weighted shortest path"],
    t: ["Python heapq = MIN-HEAP — smallest pops first", "Max-heap: negate values on push, negate again on pop", "K largest: min-heap of size K; pop when exceeds K (evicts smallest)", "K smallest: max-heap of size K; pop when exceeds K (evicts largest)", "Tuples: (priority, tiebreaker, item) for complex ordering"],
    d: ["import heapq; heap = []", "heapq.heappush(heap, val)", "heapq.heappop(heap) — pops minimum", "heap[0] — peek min in O(1)", "K largest: push all; if len > k: heappop (kicks out smallest)", "Max-heap: heappush(heap, −val); result = −heappop(heap)"],
    p: ["heapq.heappush(h, x) — O(log n) push", "heapq.heappop(h) — O(log n) pop min", "heapq.heapify(arr) — O(n) build in-place", "heapq.nlargest(k, arr) / nsmallest(k, arr) — O(n log k)", "heap[0] — O(1) peek min", "(−val, ...) tuple — max-heap trick"],
    cl: ["Kth Largest", "Top K Frequent", "Merge K Sorted Lists", "Find Median Stream", "Task Scheduler"],
    tc: "Push/Pop: O(log n)  |  Build: O(n)"
  },
  {
    id: 16, name: "Greedy", cat: "Greedy", icon: "ti-coin",
    kw: ["minimum count", "maximum coverage", "interval scheduling", "jump game", "gas station", "activity selection"],
    r: ["Interval scheduling: maximum non-overlapping activities", "Jump Game — can you reach the end? minimum jumps?", "Minimum things to cover all requirements", "Tasks with deadlines — maximize completed tasks", "Local optimum consistently leads to global optimum"],
    t: ["Greedy works when local best never blocks a better global solution", "Greedy fails when early choices foreclose better future options → use DP", "Key: what property to sort by? (end time, deadline, ratio)", "For interval scheduling: ALWAYS sort by END time", "For Jump Game: track max_reach at each index"],
    d: ["Identify the greedy criterion (what to optimize locally)", "Sort by relevant key: sorted(intervals, key=lambda x: x[1])", "Iterate, apply greedy choice, track current state", "last_end, max_reach, rooms = 0, 0, 0 (state tracking)", "Mental check: does any other choice give a better result?"],
    p: ["sorted(items, key=lambda x: x[1]) — sort by end time", "sorted(arr, key=lambda x: (−x[0], x[1])) — multi-key sort", "max(reach, i + arr[i]) — jump game reach update", "heapq — dynamic greedy (Dijkstra, Prim, task scheduling)"],
    cl: ["Jump Game", "Meeting Rooms II", "Task Scheduler", "Gas Station", "Candy"],
    tc: "O(n log n) sort  |  O(1) to O(n) space"
  },
  {
    id: 17, name: "Graph Traversal", cat: "Graphs", icon: "ti-topology-star",
    kw: ["number of islands", "connected components", "cycle detection", "topological sort", "prerequisites"],
    r: ["Count connected components (islands, provinces, regions)", "Cycle detection in directed or undirected graphs", "Topological sort — dependencies, build order, course prereqs", "Any 2D grid where cells are nodes connected by adjacency", "Clone graph or deep copy structures with references"],
    t: ["Build adjacency list first: graph = defaultdict(list)", "Visited set is non-negotiable — always maintain it", "Undirected: simple visited set handles cycle detection", "Directed: need 3 states (0=unvisited, 1=in-progress, 2=done)", "Topo sort (DFS): add to result AFTER visiting all children (postorder)"],
    d: ["graph = defaultdict(list)", "for u,v in edges: graph[u].append(v)", "visited = set()", "def dfs(node): visited.add(node); for nb in graph[node]: dfs(nb)", "Grid BFS/DFS: dirs = [(0,1),(0,−1),(1,0),(−1,0)]"],
    p: ["collections.defaultdict(list) — adjacency list", "set() for visited — O(1) check+add", "[(0,1),(0,−1),(1,0),(−1,0)] — 4-dir movement", "collections.deque — BFS queue", "enumerate(grid) — iterate grid with coordinates"],
    cl: ["Number of Islands", "Course Schedule", "Clone Graph", "Pacific Atlantic", "Word Ladder"],
    tc: "O(V + E)  |  O(V) space"
  },
  {
    id: 18, name: "Union Find", cat: "Advanced Math", icon: "ti-circles-relation",
    kw: ["connected components", "cycle detection undirected", "kruskal MST", "same group", "disjoint sets"],
    r: ["Dynamic connectivity: are X and Y in the same component?", "Detect cycle in UNDIRECTED graph", "Number of connected components (dynamic — edges added over time)", "Kruskal's Minimum Spanning Tree", "Merge/group nodes that share a property"],
    t: ["parent[i] = i initially — every node is its own root", "find(x): follow parents to root; apply path compression during traversal", "union(x, y): find both roots; attach smaller rank tree to larger", "Same component iff find(x) == find(y)", "Track count: start at n, subtract 1 per successful union"],
    d: ["parent=list(range(n)); rank=[0]*n; count=n", "def find(x):", "  if parent[x]!=x: parent[x]=find(parent[x])  # path compression", "  return parent[x]", "def union(x,y): px,py=find(x),find(y); if px==py: return False", "  if rank[px]<rank[py]: px,py=py,px", "  parent[py]=px; if rank[px]==rank[py]: rank[px]+=1; count−=1; return True"],
    p: ["list(range(n)) — parent array init", "Recursive find with path compression", "Union by rank — keeps tree flat", "count -= 1 on successful union — track components"],
    cl: ["Number of Provinces", "Redundant Connection", "Accounts Merge", "MST Kruskal"],
    tc: "Near O(1) amortized per op  |  O(n) space"
  },
  {
    id: 19, name: "Bit Manipulation", cat: "Advanced Math", icon: "ti-binary",
    kw: ["XOR single number", "count set bits", "power of 2", "bitmask subset", "flip bits"],
    r: ["Single number (one appears odd times) — XOR all elements", "Count set bits (Hamming weight / popcount)", "Check if a number is a power of 2", "Generate all subsets using bitmask (0 to 2^n − 1)", "Space-optimized DP with bitmask state"],
    t: ["XOR: a^a=0, a^0=a — commutative and associative", "n & (n−1): clears lowest set bit — count bits in O(set bits)", "n & (−n): isolates lowest set bit", "n & 1: checks if odd (tests last bit)", "Power of 2: n > 0 and (n & (n−1)) == 0"],
    d: ["Single number: result=0; for x in arr: result^=x", "Count bits: while n: count+=n&1; n>>=1", "  OR: bin(n).count('1')  OR  n.bit_count() (3.10+)", "Subsets: for mask in range(1<<n):", "  for i in range(n): if mask&(1<<i): include arr[i]"],
    p: ["bin(n) — binary string ('0b1010')", "n.bit_count() — count set bits (Python 3.10+)", "bin(n).count('1') — count set bits (older)", "n & (n−1) — clear lowest set bit", "1 << k — compute 2^k", "n ^ m — XOR two numbers", "int.bit_length() — bits needed to represent n"],
    cl: ["Single Number", "Number of 1 Bits", "Counting Bits", "Missing Number", "Sum Two Integers"],
    tc: "O(1) per op  |  O(1) space"
  },
  {
    id: 20, name: "Dynamic Programming", cat: "DP", icon: "ti-puzzle",
    kw: ["max/min result", "count ways", "number of paths", "optimal", "overlapping subproblems", "knapsack"],
    r: ["Optimization (max/min) with overlapping subproblems", "Count the number of ways to reach/achieve something", "Is it possible? (yes/no DP returning bool)", "Sequence: LCS, LIS, edit distance, palindromes", "Partition/selection: knapsack, subset sum, coin change"],
    t: ["STEP 1: Define dp[i] — what does this state MEAN? Write it out.", "STEP 2: Base case — what is dp[0]? dp[1]? dp[0][0]?", "STEP 3: Transition — how does dp[i] depend on dp[i−1], dp[i−2]?", "STEP 4: Answer — dp[n]? max(dp)? dp[m][n]?", "Top-down = recursion + @cache  |  Bottom-up = table + loops"],
    d: ["Draw the recurrence on paper BEFORE coding", "1D: dp = [0]*(n+1) or [float('inf')]*(n+1); set base cases", "2D: dp = [[0]*(n+1) for _ in range(m+1)]", "Fill with transition formula; return dp[n] or max(dp)", "Space optimize: if dp[i] uses only dp[i−1] → use two variables"],
    p: ["@functools.lru_cache(None) — memoize recursion, unbounded", "@functools.cache — Python 3.9+ shorthand", "float('inf') / float('−inf') — init for min/max DP", "[[0]*cols for _ in range(rows)] — 2D table (not [[0]*cols]*rows!)", "itertools.accumulate() — prefix sums"],
    cl: ["Climbing Stairs", "House Robber", "Coin Change", "LCS", "Edit Distance", "0/1 Knapsack"],
    tc: "Usually O(n²) or O(n·m)  |  O(n) with space opt"
  }
];

const SIGNALS = [
  ["sorted array", "Two Pointers, Binary Search, Sliding Window"],
  ["subarray sum / substring", "Sliding Window, Prefix Sum + Hash Map"],
  ["find pair/complement", "Hash Map, Two Pointers (if sorted)"],
  ["kth largest/smallest", "Heap (size-k), Binary Search on answer"],
  ["shortest path (unweighted)", "BFS"],
  ["shortest path (weighted)", "Dijkstra = BFS + Heap"],
  ["all combinations / all paths", "Backtracking"],
  ["count/maximize ways", "DP (check for overlapping subproblems)"],
  ["next greater/smaller", "Monotonic Stack"],
  ["connected components", "Union Find or Graph DFS/BFS"],
  ["interval overlap", "Sort + Greedy or Heap"],
  ["prefix match / starts-with", "Trie"],
  ["detect cycle in graph", "DFS (3-state), Union Find"],
  ["level-order / minimum steps", "BFS with deque"],
  ["in-place operations", "Two Pointers or Cyclic Sort"],
  ["matching brackets", "Stack"]
];

const DPTYPES = [
  ["1D Linear", "dp[i] from dp[i−1] or dp[i−2]", "Climb Stairs, House Robber, Fibonacci"],
  ["2D Grid", "dp[i][j] from dp[i−1][j] and dp[i][j−1]", "Unique Paths, Min Path Sum"],
  ["0/1 Knapsack", "dp[i][w] = take or skip item i", "Subset Sum, Partition Equal"],
  ["Unbounded Knapsack", "dp[w] = try all items repeatedly", "Coin Change, Word Break"],
  ["String (LCS style)", "dp[i][j] on two string pointers", "LCS, Edit Distance, Regex"],
  ["Interval DP", "dp[l][r] from inner subproblems", "Burst Balloons, Matrix Chain"],
  ["Bitmask DP", "dp[mask] = state as bitmask", "Travelling Salesman, Min Cost Assign"],
  ["State Machine", "dp[state] per element", "Buy/Sell Stock variations"]
];

export default function PatternsPage() {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const [fwOpen, setFwOpen] = useState(true);

  const filterQuery = q.toLowerCase().trim();

  const shown = PATTERNS.filter(p => {
    const catOk = activeCat === "All" || p.cat === activeCat;
    if (!filterQuery) return catOk;
    return catOk && (
      p.name.toLowerCase().includes(filterQuery) ||
      p.kw.some(k => k.toLowerCase().includes(filterQuery)) ||
      p.cat.toLowerCase().includes(filterQuery)
    );
  });

  const toggleCard = (id: number) => {
    const next = new Set(openSet);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setOpenSet(next);
  };

  const expandAll = () => {
    const next = new Set<number>();
    shown.forEach(p => next.add(p.id));
    setOpenSet(next);
  };

  const collapseAll = () => {
    setOpenSet(new Set());
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Box */}
      <header className="bg-white border-4 border-black p-5 shadow-neo rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2">
              <i className="ti ti-terminal-2 text-neoYellow" />
              <span>DSA Patterns Cheatsheet</span>
            </h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
              Found {shown.length} / {PATTERNS.length} architectural patterns
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={expandAll}
              className="text-xs font-black uppercase border-2 border-black py-1.5 px-3 rounded bg-white hover:bg-stone-50 shadow-neo-sm neo-clickable cursor-pointer text-black"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs font-black uppercase border-2 border-black py-1.5 px-3 rounded bg-white hover:bg-stone-50 shadow-neo-sm neo-clickable cursor-pointer text-black"
            >
              Collapse All
            </button>
            <Link
              href="/dashboard"
              className="text-xs font-black uppercase border-2 border-black py-1.5 px-4 rounded bg-neoYellow shadow-neo-sm hover:translate-y-0.5 transition-all neo-clickable text-black"
            >
              Back to Tracker
            </Link>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search patterns, keywords, or core problem domains..."
            className="w-full bg-white border-2 border-black p-3 rounded-md font-bold text-sm outline-none focus:bg-yellow-50 focus:shadow-neo-sm transition-all text-black"
          />
        </div>

        {/* Categories Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-custom pb-2 min-w-0">
          {CATS.map((c) => {
            const active = c === activeCat;
            const borderCol = ACC[c] || "#7F77DD";
            return (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                style={{
                  borderColor: active ? borderCol : "#000000",
                  backgroundColor: active ? `${borderCol}18` : "#ffffff",
                  color: active ? borderCol : "#000000"
                }}
                className={`shrink-0 text-xs font-black uppercase border-2 py-1.5 px-3.5 rounded-full shadow-neo-sm transition-all neo-clickable cursor-pointer`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </header>

      {/* Solving Framework Widget */}
      <section className="bg-white border-4 border-black rounded-xl shadow-neo overflow-hidden">
        <button
          onClick={() => setFwOpen(!fwOpen)}
          className="w-full flex items-center justify-between p-4 bg-neoPurple font-black text-sm md:text-base text-black uppercase border-b-4 border-black cursor-pointer neo-clickable"
        >
          <span className="flex items-center gap-2">
            <i className="ti ti-brain" />
            <span>Problem-Solving Framework + Pattern Signals</span>
          </span>
          <i className={`ti ${fwOpen ? "ti-chevron-up" : "ti-chevron-down"}`} />
        </button>

        {fwOpen && (
          <div className="p-4 md:p-6 space-y-6 bg-neoCream border-t-2 border-black">
            <div>
              <div className="text-xs font-black text-gray-500 uppercase tracking-widest font-mono mb-4">
                5-STEP APPROACH — use before writing any code
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { n: "01", l: "Clarify", d: "Constraints, edge cases, input/output format, allowed modifications" },
                  { n: "02", l: "Pattern Match", d: "Keywords → pattern. Brute force O(n²)? Better structure likely exists" },
                  { n: "03", l: "Example", d: "Trace 5-7 elements manually. Check edge case. Code is LAST step" },
                  { n: "04", l: "Code", d: "Pseudocode first. Named variables. Edge cases at top. Return early" },
                  { n: "05", l: "Optimize", d: "State complexity aloud. O(n²) ok for n≤10³; O(n log n) for n≤10⁵" }
                ].map((s) => (
                  <div key={s.n} className="bg-white border-2 border-black p-4 rounded-lg shadow-neo-sm">
                    <div className="font-mono text-xs font-black text-neoPurple mb-2">{s.n}</div>
                    <h4 className="font-black text-sm uppercase text-black mb-1">{s.l}</h4>
                    <p className="text-xs text-gray-650 leading-relaxed font-bold">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t-2 border-black/10">
              {/* Pattern Signals Table */}
              <div>
                <div className="text-xs font-black text-gray-500 uppercase tracking-widest font-mono mb-3">
                  SIGNAL → GO-TO PATTERN
                </div>
                <div className="border-2 border-black rounded-lg overflow-hidden bg-white shadow-neo-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b-2 border-black text-[11px] font-black uppercase tracking-wider text-gray-500 font-mono">
                        <th className="py-2.5 px-4">problem signal / keyword</th>
                        <th className="py-2.5 px-4">go-to pattern</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                      {SIGNALS.map(([k, v]) => (
                        <tr key={k} className="hover:bg-yellow-50/50">
                          <td className="py-2.5 px-4 font-mono text-xs text-gray-600 font-bold">{k}</td>
                          <td className="py-2.5 px-4 text-xs font-black text-black">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DP Sub-patterns Table */}
              <div>
                <div className="text-xs font-black text-gray-500 uppercase tracking-widest font-mono mb-3">
                  DP SUB-PATTERNS
                </div>
                <div className="border-2 border-black rounded-lg overflow-hidden bg-white shadow-neo-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b-2 border-black text-[11px] font-black uppercase tracking-wider text-gray-500 font-mono">
                        <th className="py-2.5 px-4">type</th>
                        <th className="py-2.5 px-4">transition</th>
                        <th className="py-2.5 px-4">example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                      {DPTYPES.map(([t, tr, e]) => (
                        <tr key={t} className="hover:bg-yellow-50/50">
                          <td className="py-2.5 px-4 text-xs font-black text-black">{t}</td>
                          <td className="py-2.5 px-4 font-mono text-xs text-gray-500 font-semibold">{tr}</td>
                          <td className="py-2.5 px-4 text-xs text-gray-600 font-bold">{e}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Pattern Cards Container */}
      <section className="space-y-4">
        {shown.length === 0 ? (
          <div className="bg-white border-4 border-black p-12 text-center rounded-xl shadow-neo space-y-3">
            <i className="ti ti-search text-3xl text-gray-400 block" />
            <p className="font-black text-sm uppercase text-gray-500">
              no patterns match "{q}"
            </p>
          </div>
        ) : (
          shown.map((p) => {
            const activeColor = ACC[p.cat] || "#7F77DD";
            const isOpen = openSet.has(p.id);
            return (
              <div
                key={p.id}
                style={{ borderLeftColor: activeColor }}
                className="bg-white border-4 border-black border-l-[10px] rounded-xl shadow-neo overflow-hidden transition-all duration-200"
              >
                {/* Card Header Toggle */}
                <button
                  onClick={() => toggleCard(p.id)}
                  className="w-full text-left p-4 flex items-start gap-4 hover:bg-stone-50 transition-colors cursor-pointer select-none"
                >
                  <div
                    style={{
                      backgroundColor: `${activeColor}18`,
                      borderColor: `${activeColor}40`,
                      color: activeColor
                    }}
                    className="w-10 h-10 border-2 rounded-lg flex items-center justify-center font-mono font-black text-xs shrink-0 shadow-neo-sm"
                  >
                    {String(p.id).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-black text-lg text-black uppercase flex items-center gap-1.5">
                        <i className={`ti ${p.icon}`} style={{ color: activeColor }} />
                        <span>{p.name}</span>
                      </h3>
                      <span
                        style={{
                          backgroundColor: `${activeColor}15`,
                          borderColor: `${activeColor}30`,
                          color: activeColor
                        }}
                        className="text-[10px] font-black uppercase border px-2 py-0.5 rounded-full"
                      >
                        {p.cat}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {p.kw.map((k) => (
                        <span
                          key={k}
                          className="bg-stone-100 border border-stone-300 text-stone-600 text-[10px] font-extrabold px-2 py-0.5 rounded"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
                    <i className={`ti ${isOpen ? "ti-chevron-up" : "ti-chevron-down"} text-gray-400 text-lg`} />
                    <span className="font-mono text-[10px] text-gray-500 font-bold uppercase">
                      {p.tc.split("|")[0].trim()}
                    </span>
                  </div>
                </button>

                {/* Expanded Card Body */}
                {isOpen && (
                  <div className="p-4 md:p-6 border-t-2 border-black/10 bg-neoCream space-y-6">
                    {/* Top Row: Recognize & Think */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Section: Recognize */}
                      <div className="bg-white border-2 border-black p-4 rounded-lg shadow-neo-sm space-y-3">
                        <h4 className="font-mono text-[10px] font-black uppercase text-[#1D9E75] flex items-center gap-1.5">
                          <i className="ti ti-eye" />
                          <span>RECOGNIZE IT</span>
                        </h4>
                        <ul className="space-y-2 text-xs font-bold text-gray-750">
                          {p.r.map((item, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="text-[#1D9E75] select-none">›</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Section: Think */}
                      <div className="bg-white border-2 border-black p-4 rounded-lg shadow-neo-sm space-y-3">
                        <h4 className="font-mono text-[10px] font-black uppercase text-[#7F77DD] flex items-center gap-1.5">
                          <i className="ti ti-brain" />
                          <span>THINK THIS</span>
                        </h4>
                        <ul className="space-y-2 text-xs font-bold text-gray-750">
                          {p.t.map((item, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="text-[#7F77DD] select-none">›</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Mid Row: Do This & Python Tools */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Section: Do This */}
                      <div className="bg-white border-2 border-black p-4 rounded-lg shadow-neo-sm space-y-3">
                        <h4 className="font-mono text-[10px] font-black uppercase text-[#EF9F27] flex items-center gap-1.5">
                          <i className="ti ti-player-play" />
                          <span>DO THIS</span>
                        </h4>
                        <ul className="space-y-2 text-[11px] font-mono text-stone-700 font-semibold">
                          {p.d.map((item, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="text-[#EF9F27] select-none">›</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Section: Python Tools */}
                      <div className="bg-white border-2 border-black p-4 rounded-lg shadow-neo-sm space-y-3">
                        <h4 className="font-mono text-[10px] font-black uppercase text-[#3B6D11] flex items-center gap-1.5">
                          <i className="ti ti-code" />
                          <span>PYTHON TOOLS</span>
                        </h4>
                        <ul className="space-y-2 text-[11px] font-mono text-stone-700 font-semibold">
                          {p.p.map((item, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="text-[#3B6D11] select-none">›</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer Row: Classics & Time/Space */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-2 border-black p-3 rounded-lg shadow-neo-sm">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-mono text-[10px] font-black text-gray-400 uppercase tracking-widest">CLASSIC</span>
                        {p.cl.map((c) => (
                          <span
                            key={c}
                            style={{
                              backgroundColor: `${activeColor}15`,
                              borderColor: `${activeColor}30`,
                              color: activeColor
                            }}
                            className="text-[10px] font-black uppercase border px-2 py-0.5 rounded"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-500 font-bold uppercase">
                        <i className="ti ti-clock" />
                        <span>{p.tc}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
