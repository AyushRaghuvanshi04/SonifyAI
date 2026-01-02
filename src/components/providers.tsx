"use client";

import { SessionProvider } from "next-auth/react";
import { FirebaseAnalytics } from "./FirebaseAnalytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <FirebaseAnalytics />
      {children}
    </SessionProvider>
  );
}
