"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { sqlTop50SheetData } from "@/data/sqlTop50Sheet";
import { Problem } from "@/data/a2zDsaSheet";
import { useAuth } from "@/context/AuthContext";
import { db, doc, setDoc, onSnapshot } from "@/lib/firebase";
import QuestionModal from "@/components/Tracker/QuestionModal";

export default function SqlTop50Page() {
  const { user, loading: authLoading, isGuest } = useAuth();
  
  const [solvedMap, setSolvedMap] = useState<Record<string, { solved: boolean; date?: string }>>({});
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [dataLoading, setDataLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  
  const [activeModalProblem, setActiveModalProblem] = useState<Problem | null>(null);

  // Load solved map & notes from Firestore or localStorage
  useEffect(() => {
    if (authLoading) return;

    let unsubscribe: () => void;

    const loadUserData = () => {
      const localSolved = JSON.parse(localStorage.getItem("dsa_solved_map") || "{}");
      const localNotes = JSON.parse(localStorage.getItem("dsa_notes_map") || "{}");

      if (user && db) {
        const userDocRef = doc(db, "users", user.uid);
        unsubscribe = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setSolvedMap(data.solvedMap || localSolved);
              setNotesMap(data.notesMap || localNotes);
            } else {
              setSolvedMap(localSolved);
              setNotesMap(localNotes);
            }
            setDataLoading(false);
          },
          (err) => {
            console.error("Firestore snapshot error:", err);
            setSolvedMap(localSolved);
            setNotesMap(localNotes);
            setDataLoading(false);
          }
        );
      } else {
        setSolvedMap(localSolved);
        setNotesMap(localNotes);
        setDataLoading(false);
      }
    };

    loadUserData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, authLoading]);

  // Aggregate all SQL problems
  const allSqlProblems: Problem[] = [];
  sqlTop50SheetData.forEach((step) => {
    step.lessons.forEach((l) => {
      l.topics.forEach((t) => {
        t.problems.forEach((p) => {
          allSqlProblems.push(p);
        });
      });
    });
  });

  const totalProblems = allSqlProblems.length;
  const solvedCount = allSqlProblems.filter((p) => solvedMap[p.id]?.solved).length;
  const progressPercent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  const toggleSolved = async (problemId: string) => {
    const today = new Date().toISOString().split("T")[0];
    const isCurrentlySolved = !!solvedMap[problemId]?.solved;

    const newSolvedMap = {
      ...solvedMap,
      [problemId]: {
        solved: !isCurrentlySolved,
        date: !isCurrentlySolved ? today : undefined,
      },
    };

    setSolvedMap(newSolvedMap);

    if (!user) {
      localStorage.setItem("dsa_solved_map", JSON.stringify(newSolvedMap));
    }

    if (user && db) {
      setSyncing(true);
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { solvedMap: newSolvedMap }, { merge: true });
      } catch (err) {
        console.error("Firestore write error:", err);
      } finally {
        setSyncing(false);
      }
    }
  };

  const handleSaveNotes = async (content: string) => {
    if (!activeModalProblem) return;

    const newNotesMap = {
      ...notesMap,
      [activeModalProblem.id]: content,
    };

    setNotesMap(newNotesMap);

    if (!user) {
      localStorage.setItem("dsa_notes_map", JSON.stringify(newNotesMap));
    }

    if (user && db) {
      setSyncing(true);
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { notesMap: newNotesMap }, { merge: true });
      } catch (err) {
        console.error("Firestore write error:", err);
      } finally {
        setSyncing(false);
      }
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 select-none">
      {/* Header Card */}
      <header className="bg-neoYellow border-4 border-black p-6 md:p-8 shadow-neo rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase rounded shadow-neo-sm">
              LEETCODE STUDY PLAN
            </span>
            {syncing && (
              <span className="text-xs font-black uppercase animate-pulse text-gray-800">
                SYNCING FIRESTORE...
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            TOP SQL 50 CONQUEST
          </h1>
          <p className="font-bold border-t-2 border-black pt-2 max-w-2xl text-sm md:text-base text-black mt-2">
            Master relational databases with 50 curated LeetCode SQL questions covering Selects, Joins, Aggregate Functions, Subqueries, CTEs, and Window Functions.
          </p>
        </div>

        <div className="bg-white border-4 border-black p-5 rounded-xl shadow-neo min-w-[240px] flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-black text-black mb-1">
            {solvedCount} / {totalProblems}
          </div>
          <div className="text-xs font-black uppercase text-gray-600 mb-3">
            PROBLEMS CONQUERED ({progressPercent}%)
          </div>
          <div className="w-full bg-gray-200 border-2 border-black h-4 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-neoGreen h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Category Section Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sqlTop50SheetData.map((step) => {
          let stepTotal = 0;
          let stepSolved = 0;

          step.lessons.forEach((l) => {
            l.topics.forEach((t) => {
              t.problems.forEach((p) => {
                stepTotal += 1;
                if (solvedMap[p.id]?.solved) stepSolved += 1;
              });
            });
          });

          const pct = stepTotal > 0 ? Math.round((stepSolved / stepTotal) * 100) : 0;

          return (
            <div
              key={step.stepId}
              className="bg-white border-4 border-black p-4 rounded-xl shadow-neo flex flex-col justify-between"
            >
              <div>
                <h3 className="font-black text-base uppercase text-black mb-1 truncate">
                  {step.stepTitle}
                </h3>
                <span className="text-xs font-bold text-gray-500 uppercase">
                  {stepSolved} / {stepTotal} Solved
                </span>
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-black uppercase">
                  <span>Progress</span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full bg-gray-200 border border-black h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-neoBlue h-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-4 border-black p-4 rounded-xl shadow-neo flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SQL problem name or ID..."
            className="w-full bg-gray-50 border-2 border-black p-2.5 rounded-lg font-bold text-xs outline-none focus:bg-white focus:shadow-neo-sm text-black"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          {["all", "solved", "unsolved"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedDifficulty(status)}
              className={`px-3 py-1.5 border-2 border-black font-black text-xs uppercase rounded shadow-neo-sm transition-all neo-clickable cursor-pointer ${
                selectedDifficulty === status ? "bg-neoYellow text-black" : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Problems Table / List */}
      <div className="space-y-8">
        {sqlTop50SheetData.map((step) => {
          // Filter step problems
          const filteredStepProblems: Problem[] = [];
          step.lessons.forEach((l) => {
            l.topics.forEach((t) => {
              t.problems.forEach((p) => {
                const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.includes(searchQuery.toLowerCase());
                const isSolved = !!solvedMap[p.id]?.solved;
                
                let matchesStatus = true;
                if (selectedDifficulty === "solved") matchesStatus = isSolved;
                if (selectedDifficulty === "unsolved") matchesStatus = !isSolved;

                if (matchesSearch && matchesStatus) {
                  filteredStepProblems.push(p);
                }
              });
            });
          });

          if (filteredStepProblems.length === 0) return null;

          return (
            <div key={step.stepId} className="bg-white border-4 border-black rounded-xl shadow-neo overflow-hidden">
              <div className="bg-black text-white p-4 font-black uppercase text-lg sm:text-xl flex items-center justify-between">
                <span>{step.stepTitle}</span>
                <span className="text-xs bg-neoYellow text-black px-2.5 py-1 rounded border border-black font-black">
                  {filteredStepProblems.length} Problems
                </span>
              </div>

              <div className="divide-y-2 border-black">
                {filteredStepProblems.map((prob) => {
                  const isSolved = !!solvedMap[prob.id]?.solved;
                  const hasNotes = !!notesMap[prob.id];

                  return (
                    <div
                      key={prob.id}
                      className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                        isSolved ? "bg-green-50/60" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start space-x-3 min-w-0">
                        <button
                          onClick={() => toggleSolved(prob.id)}
                          className={`w-6 h-6 rounded border-2 border-black flex items-center justify-center shrink-0 mt-0.5 shadow-neo-sm cursor-pointer transition-transform ${
                            isSolved ? "bg-neoGreen text-black font-black" : "bg-white hover:bg-gray-100"
                          }`}
                        >
                          {isSolved && "✓"}
                        </button>

                        <div className="min-w-0">
                          <h4
                            onClick={() => setActiveModalProblem(prob)}
                            className={`font-black text-sm uppercase text-black cursor-pointer hover:underline truncate ${
                              isSolved ? "line-through text-gray-500" : ""
                            }`}
                          >
                            {prob.name}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            {hasNotes && (
                              <span className="text-[10px] font-black uppercase bg-neoPurple text-white px-1.5 py-0.5 rounded border border-black">
                                Notes Saved
                              </span>
                            )}
                            {solvedMap[prob.id]?.date && (
                              <span className="text-[10px] font-bold text-gray-500">
                                Solved on: {solvedMap[prob.id].date}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => setActiveModalProblem(prob)}
                          className="px-3 py-1.5 bg-neoBlue border-2 border-black font-black text-xs uppercase rounded shadow-neo-sm hover:bg-blue-300 neo-clickable cursor-pointer text-black flex items-center space-x-1"
                        >
                          <span>📖 Revise Question</span>
                        </button>

                        <a
                          href={prob.leetcodeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-white border-2 border-black font-black text-xs uppercase rounded shadow-neo-sm hover:bg-yellow-100 neo-clickable text-black flex items-center space-x-1"
                        >
                          <span>LeetCode</span>
                          <span className="text-[10px]">↗</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Revision Question Modal */}
      <QuestionModal
        isOpen={!!activeModalProblem}
        onClose={() => setActiveModalProblem(null)}
        problem={activeModalProblem}
        isSolved={!!activeModalProblem && !!solvedMap[activeModalProblem.id]?.solved}
        onToggleSolved={toggleSolved}
        initialNote={activeModalProblem ? notesMap[activeModalProblem.id] || "" : ""}
        onSaveNote={handleSaveNotes}
      />
    </main>
  );
}
