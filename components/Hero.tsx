"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

const lines = [
  <>I build AI that</>,
  <>
    <em className="text-signal">sees</em>, <em className="text-signal">ranks</em>
  </>,
  <>
    &amp; <em className="text-signal">keeps score.</em>
  </>,
];

const meta = [
  ["Based", site.city],
  ["Studying", "B.Tech CSE (AI & ML), MUJ ’27"],
  ["Focus", "Computer vision, NLP, real-time systems"],
  ["Open to", "Internships & full-time roles"],
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  useEffect(() => {
    // Wait for the loader curtain on a first visit.
    const t = setTimeout(() => setReady(true), sessionStorage.getItem("seen") ? 150 : 2150);
    return () => clearTimeout(t);
  }, []);

  const show = reduce || ready;

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-center justify-between md:mb-12">
          <span className="label text-mute">(00) Portfolio — 2026</span>
          <span className="label flex items-center gap-2 text-dim">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-signal" />
            </span>
            Open to work
          </span>
        </div>

        <motion.h1 style={{ y: reduce ? 0 : textY }} className="display relative z-10 text-[clamp(3.3rem,9.4vw,10rem)]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%" }}
                animate={show ? { y: "0%" } : undefined}
                transition={{ duration: 1.1, delay: 0.08 * i, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="lg:col-span-6 lg:pt-6"
          >
            <p className="max-w-[34ch] text-[19px] leading-[1.45] text-body md:text-[21px]">
              I’m Roshan, a final-year CS (AI &amp; ML) student who ships real-time systems: cameras that recognise
              people, matchers that read resumes, and a coding arena that judges your code live.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-hairline pt-6 md:max-w-[560px]">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-mute">{k}</dt>
                  <dd className="mt-1.5 text-[15px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#uwsd" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-black transition-colors hover:bg-signal">
                See the work <span aria-hidden="true">↓</span>
              </a>
            </div>
          </motion.div>

          <motion.figure
            initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
            animate={show ? { clipPath: "inset(0% 0 0 0)" } : undefined}
            transition={{ duration: 1.3, delay: 0.2, ease }}
            className="relative lg:col-span-5 lg:col-start-8 lg:-mt-[31vw]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[12px] border border-hairline-strong bg-surface">
              <motion.div style={{ y: reduce ? 0 : photoY }} className="absolute inset-[-6%_0]">
                <Image src="/img/portrait.webp" alt="Roshan standing on a hillside above a forested valley" fill priority sizes="(min-width:1024px) 40vw, 92vw" className="object-cover" />
                {/* Detection overlay: placed on the face an OpenCV pass found in this photo */}
                <div className="absolute left-[33.5%] top-[53.5%] h-[12%] w-[16.5%] animate-[track_5s_ease-in-out_infinite] reticle">
                  <span className="label absolute -top-6 left-0 whitespace-nowrap bg-signal px-1.5 py-0.5 text-[10px] text-black">
                    subject: roshan
                  </span>
                </div>
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-4 pt-16">
                <span className="label text-ink/80">cam_01 · live</span>
                <span className="label flex items-center gap-1.5 text-ink/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-danger animate-[blink_1.2s_steps(2)_infinite]" /> rec
                </span>
              </div>
            </div>
            <figcaption className="label mt-3 flex justify-between text-mute">
              <span>Fig. 01 — Off-duty</span>
              <span>Face box: OpenCV</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
      <style>{`@keyframes track{0%,100%{transform:translate(0,0)}30%{transform:translate(2%,-3%)}60%{transform:translate(-3%,2%)}}`}</style>
    </section>
  );
}
