import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

/* ─── Fonts ──────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Muller & Co. Engineer",
  description:
    "Matheus — Backend Software Engineer & Tech Lead. Uma celebração de design inteligente, automação sistêmica e engenharia de software de alta performance.",
  openGraph: {
    title: "Muller & Co. Engineer",
    description: "Backend Software Engineer & Tech Lead.",
    type: "website",
  },
};

/* ─── Root Layout ────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
