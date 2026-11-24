"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Inertia scrolling (both reference sites use Lenis). Also makes in-page #anchors glide.
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -72 } });
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}
