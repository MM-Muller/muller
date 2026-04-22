/**
 * page.tsx — Server Component
 *
 * Orchestrates all page sections. Interactive UI lives in client components.
 * This file stays as a pure Server Component (no "use client").
 */
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";
import ScrollOnMount from "@/components/providers/ScrollOnMount";

export default function Home() {
  return (
    <main>
      <ScrollOnMount />
      <Hero />
      <Footer />
    </main>
  );
}
