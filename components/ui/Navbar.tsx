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

const OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
};

const LINK_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.09,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

/* ─── Variant types ──────────────────────────────────── */
type Variant = "light" | "dark" | "works" | "about";

/* ─── Smooth anchor helper ───────────────────────────── */
function useAnchorClick() {
  const router = useRouter();
  return function handleAnchor(e: React.MouseEvent, href: string, onAfter?: () => void) {
    if (!href.includes("#")) return;
    e.preventDefault();
    const isCrossPage = href.startsWith("/#");
    const hash = isCrossPage ? "#" + href.split("/#")[1] : href;
    if (isCrossPage && window.location.pathname !== "/") {
      lenisStore.setPending(hash);
      router.push("/");
      onAfter?.();
    } else {
      lenisStore.scrollTo(hash);
      onAfter?.();
    }
  };
}

/* ─── Nav Link ───────────────────────────────────────── */
function NavLink({ href, children, textClass }: { href: string; children: React.ReactNode; textClass: string }) {
  const handleAnchor = useAnchorClick();
  return (
    <a
      href={href}
      onClick={(e) => handleAnchor(e, href)}
      className={`font-sans text-[10.5px] font-normal uppercase tracking-[0.16em] whitespace-nowrap
                  transition-opacity duration-300 hover:opacity-40 ${textClass}`}
    >
      {children}
    </a>
  );
}

/* ─── Hamburger button ───────────────────────────────── */
function Hamburger({ open, onClick, barClass }: { open: boolean; onClick: () => void; barClass: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="flex flex-col justify-center gap-[7px] p-3 mr-4"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`block h-px w-6 transition-all duration-300 ${barClass}
            ${i === 0 && open ? "translate-y-[10px] rotate-45" : ""}
            ${i === 1 && open ? "opacity-0 scale-x-0"           : ""}
            ${i === 2 && open ? "-translate-y-[10px] -rotate-45" : ""}`}
        />
      ))}
    </button>
  );
}

/* ─── Full-screen mobile menu ────────────────────────── */
const NAV_LINKS = [
  { href: "/works",    label: "Work"    },
  { href: "/about",    label: "About"   },
  { href: "/#contact", label: "Contact" },
];

