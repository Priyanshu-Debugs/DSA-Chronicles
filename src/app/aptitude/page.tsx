"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface TopicTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

interface AptitudeTopic {
  id: number;
  name: string;
  category: string;
  icon: string;
  color: string;
  summary: string;
  sections: {
    title?: string;
    description?: string;
    table?: TopicTable;
    list?: string[];
  }[];
  tips?: string[];
}

const TOPICS: AptitudeTopic[] = [
  {
    id: 1,
    name: "Number System",
    category: "Arithmetic",
    icon: "ti-hash",
    color: "bg-neoPink",
    summary: "Essential divisibility rules used to simplify calculations and test numbers rapidly.",
    sections: [
      {
        title: "Divisibility Rules (1 to 12)",
        description: "Rules to check whether a number is divisible by another integer without performing full long division:",
        table: {
          headers: ["Divisibility by", "Rule", "Example"],
          rows: [
            ["1", "All integers are divisible by 1.", "Any integer"],
            ["2", "If the last digit is even (0, 2, 4, 6, 8).", "128 (ends in 8)"],
            ["3", "If the sum of all digits is divisible by 3.", "273 (2+7+3 = 12, divisible by 3)"],
            ["4", "If the last two digits form a number divisible by 4.", "712 (last two digits 12 is divisible by 4)"],
            ["5", "If the number ends in 0 or 5.", "675 (ends in 5)"],
            ["6", "If the number is divisible by both 2 and 3.", "108 (ends in 8 and sum of digits 9 is divisible by 3)"],
            ["7", "Double the last digit, subtract it from the remaining number. Result is divisible by 7.", "203 (3 x 2 = 6, 20 - 6 = 14, divisible by 7)"],
            ["8", "If the last three digits form a number divisible by 8.", "816 (816 / 8 = 102)"],
            ["9", "If the sum of all digits is divisible by 9.", "729 (7+2+9 = 18, divisible by 9)"],
            ["10", "If the number ends in 0.", "340 (ends in 0)"],
            ["11", "Difference between the sum of digits at odd places and even places is 0 or divisible by 11.", "121 (sum of odds [1+1=2] minus sum of evens [2] = 0)"],
            ["12", "If the number is divisible by both 3 and 4.", "864 (sum of digits 18 is divisible by 3, last two 64 divisible by 4)"]
          ]
        }
      }
    ]
  },
  {
    id: 2,
    name: "LCM & HCF",
    category: "Arithmetic",
    icon: "ti-math-symbols",
    color: "bg-neoBlue",
    summary: "Least Common Multiple and Highest Common Factor relationships, factorization, and fraction rules.",
    sections: [
      {
        title: "Key Formulas & Relationships",
        table: {
          headers: ["Concept", "Formula / Rule", "Example"],
          rows: [
            ["1. LCM & HCF Product", "LCM(a, b) x HCF(a, b) = a x b (Only valid for two numbers)", "LCM(12, 18) = 36, HCF(12, 18) = 6. 36 x 6 = 12 x 18 = 216"],
            ["2. HCF (Prime Factorization)", "Product of the lowest power of common prime factors.", "HCF(24, 36) -> 24 = 2³ x 3¹, 36 = 2² x 3² -> HCF = 2² x 3¹ = 12"],
            ["3. LCM (Prime Factorization)", "Product of the highest power of all prime factors.", "LCM(24, 36) -> 24 = 2³ x 3¹, 36 = 2² x 3² -> LCM = 2³ x 3² = 72"],
            ["4. Euclidean Algorithm for HCF", "HCF(a, b) = HCF(b, a % b) until remainder is 0.", "HCF(56, 98) -> 98%56 = 42 -> 56%42 = 14 -> 42%14 = 0 -> HCF = 14"],
            ["5. LCM of Fractions", "LCM of Numerators / HCF of Denominators", "LCM(2/3, 5/6) -> LCM(2, 5) / HCF(3, 6) = 10/3"],
            ["6. HCF of Fractions", "HCF of Numerators / LCM of Denominators", "HCF(4/9, 10/15) -> HCF(4, 10) / LCM(9, 15) = 2/45"]
          ]
        }
      }
    ],
    tips: [
      "For any two co-prime numbers (like 7 and 9), HCF is always 1 and LCM is their product (63).",
      "LCM of fractions is always greater than or equal to HCF of fractions."
    ]
  },
  {
    id: 3,
    name: "Simplification & Approximation",
    category: "Arithmetic",
    icon: "ti-calculator",
    color: "bg-neoYellow",
    summary: "Shorthand rules, conversion keys, and arithmetic ordering shortcuts to speed up computations.",
    sections: [
      {
        title: "Calculations Shortcuts & Rules",
        table: {
          headers: ["Concept", "Rule / Shortcut Formula", "Example"],
          rows: [
            ["BODMAS Rule", "Brackets -> Orders (powers/roots) -> Division -> Multiplication -> Addition -> Subtraction", "8 + 2 x 5 - 3² = 8 + 10 - 9 = 9"],
            ["Multiplication Trick", "(a + b)(a - b) = a² - b²", "102 x 98 = (100 + 2)(100 - 2) = 100² - 2² = 10000 - 4 = 9996"],
            ["Square of Number Ending in 5", "For number X5: Square = (X) x (X + 1) followed by 25", "35² -> X=3 -> 3 x (3+1) = 12 followed by 25 = 1225"],
            ["% to Fraction", "x% = x / 100", "25% = 25/100 = 1/4"],
            ["Fraction to %", "x/y = (x/y) x 100%", "3/5 = (3/5) x 100 = 60%"],
            ["CI Approximation", "Amount = P(1 + R/100)^T. For small rates, CI ~ P x R x T / 100", "P=1000, R=10%, T=2 -> A = 1000 x 1.1² = 1210"],
            ["Approximate Sqrt", "Find closest perfect square", "√50 ~ √49 = 7"],
            ["Ratio & Proportion", "a/b = c/d => a x d = b x c", "If 2/3 = 4/x => 2x = 12 => x = 6"]
          ]
        }
      }
    ]
  },
  {
    id: 4,
    name: "Percentage",
    category: "Arithmetic",
    icon: "ti-percentage",
    color: "bg-neoGreen",
    summary: "Conversions, percentage increase/decrease, successive percentage changes, and growth formulas.",
    sections: [
      {
        title: "Core Percentage Formulas",
        table: {
          headers: ["Concept", "Formula / Rule", "Example"],
          rows: [
            ["Definition", "x% = x / 100", "20% = 20/100 = 0.20"],
            ["Percentage Increase", "New Value = Old Value x (1 + Increase% / 100)", "Price ₹500, increases 10% -> New = 500 x 1.1 = ₹550"],
            ["Percentage Decrease", "New Value = Old Value x (1 - Decrease% / 100)", "Price ₹400, decreases 20% -> New = 400 x 0.8 = ₹320"],
            ["Percentage Change", "(Change in Value / Original Value) x 100%", "Increase from 50 to 65 -> (15 / 50) x 100 = 30%"],
            ["A is what % of B?", "(A / B) x 100%", "What % is 20 of 50? -> (20 / 50) x 100 = 40%"],
            ["Finding X of Y", "Result = Y x (X / 100)", "Find 25% of 200 -> 200 x 0.25 = 50"],
            ["Successive Changes", "Net Change = (a + b + ab/100)%\n(use negative value for decrease)", "Increase 10% then 20% -> Net = 10 + 20 + (10x20)/100 = 32%"],
            ["Population Growth", "P = P0 x (1 + r/100)^t (use minus for depreciation)", "Pop 5000, grows 5% for 2 years -> 5000 x 1.05² = 5512.5"]
          ]
        }
      }
    ]
  },
  {
    id: 5,
    name: "Profit, Loss & Discount",
    category: "Arithmetic",
    icon: "ti-receipt-tax",
    color: "bg-neoPurple",
    summary: "Selling Price, Cost Price, Markups, Discounts, and Margin conversions.",
    sections: [
      {
        title: "Profit, Loss & Margins",
        table: {
          headers: ["Concept", "Formula / Rule", "Example"],
          rows: [
            ["1. Profit", "Profit = Selling Price (SP) - Cost Price (CP)", "SP = ₹250, CP = ₹200 -> Profit = ₹50"],
            ["2. Loss", "Loss = Cost Price (CP) - Selling Price (SP)", "CP = ₹200, SP = ₹150 -> Loss = ₹50"],
            ["3. Profit Percentage", "Profit% = (Profit / CP) x 100%", "Profit = ₹50, CP = ₹200 -> Profit% = (50/200) x 100 = 25%"],
            ["4. Loss Percentage", "Loss% = (Loss / CP) x 100%", "Loss = ₹50, CP = ₹200 -> Loss% = (50/200) x 100 = 25%"],
            ["5. CP from Profit%", "CP = SP / (1 + Profit% / 100)", "SP = ₹250, Profit% = 25% -> CP = 250 / 1.25 = ₹200"],
            ["6. SP from Profit%", "SP = CP x (1 + Profit% / 100)", "CP = ₹200, Profit% = 25% -> SP = 200 x 1.25 = ₹250"],
            ["7. Discount", "Discount = Marked Price (MP) - Selling Price (SP)", "MP = ₹500, SP = ₹400 -> Discount = ₹100"],
            ["8. Discount Percentage", "Discount% = (Discount / MP) x 100%", "Discount = ₹100, MP = ₹500 -> Discount% = 20%"],
            ["9. SP with Discount", "SP = MP x (1 - Discount% / 100)", "MP = ₹500, Discount% = 20% -> SP = 500 x 0.8 = ₹400"]
          ]
        }
      }
    ]
  },
  {
    id: 6,
    name: "Ratio & Proportion",
    category: "Arithmetic",
    icon: "ti-scale",
    color: "bg-neoRed",
    summary: "Ratios, Proportions, Mean Proportional, and Direct/Inverse relationships.",
    sections: [
      {
        title: "Ratio Rules",
        table: {
          headers: ["Concept", "Formula / Rule", "Example"],
          rows: [
            ["1. Basic Ratio", "a:b = a / b", "If a:b = 2:3 -> a/b = 2/3"],
            ["2. Simplifying Ratio", "Divide both terms by their HCF", "12:16 -> HCF is 4 -> Simplified = 3:4"],
            ["3. Proportion Rule", "a:b :: c:d <=> a/b = c/d", "2/4 = 3/6 (Both equal 1/2) -> In proportion"],
            ["4. Cross Multiplication", "If a/b = c/d => a x d = b x c", "2/x = 4/10 => 4x = 20 => x = 5"],
            ["5. Mean Proportional", "Mean Proportional of a and b = √(a x b)", "Mean of 4 and 9 = √(4 x 9) = √36 = 6"],
            ["6. Direct Proportion", "y = k x x (where k is a constant)", "If y ∝ x, and y=12 when x=4 -> k=3 -> y = 3x"],
            ["7. Inverse Proportion", "y = k / x (where k is a constant)", "If y ∝ 1/x, and y=3 when x=4 -> k=12 -> y = 12/x"],
            ["8. Dividing a Quantity", "Part A = Total x [ a / (a + b) ]", "Divide ₹5000 in ratio 2:3 -> Part A = 5000 x 2/5 = ₹2000"]
          ]
        }
      }
    ]
  },
  {
    id: 7,
    name: "Simple & Compound Interest",
    category: "Finance",
    icon: "ti-coin",
    color: "bg-neoPink",
    summary: "Interest formulas for annual, half-yearly, and quarterly periods.",
    sections: [
      {
        title: "Interest & Amounts",
        table: {
          headers: ["Concept", "Formula", "Example"],
          rows: [
            ["1. Simple Interest (SI)", "SI = (P x R x T) / 100", "P = ₹1000, R = 5%, T = 2 years -> SI = (1000x5x2)/100 = ₹100"],
            ["2. SI Amount", "Amount (A) = P + SI", "P = ₹1000, SI = ₹100 -> A = ₹1100"],
            ["3. Compound Interest (CI)", "CI = A - P", "A = ₹1102.50, P = ₹1000 -> CI = ₹102.50"],
            ["4. CI Amount (Annual)", "A = P x (1 + R/100)^T", "P = ₹1000, R = 5%, T = 2 years -> A = 1000 x 1.05² = ₹1102.50"],
            ["5. CI Amount (Half-Yearly)", "A = P x (1 + R/200)^(2T)", "P = ₹1000, R = 10%, T = 1 year -> A = 1000 x (1 + 10/200)² = ₹1102.50"],
            ["6. CI Amount (Quarterly)", "A = P x (1 + R/400)^(4T)", "P = ₹1000, R = 12%, T = 1 year -> A = 1000 x (1 + 12/400)⁴ = ₹1125.51"]
          ]
        }
      }
    ]
  },
  {
    id: 8,
    name: "Time, Speed & Distance",
    category: "Word Problems",
    icon: "ti-car",
    color: "bg-neoBlue",
    summary: "Speed calculations, relative speed, trains crossing, and boat downstream/upstream formulas.",
    sections: [
      {
        title: "Speed, Distance, Trains & Boats",
        table: {
          headers: ["Concept", "Formula / Rule", "Example"],
          rows: [
            ["1. Basic Formula", "Speed = Distance / Time", "Distance = 100 km, Time = 2 hours -> Speed = 50 km/h"],
            ["2. Distance Formula", "Distance = Speed x Time", "Speed = 60 km/h, Time = 3 hours -> Distance = 180 km"],
            ["3. Relative Speed", "Same dir: S1 - S2\nOpposite dir: S1 + S2", "Car A (50 km/h) & Car B (30 km/h) same dir -> Relative = 20 km/h"],
            ["4. Train Crossing Pole", "Time = Length of Train / Speed", "Length = 100 m, Speed = 72 km/h (20 m/s) -> Time = 100/20 = 5s"],
            ["5. Train Crossing Bridge", "Time = (Length1 + Length2) / Speed", "Train = 120m, Bridge = 180m, Speed = 15 m/s -> Time = 300/15 = 20s"],
            ["6. Boats (Upstream)", "Speed Up = Boat Speed (Sb) - Stream Speed (Ss)", "Sb = 10 km/h, Ss = 2 km/h -> Speed Up = 8 km/h"],
            ["7. Boats (Downstream)", "Speed Down = Boat Speed (Sb) + Stream Speed (Ss)", "Sb = 10 km/h, Ss = 2 km/h -> Speed Down = 12 km/h"],
            ["8. Still Water Boat Speed", "Sb = (Speed Down + Speed Up) / 2", "Speed Down = 12 km/h, Speed Up = 8 km/h -> Sb = 10 km/h"],
            ["9. Stream Speed", "Ss = (Speed Down - Speed Up) / 2", "Speed Down = 12 km/h, Speed Up = 8 km/h -> Ss = 2 km/h"]
          ]
        }
      }
    ],
    tips: [
      "To convert km/h to m/s, multiply by 5/18.",
      "To convert m/s to km/h, multiply by 18/5."
    ]
  },
  {
    id: 9,
    name: "Time & Work",
    category: "Word Problems",
    icon: "ti-tool",
    color: "bg-neoYellow",
    summary: "Work rates, combined work efficiency, and pipes & cisterns logic.",
    sections: [
      {
        title: "Work & Tank Filling",
        table: {
          headers: ["Concept", "Formula / Rule", "Example"],
          rows: [
            ["1. Work Rate", "Work Rate = 1 / Time taken", "If A completes work in 4 days -> Work rate = 1/4 of work per day"],
            ["2. Combined Work", "Combined Rate = 1/A + 1/B", "A in 6h, B in 8h -> Combined = 1/6 + 1/8 = 7/24 per hour"],
            ["3. Combined Time", "Time = 1 / Combined Rate", "If combined rate is 7/24 -> Time = 24/7 = 3.43 hours"],
            ["4. Emptying Tank (Outflow)", "Negative Work Rate = -1 / Time to empty", "Inlet fills in 6h, outlet empties in 8h -> Net rate = 1/6 - 1/8 = 1/24 per hour"],
            ["5. Worker Efficiency", "Efficiency = Work / Time (Inverse of time ratio)", "A is twice as efficient as B -> A's Time : B's Time = 1 : 2"],
            ["6. Men & Days (MDH)", "(M1 x D1 x H1) / W1 = (M2 x D2 x H2) / W2", "10 men work 6h/day for 12 days to complete 1 unit. How many days for 15 men working 8h/day? -> (10x12x6) = (15xDx8) => D = 6 days"]
          ]
        }
      }
    ]
  },
  {
    id: 10,
    name: "Average",
    category: "Arithmetic",
    icon: "ti-chart-bar",
    color: "bg-neoGreen",
    summary: "Means, weighted averages, average speeds, and medians.",
    sections: [
      {
        title: "Averages & Medians",
        table: {
          headers: ["Concept", "Formula / Rule", "Example"],
          rows: [
            ["1. Average of n Numbers", "Average = Sum of all values / n", "Average of 5, 10, 15 = (5+10+15)/3 = 10"],
            ["2. Weighted Average", "Avg = (x1.w1 + x2.w2) / (w1 + w2)", "Mix 2kg rice (₹40) & 3kg rice (₹50) -> Avg cost = (2x40 + 3x50)/(2+3) = ₹46/kg"],
            ["3. Average Speed (Equal Dist)", "Avg Speed = 2 x S1 x S2 / (S1 + S2)", "Travel at 40 km/h and return at 60 km/h -> Avg = (2x40x60)/(40+60) = 48 km/h"],
            ["4. Harmonic Mean", "HM = n / ∑(1/xi)", "HM of 2 and 4 = 2 / (1/2 + 1/4) = 2 / (3/4) = 8/3 = 2.67"],
            ["5. Median (Odd n)", "Median = Value at position (n + 1)/2", "Median of [3, 5, 8] -> Position (3+1)/2 = 2nd -> Median = 5"],
            ["6. Median (Even n)", "Median = Average of values at n/2 and (n/2 + 1)", "Median of [3, 5, 8, 10] -> Avg of 2nd (5) and 3rd (8) -> Median = 6.5"]
          ]
        }
      }
    ]
  },
  {
    id: 11,
    name: "Mixtures & Alligation",
    category: "Arithmetic",
    icon: "ti-flask",
    color: "bg-neoPurple",
    summary: "Alligation rules, cost of mixtures, and pricing ratios.",
    sections: [
      {
        title: "Alligation Ratios",
        table: {
          headers: ["Concept", "Formula / Rule", "Example"],
          rows: [
            ["1. Alligation Mean", "Mean Cost = (C1.W1 + C2.W2) / (W1 + W2)", "10L liquid (₹20/L) + 20L (₹30/L) -> Mean = (200 + 600)/30 = ₹26.67/L"],
            ["2. Alligation Rule Ratio", "Quantity of Cheaper / Quantity of Dearer = (Dearer Price - Mean Price) / (Mean Price - Cheaper Price)", "Mix water (₹0) and milk (₹50) to get mixture worth ₹40 -> Ratio Water:Milk = (50 - 40)/(40 - 0) = 10:40 = 1:4"],
            ["3. Quantity of Component Needed", "Quantity = Ratio Proportion x Total Weight", "Total 50kg mixture in 2:3 ratio -> Component 1 = 50 x 2/5 = 20kg"]
          ]
        }
      }
    ]
  },
  {
    id: 12,
    name: "Basic Geometry",
    category: "Geometry",
    icon: "ti-square",
    color: "bg-neoRed",
    summary: "Area, perimeter, angle sums, and properties of shapes.",
    sections: [
      {
        title: "Area & Perimeter",
        table: {
          headers: ["Shape / Concept", "Area Formula", "Perimeter / Circumference"],
          rows: [
            ["Rectangle", "Area = length x breadth", "Perimeter = 2 x (length + breadth)"],
            ["Square", "Area = side²", "Perimeter = 4 x side"],
            ["Triangle", "Area = 1/2 x base x height", "Perimeter = a + b + c"],
            ["Circle", "Area = π x radius²", "Circumference = 2 x π x radius"],
            ["Parallelogram", "Area = base x height", "Perimeter = 2 x (a + b)"],
            ["Rhombus", "Area = 1/2 x diagonal1 x diagonal2", "Perimeter = 4 x side"]
          ]
        }
      },
      {
        title: "Angles & Triangles Rules",
        list: [
          "Sum of interior angles of a triangle is always 180°.",
          "Complementary Angles: A + B = 90°.",
          "Supplementary Angles: A + B = 180°.",
          "Exterior Angle of a triangle equals the sum of the opposite interior angles."
        ]
      }
    ]
  },
  {
    id: 13,
    name: "Trigonometric Formulas",
    category: "Geometry",
    icon: "ti-triangle",
    color: "bg-neoPink",
    summary: "Trigonometric ratios, values, reciprocal identities, and double angle formulas.",
    sections: [
      {
        title: "Ratios in a Right Triangle",
        description: "Given opposite side (p), adjacent side (b), and hypotenuse (h):",
        table: {
          headers: ["Ratios", "Formula"],
          rows: [
            ["sin θ", "p / h"],
            ["cos θ", "b / h"],
            ["tan θ", "p / b"],
            ["cosec θ", "h / p"],
            ["sec θ", "h / b"],
            ["cot θ", "b / p"]
          ]
        }
      },
      {
        title: "Trigonometric Value Table",
        table: {
          headers: ["Angle θ", "sin θ", "cos θ", "tan θ", "cosec θ", "sec θ", "cot θ"],
          rows: [
            ["0°", "0", "1", "0", "∞", "1", "∞"],
            ["30°", "1/2", "√3/2", "1/√3", "2", "2/√3", "√3"],
            ["45°", "1/√2", "1/√2", "1", "√2", "√2", "1"],
            ["60°", "√3/2", "1/2", "√3", "2/√3", "2", "1/√3"],
            ["90°", "1", "0", "∞", "1", "∞", "0"]
          ]
        }
      },
      {
        title: "Common Identities & Double Angles",
        list: [
          "Pythagorean: sin² θ + cos² θ = 1",
          "Pythagorean: 1 + tan² θ = sec² θ",
          "Pythagorean: 1 + cot² θ = cosec² θ",
          "Reciprocal: cosec θ = 1 / sin θ  |  sec θ = 1 / cos θ  |  cot θ = 1 / tan θ",
          "Double Angle: sin 2A = 2 sin A cos A",
          "Double Angle: cos 2A = cos² A - sin² A = 2 cos² A - 1 = 1 - 2 sin² A",
          "Angle of Elevation: tan θ = Height of Object / Distance from Observer",
          "Angle of Depression: tan θ = Height Difference / Horizontal Distance"
        ]
      }
    ]
  }
];

