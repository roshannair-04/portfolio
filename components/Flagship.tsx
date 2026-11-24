"use client";

import { motion, useReducedMotion } from "motion/react";
import { Uwsd } from "./ProjectVisual";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  ["Detect", "YOLOv8 finds every person in every frame, across multiple camera feeds."],
  ["Track", "Object tracking keeps one identity per person and correlates them across cameras."],
  ["Recognise", "ArcFace / InsightFace turn each face into an embedding."],
  ["Match", "PostgreSQL + pgvector similarity search checks embeddings against the watchlist."],
  ["Alert", "FastAPI and WebSockets push the threat event to security in real time."],
];

const stack = ["YOLOv8", "ArcFace", "InsightFace", "OpenCV", "PostgreSQL", "pgvector", "FastAPI", "WebSockets"];

export default function Flagship() {
  const reduce = useReducedMotion();
  const fade = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.9, delay: d, ease },
  });

  return (
    <section id="uwsd" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="glow" />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="label text-mute">(02) Flagship project</p>
          <span className="label rounded-full border border-signal/50 px-3 py-1 text-signal">
            2nd place · Smart Campus Hackathon 2026
          </span>
        </div>

        <motion.h2 {...fade()} className="display mt-6 text-[clamp(5rem,20vw,19rem)] leading-[0.8]">
          UWSD
        </motion.h2>
        <motion.p {...fade(0.05)} className="display mt-4 text-[clamp(1.6rem,3vw,2.8rem)] italic text-dim">
          Unidentified &amp; Wanted Surveillance Detection
        </motion.p>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div {...fade(0.1)} className="lg:col-span-5" data-cursor="scan">
            <div className="mx-auto max-w-[520px] lg:sticky lg:top-24">
              <Uwsd />
              <p className="label mt-3 flex justify-between text-mute">
                <span>Fig. 03 — The team that built it</span>
                <span>Boxes: OpenCV</span>
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-6 lg:col-start-7">
            <motion.p {...fade(0.15)} className="text-[19px] leading-[1.5] text-body md:text-[22px]">
              An autonomous campus-safety system. It watches camera feeds, detects and tracks people, recognises
              identities against a watchlist and alerts security the moment a match appears. My major project, and
              the one that took us to the podium at South Asian University.
            </motion.p>

            <ol className="mt-12 border-t border-hairline-strong">
              {steps.map(([t, d], i) => (
                <motion.li
                  key={t}
                  {...fade(i * 0.06)}
                  className="group grid grid-cols-[48px_1fr] gap-x-4 border-b border-hairline py-5 md:grid-cols-[56px_180px_1fr]"
                >
                  <span className="label pt-2 text-stone transition-colors group-hover:text-signal">0{i + 1}</span>
                  <span className="display text-[clamp(1.8rem,3vw,2.6rem)] leading-none">{t}</span>
                  <span className="col-start-2 mt-2 text-[15px] leading-relaxed text-dim md:col-start-3 md:mt-0 md:pt-1">{d}</span>
                </motion.li>
              ))}
            </ol>

            <motion.div {...fade()} className="mt-10 rounded-[12px] border border-hairline-strong bg-surface p-6">
              <p className="label flex items-center gap-2 text-warn">
                <span className="h-1.5 w-1.5 rounded-full bg-warn" /> Next up
              </p>
              <p className="mt-3 text-[17px] leading-relaxed text-body">
                Operator-confirmed drone tailing: once a guard confirms an alert, a drone follows the flagged person and
                then returns to its dock on its own.
              </p>
            </motion.div>

            <motion.div {...fade()} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <span className="flex flex-wrap gap-1.5">
                {stack.map((s) => (
                  <span key={s} className="rounded-full bg-elevated px-2.5 py-1 font-mono text-[11px] text-dim">
                    {s}
                  </span>
                ))}
              </span>
              <a
                href="https://github.com/roshannair-04/delhack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-black transition-colors hover:bg-signal"
              >
                Code on GitHub <span aria-hidden="true">↗</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
