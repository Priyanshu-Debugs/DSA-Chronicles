"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { leetcode75SheetData, allLeetCode75Problems } from "@/data/leetcode75Sheet";
import { a2zDsaSheetData, Problem } from "@/data/a2zDsaSheet";
import { sqlTop50SheetData } from "@/data/sqlTop50Sheet";
import { useAuth } from "@/context/AuthContext";
import { db, doc, getDoc, setDoc, onSnapshot } from "@/lib/firebase";
import QuestionModal from "@/components/Tracker/QuestionModal";
import ProgressGrid from "@/components/Tracker/ProgressGrid";
import VisualizerModal from "@/components/Visualizer/VisualizerModal";
import { getProblemMeta } from "@/components/Visualizer/visualizerRegistry";

interface Toast {
  id: string;
  message: string;
}

export default function LeetCode75Page() {
  const { user, profile, loading: authLoading, isGuest } = useAuth();
  
  const [solvedMap, setSolvedMap] = useState<Record<string, { solved: boolean; date?: string }>>({});
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [dataLoading, setDataLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [profileSyncing, setProfileSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPattern, setSelectedPattern] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  
  const [activeModalProblem, setActiveModalProblem] = useState<Problem | null>(null);
  const [visualizingProblem, setVisualizingProblem] = useState<Problem | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const lastSyncTimeRef = useRef<number>(0);

  // LeetCode states
  const [lcStats, setLcStats] = useState<{
    ranking?: number;
    totalSolved?: number;
    easySolved?: number;
    mediumSolved?: number;
    hardSolved?: number;
    avatar?: string | null;
    recentSolved?: Array<{ title: string; titleSlug: string; timestamp: string; lang: string }>;
    loading: boolean;
    error: boolean;
  } | null>(null);

  // GFG states
  const [gfgStats, setGfgStats] = useState<{
    fullName?: string;
    profilePicture?: string;
    institute?: string;
    instituteRank?: string;
    codingScore?: number;
    totalProblemsSolved?: number;
    recentSolved?: Array<{ question: string; questionUrl: string; difficulty: string }>;
    loading: boolean;
    error: boolean;
  } | null>(null);

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

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

  // Fetch LeetCode & GFG profile stats
  useEffect(() => {
    if (authLoading) return;

    const fetchLeetCodeStats = async (username: string) => {
      setLcStats({ loading: true, error: false });
      try {
        const res = await fetch(`/api/leetcode?username=${username}`, { cache: "no-store" });
        if (!res.ok) throw new Error("LeetCode API error");
        const data = await res.json();
        const submissions = data.submission || [];
        const recentSolved = submissions.map((sub: any) => ({
          title: sub.title,
          titleSlug: sub.titleSlug,
          timestamp: sub.timestamp,
          lang: sub.lang || "unknown",
        })).slice(0, 10);

        setLcStats({
          ranking: data.ranking || 0,
          totalSolved: data.totalSolved || 0,
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
          avatar: data.avatarUrl || null,
          recentSolved,
          loading: false,
          error: false,
        });
      } catch (err) {
        console.warn("Failed to fetch LeetCode stats:", err);
        setLcStats({ loading: false, error: true });
      }
    };

    const fetchGfgStats = async (username: string) => {
      setGfgStats({ loading: true, error: false });
      try {
        const res = await fetch(`/api/gfg?username=${username}`, { cache: "no-store" });
        if (!res.ok) throw new Error("GFG API error");
        const data = await res.json();

        setGfgStats({
          fullName: data.mentorName || username,
          profilePicture: data.profilePicture || "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
          institute: data.institute || "N/A",
          instituteRank: data.instituteRank || "N/A",
          codingScore: data.codingScore || 0,
          totalProblemsSolved: data.totalProblemsSolved || 0,
          recentSolved: data.recentSolved || [],
          loading: false,
          error: false,
        });
      } catch (err) {
        console.error("Failed to fetch GFG stats:", err);
        setGfgStats({ loading: false, error: true });
      }
    };

    if (profile?.leetcodeUsername) {
      fetchLeetCodeStats(profile.leetcodeUsername);
    } else {
      setLcStats(null);
    }

    if (profile?.gfgUsername) {
      fetchGfgStats(profile.gfgUsername);
    } else {
      setGfgStats(null);
    }
  }, [profile, authLoading]);

  // Real-time Coding Profiles Sync (LeetCode & GFG)
  const syncCodingProfiles = async (force = false) => {
    if (isGuest || !user || !db || authLoading) return;
    if (!profile?.leetcodeUsername && !profile?.gfgUsername) return;

    const now = Date.now();
    if (!force && now - lastSyncTimeRef.current < 15000) {
      return;
    }
    lastSyncTimeRef.current = now;
    setProfileSyncing(true);

    try {
      const slugToIdMap: Record<string, string> = {};
      const nameToIdMap: Record<string, string> = {};

      const getLeetCodeSlug = (url?: string) => {
        if (!url) return null;
        const parts = url.split("/problems/");
        return parts.length > 1 ? parts[1].split("/")[0] : null;
      };

      const cleanGfgSlug = (url?: string) => {
        if (!url) return null;
        const parts = url.toLowerCase().split("/problems/");
        if (parts.length > 1) {
          return parts[1].split("/")[0].split("?")[0].split("#")[0].trim();
        }
        return null;
      };

      const normalizeName = (name: string) =>
        name.toLowerCase().replace(/[^a-z0-9]/g, "");

      const idToNameMap: Record<string, string> = {};

      [...leetcode75SheetData, ...sqlTop50SheetData, ...a2zDsaSheetData].forEach((step) => {
        step.lessons.forEach((l) => {
          l.topics.forEach((t) => {
            t.problems.forEach((p) => {
              if ((p as any).leetcodeSlug) {
                slugToIdMap[(p as any).leetcodeSlug] = p.id;
              }
              const lcSlug = getLeetCodeSlug(p.leetcodeUrl);
              if (lcSlug) {
                slugToIdMap[lcSlug] = p.id;
              }
              if ((p as any).gfgSlug) {
                slugToIdMap[(p as any).gfgSlug.toLowerCase()] = p.id;
              }
              const gfgSlug = cleanGfgSlug(p.gfgUrl);
              if (gfgSlug) {
                slugToIdMap[gfgSlug] = p.id;
              }
              nameToIdMap[normalizeName(p.name)] = p.id;
              idToNameMap[p.id] = p.name;
            });
          });
        });
      });

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const currentSolvedMap = userDocSnap.exists()
        ? userDocSnap.data().solvedMap || {}
        : {};

      const newSolvedMap = { ...currentSolvedMap };
      let updated = false;
      const today = new Date().toISOString().split("T")[0];
      const newlySolvedNames: string[] = [];

      // Fetch & Sync LeetCode
      if (profile.leetcodeUsername) {
        try {
          const res = await fetch(`/api/leetcode?username=${profile.leetcodeUsername}`, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            const submissions = data.submission || [];
            submissions.forEach((sub: { titleSlug: string; title?: string; timestamp: string }) => {
              let problemId = slugToIdMap[sub.titleSlug];
              if (!problemId && sub.title) {
                problemId = nameToIdMap[normalizeName(sub.title)];
              }
              if (problemId && !newSolvedMap[problemId]?.solved) {
                const timestampMs = parseInt(sub.timestamp) * 1000;
                const dateStr = isNaN(timestampMs)
                  ? today
                  : new Date(timestampMs).toISOString().split("T")[0];
                newSolvedMap[problemId] = {
                  solved: true,
                  date: dateStr,
                };
                newlySolvedNames.push(idToNameMap[problemId] || sub.title || "LeetCode Problem");
                updated = true;
              }
            });
          }
        } catch (err) {
          console.warn("Auto-sync LeetCode error:", err);
        }
      }

      // Fetch & Sync GeeksforGeeks
      if (profile.gfgUsername) {
        try {
          const res = await fetch(`/api/gfg?username=${profile.gfgUsername}`, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            const solvedProblemsList = data.problems || [];
            solvedProblemsList.forEach((prob: { question?: string; questionUrl: string }) => {
              const urlSlug = cleanGfgSlug(prob.questionUrl);
              let problemId = urlSlug ? slugToIdMap[urlSlug] : undefined;
              if (!problemId && prob.question) {
                problemId = nameToIdMap[normalizeName(prob.question)];
              }
              if (problemId && !newSolvedMap[problemId]?.solved) {
                newSolvedMap[problemId] = {
                  solved: true,
                  date: today,
                };
                newlySolvedNames.push(idToNameMap[problemId] || prob.question || "GFG Problem");
                updated = true;
              }
            });
          }
        } catch (err) {
          console.warn("Auto-sync GFG error:", err);
        }
      }

      if (updated) {
        await setDoc(userDocRef, { solvedMap: newSolvedMap }, { merge: true });
        setSolvedMap(newSolvedMap);
        newlySolvedNames.forEach((name) => {
          showToast(`🎉 Auto-Solved: ${name} is marked as complete!`);
        });
      } else if (force) {
        showToast("🔄 Sync completed! No new submissions found.");
      }
    } catch (err) {
      console.error("Auto-sync profiles error:", err);
      if (force) {
        showToast("❌ Sync failed. Please check your network connection.");
      }
    } finally {
      setProfileSyncing(false);
    }
  };

  // Auto-sync on load & focus
  useEffect(() => {
    if (authLoading || isGuest || !user || !profile) return;

    const initialSyncTimer = setTimeout(() => {
      syncCodingProfiles();
    }, 2000);

    const handleFocus = () => {
      syncCodingProfiles();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      clearTimeout(initialSyncTimer);
      window.removeEventListener("focus", handleFocus);
    };
  }, [profile, user, authLoading, isGuest]);

  const totalProblems = allLeetCode75Problems.length;
  const solvedCount = allLeetCode75Problems.filter((p) => solvedMap[p.id]?.solved).length;
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

  const formatTimestamp = (timestampStr: string) => {
    const ts = parseInt(timestampStr);
    if (isNaN(ts)) return "";
    const date = new Date(ts * 1000);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 select-none">
      {/* Toast Notification Stack */}
      <div className="fixed top-20 right-4 z-50 flex flex-col space-y-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-neoYellow text-black border-4 border-black p-4 rounded-xl shadow-neo font-black text-xs md:text-sm animate-bounce pointer-events-auto"
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Header Card */}
      <header className="bg-neoOrange bg-amber-400 border-4 border-black p-6 md:p-8 shadow-neo rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase rounded shadow-neo-sm flex items-center gap-1">
              🔥 LEETCODE 75 STUDY PLAN
            </span>
            {dataLoading ? (
              <span className="bg-neoBlue text-black px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase rounded">
                LOADING DATA...
              </span>
            ) : profileSyncing ? (
              <span className="bg-neoPurple text-white px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase rounded animate-pulse shadow-neo-sm">
                SYNCING PROFILES...
              </span>
            ) : syncing ? (
              <span className="bg-neoYellow text-black px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase rounded animate-pulse">
                SYNCING CLOUD...
              </span>
            ) : user ? (
              <span className="bg-neoGreen text-black px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase rounded">
                CLOUD SYNCED
              </span>
            ) : (
              <span className="bg-neoPink text-black px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase rounded">
                GUEST MODE (LOCAL)
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            LEETCODE 75 CONQUEST
          </h1>
          <p className="font-bold border-t-2 border-black pt-2 max-w-2xl text-sm md:text-base text-black mt-2">
            Master essential Data Structures & Algorithms patterns with 75 curated LeetCode questions covering Arrays, Sliding Window, Two Pointers, Trees, Graphs, DP, Heaps, and Tries.
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

      {/* Progress Dashboard Banner & Streak Board (Calendar) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Statistics Box */}
        <div className="bg-neoGreen border-4 border-black p-6 shadow-neo rounded-xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase mb-4 text-black">Your Progress</h2>
            <div className="flex justify-between font-extrabold text-lg mb-1 text-black">
              <span>Solved: {solvedCount} / {totalProblems}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-white border-2 border-black h-8 rounded-md overflow-hidden relative shadow-inner">
              <div
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Global Progress Grid Integration (Streak Board Calendar) */}
        <div className="bg-neoBlue border-4 border-black p-6 shadow-neo rounded-xl md:col-span-2">
          <h2 className="text-2xl font-black uppercase mb-2 text-black">Streak Board</h2>
          <ProgressGrid solvedMap={solvedMap} />
        </div>
      </section>

      {/* Coding Profiles Dashboard Integration & Sync Profiles Button */}
      {!authLoading && (profile?.leetcodeUsername || profile?.gfgUsername) && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-white border-4 border-black p-4 shadow-neo rounded-xl gap-4">
            <div>
              <h3 className="font-black text-xl uppercase flex items-center gap-2 text-black">
                ⚡ Linked Profiles
                {profileSyncing && (
                  <span className="inline-flex h-2 w-2 rounded-full bg-neoPurple border border-black animate-ping" />
                )}
              </h3>
              <p className="text-xs font-bold text-gray-500 uppercase mt-0.5">
                Automatically checks off solved LeetCode 75 questions in real-time
              </p>
            </div>
            <button
              onClick={() => syncCodingProfiles(true)}
              disabled={profileSyncing}
              className="bg-neoYellow border-4 border-black font-black text-sm py-2.5 px-5 rounded-lg shadow-neo hover:bg-yellow-300 disabled:opacity-50 transition-all uppercase flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable w-max text-black"
            >
              {profileSyncing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Syncing Profiles...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Sync Profiles
                </>
              )}
            </button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LeetCode Profile Card */}
            {profile?.leetcodeUsername && (
              <div className="bg-[#1a1a1a] text-white border-4 border-black p-6 shadow-neo rounded-xl space-y-4">
                <div className="flex justify-between items-center border-b-2 border-gray-800 pb-3">
                  <div className="flex items-center gap-3">
                    {lcStats?.avatar ? (
                      <img src={lcStats.avatar} alt="LeetCode Avatar" className="w-12 h-12 rounded-lg border-2 border-white object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 text-white rounded-lg border-2 border-white flex items-center justify-center font-black text-xl">
                        {profile?.leetcodeUsername?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-neoYellow uppercase">LeetCode Profile</h3>
                      <a
                        href={`https://leetcode.com/u/${profile?.leetcodeUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-gray-400 hover:text-white underline"
                      >
                        @{profile?.leetcodeUsername}
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase block font-black">Global Rank</span>
                    <span className="text-lg font-black text-white">
                      {lcStats?.loading ? "Loading..." : lcStats?.error ? "N/A" : `#${lcStats?.ranking?.toLocaleString() || "N/A"}`}
                    </span>
                  </div>
                </div>

                {lcStats?.loading ? (
                  <div className="py-4 text-center text-xs font-bold uppercase animate-pulse text-gray-400">Loading LeetCode stats...</div>
                ) : lcStats?.error ? (
                  <div className="py-4 text-center text-xs font-bold uppercase text-neoRed">Failed to load LeetCode stats.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="text-center sm:text-left bg-gray-900 border-2 border-black p-4 rounded-lg">
                      <span className="text-2xl font-black text-neoYellow">{lcStats?.totalSolved}</span>
                      <span className="text-xs text-gray-400 block font-bold uppercase">Total Solved</span>
                    </div>
                    
                    <div className="space-y-2 text-xs font-bold">
                      {/* Easy */}
                      <div>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-[#00b8a3]">Easy</span>
                          <span>{lcStats?.easySolved}</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden border border-black">
                          <div
                            className="bg-[#00b8a3] h-full"
                            style={{
                              width: `${lcStats?.totalSolved ? (lcStats.easySolved! / lcStats.totalSolved!) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Medium */}
                      <div>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-[#ffc01e]">Medium</span>
                          <span>{lcStats?.mediumSolved}</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden border border-black">
                          <div
                            className="bg-[#ffc01e] h-full"
                            style={{
                              width: `${lcStats?.totalSolved ? (lcStats.mediumSolved! / lcStats.totalSolved!) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Hard */}
                      <div>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-[#ef4743]">Hard</span>
                          <span>{lcStats?.hardSolved}</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden border border-black">
                          <div
                            className="bg-[#ef4743] h-full"
                            style={{
                              width: `${lcStats?.totalSolved ? (lcStats.hardSolved! / lcStats.totalSolved!) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recently Solved Questions */}
                {!lcStats?.loading && !lcStats?.error && lcStats?.recentSolved && lcStats.recentSolved.length > 0 && (
                  <div className="border-t-2 border-gray-800 pt-4 mt-2">
                    <h4 className="text-xs font-black uppercase text-neoYellow tracking-wide mb-3 flex items-center justify-between">
                      <span>Recently Solved</span>
                      <span className="bg-gray-800 text-[10px] text-gray-400 px-2 py-0.5 rounded border border-black font-mono">
                        Last {lcStats.recentSolved.length}
                      </span>
                    </h4>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                      {lcStats.recentSolved.map((sub, idx) => (
                        <a
                          key={idx}
                          href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-between items-center bg-gray-950 border border-black hover:border-neoYellow p-2 rounded text-xs font-semibold group transition-all"
                        >
                          <span className="text-gray-300 group-hover:text-white truncate max-w-[65%]">
                            {sub.title}
                          </span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="bg-gray-800 text-[9px] text-[#00b8a3] px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                              {sub.lang}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono">
                              {formatTimestamp(sub.timestamp)}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GeeksforGeeks Profile Card */}
            {profile?.gfgUsername && (
              <div className="bg-[#f0f9f4] text-[#0f5132] border-4 border-black p-6 shadow-neo rounded-xl space-y-4">
                <div className="flex justify-between items-center border-b-2 border-green-200 pb-3">
                  <div className="flex items-center gap-3">
                    {gfgStats?.profilePicture ? (
                      <img src={gfgStats.profilePicture} alt="GFG Avatar" className="w-12 h-12 rounded-lg border-2 border-black object-cover shadow-neo-sm bg-white" />
                    ) : (
                      <div className="w-12 h-12 bg-[#2f8d46] text-white rounded-lg border-2 border-black flex items-center justify-center font-black text-xl shadow-neo-sm">
                        {profile?.gfgUsername?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-[#2f8d46] uppercase">GFG Profile</h3>
                      <a
                        href={`https://www.geeksforgeeks.org/profile/${profile?.gfgUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#0f5132]/75 hover:text-[#0f5132] underline"
                      >
                        @{profile?.gfgUsername}
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-green-700/60 uppercase block font-black">Coding Score</span>
                    <span className="text-lg font-black text-[#2f8d46]">
                      {gfgStats?.loading ? "Loading..." : gfgStats?.error ? "N/A" : gfgStats?.codingScore || 0}
                    </span>
                  </div>
                </div>

                {gfgStats?.loading ? (
                  <div className="py-4 text-center text-xs font-bold uppercase animate-pulse text-green-700/60">Loading GFG stats...</div>
                ) : gfgStats?.error ? (
                  <div className="py-4 text-center text-xs font-bold uppercase text-neoRed">Failed to load GFG stats.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                      <div className="bg-white border-2 border-black p-3 rounded-lg flex justify-between items-center shadow-neo-sm">
                        <span className="text-xs font-black uppercase text-gray-500 font-bold">Solved</span>
                        <span className="text-lg font-black text-black">{gfgStats?.totalProblemsSolved || 0}</span>
                      </div>
                      <div className="bg-white border-2 border-black p-3 rounded-lg flex justify-between items-center shadow-neo-sm">
                        <span className="text-xs font-black uppercase text-gray-500 font-bold">Inst. Rank</span>
                        <span className="text-lg font-black text-black">{gfgStats?.instituteRank || "N/A"}</span>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-[#0f5132]/85 bg-white border-2 border-black p-3.5 rounded-lg shadow-neo-sm leading-snug space-y-1">
                      <span className="text-[9px] text-gray-500 uppercase block font-black">Institution</span>
                      <span className="font-extrabold text-black block truncate max-w-full">
                        {gfgStats?.institute || "No Institution Linked"}
                      </span>
                      <span className="text-[9px] text-gray-400 block font-normal leading-tight">
                        * Real-time metrics from GFG Profile
                      </span>
                    </div>
                  </div>
                )}

                {/* Recently Solved Questions */}
                {!gfgStats?.loading && !gfgStats?.error && gfgStats?.recentSolved && gfgStats.recentSolved.length > 0 && (
                  <div className="border-t-2 border-green-200 pt-4 mt-2">
                    <h4 className="text-xs font-black uppercase text-[#2f8d46] tracking-wide mb-3 flex items-center justify-between">
                      <span>Recently Solved</span>
                      <span className="bg-white text-[10px] text-gray-500 px-2 py-0.5 rounded border border-black font-mono">
                        Last {gfgStats.recentSolved.length}
                      </span>
                    </h4>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
                      {gfgStats.recentSolved.map((sub, idx) => (
                        <a
                          key={idx}
                          href={sub.questionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-between items-center bg-white border border-black hover:border-[#2f8d46] p-2 rounded text-xs font-semibold group transition-all"
                        >
                          <span className="text-gray-700 group-hover:text-black truncate max-w-[75%]">
                            {sub.question}
                          </span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold flex-shrink-0 ${
                            sub.difficulty?.toLowerCase() === "easy" ? "bg-green-100 text-green-700" :
                            sub.difficulty?.toLowerCase() === "medium" ? "bg-yellow-100 text-yellow-800" :
                            sub.difficulty?.toLowerCase() === "hard" ? "bg-red-100 text-red-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {sub.difficulty}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Prompt to link profiles if none connected */}
      {!authLoading && !isGuest && user && !profile?.leetcodeUsername && !profile?.gfgUsername && (
        <section className="bg-white border-4 border-black p-6 shadow-neo rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black uppercase mb-1 text-black">🔥 Boost Your LeetCode 75 Tracker!</h3>
              <p className="text-sm font-bold text-gray-700">
                Link your LeetCode and GeeksforGeeks profiles in settings to track your real-time coding score and auto-sync LeetCode 75 submissions automatically.
              </p>
            </div>
            <Link
              href="/profile"
              className="bg-neoYellow border-4 border-black font-black text-sm px-5 py-2.5 rounded-lg shadow-neo hover:bg-yellow-300 transition-all uppercase shrink-0 text-black"
            >
              Link Profiles
            </Link>
          </div>
        </section>
      )}

      {/* Search & Filter Section */}
      <section className="bg-white border-4 border-black p-6 shadow-neo rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search LeetCode 75 questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100 border-2 border-black rounded-lg px-4 py-2.5 text-sm font-bold placeholder-gray-500 focus:outline-none focus:bg-white shadow-neo-sm text-black"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 font-black text-sm text-gray-500 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Pattern Filter */}
            <select
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value)}
              className="bg-neoYellow border-2 border-black rounded-lg px-3 py-2 text-xs font-black uppercase shadow-neo-sm focus:outline-none cursor-pointer text-black"
            >
              <option value="all">ALL PATTERNS ({leetcode75SheetData.length})</option>
              {leetcode75SheetData.map((step) => (
                <option key={step.stepId} value={step.stepTitle}>
                  {step.stepTitle}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-neoPink border-2 border-black rounded-lg px-3 py-2 text-xs font-black uppercase shadow-neo-sm focus:outline-none cursor-pointer text-black"
            >
              <option value="all">ALL DIFFICULTIES</option>
              <option value="Easy">EASY</option>
              <option value="Medium">MEDIUM</option>
              <option value="Hard">HARD</option>
            </select>
          </div>
        </div>
      </section>

      {/* Pattern-Wise Questions Accordion List */}
      <section className="space-y-6">
        {leetcode75SheetData
          .filter((step) => selectedPattern === "all" || step.stepTitle === selectedPattern)
          .map((step) => {
            const stepProblems = step.lessons.flatMap((l) => l.topics.flatMap((t) => t.problems));

            const filteredStepProblems = stepProblems.filter((p) => {
              const diffMatch =
                selectedDifficulty === "all" || (p as any).difficulty === selectedDifficulty;
              const searchMatch =
                !searchQuery ||
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase());
              return diffMatch && searchMatch;
            });

            if (filteredStepProblems.length === 0) return null;

            const solvedStepCount = stepProblems.filter((p) => solvedMap[p.id]?.solved).length;
            const stepProgressPercent = Math.round((solvedStepCount / stepProblems.length) * 100);

            return (
              <div
                key={step.stepId}
                className="bg-white border-4 border-black shadow-neo rounded-xl overflow-hidden"
              >
                {/* Pattern Header */}
                <div className="bg-neoYellow border-b-4 border-black p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-black text-white px-2.5 py-1 text-xs font-black uppercase rounded shadow-neo-sm">
                      PATTERN
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                      {step.stepTitle}
                    </h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black uppercase text-black">
                      {solvedStepCount} / {stepProblems.length} Solved ({stepProgressPercent}%)
                    </span>
                    <div className="w-24 bg-white border-2 border-black h-3 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="bg-neoGreen h-full transition-all duration-300"
                        style={{ width: `${stepProgressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Question List */}
                <div className="divide-y-2 divide-black">
                  {filteredStepProblems.map((problem) => {
                    const isSolved = !!solvedMap[problem.id]?.solved;
                    const diff = (problem as any).difficulty || "Medium";
                    const hasNotes = !!notesMap[problem.id];
                    const meta = getProblemMeta(problem.id, problem.name);

                    return (
                      <div
                        key={problem.id}
                        className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                          isSolved ? "bg-green-50/60" : "hover:bg-amber-50/40"
                        }`}
                      >
                        {/* Checkbox & Problem Name */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <button
                            onClick={() => toggleSolved(problem.id)}
                            className={`w-6 h-6 rounded border-2 border-black flex items-center justify-center font-black text-sm shrink-0 transition-transform neo-clickable cursor-pointer ${
                              isSolved
                                ? "bg-neoGreen text-black shadow-neo-sm scale-105"
                                : "bg-white hover:bg-stone-100"
                            }`}
                            title={isSolved ? "Mark as Unsolved" : "Mark as Solved"}
                          >
                            {isSolved ? "✓" : ""}
                          </button>

                          <div className="min-w-0 flex-1">
                            <span
                              className={`font-black text-sm sm:text-base block truncate text-black ${
                                isSolved ? "line-through text-gray-500" : ""
                              }`}
                            >
                              {problem.name}
                            </span>
                          </div>

                          {/* Difficulty Tag */}
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border-2 border-black shadow-neo-sm shrink-0 ${
                              diff === "Easy"
                                ? "bg-neoGreen text-black"
                                : diff === "Medium"
                                ? "bg-neoYellow text-black"
                                : "bg-neoRed text-black"
                            }`}
                          >
                            {diff}
                          </span>
                        </div>

                        {/* Action Controls */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          {/* LeetCode Button */}
                          {problem.leetcodeUrl && (
                            <a
                              href={problem.leetcodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-neoYellow border-2 border-black font-black text-xs px-3 py-1.5 rounded shadow-neo-sm hover:bg-yellow-300 transition-all uppercase flex items-center gap-1 text-black neo-clickable"
                            >
                              <span>LeetCode</span>
                              <svg
                                className="w-3 h-3 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.5"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          )}

                          {/* Visualizer Button */}
                          {meta && (
                            <button
                              onClick={() => setVisualizingProblem(problem)}
                              className="bg-neoBlue border-2 border-black font-black text-xs px-3 py-1.5 rounded shadow-neo-sm hover:bg-blue-300 transition-all uppercase flex items-center gap-1 text-black neo-clickable cursor-pointer"
                            >
                              <span>Visualize</span>
                              <span>✨</span>
                            </button>
                          )}

                          {/* Notes Button */}
                          <button
                            onClick={() => setActiveModalProblem(problem)}
                            className={`border-2 border-black font-black text-xs px-3 py-1.5 rounded shadow-neo-sm transition-all uppercase flex items-center gap-1 neo-clickable cursor-pointer text-black ${
                              hasNotes
                                ? "bg-neoPurple text-white hover:bg-purple-600"
                                : "bg-white hover:bg-stone-100"
                            }`}
                          >
                            <span>{hasNotes ? "Notes 📝" : "+ Note"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </section>

      {/* Question Notes Modal */}
      <QuestionModal
        isOpen={!!activeModalProblem}
        onClose={() => setActiveModalProblem(null)}
        problem={activeModalProblem}
        isSolved={!!activeModalProblem && !!solvedMap[activeModalProblem.id]?.solved}
        onToggleSolved={(problemId) => toggleSolved(problemId)}
        initialNote={activeModalProblem ? notesMap[activeModalProblem.id] || "" : ""}
        onSaveNote={handleSaveNotes}
      />

      {/* Visualizer Modal */}
      {visualizingProblem && (
        <VisualizerModal
          problem={visualizingProblem}
          onClose={() => setVisualizingProblem(null)}
        />
      )}
    </main>
  );
}
