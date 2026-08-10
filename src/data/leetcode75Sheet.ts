import { Step, Problem } from "./a2zDsaSheet";

export interface LeetCode75Problem extends Problem {
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
}

export const leetcode75SheetData: Step[] = [
  {
    stepId: "lc75-array-string",
    stepTitle: "Array / String",
    lessons: [
      {
        lessonId: "lc75-array-string-l1",
        lessonTitle: "Array & String Essentials",
        topics: [
          {
            topicId: "lc75-array-string-t1",
            topicTitle: "Array & String Manipulation",
            problems: [
              {
                id: "lc75_1768_merge_strings_alternately",
                name: "1768. Merge Strings Alternately",
                leetcodeUrl: "https://leetcode.com/problems/merge-strings-alternately/",
                leetcodeSlug: "merge-strings-alternately",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Array / String",
              },
              {
                id: "lc75_1071_greatest_common_divisor_of_strings",
                name: "1071. Greatest Common Divisor of Strings",
                leetcodeUrl: "https://leetcode.com/problems/greatest-common-divisor-of-strings/",
                leetcodeSlug: "greatest-common-divisor-of-strings",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Array / String",
              },
              {
                id: "lc75_1431_kids_with_the_greatest_number_of_candies",
                name: "1431. Kids With the Greatest Number of Candies",
                leetcodeUrl: "https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/",
                leetcodeSlug: "kids-with-the-greatest-number-of-candies",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Array / String",
              },
              {
                id: "lc75_605_can_place_flowers",
                name: "605. Can Place Flowers",
                leetcodeUrl: "https://leetcode.com/problems/can-place-flowers/",
                leetcodeSlug: "can-place-flowers",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Array / String",
              },
              {
                id: "lc75_345_reverse_vowels_of_a_string",
                name: "345. Reverse Vowels of a String",
                leetcodeUrl: "https://leetcode.com/problems/reverse-vowels-of-a-string/",
                leetcodeSlug: "reverse-vowels-of-a-string",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Array / String",
              },
              {
                id: "lc75_151_reverse_words_in_a_string",
                name: "151. Reverse Words in a String",
                leetcodeUrl: "https://leetcode.com/problems/reverse-words-in-a-string/",
                leetcodeSlug: "reverse-words-in-a-string",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Array / String",
              },
              {
                id: "lc75_238_product_of_array_except_self",
                name: "238. Product of Array Except Self",
                leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
                leetcodeSlug: "product-of-array-except-self",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Array / String",
              },
              {
                id: "lc75_334_increasing_triplet_subsequence",
                name: "334. Increasing Triplet Subsequence",
                leetcodeUrl: "https://leetcode.com/problems/increasing-triplet-subsequence/",
                leetcodeSlug: "increasing-triplet-subsequence",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Array / String",
              },
              {
                id: "lc75_443_string_compression",
                name: "443. String Compression",
                leetcodeUrl: "https://leetcode.com/problems/string-compression/",
                leetcodeSlug: "string-compression",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Array / String",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-two-pointers",
    stepTitle: "Two Pointers",
    lessons: [
      {
        lessonId: "lc75-two-pointers-l1",
        lessonTitle: "Two Pointer Techniques",
        topics: [
          {
            topicId: "lc75-two-pointers-t1",
            topicTitle: "Two Pointer Problems",
            problems: [
              {
                id: "lc75_283_move_zeroes",
                name: "283. Move Zeroes",
                leetcodeUrl: "https://leetcode.com/problems/move-zeroes/",
                leetcodeSlug: "move-zeroes",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Two Pointers",
              },
              {
                id: "lc75_392_is_subsequence",
                name: "392. Is Subsequence",
                leetcodeUrl: "https://leetcode.com/problems/is-subsequence/",
                leetcodeSlug: "is-subsequence",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Two Pointers",
              },
              {
                id: "lc75_11_container_with_most_water",
                name: "11. Container With Most Water",
                leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
                leetcodeSlug: "container-with-most-water",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Two Pointers",
              },
              {
                id: "lc75_1679_max_number_of_k_sum_pairs",
                name: "1679. Max Number of K-Sum Pairs",
                leetcodeUrl: "https://leetcode.com/problems/max-number-of-k-sum-pairs/",
                leetcodeSlug: "max-number-of-k-sum-pairs",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Two Pointers",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-sliding-window",
    stepTitle: "Sliding Window",
    lessons: [
      {
        lessonId: "lc75-sliding-window-l1",
        lessonTitle: "Sliding Window Patterns",
        topics: [
          {
            topicId: "lc75-sliding-window-t1",
            topicTitle: "Fixed & Dynamic Windows",
            problems: [
              {
                id: "lc75_643_maximum_average_subarray_i",
                name: "643. Maximum Average Subarray I",
                leetcodeUrl: "https://leetcode.com/problems/maximum-average-subarray-i/",
                leetcodeSlug: "maximum-average-subarray-i",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Sliding Window",
              },
              {
                id: "lc75_1456_maximum_number_of_vowels_in_a_substring_of_given_length",
                name: "1456. Maximum Number of Vowels in a Substring of Given Length",
                leetcodeUrl: "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
                leetcodeSlug: "maximum-number-of-vowels-in-a-substring-of-given-length",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Sliding Window",
              },
              {
                id: "lc75_1004_max_consecutive_ones_iii",
                name: "1004. Max Consecutive Ones III",
                leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones-iii/",
                leetcodeSlug: "max-consecutive-ones-iii",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Sliding Window",
              },
              {
                id: "lc75_1493_longest_subarray_of_1s_after_deleting_one_element",
                name: "1493. Longest Subarray of 1's After Deleting One Element",
                leetcodeUrl: "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/",
                leetcodeSlug: "longest-subarray-of-1s-after-deleting-one-element",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Sliding Window",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-prefix-sum",
    stepTitle: "Prefix Sum",
    lessons: [
      {
        lessonId: "lc75-prefix-sum-l1",
        lessonTitle: "Prefix Sum Techniques",
        topics: [
          {
            topicId: "lc75-prefix-sum-t1",
            topicTitle: "Cumulative Sums",
            problems: [
              {
                id: "lc75_1732_find_the_highest_altitude",
                name: "1732. Find the Highest Altitude",
                leetcodeUrl: "https://leetcode.com/problems/find-the-highest-altitude/",
                leetcodeSlug: "find-the-highest-altitude",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Prefix Sum",
              },
              {
                id: "lc75_724_find_pivot_index",
                name: "724. Find Pivot Index",
                leetcodeUrl: "https://leetcode.com/problems/find-pivot-index/",
                leetcodeSlug: "find-pivot-index",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Prefix Sum",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-hash-map-set",
    stepTitle: "Hash Map / Set",
    lessons: [
      {
        lessonId: "lc75-hash-map-set-l1",
        lessonTitle: "Hash Map & Set Operations",
        topics: [
          {
            topicId: "lc75-hash-map-set-t1",
            topicTitle: "Map & Set Problems",
            problems: [
              {
                id: "lc75_2215_find_the_difference_of_two_arrays",
                name: "2215. Find the Difference of Two Arrays",
                leetcodeUrl: "https://leetcode.com/problems/find-the-difference-of-two-arrays/",
                leetcodeSlug: "find-the-difference-of-two-arrays",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Hash Map / Set",
              },
              {
                id: "lc75_1207_unique_number_of_occurrences",
                name: "1207. Unique Number of Occurrences",
                leetcodeUrl: "https://leetcode.com/problems/unique-number-of-occurrences/",
                leetcodeSlug: "unique-number-of-occurrences",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Hash Map / Set",
              },
              {
                id: "lc75_1657_determine_if_two_strings_are_close",
                name: "1657. Determine if Two Strings Are Close",
                leetcodeUrl: "https://leetcode.com/problems/determine-if-two-strings-are-close/",
                leetcodeSlug: "determine-if-two-strings-are-close",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Hash Map / Set",
              },
              {
                id: "lc75_2352_equal_row_and_column_pairs",
                name: "2352. Equal Row and Column Pairs",
                leetcodeUrl: "https://leetcode.com/problems/equal-row-and-column-pairs/",
                leetcodeSlug: "equal-row-and-column-pairs",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Hash Map / Set",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-stack",
    stepTitle: "Stack",
    lessons: [
      {
        lessonId: "lc75-stack-l1",
        lessonTitle: "Stack Data Structure",
        topics: [
          {
            topicId: "lc75-stack-t1",
            topicTitle: "LIFO Operations & Evaluation",
            problems: [
              {
                id: "lc75_2390_removing_stars_from_a_string",
                name: "2390. Removing Stars From a String",
                leetcodeUrl: "https://leetcode.com/problems/removing-stars-from-a-string/",
                leetcodeSlug: "removing-stars-from-a-string",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Stack",
              },
              {
                id: "lc75_735_asteroid_collision",
                name: "735. Asteroid Collision",
                leetcodeUrl: "https://leetcode.com/problems/asteroid-collision/",
                leetcodeSlug: "asteroid-collision",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Stack",
              },
              {
                id: "lc75_394_decode_string",
                name: "394. Decode String",
                leetcodeUrl: "https://leetcode.com/problems/decode-string/",
                leetcodeSlug: "decode-string",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Stack",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-queue",
    stepTitle: "Queue",
    lessons: [
      {
        lessonId: "lc75-queue-l1",
        lessonTitle: "Queue Data Structure",
        topics: [
          {
            topicId: "lc75-queue-t1",
            topicTitle: "FIFO & Simulation Problems",
            problems: [
              {
                id: "lc75_933_number_of_recent_calls",
                name: "933. Number of Recent Calls",
                leetcodeUrl: "https://leetcode.com/problems/number-of-recent-calls/",
                leetcodeSlug: "number-of-recent-calls",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Queue",
              },
              {
                id: "lc75_649_dota2_senate",
                name: "649. Dota2 Senate",
                leetcodeUrl: "https://leetcode.com/problems/dota2-senate/",
                leetcodeSlug: "dota2-senate",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Queue",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-linked-list",
    stepTitle: "Linked List",
    lessons: [
      {
        lessonId: "lc75-linked-list-l1",
        lessonTitle: "Singly Linked List",
        topics: [
          {
            topicId: "lc75-linked-list-t1",
            topicTitle: "Pointer Manipulation & Reversal",
            problems: [
              {
                id: "lc75_2095_delete_the_middle_node_of_a_linked_list",
                name: "2095. Delete the Middle Node of a Linked List",
                leetcodeUrl: "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/",
                leetcodeSlug: "delete-the-middle-node-of-a-linked-list",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Linked List",
              },
              {
                id: "lc75_328_odd_even_linked_list",
                name: "328. Odd Even Linked List",
                leetcodeUrl: "https://leetcode.com/problems/odd-even-linked-list/",
                leetcodeSlug: "odd-even-linked-list",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Linked List",
              },
              {
                id: "lc75_206_reverse_linked_list",
                name: "206. Reverse Linked List",
                leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
                leetcodeSlug: "reverse-linked-list",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Linked List",
              },
              {
                id: "lc75_2130_maximum_twin_sum_of_a_linked_list",
                name: "2130. Maximum Twin Sum of a Linked List",
                leetcodeUrl: "https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/",
                leetcodeSlug: "maximum-twin-sum-of-a-linked-list",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Linked List",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-binary-tree-dfs",
    stepTitle: "Binary Tree - DFS",
    lessons: [
      {
        lessonId: "lc75-binary-tree-dfs-l1",
        lessonTitle: "Depth First Search in Trees",
        topics: [
          {
            topicId: "lc75-binary-tree-dfs-t1",
            topicTitle: "Recursive & Path Traversal",
            problems: [
              {
                id: "lc75_104_maximum_depth_of_binary_tree",
                name: "104. Maximum Depth of Binary Tree",
                leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
                leetcodeSlug: "maximum-depth-of-binary-tree",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Binary Tree - DFS",
              },
              {
                id: "lc75_872_leaf_similar_trees",
                name: "872. Leaf-Similar Trees",
                leetcodeUrl: "https://leetcode.com/problems/leaf-similar-trees/",
                leetcodeSlug: "leaf-similar-trees",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Binary Tree - DFS",
              },
              {
                id: "lc75_1448_count_good_nodes_in_binary_tree",
                name: "1448. Count Good Nodes in Binary Tree",
                leetcodeUrl: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
                leetcodeSlug: "count-good-nodes-in-binary-tree",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Tree - DFS",
              },
              {
                id: "lc75_437_path_sum_iii",
                name: "437. Path Sum III",
                leetcodeUrl: "https://leetcode.com/problems/path-sum-iii/",
                leetcodeSlug: "path-sum-iii",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Tree - DFS",
              },
              {
                id: "lc75_1372_longest_zigzag_path_in_a_binary_tree",
                name: "1372. Longest ZigZag Path in a Binary Tree",
                leetcodeUrl: "https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/",
                leetcodeSlug: "longest-zigzag-path-in-a-binary-tree",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Tree - DFS",
              },
              {
                id: "lc75_236_lowest_common_ancestor_of_a_binary_tree",
                name: "236. Lowest Common Ancestor of a Binary Tree",
                leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
                leetcodeSlug: "lowest-common-ancestor-of-a-binary-tree",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Tree - DFS",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-binary-tree-bfs",
    stepTitle: "Binary Tree - BFS",
    lessons: [
      {
        lessonId: "lc75-binary-tree-bfs-l1",
        lessonTitle: "Breadth First Search in Trees",
        topics: [
          {
            topicId: "lc75-binary-tree-bfs-t1",
            topicTitle: "Level Order Traversal",
            problems: [
              {
                id: "lc75_199_binary_tree_right_side_view",
                name: "199. Binary Tree Right Side View",
                leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/",
                leetcodeSlug: "binary-tree-right-side-view",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Tree - BFS",
              },
              {
                id: "lc75_1161_maximum_level_sum_of_a_binary_tree",
                name: "1161. Maximum Level Sum of a Binary Tree",
                leetcodeUrl: "https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/",
                leetcodeSlug: "maximum-level-sum-of-a-binary-tree",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Tree - BFS",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-binary-search-tree",
    stepTitle: "Binary Search Tree",
    lessons: [
      {
        lessonId: "lc75-binary-search-tree-l1",
        lessonTitle: "BST Operations",
        topics: [
          {
            topicId: "lc75-binary-search-tree-t1",
            topicTitle: "Search & Mutation in BST",
            problems: [
              {
                id: "lc75_700_search_in_a_binary_search_tree",
                name: "700. Search in a Binary Search Tree",
                leetcodeUrl: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
                leetcodeSlug: "search-in-a-binary-search-tree",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Binary Search Tree",
              },
              {
                id: "lc75_450_delete_node_in_a_bst",
                name: "450. Delete Node in a BST",
                leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-bst/",
                leetcodeSlug: "delete-node-in-a-bst",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Search Tree",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-graphs-dfs",
    stepTitle: "Graphs - DFS",
    lessons: [
      {
        lessonId: "lc75-graphs-dfs-l1",
        lessonTitle: "Graph Depth First Search",
        topics: [
          {
            topicId: "lc75-graphs-dfs-t1",
            topicTitle: "Connectivity & Reordering",
            problems: [
              {
                id: "lc75_841_keys_and_rooms",
                name: "841. Keys and Rooms",
                leetcodeUrl: "https://leetcode.com/problems/keys-and-rooms/",
                leetcodeSlug: "keys-and-rooms",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Graphs - DFS",
              },
              {
                id: "lc75_547_number_of_provinces",
                name: "547. Number of Provinces",
                leetcodeUrl: "https://leetcode.com/problems/number-of-provinces/",
                leetcodeSlug: "number-of-provinces",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Graphs - DFS",
              },
              {
                id: "lc75_1466_reorder_routes_to_make_all_paths_lead_to_the_city_zero",
                name: "1466. Reorder Routes to Make All Paths Lead to the City Zero",
                leetcodeUrl: "https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/",
                leetcodeSlug: "reorder-routes-to-make-all-paths-lead-to-the-city-zero",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Graphs - DFS",
              },
              {
                id: "lc75_399_evaluate_division",
                name: "399. Evaluate Division",
                leetcodeUrl: "https://leetcode.com/problems/evaluate-division/",
                leetcodeSlug: "evaluate-division",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Graphs - DFS",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-graphs-bfs",
    stepTitle: "Graphs - BFS",
    lessons: [
      {
        lessonId: "lc75-graphs-bfs-l1",
        lessonTitle: "Graph Breadth First Search",
        topics: [
          {
            topicId: "lc75-graphs-bfs-t1",
            topicTitle: "Shortest Path & Matrix Traversal",
            problems: [
              {
                id: "lc75_1926_nearest_exit_from_entrance_in_maze",
                name: "1926. Nearest Exit from Entrance in Maze",
                leetcodeUrl: "https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/",
                leetcodeSlug: "nearest-exit-from-entrance-in-maze",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Graphs - BFS",
              },
              {
                id: "lc75_994_rotting_oranges",
                name: "994. Rotting Oranges",
                leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
                leetcodeSlug: "rotting-oranges",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Graphs - BFS",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-heap-priority-queue",
    stepTitle: "Heap / Priority Queue",
    lessons: [
      {
        lessonId: "lc75-heap-priority-queue-l1",
        lessonTitle: "Heap Data Structure",
        topics: [
          {
            topicId: "lc75-heap-priority-queue-t1",
            topicTitle: "Top-K Elements & Heap Patterns",
            problems: [
              {
                id: "lc75_215_kth_largest_element_in_an_array",
                name: "215. Kth Largest Element in an Array",
                leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
                leetcodeSlug: "kth-largest-element-in-an-array",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Heap / Priority Queue",
              },
              {
                id: "lc75_2336_smallest_number_in_infinite_set",
                name: "2336. Smallest Number in Infinite Set",
                leetcodeUrl: "https://leetcode.com/problems/smallest-number-in-infinite-set/",
                leetcodeSlug: "smallest-number-in-infinite-set",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Heap / Priority Queue",
              },
              {
                id: "lc75_2542_maximum_subsequence_score",
                name: "2542. Maximum Subsequence Score",
                leetcodeUrl: "https://leetcode.com/problems/maximum-subsequence-score/",
                leetcodeSlug: "maximum-subsequence-score",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Heap / Priority Queue",
              },
              {
                id: "lc75_2462_total_cost_to_hire_k_workers",
                name: "2462. Total Cost to Hire K Workers",
                leetcodeUrl: "https://leetcode.com/problems/total-cost-to-hire-k-workers/",
                leetcodeSlug: "total-cost-to-hire-k-workers",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Heap / Priority Queue",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-binary-search",
    stepTitle: "Binary Search",
    lessons: [
      {
        lessonId: "lc75-binary-search-l1",
        lessonTitle: "Binary Search Algorithm",
        topics: [
          {
            topicId: "lc75-binary-search-t1",
            topicTitle: "Divide and Conquer Search",
            problems: [
              {
                id: "lc75_374_guess_number_higher_or_lower",
                name: "374. Guess Number Higher or Lower",
                leetcodeUrl: "https://leetcode.com/problems/guess-number-higher-or-lower/",
                leetcodeSlug: "guess-number-higher-or-lower",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Binary Search",
              },
              {
                id: "lc75_2300_successful_pairs_of_spells_and_potions",
                name: "2300. Successful Pairs of Spells and Potions",
                leetcodeUrl: "https://leetcode.com/problems/successful-pairs-of-spells-and-potions/",
                leetcodeSlug: "successful-pairs-of-spells-and-potions",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Search",
              },
              {
                id: "lc75_875_koko_eating_bananas",
                name: "875. Koko Eating Bananas",
                leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
                leetcodeSlug: "koko-eating-bananas",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Search",
              },
              {
                id: "lc75_1482_minimum_number_of_days_to_make_m_bouquets",
                name: "1482. Minimum Number of Days to Make m Bouquets",
                leetcodeUrl: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
                leetcodeSlug: "minimum-number-of-days-to-make-m-bouquets",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Binary Search",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-backtracking",
    stepTitle: "Backtracking",
    lessons: [
      {
        lessonId: "lc75-backtracking-l1",
        lessonTitle: "Backtracking Search",
        topics: [
          {
            topicId: "lc75-backtracking-t1",
            topicTitle: "Combinations & Permutations",
            problems: [
              {
                id: "lc75_17_letter_combinations_of_a_phone_number",
                name: "17. Letter Combinations of a Phone Number",
                leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
                leetcodeSlug: "letter-combinations-of-a-phone-number",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Backtracking",
              },
              {
                id: "lc75_39_combination_sum",
                name: "39. Combination Sum",
                leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
                leetcodeSlug: "combination-sum",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Backtracking",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-dp-1d",
    stepTitle: "DP - 1D",
    lessons: [
      {
        lessonId: "lc75-dp-1d-l1",
        lessonTitle: "1D Dynamic Programming",
        topics: [
          {
            topicId: "lc75-dp-1d-t1",
            topicTitle: "Subproblem Optimal Substructure",
            problems: [
              {
                id: "lc75_1137_n_th_tribonacci_number",
                name: "1137. N-th Tribonacci Number",
                leetcodeUrl: "https://leetcode.com/problems/n-th-tribonacci-number/",
                leetcodeSlug: "n-th-tribonacci-number",
                gfgUrl: "",
                difficulty: "Easy",
                category: "DP - 1D",
              },
              {
                id: "lc75_746_min_cost_climbing_stairs",
                name: "746. Min Cost Climbing Stairs",
                leetcodeUrl: "https://leetcode.com/problems/min-cost-climbing-stairs/",
                leetcodeSlug: "min-cost-climbing-stairs",
                gfgUrl: "",
                difficulty: "Easy",
                category: "DP - 1D",
              },
              {
                id: "lc75_198_house_robber",
                name: "198. House Robber",
                leetcodeUrl: "https://leetcode.com/problems/house-robber/",
                leetcodeSlug: "house-robber",
                gfgUrl: "",
                difficulty: "Medium",
                category: "DP - 1D",
              },
              {
                id: "lc75_790_domino_and_tromino_tiling",
                name: "790. Domino and Tromino Tiling",
                leetcodeUrl: "https://leetcode.com/problems/domino-and-tromino-tiling/",
                leetcodeSlug: "domino-and-tromino-tiling",
                gfgUrl: "",
                difficulty: "Medium",
                category: "DP - 1D",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-dp-multidimensional",
    stepTitle: "DP - Multidimensional",
    lessons: [
      {
        lessonId: "lc75-dp-multidimensional-l1",
        lessonTitle: "Multi-dimensional Dynamic Programming",
        topics: [
          {
            topicId: "lc75-dp-multidimensional-t1",
            topicTitle: "Grid & String DP State Transitions",
            problems: [
              {
                id: "lc75_62_unique_paths",
                name: "62. Unique Paths",
                leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
                leetcodeSlug: "unique-paths",
                gfgUrl: "",
                difficulty: "Medium",
                category: "DP - Multidimensional",
              },
              {
                id: "lc75_1143_longest_common_subsequence",
                name: "1143. Longest Common Subsequence",
                leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
                leetcodeSlug: "longest-common-subsequence",
                gfgUrl: "",
                difficulty: "Medium",
                category: "DP - Multidimensional",
              },
              {
                id: "lc75_714_best_time_to_buy_and_sell_stock_with_transaction_fee",
                name: "714. Best Time to Buy and Sell Stock with Transaction Fee",
                leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
                leetcodeSlug: "best-time-to-buy-and-sell-stock-with-transaction-fee",
                gfgUrl: "",
                difficulty: "Medium",
                category: "DP - Multidimensional",
              },
              {
                id: "lc75_72_edit_distance",
                name: "72. Edit Distance",
                leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
                leetcodeSlug: "edit-distance",
                gfgUrl: "",
                difficulty: "Hard",
                category: "DP - Multidimensional",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-bit-manipulation",
    stepTitle: "Bit Manipulation",
    lessons: [
      {
        lessonId: "lc75-bit-manipulation-l1",
        lessonTitle: "Bitwise Operators",
        topics: [
          {
            topicId: "lc75-bit-manipulation-t1",
            topicTitle: "Bitwise Logic & Masks",
            problems: [
              {
                id: "lc75_338_counting_bits",
                name: "338. Counting Bits",
                leetcodeUrl: "https://leetcode.com/problems/counting-bits/",
                leetcodeSlug: "counting-bits",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Bit Manipulation",
              },
              {
                id: "lc75_136_single_number",
                name: "136. Single Number",
                leetcodeUrl: "https://leetcode.com/problems/single-number/",
                leetcodeSlug: "single-number",
                gfgUrl: "",
                difficulty: "Easy",
                category: "Bit Manipulation",
              },
              {
                id: "lc75_1318_minimum_flips_to_make_a_or_b_equal_to_c",
                name: "1318. Minimum Flips to Make a OR b Equal to c",
                leetcodeUrl: "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/",
                leetcodeSlug: "minimum-flips-to-make-a-or-b-equal-to-c",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Bit Manipulation",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-trie",
    stepTitle: "Trie",
    lessons: [
      {
        lessonId: "lc75-trie-l1",
        lessonTitle: "Prefix Trees",
        topics: [
          {
            topicId: "lc75-trie-t1",
            topicTitle: "Trie Insertion & Search",
            problems: [
              {
                id: "lc75_208_implement_trie_prefix_tree",
                name: "208. Implement Trie (Prefix Tree)",
                leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
                leetcodeSlug: "implement-trie-prefix-tree",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Trie",
              },
              {
                id: "lc75_1268_search_suggestions_system",
                name: "1268. Search Suggestions System",
                leetcodeUrl: "https://leetcode.com/problems/search-suggestions-system/",
                leetcodeSlug: "search-suggestions-system",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Trie",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-monotonic-stack",
    stepTitle: "Monotonic Stack",
    lessons: [
      {
        lessonId: "lc75-monotonic-stack-l1",
        lessonTitle: "Monotonic Stack Patterns",
        topics: [
          {
            topicId: "lc75-monotonic-stack-t1",
            topicTitle: "Next Greater & Stock Span",
            problems: [
              {
                id: "lc75_739_daily_temperatures",
                name: "739. Daily Temperatures",
                leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
                leetcodeSlug: "daily-temperatures",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Monotonic Stack",
              },
              {
                id: "lc75_901_online_stock_span",
                name: "901. Online Stock Span",
                leetcodeUrl: "https://leetcode.com/problems/online-stock-span/",
                leetcodeSlug: "online-stock-span",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Monotonic Stack",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "lc75-intervals",
    stepTitle: "Intervals",
    lessons: [
      {
        lessonId: "lc75-intervals-l1",
        lessonTitle: "Interval Scheduling & Overlaps",
        topics: [
          {
            topicId: "lc75-intervals-t1",
            topicTitle: "Merging & Non-Overlapping Intervals",
            problems: [
              {
                id: "lc75_435_non_overlapping_intervals",
                name: "435. Non-overlapping Intervals",
                leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
                leetcodeSlug: "non-overlapping-intervals",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Intervals",
              },
              {
                id: "lc75_452_minimum_number_of_arrows_to_burst_balloons",
                name: "452. Minimum Number of Arrows to Burst Balloons",
                leetcodeUrl: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
                leetcodeSlug: "minimum-number-of-arrows-to-burst-balloons",
                gfgUrl: "",
                difficulty: "Medium",
                category: "Intervals",
              },
            ],
          },
        ],
      },
    ],
  },
];

// Helper array to retrieve all 75 problems in a single flattened array
export const allLeetCode75Problems: Problem[] = leetcode75SheetData.flatMap((step) =>
  step.lessons.flatMap((lesson) => lesson.topics.flatMap((topic) => topic.problems))
);
