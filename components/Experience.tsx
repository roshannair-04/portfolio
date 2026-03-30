"use client";

import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen px-8 md:px-20 py-20"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-10 text-cyan-400"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Work Experience
      </motion.h2>

      <motion.div
        className="border border-gray-800 p-6 rounded-xl bg-white/5 backdrop-blur-lg hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <h3 className="text-xl font-semibold">
          Industry Capstone Project —{" "}
          <span className="text-cyan-400">Deloitte</span>
          <span className="ml-2 text-xs text-green-400">● Industry</span>
        </h3>

        {/* Duration */}
        <p className="text-gray-500 text-sm mb-4">
          Nov 2025 – Jan 2026
        </p>

        {/* Points */}
        <ul className="space-y-3 text-gray-400">
          <li>
            • Developed an AI Human-in-the-Loop system for fair student loan
            decision-making, analyzing bias across demographic groups and
            improving fairness metrics.
          </li>

          <li>
            • Processed datasets with 2,000+ records and evaluated interpretable
            models such as Explainable Boosting Machines (EBM) to quantify bias.
          </li>

          <li>
            • Leveraged generative AI for synthetic data generation, automated
            testing, and model validation to enhance robustness and explainability.
          </li>
        </ul>
      </motion.div>
    </section>
  );
}