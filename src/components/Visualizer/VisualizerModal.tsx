import React, { useState, useEffect, useRef, useMemo } from "react";
import { Problem } from "@/data/a2zDsaSheet";
import { getProblemMeta } from "./visualizerRegistry";
import VisualizerControls from "./VisualizerControls";

// Visualizer Components
import { TwoSumVisualizer } from "./problems/TwoSumVisualizer";
import { BinarySearchVisualizer } from "./problems/BinarySearchVisualizer";
import { SortColorsVisualizer } from "./problems/SortColorsVisualizer";
import { KadaneVisualizer } from "./problems/KadaneVisualizer";
import { LinkedListVisualizer } from "./problems/LinkedListVisualizer";
import { SpiralMatrixVisualizer } from "./problems/SpiralMatrixVisualizer";
import { AnagramVisualizer } from "./problems/AnagramVisualizer";
import { Array1DVisualizer } from "./problems/Array1DVisualizer";
import { RecursionTreeVisualizer } from "./problems/RecursionTreeVisualizer";
import { RemoveDuplicatesVisualizer } from "./problems/RemoveDuplicatesVisualizer";

interface VisualizerModalProps {
  problem: Problem;
  onClose: () => void;
}

export default function VisualizerModal({ problem, onClose }: VisualizerModalProps) {
  const meta = useMemo(() => getProblemMeta(problem.id, problem.name), [problem.id, problem.name]);

  if (!meta) return null;

  // Custom Input States
  const [customArrayStr, setCustomArrayStr] = useState<string>(
    meta.defaultInput.array ? meta.defaultInput.array.join(", ") : ""
  );
  const [customTarget, setCustomTarget] = useState<number>(
    meta.defaultInput.target !== undefined ? meta.defaultInput.target : 0
  );
  const [customS, setCustomS] = useState<string>(meta.defaultInput.s || "");
  const [customT, setCustomT] = useState<string>(meta.defaultInput.t || "");
  const [inputError, setInputError] = useState<string | null>(null);

  // Active Inputs and Steps
  const [activeInput, setActiveInput] = useState<any>(meta.defaultInput);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1500); // 1.5s per step default (slower speed)

  // Language & Solution Variant selectors - Python by default!
  const [selectedLanguage, setSelectedLanguage] = useState<"javascript" | "python" | "java">("python");
  const [variantIndex, setVariantIndex] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute steps whenever active inputs change
  useEffect(() => {
    try {
      let computedSteps: any[] = [];
      if (meta.generateSteps) {
        computedSteps = meta.generateSteps(activeInput);
      }
      setSteps(computedSteps);
      setCurrentStepIndex(0);
      setIsPlaying(false);
      setInputError(null);
    } catch (err: any) {
      setInputError(err.message || "Failed to generate steps for these inputs.");
    }
  }, [activeInput, meta]);

  // Handle auto-playing loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speed]);

  // Controls Callbacks
  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };
  const handleSkipToEnd = () => {
    setIsPlaying(false);
    setCurrentStepIndex(steps.length - 1);
  };

  // Reset variant dropdown index when switching language tabs
  const handleLanguageChange = (lang: "javascript" | "python" | "java") => {
    setSelectedLanguage(lang);
    setVariantIndex(0);
  };

  // Apply custom inputs
  const handleApplyInputs = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let parsedInput: any = {};
      const pid = problem.id;

      if (meta.visualizerType === "stringmap") {
        const needsT = meta.defaultInput.hasOwnProperty("t") && meta.defaultInput.t !== undefined;
        if (!customS.trim() || (needsT && !customT.trim())) {
          throw new Error("Input strings cannot be empty.");
        }
        parsedInput = { s: customS.trim() };
        if (needsT) {
          parsedInput.t = customT.trim();
        }
      } else if (meta.visualizerType === "matrix2d") {
        parsedInput = { grid: meta.defaultInput.grid };
      } else {
        // Parse array input
        const nums = customArrayStr
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
          .map((s) => {
            const val = Number(s);
            if (isNaN(val)) throw new Error("Invalid number in array.");
            return val;
          });

        if (nums.length === 0) throw new Error("Array cannot be empty.");

        // For Sort Colors, validate array contents are only 0, 1, 2
        if (pid === "1_sort_an_array_of_0’s_1’s_and_2’s") {
          nums.forEach((n) => {
            if (n !== 0 && n !== 1 && n !== 2) {
              throw new Error("Sort Colors array must only contain 0, 1, or 2.");
            }
          });
        }

        parsedInput = { array: nums };
        if (meta.defaultInput.target !== undefined) {
          parsedInput.target = Number(customTarget);
          if (isNaN(parsedInput.target)) throw new Error("Target must be a number.");
        }
      }

      setActiveInput(parsedInput);
      setInputError(null);
    } catch (err: any) {
      setInputError(err.message || "Input parsing failed.");
    }
  };

  // Select Visualizer Component
  const renderVisualizer = () => {
    if (steps.length === 0 || currentStepIndex >= steps.length) return null;
    const step = steps[currentStepIndex];

    // High-fidelity specific problem ID mappings first
    const pid = problem.id;
    if (pid === "0_2sum_problem") return <TwoSumVisualizer step={step} />;
    if (pid === "0_binary_search_to_find_x_in_sorted_array_") return <BinarySearchVisualizer step={step} />;
    if (pid === "1_sort_an_array_of_0’s_1’s_and_2’s") return <SortColorsVisualizer step={step} />;
    if (pid === "3_kadane’s_algorithm,_maximum_subarray_sum") return <KadaneVisualizer step={step} />;
    if (pid === "1_reverse_a_linkedlist_[iterative]") return <LinkedListVisualizer step={step} />;
    if (pid === "12_print_the_matrix_in_spiral_manner") return <SpiralMatrixVisualizer step={step} />;
    if (pid === "6_check_if_two_strings_are_anagram_of_each_other") return <AnagramVisualizer step={step} pid={pid} />;
    if (pid === "3_remove_duplicates_from_sorted_array") return <RemoveDuplicatesVisualizer step={step} />;

    // General archetype fallbacks
    const type = meta.visualizerType;
    if (type === "array1d") return <Array1DVisualizer step={step} />;
    if (type === "matrix2d") return <SpiralMatrixVisualizer step={step} />;
    if (type === "linkedlist") return <LinkedListVisualizer step={step} problem={problem} />;
    if (type === "stringmap") return <AnagramVisualizer step={step} pid={pid} />;
    if (type === "recursion") return <RecursionTreeVisualizer step={step} problem={problem} />;
    
    return <div className="text-center font-bold uppercase text-red-500">Visualizer Component not found</div>;
  };

  // Compile active code snippet lines
  const languageOptions = meta.solutions[selectedLanguage] || [];
  const activeSolution = languageOptions[variantIndex] || languageOptions[0] || { code: "" };
  const lines = activeSolution.code.split("\n");
  const currentStep = steps[currentStepIndex] || { codeLine: -1 };

  // Determine active highlighted line from step's codeLineMap
  const variantLabelClean = (activeSolution.label || "optimal").toLowerCase().split(" ")[0];
  const activeKey = `${selectedLanguage}-${variantLabelClean}`;
  const highlightedLine = currentStep.codeLineMap?.[activeKey] ?? currentStep.codeLine ?? 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
      <div className="bg-white border-4 border-black w-full max-w-6xl rounded-2xl shadow-neo-lg flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header Banner */}
        <header className="bg-neoYellow border-b-4 border-black p-4 flex justify-between items-center shrink-0">
          <div>
            <span className="bg-black text-neoYellow px-2.5 py-0.5 border border-black font-black text-[10px] uppercase rounded shadow-neo-sm">
              Visual Simulation
            </span>
            <h2 className="text-xl md:text-2xl font-black uppercase mt-1.5">{meta.problemName}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-neoRed border-2 border-black font-black text-lg flex items-center justify-center shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable cursor-pointer"
            title="Close Visualizer"
          >
            ✕
          </button>
        </header>

        {/* Modal Content Split Panels */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black">
          {/* LEFT: visual playground */}
          <div className="flex-1 p-6 flex flex-col justify-between min-h-[400px] bg-neoCream">
            {/* The Visualizer area */}
            <div className="flex-1 flex items-center justify-center w-full">
              {renderVisualizer()}
            </div>

            {/* Explanation box */}
            <div className="mt-6 bg-white border-4 border-black p-4 rounded-xl shadow-neo min-h-[90px] flex items-center select-text">
              <p className="text-sm font-bold text-gray-800 uppercase tracking-wide leading-relaxed">
                📢 {currentStep.description || "Initializing simulation..."}
              </p>
            </div>
          </div>

          {/* RIGHT: code trace and inputs */}
          <div className="w-full lg:w-[440px] flex flex-col bg-white shrink-0">
            {/* Custom Input Section */}
            <div className="border-b-4 border-black p-4 bg-gray-50">
              <details className="group cursor-pointer select-none">
                <summary className="font-black text-xs uppercase flex justify-between items-center outline-none list-none">
                  <span>🛠 Custom Input Playground</span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                
                <form onSubmit={handleApplyInputs} className="mt-3 space-y-3 cursor-default">
                  {meta.visualizerType === "stringmap" ? (
                    (() => {
                      const needsT = meta.defaultInput.hasOwnProperty("t") && meta.defaultInput.t !== undefined;
                      return (
                        <div className={needsT ? "grid grid-cols-2 gap-2" : "flex flex-col gap-1"}>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black uppercase text-gray-500">String S</label>
                            <input
                              type="text"
                              value={customS}
                              onChange={(e) => setCustomS(e.target.value)}
                              className="border-2 border-black rounded p-1.5 font-bold text-xs uppercase bg-white outline-none"
                            />
                          </div>
                          {needsT && (
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-black uppercase text-gray-500">String T</label>
                              <input
                                type="text"
                                value={customT}
                                onChange={(e) => setCustomT(e.target.value)}
                                className="border-2 border-black rounded p-1.5 font-bold text-xs uppercase bg-white outline-none"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })()
                  ) : meta.visualizerType === "matrix2d" ? (
                    <p className="text-[10px] text-gray-400 font-bold uppercase select-text">
                      Matrix visualization runs on default simulation bounds.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase text-gray-500">Array Values (Comma split)</label>
                        <input
                          type="text"
                          value={customArrayStr}
                          onChange={(e) => setCustomArrayStr(e.target.value)}
                          className="border-2 border-black rounded p-1.5 font-mono text-xs bg-white outline-none"
                          placeholder="e.g., 2, 7, 11, 15"
                        />
                      </div>
                      {meta.defaultInput.target !== undefined && (
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-black uppercase text-gray-500">Target Value</label>
                          <input
                            type="number"
                            value={customTarget}
                            onChange={(e) => setCustomTarget(Number(e.target.value))}
                            className="border-2 border-black rounded p-1.5 font-mono text-xs w-28 bg-white outline-none"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {inputError && (
                    <div className="text-[10px] font-black text-neoRed uppercase select-text">
                      ⚠️ {inputError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-1.5 bg-neoGreen border-2 border-black font-black text-xs uppercase shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable cursor-pointer"
                  >
                    Apply & Restart
                  </button>
                </form>
              </details>
            </div>

            {/* Language Switcher Tabs: Python -> Java -> JS */}
            <div className="flex border-b-4 border-black shrink-0 bg-gray-100">
              {(["python", "java", "javascript"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex-1 py-2.5 font-black text-xs uppercase border-r-2 last:border-r-0 border-black transition-all cursor-pointer ${
                    selectedLanguage === lang ? "bg-neoBlue text-black" : "bg-white hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {lang === "python" ? "Python" : lang === "java" ? "Java" : "JavaScript"}
                </button>
              ))}
            </div>

            {/* Multi-Solution Variant Dropdown (only if multiple options exist) */}
            {languageOptions.length > 1 && (
              <div className="p-3 bg-neoCream border-b-2 border-black flex items-center justify-between gap-2 shrink-0">
                <span className="text-[10px] font-black uppercase text-gray-600">Select Variant:</span>
                <select
                  value={variantIndex}
                  onChange={(e) => setVariantIndex(Number(e.target.value))}
                  className="border-2 border-black rounded px-2 py-1 font-bold text-xs uppercase bg-white outline-none cursor-pointer"
                >
                  {languageOptions.map((v, i) => (
                    <option key={i} value={i}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Code Trace Window */}
            <div className="flex-1 overflow-auto bg-gray-950 text-gray-200">
              <pre className="font-mono text-xs p-4 leading-relaxed">
                {lines.map((line, idx) => {
                  const isHighlighted = idx === highlightedLine;
                  return (
                    <div
                      key={idx}
                      className={`${
                        isHighlighted
                          ? "bg-neoYellow/30 text-white font-extrabold border-l-4 border-neoYellow pl-2 -ml-4"
                          : "pl-2 opacity-65"
                      }`}
                    >
                      <span className="inline-block w-6 text-right mr-3 opacity-30 select-none">{idx + 1}</span>
                      {line}
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        </div>

        {/* Playback Controls Footer */}
        <footer className="border-t-4 border-black p-4 shrink-0 bg-gray-50">
          <VisualizerControls
            currentStep={currentStepIndex}
            totalSteps={steps.length}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onReset={handleReset}
            onSkipToEnd={handleSkipToEnd}
            speed={speed}
            onSpeedChange={setSpeed}
            onSliderChange={setCurrentStepIndex}
          />
        </footer>
      </div>
    </div>
  );
}
