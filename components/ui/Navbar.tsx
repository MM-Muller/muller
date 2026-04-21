"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Variants ────────────────────────────────────────── */
const NAV_VARIANTS = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const MOBILE_MENU_VARIANTS = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

/* ─── Nav Link ───────────────────────────────────────── */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="font-sans text-[11px] font-normal uppercase
                 tracking-[0.15em] text-white/85 whitespace-nowrap
                 transition-opacity duration-300 hover:opacity-40"
    >
      {children}
    </a>
  );
}

/* ─── Navbar ─────────────────────────────────────────── */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ─────────────────────────────────────────────────────
          DESKTOP HEADER
          Estrutura: flex row com 3 zonas
          ─ Esquerda: links em linha (flex-row)
          ─ Centro:   logo absoluta no eixo da tela
          ─ Direita:  links em linha (flex-row)
          ───────────────────────────────────────────────────── */}
      <motion.header
        className="absolute inset-x-0 top-0 z-50 hidden w-full
                   items-start justify-between pt-8 md:flex"
        style={{ paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "1vw" }}
        variants={NAV_VARIANTS}
        initial="hidden"
        animate="visible"
        aria-label="Main header"
      >
        {/* ── Links Esquerda — em linha ── */}
        <nav
          className="flex flex-row items-center gap-12 pt-8"
          aria-label="Left navigation"
        >
          <NavLink href="#work">Work</NavLink>
        </nav>

        {/* ── Logo Central — absolutamente centrada na tela ── */}
        <a
          href="/"
          aria-label="Müller — Home"
          className="absolute left-1/2 top-4 -translate-x-1/2
                     font-display text-[7vw] font-semibold leading-none
                     tracking-[0.06em] text-white uppercase select-none
                     transition-opacity duration-500 hover:opacity-60"
        >
          Müller
        </a>

        {/* ── Links Direita — em linha ── */}
        <nav
          className="flex flex-row items-center gap-12 pt-8"
          aria-label="Right navigation"
        >
          <NavLink href="#about">About Me</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
      </motion.header>

      {/* ─────────────────────────────────────────────────────
          MOBILE HEADER — Logo + Hambúrguer
          ───────────────────────────────────────────────── */}
      <motion.header
        className="absolute inset-x-0 top-0 z-50 flex w-full
                   items-center justify-between px-6 pt-6 md:hidden"
        variants={NAV_VARIANTS}
        initial="hidden"
        animate="visible"
        aria-label="Mobile header"
      >
        <a
          href="/"
          aria-label="Müller — Home"
          className="font-display text-[2rem] font-normal leading-none
                     tracking-[0.05em] text-white uppercase select-none
                     transition-opacity duration-300 hover:opacity-60"
        >
          Müller
        </a>

        {/* Hambúrguer — 3 traços → ✕ */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex flex-col justify-center gap-[5px] p-1"
        >
          <span
            className={`block h-px w-6 bg-white transition-all duration-300
              ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-white transition-all duration-300
              ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-white transition-all duration-300
              ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </motion.header>

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="absolute inset-x-0 top-[72px] z-40 flex flex-col gap-6
                       bg-black/85 px-6 py-8 backdrop-blur-sm md:hidden"
            variants={MOBILE_MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-label="Mobile menu"
          >
            {[
              { href: "#work",    label: "Work" },
              { href: "#about",   label: "About Me" },
              { href: "#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-[13px] font-sans font-normal uppercase
                           tracking-[0.18em] text-white/90
                           transition-opacity duration-200 hover:opacity-50"
              >
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
