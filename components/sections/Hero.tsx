"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Navbar from "@/components/ui/Navbar";

/* ─── Animation Variants ─────────────────────────────── */
const FADE_UP_VARIANTS = {
  hidden: { y: 24, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

/* ─── Hero ───────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax: fundo se desloca 28% mais lento que o scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden"
      aria-label="Hero"
    >
      {/* ────────────────────────────────────────────────────
          IMAGEM DE FUNDO COM PARALLAX
          ─ Coloque o arquivo hero.jpg na pasta /public
          ─ Ex: /Users/matheusmuller/Desktop/muller/public/hero.jpg
          ─ A imagem será acessada em http://localhost:3000/hero.jpg
          ──────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 scale-[1.12] will-change-transform"
        style={{ y: imageY }}
        aria-hidden="true"
      >
        {/*
          Imagem retrato (896×1195px) exibida em viewport widescreen.
          object-cover garante cobertura total; object-[center_12%] ancora
          levemente abaixo do topo para revelar rosto + corpo como foco editorial.
          Arquivo em: /public/hero.jpg
        */}
        <img
          src="/hero.png"
          alt="Matheus Muller — Backend Engineer & Tech Lead"
          className="h-full w-full object-cover object-[center_12%]"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Overlay escuro para leitura dos textos ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/40"
        aria-hidden="true"
      />

      {/* ── Grain de textura sutil ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      {/* ── Navbar (componente atômico separado) ── */}
      <Navbar />

      {/* ────────────────────────────────────────────────────
          BLOCO EDITORIAL — canto inferior esquerdo
          ──────────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-8 z-10 max-w-md">
        {/* Linha de destaque */}
        <motion.p
          className="mb-3 text-[10px] uppercase tracking-[0.22em] font-normal text-white"
          variants={FADE_UP_VARIANTS}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          Introducing Muller &amp; Co. Engineer
        </motion.p>

        {/* Descrição */}
        <motion.p
          className="text-[14px] font-light leading-relaxed tracking-wide text-white/80"
          variants={FADE_UP_VARIANTS}
          initial="hidden"
          animate="visible"
          custom={0.85}
        >
          Matheus, Backend Software Engineer &amp; Tech Lead. A celebration of
          intelligent design, systemic automation, and high-performance
          software engineering. Welcome to my space.
        </motion.p>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-3"
        variants={FADE_UP_VARIANTS}
        initial="hidden"
        animate="visible"
        custom={1.1}
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="h-12 w-px overflow-hidden bg-white/20">
          <motion.div
            className="h-full w-full bg-white/60"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 1.4 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
