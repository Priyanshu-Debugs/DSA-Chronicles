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
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Redirect to login if user is not authenticated and hasn't chosen guest mode
  useEffect(() => {
    if (!loading && !user && !isGuest) {
      router.push("/login");
    }
  }, [user, loading, isGuest, router]);

  // Load initial form values from profile state
  useEffect(() => {
    if (profile) {
      setName(profile.displayName || "");
      setLeetcodeUser(profile.leetcodeUsername || "");
      setGfgUser(profile.gfgUsername || "");
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
      });
      setMessage({ text: "Profile settings saved successfully!", isError: false });
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
      // 1. Build LeetCode URL slug map matching all a2z problems
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

      // 2. Fetch accepted submissions from the public LeetCode API endpoint
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

      // 3. Load user's current solved map from Firestore
      if (!db || !user) return;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const currentSolvedMap = userDocSnap.exists()
        ? userDocSnap.data().solvedMap || {}
        : {};

      // 4. Match and merge submissions
      const newSolvedMap = { ...currentSolvedMap };
      let countMatched = 0;

      submissions.forEach((sub: any) => {
        const problemId = slugToIdMap[sub.titleSlug];
        if (problemId) {
          // Update only if not already solved, or to sync date
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

      // 5. Write merged progress back to database
      await setDoc(userDocRef, { solvedMap: newSolvedMap }, { merge: true });

      setMessage({
        text: `Sync completed successfully! Processed ${submissions.length} submissions and auto-solved ${countMatched} new problems.`,
        isError: false,
      });
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Sync failed. Please verify your username or try again later.",
        isError: true,
      });
    } finally {
      setSyncing(false);
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
          <div className="w-20 h-20 bg-white text-black border-4 border-black rounded-full flex items-center justify-center font-black text-4xl shadow-neo mb-4 select-none">
            {name ? name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
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
              disabled={isGuest || saving || syncing}
              className="px-6 py-2.5 bg-neoGreen border-2 border-black font-black uppercase text-sm shadow-neo-sm hover:bg-green-300 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 text-black"
            >
              {saving ? "SAVING..." : "SAVE PROFILE"}
            </button>
          </form>

          {/* Sync Integrations Box */}
          {!isGuest && profile?.leetcodeUsername && (
            <div className="bg-neoBlue border-4 border-black p-6 rounded-xl shadow-neo space-y-4 mt-8">
              <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2 text-black">
                Platform Integrations
              </h3>
              <p className="text-xs font-black text-black leading-relaxed">
                Connect and sync solved items from LeetCode. Clicking sync pulls your last **100 accepted submissions** using the public LeetCode API and automatically updates your solved statuses below.
              </p>
              <button
                type="button"
                onClick={handleLeetCodeSync}
                disabled={syncing || saving}
                className="w-full py-3 bg-white border-2 border-black font-black uppercase text-xs shadow-neo-sm hover:bg-gray-50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-black"
              >
                {syncing ? "SYNCING LEETCODE..." : "SYNC SOLVED LEETCODE PROBLEMS"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
