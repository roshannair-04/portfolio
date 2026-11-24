import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import "./globals.css";

const instrument = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

const description =
  "Roshan M Nair builds real-time AI: computer vision that recognises people across cameras, NLP that matches resumes to jobs, adaptive learning tools, and PatternBattle, a live DSA battle platform.";

export const metadata: Metadata = {
  metadataBase: new URL("https://roshanportfolio-25.vercel.app"),
  title: { default: "Roshan M Nair — AI & ML Engineer", template: "%s | Roshan M Nair" },
  description,
  openGraph: {
    title: "Roshan M Nair — AI & ML Engineer",
    description,
    url: "https://roshanportfolio-25.vercel.app",
    siteName: "Roshan M Nair",
    type: "website",
    images: [{ url: "/img/portrait.webp", width: 1050, height: 1400 }],
  },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${instrument.variable}`}>
      <body>
        <SmoothScroll />
        <Cursor />
        <div className="column-grid" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
