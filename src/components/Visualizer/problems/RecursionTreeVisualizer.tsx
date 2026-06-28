"use client";

import React from "react";
import { getStepIdForProblem } from "../visualizerRegistry";

export interface RecursionStep {
  stack: string[]; // Active calls, e.g. ["pow(2, 4)", "pow(2, 2)", "pow(2, 1)", "pow(2, 0)"]
  variables?: Record<string, any>;
  result?: any;
}

export function RecursionTreeVisualizer({
  step,
  problem,
}: {
  step: RecursionStep;
  problem?: any;
}) {
  const stack = step.stack || [];
  const variables = step.variables || {};

  const stepId = problem ? getStepIdForProblem(problem.id) : null;
  const isStackProblem = stepId === "step-9" && problem?.name?.toLowerCase().includes("stack");

  // Extract current value of n from active stack frame
  const activeFrame = stack[stack.length - 1] || "";
  const match = activeFrame.match(/n=(\d+)/);
  const nVal = match ? parseInt(match[1]) : null;

  // Render Left Side: Topic-Specific Visual structure
  const renderVisualStructure = () => {
    if (stepId === "step-12" || stepId === "step-13" || problem?.name?.toLowerCase().includes("tree")) {
      // 1. Binary Tree Traversals Visualizer
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
            🌳 Binary Tree View
          </div>
          <div className="relative w-[280px] h-[170px] border-4 border-black bg-stone-50 rounded-xl shadow-neo p-4 select-none overflow-hidden">
            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* 1 -> 2 */}
              <line x1="50%" y1="18%" x2="25%" y2="48%" stroke="black" strokeWidth="3" />
              {/* 1 -> 3 */}
              <line x1="50%" y1="18%" x2="75%" y2="48%" stroke="black" strokeWidth="3" />
              {/* 2 -> 4 */}
              <line x1="25%" y1="48%" x2="12.5%" y2="78%" stroke="black" strokeWidth="3" />
              {/* 2 -> 5 */}
              <line x1="25%" y1="48%" x2="37.5%" y2="78%" stroke="black" strokeWidth="3" />
              {/* 3 -> 6 */}
              <line x1="75%" y1="48%" x2="62.5%" y2="78%" stroke="black" strokeWidth="3" />
              {/* 3 -> 7 */}
              <line x1="75%" y1="48%" x2="87.5%" y2="78%" stroke="black" strokeWidth="3" />
            </svg>

            {/* Root Node 1 */}
            <div
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm transition-all duration-300 ${
                nVal === 3 ? "bg-neoYellow scale-110" : nVal !== null && nVal < 3 ? "bg-neoGreen" : "bg-white text-black"
              }`}
              style={{ left: "50%", top: "18%" }}
            >
              1
            </div>
            {/* Left Child 2 */}
            <div
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm transition-all duration-300 ${
                nVal === 2 ? "bg-neoYellow scale-110" : nVal !== null && nVal < 2 ? "bg-neoGreen" : "bg-white text-black"
              }`}
              style={{ left: "25%", top: "48%" }}
            >
              2
            </div>
            {/* Right Child 3 */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs bg-white text-black shadow-neo-sm"
              style={{ left: "75%", top: "48%" }}
            >
              3
            </div>
            {/* Child 4 */}
            <div
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm transition-all duration-300 ${
                nVal === 1 ? "bg-neoYellow scale-110" : nVal !== null && nVal < 1 ? "bg-neoGreen" : "bg-white text-black"
              }`}
              style={{ left: "12.5%", top: "78%" }}
            >
              4
            </div>
            {/* Child 5 */}
            <div
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm transition-all duration-300 ${
                nVal === 0 ? "bg-neoYellow scale-110" : "bg-white text-black"
              }`}
              style={{ left: "37.5%", top: "78%" }}
            >
              5
            </div>
            {/* Child 6 */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs bg-white text-black shadow-neo-sm"
              style={{ left: "62.5%", top: "78%" }}
            >
              6
            </div>
            {/* Child 7 */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs bg-white text-black shadow-neo-sm"
              style={{ left: "87.5%", top: "78%" }}
            >
              7
            </div>
          </div>
        </div>
      );
    }

    if (stepId === "step-14" || problem?.name?.toLowerCase().includes("graph")) {
      // 2. Graph DFS Traversal Visualizer
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
            🕸️ Graph Network View
          </div>
          <div className="relative w-[280px] h-[170px] border-4 border-black bg-stone-50 rounded-xl shadow-neo p-4 select-none overflow-hidden">
            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="black" strokeWidth="3" />
              <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="black" strokeWidth="3" />
              <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="black" strokeWidth="3" />
              <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="black" strokeWidth="3" />
              <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="black" strokeWidth="3" />
            </svg>

            {/* V0 Center */}
            <div
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm transition-all duration-300 ${
                nVal === 3 ? "bg-neoYellow scale-110" : nVal !== null && nVal < 3 ? "bg-neoGreen" : "bg-white text-black"
              }`}
              style={{ left: "50%", top: "50%" }}
            >
              V0
            </div>
            {/* V1 */}
            <div
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm transition-all duration-300 ${
                nVal === 2 ? "bg-neoYellow scale-110" : nVal !== null && nVal < 2 ? "bg-neoGreen" : "bg-white text-black"
              }`}
              style={{ left: "20%", top: "20%" }}
            >
              V1
            </div>
            {/* V2 */}
            <div
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm transition-all duration-300 ${
                nVal === 1 ? "bg-neoYellow scale-110" : nVal !== null && nVal < 1 ? "bg-neoGreen" : "bg-white text-black"
              }`}
              style={{ left: "80%", top: "20%" }}
            >
              V2
            </div>
            {/* V3 */}
            <div
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm transition-all duration-300 ${
                nVal === 0 ? "bg-neoYellow scale-110" : "bg-white text-black"
              }`}
              style={{ left: "20%", top: "80%" }}
            >
              V3
            </div>
            {/* V4 */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs bg-white text-black shadow-neo-sm"
              style={{ left: "80%", top: "80%" }}
            >
              V4
            </div>
          </div>
        </div>
      );
    }

    if (stepId === "step-15" || problem?.name?.toLowerCase().includes("dp")) {
      // 3. DP State memo table
      return (
        <div className="flex flex-col items-center gap-3 w-full max-w-[280px]">
          <div className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
            💾 DP Memoization Table (dp[i])
          </div>
          <div className="flex flex-col border-4 border-black rounded-lg overflow-hidden shadow-neo bg-white w-full">
            {[1, 1, 2, 3, 5, 8].map((val, idx) => {
              const isActive = nVal === idx;
              const isSolved = nVal !== null && idx < nVal;
              let cellBg = "bg-white";
              if (isActive) cellBg = "bg-neoYellow";
              else if (isSolved) cellBg = "bg-neoGreen";

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-4 py-2 font-black text-xs transition-all border-b-2 border-black last:border-b-0 ${cellBg}`}
                >
                  <span className="text-gray-400 font-mono">dp[{idx}]</span>
                  <span className="text-black">{val}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (isStackProblem) {
      // 4. Stack beaker view
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
            📥 Beaker Stack View
          </div>
          <div className="border-4 border-black border-t-0 bg-stone-50 p-2.5 rounded-b-2xl w-24 flex flex-col-reverse gap-2 min-h-[170px] justify-start shadow-neo-sm">
            {stack.map((frame, idx) => {
              const isTop = idx === stack.length - 1;
              return (
                <div
                  key={idx}
                  className={`w-full border-2 border-black rounded px-1.5 py-0.5 font-black text-[9px] text-center uppercase shadow-neo-sm transition-all duration-300 text-black ${
                    isTop ? "bg-neoYellow scale-102" : "bg-white opacity-70"
                  }`}
                >
                  {frame.split("(")[0]}
                </div>
              );
            })}
            {stack.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-[9px] font-black text-gray-400 uppercase italic">
                Empty
              </div>
            )}
          </div>
        </div>
      );
    }

    return null; // fallback: only display stack panel
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full py-6 select-none">
      {/* Variable Track Cards */}
      {(Object.keys(variables).length > 0 || step.result !== undefined) && (
        <div className="flex gap-3 mb-2 flex-wrap justify-center font-mono text-[10px] font-black uppercase text-black">
          {Object.entries(variables).map(([key, val]) => (
            <span key={key} className="bg-white border-2 border-black px-2 py-0.5 rounded shadow-neo-sm">
              {key}: {val !== null && val !== undefined ? String(val) : "null"}
            </span>
          ))}
          {step.result !== undefined && (
            <span className="bg-neoGreen border-2 border-black px-2 py-0.5 rounded shadow-neo-sm">
              Return Value: {String(step.result)}
            </span>
          )}
        </div>
      )}

      {/* Traversal display side-by-side */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 justify-center w-full max-w-2xl px-4">
        {/* Left Graphics */}
        {renderVisualStructure()}

        {/* Right Stack Panel */}
        <div className="flex flex-col-reverse items-center gap-2 border-4 border-black p-4 bg-white rounded-xl shadow-neo max-w-sm w-full min-h-[170px] justify-start select-none">
          {stack.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-xs font-bold uppercase text-gray-400 italic">
              Stack is empty
            </div>
          ) : (
            stack.map((frame, idx) => {
              const isTop = idx === stack.length - 1;
              let frameBg = "bg-white";
              let scaleClass = "";

              if (isTop) {
                frameBg = "bg-neoYellow";
                scaleClass = "scale-102 ring-2 ring-black";
              } else {
                frameBg = "bg-neoCream opacity-65";
              }

              return (
                <div
                  key={idx}
                  className={`w-full border-2 border-black rounded-lg px-4 py-2 flex items-center justify-between font-black text-xs transition-all duration-200 text-black ${frameBg} ${scaleClass}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="bg-black text-white w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px]">
                      {idx}
                    </span>
                    <span>{frame}</span>
                  </div>
                  {isTop && (
                    <span className="bg-neoPink border border-black text-[7px] px-1 rounded uppercase tracking-wider animate-pulse text-black">
                      Active Frame
                    </span>
                  )}
                </div>
              );
            })
          )}
          <div className="w-full text-center text-[10px] font-black text-gray-400 uppercase tracking-widest border-b-2 border-black pb-1 mb-1">
            📥 Execution Call Stack
          </div>
        </div>
      </div>
    </div>
  );
}
