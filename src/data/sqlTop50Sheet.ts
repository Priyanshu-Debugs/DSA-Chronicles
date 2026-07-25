import { Step } from "./a2zDsaSheet";

export interface SqlProblem {
  id: string;
  name: string;
  leetcodeUrl: string;
  leetcodeSlug: string;
  gfgUrl: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
}

export const sqlTop50SheetData: Step[] = [
  {
    stepId: "sql-select",
    stepTitle: "Select",
    lessons: [
      {
        lessonId: "sql-select-l1",
        lessonTitle: "Basic Select Queries",
        topics: [
          {
            topicId: "sql-select-t1",
            topicTitle: "Select Statements & Filtering",
            problems: [
              {
                id: "sql_1757_recyclable_and_low_fat_products",
                name: "1757. Recyclable and Low Fat Products",
                leetcodeUrl: "https://leetcode.com/problems/recyclable-and-low-fat-products/",
                leetcodeSlug: "recyclable-and-low-fat-products",
                gfgUrl: "",
              },
              {
                id: "sql_584_find_customer_referee",
                name: "584. Find Customer Referee",
                leetcodeUrl: "https://leetcode.com/problems/find-customer-referee/",
                leetcodeSlug: "find-customer-referee",
                gfgUrl: "",
              },
              {
                id: "sql_595_big_countries",
                name: "595. Big Countries",
                leetcodeUrl: "https://leetcode.com/problems/big-countries/",
                leetcodeSlug: "big-countries",
                gfgUrl: "",
              },
              {
                id: "sql_1148_article_views_i",
                name: "1148. Article Views I",
                leetcodeUrl: "https://leetcode.com/problems/article-views-i/",
                leetcodeSlug: "article-views-i",
                gfgUrl: "",
              },
              {
                id: "sql_1683_invalid_tweets",
                name: "1683. Invalid Tweets",
                leetcodeUrl: "https://leetcode.com/problems/invalid-tweets/",
                leetcodeSlug: "invalid-tweets",
                gfgUrl: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "sql-joins",
    stepTitle: "Basic Joins",
    lessons: [
      {
        lessonId: "sql-joins-l1",
        lessonTitle: "Inner, Left & Self Joins",
        topics: [
          {
            topicId: "sql-joins-t1",
            topicTitle: "Table Joins & Relationships",
            problems: [
              {
                id: "sql_1378_replace_employee_id_with_unique_identifier",
                name: "1378. Replace Employee ID With The Unique Identifier",
                leetcodeUrl: "https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/",
                leetcodeSlug: "replace-employee-id-with-the-unique-identifier",
                gfgUrl: "",
              },
              {
                id: "sql_1068_product_sales_analysis_i",
                name: "1068. Product Sales Analysis I",
                leetcodeUrl: "https://leetcode.com/problems/product-sales-analysis-i/",
                leetcodeSlug: "product-sales-analysis-i",
                gfgUrl: "",
              },
              {
                id: "sql_1581_customer_who_visited_but_did_not_make_any_transactions",
                name: "1581. Customer Who Visited but Did Not Make Any Transactions",
                leetcodeUrl: "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/",
                leetcodeSlug: "customer-who-visited-but-did-not-make-any-transactions",
                gfgUrl: "",
              },
              {
                id: "sql_197_rising_temperature",
                name: "197. Rising Temperature",
                leetcodeUrl: "https://leetcode.com/problems/rising-temperature/",
                leetcodeSlug: "rising-temperature",
                gfgUrl: "",
              },
              {
                id: "sql_1661_average_time_of_process_per_machine",
                name: "1661. Average Time of Process per Machine",
                leetcodeUrl: "https://leetcode.com/problems/average-time-of-process-per-machine/",
                leetcodeSlug: "average-time-of-process-per-machine",
                gfgUrl: "",
              },
              {
                id: "sql_577_employee_bonus",
                name: "577. Employee Bonus",
                leetcodeUrl: "https://leetcode.com/problems/employee-bonus/",
                leetcodeSlug: "employee-bonus",
                gfgUrl: "",
              },
              {
                id: "sql_1280_students_and_examinations",
                name: "1280. Students and Examinations",
                leetcodeUrl: "https://leetcode.com/problems/students-and-examinations/",
                leetcodeSlug: "students-and-examinations",
                gfgUrl: "",
              },
              {
                id: "sql_570_managers_with_at_least_5_direct_reports",
                name: "570. Managers with at Least 5 Direct Reports",
                leetcodeUrl: "https://leetcode.com/problems/managers-with-at-least-5-direct-reports/",
                leetcodeSlug: "managers-with-at-least-5-direct-reports",
                gfgUrl: "",
              },
              {
                id: "sql_1934_confirmation_rate",
                name: "1934. Confirmation Rate",
                leetcodeUrl: "https://leetcode.com/problems/confirmation-rate/",
                leetcodeSlug: "confirmation-rate",
                gfgUrl: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "sql-aggregates",
    stepTitle: "Basic Aggregate Functions",
    lessons: [
      {
        lessonId: "sql-aggregates-l1",
        lessonTitle: "SUM, AVG, COUNT & Aggregations",
        topics: [
          {
            topicId: "sql-aggregates-t1",
            topicTitle: "Aggregation & Metrics",
            problems: [
              {
                id: "sql_620_not_boring_movies",
                name: "620. Not Boring Movies",
                leetcodeUrl: "https://leetcode.com/problems/not-boring-movies/",
                leetcodeSlug: "not-boring-movies",
                gfgUrl: "",
              },
              {
                id: "sql_1251_average_selling_price",
                name: "1251. Average Selling Price",
                leetcodeUrl: "https://leetcode.com/problems/average-selling-price/",
                leetcodeSlug: "average-selling-price",
                gfgUrl: "",
              },
              {
                id: "sql_1075_project_employees_i",
                name: "1075. Project Employees I",
                leetcodeUrl: "https://leetcode.com/problems/project-employees-i/",
                leetcodeSlug: "project-employees-i",
                gfgUrl: "",
              },
              {
                id: "sql_1633_percentage_of_users_attended_a_contest",
                name: "1633. Percentage of Users Attended a Contest",
                leetcodeUrl: "https://leetcode.com/problems/percentage-of-users-attended-a-contest/",
                leetcodeSlug: "percentage-of-users-attended-a-contest",
                gfgUrl: "",
              },
              {
                id: "sql_1211_queries_quality_and_percentage",
                name: "1211. Queries Quality and Percentage",
                leetcodeUrl: "https://leetcode.com/problems/queries-quality-and-percentage/",
                leetcodeSlug: "queries-quality-and-percentage",
                gfgUrl: "",
              },
              {
                id: "sql_1193_monthly_transactions_i",
                name: "1193. Monthly Transactions I",
                leetcodeUrl: "https://leetcode.com/problems/monthly-transactions-i/",
                leetcodeSlug: "monthly-transactions-i",
                gfgUrl: "",
              },
              {
                id: "sql_1174_immediate_food_delivery_ii",
                name: "1174. Immediate Food Delivery II",
                leetcodeUrl: "https://leetcode.com/problems/immediate-food-delivery-ii/",
                leetcodeSlug: "immediate-food-delivery-ii",
                gfgUrl: "",
              },
              {
                id: "sql_550_game_play_analysis_iv",
                name: "550. Game Play Analysis IV",
                leetcodeUrl: "https://leetcode.com/problems/game-play-analysis-iv/",
                leetcodeSlug: "game-play-analysis-iv",
                gfgUrl: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "sql-sorting-grouping",
    stepTitle: "Sorting and Grouping",
    lessons: [
      {
        lessonId: "sql-sorting-grouping-l1",
        lessonTitle: "GROUP BY, HAVING & ORDER BY",
        topics: [
          {
            topicId: "sql-sorting-grouping-t1",
            topicTitle: "Grouping & Filtering Groups",
            problems: [
              {
                id: "sql_2356_number_of_unique_subjects_taught_by_each_teacher",
                name: "2356. Number of Unique Subjects Taught by Each Teacher",
                leetcodeUrl: "https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/",
                leetcodeSlug: "number-of-unique-subjects-taught-by-each-teacher",
                gfgUrl: "",
              },
              {
                id: "sql_1141_user_activity_for_the_past_30_days_i",
                name: "1141. User Activity for the Past 30 Days I",
                leetcodeUrl: "https://leetcode.com/problems/user-activity-for-the-past-30-days-i/",
                leetcodeSlug: "user-activity-for-the-past-30-days-i",
                gfgUrl: "",
              },
              {
                id: "sql_1070_product_sales_analysis_iii",
                name: "1070. Product Sales Analysis III",
                leetcodeUrl: "https://leetcode.com/problems/product-sales-analysis-iii/",
                leetcodeSlug: "product-sales-analysis-iii",
                gfgUrl: "",
              },
              {
                id: "sql_596_classes_more_than_5_students",
                name: "596. Classes More Than 5 Students",
                leetcodeUrl: "https://leetcode.com/problems/classes-more-than-5-students/",
                leetcodeSlug: "classes-more-than-5-students",
                gfgUrl: "",
              },
              {
                id: "sql_1729_find_followers_count",
                name: "1729. Find Followers Count",
                leetcodeUrl: "https://leetcode.com/problems/find-followers-count/",
                leetcodeSlug: "find-followers-count",
                gfgUrl: "",
              },
              {
                id: "sql_619_biggest_single_number",
                name: "619. Biggest Single Number",
                leetcodeUrl: "https://leetcode.com/problems/biggest-single-number/",
                leetcodeSlug: "biggest-single-number",
                gfgUrl: "",
              },
              {
                id: "sql_1045_customers_who_bought_all_products",
                name: "1045. Customers Who Bought All Products",
                leetcodeUrl: "https://leetcode.com/problems/customers-who-bought-all-products/",
                leetcodeSlug: "customers-who-bought-all-products",
                gfgUrl: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "sql-advanced-select-joins",
    stepTitle: "Advanced Select and Joins",
    lessons: [
      {
        lessonId: "sql-advanced-select-joins-l1",
        lessonTitle: "Complex Conditional Logic & Self-Joins",
        topics: [
          {
            topicId: "sql-advanced-select-joins-t1",
            topicTitle: "Advanced Joins & Case Statements",
            problems: [
              {
                id: "sql_1731_the_number_of_employees_which_report_to_each_employee",
                name: "1731. The Number of Employees Which Report to Each Employee",
                leetcodeUrl: "https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/",
                leetcodeSlug: "the-number-of-employees-which-report-to-each-employee",
                gfgUrl: "",
              },
              {
                id: "sql_1789_primary_department_for_each_employee",
                name: "1789. Primary Department for Each Employee",
                leetcodeUrl: "https://leetcode.com/problems/primary-department-for-each-employee/",
                leetcodeSlug: "primary-department-for-each-employee",
                gfgUrl: "",
              },
              {
                id: "sql_610_triangle_judgement",
                name: "610. Triangle Judgement",
                leetcodeUrl: "https://leetcode.com/problems/triangle-judgement/",
                leetcodeSlug: "triangle-judgement",
                gfgUrl: "",
              },
              {
                id: "sql_180_consecutive_numbers",
                name: "180. Consecutive Numbers",
                leetcodeUrl: "https://leetcode.com/problems/consecutive-numbers/",
                leetcodeSlug: "consecutive-numbers",
                gfgUrl: "",
              },
              {
                id: "sql_1164_product_price_at_a_given_date",
                name: "1164. Product Price at a Given Date",
                leetcodeUrl: "https://leetcode.com/problems/product-price-at-a-given-date/",
                leetcodeSlug: "product-price-at-a-given-date",
                gfgUrl: "",
              },
              {
                id: "sql_1204_last_person_to_fit_in_the_bus",
                name: "1204. Last Person to Fit in the Bus",
                leetcodeUrl: "https://leetcode.com/problems/last-person-to-fit-in-the-bus/",
                leetcodeSlug: "last-person-to-fit-in-the-bus",
                gfgUrl: "",
              },
              {
                id: "sql_1907_count_salary_categories",
                name: "1907. Count Salary Categories",
                leetcodeUrl: "https://leetcode.com/problems/count-salary-categories/",
                leetcodeSlug: "count-salary-categories",
                gfgUrl: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "sql-subqueries",
    stepTitle: "Subqueries",
    lessons: [
      {
        lessonId: "sql-subqueries-l1",
        lessonTitle: "Subqueries & Window Functions",
        topics: [
          {
            topicId: "sql-subqueries-t1",
            topicTitle: "Correlated Subqueries & CTEs",
            problems: [
              {
                id: "sql_1978_employees_whose_manager_left_the_company",
                name: "1978. Employees Whose Manager Left the Company",
                leetcodeUrl: "https://leetcode.com/problems/employees-whose-manager-left-the-company/",
                leetcodeSlug: "employees-whose-manager-left-the-company",
                gfgUrl: "",
              },
              {
                id: "sql_626_exchange_seats",
                name: "626. Exchange Seats",
                leetcodeUrl: "https://leetcode.com/problems/exchange-seats/",
                leetcodeSlug: "exchange-seats",
                gfgUrl: "",
              },
              {
                id: "sql_1341_movie_rating",
                name: "1341. Movie Rating",
                leetcodeUrl: "https://leetcode.com/problems/movie-rating/",
                leetcodeSlug: "movie-rating",
                gfgUrl: "",
              },
              {
                id: "sql_1321_restaurant_growth",
                name: "1321. Restaurant Growth",
                leetcodeUrl: "https://leetcode.com/problems/restaurant-growth/",
                leetcodeSlug: "restaurant-growth",
                gfgUrl: "",
              },
              {
                id: "sql_602_friend_requests_ii_who_has_the_most_friends",
                name: "602. Friend Requests II: Who Has the Most Friends",
                leetcodeUrl: "https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/",
                leetcodeSlug: "friend-requests-ii-who-has-the-most-friends",
                gfgUrl: "",
              },
              {
                id: "sql_585_investments_in_2016",
                name: "585. Investments in 2016",
                leetcodeUrl: "https://leetcode.com/problems/investments-in-2016/",
                leetcodeSlug: "investments-in-2016",
                gfgUrl: "",
              },
              {
                id: "sql_185_department_top_three_salaries",
                name: "185. Department Top Three Salaries",
                leetcodeUrl: "https://leetcode.com/problems/department-top-three-salaries/",
                leetcodeSlug: "department-top-three-salaries",
                gfgUrl: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stepId: "sql-string-regex",
    stepTitle: "Advanced String Functions / Regex / Clause",
    lessons: [
      {
        lessonId: "sql-string-regex-l1",
        lessonTitle: "String Formatting, REGEXP & Dates",
        topics: [
          {
            topicId: "sql-string-regex-t1",
            topicTitle: "String Manipulation & Regular Expressions",
            problems: [
              {
                id: "sql_1667_fix_names_in_a_table",
                name: "1667. Fix Names in a Table",
                leetcodeUrl: "https://leetcode.com/problems/fix-names-in-a-table/",
                leetcodeSlug: "fix-names-in-a-table",
                gfgUrl: "",
              },
              {
                id: "sql_1527_patients_with_a_condition",
                name: "1527. Patients With a Condition",
                leetcodeUrl: "https://leetcode.com/problems/patients-with-a-condition/",
                leetcodeSlug: "patients-with-a-condition",
                gfgUrl: "",
              },
              {
                id: "sql_196_delete_duplicate_emails",
                name: "196. Delete Duplicate Emails",
                leetcodeUrl: "https://leetcode.com/problems/delete-duplicate-emails/",
                leetcodeSlug: "delete-duplicate-emails",
                gfgUrl: "",
              },
              {
                id: "sql_176_second_highest_salary",
                name: "176. Second Highest Salary",
                leetcodeUrl: "https://leetcode.com/problems/second-highest-salary/",
                leetcodeSlug: "second-highest-salary",
                gfgUrl: "",
              },
              {
                id: "sql_1484_group_sold_products_by_the_date",
                name: "1484. Group Sold Products By The Date",
                leetcodeUrl: "https://leetcode.com/problems/group-sold-products-by-the-date/",
                leetcodeSlug: "group-sold-products-by-the-date",
                gfgUrl: "",
              },
              {
                id: "sql_1327_list_the_products_ordered_in_a_period",
                name: "1327. List the Products Ordered in a Period",
                leetcodeUrl: "https://leetcode.com/problems/list-the-products-ordered-in-a-period/",
                leetcodeSlug: "list-the-products-ordered-in-a-period",
                gfgUrl: "",
              },
              {
                id: "sql_1517_find_users_with_valid_e_mails",
                name: "1517. Find Users With Valid E-Mails",
                leetcodeUrl: "https://leetcode.com/problems/find-users-with-valid-e-mails/",
                leetcodeSlug: "find-users-with-valid-e-mails",
                gfgUrl: "",
              },
            ],
          },
        ],
      },
    ],
  },
];
