import type { Metadata } from "next";
import About from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About — Muller & Co. Engineering",
  description:
    "Engineering as Systemic Art. The philosophy behind Muller & Co. Engineering.",
};

export default function AboutPage() {
  return <About />;
}