function MobileOverlay({
  open,
  onClose,
  bg,
  textColor,
}: {
  open: boolean;
  onClose: () => void;
  bg: string;
  textColor: string;
}) {
  const handleAnchor = useAnchorClick();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden ${bg}`}
          variants={OVERLAY_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label="Mobile menu"
        >
          {/* Links */}
          <nav className="flex flex-col items-center gap-10">
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.a
                key={href}
                href={href}
                custom={i}
                variants={LINK_VARIANTS}
                initial="hidden"
                animate="visible"
                onClick={(e) => handleAnchor(e, href, onClose)}
                className={`font-display font-normal leading-none tracking-[-0.01em]
                             transition-opacity duration-300 hover:opacity-40 ${textColor}`}
                style={{ fontSize: "clamp(40px, 12vw, 64px)" }}
              >
                {label}
              </motion.a>
            ))}
          </nav>

          {/* Branding footer */}
          <p className={`absolute bottom-10 font-sans text-[9px] uppercase tracking-[0.3em]
                         ${textColor === "text-white" ? "text-white/30" : "text-[#1A1A1A]/30"}`}>
            Muller &amp; Co. Engineering
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Navbar ─────────────────────────────────────────── */
export default function Navbar({ variant = "light" }: { variant?: Variant }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const textClass = variant === "light" ? "text-white/85"  : "text-[#1A1A1A]/65";
  const logoClass = variant === "light" ? "text-white"     : "text-[#1A1A1A]";
  const barClass  = variant === "light" ? "bg-white"       : "bg-[#1A1A1A]";
  const menuBg    = variant === "light" ? "bg-[#1A1A1A]"   : "bg-[#EBEAE5]";
  const menuText  = variant === "light" ? "text-white"     : "text-[#1A1A1A]";

  /* ── Works / About variant ── */
  if (variant === "works" || variant === "about") {
    return (
      <>
        {/* Mobile top bar */}
        <motion.header
          className="sticky top-0 z-50 flex w-full items-center bg-[#EBEAE5] md:hidden"
          style={{ paddingTop: "20px", paddingBottom: "20px", paddingLeft: "24px", paddingRight: "24px" }}
          variants={NAV_VARIANTS}
          initial="hidden"
          animate="visible"
          aria-label="Mobile header"
        >
          {/* Left spacer — balances hamburger width */}
          <div style={{ width: "56px" }} />

          {/* Logo centered */}
          <Link
            href="/"
            className="flex flex-1 justify-center transition-opacity duration-300 hover:opacity-60"
            aria-label="Müller — Home"
          >
            <img
              src="/logo.png"
              alt="Muller & Co. Engineering"
              style={{ height: "72px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Hamburger right */}
          <div style={{ width: "56px", display: "flex", justifyContent: "flex-end" }}>
            <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} barClass="bg-[#1A1A1A]" />
          </div>
        </motion.header>

        {/* Desktop bar */}
        <motion.header
          className="sticky top-0 z-50 hidden w-full grid-cols-3 items-start bg-[#EBEAE5] md:grid"
          style={{ paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "1vw", paddingBottom: "1vw" }}
          variants={NAV_VARIANTS}
          initial="hidden"
          animate="visible"
          aria-label="Main header"
        >
          <nav className="flex items-center gap-12 pt-2" aria-label="Left navigation">
            <Link
              href="/works"
              className="font-sans text-[10.5px] font-normal uppercase tracking-[0.16em]
                         text-[#1A1A1A]/65 whitespace-nowrap transition-opacity duration-300 hover:opacity-40"
            >
              Work
            </Link>
          </nav>
          <div className="flex justify-center">
            <Link href="/" aria-label="Müller — Home" className="transition-opacity duration-300 hover:opacity-60">
              <img src="/logo.png" alt="Muller & Co. Engineering" className="h-24 w-auto object-contain md:h-32" />
            </Link>
          </div>
          <nav className="flex items-center justify-end gap-12 pt-2" aria-label="Right navigation">
            <NavLink href="/about"    textClass="text-[#1A1A1A]/65">About</NavLink>
            <NavLink href="/#contact" textClass="text-[#1A1A1A]/65">Contact</NavLink>
          </nav>
        </motion.header>

        <MobileOverlay
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          bg="bg-[#EBEAE5]"
          textColor="text-[#1A1A1A]"
        />
      </>
    );
  }

  /* ── Light / Dark variants ── */
  const posClass = variant === "light" ? "absolute" : "relative";

  return (
    <>
      {/* Desktop */}
      <motion.header
        className={`${posClass} inset-x-0 top-0 z-50 hidden w-full items-start justify-between md:flex`}
        style={{ paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "1vw" }}
        variants={NAV_VARIANTS}
        initial="hidden"
        animate="visible"
        aria-label="Main header"
      >
        <nav className="flex flex-row items-center gap-12 pt-8" aria-label="Left navigation">
          <Link
            href="/works"
            className={`font-sans text-[10.5px] font-normal uppercase tracking-[0.16em]
                        whitespace-nowrap transition-opacity duration-300 hover:opacity-40 ${textClass}`}
          >
            Work
          </Link>
        </nav>

        <Link
          href="/"
          aria-label="Müller — Home"
          className={`absolute left-1/2 top-4 -translate-x-1/2 font-display text-[7vw] font-semibold
                      leading-none tracking-[0.06em] uppercase select-none
                      transition-opacity duration-500 hover:opacity-60 ${logoClass}`}
        >
          Müller
        </Link>

        <nav className="flex flex-row items-center gap-12 pt-8" aria-label="Right navigation">
          <NavLink href="/about"   textClass={textClass}>About</NavLink>
          <NavLink href="#contact" textClass={textClass}>Contact</NavLink>
        </nav>
      </motion.header>

      {/* Mobile top bar */}
      <motion.header
        className={`${posClass} inset-x-0 top-0 z-50 flex w-full items-center md:hidden`}
        style={{ paddingTop: "20px", paddingBottom: "20px", paddingLeft: "24px", paddingRight: "24px" }}
        variants={NAV_VARIANTS}
        initial="hidden"
        animate="visible"
        aria-label="Mobile header"
      >
        {/* Left spacer */}
        <div style={{ width: "56px" }} />

        {/* Logo centered */}
        <Link
          href="/"
          aria-label="Müller — Home"
          className={`flex flex-1 justify-center font-display font-normal leading-none
                      tracking-[0.05em] uppercase select-none
                      transition-opacity duration-300 hover:opacity-60 ${logoClass}`}
          style={{ fontSize: "2.4rem" }}
        >
          Müller
        </Link>

        {/* Hamburger right */}
        <div style={{ width: "56px", display: "flex", justifyContent: "flex-end" }}>
          <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} barClass={barClass} />
        </div>
      </motion.header>

      <MobileOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        bg={menuBg}
        textColor={menuText}
      />
    </>
  );
}
