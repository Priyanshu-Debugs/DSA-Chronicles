import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if minimum configuration keys exist
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.authDomain
);

let app;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
} else {
  if (typeof window !== "undefined") {
    console.warn(
      "Firebase environment variables are missing. Running in local Guest Mode."
    );
  }
}

export { auth, db };
export { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
export { doc, getDoc, setDoc } from "firebase/firestore";
