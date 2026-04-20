"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

/**
 * Minimal magnetic cursor:
 * – Inner dot: snaps precisely
 * – Outer ring: follows with spring lag for a liquid feel
 */
export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Inner dot — snaps */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1A1A1A]"
        style={{ x: mouseX, y: mouseY }}
      />
      {/* Outer ring — springs */}
      <motion.div
        className="pointer-events-none fixed z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1A1A1A]/40"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
