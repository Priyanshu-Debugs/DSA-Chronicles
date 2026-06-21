import React from "react";
import { RemoveDuplicatesStep } from "../registry/step1_arrays";

export function RemoveDuplicatesVisualizer({ step }: { step: RemoveDuplicatesStep }) {
  const highlights = step.highlights || {};
  const variables = step.variables || {};

  return (
    <div className="flex flex-col items-center gap-6 w-full py-6 select-none">
      {/* Variables Monitor Panel */}
      {Object.keys(variables).length > 0 && (
        <div className="flex gap-3 mb-2 flex-wrap justify-center font-mono text-[10px] font-black uppercase">
          {Object.entries(variables).map(([key, val]) => (
            <span key={key} className="bg-white border-2 border-black px-2 py-0.5 rounded shadow-neo-sm">
              {key.replace("_", " ")}: {val !== null && val !== undefined ? String(val) : "null"}
            </span>
          ))}
        </div>
      )}

      {/* Array Blocks Display */}
      <div className="flex flex-wrap gap-3 items-end justify-center select-none min-h-[140px] w-full max-w-xl px-4">
        {(step.array || []).map((val, idx) => {
          const isI = step.pointers.i === idx;
          const isJ = step.pointers.j === idx;

          const highlight = highlights[idx];

          let cardBg = "bg-white";
          let scaleClass = "";
          let borderStyle = "border-4 border-black";

          if (highlight === "sorted") {
            cardBg = "bg-neoGreen"; // Unique elements prefix
          } else if (highlight === "compare") {
            cardBg = "bg-neoYellow"; // Active comparison
            scaleClass = "scale-105";
          } else if (highlight === "swap") {
            cardBg = "bg-neoBlue"; // Overwritten/swapped element
            scaleClass = "scale-110";
            borderStyle = "border-4 border-black border-dashed";
          } else if (highlight === "inactive") {
            cardBg = "bg-white opacity-40"; // Discarded/skipped elements
          }

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Floating pointers above the blocks */}
              <div className="h-10 flex flex-col items-center justify-end gap-0.5 mb-1">
                {isI && (
                  <span className="bg-neoGreen border-2 border-black px-1.5 py-0.2 rounded shadow-neo-sm text-[8px] font-black uppercase animate-bounce">
                    i (Write)
                  </span>
                )}
                {isJ && (
                  <span className="bg-neoYellow border-2 border-black px-1.5 py-0.2 rounded shadow-neo-sm text-[8px] font-black uppercase">
                    j (Scan)
                  </span>
                )}
              </div>

              {/* Block card */}
              <div
                className={`w-12 h-12 rounded-lg ${cardBg} ${borderStyle} ${scaleClass} shadow-neo flex items-center justify-center font-black text-lg transition-all duration-200`}
              >
                {val}
              </div>

              {/* Index */}
              <span className="text-[9px] font-black text-gray-400 mt-2 font-mono">{idx}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
