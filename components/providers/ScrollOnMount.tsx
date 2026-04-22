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

    // rAF ensures the page has painted at least one frame before scrolling
    requestAnimationFrame(() => {
      lenisStore.scrollTo(hash);
    });
  }, []);

  return null;
}
