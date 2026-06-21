import React from "react";

export interface RecursionStep {
  stack: string[]; // Active calls, e.g. ["pow(2, 4)", "pow(2, 2)", "pow(2, 1)", "pow(2, 0)"]
  variables?: Record<string, any>;
  result?: any;
}

export function RecursionTreeVisualizer({ step }: { step: RecursionStep }) {
  const stack = step.stack || [];
  const variables = step.variables || {};

  return (
    <div className="flex flex-col items-center gap-6 w-full py-6 select-none">
      {/* Variable Track Cards */}
      {(Object.keys(variables).length > 0 || step.result !== undefined) && (
        <div className="flex gap-3 mb-2 flex-wrap justify-center font-mono text-[10px] font-black uppercase">
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

      {/* Recursion Stack Frame Columns */}
      <div className="flex flex-col-reverse items-center gap-2 border-4 border-black p-4 bg-white rounded-xl shadow-neo max-w-sm w-full min-h-[160px] justify-start select-none">
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
                className={`w-full border-2 border-black rounded-lg px-4 py-2 flex items-center justify-between font-black text-xs transition-all duration-200 ${frameBg} ${scaleClass}`}
              >
                <div className="flex items-center gap-2">
                  <span className="bg-black text-white w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px]">
                    {idx}
                  </span>
                  <span>{frame}</span>
                </div>
                {isTop && (
                  <span className="bg-neoPink border border-black text-[7px] px-1 rounded uppercase tracking-wider animate-pulse">
                    Active Frame
                  </span>
                )}
              </div>
            );
          })
        )}
        <div className="w-full text-center text-[10px] font-black text-gray-400 uppercase tracking-widest border-b-2 border-black pb-1 mb-1">
          📥 Execution Stack Growth
        </div>
      </div>
    </div>
  );
}
