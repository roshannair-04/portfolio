"use client";

import { motion, useReducedMotion } from "motion/react";
import Arena from "./Arena";

const ease = [0.16, 1, 0.3, 1] as const;

const facts = [
  ["15", "roadmap patterns, from Two Pointers to DP"],
  ["3", "languages judged: Java 21, Python 3, C++17"],
  ["2–4", "players per private battle, one shared timer"],
];

const built = [
  ["Contest events", "Question sets, approval, pause and extend, leaderboard freeze, disqualification, confirm-then-publish results and CSV export."],
  ["Projector reveal", "A podium reveal for the big screen when an organiser publishes results."],
  ["Fest readiness", "Judge throughput, per-user limits, private hints and locked contest questions before the first live event."],
  ["Frontend foundations", "The pattern roadmap, auth wiring, the problem bank with a language picker, and 138 curated practice links."],
];

const pipeline = [
  ["Browser", "Monaco editor"],
  ["Express API", "auth · rooms · events"],
  ["PostgreSQL", "submissions queue"],
  ["Judge worker", "Node.js"],
  ["Docker sandbox", "no network · capped memory"],
];

export default function PatternBattle() {
  const reduce = useReducedMotion();
  const fade = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.9, delay: d, ease },
  });

  return (
    <section id="patternbattle" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="glow" />
      <div className="relative mx-auto max-w-[1440px]">
        <p className="label text-mute">(04) Case study — Engineek</p>
        <motion.h2 {...fade()} className="display mt-4 text-[clamp(3.6rem,12vw,13rem)] leading-[0.85]">
          Pattern<em className="text-signal">Battle</em>
        </motion.h2>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <motion.p {...fade(0.1)} className="text-[19px] leading-[1.5] text-body md:col-span-6 md:text-[21px]">
            Engineek’s platform for learning DSA one pattern at a time, then proving it: friends battle in private rooms,
            and organisers run live contests that end on a projector. Every submission is real code, compiled and judged
            in an isolated sandbox.
          </motion.p>
          <motion.dl {...fade(0.2)} className="grid grid-cols-3 gap-4 md:col-span-5 md:col-start-8">
            {facts.map(([n, l]) => (
              <div key={l} className="border-t border-hairline-strong pt-3">
                <dt className="display text-[clamp(2.4rem,4vw,3.6rem)]">{n}</dt>
                <dd className="mt-1 text-[13px] leading-snug text-dim">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* pipeline */}
        <motion.div {...fade()} className="mt-20">
          <p className="label mb-5 text-mute">How a submission travels</p>
          <div className="relative grid gap-3 md:grid-cols-5">
            <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-hairline-strong md:block" />
            {!reduce && (
              <motion.span
                className="absolute top-1/2 z-10 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_16px_4px_rgba(79,190,123,0.6)] md:block"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
              />
            )}
            {pipeline.map(([a, b], i) => (
              <div key={a} className="relative rounded-[12px] border border-hairline-strong bg-surface px-4 py-4">
                <span className="label text-stone">0{i + 1}</span>
                <p className="mt-2 text-[16px] font-medium">{a}</p>
                <p className="mt-0.5 font-mono text-[12px] text-mute">{b}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* what I built */}
        <div className="mt-24 grid gap-10 md:grid-cols-12">
          <motion.div {...fade()} className="md:col-span-4">
            <p className="label text-mute">My part</p>
            <h3 className="display mt-3 text-[clamp(2.4rem,4vw,3.8rem)]">
              I built the <em className="text-signal">contest</em> side.
            </h3>
            <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-dim">
              Built with Rudra Narayan Jena at Engineek. Rudra built friend battles and the multi-language sandbox; I
              took events end to end and much of the frontend.
            </p>
          </motion.div>
          <ul className="grid gap-px overflow-hidden rounded-[12px] border border-hairline-strong bg-hairline md:col-span-8 md:grid-cols-2">
            {built.map(([t, d], i) => (
              <motion.li key={t} {...fade(i * 0.08)} className="bg-canvas p-6">
                <p className="label text-signal">0{i + 1}</p>
                <p className="mt-3 text-[19px] font-medium tracking-tight">{t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-dim">{d}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* play */}
        <div className="mt-28">
          <motion.div {...fade()} className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-signal">Try it</p>
              <h3 className="display mt-3 text-[clamp(2.6rem,5vw,5rem)]">
                One round, <em>right here.</em>
              </h3>
            </div>
            <p className="max-w-[46ch] text-[14px] leading-relaxed text-mute">
              This demo runs Python in your browser with WebAssembly, so it judges Python only and scales time limits for
              it. The real platform compiles Java, Python and C++ inside Docker sandboxes.
            </p>
          </motion.div>
          <Arena />
        </div>
      </div>
    </section>
  );
}
