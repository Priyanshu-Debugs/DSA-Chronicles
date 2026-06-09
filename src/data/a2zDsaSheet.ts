export interface Problem {
  id: string;
  name: string;
  leetcodeUrl: string;
  gfgUrl: string;
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/largest-element-in-array4009/0"
              },
              {
                "id": "1_second_largest_element_in_an_array_without_sorting",
                "name": "Second Largest Element in an Array without sorting",
                "leetcodeUrl": "https://takeuforward.org/data-structure/find-second-smallest-and-second-largest-element-in-an-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/second-largest3735/1"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/who-will-win-1587115621/1"
              },
              {
                "id": "8_find_the_union_and_intersection_of_two_sorted_arrays",
                "name": "Find the Union and intersection of two sorted arrays",
                "leetcodeUrl": "https://takeuforward.org/data-structure/intersection-of-two-sorted-arrays/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/union-of-two-sorted-arrays-1587115621/1"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/max-sum-in-sub-arrays0824/0?category="
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1?category[]=Hash&category[]=Hash&company[]=Amazon&company[]=Amazon&page=1&query=category[]Hashcompany[]Amazonpage1company[]Amazoncategory[]Hash"
              },
              {
                "id": "5_count_number_of_subarrays_with_given_xor_k",
                "name": "Count number of subarrays with given xor K",
                "leetcodeUrl": "https://takeuforward.org/data-structure/count-the-number-of-subarrays-with-given-xor-k/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/subsets-with-xor-value2023/1"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-missing-and-repeating2512/1"
              },
              {
                "id": "9_count_inversions",
                "name": "Count Inversions",
                "leetcodeUrl": "https://takeuforward.org/data-structure/count-inversions-in-an-array/",
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/inversion-of-array-1587115620/1"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/number-of-occurrence2259/1"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/find-nth-root-of-m5843/1"
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
                "gfgUrl": ""
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/linked-list-insertion-1587115620/0"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/rat-in-a-maze-problem/1"
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
                "gfgUrl": "https://practice.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1"
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
];
