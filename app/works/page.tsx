import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import SelectedWorks from "@/components/sections/SelectedWorks";

export const metadata: Metadata = {
  title: "Works — Muller & Co. Engineering",
  description:
    "Selected projects in RPA Automations, SaaS Development, and Business Consulting.",
};

export default function WorksPage() {
  return (
    <>
      <Navbar variant="works" />

      <main className="pt-8 md:pt-24">
        <SelectedWorks />
      </main>
    </>
  );
}
