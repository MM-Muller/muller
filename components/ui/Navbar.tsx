"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { lenisStore } from "@/lib/lenis-store";

/* ─── Animation variants ─────────────────────────────── */
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

/* ─── Variant types ──────────────────────────────────── */
type Variant = "light" | "dark" | "works";

/* ─── Smooth anchor helper ───────────────────────────── */
/*
  Intercepts every anchor click (href="#…" or href="/#…"),
  prevents the browser's native jump, and drives the scroll
  through Lenis so it stays buttery smooth.
*/
function useAnchorClick() {
  const router = useRouter();

  return function handleAnchor(
    e: React.MouseEvent,
    href: string,
    onAfter?: () => void,
  ) {
    if (!href.includes("#")) return; // non-anchor: let browser/Next handle it

    e.preventDefault();

    const isCrossPage = href.startsWith("/#");
    const hash = isCrossPage ? "#" + href.split("/#")[1] : href;

    if (isCrossPage && window.location.pathname !== "/") {
      // Store intent, navigate — homepage will consume it on mount
      lenisStore.setPending(hash);
      router.push("/");
      onAfter?.();
    } else {
      // Same page — scroll immediately
      lenisStore.scrollTo(hash);
      onAfter?.();
    }
  };
}

/* ─── Nav Link ───────────────────────────────────────── */
function NavLink({
  href,
  children,
  textClass,
}: {
  href: string;
  children: React.ReactNode;
  textClass: string;
}) {
  const handleAnchor = useAnchorClick();

  return (
    <a
      href={href}
      onClick={(e) => handleAnchor(e, href)}
      className={`font-sans text-[10.5px] font-normal uppercase
                  tracking-[0.16em] whitespace-nowrap
                  transition-opacity duration-300 hover:opacity-40
                  ${textClass}`}
    >
      {children}
    </a>
  );
}

