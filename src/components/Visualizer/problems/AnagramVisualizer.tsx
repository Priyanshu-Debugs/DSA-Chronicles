import React from "react";

export interface AnagramStep {
  s: string;
  t: string;
  sIndex: number;
  tIndex: number;
  freqMap: Record<string, number>;
  state: "scanning_s" | "scanning_t" | "mismatch" | "anagram";
  description: string;
  codeLine: number;
}

export function generateAnagramSteps(s: string, t: string): AnagramStep[] {
  const steps: AnagramStep[] = [];
  const freqMap: Record<string, number> = {};

  steps.push({
    s,
    t,
    sIndex: -1,
    tIndex: -1,
    freqMap: { ...freqMap },
    state: "scanning_s",
    description: `Check lengths first: s.length = ${s.length}, t.length = ${t.length}. If equal, initialize empty frequency count map.`,
    codeLine: 2,
  });

  if (s.length !== t.length) {
    steps.push({
      s,
      t,
      sIndex: -1,
      tIndex: -1,
      freqMap: { ...freqMap },
      state: "mismatch",
      description: `Mismatch! String s has length ${s.length} but t has length ${t.length}. They cannot be anagrams.`,
      codeLine: 2,
    });
    return steps;
  }

  // Scan s to build frequency count
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    freqMap[char] = (freqMap[char] || 0) + 1;
    steps.push({
      s,
      t,
      sIndex: i,
      tIndex: -1,
      freqMap: { ...freqMap },
      state: "scanning_s",
      description: `Scan string s: increment count for character '${char}'. Frequency map updated: ${JSON.stringify(freqMap)}.`,
      codeLine: 4,
    });
  }

  // Scan t to decrement frequency count
  for (let i = 0; i < t.length; i++) {
    const char = t[i];
    
    if (!freqMap[char] || freqMap[char] === 0) {
      freqMap[char] = (freqMap[char] || 0) - 1;
      steps.push({
        s,
        t,
        sIndex: s.length,
        tIndex: i,
        freqMap: { ...freqMap },
        state: "mismatch",
        description: `Mismatch! Character '${char}' in string t has count <= 0 in s's map. Strings are NOT anagrams.`,
        codeLine: 6,
      });
      return steps;
    }
    
    freqMap[char]--;
    steps.push({
      s,
      t,
      sIndex: s.length,
      tIndex: i,
      freqMap: { ...freqMap },
      state: "scanning_t",
      description: `Scan string t: decrement count for character '${char}'. Frequency map updated: ${JSON.stringify(freqMap)}.`,
      codeLine: 7,
    });
  }

  steps.push({
    s,
    t,
    sIndex: s.length,
    tIndex: t.length,
    freqMap: { ...freqMap },
    state: "anagram",
    description: `All character counts matched and decremented to 0. String s and t are valid anagrams!`,
    codeLine: 9,
  });

  return steps;
}

export function AnagramVisualizer({ step }: { step: AnagramStep }) {
  const keys = Object.keys(step.freqMap).sort();

  return (
    <div className="flex flex-col items-center gap-6 w-full py-6 select-none">
      {/* Target Status Badge */}
      <div className="flex gap-4 mb-2 flex-wrap justify-center font-bold text-xs uppercase">
        <div className="bg-neoYellow border-2 border-black px-3 py-1 rounded shadow-neo-sm">
          String S: "{step.s}"
        </div>
        <div className="bg-neoPink border-2 border-black px-3 py-1 rounded shadow-neo-sm">
          String T: "{step.t}"
        </div>
        <div className={`border-2 border-black px-3 py-1 rounded shadow-neo-sm ${
          step.state === "anagram" ? "bg-neoGreen" : step.state === "mismatch" ? "bg-neoRed text-white" : "bg-white"
        }`}>
          Status: {step.state === "anagram" ? "Valid Anagram" : step.state === "mismatch" ? "Not Anagram" : "Scanning..."}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center w-full max-w-xl">
        {/* Strings display panel */}
        <div className="flex-1 flex flex-col gap-6 bg-white border-4 border-black p-4 rounded-xl shadow-neo justify-center">
          {/* String S Panel */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase text-gray-500">String S (Increment Map)</span>
            <div className="flex gap-1.5 flex-wrap">
              {step.s.split("").map((char, idx) => {
                const isScanning = step.state === "scanning_s" && idx === step.sIndex;
                const scanned = step.sIndex >= idx;

                let cellBg = "bg-white";
                if (isScanning) cellBg = "bg-neoYellow animate-pulse";
                else if (scanned) cellBg = "bg-neoGreen/25";

                return (
                  <div
                    key={idx}
                    className={`w-9 h-9 border-2 border-black rounded flex items-center justify-center font-black text-sm transition-all duration-200 ${cellBg}`}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          </div>

          {/* String T Panel */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase text-gray-500">String T (Decrement Map)</span>
            <div className="flex gap-1.5 flex-wrap">
              {step.t.split("").map((char, idx) => {
                const isScanning = step.state === "scanning_t" && idx === step.tIndex;
                const scanned = step.tIndex >= idx;

                let cellBg = "bg-white";
                if (isScanning) cellBg = "bg-neoPink animate-pulse";
                else if (scanned) cellBg = "bg-neoGreen/25";

                return (
                  <div
                    key={idx}
                    className={`w-9 h-9 border-2 border-black rounded flex items-center justify-center font-black text-sm transition-all duration-200 ${cellBg}`}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Map table panel */}
        <div className="flex-1 bg-neoCream border-4 border-black p-4 rounded-xl shadow-neo flex flex-col min-w-[200px]">
          <h4 className="font-black text-xs uppercase text-gray-700 border-b-2 border-black pb-1 mb-2">Char Counts</h4>
          <div className="flex-1 overflow-y-auto max-h-48 space-y-1">
            {keys.length === 0 ? (
              <span className="text-[10px] font-bold text-gray-400 italic uppercase">Map is empty</span>
            ) : (
              keys.map((key) => {
                const val = step.freqMap[key];
                return (
                  <div key={key} className="flex justify-between items-center bg-white border border-black px-3 py-1 font-mono text-xs rounded">
                    <span className="font-bold">'{key}'</span>
                    <span className={`font-black ${val > 0 ? "text-neoBlue" : val === 0 ? "text-neoGreen" : "text-neoRed"}`}>
                      {val}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
