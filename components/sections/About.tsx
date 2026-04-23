"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FADE_LEFT = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const FADE_RIGHT = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function About() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2"
      style={{ minHeight: "100svh" }}
      aria-label="About"
    >
      {/* ── LEFT — Polaroid ── */}
      <motion.div
        className="flex items-center justify-center bg-[#EBEAE5] py-20 md:py-0"
        variants={FADE_LEFT}
        initial="hidden"
        animate="visible"
      >
        <div
          className="bg-white p-3 pb-10 shadow-2xl"
          style={{ rotate: "-2deg", maxWidth: "480px", width: "90%" }}
        >
          <img
            src="/me.jpg"
            alt="Matheus Müller"
            className="block w-full object-cover"
            style={{ aspectRatio: "4/5" }}
          />
        </div>
      </motion.div>

      {/* ── RIGHT — Copy ── */}
      <motion.div
        className="flex flex-col items-start justify-center bg-[#EBEAE5]
                   px-12 py-20 text-left md:pl-10 md:pr-16 md:py-32"
        variants={FADE_RIGHT}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Logo — links back to home */}
        <Link href="/" aria-label="Back to home" className="transition-opacity duration-300 hover:opacity-60">
          <img
            src="/logo.png"
            alt="Muller & Co. Engineering"
            className="w-40 select-none"
          />
        </Link>

        {/* Title */}
        <h2
          className="mt-12 font-display font-normal leading-tight text-[#1A1A1A]
                     text-4xl md:text-5xl lg:text-6xl"
        >
          Engineering<br />as Systemic Art.
        </h2>

        {/* Body */}
        <p
          className="mt-8 max-w-md font-sans text-sm font-light leading-relaxed
                     text-[#1A1A1A]/70 md:text-base"
        >
          At Muller &amp; Co. Engineering, we don&apos;t just write code — we orchestrate trust.
          Our philosophy bridges executive logic with technical precision.
          We architect high-performance systems and systemic automations that
          eliminate friction, ensure compliance, and accelerate business.
          Where complexity reigns, we deliver clarity.
        </p>
      </motion.div>
    </section>
  );
}
