"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db, doc, getDoc, setDoc } from "@/lib/firebase";
import { a2zDsaSheetData } from "@/data/a2zDsaSheet";

export default function ProfilePage() {
  const { user, profile, loading, updateProfile, isGuest } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [leetcodeUser, setLeetcodeUser] = useState("");
  const [gfgUser, setGfgUser] = useState("");

  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [gfgSyncing, setGfgSyncing] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const [siteOrigin] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "http://localhost:3000";
  });
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  // GFG stats fetched from tashif codes API
  const [gfgStats, setGfgStats] = useState<{
    fullName?: string;
    profilePicture?: string;
    institute?: string;
    instituteRank?: string;
    codingScore?: number;
    totalProblemsSolved?: number;
  } | null>(null);
  const [loadingGfgStats, setLoadingGfgStats] = useState(false);

  // Redirect to login if user is not authenticated and hasn't chosen guest mode
  useEffect(() => {
    if (!loading && !user && !isGuest) {
      router.push("/login");
    }
  }, [user, loading, isGuest, router]);

  const fetchGfgStats = async (username: string) => {
    if (!username) return;
    setLoadingGfgStats(true);
    try {
      const res = await fetch(`https://gfg-stats.tashif.codes/${username}/profile`);
      if (res.ok) {
        const data = await res.json();
        setGfgStats(data);
      } else {
        setGfgStats(null);
      }
    } catch (err) {
      console.error("Failed to fetch GFG stats:", err);
      setGfgStats(null);
    } finally {
      setLoadingGfgStats(false);
    }
  };

  // Load initial form values from profile state
  useEffect(() => {
    if (profile) {
      const timer = setTimeout(() => {
        setName(profile.displayName || "");
        setLeetcodeUser(profile.leetcodeUsername || "");
        setGfgUser(profile.gfgUsername || "");
        
        if (profile.gfgUsername) {
          fetchGfgStats(profile.gfgUsername);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neoCream">
        <div className="bg-neoYellow border-4 border-black p-6 font-black uppercase shadow-neo text-lg">
          LOADING PROFILE...
        </div>
      </div>
    );
  }

  // Helper to extract LeetCode slug from problem URL
  const getLeetCodeSlug = (url?: string) => {
    if (!url) return null;
    const parts = url.split("/problems/");
    if (parts.length > 1) {
      return parts[1].split("/")[0];
    }
    return null;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuest) {
      setMessage({ text: "Profile updates are disabled in Guest Mode.", isError: true });
      return;
    }
    setMessage(null);
    setSaving(true);

    try {
      await updateProfile({
        displayName: name,
        leetcodeUsername: leetcodeUser,
        gfgUsername: gfgUser,
        syncToken: profile?.syncToken || "",
      });
      setMessage({ text: "Profile settings saved successfully!", isError: false });
      if (gfgUser) {
        fetchGfgStats(gfgUser);
      } else {
        setGfgStats(null);
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to save profile. Please try again.", isError: true });
    } finally {
      setSaving(false);
    }
  };

  const handleLeetCodeSync = async () => {
    if (isGuest) {
      setMessage({ text: "Sync is disabled in Guest Mode.", isError: true });
      return;
    }
    if (!leetcodeUser) {
      setMessage({ text: "Please enter and save your LeetCode username first.", isError: true });
      return;
    }

    setMessage(null);
    setSyncing(true);

    try {
      const slugToIdMap: Record<string, string> = {};
      a2zDsaSheetData.forEach((step) => {
        step.lessons.forEach((l) => {
          l.topics.forEach((t) => {
            t.problems.forEach((p) => {
              const slug = getLeetCodeSlug(p.leetcodeUrl);
              if (slug) {
                slugToIdMap[slug] = p.id;
              }
            });
          });
        });
      });

      const response = await fetch(
        `https://alfa-leetcode-api.onrender.com/${leetcodeUser}/acSubmission?limit=100`
      );
      if (!response.ok) {
        throw new Error("Failed to contact LeetCode proxy API");
      }

      const data = await response.json();
      const submissions = data.submission || [];

      if (!submissions.length) {
        setMessage({
          text: `No accepted submissions found for '${leetcodeUser}'. Ensure your LeetCode profile is set to public.`,
          isError: true,
        });
        setSyncing(false);
        return;
      }

      if (!db || !user) return;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const currentSolvedMap = userDocSnap.exists()
        ? userDocSnap.data().solvedMap || {}
        : {};

      const newSolvedMap = { ...currentSolvedMap };
      let countMatched = 0;

      submissions.forEach((sub: { titleSlug: string; timestamp: string }) => {
        const problemId = slugToIdMap[sub.titleSlug];
        if (problemId) {
          if (!newSolvedMap[problemId]?.solved) {
            const timestampMs = parseInt(sub.timestamp) * 1000;
            const dateStr = new Date(timestampMs).toISOString().split("T")[0];
            newSolvedMap[problemId] = {
              solved: true,
              date: dateStr,
            };
            countMatched++;
          }
        }
      });

      await setDoc(userDocRef, { solvedMap: newSolvedMap }, { merge: true });

      setMessage({
        text: `LeetCode Sync completed successfully! Processed ${submissions.length} submissions and auto-solved ${countMatched} new problems.`,
        isError: false,
      });
    } catch (err) {
      console.error(err);
      setMessage({
        text: "LeetCode Sync failed. Please verify your username or try again later.",
        isError: true,
      });
    } finally {
      setSyncing(false);
    }
  };

  const handleGfgSync = async () => {
    if (isGuest) {
      setMessage({ text: "Sync is disabled in Guest Mode.", isError: true });
      return;
    }
    if (!gfgUser) {
      setMessage({ text: "Please enter and save your GeeksforGeeks username first.", isError: true });
      return;
    }

    setMessage(null);
    setGfgSyncing(true);

    try {
      const slugToIdMap: Record<string, string> = {};
      
      const cleanSlug = (url?: string) => {
        if (!url) return null;
        const parts = url.toLowerCase().split("/problems/");
        if (parts.length > 1) {
          return parts[1].split("/")[0].trim();
        }
        return null;
      };

      a2zDsaSheetData.forEach((step) => {
        step.lessons.forEach((l) => {
          l.topics.forEach((t) => {
            t.problems.forEach((p) => {
              const slug = cleanSlug(p.gfgUrl);
              if (slug) {
                slugToIdMap[slug] = p.id;
              }
            });
          });
        });
      });

      const response = await fetch(`https://gfg-stats.tashif.codes/${gfgUser}/solved-problems`);
      if (!response.ok) {
        throw new Error("Failed to contact GFG solved problems API");
      }

      const data = await response.json();
      const solvedProblemsList = data.problems || [];

      if (!solvedProblemsList.length) {
        setMessage({
          text: `No solved problems found for '${gfgUser}'. Ensure your GeeksforGeeks profile is set to public.`,
          isError: true,
        });
        setGfgSyncing(false);
        return;
      }

      if (!db || !user) return;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const currentSolvedMap = userDocSnap.exists()
        ? userDocSnap.data().solvedMap || {}
        : {};

      const newSolvedMap = { ...currentSolvedMap };
      let countMatched = 0;
      const dateStr = new Date().toISOString().split("T")[0];

      solvedProblemsList.forEach((prob: { questionUrl: string }) => {
        const urlSlug = cleanSlug(prob.questionUrl);
        if (urlSlug) {
          const problemId = slugToIdMap[urlSlug];
          if (problemId) {
            if (!newSolvedMap[problemId]?.solved) {
              newSolvedMap[problemId] = {
                solved: true,
                date: dateStr,
              };
              countMatched++;
            }
          }
        }
      });

      await setDoc(userDocRef, { solvedMap: newSolvedMap }, { merge: true });

      setMessage({
        text: `GFG Sync completed successfully! Processed ${solvedProblemsList.length} solved problems and auto-solved ${countMatched} new problems.`,
        isError: false,
      });

      fetchGfgStats(gfgUser);
    } catch (err) {
      console.error(err);
      setMessage({
        text: "GeeksforGeeks Sync failed. Please verify your username or try again later.",
        isError: true,
      });
    } finally {
      setGfgSyncing(false);
    }
  };

  const userscriptCode = `// ==UserScript==
// @name         DSA Chronicles Real-time Sync
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Syncs LeetCode and GeeksforGeeks solved problems to your DSA Chronicles Tracker in real-time.
// @author       Priyanshu
// @match        https://leetcode.com/problems/*
// @match        https://*.geeksforgeeks.org/problems/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// @connect      *
// ==/UserScript==

(function() {
    'use strict';

    const SYNC_TOKEN = "${profile?.syncToken || "YOUR_SECRET_TOKEN"}";
    const API_URL = "${siteOrigin}/api/sync-submission";

    console.log("[DSA Chronicles] Script loaded successfully!");

    function syncSubmission(platform, slug) {
        console.log("[DSA Chronicles] Syncing " + platform + " problem: " + slug + "...");
        GM_xmlhttpRequest({
            method: "POST",
            url: API_URL,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                syncToken: SYNC_TOKEN,
                platform: platform,
                slug: slug
            }),
            onload: function(response) {
                try {
                    const res = JSON.parse(response.responseText);
                    if (res.success) {
                        console.log("[DSA Chronicles] Successfully synced: " + slug + "!");
                    } else {
                        console.error("[DSA Chronicles] Sync failed: ", res.error);
                    }
                } catch (e) {
                    console.error("[DSA Chronicles] Failed to parse sync response.");
                }
            },
            onerror: function(err) {
                console.error("[DSA Chronicles] Network error during sync: ", err);
            }
        });
    }

    const win = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;

    if (win.location.host.includes("leetcode.com")) {
        // 1. Intercept fetch (used by modern LeetCode)
        const originalFetch = win.fetch;
        win.fetch = function(...args) {
            const request = args[0];
            let url = "";
            if (typeof request === "string") {
                url = request;
            } else if (typeof win.URL === "function" && request instanceof win.URL) {
                url = request.href;
            } else if (request && typeof request === "object" && request.url) {
                url = request.url;
            }

            if (url && url.includes("/submissions/detail/") && url.includes("/check/")) {
                return originalFetch.apply(this, args).then(async (response) => {
                    try {
                        const clonedResponse = response.clone();
                        const data = await clonedResponse.json();
                        if (data && data.status_msg === "Accepted") {
                            const pathParts = win.location.pathname.split("/problems/");
                            if (pathParts.length > 1) {
                                const slug = pathParts[1].split("/")[0];
                                syncSubmission("leetcode", slug);
                            }
                        }
                    } catch (e) {
                        console.error("[DSA Chronicles] Fetch parsing error:", e);
                    }
                    return response;
                });
            }
            return originalFetch.apply(this, args);
        };

        // 2. Intercept XMLHttpRequest (fallback)
        const originOpen = win.XMLHttpRequest.prototype.open;
        win.XMLHttpRequest.prototype.open = function(...args) {
            this.addEventListener('load', function() {
                if (this.responseURL && this.responseURL.includes("/submissions/detail/") && this.responseURL.includes("/check/")) {
                    try {
                        const data = JSON.parse(this.responseText);
                        if (data.status_msg === "Accepted") {
                            const pathParts = win.location.pathname.split("/problems/");
                            if (pathParts.length > 1) {
                                const slug = pathParts[1].split("/")[0];
                                syncSubmission("leetcode", slug);
                            }
                        }
                    } catch (e) {}
                }
            });
            return originOpen.apply(this, args);
        };
    }

    if (win.location.host.includes("geeksforgeeks.org")) {
        const observer = new MutationObserver(() => {
            const solvedElement = document.querySelector(".quantum-alert-success") || 
                                 document.querySelector(".problems_correct_ans__") || 
                                 document.querySelector(".success-alert") ||
                                 Array.from(document.querySelectorAll("div")).find(el => el.textContent.toLowerCase().includes("problem solved successfully"));
            
            if (solvedElement) {
                const pathParts = win.location.pathname.split("/problems/");
                if (pathParts.length > 1) {
                    const slug = pathParts[1].split("/")[0];
                    const solvedKey = "dsa_synced_" + slug;
                    if (!win[solvedKey]) {
                        win[solvedKey] = true;
                        syncSubmission("gfg", slug);
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
})();`;

  const copyToClipboard = (text: string, isScript = false) => {
    navigator.clipboard.writeText(text);
    if (isScript) {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } else {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header */}
      <header className="bg-neoYellow border-4 border-black p-6 md:p-8 shadow-neo rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase mb-2">USER PROFILE</h1>
          <p className="font-bold border-t-2 border-black pt-2 max-w-xl text-sm md:text-base">
            Configure profile names, link coding platforms, and synchronize problem sets.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-block bg-white border-4 border-black font-black text-sm md:text-base py-3 px-6 rounded-lg shadow-neo neo-clickable uppercase hover:-translate-y-0.5 text-black"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Guest Mode Notice */}
      {isGuest && (
        <div className="bg-neoPink border-4 border-black p-4 rounded-xl shadow-neo">
          <span className="bg-black text-white px-2 py-0.5 text-xs font-black uppercase rounded mb-1.5 inline-block">
            GUEST STATUS
          </span>
          <p className="text-sm font-black text-black">
            You are browsing as a guest. Connecting profiles and syncing progress require registering and logging in with a Firebase account.
          </p>
          <Link
            href="/login"
            className="mt-3 inline-block bg-white border-2 border-black px-4 py-1.5 text-xs font-black uppercase shadow-neo-sm neo-clickable text-black"
          >
            Go to Sign In
          </Link>
        </div>
      )}

      {/* Form Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Card Summary */}
        <div className="bg-neoPurple border-4 border-black p-6 rounded-xl shadow-neo text-white flex flex-col items-center text-center">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Google Profile"
              referrerPolicy="no-referrer"
              className="w-20 h-20 border-4 border-black rounded-full shadow-neo mb-4 object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-white text-black border-4 border-black rounded-full flex items-center justify-center font-black text-4xl shadow-neo mb-4 select-none">
              {name ? name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <h3 className="text-2xl font-black uppercase truncate max-w-full">
            {name || "Guest Coder"}
          </h3>
          <p className="text-xs font-bold uppercase tracking-wider text-purple-200 mt-1 mb-4 truncate max-w-full">
            {user?.email || "Local Storage Browser"}
          </p>

          <div className="w-full bg-white text-black border-2 border-black p-3.5 rounded-lg text-left text-xs font-bold space-y-2 mt-2">
            <div>
              <span className="text-gray-400 block text-[9px] uppercase font-black">LeetCode Connected</span>
              <span className="truncate block font-extrabold">
                {leetcodeUser ? (
                  <a
                    href={`https://leetcode.com/u/${leetcodeUser}`}
                    target="_blank"
                    className="underline hover:text-neoBlue"
                  >
                    {leetcodeUser}
                  </a>
                ) : (
                  "Not Connected"
                )}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px] uppercase font-black">GeeksforGeeks Connected</span>
              <span className="truncate block font-extrabold">
                {gfgUser ? (
                  <a
                    href={`https://www.geeksforgeeks.org/user/${gfgUser}`}
                    target="_blank"
                    className="underline hover:text-neoGreen"
                  >
                    {gfgUser}
                  </a>
                ) : (
                  "Not Connected"
                )}
              </span>
            </div>
            {gfgStats && (
              <div className="pt-2 border-t-2 border-dashed border-gray-200 space-y-1">
                <span className="text-gray-400 block text-[9px] uppercase font-black">GFG Profile Card Details</span>
                {gfgStats.profilePicture && (
                  <img
                    src={gfgStats.profilePicture}
                    alt="GFG profile"
                    className="w-10 h-10 border-2 border-black rounded-md mb-2 object-cover"
                  />
                )}
                <div><span className="text-[10px] text-gray-500 uppercase">Rank:</span> <span className="font-extrabold">{gfgStats.instituteRank || "N/A"}</span></div>
                <div><span className="text-[10px] text-gray-500 uppercase">Score:</span> <span className="font-extrabold">{gfgStats.codingScore || "0"}</span></div>
                <div><span className="text-[10px] text-gray-500 uppercase">Solved:</span> <span className="font-extrabold">{gfgStats.totalProblemsSolved || "0"}</span></div>
                {gfgStats.institute && (
                  <div className="text-[9px] text-gray-500 leading-tight mt-1 truncate max-w-full">
                    {gfgStats.institute}
                  </div>
                )}
              </div>
            )}
            {loadingGfgStats && (
              <div className="text-[10px] text-gray-400 font-extrabold uppercase animate-pulse">
                Loading GFG stats...
              </div>
            )}
          </div>
        </div>

        {/* Edit Form Fields */}
        <div className="bg-white border-4 border-black p-6 md:p-8 rounded-xl shadow-neo lg:col-span-2 space-y-6">
          {message && (
            <div
              className={`border-2 border-black p-4 rounded-lg text-xs font-black uppercase shadow-neo-sm ${
                message.isError ? "bg-neoRed text-black" : "bg-neoGreen text-black"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <h2 className="text-2xl font-black uppercase border-b-2 border-black pb-2 mb-4">
              Profile Settings
            </h2>

            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-700">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priyanshu"
                disabled={isGuest || saving}
                className="w-full bg-white border-2 border-black p-2.5 rounded-md font-bold text-sm outline-none focus:bg-yellow-50 focus:shadow-neo-sm transition-all text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase mb-1 text-gray-700">
                  LeetCode Username
                </label>
                <input
                  type="text"
                  value={leetcodeUser}
                  onChange={(e) => setLeetcodeUser(e.target.value)}
                  placeholder="e.g. leetcode_coder"
                  disabled={isGuest || saving}
                  className="w-full bg-white border-2 border-black p-2.5 rounded-md font-bold text-sm outline-none focus:bg-yellow-50 focus:shadow-neo-sm transition-all text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1 text-gray-700">
                  GFG Username
                </label>
                <input
                  type="text"
                  value={gfgUser}
                  onChange={(e) => setGfgUser(e.target.value)}
                  placeholder="e.g. gfg_username"
                  disabled={isGuest || saving}
                  className="w-full bg-white border-2 border-black p-2.5 rounded-md font-bold text-sm outline-none focus:bg-yellow-50 focus:shadow-neo-sm transition-all text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isGuest || saving || syncing || gfgSyncing}
              className="px-6 py-2.5 bg-neoGreen border-2 border-black font-black uppercase text-sm shadow-neo-sm hover:bg-green-300 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 text-black"
            >
              {saving ? "SAVING..." : "SAVE PROFILE"}
            </button>
          </form>

          {/* Sync Integrations Box */}
          {!isGuest && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-black">
              {profile?.leetcodeUsername && (
                <div className="bg-neoBlue border-4 border-black p-4 rounded-xl shadow-neo space-y-3">
                  <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded">LeetCode Integration</span>
                  <p className="text-[10px] font-bold text-black leading-relaxed">
                    Import your solved problems directly. Pulls your last 100 accepted submissions and updates the tracker.
                  </p>
                  <button
                    type="button"
                    onClick={handleLeetCodeSync}
                    disabled={syncing || saving || gfgSyncing}
                    className="w-full py-2 bg-white border-2 border-black font-black uppercase text-[10px] shadow-neo-sm hover:bg-gray-50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-black"
                  >
                    {syncing ? "SYNCING LEETCODE..." : "SYNC LEETCODE"}
                  </button>
                </div>
              )}

              {profile?.gfgUsername && (
                <div className="bg-neoGreen border-4 border-black p-4 rounded-xl shadow-neo space-y-3">
                  <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded">GeeksforGeeks Integration</span>
                  <p className="text-[10px] font-bold text-black leading-relaxed">
                    Import your solved problems directly. Pulls all accepted submissions from GFG Stats API and updates the tracker.
                  </p>
                  <button
                    type="button"
                    onClick={handleGfgSync}
                    disabled={gfgSyncing || saving || syncing}
                    className="w-full py-2 bg-white border-2 border-black font-black uppercase text-[10px] shadow-neo-sm hover:bg-gray-50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-black"
                  >
                    {gfgSyncing ? "SYNCING GFG..." : "SYNC GEEKSFORGEEKS"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Real-time sync instructions */}
          {!isGuest && profile?.syncToken && (
            <div className="bg-neoPink border-4 border-black p-6 rounded-xl shadow-neo space-y-4 mt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b-2 border-black pb-2">
                <h3 className="text-xl font-black uppercase text-black">
                  Real-time Sync Settings
                </h3>
                <div className="flex items-center gap-2 bg-white border-2 border-black p-1.5 rounded-lg shadow-neo-sm text-xs font-bold text-black">
                  <span className="font-mono">{profile.syncToken}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(profile.syncToken || "")}
                    className="bg-neoYellow border border-black px-2 py-1 text-[10px] uppercase font-black rounded cursor-pointer"
                  >
                    {copiedToken ? "COPIED" : "COPY"}
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs font-bold text-black leading-relaxed">
                <p>
                  Submit questions on LeetCode or GeeksforGeeks and have them automatically checked off on this dashboard in real-time!
                </p>
                <h4 className="font-black uppercase text-sm mt-3">Instructions:</h4>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Install a browser extension that runs userscripts, such as **Tampermonkey** or **Violentmonkey**.</li>
                  <li>Create a new userscript inside the extension.</li>
                  <li>Copy the script template below and paste it into the editor. Save the script.</li>
                  <li>Done! When you successfully submit any question on LeetCode or GFG, the script will push it immediately.</li>
                </ol>
              </div>

              <div className="relative border-2 border-black rounded-lg overflow-hidden bg-gray-900 mt-2">
                <div className="bg-gray-800 text-white font-mono px-4 py-2 text-xs font-bold border-b-2 border-black flex justify-between items-center">
                  <span>Tampermonkey Userscript</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(userscriptCode, true)}
                    className="bg-neoGreen text-black border-2 border-black px-3 py-1 text-[10px] uppercase font-black rounded cursor-pointer hover:bg-green-300"
                  >
                    {copiedScript ? "COPIED SCRIPT!" : "COPY USERSCRIPT"}
                  </button>
                </div>
                <pre className="p-4 text-[10px] font-mono text-green-400 overflow-x-auto max-h-60">
                  <code>{userscriptCode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
