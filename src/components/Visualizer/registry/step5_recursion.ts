import { ProblemVisualizerMeta } from "../visualizerRegistry";

export const step5RecursionRegistry: Record<string, ProblemVisualizerMeta> = {
  "1_pow(x,_n)": {
    problemName: "Pow(x, n)",
    category: "recursion",
    description: "Calculate x raised to the power n using recursive binary exponentiation.",
    visualizerType: "recursion",
    defaultInput: {
      array: [5] // stack depth n=5
    },
    generateSteps: (input) => {
      const steps = [];
      const stack = ["myPow(2.0, 5)"];
      steps.push({
        stack: [...stack],
        variables: { x: 2.0, n: 5 },
        description: "Calculate myPow(2.0, 5): calling recursive step for exponent 5.",
        codeLine: 5
      });
      stack.push("myPow(2.0, 2)");
      steps.push({
        stack: [...stack],
        variables: { x: 2.0, n: 2 },
        description: "Calling myPow(2.0, 5 // 2) -> myPow(2.0, 2).",
        codeLine: 5
      });
      stack.push("myPow(2.0, 1)");
      steps.push({
        stack: [...stack],
        variables: { x: 2.0, n: 1 },
        description: "Calling myPow(2.0, 2 // 2) -> myPow(2.0, 1).",
        codeLine: 5
      });
      stack.push("myPow(2.0, 0)");
      steps.push({
        stack: [...stack],
        variables: { x: 2.0, n: 0 },
        description: "Base case reached: n == 0. Return 1.0.",
        codeLine: 2
      });
      stack.pop();
      steps.push({
        stack: [...stack],
        result: 2.0,
        variables: { x: 2.0, n: 1 },
        description: "Returning from myPow(2.0, 0). Solve myPow(2.0, 1) = 1.0 * 1.0 * 2.0 = 2.0.",
        codeLine: 7
      });
      stack.pop();
      steps.push({
        stack: [...stack],
        result: 4.0,
        variables: { x: 2.0, n: 2 },
        description: "Returning from myPow(2.0, 1). Solve myPow(2.0, 2) = 2.0 * 2.0 = 4.0.",
        codeLine: 7
      });
      stack.pop();
      steps.push({
        stack: [...stack],
        result: 32.0,
        variables: { x: 2.0, n: 5 },
        description: "Returning from myPow(2.0, 2). Solve myPow(2.0, 5) = 4.0 * 4.0 * 2.0 = 32.0.",
        codeLine: 7
      });
      return steps;
    },
    solutions: {
      python: [{ label: "Efficient", code: `def myPow(x, n):
    if n == 0: return 1.0
    if n < 0:
        x = 1.0 / x
        n = -n
    half = myPow(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x` }],
      java: [{ label: "Optimal", code: `class Solution {
    public double myPow(double x, int n) {
        if (n == 0) return 1.0;
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        return solve(x, N);
    }
    private double solve(double x, long n) {
        if (n == 0) return 1.0;
        double half = solve(x, n / 2);
        if (n % 2 == 0) return half * half;
        return half * half * x;
    }
}` }],
      javascript: [{ label: "Optimal", code: `function myPow(x, n) {
  if (n === 0) return 1.0;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let half = myPow(x, Math.floor(n / 2));
  if (n % 2 === 0) return half * half;
  return half * half * x;
}` }]
    }
  }
};
