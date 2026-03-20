"use client";

import { motion } from "framer-motion";
import ParticlesBg from "../components/ParticlesBg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 -z-10" />
      {/* PARTICLES BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticlesBg />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Hi, I'm <span className="text-cyan-400">Roshan Nair</span>
        </motion.h1>

        <p className="text-gray-400 max-w-xl mb-6">
          I build intelligent systems using AI/ML and modern web technologies.
        </p>

        <div className="flex gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-cyan-500 text-black rounded-lg hover:scale-105 transition duration-300"
          >
            View Projects
          </a>

          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition duration-300"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}