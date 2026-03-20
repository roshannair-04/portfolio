"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-8 md:px-20 py-20"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT — IMAGE */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-xl opacity-70"></div>

          {/* Badge */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
            <div className="bg-green-500 text-black text-xs px-3 py-1 rounded-full shadow-lg">
              ● Open to Work
            </div>
          </div>

          {/* Image */}
          <Image
            src="/profile.jpg"
            alt="Rosh"
            width={300}
            height={300}
            className="relative rounded-xl border border-gray-800 object-cover w-[320px] h-[360px] transition duration-300 group-hover:scale-105"
          />
        </motion.div>

        {/* RIGHT — TEXT */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
            About Me
          </h2>

          <p className="text-gray-400 leading-relaxed mb-4">
            I build AI systems that don’t just run — they scale, adapt, and solve real-world problems.
          </p>

          <p className="text-gray-500 mb-6">
            I work on computer vision, real-time inference, and backend systems,
            aiming to build scalable and impactful AI solutions.
          </p>

          <a
            href="/resume.pdf"
            download
            className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Download Resume
          </a>
        </motion.div>

      </div>
    </section>
  );
}