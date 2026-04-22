"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ───────────────────────────────────────────── */
const projects = [
  {
    id: "01",
    title: "CMMI Compliance & Analytics",
    category: "RPA & Automations",
    description:
      "Elimination of manual data collection through an automated training-metrics workflow. The solution generates real-time executive reports for senior leadership, ensures continuous CMMI certification compliance, and delivers actionable intelligence to optimize corporate training programs.",
    techStack: "SHAREPOINT — POWER AUTOMATE — POWER APPS — DATA ANALYTICS",
  },
  {
    id: "02",
    title: "Automated Contract Lifecycle",
    category: "RPA & Automations",
    description:
      "Drastic reduction in sales cycle length and operational friction. Through a centralized dashboard, the team simply enters the key variables while the system natively orchestrates the creation, delivery, client approval, and full traceability of enterprise contracts.",
    techStack: "SHAREPOINT — POWER AUTOMATE — AZURE — POWER APPS — REST API",
  },
  {
    id: "03",
    title: "Nexus RPG Platform",
    category: "SaaS Development",
    description:
      "End-to-end development of an interactive entertainment SaaS product. The platform leverages generative AI and vector databases to craft adaptive narratives and persistent memories, delivering a deeply immersive and highly personalized experience.",
    techStack: "PYTHON / FASTAPI — MONGODB / CHROMADB — LLMS — ANGULAR 16 — DOCKER",
  },
];

/* ─── Variants ───────────────────────────────────────── */
const PANEL_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

/* ─── Filter categories ──────────────────────────────── */
const CATEGORIES = ["All", "RPA & Automations", "SaaS Development", "Sites"] as const;
type Category = (typeof CATEGORIES)[number];

/* ─── SelectedWorks ──────────────────────────────────── */
export default function SelectedWorks() {
  const [active, setActive] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const project = filtered[active] ?? filtered[0];

  useEffect(() => {
    setActive(0);
  }, [activeCategory]);

  return (
    <section
      className="w-full bg-[#EBEAE5] text-[#1A1A1A]"
      aria-label="Selected Works"
      id="work"
    >
      <div
        className="grid grid-cols-1 py-20 md:grid-cols-2 md:py-32"
        style={{ paddingLeft: "8vw", paddingRight: "8vw", gap: "6vw" }}
      >
        {/* ────────────────────────────────────────────────
            LEFT — Filter bar + title index
            ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2">

          {/* Filter bar */}
          <div className="mb-12 flex gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group relative font-sans text-[10px] uppercase tracking-[0.18em]
                           transition-all duration-300 focus:outline-none
                           ${activeCategory === cat
                    ? "text-[#1A1A1A]"
                    : "text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70"}`}
              >
                {cat}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#1A1A1A] transition-all duration-300
                    ${activeCategory === cat ? "w-full" : "w-0"}`}
                />
              </button>
            ))}
          </div>

          {/* Project list */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mt-12"
              >
                <p className="font-display font-normal text-2xl md:text-4xl text-[#1A1A1A]/30 leading-snug">
                  New projects unfolding soon.
                </p>
              </motion.div>
            )}
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                onMouseEnter={() => setActive(i)}
                className="cursor-default border-b border-[#1A1A1A]/10 py-7"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                layout
              >
                <h2
                  className={`font-display font-normal leading-[1.05] transition-all duration-500
                    text-4xl md:text-5xl lg:text-[4.5vw]
                    ${active === i ? "opacity-100" : "opacity-15"}`}
                >
                  {p.title}
                </h2>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ────────────────────────────────────────────────
            RIGHT — Sticky editorial description
            ──────────────────────────────────────────────── */}
        <div className="relative hidden md:flex md:items-center">
          <div className="sticky top-1/3">
            <AnimatePresence mode="wait">
              {project && (
                <motion.div
                  key={`${activeCategory}-${active}`}
                  variants={PANEL_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Description — editorial scale */}
                  <p
                    className="font-display font-normal leading-[1.7] text-[#1A1A1A]/80
                               text-2xl md:text-3xl lg:text-[2.2vw] max-w-xl text-left"
                  >
                    {project.description}
                  </p>

                  {/* Tech stack — plain text with em-dash separators */}
                  <p className="mt-8 font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A]/40">
                    {project.techStack}
                  </p>

                  {/* CTA */}
                  <a
                    href="#"
                    className="group mt-10 inline-flex items-center gap-2 font-sans
                               text-[11px] uppercase tracking-[0.18em] text-[#1A1A1A]"
                  >
                    <span className="relative">
                      Discover More
                      <span
                        className="absolute -bottom-px left-0 h-px w-0 bg-[#1A1A1A]
                                   transition-all duration-500 group-hover:w-full"
                      />
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
