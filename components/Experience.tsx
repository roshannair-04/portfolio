"use client";

import { motion, useReducedMotion } from "motion/react";

const points = [
  "Built an AI human-in-the-loop system for fair student loan approval decisions, analyzing bias across demographic groups.",
  "Applied Explainable Boosting Machines to model interpretability, processing 2,000+ records to quantify bias.",
  "Used generative AI for synthetic edge-case data, strengthening model validation and explainability pipelines.",
];

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="px-6 md:px-10 py-24 md:py-32 border-t border-line-soft">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">Experience</h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative pl-6 md:pl-8 border-l-2 border-accent/40 max-w-3xl"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
            <h3 className="text-lg font-semibold">Industry Capstone, Deloitte</h3>
            <span className="font-mono text-[11px] text-ink-faint">Nov 2025 - Jan 2026</span>
          </div>

          <ul className="mt-5 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-ink-dim text-[13.5px] leading-relaxed">
                <span className="mt-[7px] h-1 w-1 rounded-full bg-accent shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
