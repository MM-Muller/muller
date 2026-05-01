"use client";

import { useEffect } from "react";
import { lenisStore } from "@/lib/lenis-store";

/**
 * Drop this into any page that may be navigated to via a cross-page anchor.
 * On mount it checks for a pending hash (set by the Navbar before router.push)
 * and scrolls to it via Lenis once the page has painted.
 */
export default function ScrollOnMount() {
  useEffect(() => {
    const hash = lenisStore.consumePending();
    if (!hash) return;

    // Lenis initializes in its own useEffect — poll until it's ready
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (lenisStore.isReady()) {
        clearInterval(interval);
        lenisStore.scrollTo(hash);
      } else if (attempts > 20) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return null;
}
