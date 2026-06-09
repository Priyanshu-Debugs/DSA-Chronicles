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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  const isFirebaseAvailable = !!auth;

  useEffect(() => {
    const guest = localStorage.getItem("dsa_guest_mode") === "true";
    setIsGuest(guest);

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser && db) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setProfile({
              displayName: data.displayName || currentUser.email?.split("@")[0] || "User",
              leetcodeUsername: data.leetcodeUsername || "",
              gfgUsername: data.gfgUsername || "",
            });
          } else {
            setProfile({
              displayName: currentUser.email?.split("@")[0] || "User",
              leetcodeUsername: "",
              gfgUsername: "",
            });
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
      
      setLoading(false);
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
    await signInWithPopup(auth, provider);
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
