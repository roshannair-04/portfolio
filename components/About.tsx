"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const statement =
  "Most models die in a notebook. I like the part after that: making them fast enough to run live, light enough to deploy, and clear enough that people trust what they say.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, ["blur(6px)", "blur(0px)"]);
  return (
    <motion.span style={{ opacity, filter: blur }} className="inline-block will-change-[opacity,filter]">
      {word}&nbsp;
    </motion.span>
  );
}

export function Marquee() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const items = ["Computer vision", "NLP & matching", "Real-time systems", "Explainable ML", "Live code judging"];
  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="display px-6 text-[clamp(3rem,8vw,8rem)] italic text-ink/90 md:px-10">{t}</span>
          <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0 md:h-12 md:w-12" aria-hidden="true">
            <path d="M4 10V5.5C4 4.7 4.7 4 5.5 4H10M22 4h4.5c.8 0 1.5.7 1.5 1.5V10M28 22v4.5c0 .8-.7 1.5-1.5 1.5H22M10 28H5.5C4.7 28 4 27.3 4 26.5V22" stroke="#4fbe7b" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <rect x="13.5" y="13.5" width="5" height="5" rx=".75" fill="#4fbe7b" />
          </svg>
        </span>
      ))}
    </span>
  );
  return (
    <div ref={ref} aria-hidden="true" className="relative overflow-hidden border-y border-hairline py-6 md:py-10">
      <motion.div style={{ x: reduce ? 0 : x }}>
        <div className="flex w-max animate-[marquee_38s_linear_infinite]">
          {row}
          {row}
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = statement.split(" ");

  return (
    <section id="about" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <p className="label mb-10 text-mute">(01) About</p>
        <p ref={ref} className="display max-w-[22ch] text-[clamp(2.4rem,5.6vw,5.6rem)] leading-[1.02]">
          {reduce
            ? statement
            : words.map((w, i) => (
                <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
              ))}
        </p>

        <div className="mt-20 grid gap-10 border-t border-hairline pt-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-3">
            <p className="label text-mute">Education</p>
            <p className="mt-2 text-[16px] leading-relaxed text-body">
              B.Tech, Computer Science &amp; Engineering (AI &amp; ML)
              <br />
              Manipal University Jaipur, 2023–2027
            </p>
          </div>
          <div className="md:col-span-4">
            <p className="label text-mute">Right now</p>
            <p className="mt-2 text-[16px] leading-relaxed text-body">
              Co-founder at Engineek, a four-person team. We’re building PatternBattle, a platform for learning DSA by
              pattern and battling friends in real time.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <figure className="group relative aspect-[4/5] overflow-hidden rounded-[12px] border border-hairline-strong" data-cursor="hi">
              <Image
                src="/img/selfie-hills.webp"
                alt="Roshan taking a selfie in the hills"
                fill
                sizes="(min-width:768px) 30vw, 92vw"
                className="object-cover grayscale transition-[filter,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:grayscale-0"
              />
              <figcaption className="label absolute bottom-3 left-3 text-ink/80">Fig. 02 — Hills over hackathons, sometimes</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
