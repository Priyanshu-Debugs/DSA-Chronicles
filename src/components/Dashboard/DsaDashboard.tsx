"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Problem, a2zDsaSheetData } from "@/data/a2zDsaSheet";
import ProgressGrid from "@/components/Tracker/ProgressGrid";
import NotebookEditor from "@/components/Notebook/NotebookEditor";
import { useAuth } from "@/context/AuthContext";
import { db, doc, getDoc, setDoc, onSnapshot } from "@/lib/firebase";
import PracticeArena from "@/components/Dashboard/PracticeArena";
import { getProblemMeta } from "@/components/Visualizer/visualizerRegistry";
import VisualizerModal from "@/components/Visualizer/VisualizerModal";

interface DsaDashboardProps {
  stepIdFilter?: string | string[];
}

export default function DsaDashboard({ stepIdFilter }: DsaDashboardProps) {
  const { user, profile, loading: authLoading, isGuest } = useAuth();
  
  const [solvedMap, setSolvedMap] = useState<Record<string, { solved: boolean; date?: string }>>({});
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [dataLoading, setDataLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [profileSyncing, setProfileSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<"sheet" | "practice">("sheet");

  interface Toast {
    id: string;
    message: string;
  }
  const [toasts, setToasts] = useState<Toast[]>([]);
  const lastSyncTimeRef = React.useRef<number>(0);

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const syncCodingProfiles = async (force = false) => {
    if (isGuest || !user || !db || authLoading) return;
    if (!profile?.leetcodeUsername && !profile?.gfgUsername) return;

    const now = Date.now();
    // Throttle background calls to 15 seconds unless forced
    if (!force && now - lastSyncTimeRef.current < 15000) {
      return;
    }
    lastSyncTimeRef.current = now;
    setProfileSyncing(true);

    try {
      // 1. Prepare solved maps and matching structures
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

      a2zDsaSheetData.forEach((step) => {
        step.lessons.forEach((l) => {
          l.topics.forEach((t) => {
            t.problems.forEach((p) => {
              if (p.leetcodeSlug) {
                slugToIdMap[p.leetcodeSlug] = p.id;
              }
              const lcSlug = getLeetCodeSlug(p.leetcodeUrl);
              if (lcSlug) {
                slugToIdMap[lcSlug] = p.id;
              }
              if (p.gfgSlug) {
                slugToIdMap[p.gfgSlug.toLowerCase()] = p.id;
              }
              const gfgSlug = cleanGfgSlug(p.gfgUrl);
              if (gfgSlug) {
                slugToIdMap[gfgSlug] = p.id;
              }
              nameToIdMap[normalizeName(p.name)] = p.id;
            });
          });
        });
      });

      // 2. Fetch the absolute latest solved map from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const currentSolvedMap = userDocSnap.exists()
        ? userDocSnap.data().solvedMap || {}
        : {};

      const newSolvedMap = { ...currentSolvedMap };
      let updated = false;
      const today = new Date().toISOString().split("T")[0];
      const newlySolvedNames: string[] = [];

      // Helper map to find problem name by ID
      const idToNameMap: Record<string, string> = {};
      a2zDsaSheetData.forEach((step) => {
        step.lessons.forEach((l) => {
          l.topics.forEach((t) => {
            t.problems.forEach((p) => {
              idToNameMap[p.id] = p.name;
            });
          });
        });
      });

      // 3. Fetch & Sync LeetCode
      if (profile.leetcodeUsername) {
        try {
          const res = await fetch(
            `/api/leetcode?username=${profile.leetcodeUsername}`,
            { cache: "no-store" }
          );
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

      // 4. Fetch & Sync GeeksforGeeks
      if (profile.gfgUsername) {
        try {
          const res = await fetch(
            `/api/gfg?username=${profile.gfgUsername}`,
            { cache: "no-store" }
          );
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

      // 5. Update Firestore if anything matched
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

  // Trigger auto-sync on load and when the window gains focus
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
  const [visualizingProblem, setVisualizingProblem] = useState<Problem | null>(null);

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

  // Fetch coding profiles stats in real-time
  useEffect(() => {
    if (authLoading) return;
    
    // LeetCode Stats Fetching
    const fetchLeetCodeStats = async (username: string) => {
      setLcStats({ loading: true, error: false });
      try {
        const res = await fetch(`/api/leetcode?username=${username}`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Local LeetCode API stats error");
        }
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
        console.warn("Failed to fetch LeetCode stats from local API:", err);
        setLcStats({ loading: false, error: true });
      }
    };

    // GeeksforGeeks Stats Fetching
    const fetchGfgStats = async (username: string) => {
      setGfgStats({ loading: true, error: false });
      try {
        const res = await fetch(`/api/gfg?username=${username}`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Local GFG API stats error");
        }
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
        console.error("Failed to fetch GFG stats from local API:", err);
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

  // Sync state between client and Firestore / LocalStorage
  useEffect(() => {
    if (authLoading) return;

    let unsubscribe: (() => void) | undefined;

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
          
          // Use real-time listener to sync solves as they happen
          unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              const dbSolved = data.solvedMap || {};
              const dbNotes = data.notesMap || {};
              
              // Merge any local progress that isn't on database yet
              const mergedSolved = { ...localSolved, ...dbSolved };
              const mergedNotes = { ...localNotes, ...dbNotes };
              
              setSolvedMap(mergedSolved);
              setNotesMap(mergedNotes);
              setDataLoading(false);

              // Sync merged state back to Firestore if there was local progress
              if (Object.keys(localSolved).length > 0 || Object.keys(localNotes).length > 0) {
                await setDoc(userDocRef, { solvedMap: mergedSolved, notesMap: mergedNotes }, { merge: true });
                localStorage.removeItem("dsa_solved_map");
                localStorage.removeItem("dsa_notes_map");
                localSolved = {};
                localNotes = {};
              }
            } else {
              // First time logging in, initialize firestore with local storage data
              await setDoc(userDocRef, { solvedMap: localSolved, notesMap: localNotes });
              setSolvedMap(localSolved);
              setNotesMap(localNotes);
              setDataLoading(false);
              
              localStorage.removeItem("dsa_solved_map");
              localStorage.removeItem("dsa_notes_map");
              localSolved = {};
              localNotes = {};
            }
          }, (err) => {
            console.error("Firestore onSnapshot error:", err);
            setSolvedMap(localSolved);
            setNotesMap(localNotes);
            setDataLoading(false);
          });
        } catch (err) {
          console.error("Error setting up subscription:", err);
          setSolvedMap(localSolved);
          setNotesMap(localNotes);
          setDataLoading(false);
        }
      } else {
        // Guest mode, use local storage
        setSolvedMap(localSolved);
        setNotesMap(localNotes);
        setDataLoading(false);
      }
    };

    loadUserData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
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
            ) : profileSyncing ? (
              <div className="bg-neoPurple text-white px-2.5 py-0.5 border-2 border-black font-black text-[10px] uppercase w-max mb-3 rounded animate-pulse shadow-neo-sm">
                SYNCING PROFILES...
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
          <div className="flex items-center gap-3.5 mb-2 mt-1 flex-wrap">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 rounded-xl border-4 border-black object-cover shadow-neo transform -rotate-3 shrink-0 bg-white"
            />
            <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
              {getHeaderTitle()}
            </h1>
          </div>
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

        {/* Navigation Tab Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex border-4 border-black rounded-lg overflow-hidden shadow-neo shrink-0 bg-white">
            <button
              onClick={() => setActiveTab("sheet")}
              className={`px-4 py-2.5 font-black text-sm uppercase cursor-pointer transition-all ${
                activeTab === "sheet" ? "bg-neoBlue text-black" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={() => setActiveTab("practice")}
              className={`px-4 py-2.5 border-l-4 border-black font-black text-sm uppercase cursor-pointer transition-all ${
                activeTab === "practice" ? "bg-neoPurple text-white" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              Practice Arena
            </button>
          </div>
          <Link
            href="/patterns"
            className="inline-block text-center bg-neoYellow border-4 border-black text-black font-black text-sm py-2.5 px-5 rounded-lg shadow-neo neo-clickable uppercase hover:-translate-y-0.5"
          >
            Cheat Sheet
          </Link>
        </div>
      </header>

      {activeTab === "sheet" ? (
        <>
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

      {/* Coding Profiles Dashboard Integration */}
      {!authLoading && (profile?.leetcodeUsername || profile?.gfgUsername) && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-white border-4 border-black p-4 shadow-neo rounded-xl gap-4">
            <div>
              <h3 className="font-black text-xl uppercase flex items-center gap-2">
                ⚡ Linked Profiles
                {profileSyncing && (
                  <span className="inline-flex h-2 w-2 rounded-full bg-neoPurple border border-black animate-ping" />
                )}
              </h3>
              <p className="text-xs font-bold text-gray-500 uppercase mt-0.5">
                Automatically checks off solved problems in real-time
              </p>
            </div>
            <button
              onClick={() => syncCodingProfiles(true)}
              disabled={profileSyncing}
              className="bg-neoYellow border-4 border-black font-black text-sm py-2.5 px-5 rounded-lg shadow-neo hover:bg-yellow-300 disabled:opacity-50 transition-all uppercase flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable w-max"
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

      {/* Prompt to connect coding profiles if none connected */}
      {!authLoading && !isGuest && user && !profile?.leetcodeUsername && !profile?.gfgUsername && (
        <section className="bg-white border-4 border-black p-6 shadow-neo rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black uppercase mb-1">🔥 Boost Your Dashboard!</h3>
              <p className="text-sm font-bold text-gray-700">
                Link your LeetCode and GeeksforGeeks profiles to track your real-time coding scores, total problems solved, and rankings directly on your dashboard.
              </p>
            </div>
            <Link
              href="/profile"
              className="bg-neoYellow border-4 border-black text-black font-black text-xs py-2.5 px-5 rounded-md shadow-neo hover:bg-yellow-300 transition-all uppercase whitespace-nowrap inline-block hover:-translate-y-0.5 neo-clickable"
            >
              Link Profiles Now
            </Link>
          </div>
        </section>
      )}

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
                                  <th className="py-2 px-3 w-24 text-center">Visual</th>
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

                                      {/* Visualizer play button */}
                                      <td className="py-3 px-3 text-center">
                                        <button
                                          onClick={() => setVisualizingProblem(problem)}
                                          className="px-3 py-1 bg-neoYellow border-2 border-black font-extrabold text-xs shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable cursor-pointer inline-block"
                                        >
                                          🎬 Play
                                        </button>
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
        </>
      ) : (
        <PracticeArena />
      )}

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

      {/* Visualizer Modal Overlay */}
      {visualizingProblem && (
        <VisualizerModal
          problem={visualizingProblem}
          onClose={() => setVisualizingProblem(null)}
        />
      )}

      {/* Toast Notification Overlays */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-[#FFFDEB] border-4 border-black p-4 shadow-neo rounded-xl flex items-center justify-between gap-3 animate-[slideIn_0.3s_ease-out]"
            style={{
              boxShadow: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
            }}
          >
            <span className="font-black text-sm text-black">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-gray-500 hover:text-black font-black text-xs shrink-0 cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

