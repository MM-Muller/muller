"use client";

import { motion } from "framer-motion";

const FADE = {
  hidden: { opacity: 0, y: 16 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: d,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-block font-sans text-sm text-[#1A1A1A]
                 transition-opacity duration-300 hover:opacity-50"
    >
      {children}
      <span className="absolute -bottom-px left-0 h-px w-0 bg-[#1A1A1A]/40
                       transition-all duration-500 group-hover:w-full" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#EBEAE5] text-[#1A1A1A]" aria-label="Footer">

      {/* ── única linha divisória — topo do footer ── */}
      <div className="border-t border-[#1A1A1A]/20" />

      <div
        className="flex flex-col justify-between"
        style={{ paddingLeft: "8vw", paddingRight: "8vw", paddingTop: "6vh", paddingBottom: "6vh", minHeight: "42vh" }}
      >
        {/* ── Bloco superior: 2 colunas ── */}
        <motion.div
          className="grid grid-cols-2 gap-8"
          variants={FADE}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          custom={0}
        >
          {/* Esquerda — Follow */}
          <div className="flex flex-col gap-4">
            <p className="font-sans text-xs uppercase tracking-widest text-[#1A1A1A]/50">
              Follow
            </p>
            <div className="flex flex-col gap-2">
              <SocialLink href="https://www.linkedin.com/in/matheus-mm%C3%BCller/?locale=en-US">
                LinkedIn
              </SocialLink>
              <SocialLink href="https://github.com/MM-Muller">
                GitHub
              </SocialLink>
            </div>
          </div>

          {/* Direita — Get in touch */}
          <div className="flex flex-col gap-4">
            <p className="font-sans text-xs uppercase tracking-widest text-[#1A1A1A]/50">
              Get in touch
            </p>
            <a
              href="mailto:dev.mmuller@gmail.com"
              className="inline-block border-b border-[#1A1A1A]/30 pb-1
                         font-sans text-base font-light text-[#1A1A1A]
                         transition-all duration-300 hover:border-[#1A1A1A]/60
                         hover:text-[#4A3C31] md:text-lg"
            >
              dev.mmuller@gmail.com
            </a>
          </div>
        </motion.div>

        {/* ── Bloco inferior: monograma + copyright ── */}
        <motion.div
          className="flex items-end justify-between"
          variants={FADE}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          custom={0.1}
        >
          {/* Monograma — Cormorant */}
          <a
            href="/"
            aria-label="Müller — Home"
            className="font-display text-3xl font-normal leading-none
                       tracking-[0.05em] text-[#1A1A1A] uppercase select-none
                       transition-opacity duration-300 hover:opacity-50"
          >
            M &amp; Co.
          </a>

          {/* Copyright */}
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1A1A1A]/50 md:text-xs">
              © 2026 Muller. All rights reserved.
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1A1A1A]/40 md:text-xs">
              Curitiba, Brasil
            </p>
          </div>
        </motion.div>
      </div>

    </footer>
  );
}
