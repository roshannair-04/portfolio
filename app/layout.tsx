import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roshanportfolio-25.vercel.app"),
  title: {
    default: "Roshan Nair, Computer Vision Engineer",
    template: "%s | Roshan Nair",
  },
  description:
    "Roshan Nair builds real-time computer vision and machine learning systems: multi-camera detection and tracking, identity recognition, and production inference pipelines.",
  openGraph: {
    title: "Roshan Nair, Computer Vision Engineer",
    description:
      "Real-time computer vision and machine learning systems: detection, tracking, and identity recognition.",
    url: "https://roshanportfolio-25.vercel.app",
    siteName: "Roshan Nair",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
