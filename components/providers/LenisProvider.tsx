"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: ReactNode;
}

/**
 * Wraps the app in Lenis smooth scroll.
 * Integrates with Framer Motion's global RAF loop via requestAnimationFrame.
 */
export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
