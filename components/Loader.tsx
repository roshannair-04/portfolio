"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// A camera "boot": brackets fly in from the screen corners, the model loads,
// the reticle locks on, then the whole screen folds into it. Once per tab session.
const DURATION = 1700;

const log = [
  [0, "booting vision stack"],
  [18, "load yolov8n.onnx"],
  [38, "warm arcface embeddings"],
  [58, "connect pgvector · watchlist"],
  [76, "open cam_01 · 1080p"],
  [92, "subject acquired"],
] as const;

const corners = [
  { key: "tl", from: { x: "-42vw", y: "-42vh" }, d: "M2 14V2h12" },
  { key: "tr", from: { x: "42vw", y: "-42vh" }, d: "M18 2h12v12" },
  { key: "bl", from: { x: "-42vw", y: "42vh" }, d: "M2 18v12h12" },
  { key: "br", from: { x: "42vw", y: "42vh" }, d: "M30 18v12H18" },
];

export default function Loader() {
  const [count, setCount] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("seen") || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const lenis = () => (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => lenis()?.stop());
    const start = performance.now();
    let id = requestAnimationFrame(function step(t) {
      const p = Math.min(1, (t - start) / DURATION);
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 2.4))));
      if (p < 1) id = requestAnimationFrame(step);
      else {
        setLocked(true);
        sessionStorage.setItem("seen", "1");
        setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
          lenis()?.start();
        }, 450);
      }
    });
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.style.overflow = "";
      lenis()?.start();
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[90] overflow-hidden bg-canvas"
          initial={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
          exit={{ clipPath: "inset(50% 50% 50% 50% round 12px)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* faint column grid + sweeping scan line */}
          <div className="column-grid !absolute opacity-100" />
          <motion.div
            className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-signal/15 to-transparent"
            initial={{ top: "-20%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
          />

          {/* reticle */}
          <div className="absolute left-1/2 top-1/2 h-[min(46vw,240px)] w-[min(46vw,240px)] -translate-x-1/2 -translate-y-1/2">
            {/* the "subject": a crop of the hero portrait, around the face OpenCV found */}
            <motion.div
              className="absolute inset-[6%] bg-no-repeat"
              style={{ backgroundImage: "url(/img/portrait.webp)", backgroundSize: "430%", backgroundPosition: "41% 61%" }}
              initial={{ opacity: 0, filter: "grayscale(1) contrast(1.2)" }}
              animate={
                count >= 92
                  ? { opacity: locked ? 0.55 : 0.3, filter: locked ? "grayscale(0) contrast(1)" : "grayscale(1) contrast(1.2)" }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-[6%] bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
            {corners.map((c, i) => (
              <motion.svg
                key={c.key}
                viewBox="0 0 32 32"
                className="absolute inset-0 h-full w-full overflow-visible"
                initial={{ ...c.from, opacity: 0, scale: 1.6 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: locked ? 0.92 : 1 }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <path d={c.d} fill="none" strokeWidth="1.2" strokeLinecap="round" className={locked ? "stroke-signal" : "stroke-ink"} style={{ transition: "stroke .2s" }} />
              </motion.svg>
            ))}

            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <span className={`display tabular-nums text-[clamp(4rem,13vw,7.5rem)] leading-none transition-colors ${locked ? "text-signal" : "text-ink"}`}>
                {count}
              </span>
              <span className={`label mt-3 transition-colors ${locked ? "text-signal" : "text-mute"}`}>
                {locked ? "● locked on" : "acquiring"}
              </span>
            </motion.div>

            {/* center pip */}
            <motion.span
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
              animate={locked ? { scale: [1, 26, 0], opacity: [1, 0.25, 0] } : { opacity: [0.3, 1, 0.3] }}
              transition={locked ? { duration: 0.45 } : { duration: 0.8, repeat: Infinity }}
            />
          </div>

          {/* boot log */}
          <ul className="absolute bottom-5 left-5 space-y-1 font-mono text-[11px] md:bottom-10 md:left-10 md:text-[12px]">
            {log
              .filter(([at]) => count >= at)
              .map(([at, line], i, arr) => (
                <motion.li key={at} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                  <span className="text-stone">[{String(at).padStart(3, "0")}]</span>
                  <span className={i === arr.length - 1 && !locked ? "text-ink" : "text-mute"}>{line}</span>
                  <span className="text-signal">{i < arr.length - 1 || locked ? "ok" : "…"}</span>
                </motion.li>
              ))}
          </ul>

          <div className="label absolute right-5 top-5 text-right text-mute md:right-10 md:top-8">
            Roshan M Nair
            <br />
            <span className="text-stone">Portfolio ’26</span>
          </div>
          <div className="label absolute bottom-5 right-5 flex items-center gap-2 text-mute md:bottom-10 md:right-10">
            <span className="h-1.5 w-1.5 animate-[blink_1.2s_steps(2)_infinite] rounded-full bg-danger" /> rec
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
