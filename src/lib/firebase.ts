// Firebase client-side configuration
// This file is for client-side Firebase features (Analytics, Auth, etc.)

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAI-Iz3fhdlbGYgi9bKz1sFSfV9rjkaH2s",
  authDomain: "sonifyai-e5ebe.firebaseapp.com",
  projectId: "sonifyai-e5ebe",
  storageBucket: "sonifyai-e5ebe.firebasestorage.app",
  messagingSenderId: "260591307414",
  appId: "1:260591307414:web:609ecb88c4072f29e990b7",
  measurementId: "G-36KVRPXM2P"
};

// Initialize Firebase (only if not already initialized)
let app: FirebaseApp;
if (typeof window !== "undefined" && getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Analytics (client-side only)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };
export default app;