export default function AptitudePage() {
  const { user, profile, logout, loading, isFirebaseAvailable } = useAuth();
  const [activeTopicId, setActiveTopicId] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = TOPICS.filter((topic) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    // Search by topic name, summary, category or section text
    const matchesHeader =
      topic.name.toLowerCase().includes(query) ||
      topic.category.toLowerCase().includes(query) ||
      topic.summary.toLowerCase().includes(query);

    const matchesContent = topic.sections.some((sec) => {
      const matchTitle = sec.title?.toLowerCase().includes(query);
      const matchDesc = sec.description?.toLowerCase().includes(query);
      const matchTable = sec.table?.rows.some((row) =>
        row.some((cell) => cell.toLowerCase().includes(query))
      );
      const matchList = sec.list?.some((item) => item.toLowerCase().includes(query));
      return matchTitle || matchDesc || matchTable || matchList;
    });

    return matchesHeader || matchesContent;
  });

  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];

  return (
    <div className="min-h-screen bg-neoCream flex flex-col w-full pb-16">
      {/* Standalone Aptitude Navbar */}
      <nav className="bg-white border-b-4 border-black sticky top-0 z-40 select-none w-full mb-6">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Branding Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 select-none">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 rounded border-2 border-black object-cover shadow-neo-sm transform -rotate-3 shrink-0"
            />
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase border-2 border-black px-2 py-0.5 bg-neoPurple shadow-neo-sm transform -rotate-1 text-black">
              Aptitude Chronicles
            </span>
          </Link>

          {/* Right Navigation & Profile Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <Link
              href="/dashboard"
              className="shrink-0 text-xs font-black uppercase border-2 border-black py-1.5 px-3 rounded bg-neoYellow shadow-neo-sm hover:translate-y-0.5 transition-all neo-clickable text-black"
            >
              ← Back to DSA
            </Link>

            {isFirebaseAvailable && !loading && (
              <div className="flex items-center space-x-2 border-l-2 border-black pl-3 shrink-0">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-1.5 text-xs font-black uppercase text-black border-2 border-black px-2.5 py-1 bg-neoYellow shadow-neo-sm hover:-translate-y-0.5 neo-clickable animate-float-fast"
                      title="View Profile"
                    >
                      {user.photoURL && (
                        <img
                          src={user.photoURL}
                          alt="Avatar"
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full border border-black object-cover shrink-0"
                        />
                      )}
                      <span className="hidden md:inline-block max-w-[100px] truncate">
                        {profile?.displayName || user.email?.split("@")[0] || "Profile"}
                      </span>
                    </Link>
                    <button
                      onClick={logout}
                      className="shrink-0 text-xs font-black uppercase border-2 border-black py-1.5 px-3 rounded bg-neoRed shadow-neo-sm hover:bg-red-300 transition-all neo-clickable cursor-pointer text-black"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="shrink-0 text-xs font-black uppercase border-2 border-black py-1.5 px-3 rounded bg-neoGreen shadow-neo-sm hover:bg-green-300 transition-all neo-clickable text-black"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Dashboard Container */}
      <div className="max-w-6xl w-full mx-auto px-4 space-y-6">
        {/* Page Header */}
        <header className="bg-white border-4 border-black p-5 shadow-neo rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2">
                <i className="ti ti-calculator text-neoPurple text-3xl" />
                <span>Quantitative Aptitude Formulas</span>
              </h1>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                Found {filteredTopics.length} / {TOPICS.length} topic sheets
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => window.print()}
                className="text-xs font-black uppercase border-2 border-black py-1.5 px-3 rounded bg-white hover:bg-stone-50 shadow-neo-sm neo-clickable cursor-pointer text-black"
                title="Print cheat sheets"
              >
                🖨️ Print Notes
              </button>
            </div>
          </div>

        {/* Search Bar Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, formulas, or example problems..."
            className="w-full bg-white border-2 border-black p-3 rounded-md font-bold text-sm outline-none focus:bg-yellow-50 focus:shadow-neo-sm transition-all text-black"
          />
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Topic Selector List */}
        <aside className="lg:col-span-4 space-y-3">
          <div className="bg-white border-4 border-black p-4 rounded-xl shadow-neo">
            <h3 className="font-black text-sm uppercase text-gray-500 tracking-wider mb-3 pb-2 border-b-2 border-gray-100">
              📁 Topics Index
            </h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-custom min-w-0">
              {filteredTopics.map((topic) => {
                const isActive = topic.id === activeTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopicId(topic.id)}
                    className={`shrink-0 text-left w-auto lg:w-full border-2 border-black p-3 rounded-lg text-xs md:text-sm font-black uppercase tracking-tight shadow-neo-sm transition-all hover:bg-stone-50 neo-clickable cursor-pointer ${
                      isActive ? `${topic.color} translate-x-[1px] translate-y-[1px] shadow-none` : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <i className={`ti ${topic.icon} text-lg`} />
                      <span className="truncate">{topic.name}</span>
                    </div>
                  </button>
                );
              })}
              {filteredTopics.length === 0 && (
                <div className="py-8 text-center text-xs font-bold text-gray-500 uppercase">
                  No matching sheets
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Right Side: Notes Display (using notebook-paper style) */}
        <section className="lg:col-span-8 flex flex-col">
          <div className="bg-white border-4 border-black rounded-xl shadow-neo overflow-hidden flex-1 flex flex-col">
            
            {/* Folder tab styled top bar */}
            <div className="bg-gray-100 border-b-4 border-black px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-neoRed border border-black" />
                <span className="w-3.5 h-3.5 rounded-full bg-neoYellow border border-black" />
                <span className="w-3.5 h-3.5 rounded-full bg-neoGreen border border-black" />
              </div>
              <div className="font-mono text-xs font-bold uppercase text-gray-500">
                Aptitude Sheet #{String(activeTopic.id).padStart(2, "0")}
              </div>
            </div>

            {/* Lined Notebook Paper Rendering */}
            <div className="flex-1 min-h-[500px]">
              <div className="notebook-paper w-full h-full min-h-[500px] pb-12">
                
                {/* Note title */}
                <div className="relative mb-6">
                  <h2 className="text-3xl font-black uppercase text-black tracking-tight border-b-4 border-black pb-2 inline-block">
                    {activeTopic.name}
                  </h2>
                  <span className="bg-neoYellow text-black border-2 border-black text-[10px] font-black uppercase tracking-wider py-1 px-2.5 rounded ml-4 absolute top-1">
                    {activeTopic.category}
                  </span>
                </div>

                {/* Summary Intro */}
                <p className="text-sm font-bold text-gray-700 italic border-l-4 border-black pl-3 py-1 mb-8">
                  {activeTopic.summary}
                </p>

                {/* Sections Render loop */}
                <div className="space-y-8 select-text">
                  {activeTopic.sections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      {section.title && (
                        <h4 className="font-black text-lg text-black uppercase tracking-tight border-b-2 border-black/10 pb-1">
                          📌 {section.title}
                        </h4>
                      )}
                      
                      {section.description && (
                        <p className="text-xs font-bold text-gray-650 leading-relaxed">
                          {section.description}
                        </p>
                      )}

                      {/* Formulas / Rules Table */}
                      {section.table && (
                        <div className="border-2 border-black rounded-lg overflow-hidden bg-white shadow-neo-sm my-4">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-stone-50 border-b-2 border-black text-[10px] md:text-xs font-black uppercase tracking-wider text-gray-650 font-mono">
                                {section.table.headers.map((h, i) => (
                                  <th key={i} className="py-2.5 px-3 md:px-4">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-black/10">
                              {section.table.rows.map((row, i) => (
                                <tr key={i} className="hover:bg-yellow-50/40 transition-colors">
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className={`py-2.5 px-3 md:px-4 text-xs font-bold leading-normal text-gray-800 ${
                                      cellIdx === 0 ? "font-black" : cellIdx === 1 ? "font-semibold whitespace-pre-line" : "italic text-gray-600"
                                    }`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Key Rules List */}
                      {section.list && (
                        <ul className="space-y-2 text-xs font-bold text-gray-750">
                          {section.list.map((item, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="text-neoRed select-none text-sm">🗲</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {/* Tips Section */}
                  {activeTopic.tips && activeTopic.tips.length > 0 && (
                    <div className="mt-8 bg-yellow-50 border-2 border-dashed border-yellow-300 p-4 rounded-xl shadow-neo-sm transform -rotate-1 select-none">
                      <h4 className="font-black text-sm uppercase text-yellow-800 mb-2 flex items-center gap-1.5">
                        💡 Exam Tips & Shortcuts
                      </h4>
                      <ul className="space-y-2 text-xs font-bold text-yellow-950">
                        {activeTopic.tips.map((tip, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="text-yellow-600 select-none">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  </div>
  );
}

