"use client";

import { motion, useReducedMotion } from "motion/react";

const achievements = [
  {
    title: "2nd place, Smart Campus Hackathon",
    meta: "South Asian University, 2026",
  },
  {
    title: "3rd place, AI-Powered Solution Expo",
    meta: "Manipal University Jaipur, Apr 2026",
  },
  {
    title: "3rd place, Bootcamp '20 and Ideathon '25",
    meta: "Competitive innovation events",
  },
  {
    title: "Introduction to Machine Learning",
    meta: "NPTEL, IIT Madras",
  },
  {
    title: "Deep Learning",
    meta: "NPTEL, IIT Madras",
  },
  {
    title: "Deloitte Capstone Program",
    meta: "2025",
  },
];

export default function Achievements() {
  const reduce = useReducedMotion();

  return (
    <section id="achievements" className="px-6 md:px-10 py-24 md:py-32 border-t border-line-soft">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">Achievements</h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl divide-y divide-line-soft border-t border-line-soft"
        >
          {achievements.map((a) => (
            <div key={a.title} className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 py-4">
              <span className="text-[14.5px] text-ink">{a.title}</span>
              <span className="font-mono text-[11px] text-ink-faint whitespace-nowrap">{a.meta}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
