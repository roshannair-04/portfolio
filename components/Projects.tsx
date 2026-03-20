"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Resume Intelligence AI",
    description:
      "AI-driven system that evaluates candidate-job fit using NLP and semantic similarity. Deployed for real-time usage.",
    tech: ["Python", "NLP", "FastAPI", "Render"],
    github: "https://github.com/roshannair-04/resume-intelligence-ai",
    demo: "https://resume-intelligence-ai-1.onrender.com/"
  },
  {
    title: "AI Surveillance Detection System",
    description:
      "Real-time multi-camera system using YOLOv8, ArcFace, and InsightFace for identity recognition and threat detection (~25–30 FPS).",
    tech: ["Python", "OpenCV", "YOLOv8", "FastAPI", "PostgreSQL"],
    github: "https://github.com/your-repo",
    demo: null
  },
  {
    title: "Invisible Cloak",
    description:
      "Computer vision system using color masking and background subtraction to simulate invisibility in real-time.",
    tech: ["Python", "OpenCV", "NumPy"],
    github: "https://github.com/your-repo",
    demo: null
  }
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen px-6 md:px-20 py-20 bg-black text-white"
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-cyan-400">
        Projects
      </h2>

      {/* Grid with stagger */}
      <motion.div
        className="grid md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border border-gray-800 p-6 rounded-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300 bg-gray-900/40 backdrop-blur"
          >
            {/* Title */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                {project.title}
                {index === 0 && (
                  <span className="text-xs text-purple-400">
                    ★ Featured
                  </span>
                )}
              </h3>

              {project.demo && (
                <span className="text-xs text-green-400 animate-pulse">
                  ● Live
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Tech */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs border border-cyan-400 text-cyan-400 px-2 py-1 rounded hover:bg-cyan-400 hover:text-black transition"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 text-sm mt-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-black transition"
              >
                GitHub
              </a>

              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-cyan-500 text-black rounded hover:scale-105 transition"
                >
                  Live Demo
                </a>
              ) : (
                <span className="text-gray-500">
                  ML System (Local/GPU)
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}