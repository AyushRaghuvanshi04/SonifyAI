"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black" />
      </div>

      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Authentication Error</h1>
          <p className="text-white/70 mb-6">
            {error === "Configuration" && "There is a problem with the server configuration."}
            {error === "AccessDenied" && "You do not have permission to sign in."}
            {error === "Verification" && "The verification token has expired or has already been used."}
            {!error && "An error occurred during authentication."}
          </p>
          <Link
            href="/api/auth/signin"
            className="inline-block rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black" />
        </div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
}

