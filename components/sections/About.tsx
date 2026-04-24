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
      {/* ── LEFT — Foto tamanho original ── */}
      <motion.div
        className="hidden md:flex items-center justify-start bg-[#EBEAE5] overflow-hidden"
        variants={FADE_LEFT}
        initial="hidden"
        animate="visible"
      >
        <img
          src="/me.jpg"
          alt="Matheus Müller"
          className="w-auto"
          style={{ maxHeight: "100svh" }}
        />
      </motion.div>

      {/* ── RIGHT — Conteúdo centralizado ── */}
      <motion.div
        className="flex flex-col items-center justify-center bg-[#EBEAE5]
                   px-12 py-20 text-center md:px-16 md:py-32"
        variants={FADE_RIGHT}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, margin: "0px" }}
      >
        <div style={{ marginRight: "150px" }}>
          {/* Logo — links back to home */}
          <Link href="/" aria-label="Back to home" className="transition-opacity duration-300 hover:opacity-60 inline-block">
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
        </div>
      </motion.div>

      {/* Mobile: foto acima do conteúdo */}
      <div className="md:hidden flex justify-center bg-[#EBEAE5] pt-12">
        <img src="/me.jpg" alt="Matheus Müller" />
      </div>
    </section>
  );
}
