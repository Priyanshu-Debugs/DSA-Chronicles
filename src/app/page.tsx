"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, isGuest } = useAuth();

  // Terminal typing simulator lines
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const fullTerminalText = [
    "$ init dsa-chronicles",
    "Initializing streak board tracker... [OK]",
    "Connecting LeetCode profile... [CONNECTED]",
    "Connecting GeeksforGeeks profile... [CONNECTED]",
    "Analyzing weak topics: Arrays, Linked List...",
    "Generating customized sheets...",
    "$ ready_to_code_"
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullTerminalText.length) {
        const lineToAdd = fullTerminalText[currentLine];
        setTerminalLines(prev => [...prev, lineToAdd]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-neoCream grid-bg-animated overflow-hidden relative pb-16">

      {/* Landing Page Header */}
      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between relative z-20">
        {/* Branding Logo */}
        <div className="flex items-center gap-2 select-none">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 rounded border-2 border-black object-cover shadow-neo-sm transform -rotate-3 shrink-0"
          />
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase border-2 border-black px-2 py-0.5 bg-neoYellow shadow-neo-sm transform -rotate-1 text-black">
            DSA CHRONICLES
          </span>
        </div>

        {/* Login Option */}
        <div>
          {user || isGuest ? (
            <Link
              href="/dashboard"
              className="text-xs md:text-sm font-black uppercase border-2 border-black py-1.5 px-4 rounded bg-neoGreen shadow-neo-sm hover:translate-y-0.5 transition-all neo-clickable text-black"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-xs md:text-sm font-black uppercase border-2 border-black py-1.5 px-4 rounded bg-neoYellow shadow-neo-sm hover:translate-y-0.5 transition-all neo-clickable text-black"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </header>

      {/* Decorative Background SVG Elements */}
      <div className="absolute top-24 right-[10%] opacity-20 pointer-events-none animate-float-slow hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="10" y="10" width="100" height="100" stroke="black" strokeWidth="8" fill="#F472B6" />
          <line x1="10" y1="10" x2="110" y2="110" stroke="black" strokeWidth="8" />
        </svg>
      </div>
      <div className="absolute bottom-24 left-[5%] opacity-20 pointer-events-none animate-float-medium hidden lg:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="8" fill="#38BDF8" />
        </svg>
      </div>

      {/* Hero Section Container */}
      <div className="max-w-6xl mx-auto px-4 pt-6 md:pt-12 relative z-10 flex flex-col items-center text-center">

        {/* Pinned Sticky Notes - Absolutely Positioned on Large Screens, Inline Grid on Mobile */}
        <div className="w-full relative lg:h-[180px] mb-8 select-none">

          {/* Note 1: Yellow - Consistency */}
          <div className="lg:absolute lg:top-0 lg:left-0 w-full lg:w-[280px] bg-neoYellow border-4 border-black p-4 rounded-xl shadow-neo mb-6 lg:mb-0 transform rotate-[-4deg] transition-all duration-200 hover:scale-[1.05] hover:z-20">
            <div className="sticky-note-pin" />
            <h4 className="font-black text-sm uppercase text-black mb-1 flex items-center gap-1.5 justify-center">
              <span>🗝️ Consistency</span>
            </h4>
            <p className="text-xs font-bold text-gray-800 leading-tight">
              Maintain your streak board. Solve 1 problem every single day to form a long lasting coding habit!
            </p>
          </div>

          {/* Note 2: Pink - Real-time Sync */}
          <div className="lg:absolute lg:top-[-20px] lg:left-[35%] w-full lg:w-[280px] bg-neoPink border-4 border-black p-4 rounded-xl shadow-neo mb-6 lg:mb-0 transform rotate-[3deg] transition-all duration-200 hover:scale-[1.05] hover:z-20">
            <div className="sticky-note-pin" />
            <h4 className="font-black text-sm uppercase text-black mb-1 flex items-center gap-1.5 justify-center">
              <span>⚡ Real-Time Sync</span>
            </h4>
            <p className="text-xs font-bold text-gray-800 leading-tight">
              Directly integrates with LeetCode & GeeksforGeeks APIs. Watch your ranks and submissions update instantly.
            </p>
          </div>

          {/* Note 3: Blue - Built-in Notes */}
          <div className="lg:absolute lg:top-[10px] lg:right-0 w-full lg:w-[280px] bg-neoBlue border-4 border-black p-4 rounded-xl shadow-neo mb-6 lg:mb-0 transform rotate-[-2deg] transition-all duration-200 hover:scale-[1.05] hover:z-20">
            <div className="sticky-note-pin" />
            <h4 className="font-black text-sm uppercase text-black mb-1 flex items-center gap-1.5 justify-center">
              <span>📝 Smart Notes</span>
            </h4>
            <p className="text-xs font-bold text-gray-800 leading-tight">
              Keep custom Markdown notebooks attached to individual sheets so you can review key concepts anytime.
            </p>
          </div>

        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-black leading-none uppercase select-none mb-6">
          DSA <span className="bg-neoYellow border-4 border-black px-4 py-1 inline-block transform rotate-[-2deg] shadow-neo-md text-black">CHRONICLES</span>
        </h1>

        <p className="text-lg md:text-2xl font-extrabold text-black max-w-3xl mb-8 leading-snug border-b-4 border-black pb-4">
          Conquer the Striver A2Z sheet. Sync profile ranks from LeetCode & GeeksforGeeks. Write notes, visualise your streak board, and crush your coding interviews.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 relative z-20">
          <Link
            href="/dashboard"
            className="bg-neoGreen border-4 border-black text-black font-black uppercase py-4 px-8 text-xl rounded-xl shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all neo-clickable inline-block"
          >
            {user || isGuest ? "Go to Dashboard" : "Get Started Free"}
          </Link>
          <Link
            href="/patterns"
            className="bg-white border-4 border-black text-black font-black uppercase py-4 px-8 text-xl rounded-xl shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all neo-clickable inline-block"
          >
            Cheat Sheets
          </Link>
          <Link
            href="/aptitude"
            className="bg-neoPurple border-4 border-black text-black font-black uppercase py-4 px-8 text-xl rounded-xl shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all neo-clickable inline-block"
          >
            Aptitude
          </Link>
        </div>

        {/* Interactive Terminal Simulator & Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-stretch mt-4">

          {/* Terminal Simulator Box */}
          <div className="bg-[#1e1e1e] border-4 border-black rounded-xl shadow-neo p-5 text-left font-mono text-sm min-h-[300px] flex flex-col justify-between relative overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-neoRed border border-black" />
                <div className="w-3.5 h-3.5 rounded-full bg-neoYellow border border-black" />
                <div className="w-3.5 h-3.5 rounded-full bg-neoGreen border border-black" />
              </div>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">striver-agent-terminal</span>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 space-y-2 text-[#a9b1d6]">
              {terminalLines.map((line, idx) => {
                if (!line) return null;
                const isCode = line.startsWith("$");
                const isHighlight = line.includes("🔥") || line.includes("[CONNECTED]");
                return (
                  <div key={idx} className="leading-relaxed">
                    <span className={isCode ? "text-neoYellow font-black" : isHighlight ? "text-neoGreen font-bold" : "text-gray-300"}>
                      {line}
                    </span>
                    {idx === terminalLines.length - 1 && isCode && (
                      <span className="terminal-cursor" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Terminal Footer */}
            <div className="mt-4 pt-2 border-t border-gray-800 text-right">
              <span className="text-[10px] text-gray-600 font-bold uppercase">System: Online</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="bg-neoPurple border-4 border-black rounded-xl p-6 shadow-neo flex flex-col justify-between text-left text-black relative">
            <div>
              <div className="bg-black text-neoPurple px-3 py-1 font-black transform -rotate-1 border-2 border-black text-xs uppercase w-max mb-4">
                PLATFORM CAPABILITIES
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 leading-tight">
                Dual Platform Statistics Integration
              </h3>
              <p className="text-md font-bold mb-6 opacity-90 leading-snug">
                Track your active solved counts and score milestones from both leading portals directly in a single hub. No manual tracking, no spreadsheets needed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border-2 border-black p-3.5 rounded-lg shadow-neo-sm transform -rotate-1">
                <span className="text-2xl font-black block text-black">LeetCode</span>
                <span className="text-xs font-bold text-gray-500 block uppercase">10+ Recent Solves</span>
              </div>
              <div className="bg-white border-2 border-black p-3.5 rounded-lg shadow-neo-sm transform rotate-1">
                <span className="text-2xl font-black block text-neoGreen">GeeksforGeeks</span>
                <span className="text-xs font-bold text-gray-500 block uppercase">Ranks & Score Updates</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
