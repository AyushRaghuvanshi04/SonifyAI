"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export function FirebaseAnalytics() {
  useEffect(() => {
    if (analytics) {
      // Log page view
      logEvent(analytics, "page_view");
    }
  }, []);

  return null; // This component doesn't render anything
}

