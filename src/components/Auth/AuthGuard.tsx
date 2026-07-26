"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isGuest } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const isPublicPath = pathname === "/" || pathname === "/login" || pathname.startsWith("/notes/sql");
      if (!user && !isGuest && !isPublicPath) {
        router.push("/login");
      }
    }
  }, [user, loading, isGuest, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neoCream">
        <div className="bg-neoYellow border-4 border-black p-6 font-black uppercase shadow-neo text-lg">
          LOADING ACCESS...
        </div>
      </div>
    );
  }

  const isPublicPath = pathname === "/" || pathname === "/login" || pathname.startsWith("/notes/sql");
  if (!user && !isGuest && !isPublicPath) {
    return null; // Prevent flash of restricted pages before redirect
  }

  return <>{children}</>;
}
