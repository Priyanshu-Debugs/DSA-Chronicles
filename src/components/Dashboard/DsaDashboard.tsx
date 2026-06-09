"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Step, Problem, a2zDsaSheetData } from "@/data/a2zDsaSheet";
import ProgressGrid from "@/components/Tracker/ProgressGrid";
import NotebookEditor from "@/components/Notebook/NotebookEditor";
import { useAuth } from "@/context/AuthContext";
import { db, doc, getDoc, setDoc } from "@/lib/firebase";

interface DsaDashboardProps {
  stepIdFilter?: string | string[];
}

export default function DsaDashboard({ stepIdFilter }: DsaDashboardProps) {
  const { user, profile, loading: authLoading } = useAuth();
  
  const [solvedMap, setSolvedMap] = useState<Record<string, { solved: boolean; date?: string }>>({});
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [dataLoading, setDataLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const filterList = stepIdFilter
    ? Array.isArray(stepIdFilter)
      ? stepIdFilter
      : [stepIdFilter]
    : null;

  const filteredSteps = filterList
    ? a2zDsaSheetData.filter((step) => filterList.includes(step.stepId))
    : a2zDsaSheetData;

  const [activeStepId, setActiveStepId] = useState<string | null>(
    filteredSteps.length > 0 ? filteredSteps[0].stepId : null
  );
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);

  // Sync state between client and Firestore / LocalStorage
  useEffect(() => {
    if (authLoading) return;

    const loadUserData = async () => {
      setDataLoading(true);
      
      let localSolved: Record<string, { solved: boolean; date?: string }> = {};
      let localNotes: Record<string, string> = {};
      
      try {
        const storedSolved = localStorage.getItem("dsa_solved_map");
        const storedNotes = localStorage.getItem("dsa_notes_map");
        if (storedSolved) localSolved = JSON.parse(storedSolved);
        if (storedNotes) localNotes = JSON.parse(storedNotes);
      } catch (err) {
        console.error("Local storage read error:", err);
      }

      if (user && db) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            const dbSolved = data.solvedMap || {};
            const dbNotes = data.notesMap || {};
            
            // Merge any local progress that isn't on database yet
            const mergedSolved = { ...localSolved, ...dbSolved };
            const mergedNotes = { ...localNotes, ...dbNotes };
            
            setSolvedMap(mergedSolved);
            setNotesMap(mergedNotes);

            // Sync merged state back to Firestore if there was local progress
            if (Object.keys(localSolved).length > 0 || Object.keys(localNotes).length > 0) {
              await setDoc(userDocRef, { solvedMap: mergedSolved, notesMap: mergedNotes }, { merge: true });
              localStorage.removeItem("dsa_solved_map");
              localStorage.removeItem("dsa_notes_map");
            }
          } else {
            // First time logging in, initialize firestore with local storage data
            await setDoc(userDocRef, { solvedMap: localSolved, notesMap: localNotes });
            setSolvedMap(localSolved);
            setNotesMap(localNotes);
            
            localStorage.removeItem("dsa_solved_map");
            localStorage.removeItem("dsa_notes_map");
          }
        } catch (err) {
          console.error("Error reading Firestore:", err);
          setSolvedMap(localSolved);
          setNotesMap(localNotes);
        }
      } else {
        // Guest mode, use local storage
        setSolvedMap(localSolved);
        setNotesMap(localNotes);
      }
      
      setDataLoading(false);
    };

    loadUserData();
  }, [user, authLoading]);

  const totalProblems = filteredSteps.reduce(
    (acc, step) =>
      acc +
      step.lessons.reduce(
        (lAcc, l) => lAcc + l.topics.reduce((tAcc, t) => tAcc + t.problems.length, 0),
        0
      ),
    0
  );

  const solvedCount = filteredSteps.reduce(
    (acc, step) =>
      acc +
      step.lessons.reduce(
        (lAcc, l) =>
          lAcc +
          l.topics.reduce(
            (tAcc, t) =>
              tAcc +
              t.problems.filter((p) => solvedMap[p.id]?.solved).length,
            0
          ),
        0
      ),
    0
  );

  const progressPercent = Math.round((solvedCount / totalProblems) * 100) || 0;

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
    if (!editingProblem) return;
    
    const newNotesMap = {
      ...notesMap,
      [editingProblem.id]: content,
    };

    setNotesMap(newNotesMap);
    setEditingProblem(null);

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

  const getHeaderTitle = () => {
    if (!stepIdFilter) return "DSA CHRONICLES";
    if (stepIdFilter === "step-1") return "ARRAY TRACKER";
    if (stepIdFilter === "step-2") return "BINARY SEARCH TRACK";
    if (stepIdFilter === "step-4") return "LINKED LIST ROADMAP";
    if (stepIdFilter === "step-5") return "RECURSION ROADMAP";
    if (stepIdFilter === "step-6") return "TWO POINTERS & SLIDING WINDOW";
    if (
      (Array.isArray(stepIdFilter) && stepIdFilter.includes("step-3")) ||
      stepIdFilter === "step-3" ||
      stepIdFilter === "step-7"
    ) {
      return "STRINGS CONQUEST";
    }
    return "DSA CHRONICLES";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* App Header Banner */}
      <header className="bg-neoYellow border-4 border-black p-6 md:p-8 shadow-neo rounded-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-black text-neoYellow px-3 py-1 font-black transform rotate-3 border-2 border-black text-xs uppercase w-max mb-3">
              STUDY TRACKER
            </div>
            {dataLoading ? (
              <div className="bg-neoBlue text-black px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase w-max mb-3 rounded">
                LOADING DATA...
              </div>
            ) : syncing ? (
              <div className="bg-neoYellow text-black px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase w-max mb-3 rounded animate-pulse">
                SYNCING CLOUD...
              </div>
            ) : user ? (
              <div className="bg-neoGreen text-black px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase w-max mb-3 rounded">
                CLOUD SYNCED
              </div>
            ) : (
              <div className="bg-neoPink text-black px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase w-max mb-3 rounded">
                GUEST MODE (LOCAL)
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase">
            {getHeaderTitle()}
          </h1>
          <p className="text-sm md:text-base font-black border-t-2 border-black pt-2 max-w-xl flex items-center gap-2">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile Avatar"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full border-2 border-black object-cover shadow-neo-sm shrink-0"
              />
            )}
            <span>
              {profile?.displayName ? `Welcome back, ${profile.displayName}! ` : ""}
              Conquer the A2Z roadmap. Crush coding interviews. Build consistency.
            </span>
          </p>
        </div>

        {/* Navigation Button */}
        <div>
          <Link
            href="/patterns"
            className="inline-block bg-neoPurple border-4 border-black font-black text-sm md:text-base py-3 px-6 rounded-lg shadow-neo neo-clickable uppercase hover:-translate-y-0.5"
          >
            Pattern Cheat Sheet
          </Link>
        </div>
      </header>

      {/* Progress Dashboard Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Statistics Box */}
        <div className="bg-neoGreen border-4 border-black p-6 shadow-neo rounded-xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase mb-4">Your Progress</h2>
            <div className="flex justify-between font-extrabold text-lg mb-1">
              <span>Solved: {solvedCount} / {totalProblems}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-white border-2 border-black h-8 rounded-md overflow-hidden relative">
              <div
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Global Progress Grid Integration */}
        <div className="bg-neoBlue border-4 border-black p-6 shadow-neo rounded-xl md:col-span-2">
          <h2 className="text-2xl font-black uppercase mb-2">Streak Board</h2>
          <ProgressGrid solvedMap={solvedMap} />
        </div>
      </section>

      {/* Main Track Accordion */}
      <section className="space-y-4">
        {filteredSteps.map((step) => {
          const isOpened = activeStepId === step.stepId;
          return (
            <div
              key={step.stepId}
              className="border-4 border-black shadow-neo rounded-xl bg-white overflow-hidden"
            >
              {/* Step Header Toggle */}
              <button
                onClick={() => setActiveStepId(isOpened ? null : step.stepId)}
                className="w-full text-left bg-neoPink p-4 md:p-5 font-black text-lg md:text-2xl uppercase border-b-4 border-black flex justify-between items-center neo-clickable cursor-pointer"
              >
                <span>{step.stepTitle}</span>
                <span className="text-xl md:text-2xl">{isOpened ? "▲" : "▼"}</span>
              </button>

              {/* Accordion Content */}
              {isOpened && (
                <div className="p-4 md:p-6 space-y-6 bg-neoCream">
                  {step.lessons.map((lesson) => (
                    <div key={lesson.lessonId} className="space-y-4">
                      <h3 className="text-lg md:text-xl font-extrabold border-b-2 border-black pb-1 uppercase tracking-wide">
                        {lesson.lessonTitle}
                      </h3>

                      {lesson.topics.map((topic) => (
                        <div
                          key={topic.topicId}
                          className="bg-white border-2 border-black p-4 rounded-lg shadow-neo space-y-3"
                        >
                          <h4 className="font-black text-md text-gray-700 uppercase">
                            {topic.topicTitle}
                          </h4>

                          {/* Problems List */}
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                              <thead>
                                <tr className="border-b-2 border-black text-xs font-black uppercase tracking-wider text-gray-500">
                                  <th className="py-2 px-3 w-16">Done</th>
                                  <th className="py-2 px-3">Problem Name</th>
                                  <th className="py-2 px-3 w-40 text-center">Practice</th>
                                  <th className="py-2 px-3 w-20 text-center">Note</th>
                                </tr>
                              </thead>
                              <tbody>
                                {topic.problems.map((problem) => {
                                  const isSolved = !!solvedMap[problem.id]?.solved;
                                  const hasNote = !!notesMap[problem.id];
                                  return (
                                    <tr
                                      key={problem.id}
                                      className={`border-b border-gray-300 hover:bg-yellow-50 transition-colors ${
                                        isSolved ? "bg-green-50/50" : ""
                                      }`}
                                    >
                                      {/* Status Toggle Box */}
                                      <td className="py-3 px-3">
                                        <button
                                          onClick={() => toggleSolved(problem.id)}
                                          className={`w-6 h-6 border-2 border-black flex items-center justify-center font-bold text-xs neo-clickable cursor-pointer transition-all ${
                                            isSolved
                                              ? "bg-neoGreen shadow-none"
                                              : "bg-white shadow-neo-sm hover:bg-gray-100"
                                          }`}
                                        >
                                          {isSolved ? "✓" : ""}
                                        </button>
                                      </td>

                                      {/* Name */}
                                      <td className="py-3 px-3">
                                        <span
                                          className={`font-bold text-sm md:text-base ${
                                            isSolved ? "line-through text-gray-400" : "text-black"
                                          }`}
                                        >
                                          {problem.name}
                                        </span>
                                      </td>

                                      {/* External Practice Portals */}
                                      <td className="py-3 px-3 text-center">
                                        <div className="flex justify-center space-x-2">
                                          {problem.leetcodeUrl ? (
                                            <a
                                              href={problem.leetcodeUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="px-3 py-1 bg-yellow-400 border border-black font-extrabold text-xs shadow-neo-sm hover:-translate-y-0.5 neo-clickable inline-block"
                                            >
                                              LeetCode
                                            </a>
                                          ) : (
                                            <span className="px-3 py-1 bg-gray-200 border border-gray-400 font-extrabold text-xs text-gray-400 inline-block cursor-not-allowed">
                                              LeetCode
                                            </span>
                                          )}
                                          {problem.gfgUrl ? (
                                            <a
                                              href={problem.gfgUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="px-3 py-1 bg-green-400 border border-black font-extrabold text-xs shadow-neo-sm hover:-translate-y-0.5 neo-clickable inline-block"
                                            >
                                              GFG
                                            </a>
                                          ) : (
                                            <span className="px-3 py-1 bg-gray-200 border border-gray-400 font-extrabold text-xs text-gray-400 inline-block cursor-not-allowed">
                                              GFG
                                            </span>
                                          )}
                                        </div>
                                      </td>

                                      {/* Custom Notes Toggle */}
                                      <td className="py-3 px-3 text-center">
                                        <button
                                          onClick={() => setEditingProblem(problem)}
                                          className={`py-1 px-3 border-2 border-black rounded font-black text-xs transition-all neo-clickable cursor-pointer uppercase ${
                                            hasNote ? "bg-neoPurple text-white shadow-none" : "bg-white text-black hover:bg-gray-100 shadow-neo-sm"
                                          }`}
                                          title="View/Add Notes"
                                        >
                                          {hasNote ? "Edit Note" : "Add Note"}
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Neubrutalist Notes Overlay Modal */}
      {editingProblem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black p-4 w-full max-w-2xl rounded-2xl shadow-neo-lg flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b-2 border-black mb-4">
              <div>
                <span className="bg-neoYellow border border-black px-2.5 py-1 text-xs font-black uppercase rounded shadow-neo-sm">
                  Notebook
                </span>
                <h3 className="text-xl font-black truncate mt-1">
                  Notes: {editingProblem.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingProblem(null)}
                className="w-8 h-8 bg-neoRed border-2 border-black font-black flex items-center justify-center neo-clickable hover:bg-red-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Note Editor Body */}
            <div className="flex-1 overflow-y-auto mb-4 border-2 border-black rounded-lg">
              <NotebookEditor
                initialValue={notesMap[editingProblem.id] || ""}
                onSave={handleSaveNotes}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

