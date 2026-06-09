"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "@/lib/firebase";

export interface UserProfile {
  displayName?: string;
  leetcodeUsername?: string;
  gfgUsername?: string;
  syncToken?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (newProfile: UserProfile) => Promise<void>;
  isFirebaseAvailable: boolean;
  isGuest: boolean;
  continueAsGuest: () => void;
  redirectError: string | null;
  clearRedirectError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(() => !!auth);
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dsa_guest_mode") === "true";
    }
    return false;
  });
  const [redirectError, setRedirectError] = useState<string | null>(null);

  const isFirebaseAvailable = !!auth;

  const clearRedirectError = () => setRedirectError(null);

  useEffect(() => {
    if (!auth) return;

    let redirectChecking = true;
    let authStateReceived = false;

    const finalizeLoading = () => {
      if (!redirectChecking && authStateReceived) {
        setLoading(false);
      }
    };

    // Capture and handle redirect login results before removing loading overlay
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("Google redirect sign-in completed successfully:", result.user);
        }
      })
      .catch((err) => {
        console.error("Firebase redirect sign-in error:", err);
        setRedirectError(err.message || "Authentication redirect failed.");
      })
      .finally(() => {
        redirectChecking = false;
        finalizeLoading();
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser && db) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          let token = "";
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            token = data.syncToken;
            
            if (!token) {
              token = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
              await setDoc(userDocRef, { syncToken: token }, { merge: true });
            }
            
            setProfile({
              displayName: data.displayName || currentUser.email?.split("@")[0] || "User",
              leetcodeUsername: data.leetcodeUsername || "",
              gfgUsername: data.gfgUsername || "",
              syncToken: token,
            });
          } else {
            token = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
            const defaultProfile = {
              displayName: currentUser.email?.split("@")[0] || "User",
              leetcodeUsername: "",
              gfgUsername: "",
              syncToken: token,
            };
            await setDoc(userDocRef, defaultProfile);
            setProfile(defaultProfile);
          }
        } catch (err) {
          console.error("Error loading profile from Firestore:", err);
          setProfile({
            displayName: currentUser.email?.split("@")[0] || "User",
            leetcodeUsername: "",
            gfgUsername: "",
          });
        }
      } else {
        setProfile(null);
      }
      
      authStateReceived = true;
      finalizeLoading();
    });

    return () => unsubscribe();
  }, []);

  const continueAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem("dsa_guest_mode", "true");
  };

  const clearGuest = () => {
    setIsGuest(false);
    localStorage.removeItem("dsa_guest_mode");
  };

  const signInWithGoogle = async () => {
    if (!auth) throw new Error("Firebase auth is not configured.");
    clearGuest();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "auth/popup-blocked") {
        console.warn("Popup blocked, falling back to redirect authentication...");
        await signInWithRedirect(auth, provider);
      } else {
        throw err;
      }
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (!auth) throw new Error("Firebase auth is not configured.");
    clearGuest();
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    if (!auth) throw new Error("Firebase auth is not configured.");
    clearGuest();
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    clearGuest();
    setProfile(null);
    if (!auth) return;
    await signOut(auth);
  };

  const updateProfile = async (newProfile: UserProfile) => {
    if (!user || !db) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, newProfile, { merge: true });
      setProfile((prev) => ({
        ...prev,
        ...newProfile,
      }));
    } catch (err) {
      console.error("Error updating profile in Firestore:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        updateProfile,
        isFirebaseAvailable,
        isGuest,
        continueAsGuest,
        redirectError,
        clearRedirectError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
