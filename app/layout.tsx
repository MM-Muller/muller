import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

/* ─── Fonts ──────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Muller & Co. Engineering",
  description:
    "Matheus — Software Engineer. A celebration of intelligent design, systemic automation, and high-performance software engineering.",
  openGraph: {
    title: "Muller & Co. Engineering",
    description: "Software Engineer.",
    type: "website",
  },
};

/* ─── Root Layout ────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} scroll-smooth`}
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
