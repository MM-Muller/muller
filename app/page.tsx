/**
 * page.tsx — Server Component
 *
 * Orchestrates all page sections. Interactive UI lives in client components.
 * This file stays as a pure Server Component (no "use client").
 */
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      {/*
        Next sections — to be added after feedback:
        <AboutGrid />
        <Expertise />
        <SelectedWork />
      */}
      <Footer />
    </main>
  );
}
