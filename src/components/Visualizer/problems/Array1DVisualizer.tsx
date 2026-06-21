import React from "react";

export interface Array1DStep {
  array: (number | string)[];
  pointers: Record<string, number | null>; // pointerName -> index
  highlights?: Record<number, "active" | "compare" | "swap" | "sorted" | "inactive">;
  variables?: Record<string, any>;
  target?: number | string;
}

export function Array1DVisualizer({ step }: { step: Array1DStep }) {
  const highlights = step.highlights || {};
  const variables = step.variables || {};

  return (
    <div className="flex flex-col items-center gap-6 w-full py-6 select-none">
      {/* Variables Monitor Panel */}
      {Object.keys(variables).length > 0 && (
        <div className="flex gap-3 mb-2 flex-wrap justify-center font-mono text-[10px] font-black uppercase">
          {Object.entries(variables).map(([key, val]) => (
            <span key={key} className="bg-white border-2 border-black px-2 py-0.5 rounded shadow-neo-sm">
              {key}: {val !== null && val !== undefined ? String(val) : "null"}
            </span>
          ))}
          {step.target !== undefined && (
            <span className="bg-neoYellow border-2 border-black px-2 py-0.5 rounded shadow-neo-sm">
              Target: {step.target}
            </span>
          )}
        </div>
      )}

      {/* 1D Array Blocks Display */}
      <div className="flex flex-wrap gap-3 items-end justify-center select-none min-h-[140px] w-full max-w-xl px-4">
        {(step.array || (step as any).nums || []).map((val, idx) => {
          // Find all pointers targeting this index
          const activePointers = Object.entries(step.pointers || {})
            .filter(([_, ptrIdx]) => ptrIdx === idx)
            .map(([name, _]) => name);

          const highlight = highlights[idx];
          
          let cardBg = "bg-white";
          let scaleClass = "";
          let borderStyle = "border-4 border-black";

          if (highlight === "active") {
            cardBg = "bg-neoYellow";
            scaleClass = "scale-105";
          } else if (highlight === "compare") {
            cardBg = "bg-neoBlue";
          } else if (highlight === "swap") {
            cardBg = "bg-neoPink";
            borderStyle = "border-4 border-black border-dashed";
            scaleClass = "scale-105";
          } else if (highlight === "sorted") {
            cardBg = "bg-neoGreen";
          } else if (highlight === "inactive") {
            cardBg = "bg-white opacity-40";
          }

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Stacked pointer label badges above the block */}
              <div className="h-10 flex flex-col items-center justify-end gap-0.5 mb-1">
                {activePointers.map((name) => (
                  <span
                    key={name}
                    className={`border-2 border-black px-1 py-0.2 rounded shadow-neo-sm text-[8px] font-black uppercase ${
                      name === "left" || name === "low"
                        ? "bg-neoBlue"
                        : name === "right" || name === "high"
                        ? "bg-neoPink"
                        : "bg-neoYellow"
                    }`}
                  >
                    {name}
                  </span>
                ))}
              </div>

              {/* Block card */}
              <div className={`w-12 h-12 rounded-lg ${cardBg} ${borderStyle} ${scaleClass} shadow-neo flex items-center justify-center font-black text-lg transition-all duration-200`}>
                {val}
              </div>

              {/* Index number indicator */}
              <span className="text-[9px] font-black text-gray-400 mt-2 font-mono">{idx}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
