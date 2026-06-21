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

export function AnagramVisualizer({ step, pid }: { step: any; pid?: string }) {
  const keys = Object.keys(step.freqMap || {}).sort();
  const s = step.s || "";
  const t = step.t || "";

  let titleS = "String S";
  let titleT = "String T";
  let titleMap = "Map Table";
  let statusText = "Scanning...";
  let statusBg = "bg-white";

  // Customize based on problem ID (pid)
  if (pid === "6_check_if_two_strings_are_anagram_of_each_other") {
    titleS = "String S (Increment Map)";
    titleT = "String T (Decrement Map)";
    titleMap = "Char Frequencies";
    if (step.state === "anagram") {
      statusText = "Valid Anagram";
      statusBg = "bg-neoGreen text-black";
    } else if (step.state === "mismatch") {
      statusText = "Not Anagram";
      statusBg = "bg-neoRed text-white";
    } else {
      statusText = step.state === "scanning_s" ? "Scanning S" : "Scanning T";
      statusBg = "bg-neoYellow text-black";
    }
  } else if (pid === "4_isomorphic_string") {
    titleS = "String S (Pattern)";
    titleT = "String T (Target)";
    titleMap = "Character Mapping (S → T)";
    if (step.state === "anagram" || step.state === "match") {
      statusText = "Isomorphic";
      statusBg = "bg-neoGreen text-black";
    } else if (step.state === "mismatch") {
      statusText = "Not Isomorphic";
      statusBg = "bg-neoRed text-white";
    } else {
      statusText = "Checking Map...";
      statusBg = "bg-neoYellow text-black";
    }
  } else if (pid === "5_check_whether_one_string_is_a_rotation_of_another_") {
    titleS = "String S";
    titleT = "String T";
    titleMap = "Concatenated String (S + S)";
    if (step.state === "match") {
      statusText = "Valid Rotation";
      statusBg = "bg-neoGreen text-black";
    } else if (step.state === "mismatch") {
      statusText = "Not a Rotation";
      statusBg = "bg-neoRed text-white";
    } else {
      statusText = "Checking Substring...";
      statusBg = "bg-neoYellow text-black";
    }
  } else if (pid === "6_sum_of_beauty_of_all_substring") {
    titleS = "Full String S";
    titleT = "Active Substring";
    titleMap = "Frequency & Beauty Metrics";
    if (step.state === "match") {
      statusText = "Summing Complete";
      statusBg = "bg-neoGreen text-black";
    } else {
      statusText = `Beauty: ${step.freqMap.beauty || 0}`;
      statusBg = "bg-neoYellow text-black";
    }
  } else if (pid === "0_sort_characters_by_frequency") {
    titleS = "Input String S";
    titleT = "Sorted Result";
    titleMap = "Character Frequencies";
    if (step.state === "scanning_s") {
      statusText = "Building Freq Map";
      statusBg = "bg-neoYellow text-black";
    } else if (step.state === "scanning_t") {
      statusText = "Constructing Result";
      statusBg = "bg-neoBlue text-white";
    } else {
      statusText = "Sorting Complete";
      statusBg = "bg-neoGreen text-black";
    }
  } else if (pid === "0_remove_outermost_paranthesis") {
    titleS = "Input String S";
    titleT = "Constructed Result";
    titleMap = "Stack / Opened Count State";
    if (step.state === "match") {
      statusText = "Process Complete";
      statusBg = "bg-neoGreen text-black";
    } else {
      statusText = `Opened Count: ${step.freqMap.opened || 0}`;
      statusBg = "bg-neoYellow text-black";
    }
  } else {
    if (step.state === "anagram" || step.state === "match") {
      statusText = "Match / Valid";
      statusBg = "bg-neoGreen text-black";
    } else if (step.state === "mismatch") {
      statusText = "Mismatch / Invalid";
      statusBg = "bg-neoRed text-white";
    } else {
      statusText = "Scanning...";
      statusBg = "bg-neoYellow text-black";
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full py-6 select-none">
      {/* Target Status Badge */}
      <div className="flex gap-4 mb-2 flex-wrap justify-center font-bold text-xs uppercase">
        <div className="bg-neoYellow border-2 border-black px-3 py-1 rounded shadow-neo-sm text-black">
          {titleS}: "{s}"
        </div>
        {t && (
          <div className="bg-neoPink border-2 border-black px-3 py-1 rounded shadow-neo-sm text-black">
            {titleT}: "{t}"
          </div>
        )}
        <div className={`border-2 border-black px-3 py-1 rounded shadow-neo-sm ${statusBg}`}>
          Status: {statusText}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center w-full max-w-xl">
        {/* Strings display panel */}
        <div className="flex-1 flex flex-col gap-6 bg-white border-4 border-black p-4 rounded-xl shadow-neo justify-center">
          {/* String S Panel */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase text-gray-500">{titleS}</span>
            <div className="flex gap-1.5 flex-nowrap overflow-x-auto py-1 max-w-full scrollbar-thin">
              {s.split("").map((char: string, idx: number) => {
                let cellBg = "bg-white";
                
                if (pid === "6_sum_of_beauty_of_all_substring") {
                  // Highlight characters inside the active substring window
                  const inWindow = idx >= step.sIndex && idx <= step.tIndex;
                  if (inWindow) cellBg = "bg-neoYellow border-dashed border-2";
                } else {
                  const isScanning = idx === step.sIndex;
                  const scanned = step.sIndex > idx;
                  if (isScanning) cellBg = "bg-neoYellow animate-pulse";
                  else if (scanned) cellBg = "bg-neoGreen/25";
                }

                return (
                  <div
                    key={idx}
                    className={`w-9 h-9 border-2 border-black rounded flex items-center justify-center font-black text-sm transition-all duration-200 text-black shrink-0 ${cellBg}`}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          </div>

          {/* String T Panel */}
          {t && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-black uppercase text-gray-500">{titleT}</span>
              <div className="flex gap-1.5 flex-nowrap overflow-x-auto py-1 max-w-full scrollbar-thin">
                {t.split("").map((char: string, idx: number) => {
                  let cellBg = "bg-white";
                  
                  if (pid === "6_sum_of_beauty_of_all_substring") {
                    cellBg = "bg-neoYellow";
                  } else {
                    const isScanning = idx === step.tIndex;
                    const scanned = step.tIndex > idx;
                    if (isScanning) cellBg = "bg-neoPink animate-pulse text-white";
                    else if (scanned) cellBg = "bg-neoGreen/25";
                  }

                  return (
                    <div
                      key={idx}
                      className={`w-9 h-9 border-2 border-black rounded flex items-center justify-center font-black text-sm transition-all duration-200 text-black shrink-0 ${cellBg}`}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Map table panel */}
        <div className="flex-1 bg-neoCream border-4 border-black p-4 rounded-xl shadow-neo flex flex-col min-w-[200px]">
          <h4 className="font-black text-xs uppercase text-gray-700 border-b-2 border-black pb-1 mb-2">{titleMap}</h4>
          <div className="flex-1 overflow-y-auto max-h-48 space-y-1">
            {keys.length === 0 ? (
              <span className="text-[10px] font-bold text-gray-400 italic uppercase">Map is empty</span>
            ) : (
              keys.map((key) => {
                const val = step.freqMap[key];
                let valColor = "text-neoBlue";
                
                if (typeof val === "number") {
                  if (val > 0) valColor = "text-neoBlue";
                  else if (val === 0) valColor = "text-neoGreen";
                  else valColor = "text-neoRed";
                } else if (typeof val === "string") {
                  valColor = "text-neoGreen";
                }

                const isCharKey = key.length === 1;
                const isCharVal = typeof val === "string" && val.length === 1;

                return (
                  <div key={key} className="flex justify-between items-center bg-white border border-black px-3 py-1 font-mono text-xs rounded text-black">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">
                        {isCharKey ? `'${key}'` : key}
                      </span>
                      {pid === "4_isomorphic_string" && isCharKey && (
                        <span className="text-gray-400 font-bold">→</span>
                      )}
                    </div>
                    <span className={`font-black ${valColor}`}>
                      {typeof val === "string"
                        ? (isCharVal ? `'${val}'` : val)
                        : val}
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
