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
    <section className="bg-[#EBEAE5]" style={{ minHeight: "100svh" }} aria-label="About">

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
              className="inline-block transition-opacity duration-300 hover:opacity-50"
            >
              <img src="/logo.png" alt="Muller & Co. Engineering" className="w-24 select-none" />
            </Link>
          </motion.div>

          {/* Acento */}
          <motion.div
            variants={RISE}
            className="mt-8 h-px bg-[#4A3C31]"
            style={{ width: "32px" }}
          />

          {/* Título */}
          <motion.h2
            variants={RISE}
            className="mt-8 font-display font-normal text-[#1A1A1A] leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: "clamp(38px, 11vw, 56px)" }}
          >
            Engineering<br />
            <em>as Systemic</em><br />
            Art.
          </motion.h2>

          {/* Corpo */}
          <motion.p
            variants={RISE}
            className="mt-7 font-sans text-[13px] font-light leading-[1.85] text-[#1A1A1A]/55 max-w-[30ch]"
          >
            At Muller &amp; Co. Engineering, we don&apos;t just write code — we orchestrate
            trust. Our philosophy bridges executive logic with technical precision.
            We architect high-performance systems that eliminate friction and accelerate business.
          </motion.p>
        </div>

        {/* Foto full-width embaixo */}
        <motion.div variants={PHOTO_REVEAL} className="w-full overflow-hidden">
          <img
            src="/me.jpg"
            alt="Matheus Müller"
            className="w-full object-cover"
            style={{ aspectRatio: "4 / 3", objectPosition: "center 40%" }}
          />
        </motion.div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────
          TABLET + DESKTOP  (768 px +)
          Grid 2 colunas: foto esquerda · conteúdo direita
          ───────────────────────────────────────────────────── */}
      <div
        className="hidden md:grid md:grid-cols-2"
        style={{ minHeight: "100svh" }}
      >
        {/* Foto */}
        <motion.div
          className="relative flex items-center justify-start overflow-hidden"
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
          {/* Gradiente dissolve borda direita */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0"
            style={{
              width: "120px",
              background: "linear-gradient(to right, transparent 0%, #EBEAE5 100%)",
            }}
          />
        </motion.div>

        {/* Conteúdo */}
        <motion.div
          className="flex flex-col items-center justify-center px-12 py-20 text-center md:px-10 md:py-20"
          variants={FADE_RIGHT}
          initial="hidden"
          animate="visible"
        >
          {/* Tablet: sem offsets · Desktop: offsets originais */}
          <div className="lg:[margin-right:150px] lg:[margin-top:-70px]">
            <Link
              href="/"
              aria-label="Back to home"
              className="inline-block transition-opacity duration-300 hover:opacity-60"
            >
              <img
                src="/logo.png"
                alt="Muller & Co. Engineering"
                className="w-40 select-none"
              />
            </Link>

            <h2
              className="mt-12 font-display font-normal leading-tight text-[#1A1A1A]
                         text-4xl md:text-5xl lg:text-6xl"
            >
              Engineering<br />as Systemic Art.
            </h2>

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
      </div>

    </section>
  );
}
