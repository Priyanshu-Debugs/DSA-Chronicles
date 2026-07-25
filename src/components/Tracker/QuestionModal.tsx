"use client";

import React, { useState, useEffect } from "react";
import { Problem } from "@/data/a2zDsaSheet";
import NotebookEditor from "@/components/Notebook/NotebookEditor";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem | null;
  isSolved: boolean;
  onToggleSolved: (problemId: string) => void;
  initialNote?: string;
  onSaveNote: (content: string) => void;
}

interface PlatformQuestionData {
  title: string;
  titleSlug?: string;
  content: string;
  difficulty?: string;
  topicTags?: Array<{ name: string; slug?: string }>;
  codeSnippets?: Array<{ lang: string; langSlug: string; code: string }>;
}

export default function QuestionModal({
  isOpen,
  onClose,
  problem,
  isSolved,
  onToggleSolved,
  initialNote = "",
  onSaveNote,
}: QuestionModalProps) {
  const [activeTab, setActiveTab] = useState<"question" | "notes">("question");
  const [selectedPlatform, setSelectedPlatform] = useState<"leetcode" | "gfg">("leetcode");
  
  const [leetcodeData, setLeetcodeData] = useState<PlatformQuestionData | null>(null);
  const [gfgData, setGfgData] = useState<PlatformQuestionData | null>(null);

  const [loadingLc, setLoadingLc] = useState(false);
  const [loadingGfg, setLoadingGfg] = useState(false);
  
  const [errorLc, setErrorLc] = useState<string | null>(null);
  const [errorGfg, setErrorGfg] = useState<string | null>(null);

  const [selectedLang, setSelectedLang] = useState<string>("");

  const getLeetCodeSlug = (url?: string, explicitSlug?: string) => {
    if (explicitSlug) return explicitSlug;
    if (!url) return null;
    const parts = url.split("/problems/");
    if (parts.length > 1) {
      return parts[1].split("/")[0].split("?")[0].split("#")[0];
    }
    return null;
  };

  const getGfgSlug = (url?: string, explicitSlug?: string) => {
    if (explicitSlug) return explicitSlug;
    if (!url) return null;
    const parts = url.toLowerCase().split("/problems/");
    if (parts.length > 1) {
      return parts[1].split("/")[0].split("?")[0].split("#")[0];
    }
    return null;
  };

  useEffect(() => {
    if (!isOpen || !problem) {
      setLeetcodeData(null);
      setGfgData(null);
      setErrorLc(null);
      setErrorGfg(null);
      return;
    }

    const lcSlug = getLeetCodeSlug(problem.leetcodeUrl, problem.leetcodeSlug);
    const gfgSlug = getGfgSlug(problem.gfgUrl, problem.gfgSlug);

    // Default to platform that has a slug available
    if (lcSlug) {
      setSelectedPlatform("leetcode");
    } else if (gfgSlug || problem.gfgUrl) {
      setSelectedPlatform("gfg");
    }

    // Fetch LeetCode details
    if (lcSlug) {
      setLoadingLc(true);
      setErrorLc(null);
      fetch(`/api/leetcode/question?slug=${encodeURIComponent(lcSlug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.question) {
            setLeetcodeData(data.question);
            if (data.question.codeSnippets && data.question.codeSnippets.length > 0) {
              setSelectedLang(data.question.codeSnippets[0].langSlug);
            }
          } else {
            setErrorLc(data.error || "LeetCode problem details unavailable");
          }
        })
        .catch((err) => setErrorLc(err.message || "Failed to load LeetCode statement"))
        .finally(() => setLoadingLc(false));
    } else {
      setErrorLc("No LeetCode link available for this problem");
    }

    // Fetch GFG details
    if (gfgSlug || problem.gfgUrl) {
      setLoadingGfg(true);
      setErrorGfg(null);
      const queryParam = gfgSlug ? `slug=${encodeURIComponent(gfgSlug)}` : `url=${encodeURIComponent(problem.gfgUrl)}`;
      fetch(`/api/gfg/question?${queryParam}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.question) {
            setGfgData(data.question);
          } else {
            setErrorGfg(data.error || "GFG problem details unavailable");
          }
        })
        .catch((err) => setErrorGfg(err.message || "Failed to load GFG statement"))
        .finally(() => setLoadingGfg(false));
    } else {
      setErrorGfg("No GFG link available for this problem");
    }
  }, [isOpen, problem]);

  if (!isOpen || !problem) return null;

  const currentData = selectedPlatform === "leetcode" ? leetcodeData : gfgData;
  const currentLoading = selectedPlatform === "leetcode" ? loadingLc : loadingGfg;
  const currentError = selectedPlatform === "leetcode" ? errorLc : errorGfg;

  const currentSnippet = leetcodeData?.codeSnippets?.find((s) => s.langSlug === selectedLang);

  const getDifficultyBadge = (diff?: string) => {
    const d = (diff || currentData?.difficulty || "Medium").toLowerCase();
    if (d === "easy" || d === "basic") return "bg-neoGreen text-black";
    if (d === "medium") return "bg-neoYellow text-black";
    return "bg-neoRed text-black";
  };

  const hasLeetCode = !!problem.leetcodeUrl || !!problem.leetcodeSlug;
  const hasGfg = !!problem.gfgUrl || !!problem.gfgSlug;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-hidden select-none">
      {/* Modal Container */}
      <div className="bg-white border-4 border-black shadow-neo-lg rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="bg-neoYellow border-b-4 border-black p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <span
              className={`text-xs font-black uppercase border-2 border-black px-2.5 py-1 rounded shadow-neo-sm shrink-0 ${getDifficultyBadge()}`}
            >
              {currentData?.difficulty || "PROBLEM"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-black truncate tracking-tight">
              {problem.name}
            </h2>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onToggleSolved(problem.id)}
              className={`px-3 py-1.5 border-2 border-black font-black text-xs uppercase rounded shadow-neo-sm neo-clickable cursor-pointer transition-all ${
                isSolved ? "bg-neoGreen text-black" : "bg-white hover:bg-gray-100 text-black"
              }`}
            >
              {isSolved ? "✓ SOLVED" : "MARK SOLVED"}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-neoRed border-2 border-black font-black text-sm text-black rounded shadow-neo-sm hover:bg-red-400 neo-clickable cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation & Platform Switcher */}
        <div className="bg-gray-50 border-b-2 border-black px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Main Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("question")}
              className={`px-4 py-1.5 border-2 border-black font-black text-xs uppercase rounded shadow-neo-sm transition-all neo-clickable cursor-pointer ${
                activeTab === "question" ? "bg-neoBlue text-black" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              📖 Question Statement
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-4 py-1.5 border-2 border-black font-black text-xs uppercase rounded shadow-neo-sm transition-all neo-clickable cursor-pointer ${
                activeTab === "notes" ? "bg-neoPurple text-white" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              📝 Revision Notes {initialNote ? "•" : ""}
            </button>
          </div>

          {/* Platform Toggle (LeetCode vs GFG) */}
          <div className="flex items-center space-x-2">
            {activeTab === "question" && (
              <div className="flex border-2 border-black rounded-lg overflow-hidden bg-white shadow-neo-sm mr-2">
                <button
                  onClick={() => setSelectedPlatform("leetcode")}
                  disabled={!hasLeetCode}
                  className={`px-3 py-1 text-xs font-black uppercase transition-all cursor-pointer ${
                    selectedPlatform === "leetcode"
                      ? "bg-yellow-400 text-black font-extrabold"
                      : "bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  }`}
                >
                  LeetCode
                </button>
                <button
                  onClick={() => setSelectedPlatform("gfg")}
                  disabled={!hasGfg}
                  className={`px-3 py-1 text-xs font-black uppercase border-l-2 border-black transition-all cursor-pointer ${
                    selectedPlatform === "gfg"
                      ? "bg-green-400 text-black font-extrabold"
                      : "bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  }`}
                >
                  GeeksforGeeks
                </button>
              </div>
            )}

            {problem.leetcodeUrl && (
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-white border-2 border-black font-black text-[11px] uppercase rounded shadow-neo-sm hover:bg-yellow-100 neo-clickable text-black flex items-center space-x-1"
                title="Open directly on LeetCode"
              >
                <span>LC</span>
                <span className="text-[10px]">↗</span>
              </a>
            )}
            {problem.gfgUrl && (
              <a
                href={problem.gfgUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-white border-2 border-black font-black text-[11px] uppercase rounded shadow-neo-sm hover:bg-green-100 neo-clickable text-black flex items-center space-x-1"
                title="Open directly on GeeksforGeeks"
              >
                <span>GFG</span>
                <span className="text-[10px]">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white min-h-0 select-text">
          {activeTab === "question" && (
            <div className="space-y-6">
              {currentLoading && (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-black text-xs uppercase text-gray-600">
                    Loading {selectedPlatform === "leetcode" ? "LeetCode" : "GeeksforGeeks"} Details...
                  </span>
                </div>
              )}

              {currentError && !currentLoading && (
                <div className="bg-neoYellow border-2 border-black p-4 rounded-lg shadow-neo-sm">
                  <h4 className="font-black text-sm uppercase mb-1">
                    {selectedPlatform === "leetcode" ? "LeetCode" : "GFG"} Notice
                  </h4>
                  <p className="text-xs font-bold text-gray-800">{currentError}</p>
                  <p className="text-xs font-medium text-gray-600 mt-2">
                    You can switch platform view above, open the problem directly using the external link, or take personal revision notes.
                  </p>
                </div>
              )}

              {!currentLoading && currentData && (
                <>
                  {/* Topic Tags */}
                  {currentData.topicTags && currentData.topicTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {currentData.topicTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-800 border border-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-neo-xs"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Render HTML Content */}
                  <div
                    className="leetcode-html-content prose max-w-none text-sm font-medium leading-relaxed text-stone-900 border-b-2 border-gray-100 pb-6"
                    dangerouslySetInnerHTML={{ __html: currentData.content }}
                  />

                  {/* Starter Code Snippets (LeetCode) */}
                  {selectedPlatform === "leetcode" && leetcodeData?.codeSnippets && leetcodeData.codeSnippets.length > 0 && (
                    <div className="bg-gray-900 text-gray-100 border-4 border-black rounded-xl p-4 shadow-neo space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                        <span className="font-black text-xs uppercase text-neoYellow">Starter Code Snippet</span>
                        <select
                          value={selectedLang}
                          onChange={(e) => setSelectedLang(e.target.value)}
                          className="bg-gray-800 text-white border border-gray-600 font-bold text-xs px-2.5 py-1 rounded outline-none cursor-pointer"
                        >
                          {leetcodeData.codeSnippets.map((s) => (
                            <option key={s.langSlug} value={s.langSlug}>
                              {s.lang}
                            </option>
                          ))}
                        </select>
                      </div>

                      {currentSnippet && (
                        <pre className="text-xs font-mono bg-black/50 p-3 rounded-lg overflow-x-auto text-green-400 leading-normal">
                          <code>{currentSnippet.code}</code>
                        </pre>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === "notes" && (
            <div className="h-full min-h-[380px] flex flex-col">
              <NotebookEditor initialValue={initialNote} onSave={onSaveNote} />
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="bg-gray-100 border-t-2 border-black p-3 sm:p-4 flex items-center justify-between text-xs font-bold shrink-0">
          <span className="text-gray-600 uppercase text-[10px] font-black">
            DSA CHRONICLES • LEETCODE & GFG REVISION ENGINE
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black text-white font-black text-xs uppercase rounded shadow-neo-sm hover:bg-gray-800 neo-clickable cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
