"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";

const stats = [
  { value: "25-30", unit: "FPS", label: "real-time detection across multi-camera feeds" },
  { value: "+15", unit: "%", label: "recognition accuracy from embedding optimization" },
  { value: "3", unit: "", label: "hackathon and ideathon podium finishes" },
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-16 items-start">
        {/* IMAGE */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative w-[220px] md:w-full md:max-w-[260px] mx-auto md:mx-0 group"
        >
          <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-line bg-surface">
            <Image
              src="/profile.jpg"
              alt="Roshan Nair"
              fill
              sizes="(min-width: 768px) 260px, 220px"
              className="object-cover grayscale-[35%] contrast-[1.05] transition-[filter] duration-300 group-hover:grayscale-0"
            />
          </div>
          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <span
              key={corner}
              className={[
                "absolute w-4 h-4 border-accent/50 transition-all duration-300 group-hover:border-accent",
                corner === "tl" && "-top-1.5 -left-1.5 border-t-2 border-l-2",
                corner === "tr" && "-top-1.5 -right-1.5 border-t-2 border-r-2",
                corner === "bl" && "-bottom-1.5 -left-1.5 border-b-2 border-l-2",
                corner === "br" && "-bottom-1.5 -right-1.5 border-b-2 border-r-2",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
          <p className="mt-4 font-mono text-[11px] text-live text-center flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-live" />
            Open to work
          </p>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">About</h2>

          <p className="text-ink-dim leading-relaxed mb-4 max-w-[62ch]">
            I work on computer vision and real-time inference, finishing a B.Tech in
            Computer Science (AI &amp; ML) at Manipal University Jaipur. My focus is systems
            that hold up outside a notebook: multi-camera tracking, identity recognition, and
            inference pipelines fast enough to run live.
          </p>

          <p className="text-ink-dim leading-relaxed mb-10 max-w-[62ch]">
            Most recently I worked with Deloitte on a capstone project applying explainable
            AI to fairness in student loan decisions, using Explainable Boosting Machines and
            synthetic data to stress-test the models.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-10 pt-6 border-t border-line-soft">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-xl md:text-2xl text-accent">
                  {s.value}
                  <span className="text-sm align-top">{s.unit}</span>
                </div>
                <p className="text-[12px] text-ink-faint leading-snug mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <a
            href="#experience"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-line text-ink text-sm font-medium rounded-md hover:border-accent hover:text-accent transition-colors duration-200"
          >
            See experience <ArrowRight size={15} weight="bold" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
