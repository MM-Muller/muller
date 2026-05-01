"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const RISE = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const FADE_LEFT = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const FADE_RIGHT = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const PHOTO_REVEAL = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function About() {
  return (
    <section className="bg-[#EBEAE5] overflow-hidden" style={{ minHeight: "100svh" }} aria-label="About">

      {/* ─────────────────────────────────────────────────────
          MOBILE  (< 768 px)
          Stack: conteúdo centralizado → foto embaixo
          ───────────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-col md:hidden"
        style={{ minHeight: "100svh" }}
        variants={STAGGER}
        initial="hidden"
        animate="visible"
      >
        {/* Conteúdo */}
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
          {/* Logo */}
          <motion.div variants={RISE}>
            <Link
              href="/"
              aria-label="Back to home"
              className="inline-block cursor-pointer transition-opacity duration-300 hover:opacity-50"
            >
              <img src="/logo.png" alt="Muller & Co. Engineering" className="w-24 select-none" style={{ cursor: "pointer" }} />
            </Link>
          </motion.div>

          {/* Título */}
          <motion.h2
            variants={RISE}
            className="font-display font-normal text-[#1A1A1A] leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: "clamp(38px, 11vw, 56px)", marginTop: "10px" }}
          >
            Engineering<br />
            <em>as Systemic</em><br />
            Art.
          </motion.h2>

          {/* Corpo */}
          <motion.p
            variants={RISE}
            className="font-sans text-[13px] font-light leading-[1.85] text-[#1A1A1A]/55 max-w-[30ch]"
            style={{ marginTop: "52px" }}
          >
            At Muller &amp; Co. Engineering, we don&apos;t just write code — we orchestrate
            trust. Our philosophy bridges executive logic with technical precision.
            We architect high-performance systems that eliminate friction and accelerate business.
          </motion.p>
        </div>

        {/* Foto full-width embaixo */}
        <motion.div variants={PHOTO_REVEAL} className="w-full overflow-hidden">
          <img
            src="/hero.png"
            alt="Matheus Müller"
            className="w-full object-cover object-center"
            style={{ aspectRatio: "4 / 3" }}
          />
        </motion.div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────
          TABLET + DESKTOP  (768 px +)
          Grid 2 colunas: conteúdo esquerda · foto direita
          ───────────────────────────────────────────────────── */}
      <div
        className="hidden md:grid"
        style={{ height: "100svh", gridTemplateColumns: "30% 70%" }}
      >
        {/* Conteúdo — centralizado na coluna esquerda */}
        <motion.div
          className="flex flex-col items-center justify-center px-[8vw] py-[8vh] text-center"
          variants={STAGGER}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={RISE}>
            <Link
              href="/"
              aria-label="Back to home"
              className="inline-block cursor-pointer transition-opacity duration-300 hover:opacity-60"
            >
              <img
                src="/logo.png"
                alt="Muller & Co. Engineering"
                className="w-52 select-none"
                style={{ cursor: "pointer" }}
              />
            </Link>
          </motion.div>

          <motion.h2
            variants={RISE}
            className="font-display font-normal leading-[0.9] tracking-[-0.02em] text-[#1A1A1A]
                       text-5xl md:text-6xl lg:text-7xl"
            style={{ marginTop: "-28px" }}
          >
            Engineering<br />as Systemic Art.
          </motion.h2>

          <motion.p
            variants={RISE}
            className="font-sans font-light leading-relaxed text-[#1A1A1A]/60
                       text-sm md:text-[15px] max-w-[38ch]"
            style={{ marginTop: "36px" }}
          >
            At Muller &amp; Co. Engineering, we don&apos;t just write code — we orchestrate trust.
            Our philosophy bridges executive logic with technical precision.
            We architect high-performance systems and systemic automations that
            eliminate friction, ensure compliance, and accelerate business.
            Where complexity reigns, we deliver clarity.
          </motion.p>
        </motion.div>

        {/* Foto — hero.png, ocupa toda a altura da coluna */}
        <motion.div
          className="relative overflow-hidden"
          variants={FADE_RIGHT}
          initial="hidden"
          animate="visible"
        >
          <img
            src="/hero.png"
            alt="Matheus Müller"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </div>

    </section>
  );
}