/* ─── Navbar ─────────────────────────────────────────── */
export default function Navbar({ variant = "light" }: { variant?: Variant }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleAnchor = useAnchorClick();

  /* ── Token maps ── */
  const textClass = variant === "light" ? "text-white/85"   : "text-[#1A1A1A]/65";
  const logoClass = variant === "light" ? "text-white"      : "text-[#1A1A1A]";
  const barClass  = variant === "light" ? "bg-white"        : "bg-[#1A1A1A]";
  const menuBg    = variant === "light" ? "bg-black/85"     : "bg-[#EBEAE5]/95";
  const menuText  = variant === "light" ? "text-white/90"   : "text-[#1A1A1A]/80";

  /* ── Works variant ── */
  if (variant === "works") {
    return (
      <>
        {/* Mobile top bar */}
        <motion.header
          className="sticky top-0 z-50 flex w-full items-center justify-between
                     bg-[#EBEAE5] px-6 py-8 md:hidden"
          variants={NAV_VARIANTS}
          initial="hidden"
          animate="visible"
          aria-label="Mobile header — Works"
        >
          <Link href="/" className="transition-opacity duration-300 hover:opacity-60">
            <img src="/logo.png" alt="Muller" className="h-8 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex flex-col justify-center gap-[5px] p-1"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-px w-6 bg-[#1A1A1A] transition-all duration-300
                  ${i === 0 && menuOpen ? "translate-y-[7px] rotate-45" : ""}
                  ${i === 1 && menuOpen ? "opacity-0 scale-x-0" : ""}
                  ${i === 2 && menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            ))}
          </button>
        </motion.header>

        {/* Desktop bar */}
        <motion.header
          className="sticky top-0 z-50 hidden w-full
                     grid grid-cols-3 items-start bg-[#EBEAE5] md:grid"
          style={{ paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "1vw", paddingBottom: "1vw" }}
          variants={NAV_VARIANTS}
          initial="hidden"
          animate="visible"
          aria-label="Main header — Works"
        >
          {/* Left */}
          <nav className="flex items-center gap-12 pt-2" aria-label="Left navigation">
            <Link
              href="/works"
              className="font-sans text-[10.5px] font-normal uppercase
                         tracking-[0.16em] text-[#1A1A1A]/65 whitespace-nowrap
                         transition-opacity duration-300 hover:opacity-40"
            >
              Work
            </Link>
          </nav>

          {/* Center — logo in flow */}
          <div className="flex justify-center">
            <Link href="/" aria-label="Müller — Home" className="transition-opacity duration-300 hover:opacity-60">
              <img src="/logo.png" alt="Muller" className="h-24 w-auto object-contain md:h-32" />
            </Link>
          </div>

          {/* Right */}
          <nav className="flex items-center justify-end gap-12 pt-2" aria-label="Right navigation">
            <NavLink href="/#about"   textClass="text-[#1A1A1A]/65">About Me</NavLink>
            <NavLink href="/#contact" textClass="text-[#1A1A1A]/65">Contact</NavLink>
          </nav>
        </motion.header>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="fixed inset-x-0 top-[57px] z-40 flex flex-col gap-6
                         bg-[#EBEAE5]/95 px-6 py-8 backdrop-blur-sm md:hidden"
              variants={MOBILE_MENU_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-label="Mobile menu"
            >
              {[
                { href: "/works",    label: "Work" },
                { href: "/#about",   label: "About Me" },
                { href: "/#contact", label: "Contact" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleAnchor(e, href, () => setMenuOpen(false))}
                  className="font-sans text-[13px] uppercase tracking-[0.18em]
                             text-[#1A1A1A]/80 transition-opacity duration-200 hover:opacity-50"
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

  /* ── Light / Dark variants ── */
  const posClass = variant === "light" ? "absolute" : "relative";

  return (
    <>
      {/* Desktop */}
      <motion.header
        className={`${posClass} inset-x-0 top-0 z-50 hidden w-full
                    items-start justify-between md:flex`}
        style={{ paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "1vw" }}
        variants={NAV_VARIANTS}
        initial="hidden"
        animate="visible"
        aria-label="Main header"
      >
        <nav className="flex flex-row items-center gap-12 pt-8" aria-label="Left navigation">
          <Link
            href="/works"
            className={`font-sans text-[10.5px] font-normal uppercase
                        tracking-[0.16em] whitespace-nowrap
                        transition-opacity duration-300 hover:opacity-40 ${textClass}`}
          >
            Work
          </Link>
        </nav>

        <Link
          href="/"
          aria-label="Müller — Home"
          className={`absolute left-1/2 top-4 -translate-x-1/2
                      font-display text-[7vw] font-semibold leading-none
                      tracking-[0.06em] uppercase select-none
                      transition-opacity duration-500 hover:opacity-60 ${logoClass}`}
        >
          Müller
        </Link>

        <nav className="flex flex-row items-center gap-12 pt-8" aria-label="Right navigation">
          <NavLink href="#about"   textClass={textClass}>About Me</NavLink>
          <NavLink href="#contact" textClass={textClass}>Contact</NavLink>
        </nav>
      </motion.header>

      {/* Mobile */}
      <motion.header
        className={`${posClass} inset-x-0 top-0 z-50 flex w-full
                    items-center justify-between px-6 pt-6 md:hidden`}
        variants={NAV_VARIANTS}
        initial="hidden"
        animate="visible"
        aria-label="Mobile header"
      >
        <Link
          href="/"
          aria-label="Müller — Home"
          className={`font-display text-[2rem] font-normal leading-none
                      tracking-[0.05em] uppercase select-none
                      transition-opacity duration-300 hover:opacity-60 ${logoClass}`}
        >
          Müller
        </Link>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex flex-col justify-center gap-[5px] p-1"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-px w-6 transition-all duration-300 ${barClass}
                ${i === 0 && menuOpen ? "translate-y-[7px] rotate-45" : ""}
                ${i === 1 && menuOpen ? "opacity-0 scale-x-0" : ""}
                ${i === 2 && menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          ))}
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={`${posClass === "absolute" ? "absolute" : "fixed"} inset-x-0 top-[72px] z-40
                         flex flex-col gap-6 px-6 py-8 backdrop-blur-sm md:hidden ${menuBg}`}
            variants={MOBILE_MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-label="Mobile menu"
          >
            {[
              { href: "/works",   label: "Work" },
              { href: "#about",   label: "About Me" },
              { href: "#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchor(e, href, () => setMenuOpen(false))}
                className={`text-[13px] font-sans font-normal uppercase
                             tracking-[0.18em] transition-opacity duration-200
                             hover:opacity-50 ${menuText}`}
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
