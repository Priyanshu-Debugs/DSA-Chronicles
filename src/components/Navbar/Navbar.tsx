"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  name: string;
  href: string;
  color: string;
}

const navItems: NavItem[] = [
  { name: "All", href: "/dashboard", color: "bg-white" },
  { name: "Sandbox", href: "/visualizer-sandbox", color: "bg-neoYellow" },
  { name: "Arrays", href: "/arrays", color: "bg-neoPink" },
  { name: "Binary Search", href: "/binary-search", color: "bg-neoBlue" },
  { name: "Strings", href: "/strings", color: "bg-neoYellow" },
  { name: "Linked List", href: "/linked-list", color: "bg-neoGreen" },
  { name: "Recursion", href: "/recursion", color: "bg-neoPurple" },
  { name: "Two Pointers", href: "/two-pointers", color: "bg-neoRed" },
  { name: "Bit Manipulation", href: "/bit-manipulation", color: "bg-neoYellow" },
  { name: "Stack & Queue", href: "/stack-n-queue", color: "bg-neoGreen" },
  { name: "Heaps", href: "/heaps", color: "bg-neoPink" },
  { name: "Greedy", href: "/greedy", color: "bg-neoBlue" },
  { name: "Binary Tree", href: "/binary-tree", color: "bg-neoPurple" },
  { name: "Binary Search Tree", href: "/binary-search-tree", color: "bg-neoRed" },
  { name: "Graphs", href: "/graphs", color: "bg-neoYellow" },
  { name: "DP", href: "/dp", color: "bg-neoGreen" },
  { name: "Tries", href: "/tries", color: "bg-neoPink" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, profile, logout, loading, isFirebaseAvailable } = useAuth();

  if (pathname === "/" || pathname === "/login" || pathname.startsWith("/aptitude")) return null;

  return (
    <nav className="bg-white border-b-4 border-black sticky top-0 z-40 select-none">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Branding Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 -ml-1.5 md:-ml-2.5 select-none">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 rounded border-2 border-black object-cover shadow-neo-sm transform -rotate-3 shrink-0"
          />
          <span className="text-2xl font-black tracking-tighter uppercase border-2 border-black px-2 py-0.5 bg-neoYellow shadow-neo-sm transform -rotate-1 text-black">
            DSA CHRONICLES
          </span>
        </Link>

        {/* Scrollable Navigation List & Auth controls */}
        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto min-w-0">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-custom pb-2 min-w-0 flex-1 md:flex-initial">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 text-xs md:text-sm font-black uppercase border-2 border-black py-1.5 px-3 rounded shadow-neo-sm transition-all neo-clickable select-none text-black ${
                    isActive
                      ? `${item.color} translate-x-[1px] translate-y-[1px] shadow-none`
                      : "bg-white hover:bg-stone-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Controls */}
          {isFirebaseAvailable && !loading && (
            <div className="flex items-center space-x-2 border-l-2 border-black pl-3 shrink-0">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-1.5 text-xs font-black uppercase text-black border-2 border-black px-2.5 py-1 bg-neoYellow shadow-neo-sm hover:-translate-y-0.5 neo-clickable"
                    title="View Profile"
                  >
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full border border-black object-cover shrink-0"
                      />
                    )}
                    <span className="hidden sm:inline-block max-w-[100px] truncate">
                      {profile?.displayName || user.email?.split("@")[0] || "Profile"}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="shrink-0 text-xs font-black uppercase border-2 border-black py-1.5 px-3 rounded bg-neoRed shadow-neo-sm hover:bg-red-300 transition-all neo-clickable cursor-pointer text-black"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="shrink-0 text-xs font-black uppercase border-2 border-black py-1.5 px-3 rounded bg-neoGreen shadow-neo-sm hover:bg-green-300 transition-all neo-clickable text-black"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
