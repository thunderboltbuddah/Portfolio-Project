"use client";
import React from "react";

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-900">
      <div className="flex flex-col items-center gap-4">
        {/* The Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-blue-500" />
        
        {/* Optional Branding */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 animate-pulse">
          Loading Experience
        </p>
      </div>
    </div>
  );
}