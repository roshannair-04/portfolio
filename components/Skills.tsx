"use client";

import { motion, useReducedMotion } from "motion/react";

const skills = {
  Languages: ["Python", "C++", "SQL"],
  "Computer vision": ["YOLOv8", "ArcFace", "InsightFace", "OpenCV"],
  Libraries: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
  "Backend & tools": ["FastAPI", "PostgreSQL", "Git", "Render"],
  Domains: ["Real-time inference", "Identity recognition", "NLP"],
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="px-6 md:px-10 py-24 md:py-32 border-t border-line-soft">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">Skills</h2>

        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft rounded-md overflow-hidden"
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              variants={reduce ? undefined : item}
              transition={{ duration: 0.4 }}
              className="bg-surface p-6 hover:bg-surface-2 transition-colors duration-200"
            >
              <h3 className="font-mono text-[11px] tracking-wide uppercase text-ink-faint mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[12.5px] text-ink-dim border border-line rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
