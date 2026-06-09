"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    isFirebaseAvailable,
    continueAsGuest,
    redirectError,
    clearRedirectError,
  } = useAuth();
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // Set the error message if a redirect error occurred
  useEffect(() => {
    if (redirectError) {
      const err = redirectError;
      const timer = setTimeout(() => {
        setErrorMsg(err);
        clearRedirectError();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [redirectError, clearRedirectError]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neoCream">
        <div className="bg-neoYellow border-4 border-black p-6 font-black uppercase shadow-neo text-lg">
          LOADING ACCESS...
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    setErrorMsg("");
    setSubmitting(true);

    try {
      if (isRegistering) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      router.push("/");
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error(error);
      let message = error.message || "An authentication error occurred.";
      if (
        message.includes("auth/invalid-credential") ||
        message.includes("auth/wrong-password")
      ) {
        message = "Invalid email or password.";
      } else if (message.includes("auth/email-already-in-use")) {
        message = "Email is already registered.";
      } else if (message.includes("auth/weak-password")) {
        message = "Password must be at least 6 characters.";
      } else if (message.includes("auth/invalid-email")) {
        message = "Please enter a valid email address.";
      }
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err: unknown) {
      console.error(err);
      const error = err as { code?: string; message?: string };
      if (error.code !== "auth/popup-closed-by-user") {
        setErrorMsg(error.message || "Google Sign-In failed.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuestMode = () => {
    continueAsGuest();
    router.push("/");
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black p-6 md:p-8 w-full max-w-md rounded-2xl shadow-neo relative overflow-hidden">
        {/* Decorative background tag */}
        <div className="absolute top-0 right-0 bg-neoPink border-b-2 border-l-2 border-black px-4 py-1 text-xs font-black uppercase select-none">
          {isRegistering ? "Register" : "Login"}
        </div>

        {/* Title & Logo Header */}
        <div className="flex items-center gap-3 mb-2 mt-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-lg border-2 border-black object-cover shadow-neo-sm transform -rotate-3 shrink-0"
          />
          <h2 className="text-3xl font-black uppercase tracking-tight">
            {isRegistering ? "CREATE ACCOUNT" : "SIGN IN"}
          </h2>
        </div>
        <p className="text-xs font-bold text-gray-500 uppercase mb-6 tracking-wide">
          Sync notes and progress across all your devices
        </p>

        {/* Firebase Config warning banner */}
        {!isFirebaseAvailable && (
          <div className="bg-neoYellow border-2 border-black p-3.5 rounded-lg mb-6 shadow-neo-sm">
            <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded block w-max mb-1.5">
              Warning
            </span>
            <p className="text-xs font-black text-black leading-relaxed">
              Firebase is not configured yet! Running in offline Guest Mode. Set up your `.env.local` keys to unlock cross-device synchronization.
            </p>
            <button
              onClick={handleGuestMode}
              className="mt-3 block w-full text-center px-4 py-2 bg-black text-white font-black text-xs uppercase border border-black hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Continue as Guest
            </button>
          </div>
        )}

        {isFirebaseAvailable && (
          <>
            {/* Error Message */}
            {errorMsg && (
              <div className="bg-neoRed border-2 border-black p-3 rounded-lg text-xs font-black uppercase text-black mb-6 shadow-neo-sm">
                Error: {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase mb-1 text-gray-750">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. dev@dsajourney.com"
                  required
                  className="w-full bg-white border-2 border-black p-2.5 rounded-md font-bold text-sm outline-none focus:bg-yellow-50 focus:shadow-neo-sm transition-all text-black"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1 text-gray-750">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white border-2 border-black p-2.5 rounded-md font-bold text-sm outline-none focus:bg-yellow-50 focus:shadow-neo-sm transition-all text-black"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-neoGreen border-2 border-black font-black uppercase text-sm shadow-neo-sm hover:bg-green-300 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-black"
              >
                {submitting
                  ? "SUBMITTING..."
                  : isRegistering
                  ? "CREATE ACCOUNT"
                  : "SIGN IN"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center justify-between">
              <span className="border-t-2 border-black flex-grow" />
              <span className="mx-3 text-xs font-black uppercase text-gray-500">OR</span>
              <span className="border-t-2 border-black flex-grow" />
            </div>

            {/* Google OAuth Login */}
            <button
              onClick={handleGoogleSignIn}
              disabled={submitting}
              type="button"
              className="w-full py-3 bg-neoBlue border-2 border-black font-black uppercase text-sm shadow-neo-sm hover:bg-sky-300 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2.5 text-black disabled:opacity-50"
            >
              <svg className="w-5 h-5 shrink-0 bg-white p-0.5 rounded border border-black" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign In with Google</span>
            </button>

            {/* Guest Mode Button */}
            <button
              onClick={handleGuestMode}
              type="button"
              className="w-full mt-3 py-3 bg-neoYellow border-2 border-black font-black uppercase text-sm shadow-neo-sm hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2 text-black"
            >
              Continue as Guest
            </button>

            {/* Register/Login switch toggle */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setErrorMsg("");
                }}
                className="text-xs font-black uppercase text-gray-750 hover:underline cursor-pointer"
              >
                {isRegistering
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Register Here"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
