export interface Problem {
  id: string;
  name: string;
  leetcodeUrl: string;
  gfgUrl: string;
  /** Explicit LeetCode problem slug for matching when leetcodeUrl doesn't point to leetcode.com */
  leetcodeSlug?: string;
  /** Explicit GFG problem slug for matching when gfgUrl uses a different domain/format */
  gfgSlug?: string;
  difficulty?: "Easy" | "Medium" | "Hard" | string;
  category?: string;
}

export interface Topic {
  topicId: string;
  topicTitle: string;
  problems: Problem[];
}

export interface Lesson {
  lessonId: string;
  lessonTitle: string;
  topics: Topic[];
}

export interface Step {
  stepId: string;
  stepTitle: string;
  lessons: Lesson[];
}

export const a2zDsaSheetData: Step[] = [
  {
    "stepId": "step-1",
    "stepTitle": "Step 1: Arrays (Easy -> Medium -> Hard)",
    "lessons": [
      {
        "lessonId": "s1-l1",
        "lessonTitle": "Lesson 1: Easy",
        "topics": [
          {
            "topicId": "s1-l1-t1",
            "topicTitle": "Easy Problems",
            "problems": [
              {
                "id": "0_largest_element_in_an_array",
                "name": "Largest Element in an Array",
                "leetcodeUrl": "https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/largest-element-in-array4009/0",
                "gfgSlug": "largest-element-in-array4009"
              },
              {
                "id": "1_second_largest_element_in_an_array_without_sorting",
                "name": "Second Largest Element in an Array without sorting",
                "leetcodeUrl": "https://takeuforward.org/data-structure/find-second-smallest-and-second-largest-element-in-an-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/second-largest3735/1",
                "gfgSlug": "second-largest3735"
              },
              {
                "id": "2_check_if_the_array_is_sorted",
                "name": "Check if the array is sorted",
                "leetcodeUrl": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/#:~:text=Input%3A%20nums%20%3D%20%5B2%2C,no%20rotation)%20to%20make%20nums.",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1"
              },
              {
                "id": "3_remove_duplicates_from_sorted_array",
                "name": "Remove duplicates from Sorted array",
                "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/#:~:text=Input%3A%20nums%20%3D%20%5B0%2C,%2C%203%2C%20and%204%20respectively.",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/remove-duplicate-elements-from-sorted-array/1"
              },
              {
                "id": "4_left_rotate_an_array_by_one_place",
                "name": "Left Rotate an array by one place",
                "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/quick-left-rotation3806/1"
              },
              {
                "id": "5_left_rotate_an_array_by_d_places",
                "name": "Left rotate an array by D places",
                "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/reversal-algorithm5340/1"
              },
              {
                "id": "6_move_zeros_to_end",
                "name": "Move Zeros to end",
                "leetcodeUrl": "https://leetcode.com/problems/move-zeroes/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/move-all-zeroes-to-end-of-array0751/1"
              },
              {
                "id": "7_linear_search",
                "name": "Linear Search",
                "leetcodeUrl": "https://takeuforward.org/data-structure/linear-search-in-c/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/who-will-win-1587115621/1",
                "gfgSlug": "who-will-win-1587115621"
              },
              {
                "id": "8_find_the_union_and_intersection_of_two_sorted_arrays",
                "name": "Find the Union and intersection of two sorted arrays",
                "leetcodeUrl": "https://takeuforward.org/data-structure/intersection-of-two-sorted-arrays/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/union-of-two-sorted-arrays-1587115621/1",
                "leetcodeSlug": "intersection-of-two-arrays",
                "gfgSlug": "union-of-two-sorted-arrays-1587115621"
              },
              {
                "id": "9_find_missing_number_in_an_array",
                "name": "Find missing number in an array",
                "leetcodeUrl": "https://leetcode.com/problems/missing-number/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/missing-number4257/1"
              },
              {
                "id": "10_maximum_consecutive_ones",
                "name": "Maximum Consecutive Ones",
                "leetcodeUrl": "https://leetcode.com/problems/max-consecutive-ones/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximize-number-of-1s0905/1"
              },
              {
                "id": "11_subarray_with_given_sum",
                "name": "Subarray with given sum",
                "leetcodeUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1"
              },
              {
                "id": "12_find_the_missing_number",
                "name": "Find the Missing Number",
                "leetcodeUrl": "",
                "gfgUrl": "https://www.geeksforgeeks.org/find-the-missing-number/"
              },
              {
                "id": "13_find_the_number_that_appears_once,_and_other_numbers_twice.",
                "name": "Find the number that appears once, and other numbers twice.",
                "leetcodeUrl": "https://leetcode.com/problems/single-number/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/element-appearing-once2552/0?company[]=Qualcomm&company[]=Qualcomm&difficulty[]=1&page=1&query=company[]Qualcommdifficulty[]1page1company[]Qualcomm"
              },
              {
                "id": "14_search_an_element_in_a_2d_matrix",
                "name": "Search an element in a 2D matrix",
                "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/search-in-a-matrix17201720/1"
              },
              {
                "id": "15_find_the_row_with_maximum_number_of_1\u2019s",
                "name": "Find the row with maximum number of 1\u2019s",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/row-with-max-1s0023/1"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s1-l2",
        "lessonTitle": "Lesson 2: Medium",
        "topics": [
          {
            "topicId": "s1-l2-t1",
            "topicTitle": "Medium Problems",
            "problems": [
              {
                "id": "0_2sum_problem",
                "name": "2Sum Problem",
                "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-all-pairs-whose-sum-is-x5808/1"
              },
              {
                "id": "1_sort_an_array_of_0\u2019s_1\u2019s_and_2\u2019s",
                "name": "Sort an array of 0\u2019s 1\u2019s and 2\u2019s",
                "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1"
              },
              {
                "id": "2_majority_element_(>n/2_times)",
                "name": "Majority Element (>n/2 times)",
                "leetcodeUrl": "https://leetcode.com/problems/majority-element/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/majority-element-1587115620/1"
              },
              {
                "id": "3_kadane\u2019s_algorithm,_maximum_subarray_sum",
                "name": "Kadane\u2019s Algorithm, maximum subarray sum",
                "leetcodeUrl": "https://leetcode.com/problems/maximum-subarray/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/0?company[]=Visa&company[]=Visa&page=2&query=company[]Visapage2company[]Visa"
              },
              {
                "id": "4_print_subarray_with_maximum_subarray_sum_(extended_version_of_above_problem)",
                "name": "Print subarray with maximum subarray sum (extended version of above problem)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/subarray-with-given-sum/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/max-sum-in-sub-arrays0824/0?category=",
                "leetcodeSlug": "maximum-subarray",
                "gfgSlug": "max-sum-in-sub-arrays0824"
              },
              {
                "id": "5_stock_buy_and_sell",
                "name": "Stock Buy and Sell",
                "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/stock-buy-and-sell2615/0?company[]=Intuit+&page=1&query=company[]Intuit+page1"
              },
              {
                "id": "6_rearrange_the_array_in_alternating_positive_and_negative_items",
                "name": "Rearrange the array in alternating positive and negative items",
                "leetcodeUrl": "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/array-of-alternate-ve-and-ve-nos1401/1"
              },
              {
                "id": "7_next_permutation",
                "name": "Next Permutation",
                "leetcodeUrl": "https://leetcode.com/problems/next-permutation/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/next-permutation5226/1"
              },
              {
                "id": "8_leaders_in_an_array_problem",
                "name": "Leaders in an Array problem",
                "leetcodeUrl": "https://takeuforward.org/data-structure/leaders-in-an-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1",
                "gfgSlug": "leaders-in-an-array-1587115620"
              },
              {
                "id": "9_longest_consecutive_sequence_in_an_array",
                "name": "Longest Consecutive Sequence in an Array",
                "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/solution/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-consecutive-subsequence2449/0?problemType=functional&page=1&query=problemTypefunctionalpage1"
              },
              {
                "id": "10_set_matrix_zeros",
                "name": "Set Matrix Zeros",
                "leetcodeUrl": "https://leetcode.com/problems/set-matrix-zeroes/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/make-zeroes4042/1"
              },
              {
                "id": "11_rotate_matrix_by_90_degrees",
                "name": "Rotate Matrix by 90 degrees",
                "leetcodeUrl": "https://leetcode.com/problems/rotate-image/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/rotate-by-90-degree-1587115621/1"
              },
              {
                "id": "12_print_the_matrix_in_spiral_manner",
                "name": "Print the matrix in spiral manner",
                "leetcodeUrl": "https://leetcode.com/problems/spiral-matrix/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/cd61add036272faa69c6814e34aa7007d5a25aa6/1"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s1-l3",
        "lessonTitle": "Lesson 3: Hard",
        "topics": [
          {
            "topicId": "s1-l3-t1",
            "topicTitle": "Hard Problems",
            "problems": [
              {
                "id": "0_pascal\u2019s_triangle",
                "name": "Pascal\u2019s Triangle",
                "leetcodeUrl": "https://leetcode.com/problems/pascals-triangle/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/pascal-triangle0652/1"
              },
              {
                "id": "1_majority_element_(n/3_times)",
                "name": "Majority Element (n/3 times)",
                "leetcodeUrl": "https://leetcode.com/problems/majority-element-ii/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/majority-vote/1"
              },
              {
                "id": "2_3-sum_problem",
                "name": "3-Sum Problem",
                "leetcodeUrl": "https://leetcode.com/problems/3sum/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/3-sum-closest/1"
              },
              {
                "id": "3_4-sum_problem",
                "name": "4-Sum Problem",
                "leetcodeUrl": "https://leetcode.com/problems/4sum/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-all-four-sum-numbers1732/1"
              },
              {
                "id": "4_largest_subarray_with_0_sum",
                "name": "Largest Subarray with 0 Sum",
                "leetcodeUrl": "https://takeuforward.org/data-structure/length-of-the-longest-subarray-with-zero-sum/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1?category[]=Hash&category[]=Hash&company[]=Amazon&company[]=Amazon&page=1&query=category[]Hashcompany[]Amazonpage1company[]Amazoncategory[]Hash",
                "gfgSlug": "largest-subarray-with-0-sum"
              },
              {
                "id": "5_count_number_of_subarrays_with_given_xor_k",
                "name": "Count number of subarrays with given xor K",
                "leetcodeUrl": "https://takeuforward.org/data-structure/count-the-number-of-subarrays-with-given-xor-k/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/subsets-with-xor-value2023/1",
                "gfgSlug": "subsets-with-xor-value2023"
              },
              {
                "id": "6_merge_overlapping_subintervals",
                "name": "Merge Overlapping Subintervals",
                "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/8a644e94faaa94968d8665ba9e0a80d1ae3e0a2d/1"
              },
              {
                "id": "7_merge_two_sorted_arrays_without_extra_space",
                "name": "Merge two sorted arrays without extra space",
                "leetcodeUrl": "https://leetcode.com/problems/merge-sorted-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1?company[]=Synopsys&company[]=Synopsys&page=1&query=company[]Synopsyspage1company[]Synopsys"
              },
              {
                "id": "8_find_the_repeating_and_missing_number",
                "name": "Find the repeating and missing number",
                "leetcodeUrl": "https://takeuforward.org/data-structure/find-the-repeating-and-missing-numbers/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-missing-and-repeating2512/1",
                "gfgSlug": "find-missing-and-repeating2512"
              },
              {
                "id": "9_count_inversions",
                "name": "Count Inversions",
                "leetcodeUrl": "https://takeuforward.org/data-structure/count-inversions-in-an-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/inversion-of-array-1587115620/1",
                "leetcodeSlug": "count-of-smaller-numbers-after-self",
                "gfgSlug": "inversion-of-array-1587115620"
              },
              {
                "id": "10_reverse_pairs",
                "name": "Reverse Pairs",
                "leetcodeUrl": "https://leetcode.com/problems/reverse-pairs/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/pairwise-swap-elements-of-a-linked-list-by-swapping-data/1"
              },
              {
                "id": "11_maximum_product_subarray",
                "name": "Maximum Product Subarray",
                "leetcodeUrl": "https://leetcode.com/problems/maximum-product-subarray/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximum-product-subarray3604/0?qa-rewrite=3336/print-all-valid-combinations-of-ip-address&show=3350"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-2",
    "stepTitle": "Step 2: Binary Search (1D, 2D Arrays, Space Search)",
    "lessons": [
      {
        "lessonId": "s2-l1",
        "lessonTitle": "Lesson 1: Learning BS on 1D Arrays",
        "topics": [
          {
            "topicId": "s2-l1-t1",
            "topicTitle": "Learning BS on 1D Arrays Problems",
            "problems": [
              {
                "id": "0_binary_search_to_find_x_in_sorted_array_",
                "name": "Binary Search to find X in sorted array ",
                "leetcodeUrl": "https://leetcode.com/problems/binary-search/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/binary-search-1587115620/1"
              },
              {
                "id": "1_implement_lower_bound",
                "name": "Implement Lower Bound",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1?track=DSASP-Searching&amp%3BbatchId=154"
              },
              {
                "id": "2_implement_upper_bound",
                "name": "Implement Upper Bound",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/ceil-the-floor2802/1"
              },
              {
                "id": "3_search_insert_position",
                "name": "Search Insert Position",
                "leetcodeUrl": "https://leetcode.com/problems/search-insert-position/#:~:text=Search%20Insert%20Position%20%2D%20LeetCode&text=Given%20a%20sorted%20array%20of,(log%20n)%20runtime%20complexity.",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/search-insert-position-of-k-in-a-sorted-array/1"
              },
              {
                "id": "4_check_if_input_array_is_sorted",
                "name": "Check if Input array is sorted",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1"
              },
              {
                "id": "5_find_the_first_or_last_occurrence_of_a_given_number_in_a_sorted_array_",
                "name": "Find the first or last occurrence of a given number in a sorted array ",
                "leetcodeUrl": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/first-and-last-occurrences-of-x3116/1"
              },
              {
                "id": "6_count_occurrences_of_a_number_in_a_sorted_array_with_duplicates_",
                "name": "Count occurrences of a number in a sorted array with duplicates ",
                "leetcodeUrl": "https://takeuforward.org/data-structure/count-occurrences-in-sorted-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-occurrence2259/1",
                "leetcodeSlug": "find-first-and-last-position-of-element-in-sorted-array",
                "gfgSlug": "number-of-occurrence2259"
              },
              {
                "id": "7_find_peak_element",
                "name": "Find peak element",
                "leetcodeUrl": "https://leetcode.com/problems/find-peak-element/#:~:text=Find%20Peak%20Element%20%2D%20LeetCode&text=A%20peak%20element%20is%20an,to%20any%20of%20the%20peaks.",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/peak-element/1"
              },
              {
                "id": "8_search_in_rotated_sorted_array_i",
                "name": "Search in Rotated Sorted Array I",
                "leetcodeUrl": "https://leetcode.com/problems/find-peak-element/#:~:text=Find%20Peak%20Element%20%2D%20LeetCode&text=A%20peak%20element%20is%20an,to%20any%20of%20the%20peaks.",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/peak-element/1"
              },
              {
                "id": "9_search_in_rotated_sorted_array_ii",
                "name": "Search in Rotated Sorted Array II",
                "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/search-in-rotated-array-2/1"
              },
              {
                "id": "10_find_minimum_in_rotated_sorted_array",
                "name": "Find minimum in Rotated Sorted Array",
                "leetcodeUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-element-in-a-sorted-and-rotated-array3611/1"
              },
              {
                "id": "11_single_element_in_a_sorted_array",
                "name": "Single element in a Sorted Array",
                "leetcodeUrl": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-the-element-that-appears-once-in-sorted-array0624/1"
              },
              {
                "id": "12_find_kth_element_of_two_sorted_arrays",
                "name": "Find kth element of two sorted arrays",
                "leetcodeUrl": "https://takeuforward.org/data-structure/k-th-element-of-two-sorted-arrays/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1",
                "gfgSlug": "k-th-element-of-two-sorted-array1317"
              },
              {
                "id": "13_find_out_how_many_times_has_an_array_been_rotated",
                "name": "Find out how many times has an array been rotated",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/rotation4723/1"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s2-l2",
        "lessonTitle": "Lesson 2: Applying BS on 2D Arrays",
        "topics": [
          {
            "topicId": "s2-l2-t1",
            "topicTitle": "Applying BS on 2D Arrays Problems",
            "problems": [
              {
                "id": "0_search_in_a_2d_matrix_",
                "name": "Search in a 2D matrix ",
                "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/search-in-a-matrix17201720/1"
              },
              {
                "id": "1_find_peak_element_",
                "name": "Find Peak Element ",
                "leetcodeUrl": "https://leetcode.com/problems/find-a-peak-element-ii/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/peak-element/1"
              },
              {
                "id": "2_matrix_median",
                "name": "Matrix Median",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s2-l3",
        "lessonTitle": "Lesson 3: Final Answers by BS in Search Space",
        "topics": [
          {
            "topicId": "s2-l3-t1",
            "topicTitle": "Final Answers by BS in Search Space Problems",
            "problems": [
              {
                "id": "0_find_square_root_of_a_number_in_log_n",
                "name": "Find square root of a number in log n",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/square-root/0"
              },
              {
                "id": "1_find_the_nth_root_of_a_number_using_binary_search",
                "name": "Find the Nth root of a number using binary search",
                "leetcodeUrl": "https://takeuforward.org/data-structure/nth-root-of-a-number-using-binary-search/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-nth-root-of-m5843/1",
                "gfgSlug": "find-nth-root-of-m5843"
              },
              {
                "id": "2_koko_eating_bananas",
                "name": "Koko Eating Bananas",
                "leetcodeUrl": "https://leetcode.com/problems/koko-eating-bananas/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/koko-eating-bananas/1"
              },
              {
                "id": "3_minimum_days_to_make_m_bouquets",
                "name": "Minimum days to make M bouquets",
                "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
                "gfgUrl": ""
              },
              {
                "id": "4_find_the_smallest_divisor",
                "name": "Find the smallest Divisor",
                "leetcodeUrl": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
                "gfgUrl": ""
              },
              {
                "id": "5_capacity_to_ship_packages_within_d_days",
                "name": "Capacity to Ship Packages within D Days",
                "leetcodeUrl": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/capacity-to-ship-packages-within-d-days/1"
              },
              {
                "id": "6_median_of_two_sorted_arrays",
                "name": "Median of two sorted arrays",
                "leetcodeUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/median-of-2-sorted-arrays-of-different-sizes/1"
              },
              {
                "id": "7_aggressive_cows",
                "name": "Aggressive Cows",
                "leetcodeUrl": "https://takeuforward.org/data-structure/aggressive-cows-detailed-solution/",
                "gfgUrl": "",
                "leetcodeSlug": "magnetic-force-between-two-balls"
              },
              {
                "id": "8_book_allocation_problem",
                "name": "Book Allocation Problem",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1"
              },
              {
                "id": "9_split_array_\u2013_largest_sum",
                "name": "Split array \u2013 Largest Sum",
                "leetcodeUrl": "https://leetcode.com/problems/split-array-largest-sum/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/largest-sum-subarray-of-size-at-least-k3121/1"
              },
              {
                "id": "10_kth_missing_positive_number",
                "name": "Kth Missing Positive Number",
                "leetcodeUrl": "https://leetcode.com/problems/kth-missing-positive-number/#:~:text=Given%20an%20array%20arr%20of,13%2C...%5D.",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/k-th-missing-element3635/1"
              },
              {
                "id": "11_minimize_max_distance_to_gas_station",
                "name": "Minimize Max Distance to Gas Station",
                "leetcodeUrl": "https://leetcode.com/problems/minimize-max-distance-to-gas-station/",
                "gfgUrl": ""
              },
              {
                "id": "12_median_of_2_sorted_arrays",
                "name": "Median of 2 sorted arrays",
                "leetcodeUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/median-of-2-sorted-arrays-of-different-sizes/1"
              },
              {
                "id": "13_kth_element_of_2_sorted_arrays",
                "name": "Kth element of 2 sorted arrays",
                "leetcodeUrl": "https://takeuforward.org/data-structure/k-th-element-of-two-sorted-arrays/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1",
                "gfgSlug": "k-th-element-of-two-sorted-array1317"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-3",
    "stepTitle": "Step 3: Strings (Basic and Medium)",
    "lessons": [
      {
        "lessonId": "s3-l1",
        "lessonTitle": "Lesson 1: Basic and Easy String Problems",
        "topics": [
          {
            "topicId": "s3-l1-t1",
            "topicTitle": "Basic and Easy String Problems Problems",
            "problems": [
              {
                "id": "0_remove_outermost_paranthesis",
                "name": "Remove outermost Paranthesis",
                "leetcodeUrl": "https://leetcode.com/problems/remove-outermost-parentheses/",
                "gfgUrl": ""
              },
              {
                "id": "1_reverse_words_in_a_given_string_/_palindrome_check_",
                "name": "Reverse words in a given string / Palindrome Check ",
                "leetcodeUrl": "https://leetcode.com/problems/reverse-words-in-a-string/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/reverse-words-in-a-given-string5459/1"
              },
              {
                "id": "2_largest_odd_number_in_a_string",
                "name": "Largest odd number in a string",
                "leetcodeUrl": "https://leetcode.com/problems/largest-odd-number-in-string/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/largest-odd-number-in-string/1"
              },
              {
                "id": "3_longest_common_prefix",
                "name": "Longest Common Prefix",
                "leetcodeUrl": "https://leetcode.com/problems/longest-common-prefix/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-common-prefix-in-an-array5129/1"
              },
              {
                "id": "4_isomorphic_string",
                "name": "Isomorphic String",
                "leetcodeUrl": "https://leetcode.com/problems/isomorphic-strings/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/isomorphic-strings-1587115620/1"
              },
              {
                "id": "5_check_whether_one_string_is_a_rotation_of_another_",
                "name": "Check whether one string is a rotation of another ",
                "leetcodeUrl": "https://leetcode.com/problems/rotate-string/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/check-if-strings-are-rotations-of-each-other-or-not-1587115620/1"
              },
              {
                "id": "6_check_if_two_strings_are_anagram_of_each_other",
                "name": "Check if two strings are anagram of each other",
                "leetcodeUrl": "https://leetcode.com/problems/valid-anagram/#:~:text=Given%20two%20strings%20s%20and,the%20original%20letters%20exactly%20once.&text=Constraints%3A,.length%20%3C%3D%205%20*%2010",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/anagram-1587115620/1"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s3-l2",
        "lessonTitle": "Lesson 2: Medium String Problems",
        "topics": [
          {
            "topicId": "s3-l2-t1",
            "topicTitle": "Medium String Problems Problems",
            "problems": [
              {
                "id": "0_sort_characters_by_frequency",
                "name": "Sort Characters by frequency",
                "leetcodeUrl": "https://leetcode.com/problems/sort-characters-by-frequency/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency/0"
              },
              {
                "id": "1_maximum_nesting_depth_of_paranthesis",
                "name": "Maximum Nesting Depth of Paranthesis",
                "leetcodeUrl": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximum-nesting-depth-of-the-parentheses/1"
              },
              {
                "id": "2_roman_number_to_integer_and_vice_versa",
                "name": "Roman Number to Integer and vice versa",
                "leetcodeUrl": "https://leetcode.com/problems/roman-to-integer/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/roman-number-to-integer3201/1"
              },
              {
                "id": "3_implement_atoi",
                "name": "Implement Atoi",
                "leetcodeUrl": "https://leetcode.com/problems/string-to-integer-atoi/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/implement-atoi/1"
              },
              {
                "id": "4_count_number_of_substrings",
                "name": "Count Number of Substrings",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/count-number-of-substrings4528/1"
              },
              {
                "id": "5_longest_palindromic_substring[do_it_without_dp]",
                "name": "Longest Palindromic Substring[Do it without DP]",
                "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1"
              },
              {
                "id": "6_sum_of_beauty_of_all_substring",
                "name": "Sum of Beauty of all substring",
                "leetcodeUrl": "https://leetcode.com/problems/sum-of-beauty-of-all-substrings/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/sum-of-beauty-of-all-substrings-1662962118/1"
              },
              {
                "id": "7_reverse_every_word_in_a_string",
                "name": "Reverse Every Word in A String",
                "leetcodeUrl": "https://leetcode.com/problems/reverse-words-in-a-string/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/reverse-words-in-a-given-string5459/1"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-4",
    "stepTitle": "Step 4: Linked List (Single/Double LL, Medium, Hard)",
    "lessons": [
      {
        "lessonId": "s4-l1",
        "lessonTitle": "Lesson 1: Learn 1D Linked List",
        "topics": [
          {
            "topicId": "s4-l1-t1",
            "topicTitle": "Learn 1D Linked List Problems",
            "problems": [
              {
                "id": "0_introduction_to_linkedlist,_learn_about_struct,_and_how_is_node_represented_",
                "name": "Introduction to LinkedList, learn about struct, and how is node represented ",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "1_inserting_a_node_in_linkedlist",
                "name": "Inserting a node in LinkedList",
                "leetcodeUrl": "https://takeuforward.org/data-structure/insert-node-at-beginning-of-linked-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/linked-list-insertion-1587115620/0",
                "gfgSlug": "linked-list-insertion-1587115620"
              },
              {
                "id": "2_deleting_a_node_in_linkedlist",
                "name": "Deleting a node in LinkedList",
                "leetcodeUrl": "https://leetcode.com/problems/delete-node-in-a-linked-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/delete-a-node-in-single-linked-list/1"
              },
              {
                "id": "3_find_the_length_of_the_linkedlist_[learn_traversal]",
                "name": "Find the length of the linkedlist [Learn traversal]",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_search_an_element_in_the_linkedlist",
                "name": "Search an element in the linkedList",
                "leetcodeUrl": "",
                "gfgUrl": ""
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s4-l2",
        "lessonTitle": "Lesson 2: Learn Doubly Linked List",
        "topics": [
          {
            "topicId": "s4-l2-t1",
            "topicTitle": "Learn Doubly Linked List Problems",
            "problems": [
              {
                "id": "0_introduction_to_dll,_learn_about_struct,_and_how_is_node_represented_",
                "name": "Introduction to DLL, learn about struct, and how is node represented ",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "1_insert_a_node_in_dll",
                "name": "Insert a node in DLL",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/stickler-theif-1587115621/1"
              },
              {
                "id": "2_delete_a_node_in_dll",
                "name": "Delete a node in DLL",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/closest-number5728/1"
              },
              {
                "id": "3_reverse_a_dll",
                "name": "Reverse a DLL",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/reverse-a-doubly-linked-list/1"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s4-l3",
        "lessonTitle": "Lesson 3: Medium Problems on Linked List",
        "topics": [
          {
            "topicId": "s4-l3-t1",
            "topicTitle": "Medium Problems on Linked List Problems",
            "problems": [
              {
                "id": "0_middle_of_a_linkedlist_[tortoise_hare_method]",
                "name": "Middle of a LinkedList [Tortoise Hare Method]",
                "leetcodeUrl": "https://leetcode.com/problems/middle-of-the-linked-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1"
              },
              {
                "id": "1_reverse_a_linkedlist_[iterative]",
                "name": "Reverse a LinkedList [Iterative]",
                "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/reverse-a-linked-list/1"
              },
              {
                "id": "2_reverse_a_ll_[recursive]",
                "name": "Reverse a LL [Recursive]",
                "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/reverse-a-linked-list/1"
              },
              {
                "id": "3_detect_a_loop_in_ll",
                "name": "Detect a loop in LL",
                "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/detect-loop-in-linked-list/1?page=1&category[]=Linked+List&sortBy=submissions"
              },
              {
                "id": "4_find_the_starting_point_in_ll",
                "name": "Find the starting point in LL",
                "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle-ii/",
                "gfgUrl": ""
              },
              {
                "id": "5_length_of_loop_in_ll",
                "name": "Length of Loop in LL",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-length-of-loop/1"
              },
              {
                "id": "6_check_if_ll_is_palindrome_or_not",
                "name": "Check if LL is palindrome or not",
                "leetcodeUrl": "https://leetcode.com/problems/palindrome-linked-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/check-if-linked-list-is-pallindrome/1"
              },
              {
                "id": "7_segrregate_odd_and_even_nodes_in_ll",
                "name": "Segrregate odd and even nodes in LL",
                "leetcodeUrl": "https://leetcode.com/problems/odd-even-linked-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/segregate-even-and-odd-nodes-in-a-linked-list5035/1"
              },
              {
                "id": "8_remove_nth_node_from_the_back_of_the_ll",
                "name": "Remove Nth node from the back of the LL",
                "leetcodeUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/nth-node-from-end-of-linked-list/1?page=1&category[]=Linked+List&sortBy=submissions"
              },
              {
                "id": "9_delete_the_middle_node_of_ll",
                "name": "Delete the middle node of LL",
                "leetcodeUrl": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/#:~:text=You%20are%20given%20the%20head,than%20or%20equal%20to%20x%20.",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/delete-middle-of-linked-list/1"
              },
              {
                "id": "10_sort_ll",
                "name": "Sort LL",
                "leetcodeUrl": "https://leetcode.com/problems/sort-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/linked-list-that-is-sorted-alternatingly/1"
              },
              {
                "id": "11_sort_a_ll_of_0\u2019s_1\u2019s_and_2\u2019s_by_changing_links",
                "name": "Sort a LL of 0\u2019s 1\u2019s and 2\u2019s by changing links",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1"
              },
              {
                "id": "12_find_the_intersection_point_of_y_ll",
                "name": "Find the intersection point of Y LL",
                "leetcodeUrl": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/intersection-of-two-linked-list/1"
              },
              {
                "id": "13_add_1_to_a_number_represented_by_ll",
                "name": "Add 1 to a number represented by LL",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1"
              },
              {
                "id": "14_add_2_numbers_in_ll",
                "name": "Add 2 numbers in LL",
                "leetcodeUrl": "https://leetcode.com/problems/add-two-numbers/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s4-l4",
        "lessonTitle": "Lesson 4: Medium Problems on Doubly Linked List",
        "topics": [
          {
            "topicId": "s4-l4-t1",
            "topicTitle": "Medium Problems on Doubly Linked List Problems",
            "problems": [
              {
                "id": "0_delete_all_occurrences_of_a_key_in_dll",
                "name": "Delete all occurrences of a key in DLL",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "1_find_pairs_with_given_sum_in_dll",
                "name": "Find pairs with given sum in DLL",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-pairs-with-given-sum-in-doubly-linked-list/1"
              },
              {
                "id": "2_remove_duplicates_from_sorted_dll",
                "name": "Remove duplicates from sorted DLL",
                "leetcodeUrl": "",
                "gfgUrl": ""
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s4-l5",
        "lessonTitle": "Lesson 5: Hard Problems on Linked List",
        "topics": [
          {
            "topicId": "s4-l5-t1",
            "topicTitle": "Hard Problems on Linked List Problems",
            "problems": [
              {
                "id": "0_reverse_ll_in_group_of_given_size_k",
                "name": "Reverse LL in group of given size K",
                "leetcodeUrl": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-pairs-with-given-sum-in-doubly-linked-list/1"
              },
              {
                "id": "1_rotate_a_ll",
                "name": "Rotate a LL",
                "leetcodeUrl": "https://leetcode.com/problems/rotate-list/description/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/rotate-a-linked-list/1"
              },
              {
                "id": "2_flattening_of_ll",
                "name": "Flattening of LL",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1"
              },
              {
                "id": "3_clone_a_linked_list_with_random_and_next_pointer",
                "name": "Clone a Linked List with random and next pointer",
                "leetcodeUrl": "https://leetcode.com/problems/copy-list-with-random-pointer/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/clone-a-linked-list-with-next-and-random-pointer/1"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-5",
    "stepTitle": "Step 5: Recursion (Pattern Wise)",
    "lessons": [
      {
        "lessonId": "s5-l1",
        "lessonTitle": "Lesson 1: Get a Strong Hold",
        "topics": [
          {
            "topicId": "s5-l1-t1",
            "topicTitle": "Get a Strong Hold Problems",
            "problems": [
              {
                "id": "0_recursive_implementation_of_atoi()",
                "name": "Recursive Implementation of atoi()",
                "leetcodeUrl": "https://leetcode.com/problems/string-to-integer-atoi/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/implement-atoi/1"
              },
              {
                "id": "1_pow(x,_n)",
                "name": "Pow(x, n)",
                "leetcodeUrl": "https://leetcode.com/problems/powx-n/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/power-of-numbers-1587115620/1"
              },
              {
                "id": "2_count_good_numbers",
                "name": "Count Good numbers",
                "leetcodeUrl": "https://leetcode.com/problems/count-good-numbers/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/good-numbers4629/1"
              },
              {
                "id": "3_sort_a_stack_using_recursion",
                "name": "Sort a stack using recursion",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/sort-a-stack/1"
              },
              {
                "id": "4_reverse_a_stack_using_recursion",
                "name": "Reverse a stack using recursion",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/reverse-a-stack/1"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s5-l2",
        "lessonTitle": "Lesson 2: Subsequences Pattern",
        "topics": [
          {
            "topicId": "s5-l2-t1",
            "topicTitle": "Subsequences Pattern Problems",
            "problems": [
              {
                "id": "0_generate_all_binary_strings",
                "name": "Generate all binary strings",
                "leetcodeUrl": "",
                "gfgUrl": "https://www.geeksforgeeks.org/generate-binary-strings-without-consecutive-1s/"
              },
              {
                "id": "1_generate_paranthesis",
                "name": "Generate Paranthesis",
                "leetcodeUrl": "https://leetcode.com/problems/generate-parentheses/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/generate-all-possible-parentheses/1"
              },
              {
                "id": "2_print_all_subsequences/power_set",
                "name": "Print all subsequences/Power Set",
                "leetcodeUrl": "https://leetcode.com/problems/subsets/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/power-set4302/1"
              },
              {
                "id": "3_learn_all_patterns_of_subsequences_(theory)",
                "name": "Learn All Patterns of Subsequences (Theory)",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_count_all_subsequences_with_sum_k",
                "name": "Count all subsequences with sum K",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/perfect-sum-problem5633/1"
              },
              {
                "id": "5_check_if_there_exists_a_subsequence_with_sum_k",
                "name": "Check if there exists a subsequence with sum K",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "6_combination_sum",
                "name": "Combination Sum",
                "leetcodeUrl": "https://leetcode.com/problems/combination-sum/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/combination-sum-1587115620/1"
              },
              {
                "id": "7_combination_sum-ii",
                "name": "Combination Sum-II",
                "leetcodeUrl": "https://leetcode.com/problems/combination-sum-ii/",
                "gfgUrl": ""
              },
              {
                "id": "8_combination_sum_\u2013_iii",
                "name": "Combination Sum \u2013 III",
                "leetcodeUrl": "https://leetcode.com/problems/combination-sum-iii/",
                "gfgUrl": ""
              },
              {
                "id": "9_subset_sum-i",
                "name": "Subset Sum-I",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/subset-sums2234/1"
              },
              {
                "id": "10_subset_sum-ii",
                "name": "Subset Sum-II",
                "leetcodeUrl": "https://leetcode.com/problems/subsets-ii/",
                "gfgUrl": ""
              },
              {
                "id": "11_letter_combinations_of_a_phone_number",
                "name": "Letter Combinations of a Phone number",
                "leetcodeUrl": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/possible-words-from-phone-digits-1587115620/1"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s5-l3",
        "lessonTitle": "Lesson 3: Try out all Combos /Hard",
        "topics": [
          {
            "topicId": "s5-l3-t1",
            "topicTitle": "Try out all Combos /Hard Problems",
            "problems": [
              {
                "id": "0_palindrome_partitioning",
                "name": "Palindrome Partitioning",
                "leetcodeUrl": "https://leetcode.com/problems/palindrome-partitioning/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/palindromic-patitioning4845/1"
              },
              {
                "id": "1_word_search",
                "name": "Word Search",
                "leetcodeUrl": "https://leetcode.com/problems/word-search/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/word-search/1"
              },
              {
                "id": "2_n_queen",
                "name": "N Queen",
                "leetcodeUrl": "https://leetcode.com/problems/n-queens/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/n-queen-problem0315/1"
              },
              {
                "id": "3_rat_in_a_maze",
                "name": "Rat in a Maze",
                "leetcodeUrl": "https://takeuforward.org/data-structure/rat-in-a-maze/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/rat-in-a-maze-problem/1",
                "leetcodeSlug": "unique-paths",
                "gfgSlug": "rat-in-a-maze-problem"
              },
              {
                "id": "4_word_break",
                "name": "Word Break",
                "leetcodeUrl": "https://leetcode.com/problems/word-break/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/word-break-part-23249/1"
              },
              {
                "id": "5_m_coloring_problem",
                "name": "M Coloring Problem",
                "leetcodeUrl": "https://takeuforward.org/data-structure/m-coloring-problem/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1",
                "gfgSlug": "m-coloring-problem-1587115620"
              },
              {
                "id": "6_sudoko_solver",
                "name": "Sudoko Solver",
                "leetcodeUrl": "https://leetcode.com/problems/sudoku-solver/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/solve-the-sudoku-1587115621/1"
              },
              {
                "id": "7_expression_add_operators",
                "name": "Expression Add Operators",
                "leetcodeUrl": "https://leetcode.com/problems/expression-add-operators/",
                "gfgUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-6",
    "stepTitle": "Step 6: Two Pointers (Combined Problems)",
    "lessons": [
      {
        "lessonId": "s6-l1",
        "lessonTitle": "Lesson 1: Medium Problems",
        "topics": [
          {
            "topicId": "s6-l1-t1",
            "topicTitle": "Medium Problems Problems",
            "problems": [
              {
                "id": "0_longest_substring_without_repeating_characters",
                "name": "Longest Substring Without Repeating Characters",
                "leetcodeUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1"
              },
              {
                "id": "1_max_consecutive_ones_iii",
                "name": "Max Consecutive Ones III",
                "leetcodeUrl": "https://leetcode.com/problems/max-consecutive-ones-iii/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximum-consecutive-ones/1"
              },
              {
                "id": "2_fruit_into_baskets",
                "name": "Fruit Into Baskets",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "3_longest_repeating_character_replacement",
                "name": "Longest repeating character replacement",
                "leetcodeUrl": "https://leetcode.com/problems/longest-repeating-character-replacement/",
                "gfgUrl": ""
              },
              {
                "id": "4_binary_subarray_with_sum",
                "name": "Binary subarray with sum",
                "leetcodeUrl": "https://leetcode.com/problems/binary-subarrays-with-sum/",
                "gfgUrl": ""
              },
              {
                "id": "5_count_number_of_nice_subarrays",
                "name": "Count number of nice subarrays",
                "leetcodeUrl": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/count-subarray-with-k-odds/1"
              },
              {
                "id": "6_number_of_substring_containing_all_three_characters",
                "name": "Number of substring containing all three characters",
                "leetcodeUrl": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/count-substring/1"
              },
              {
                "id": "7_maximum_point_you_can_obtain_from_cards",
                "name": "Maximum point you can obtain from cards",
                "leetcodeUrl": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
                "gfgUrl": ""
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s6-l2",
        "lessonTitle": "Lesson 2: Hard Problems",
        "topics": [
          {
            "topicId": "s6-l2-t1",
            "topicTitle": "Hard Problems Problems",
            "problems": [
              {
                "id": "0_longest_substring_with_at_most_k_distinct_characters",
                "name": "Longest Substring with At Most K Distinct Characters",
                "leetcodeUrl": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1"
              },
              {
                "id": "1_subarray_with_k_different_integers",
                "name": "Subarray with k different integers",
                "leetcodeUrl": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
                "gfgUrl": ""
              },
              {
                "id": "2_minimum_window_substring",
                "name": "Minimum Window Substring",
                "leetcodeUrl": "https://leetcode.com/problems/minimum-window-substring/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1"
              },
              {
                "id": "3_minimum_window_subsequence",
                "name": "Minimum Window Subsequence",
                "leetcodeUrl": "https://leetcode.com/problems/minimum-window-subsequence/",
                "gfgUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-7",
    "stepTitle": "Step 7: Strings (Hard Problems and Standard Algorithms)",
    "lessons": [
      {
        "lessonId": "s7-l1",
        "lessonTitle": "Lesson 1: Hard Problems",
        "topics": [
          {
            "topicId": "s7-l1-t1",
            "topicTitle": "Hard Problems Problems",
            "problems": [
              {
                "id": "0_minimum_number_of_bracket_reversals_needed_to_make_an_expression_balanced",
                "name": "Minimum number of bracket reversals needed to make an expression balanced",
                "leetcodeUrl": "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/count-the-reversals0401/1"
              },
              {
                "id": "1_count_and_say",
                "name": "Count and say",
                "leetcodeUrl": "https://leetcode.com/problems/count-and-say/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/decode-the-pattern1138/1"
              },
              {
                "id": "2_hashing_in_strings_|_theory",
                "name": "Hashing In Strings | Theory",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "3_rabin_karp",
                "name": "Rabin Karp",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/31272eef104840f7430ad9fd1d43b434a4b9596b/1"
              },
              {
                "id": "4_z-function",
                "name": "Z-Function",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/8dcd25918295847b4ced54055eae35a8501181c1/1"
              },
              {
                "id": "5_kmp_algo_/_lps(pi)_array",
                "name": "KMP algo / LPS(pi) array",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/search-pattern0205/1"
              },
              {
                "id": "6_shortest_palindrome",
                "name": "Shortest Palindrome",
                "leetcodeUrl": "https://leetcode.com/problems/shortest-palindrome/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-characters-to-be-added-at-front-to-make-string-palindrome/1"
              },
              {
                "id": "7_longest_happy_prefix",
                "name": "Longest happy prefix",
                "leetcodeUrl": "https://leetcode.com/problems/longest-happy-prefix/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-prefix-suffix2527/1"
              },
              {
                "id": "8_count_palindromic_subsequence_in_given_string",
                "name": "Count palindromic subsequence in given string",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/count-palindromic-subsequences/1#:~:text=Given%20a%20string%20str%20of,formed%20from%20the%20string%20str.&text=Your%20Task%3A,read%20input%20or%20print%20anything."
              }
            ]
          }
        ]
      }
    ]
  }
,
  {
    "stepId": "step-8",
    "stepTitle": "Step 8: Bit Manipulation",
    "lessons": [
      {
        "lessonId": "s8-l1",
        "lessonTitle": "Lesson 1: Learn Bit Manipulation",
        "topics": [
          {
            "topicId": "s8-l1-t1",
            "topicTitle": "Learn Bit Manipulation Problems",
            "problems": [
              {
                "id": "0_introduction_to_bit_manipulation_[theory]",
                "name": "Introduction to Bit Manipulation [Theory]",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "1_check_if_the_i_th_bit_is_set_or_not",
                "name": "Check if the i-th bit is set or not",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/check-whether-k-th-bit-is-set-or-not-1587115620/1",
                "gfgSlug": "check-whether-k-th-bit-is-set-or-not-1587115620"
              },
              {
                "id": "2_check_if_a_number_is_odd_or_not",
                "name": "Check if a number is odd or not",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/odd-or-even3618/1",
                "gfgSlug": "odd-or-even3618"
              },
              {
                "id": "3_check_if_a_number_is_power_of_2_or_not",
                "name": "Check if a number is power of 2 or not",
                "leetcodeUrl": "https://leetcode.com/problems/power-of-two/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/power-of-2-1587115620/1",
                "leetcodeSlug": "power-of-two",
                "gfgSlug": "power-of-2-1587115620"
              },
              {
                "id": "4_count_the_number_of_set_bits",
                "name": "Count the number of set bits",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/count-total-set-bits-1587115620/1",
                "gfgSlug": "count-total-set-bits-1587115620"
              },
              {
                "id": "5_set_unset_the_rightmost_unset_bit",
                "name": "Set/Unset the rightmost unset bit",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/set-the-rightmost-unset-bit4436/1",
                "gfgSlug": "set-the-rightmost-unset-bit4436"
              },
              {
                "id": "6_swap_two_numbers",
                "name": "Swap two numbers",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/swap-two-numbers3844/1",
                "gfgSlug": "swap-two-numbers3844"
              },
              {
                "id": "7_divide_two_integers_without_using_multiplication,_division_and_mod_operator",
                "name": "Divide two integers without using multiplication, division and mod operator",
                "leetcodeUrl": "https://leetcode.com/problems/divide-two-integers/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/division-without-using-multiplication-division-and-mod-operator/0",
                "leetcodeSlug": "divide-two-integers",
                "gfgSlug": "division-without-using-multiplication-division-and-mod-operator"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s8-l2",
        "lessonTitle": "Lesson 2: Interview Problems",
        "topics": [
          {
            "topicId": "s8-l2-t1",
            "topicTitle": "Interview Problems Problems",
            "problems": [
              {
                "id": "0_count_number_of_bits_to_be_flipped_to_convert_a_to_b",
                "name": "Count number of bits to be flipped to convert A to B",
                "leetcodeUrl": "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/bit-difference-1587115620/1",
                "leetcodeSlug": "minimum-bit-flips-to-convert-number",
                "gfgSlug": "bit-difference-1587115620"
              },
              {
                "id": "1_find_the_number_that_appears_odd_number_of_times",
                "name": "Find the number that appears odd number of times",
                "leetcodeUrl": "https://leetcode.com/problems/single-number/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-the-odd-occurence4820/1",
                "leetcodeSlug": "single-number",
                "gfgSlug": "find-the-odd-occurence4820"
              },
              {
                "id": "2_power_set",
                "name": "Power Set",
                "leetcodeUrl": "https://leetcode.com/problems/subsets/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/power-set4302/1",
                "leetcodeSlug": "subsets",
                "gfgSlug": "power-set4302"
              },
              {
                "id": "3_find_xor_of_numbers_from_l_to_r",
                "name": "Find xor of numbers from L to R",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_find_the_two_numbers_appearing_odd_number_of_times",
                "name": "Find the two numbers appearing odd number of times",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/two-numbers-with-odd-occurrences5846/1",
                "gfgSlug": "two-numbers-with-odd-occurrences5846"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s8-l3",
        "lessonTitle": "Lesson 3: Advanced Maths",
        "topics": [
          {
            "topicId": "s8-l3-t1",
            "topicTitle": "Advanced Maths Problems",
            "problems": [
              {
                "id": "0_print_prime_factors_of_a_number",
                "name": "Print Prime Factors of a Number",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/prime-factors5052/1",
                "gfgSlug": "prime-factors5052"
              },
              {
                "id": "1_all_divisors_of_a_number",
                "name": "All Divisors of a Number",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "2_sieve_of_eratosthenes",
                "name": "Sieve of Eratosthenes",
                "leetcodeUrl": "https://leetcode.com/problems/count-primes/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1",
                "leetcodeSlug": "count-primes",
                "gfgSlug": "sieve-of-eratosthenes5242"
              },
              {
                "id": "3_find_prime_factorisation_of_a_number_using_sieve",
                "name": "Find Prime Factorisation of a Number using Sieve",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_power(n,_x)",
                "name": "Power(n, x)",
                "leetcodeUrl": "https://leetcode.com/problems/powx-n/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/power-of-numbers-1587115620/1",
                "leetcodeSlug": "powx-n",
                "gfgSlug": "power-of-numbers-1587115620"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-9",
    "stepTitle": "Step 9: Stack & Queue",
    "lessons": [
      {
        "lessonId": "s9-l1",
        "lessonTitle": "Lesson 1: Learning",
        "topics": [
          {
            "topicId": "s9-l1-t1",
            "topicTitle": "Learning Problems",
            "problems": [
              {
                "id": "0_implement_stack_using_arrays",
                "name": "Implement Stack using Arrays",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/implement-stack-using-array/1",
                "gfgSlug": "implement-stack-using-array"
              },
              {
                "id": "1_implement_queue_using_arrays",
                "name": "Implement Queue using Arrays",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/implement-queue-using-array/1",
                "gfgSlug": "implement-queue-using-array"
              },
              {
                "id": "2_implement_stack_using_queue",
                "name": "Implement Stack using Queue",
                "leetcodeUrl": "https://leetcode.com/problems/implement-stack-using-queues/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/stack-using-two-queues/1",
                "leetcodeSlug": "implement-stack-using-queues",
                "gfgSlug": "stack-using-two-queues"
              },
              {
                "id": "3_implement_queue_using_stack",
                "name": "Implement Queue using Stack",
                "leetcodeUrl": "https://leetcode.com/problems/implement-queue-using-stacks/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/queue-using-stack/1",
                "leetcodeSlug": "implement-queue-using-stacks",
                "gfgSlug": "queue-using-stack"
              },
              {
                "id": "4_implement_stack_using_linkedlist",
                "name": "Implement stack using Linkedlist",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/implement-stack-using-linked-list/1",
                "gfgSlug": "implement-stack-using-linked-list"
              },
              {
                "id": "5_implement_queue_using_linkedlist",
                "name": "Implement queue using Linkedlist",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/implement-queue-using-linked-list/1",
                "gfgSlug": "implement-queue-using-linked-list"
              },
              {
                "id": "6_check_for_balanced_paranthesis",
                "name": "Check for balanced paranthesis",
                "leetcodeUrl": "https://leetcode.com/problems/valid-parentheses/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/parenthesis-checker2744/1",
                "leetcodeSlug": "valid-parentheses",
                "gfgSlug": "parenthesis-checker2744"
              },
              {
                "id": "7_implement_min_stack",
                "name": "Implement Min Stack",
                "leetcodeUrl": "https://leetcode.com/problems/min-stack/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/get-minimum-element-from-stack/1",
                "leetcodeSlug": "min-stack",
                "gfgSlug": "get-minimum-element-from-stack"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s9-l2",
        "lessonTitle": "Lesson 2: Prefix, Infix, Postfix Conversion Problems",
        "topics": [
          {
            "topicId": "s9-l2-t1",
            "topicTitle": "Prefix, Infix, Postfix Conversion Problems Problems",
            "problems": [
              {
                "id": "0_infix_to_postfix_conversion_using_stack",
                "name": "Infix to Postfix Conversion using Stack",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/infix-to-postfix-1587115620/1",
                "gfgSlug": "infix-to-postfix-1587115620"
              },
              {
                "id": "1_prefix_to_infix_conversion",
                "name": "Prefix to Infix Conversion",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "2_prefix_to_postfix_conversion",
                "name": "Prefix to Postfix Conversion",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "3_postfix_to_prefix_conversion",
                "name": "Postfix to Prefix Conversion",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_postfix_to_infix",
                "name": "Postfix to Infix",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "5_convert_infix_to_prefix_notation",
                "name": "Convert Infix To Prefix Notation",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/infix-to-postfix-1587115620/1",
                "gfgSlug": "infix-to-postfix-1587115620"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s9-l3",
        "lessonTitle": "Lesson 3: Monotonic Stack /Queue Problem [Imp]",
        "topics": [
          {
            "topicId": "s9-l3-t1",
            "topicTitle": "Monotonic Stack /Queue Problem [Imp] Problems",
            "problems": [
              {
                "id": "0_next_greater_element",
                "name": "Next Greater Element",
                "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-i/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/next-larger-element-1587115620/1",
                "leetcodeSlug": "next-greater-element-i",
                "gfgSlug": "next-larger-element-1587115620"
              },
              {
                "id": "1_next_greater_element_ii",
                "name": "Next Greater Element - II",
                "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-ii/",
                "gfgUrl": "",
                "leetcodeSlug": "next-greater-element-ii"
              },
              {
                "id": "2_next_smaller_element",
                "name": "Next Smaller Element",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/immediate-smaller-element1142/1",
                "gfgSlug": "immediate-smaller-element1142"
              },
              {
                "id": "3_number_of_nges_to_the_right",
                "name": "Number of NGEs to the right",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_trapping_rainwater",
                "name": "Trapping Rainwater",
                "leetcodeUrl": "https://leetcode.com/problems/trapping-rain-water/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1",
                "leetcodeSlug": "trapping-rain-water",
                "gfgSlug": "trapping-rain-water-1587115621"
              },
              {
                "id": "5_sum_of_subarray_minimum",
                "name": "Sum of subarray minimum",
                "leetcodeUrl": "https://leetcode.com/problems/sum-of-subarray-minimums/",
                "gfgUrl": "",
                "leetcodeSlug": "sum-of-subarray-minimums"
              },
              {
                "id": "6_stock_span_problem",
                "name": "Stock span problem",
                "leetcodeUrl": "https://leetcode.com/problems/online-stock-span/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/stock-span-problem-1587115621/1",
                "leetcodeSlug": "online-stock-span",
                "gfgSlug": "stock-span-problem-1587115621"
              },
              {
                "id": "7_asteroid_collision",
                "name": "Asteroid Collision",
                "leetcodeUrl": "https://leetcode.com/problems/asteroid-collision/",
                "gfgUrl": "",
                "leetcodeSlug": "asteroid-collision"
              },
              {
                "id": "8_sum_of_subarray_ranges",
                "name": "Sum of subarray ranges",
                "leetcodeUrl": "https://leetcode.com/problems/sum-of-subarray-ranges/",
                "gfgUrl": "",
                "leetcodeSlug": "sum-of-subarray-ranges"
              },
              {
                "id": "9_remove_k_digits",
                "name": "Remove k Digits",
                "leetcodeUrl": "https://leetcode.com/problems/remove-k-digits/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/remove-k-digits/1",
                "leetcodeSlug": "remove-k-digits",
                "gfgSlug": "remove-k-digits"
              },
              {
                "id": "10_largest_rectangle_in_a_histogram",
                "name": "Largest rectangle in a histogram",
                "leetcodeUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1",
                "leetcodeSlug": "largest-rectangle-in-histogram",
                "gfgSlug": "maximum-rectangular-area-in-a-histogram-1587115620"
              },
              {
                "id": "11_maximal_rectangles",
                "name": "Maximal Rectangles",
                "leetcodeUrl": "https://leetcode.com/problems/maximal-rectangle/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/max-rectangle/1",
                "leetcodeSlug": "maximal-rectangle",
                "gfgSlug": "max-rectangle"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s9-l4",
        "lessonTitle": "Lesson 4: Implementation Problems",
        "topics": [
          {
            "topicId": "s9-l4-t1",
            "topicTitle": "Implementation Problems Problems",
            "problems": [
              {
                "id": "0_sliding_window_maximum",
                "name": "Sliding Window maximum",
                "leetcodeUrl": "https://leetcode.com/problems/sliding-window-maximum/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1",
                "leetcodeSlug": "sliding-window-maximum",
                "gfgSlug": "maximum-of-all-subarrays-of-size-k3101"
              },
              {
                "id": "1_stock_span_problem",
                "name": "Stock Span Problem",
                "leetcodeUrl": "https://leetcode.com/problems/online-stock-span/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/stock-span-problem-1587115621/1",
                "leetcodeSlug": "online-stock-span",
                "gfgSlug": "stock-span-problem-1587115621"
              },
              {
                "id": "2_the_celebrity_problem",
                "name": "The Celebrity Problem",
                "leetcodeUrl": "https://leetcode.com/accounts/login/?next=/problems/find-the-celebrity/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/the-celebrity-problem/1",
                "gfgSlug": "the-celebrity-problem"
              },
              {
                "id": "3_rotten_oranges",
                "name": "Rotten Oranges",
                "leetcodeUrl": "https://leetcode.com/problems/rotting-oranges/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/rotten-oranges2536/1",
                "leetcodeSlug": "rotting-oranges",
                "gfgSlug": "rotten-oranges2536"
              },
              {
                "id": "4_lru_cache_(important)",
                "name": "LRU cache (IMPORTANT)",
                "leetcodeUrl": "https://leetcode.com/problems/lru-cache/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/lru-cache/1",
                "leetcodeSlug": "lru-cache",
                "gfgSlug": "lru-cache"
              },
              {
                "id": "5_lfu_cache",
                "name": "LFU cache",
                "leetcodeUrl": "https://leetcode.com/problems/lfu-cache/",
                "gfgUrl": "",
                "leetcodeSlug": "lfu-cache"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-10",
    "stepTitle": "Step 10: Heaps",
    "lessons": [
      {
        "lessonId": "s10-l1",
        "lessonTitle": "Lesson 1: Learning",
        "topics": [
          {
            "topicId": "s10-l1-t1",
            "topicTitle": "Learning Problems",
            "problems": [
              {
                "id": "0_introduction_to_priority_queues_using_binary_heaps",
                "name": "Introduction to Priority Queues using Binary Heaps",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "1_min_heap_and_max_heap_implementation",
                "name": "Min Heap and Max Heap Implementation",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/operations-on-binary-min-heap/1",
                "gfgSlug": "operations-on-binary-min-heap"
              },
              {
                "id": "2_check_if_an_array_represents_a_min_heap_or_not",
                "name": "Check if an array represents a min-heap or not",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/does-array-represent-heap4345/1",
                "gfgSlug": "does-array-represent-heap4345"
              },
              {
                "id": "3_convert_min_heap_to_max_heap",
                "name": "Convert min Heap to max Heap",
                "leetcodeUrl": "",
                "gfgUrl": ""
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s10-l2",
        "lessonTitle": "Lesson 2: Programming Medium Problems",
        "topics": [
          {
            "topicId": "s10-l2-t1",
            "topicTitle": "Programming Medium Problems Problems",
            "problems": [
              {
                "id": "0_kth_largest_element_in_an_array_[use_priority_queue]",
                "name": "Kth largest element in an array [use priority queue]",
                "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/k-largest-elements3736/1",
                "leetcodeSlug": "kth-largest-element-in-an-array",
                "gfgSlug": "k-largest-elements3736"
              },
              {
                "id": "1_kth_smallest_element_in_an_array_[use_priority_queue]",
                "name": "Kth smallest element in an array [use priority queue]",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/kth-smallest-element5635/1",
                "gfgSlug": "kth-smallest-element5635"
              },
              {
                "id": "2_sort_k_sorted_array",
                "name": "Sort K sorted array",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/merge-k-sorted-arrays/1",
                "gfgSlug": "merge-k-sorted-arrays"
              },
              {
                "id": "3_merge_m_sorted_lists",
                "name": "Merge M sorted Lists",
                "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1",
                "leetcodeSlug": "merge-k-sorted-lists",
                "gfgSlug": "merge-k-sorted-linked-lists"
              },
              {
                "id": "4_replace_each_array_element_by_its_corresponding_rank",
                "name": "Replace each array element by its corresponding rank",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "5_task_scheduler",
                "name": "Task Scheduler",
                "leetcodeUrl": "https://leetcode.com/problems/task-scheduler/",
                "gfgUrl": "",
                "leetcodeSlug": "task-scheduler"
              },
              {
                "id": "6_hands_of_straights",
                "name": "Hands of Straights",
                "leetcodeUrl": "https://leetcode.com/problems/hand-of-straights/",
                "gfgUrl": "",
                "leetcodeSlug": "hand-of-straights"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s10-l3",
        "lessonTitle": "Lesson 3: Hard Problems",
        "topics": [
          {
            "topicId": "s10-l3-t1",
            "topicTitle": "Hard Problems Problems",
            "problems": [
              {
                "id": "0_design_twitter",
                "name": "Design twitter",
                "leetcodeUrl": "https://leetcode.com/problems/design-twitter/",
                "gfgUrl": "",
                "leetcodeSlug": "design-twitter"
              },
              {
                "id": "1_connect_`n`_ropes_with_minimal_cost",
                "name": "Connect `n` ropes with minimal cost",
                "leetcodeUrl": "",
                "gfgUrl": "https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1"
              },
              {
                "id": "2_kth_largest_element_in_a_stream_of_running_integers",
                "name": "Kth largest element in a stream of running integers",
                "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-a-stream/#:~:text=Implement%20KthLargest%20class%3A,largest%20element%20in%20the%20stream.",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/kth-largest-element-in-a-stream2220/1",
                "leetcodeSlug": "kth-largest-element-in-a-stream",
                "gfgSlug": "kth-largest-element-in-a-stream2220"
              },
              {
                "id": "3_maximum_sum_combination",
                "name": "Maximum Sum Combination",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_find_median_from_data_stream",
                "name": "Find Median from Data Stream",
                "leetcodeUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1",
                "leetcodeSlug": "find-median-from-data-stream",
                "gfgSlug": "find-median-in-a-stream-1587115620"
              },
              {
                "id": "5_k_most_frequent_elements",
                "name": "K most frequent elements",
                "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/top-k-frequent-elements-in-array/1",
                "leetcodeSlug": "top-k-frequent-elements",
                "gfgSlug": "top-k-frequent-elements-in-array"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-11",
    "stepTitle": "Step 11: Greedy",
    "lessons": [
      {
        "lessonId": "s11-l1",
        "lessonTitle": "Lesson 1: Easy Problems",
        "topics": [
          {
            "topicId": "s11-l1-t1",
            "topicTitle": "Easy Problems Problems",
            "problems": [
              {
                "id": "0_assign_cookies",
                "name": "Assign Cookies",
                "leetcodeUrl": "https://leetcode.com/problems/assign-cookies/",
                "gfgUrl": "",
                "leetcodeSlug": "assign-cookies"
              },
              {
                "id": "1_fractional_knapsack_problem",
                "name": "Fractional Knapsack Problem",
                "leetcodeUrl": "https://takeuforward.org/data-structure/fractional-knapsack-problem-greedy-approach/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1",
                "gfgSlug": "fractional-knapsack-1587115620"
              },
              {
                "id": "2_greedy_algorithm_to_find_minimum",
                "name": "Greedy algorithm to find minimum",
                "leetcodeUrl": "https://takeuforward.org/data-structure/find-minimum-number-of-coins/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/-minimum-number-of-coins4426/1",
                "gfgSlug": "-minimum-number-of-coins4426"
              },
              {
                "id": "3_lemonade_change",
                "name": "Lemonade Change",
                "leetcodeUrl": "https://leetcode.com/problems/lemonade-change/",
                "gfgUrl": "",
                "leetcodeSlug": "lemonade-change"
              },
              {
                "id": "4_valid_paranthesis_checker",
                "name": "Valid Paranthesis Checker",
                "leetcodeUrl": "https://leetcode.com/problems/valid-parenthesis-string/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/parenthesis-checker2744/1",
                "leetcodeSlug": "valid-parenthesis-string",
                "gfgSlug": "parenthesis-checker2744"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s11-l2",
        "lessonTitle": "Lesson 2: Medium /Hard Problems",
        "topics": [
          {
            "topicId": "s11-l2-t1",
            "topicTitle": "Medium /Hard Problems Problems",
            "problems": [
              {
                "id": "0_n_meetings_in_one_room",
                "name": "N meetings in one room",
                "leetcodeUrl": "https://takeuforward.org/data-structure/n-meetings-in-one-room/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1",
                "gfgSlug": "n-meetings-in-one-room-1587115620"
              },
              {
                "id": "1_jump_game",
                "name": "Jump Game",
                "leetcodeUrl": "https://leetcode.com/problems/jump-game/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/jump-game/1",
                "leetcodeSlug": "jump-game",
                "gfgSlug": "jump-game"
              },
              {
                "id": "2_jump_game_2",
                "name": "Jump Game 2",
                "leetcodeUrl": "https://leetcode.com/problems/jump-game-ii/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1",
                "leetcodeSlug": "jump-game-ii",
                "gfgSlug": "minimum-number-of-jumps-1587115620"
              },
              {
                "id": "3_minimum_number_of_platforms_required_for_a_railway",
                "name": "Minimum number of platforms required for a railway",
                "leetcodeUrl": "https://takeuforward.org/data-structure/minimum-number-of-platforms-required-for-a-railway/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1",
                "gfgSlug": "minimum-platforms-1587115620"
              },
              {
                "id": "4_job_sequencing_problem",
                "name": "Job sequencing Problem",
                "leetcodeUrl": "https://takeuforward.org/data-structure/job-sequencing-problem/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1",
                "gfgSlug": "job-sequencing-problem-1587115620"
              },
              {
                "id": "5_candy",
                "name": "Candy",
                "leetcodeUrl": "https://leetcode.com/problems/candy/",
                "gfgUrl": "",
                "leetcodeSlug": "candy"
              },
              {
                "id": "6_program_for_shortest_job_first_(or_sjf)_cpu_scheduling",
                "name": "Program for Shortest Job First (or SJF) CPU Scheduling",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "7_program_for_least_recently_used_(lru)_page_replacement_algorithm",
                "name": "Program for Least Recently Used (LRU) Page Replacement Algorithm",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/page-faults-in-lru5603/1",
                "gfgSlug": "page-faults-in-lru5603"
              },
              {
                "id": "8_insert_interval",
                "name": "Insert Interval",
                "leetcodeUrl": "https://takeuforward.org/?s=Insert+Interval",
                "gfgUrl": ""
              },
              {
                "id": "9_merge_intervals",
                "name": "Merge Intervals",
                "leetcodeUrl": "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/8a644e94faaa94968d8665ba9e0a80d1ae3e0a2d/1",
                "gfgSlug": "8a644e94faaa94968d8665ba9e0a80d1ae3e0a2d"
              },
              {
                "id": "10_non_overlapping_intervals",
                "name": "Non-overlapping Intervals",
                "leetcodeUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
                "gfgUrl": "",
                "leetcodeSlug": "non-overlapping-intervals"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-12",
    "stepTitle": "Step 12: Binary Tree",
    "lessons": [
      {
        "lessonId": "s12-l1",
        "lessonTitle": "Lesson 1: Traversals",
        "topics": [
          {
            "topicId": "s12-l1-t1",
            "topicTitle": "Traversals Problems",
            "problems": [
              {
                "id": "0_introduction_to_trees",
                "name": "Introduction to Trees",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "1_binary_tree_representation_in_c++",
                "name": "Binary Tree Representation in C++",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "2_binary_tree_representation_in_java",
                "name": "Binary Tree Representation in Java",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "3_binary_tree_traversals_in_binary_tree",
                "name": "Binary Tree Traversals in Binary Tree",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_preorder_traversal_of_binary_tree",
                "name": "Preorder Traversal of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/preorder-traversal/1",
                "leetcodeSlug": "binary-tree-preorder-traversal",
                "gfgSlug": "preorder-traversal"
              },
              {
                "id": "5_inorder_traversal_of_binary_tree",
                "name": "Inorder Traversal of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/inorder-traversal/1",
                "leetcodeSlug": "binary-tree-inorder-traversal",
                "gfgSlug": "inorder-traversal"
              },
              {
                "id": "6_post_order_traversal_of_binary_tree",
                "name": "Post-order Traversal of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/postorder-traversal/1",
                "leetcodeSlug": "binary-tree-postorder-traversal",
                "gfgSlug": "postorder-traversal"
              },
              {
                "id": "7_level_order_traversal_level_order_traversal_in_spiral_form",
                "name": "Level order Traversal / Level order traversal in spiral form",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/level-order-traversal-in-spiral-form/1",
                "leetcodeSlug": "binary-tree-level-order-traversal",
                "gfgSlug": "level-order-traversal-in-spiral-form"
              },
              {
                "id": "8_iterative_preorder_traversal_of_binary_tree",
                "name": "Iterative Preorder Traversal of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/preorder-traversal/1",
                "leetcodeSlug": "binary-tree-preorder-traversal",
                "gfgSlug": "preorder-traversal"
              },
              {
                "id": "9_iterative_inorder_traversal_of_binary_tree",
                "name": "Iterative Inorder Traversal of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/inorder-traversal/1",
                "leetcodeSlug": "binary-tree-inorder-traversal",
                "gfgSlug": "inorder-traversal"
              },
              {
                "id": "10_post_order_traversal_of_binary_tree_using_2_stack",
                "name": "Post-order Traversal of Binary Tree using 2 stack",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/postorder-traversal/1",
                "leetcodeSlug": "binary-tree-postorder-traversal",
                "gfgSlug": "postorder-traversal"
              },
              {
                "id": "11_post_order_traversal_of_binary_tree_using_1_stack",
                "name": "Post-order Traversal of Binary Tree using 1 stack",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/postorder-traversal/1",
                "leetcodeSlug": "binary-tree-postorder-traversal",
                "gfgSlug": "postorder-traversal"
              },
              {
                "id": "12_preorder,_inorder,_and_postorder_traversal_in_one_traversal",
                "name": "Preorder, Inorder, and Postorder Traversal in one Traversal",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/postorder-traversal-iterative/1",
                "gfgSlug": "postorder-traversal-iterative"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s12-l2",
        "lessonTitle": "Lesson 2: Medium Problems",
        "topics": [
          {
            "topicId": "s12-l2-t1",
            "topicTitle": "Medium Problems Problems",
            "problems": [
              {
                "id": "0_height_of_a_binary_tree",
                "name": "Height of a Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/height-of-binary-tree/1",
                "leetcodeSlug": "maximum-depth-of-binary-tree",
                "gfgSlug": "height-of-binary-tree"
              },
              {
                "id": "1_check_if_the_binary_tree_is_height_balanced_or_not",
                "name": "Check if the Binary tree is height-balanced or not",
                "leetcodeUrl": "https://leetcode.com/problems/balanced-binary-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/check-for-balanced-tree/1",
                "leetcodeSlug": "balanced-binary-tree",
                "gfgSlug": "check-for-balanced-tree"
              },
              {
                "id": "2_diameter_of_binary_tree",
                "name": "Diameter of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/diameter-of-binary-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/diameter-of-binary-tree/1",
                "leetcodeSlug": "diameter-of-binary-tree",
                "gfgSlug": "diameter-of-binary-tree"
              },
              {
                "id": "3_maximum_path_sum",
                "name": "Maximum path sum",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximum-path-sum-from-any-node/1",
                "leetcodeSlug": "binary-tree-maximum-path-sum",
                "gfgSlug": "maximum-path-sum-from-any-node"
              },
              {
                "id": "4_check_if_two_trees_are_identical_or_not",
                "name": "Check if two trees are identical or not",
                "leetcodeUrl": "https://leetcode.com/problems/same-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1",
                "leetcodeSlug": "same-tree",
                "gfgSlug": "determine-if-two-trees-are-identical"
              },
              {
                "id": "5_zig_zag_traversal_of_binary_tree",
                "name": "Zig Zag Traversal of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/zigzag-tree-traversal/1",
                "leetcodeSlug": "binary-tree-zigzag-level-order-traversal",
                "gfgSlug": "zigzag-tree-traversal"
              },
              {
                "id": "6_boundary_traversal_of_binary_tree",
                "name": "Boundary Traversal of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/boundary-of-binary-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/0",
                "leetcodeSlug": "boundary-of-binary-tree",
                "gfgSlug": "boundary-traversal-of-binary-tree"
              },
              {
                "id": "7_vertical_order_traversal_of_binary_tree",
                "name": "Vertical Order Traversal of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/print-a-binary-tree-in-vertical-order/0",
                "leetcodeSlug": "vertical-order-traversal-of-a-binary-tree",
                "gfgSlug": "print-a-binary-tree-in-vertical-order"
              },
              {
                "id": "8_top_view_of_binary_tree",
                "name": "Top View of Binary Tree",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/top-view-of-binary-tree/1",
                "gfgSlug": "top-view-of-binary-tree"
              },
              {
                "id": "9_bottom_view_of_binary_tree",
                "name": "Bottom View of Binary Tree",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1",
                "gfgSlug": "bottom-view-of-binary-tree"
              },
              {
                "id": "10_right_left_view_of_binary_tree",
                "name": "Right/Left View of Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-right-side-view/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/left-view-of-binary-tree/1",
                "leetcodeSlug": "binary-tree-right-side-view",
                "gfgSlug": "left-view-of-binary-tree"
              },
              {
                "id": "11_symmetric_binary_tree",
                "name": "Symmetric Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/symmetric-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/symmetric-tree/1",
                "leetcodeSlug": "symmetric-tree",
                "gfgSlug": "symmetric-tree"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s12-l3",
        "lessonTitle": "Lesson 3: Hard Problems",
        "topics": [
          {
            "topicId": "s12-l3-t1",
            "topicTitle": "Hard Problems Problems",
            "problems": [
              {
                "id": "0_root_to_node_path_in_binary_tree",
                "name": "Root to Node Path in Binary Tree",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/root-to-leaf-paths/1",
                "gfgSlug": "root-to-leaf-paths"
              },
              {
                "id": "1_lca_in_binary_tree",
                "name": "LCA in Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-binary-tree/1",
                "leetcodeSlug": "lowest-common-ancestor-of-a-binary-tree",
                "gfgSlug": "lowest-common-ancestor-in-a-binary-tree"
              },
              {
                "id": "2_maximum_width_of_a_binary_tree",
                "name": "Maximum width of a Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximum-width-of-tree/1",
                "leetcodeSlug": "maximum-width-of-binary-tree",
                "gfgSlug": "maximum-width-of-tree"
              },
              {
                "id": "3_check_for_children_sum_property",
                "name": "Check for Children Sum Property",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/children-sum-parent/1",
                "gfgSlug": "children-sum-parent"
              },
              {
                "id": "4_print_all_the_nodes_at_a_distance_of_k_in_a_binary_tree",
                "name": "Print all the Nodes at a distance of K in a Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/nodes-at-given-distance-in-binary-tree/1",
                "leetcodeSlug": "all-nodes-distance-k-in-binary-tree",
                "gfgSlug": "nodes-at-given-distance-in-binary-tree"
              },
              {
                "id": "5_minimum_time_taken_to_burn_the_binary_tree_from_a_node",
                "name": "Minimum time taken to BURN the Binary Tree from a Node",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/burning-tree/1",
                "gfgSlug": "burning-tree"
              },
              {
                "id": "6_count_total_nodes_in_a_complete_binary_tree",
                "name": "Count total Nodes in a COMPLETE Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/count-complete-tree-nodes/",
                "gfgUrl": "",
                "leetcodeSlug": "count-complete-tree-nodes"
              },
              {
                "id": "7_requirements_needed_to_construct_a_unique_binary_tree_theory",
                "name": "Requirements needed to construct a Unique Binary Tree | Theory",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "8_construct_binary_tree_from_inorder_and_preorder",
                "name": "Construct Binary Tree from inorder and preorder",
                "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/construct-tree-1/1",
                "leetcodeSlug": "construct-binary-tree-from-preorder-and-inorder-traversal",
                "gfgSlug": "construct-tree-1"
              },
              {
                "id": "9_construct_the_binary_tree_from_postorder_and_inorder_traversal",
                "name": "Construct the Binary Tree from Postorder and Inorder Traversal",
                "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/tree-from-postorder-and-inorder/1",
                "leetcodeSlug": "construct-binary-tree-from-inorder-and-postorder-traversal",
                "gfgSlug": "tree-from-postorder-and-inorder"
              },
              {
                "id": "10_serialize_and_deserialize_binary_tree",
                "name": "Serialize and deserialize Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1",
                "leetcodeSlug": "serialize-and-deserialize-binary-tree",
                "gfgSlug": "serialize-and-deserialize-a-binary-tree"
              },
              {
                "id": "11_morris_preorder_traversal_of_a_binary_tree",
                "name": "Morris Preorder Traversal of a Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
                "gfgUrl": "",
                "leetcodeSlug": "binary-tree-inorder-traversal"
              },
              {
                "id": "12_morris_inorder_traversal_of_a_binary_tree",
                "name": "Morris Inorder Traversal of a Binary Tree",
                "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
                "gfgUrl": "",
                "leetcodeSlug": "binary-tree-inorder-traversal"
              },
              {
                "id": "13_flatten_binary_tree_to_linkedlist",
                "name": "Flatten Binary Tree to LinkedList",
                "leetcodeUrl": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/flatten-binary-tree-to-linked-list/1",
                "leetcodeSlug": "flatten-binary-tree-to-linked-list",
                "gfgSlug": "flatten-binary-tree-to-linked-list"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-13",
    "stepTitle": "Step 13: Binary Search Tree",
    "lessons": [
      {
        "lessonId": "s13-l1",
        "lessonTitle": "Lesson 1: Concepts",
        "topics": [
          {
            "topicId": "s13-l1-t1",
            "topicTitle": "Concepts Problems",
            "problems": [
              {
                "id": "0_introduction_to_binary_search_tree",
                "name": "Introduction to Binary Search Tree",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "1_search_in_a_binary_search_tree",
                "name": "Search in a Binary Search Tree",
                "leetcodeUrl": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/search-a-node-in-bst/1",
                "leetcodeSlug": "search-in-a-binary-search-tree",
                "gfgSlug": "search-a-node-in-bst"
              },
              {
                "id": "2_find_min_max_in_bst",
                "name": "Find Min/Max in BST",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-element-in-bst/1",
                "gfgSlug": "minimum-element-in-bst"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s13-l2",
        "lessonTitle": "Lesson 2: Practice Problems",
        "topics": [
          {
            "topicId": "s13-l2-t1",
            "topicTitle": "Practice Problems Problems",
            "problems": [
              {
                "id": "0_ceil_in_a_binary_search_tree",
                "name": "Ceil in a Binary Search Tree",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/implementing-ceil-in-bst/1",
                "gfgSlug": "implementing-ceil-in-bst"
              },
              {
                "id": "1_floor_in_a_binary_search_tree",
                "name": "Floor in a Binary Search Tree",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "2_insert_a_given_node_in_binary_search_tree",
                "name": "Insert a given Node in Binary Search Tree",
                "leetcodeUrl": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/insert-a-node-in-a-bst/1",
                "leetcodeSlug": "insert-into-a-binary-search-tree",
                "gfgSlug": "insert-a-node-in-a-bst"
              },
              {
                "id": "3_delete_a_node_in_binary_search_tree",
                "name": "Delete a Node in Binary Search Tree",
                "leetcodeUrl": "https://leetcode.com/problems/delete-node-in-a-bst/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/delete-a-node-from-bst/1",
                "leetcodeSlug": "delete-node-in-a-bst",
                "gfgSlug": "delete-a-node-from-bst"
              },
              {
                "id": "4_find_k_th_smallest_largest_element_in_bst",
                "name": "Find K-th smallest/largest element in BST",
                "leetcodeUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-k-th-smallest-element-in-bst/1#:~:text=Find%20the%20Kth%20Smallest%20element%20in%20the%20BST.&text=Your%20Task%3A,such%20element%20exists%20return%20%2D1.",
                "leetcodeSlug": "kth-smallest-element-in-a-bst",
                "gfgSlug": "find-k-th-smallest-element-in-bst"
              },
              {
                "id": "5_check_if_a_tree_is_a_bst_or_bt",
                "name": "Check if a tree is a BST or BT",
                "leetcodeUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/check-for-bst/1",
                "leetcodeSlug": "validate-binary-search-tree",
                "gfgSlug": "check-for-bst"
              },
              {
                "id": "6_lca_in_binary_search_tree",
                "name": "LCA in Binary Search Tree",
                "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-bst/1",
                "leetcodeSlug": "lowest-common-ancestor-of-a-binary-search-tree",
                "gfgSlug": "lowest-common-ancestor-in-a-bst"
              },
              {
                "id": "7_construct_a_bst_from_a_preorder_traversal",
                "name": "Construct a BST from a preorder traversal",
                "leetcodeUrl": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/preorder-to-postorder4423/1",
                "leetcodeSlug": "construct-binary-search-tree-from-preorder-traversal",
                "gfgSlug": "preorder-to-postorder4423"
              },
              {
                "id": "8_inorder_successor_predecessor_in_bst",
                "name": "Inorder Successor/Predecessor in BST",
                "leetcodeUrl": "https://leetcode.com/problems/inorder-successor-in-bst/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/predecessor-and-successor/1",
                "leetcodeSlug": "inorder-successor-in-bst",
                "gfgSlug": "predecessor-and-successor"
              },
              {
                "id": "9_merge_2_bst\u2019s",
                "name": "Merge 2 BST\u2019s",
                "leetcodeUrl": "https://leetcode.com/problems/binary-search-tree-iterator/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/merge-two-bst-s/1",
                "leetcodeSlug": "binary-search-tree-iterator",
                "gfgSlug": "merge-two-bst-s"
              },
              {
                "id": "10_two_sum_in_bst_check_if_there_exists_a_pair_with_sum_k",
                "name": "Two Sum In BST | Check if there exists a pair with Sum K",
                "leetcodeUrl": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-a-pair-with-given-target-in-bst/1",
                "leetcodeSlug": "two-sum-iv-input-is-a-bst",
                "gfgSlug": "find-a-pair-with-given-target-in-bst"
              },
              {
                "id": "11_recover_bst_correct_bst_with_two_nodes_swapped",
                "name": "Recover BST | Correct BST with two nodes swapped",
                "leetcodeUrl": "https://leetcode.com/problems/recover-binary-search-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/reverse-array-in-groups0255/1",
                "leetcodeSlug": "recover-binary-search-tree",
                "gfgSlug": "reverse-array-in-groups0255"
              },
              {
                "id": "12_largest_bst_in_binary_tree",
                "name": "Largest BST in Binary Tree",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/largest-bst/1",
                "gfgSlug": "largest-bst"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-14",
    "stepTitle": "Step 14: Graphs",
    "lessons": [
      {
        "lessonId": "s14-l1",
        "lessonTitle": "Lesson 1: Learning",
        "topics": [
          {
            "topicId": "s14-l1-t1",
            "topicTitle": "Learning Problems",
            "problems": [
              {
                "id": "0_graph_and_types",
                "name": "Graph and Types",
                "leetcodeUrl": "https://takeuforward.org/graph/introduction-to-graph/",
                "gfgUrl": ""
              },
              {
                "id": "1_graph_representation_c++",
                "name": "Graph Representation | C++",
                "leetcodeUrl": "https://takeuforward.org/graph/graph-representation-in-c/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1",
                "gfgSlug": "print-adjacency-list-1587115620"
              },
              {
                "id": "2_graph_representation_java",
                "name": "Graph Representation | Java",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1",
                "gfgSlug": "print-adjacency-list-1587115620"
              },
              {
                "id": "3_connected_components_logic_explanation",
                "name": "Connected Components | Logic Explanation",
                "leetcodeUrl": "https://takeuforward.org/graph/connected-components-in-graphs/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-provinces/1",
                "gfgSlug": "number-of-provinces"
              },
              {
                "id": "4_bfs",
                "name": "BFS",
                "leetcodeUrl": "https://takeuforward.org/graph/breadth-first-search-bfs-level-order-traversal/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/1",
                "gfgSlug": "bfs-traversal-of-graph"
              },
              {
                "id": "5_dfs",
                "name": "DFS",
                "leetcodeUrl": "https://takeuforward.org/data-structure/depth-first-search-dfs/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/next-larger-element-1587115620/1",
                "gfgSlug": "next-larger-element-1587115620"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s14-l2",
        "lessonTitle": "Lesson 2: Problems on BFS /DFS",
        "topics": [
          {
            "topicId": "s14-l2-t1",
            "topicTitle": "Problems on BFS /DFS Problems",
            "problems": [
              {
                "id": "0_number_of_provinces_(leetcode)",
                "name": "Number of provinces (leetcode)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/number-of-provinces/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-provinces/1",
                "gfgSlug": "number-of-provinces"
              },
              {
                "id": "1_connected_components_problem_in_matrix",
                "name": "Connected Components Problem in Matrix",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-provinces/1",
                "gfgSlug": "number-of-provinces"
              },
              {
                "id": "2_rotten_oranges",
                "name": "Rotten Oranges",
                "leetcodeUrl": "https://takeuforward.org/data-structure/rotten-oranges/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/rotten-oranges2536/1",
                "gfgSlug": "rotten-oranges2536"
              },
              {
                "id": "3_flood_fill",
                "name": "Flood fill",
                "leetcodeUrl": "https://takeuforward.org/graph/flood-fill-algorithm-graphs/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/flood-fill-algorithm1856/1",
                "gfgSlug": "flood-fill-algorithm1856"
              },
              {
                "id": "4_cycle_detection_in_unirected_graph_(bfs)",
                "name": "Cycle Detection in unirected Graph (bfs)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/detect-cycle-in-an-undirected-graph-using-bfs/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
                "gfgSlug": "detect-cycle-in-an-undirected-graph"
              },
              {
                "id": "5_cycle_detection_in_undirected_graph_(dfs)",
                "name": "Cycle Detection in undirected Graph (dfs)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/detect-cycle-in-an-undirected-graph-using-dfs/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
                "gfgSlug": "detect-cycle-in-an-undirected-graph"
              },
              {
                "id": "6_0_1_matrix_(bfs_problem)",
                "name": "0/1 Matrix (Bfs Problem)",
                "leetcodeUrl": "https://takeuforward.org/graph/distance-of-nearest-cell-having-1/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/distance-of-nearest-cell-having-1-1587115620/1",
                "gfgSlug": "distance-of-nearest-cell-having-1-1587115620"
              },
              {
                "id": "7_surrounded_regions_(dfs)",
                "name": "Surrounded Regions (dfs)",
                "leetcodeUrl": "https://takeuforward.org/graph/surrounded-regions-replace-os-with-xs/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/replace-os-with-xs0052/1",
                "gfgSlug": "replace-os-with-xs0052"
              },
              {
                "id": "8_number_of_enclaves_[flood_fill_implementation_\u2013_multisource]",
                "name": "Number of Enclaves [flood fill implementation \u2013 multisource]",
                "leetcodeUrl": "https://takeuforward.org/graph/number-of-enclaves/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-enclaves/1",
                "gfgSlug": "number-of-enclaves"
              },
              {
                "id": "9_word_ladder_\u2013_1",
                "name": "Word ladder \u2013 1",
                "leetcodeUrl": "https://leetcode.com/problems/word-ladder/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/word-ladder/1",
                "leetcodeSlug": "word-ladder",
                "gfgSlug": "word-ladder"
              },
              {
                "id": "10_word_ladder_\u2013_2",
                "name": "Word ladder \u2013 2",
                "leetcodeUrl": "https://leetcode.com/problems/word-ladder-ii/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/word-ladder-ii/1",
                "leetcodeSlug": "word-ladder-ii",
                "gfgSlug": "word-ladder-ii"
              },
              {
                "id": "11_number_of_distinct_islands_[dfs_multisource]",
                "name": "Number of Distinct Islands [dfs multisource]",
                "leetcodeUrl": "https://leetcode.com/problems/number-of-distinct-islands-ii/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-distinct-islands/1",
                "leetcodeSlug": "number-of-distinct-islands-ii",
                "gfgSlug": "number-of-distinct-islands"
              },
              {
                "id": "12_bipartite_graph_(dfs)",
                "name": "Bipartite Graph (DFS)",
                "leetcodeUrl": "https://takeuforward.org/graph/bipartite-graph-dfs-implementation/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/bipartite-graph/1",
                "gfgSlug": "bipartite-graph"
              },
              {
                "id": "13_cycle_detection_in_directed_graph_(dfs)",
                "name": "Cycle Detection in Directed Graph (DFS)",
                "leetcodeUrl": "https://leetcode.com/problems/course-schedule-ii/discuss/293048/detecting-cycle-in-directed-graph-problem",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1",
                "leetcodeSlug": "course-schedule-ii",
                "gfgSlug": "detect-cycle-in-a-directed-graph"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s14-l3",
        "lessonTitle": "Lesson 3: Topo Sort and Problems",
        "topics": [
          {
            "topicId": "s14-l3-t1",
            "topicTitle": "Topo Sort and Problems Problems",
            "problems": [
              {
                "id": "0_topo_sort",
                "name": "Topo Sort",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/topological-sort/1",
                "gfgSlug": "topological-sort"
              },
              {
                "id": "1_kahn\u2019s_algorithm",
                "name": "Kahn\u2019s Algorithm",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/topological-sort/1",
                "gfgSlug": "topological-sort"
              },
              {
                "id": "2_cycle_detection_in_directed_graph_(bfs)",
                "name": "Cycle Detection in Directed Graph (BFS)",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1",
                "gfgSlug": "detect-cycle-in-a-directed-graph"
              },
              {
                "id": "3_course_schedule_\u2013_i",
                "name": "Course Schedule \u2013 I",
                "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/course-schedule/1",
                "leetcodeSlug": "course-schedule",
                "gfgSlug": "course-schedule"
              },
              {
                "id": "4_course_schedule_\u2013_ii",
                "name": "Course Schedule \u2013 II",
                "leetcodeUrl": "https://leetcode.com/problems/course-schedule-ii/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/course-schedule/1",
                "leetcodeSlug": "course-schedule-ii",
                "gfgSlug": "course-schedule"
              },
              {
                "id": "5_find_eventual_safe_states",
                "name": "Find eventual safe states",
                "leetcodeUrl": "https://leetcode.com/problems/find-eventual-safe-states/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/eventual-safe-states/1",
                "leetcodeSlug": "find-eventual-safe-states",
                "gfgSlug": "eventual-safe-states"
              },
              {
                "id": "6_alien_dictionary",
                "name": "Alien dictionary",
                "leetcodeUrl": "https://leetcode.com/problems/alien-dictionary/solution/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/alien-dictionary/1",
                "leetcodeSlug": "alien-dictionary",
                "gfgSlug": "alien-dictionary"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s14-l4",
        "lessonTitle": "Lesson 4: Shortest Path Algorithms and Problems",
        "topics": [
          {
            "topicId": "s14-l4-t1",
            "topicTitle": "Shortest Path Algorithms and Problems Problems",
            "problems": [
              {
                "id": "0_shortest_path_in_ug_with_unit_weights",
                "name": "Shortest Path in UG with unit weights",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "1_shortest_path_in_dag",
                "name": "Shortest Path in DAG",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "2_djisktra\u2019s_algorithm",
                "name": "Djisktra\u2019s Algorithm",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1",
                "gfgSlug": "implementing-dijkstra-set-1-adjacency-matrix"
              },
              {
                "id": "3_why_priority_queue_is_used_in_djisktra\u2019s_algorithm",
                "name": "Why priority Queue is used in Djisktra\u2019s Algorithm",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_shortest_path_in_a_binary_maze",
                "name": "Shortest path in a binary maze",
                "leetcodeUrl": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/shortest-path-in-a-binary-maze-1655453161/1",
                "leetcodeSlug": "shortest-path-in-binary-matrix",
                "gfgSlug": "shortest-path-in-a-binary-maze-1655453161"
              },
              {
                "id": "5_path_with_minimum_effort",
                "name": "Path with minimum effort",
                "leetcodeUrl": "https://leetcode.com/problems/path-with-minimum-effort/",
                "gfgUrl": "",
                "leetcodeSlug": "path-with-minimum-effort"
              },
              {
                "id": "6_cheapest_flights_within_k_stops",
                "name": "Cheapest flights within k stops",
                "leetcodeUrl": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
                "gfgUrl": "",
                "leetcodeSlug": "cheapest-flights-within-k-stops"
              },
              {
                "id": "7_network_delay_time",
                "name": "Network Delay time",
                "leetcodeUrl": "https://leetcode.com/problems/network-delay-time/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/alex-travelling/1",
                "leetcodeSlug": "network-delay-time",
                "gfgSlug": "alex-travelling"
              },
              {
                "id": "8_number_of_ways_to_arrive_at_destination",
                "name": "Number of ways to arrive at destination",
                "leetcodeUrl": "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-ways-to-arrive-at-destination/1",
                "leetcodeSlug": "number-of-ways-to-arrive-at-destination",
                "gfgSlug": "number-of-ways-to-arrive-at-destination"
              },
              {
                "id": "9_minimum_steps_to_reach_end_from_start_by_performing_multiplication_and_mod_operations_with_array_elements",
                "name": "Minimum steps to reach end from start by performing multiplication and mod operations with array elements",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1",
                "gfgSlug": "minimum-multiplications-to-reach-end"
              },
              {
                "id": "10_bellman_ford_algorithm",
                "name": "Bellman Ford Algorithm",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1",
                "gfgSlug": "distance-from-the-source-bellman-ford-algorithm"
              },
              {
                "id": "11_floyd_warshal_algorithm",
                "name": "Floyd Warshal Algorithm",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1",
                "gfgSlug": "implementing-floyd-warshall2042"
              },
              {
                "id": "12_find_the_city_with_the_smallest_number_of_neighbors_in_a_threshold_distance",
                "name": "Find the city with the smallest number of neighbors in a threshold distance",
                "leetcodeUrl": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/0?category%5B%5D=Shortest%20Path&category%5B%5D=Shortest%20Path&page=1&query=category%5B%5DShortest%20Pathpage1category%5B%5DShortest%20Path",
                "leetcodeSlug": "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
                "gfgSlug": "city-with-the-smallest-number-of-neighbors-at-a-threshold-distance"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s14-l5",
        "lessonTitle": "Lesson 5: Minimum Spanning Tree / Disjoint Set Problems",
        "topics": [
          {
            "topicId": "s14-l5-t1",
            "topicTitle": "Minimum Spanning Tree / Disjoint Set Problems Problems",
            "problems": [
              {
                "id": "0_minimum_spanning_tree",
                "name": "Minimum Spanning Tree",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1",
                "gfgSlug": "minimum-spanning-tree"
              },
              {
                "id": "1_prim\u2019s_algorithm",
                "name": "Prim\u2019s Algorithm",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1",
                "gfgSlug": "minimum-spanning-tree"
              },
              {
                "id": "2_disjoint_set_[union_by_rank]",
                "name": "Disjoint Set [Union by Rank]",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/disjoint-set-union-find/1",
                "gfgSlug": "disjoint-set-union-find"
              },
              {
                "id": "3_disjoint_set_[union_by_size]",
                "name": "Disjoint Set [Union by Size]",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/disjoint-set-union-find/1",
                "gfgSlug": "disjoint-set-union-find"
              },
              {
                "id": "4_kruskal\u2019s_algorithm",
                "name": "Kruskal\u2019s Algorithm",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1",
                "gfgSlug": "minimum-spanning-tree"
              },
              {
                "id": "5_number_of_operations_to_make_network_connected",
                "name": "Number of operations to make network connected",
                "leetcodeUrl": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
                "gfgUrl": "",
                "leetcodeSlug": "number-of-operations-to-make-network-connected"
              },
              {
                "id": "6_most_stones_removed_with_same_rows_or_columns",
                "name": "Most stones removed with same rows or columns",
                "leetcodeUrl": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
                "gfgUrl": "",
                "leetcodeSlug": "most-stones-removed-with-same-row-or-column"
              },
              {
                "id": "7_accounts_merge",
                "name": "Accounts merge",
                "leetcodeUrl": "https://leetcode.com/problems/accounts-merge/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/merging-details/1",
                "leetcodeSlug": "accounts-merge",
                "gfgSlug": "merging-details"
              },
              {
                "id": "8_number_of_island_ii",
                "name": "Number of island II",
                "leetcodeUrl": "https://leetcode.com/problems/number-of-islands-ii/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-the-number-of-islands/1",
                "leetcodeSlug": "number-of-islands-ii",
                "gfgSlug": "find-the-number-of-islands"
              },
              {
                "id": "9_making_a_large_island",
                "name": "Making a Large Island",
                "leetcodeUrl": "https://leetcode.com/problems/making-a-large-island/",
                "gfgUrl": "",
                "leetcodeSlug": "making-a-large-island"
              },
              {
                "id": "10_swim_in_rising_water",
                "name": "Swim in rising water",
                "leetcodeUrl": "https://leetcode.com/problems/swim-in-rising-water/",
                "gfgUrl": "",
                "leetcodeSlug": "swim-in-rising-water"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s14-l6",
        "lessonTitle": "Lesson 6: Other Algorithms",
        "topics": [
          {
            "topicId": "s14-l6-t1",
            "topicTitle": "Other Algorithms Problems",
            "problems": [
              {
                "id": "0_bridges_in_graph",
                "name": "Bridges in Graph",
                "leetcodeUrl": "https://leetcode.com/problems/critical-connections-in-a-network/discuss/382385/find-bridges-in-a-graph",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/bridge-edge-in-graph/1",
                "leetcodeSlug": "critical-connections-in-a-network",
                "gfgSlug": "bridge-edge-in-graph"
              },
              {
                "id": "1_articulation_point",
                "name": "Articulation Point",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/articulation-point-1/1",
                "gfgSlug": "articulation-point-1"
              },
              {
                "id": "2_kosaraju\u2019s_algorithm",
                "name": "Kosaraju\u2019s Algorithm",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1",
                "gfgSlug": "strongly-connected-components-kosarajus-algo"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-15",
    "stepTitle": "Step 15: DP",
    "lessons": [
      {
        "lessonId": "s15-l1",
        "lessonTitle": "Lesson 1: Introduction to DP",
        "topics": [
          {
            "topicId": "s15-l1-t1",
            "topicTitle": "Introduction to DP Problems",
            "problems": [
              {
                "id": "0_dynamic_programming_introduction",
                "name": "Dynamic Programming Introduction",
                "leetcodeUrl": "https://takeuforward.org/data-structure/dynamic-programming-introduction/",
                "gfgUrl": ""
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s15-l2",
        "lessonTitle": "Lesson 2: 1D DP",
        "topics": [
          {
            "topicId": "s15-l2-t1",
            "topicTitle": "1D DP Problems",
            "problems": [
              {
                "id": "0_climbing_stars",
                "name": "Climbing Stars",
                "leetcodeUrl": "https://takeuforward.org/data-structure/dynamic-programming-climbing-stairs/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/count-ways-to-reach-the-nth-stair-1587115620/1",
                "gfgSlug": "count-ways-to-reach-the-nth-stair-1587115620"
              },
              {
                "id": "1_frog_jump(dp_3)",
                "name": "Frog Jump(DP-3)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-dp-3/",
                "gfgUrl": ""
              },
              {
                "id": "2_frog_jump_with_k_distances(dp_4)",
                "name": "Frog Jump with k distances(DP-4)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-with-k-distances-dp-4/",
                "gfgUrl": ""
              },
              {
                "id": "3_maximum_sum_of_non_adjacent_elements_(dp_5)",
                "name": "Maximum sum of non-adjacent elements (DP 5)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/maximum-sum-of-non-adjacent-elements-dp-5/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/max-sum-without-adjacents2430/1",
                "gfgSlug": "max-sum-without-adjacents2430"
              },
              {
                "id": "4_house_robber_(dp_6)",
                "name": "House Robber (DP 6)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/dynamic-programming-house-robber-dp-6/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/stickler-theif-1587115621/1",
                "gfgSlug": "stickler-theif-1587115621"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s15-l3",
        "lessonTitle": "Lesson 3: 2D /3D DP and DP on Grids",
        "topics": [
          {
            "topicId": "s15-l3-t1",
            "topicTitle": "2D /3D DP and DP on Grids Problems",
            "problems": [
              {
                "id": "0_ninja\u2019s_training_(dp_7)",
                "name": "Ninja\u2019s Training (DP 7)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/dynamic-programming-ninjas-training-dp-7/",
                "gfgUrl": ""
              },
              {
                "id": "1_grid_unique_paths_:_dp_on_grids_(dp8)",
                "name": "Grid Unique Paths : DP on Grids (DP8)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/grid-unique-paths-dp-on-grids-dp8/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-unique-paths5339/1",
                "gfgSlug": "number-of-unique-paths5339"
              },
              {
                "id": "2_grid_unique_paths_2_(dp_9)",
                "name": "Grid Unique Paths 2 (DP 9)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/grid-unique-paths-2-dp-9/",
                "gfgUrl": ""
              },
              {
                "id": "3_minimum_path_sum_in_grid_(dp_10)",
                "name": "Minimum path sum in Grid (DP 10)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/minimum-path-sum-in-a-grid-dp-10/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-cost-path3833/1",
                "gfgSlug": "minimum-cost-path3833"
              },
              {
                "id": "4_minimum_path_sum_in_triangular_grid_(dp_11)",
                "name": "Minimum path sum in Triangular Grid (DP 11)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/minimum-path-sum-in-triangular-grid-dp-11/",
                "gfgUrl": ""
              },
              {
                "id": "5_minimum_maximum_falling_path_sum_(dp_12)",
                "name": "Minimum/Maximum Falling Path Sum (DP-12)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/minimum-maximum-falling-path-sum-dp-12/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/path-in-matrix3805/1",
                "gfgSlug": "path-in-matrix3805"
              },
              {
                "id": "6_3d_dp_:_ninja_and_his_friends_(dp_13)",
                "name": "3D DP : Ninja and his friends (DP-13)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/3-d-dp-ninja-and-his-friends-dp-13/",
                "gfgUrl": ""
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s15-l4",
        "lessonTitle": "Lesson 4: DP on Subsequence",
        "topics": [
          {
            "topicId": "s15-l4-t1",
            "topicTitle": "DP on Subsequence Problems",
            "problems": [
              {
                "id": "0_subset_sum_equal_to_target_(dp_14)",
                "name": "Subset sum equal to target (DP- 14)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/subset-sum-equal-to-target-dp-14/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1",
                "gfgSlug": "subset-sum-problem-1611555638"
              },
              {
                "id": "1_partition_equal_subset_sum_(dp_15)",
                "name": "Partition Equal Subset Sum (DP- 15)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/partition-equal-subset-sum-dp-15/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/subset-sum-problem2014/1",
                "gfgSlug": "subset-sum-problem2014"
              },
              {
                "id": "2_partition_set_into_2_subsets_with_min_absolute_sum_diff_(dp_16)",
                "name": "Partition Set Into 2 Subsets With Min Absolute Sum Diff (DP- 16)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/partition-set-into-2-subsets-with-min-absolute-sum-diff-dp-16/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-sum-partition3317/1",
                "gfgSlug": "minimum-sum-partition3317"
              },
              {
                "id": "3_count_subsets_with_sum_k_(dp_\u2013_17)",
                "name": "Count Subsets with Sum K (DP \u2013 17)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/count-subsets-with-sum-k-dp-17/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/perfect-sum-problem5633/1",
                "gfgSlug": "perfect-sum-problem5633"
              },
              {
                "id": "4_count_partitions_with_given_difference_(dp_\u2013_18)",
                "name": "Count Partitions with Given Difference (DP \u2013 18)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/count-partitions-with-given-difference-dp-18/",
                "gfgUrl": ""
              },
              {
                "id": "5_0_1_knapsack_(dp_\u2013_19)",
                "name": "0/1 Knapsack (DP \u2013 19)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/0-1-knapsack-dp-19/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1",
                "gfgSlug": "0-1-knapsack-problem0945"
              },
              {
                "id": "6_minimum_coins_(dp_\u2013_20)",
                "name": "Minimum Coins (DP \u2013 20)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/minimum-coins-dp-20/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/-minimum-number-of-coins4426/1",
                "gfgSlug": "-minimum-number-of-coins4426"
              },
              {
                "id": "7_target_sum_(dp_\u2013_21)",
                "name": "Target Sum (DP \u2013 21)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/target-sum-dp-21/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/target-sum-1626326450/1",
                "gfgSlug": "target-sum-1626326450"
              },
              {
                "id": "8_coin_change_2_(dp_\u2013_22)",
                "name": "Coin Change 2 (DP \u2013 22)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/target-sum-dp-21/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/coin-change2448/1",
                "gfgSlug": "coin-change2448"
              },
              {
                "id": "9_unbounded_knapsack_(dp_\u2013_23)",
                "name": "Unbounded Knapsack (DP \u2013 23)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/unbounded-knapsack-dp-23/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1",
                "gfgSlug": "knapsack-with-duplicate-items4201"
              },
              {
                "id": "10_rod_cutting_problem_(dp_\u2013_24)",
                "name": "Rod Cutting Problem | (DP \u2013 24)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/rod-cutting-problem-dp-24/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/rod-cutting0840/1",
                "gfgSlug": "rod-cutting0840"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s15-l5",
        "lessonTitle": "Lesson 5: DP on Strings",
        "topics": [
          {
            "topicId": "s15-l5-t1",
            "topicTitle": "DP on Strings Problems",
            "problems": [
              {
                "id": "0_longest_common_subsequence_(dp_\u2013_25)",
                "name": "Longest Common Subsequence | (DP \u2013 25)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/longest-common-subsequence-dp-25/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1",
                "gfgSlug": "longest-common-subsequence-1587115620"
              },
              {
                "id": "1_print_longest_common_subsequence_(dp_\u2013_26)",
                "name": "Print Longest Common Subsequence | (DP \u2013 26)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/print-longest-common-subsequence-dp-26/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/print-all-lcs-sequences3413/1",
                "gfgSlug": "print-all-lcs-sequences3413"
              },
              {
                "id": "2_longest_common_substring_(dp_\u2013_27)",
                "name": "Longest Common Substring | (DP \u2013 27)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/longest-common-substring-dp-27/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-common-substring1452/1",
                "gfgSlug": "longest-common-substring1452"
              },
              {
                "id": "3_longest_palindromic_subsequence_(dp_28)",
                "name": "Longest Palindromic Subsequence | (DP-28)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/longest-palindromic-subsequence-dp-28/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-palindromic-subsequence-1612327878/1",
                "gfgSlug": "longest-palindromic-subsequence-1612327878"
              },
              {
                "id": "4_minimum_insertions_to_make_string_palindrome_dp_29",
                "name": "Minimum insertions to make string palindrome | DP-29",
                "leetcodeUrl": "https://takeuforward.org/data-structure/minimum-insertions-to-make-string-palindrome-dp-29/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/form-a-palindrome1455/1",
                "gfgSlug": "form-a-palindrome1455"
              },
              {
                "id": "5_minimum_insertions_deletions_to_convert_string_(dp_30)",
                "name": "Minimum Insertions/Deletions to Convert String | (DP- 30)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/minimum-insertions-deletions-to-convert-string-dp-30/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/minimum-number-of-deletions-and-insertions0209/1",
                "gfgSlug": "minimum-number-of-deletions-and-insertions0209"
              },
              {
                "id": "6_shortest_common_supersequence_(dp_\u2013_31)",
                "name": "Shortest Common Supersequence | (DP \u2013 31)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/shortest-common-supersequence-dp-31/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/shortest-common-supersequence0322/1",
                "gfgSlug": "shortest-common-supersequence0322"
              },
              {
                "id": "7_distinct_subsequences_(dp_32)",
                "name": "Distinct Subsequences| (DP-32)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/distinct-subsequences-dp-32/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-distinct-subsequences0909/1",
                "gfgSlug": "number-of-distinct-subsequences0909"
              },
              {
                "id": "8_edit_distance_(dp_33)",
                "name": "Edit Distance | (DP-33)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/edit-distance-dp-33/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/edit-distance3702/1",
                "gfgSlug": "edit-distance3702"
              },
              {
                "id": "9_wildcard_matching_(dp_34)",
                "name": "Wildcard Matching | (DP-34)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/wildcard-matching-dp-34/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/wildcard-pattern-matching/1",
                "gfgSlug": "wildcard-pattern-matching"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s15-l6",
        "lessonTitle": "Lesson 6: DP on Stocks",
        "topics": [
          {
            "topicId": "s15-l6-t1",
            "topicTitle": "DP on Stocks Problems",
            "problems": [
              {
                "id": "0_best_time_to_buy_and_sell_stock_(dp_35)",
                "name": "Best Time to Buy and Sell Stock |(DP-35)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/stock-buy-and-sell-dp-35/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1",
                "gfgSlug": "stock-buy-and-sell-1587115621"
              },
              {
                "id": "1_buy_and_sell_stock_\u2013_ii_(dp_36)",
                "name": "Buy and Sell Stock \u2013 II|(DP-36)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/buy-and-sell-stock-ii-dp-36/",
                "gfgUrl": ""
              },
              {
                "id": "2_buy_and_sell_stocks_iii_(dp_37)",
                "name": "Buy and Sell Stocks III|(DP-37)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/buy-and-sell-stock-iii-dp-37/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/buy-and-sell-a-share-at-most-twice/1",
                "gfgSlug": "buy-and-sell-a-share-at-most-twice"
              },
              {
                "id": "3_buy_and_stock_sell_iv_(dp_38)",
                "name": "Buy and Stock Sell IV |(DP-38)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/buy-and-sell-stock-iv-dp-38/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximum-profit4657/1",
                "gfgSlug": "maximum-profit4657"
              },
              {
                "id": "4_buy_and_sell_stocks_with_cooldown_(dp_39)",
                "name": "Buy and Sell Stocks With Cooldown|(DP-39)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/buy-and-sell-stocks-with-cooldown-dp-39/",
                "gfgUrl": ""
              },
              {
                "id": "5_buy_and_sell_stocks_with_transaction_fee_(dp_40)",
                "name": "Buy and Sell Stocks With Transaction Fee|(DP-40)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/buy-and-sell-stocks-with-transaction-fees-dp-40/",
                "gfgUrl": ""
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s15-l7",
        "lessonTitle": "Lesson 7: DP on LIS",
        "topics": [
          {
            "topicId": "s15-l7-t1",
            "topicTitle": "DP on LIS Problems",
            "problems": [
              {
                "id": "0_longest_increasing_subsequence_(dp_41)",
                "name": "Longest Increasing Subsequence |(DP-41)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/longest-increasing-subsequence-dp-41/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1",
                "gfgSlug": "longest-increasing-subsequence-1587115620"
              },
              {
                "id": "1_printing_longest_increasing_subsequence_(dp_42)",
                "name": "Printing Longest Increasing Subsequence|(DP-42)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/printing-longest-increasing-subsequence-dp-42/",
                "gfgUrl": ""
              },
              {
                "id": "2_longest_increasing_subsequence_(dp_43)",
                "name": "Longest Increasing Subsequence |(DP-43)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/longest-increasing-subsequence-binary-search-dp-43/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1",
                "gfgSlug": "longest-increasing-subsequence-1587115620"
              },
              {
                "id": "3_largest_divisible_subset_(dp_44)",
                "name": "Largest Divisible Subset|(DP-44)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/longest-divisible-subset-dp-44/",
                "gfgUrl": ""
              },
              {
                "id": "4_longest_string_chain_(dp_45)",
                "name": "Longest String Chain|(DP-45)",
                "leetcodeUrl": "https://takeuforward.org/data-structure/longest-string-chain-dp-45/",
                "gfgUrl": ""
              },
              {
                "id": "5_longest_bitonic_subsequence_(dp_46)",
                "name": "Longest Bitonic Subsequence |(DP-46)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-bitonic-subsequence0824/1",
                "gfgSlug": "longest-bitonic-subsequence0824"
              },
              {
                "id": "6_number_of_longest_increasing_subsequences_(dp_47)",
                "name": "Number of Longest Increasing Subsequences|(DP-47)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": ""
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s15-l8",
        "lessonTitle": "Lesson 8: MCM DP | Partition DP",
        "topics": [
          {
            "topicId": "s15-l8-t1",
            "topicTitle": "MCM DP | Partition DP Problems",
            "problems": [
              {
                "id": "0_matrix_chain_multiplication_(dp_48)",
                "name": "Matrix Chain Multiplication|(DP-48)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1",
                "gfgSlug": "matrix-chain-multiplication0303"
              },
              {
                "id": "1_matrix_chain_multiplication_bottom_up_(dp_49)",
                "name": "Matrix Chain Multiplication | Bottom-Up|(DP-49)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1",
                "gfgSlug": "matrix-chain-multiplication0303"
              },
              {
                "id": "2_minimum_cost_to_cut_the_stick_(dp_50)",
                "name": "Minimum Cost to Cut the Stick|(DP-50)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/rod-cutting0840/1",
                "gfgSlug": "rod-cutting0840"
              },
              {
                "id": "3_burst_balloons_(dp_51)",
                "name": "Burst Balloons|(DP-51)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": "https://practice.geeksforgeeks.org/batch-problems/maximum-triple-product/1/"
              },
              {
                "id": "4_evaluate_boolean_expression_to_true_(dp_52)",
                "name": "Evaluate Boolean Expression to True|(DP-52)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/boolean-parenthesization5610/1",
                "gfgSlug": "boolean-parenthesization5610"
              },
              {
                "id": "5_palindrome_partitioning_\u2013_ii_(dp_53)",
                "name": "Palindrome Partitioning \u2013 II|(DP-53)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/palindromic-patitioning4845/1",
                "gfgSlug": "palindromic-patitioning4845"
              },
              {
                "id": "6_partition_array_for_maximum_sum_(dp_54)",
                "name": "Partition Array for Maximum Sum|(DP-54)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": ""
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s15-l9",
        "lessonTitle": "Lesson 9: DP on Squares",
        "topics": [
          {
            "topicId": "s15-l9-t1",
            "topicTitle": "DP on Squares Problems",
            "problems": [
              {
                "id": "0_maximum_rectangle_area_with_all_1\u2019s_(dp_55)",
                "name": "Maximum Rectangle Area with all 1\u2019s|(DP-55)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/max-rectangle/1",
                "gfgSlug": "max-rectangle"
              },
              {
                "id": "1_count_square_submatrices_with_all_ones_(dp_56)",
                "name": "Count Square Submatrices with All Ones|(DP-56)",
                "leetcodeUrl": "https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/#",
                "gfgUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "stepId": "step-16",
    "stepTitle": "Step 16: Tries",
    "lessons": [
      {
        "lessonId": "s16-l1",
        "lessonTitle": "Lesson 1: Theory",
        "topics": [
          {
            "topicId": "s16-l1-t1",
            "topicTitle": "Theory Problems",
            "problems": [
              {
                "id": "0_implement_trie_insert_search_startswith",
                "name": "Implement TRIE | INSERT | SEARCH | STARTSWITH",
                "leetcodeUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/trie-insert-and-search0651/1",
                "leetcodeSlug": "implement-trie-prefix-tree",
                "gfgSlug": "trie-insert-and-search0651"
              }
            ]
          }
        ]
      },
      {
        "lessonId": "s16-l2",
        "lessonTitle": "Lesson 2: Problems",
        "topics": [
          {
            "topicId": "s16-l2-t1",
            "topicTitle": "Problems Problems",
            "problems": [
              {
                "id": "0_implement_trie_\u2013_2_(prefix_tree)",
                "name": "Implement Trie \u2013 2 (Prefix Tree)",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/trie-delete/1",
                "gfgSlug": "trie-delete"
              },
              {
                "id": "1_longest_string_with_all_prefixes",
                "name": "Longest String with All Prefixes",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/longest-common-prefix-in-an-array5129/1",
                "gfgSlug": "longest-common-prefix-in-an-array5129"
              },
              {
                "id": "2_number_of_distinct_substrings_in_a_string",
                "name": "Number of Distinct Substrings in a String",
                "leetcodeUrl": "",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/count-of-distinct-substrings/1",
                "gfgSlug": "count-of-distinct-substrings"
              },
              {
                "id": "3_bit_prerequisites_for_trie_problems",
                "name": "Bit PreRequisites for TRIE Problems",
                "leetcodeUrl": "",
                "gfgUrl": ""
              },
              {
                "id": "4_maximum_xor_of_two_numbers_in_an_array",
                "name": "Maximum XOR of two numbers in an array",
                "leetcodeUrl": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/maximum-xor-of-two-numbers-in-an-array/0",
                "leetcodeSlug": "maximum-xor-of-two-numbers-in-an-array",
                "gfgSlug": "maximum-xor-of-two-numbers-in-an-array"
              },
              {
                "id": "5_maximum_xor_with_an_element_from_array",
                "name": "Maximum XOR With an Element From Array",
                "leetcodeUrl": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
                "gfgUrl": "",
                "leetcodeSlug": "maximum-xor-with-an-element-from-array"
              }
            ]
          }
        ]
      }
    ]
  }
];
