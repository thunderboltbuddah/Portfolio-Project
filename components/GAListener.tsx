// GAListener.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Tell TypeScript that gtag exists on window
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function GAListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", "G-L7G74DP73S", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
