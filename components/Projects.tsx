"use client";

import { motion, useReducedMotion } from "motion/react";
import { GithubLogo, ArrowUpRight } from "@phosphor-icons/react";

const projects = [
  {
    title: "AI Surveillance Detection System",
    description:
      "Real-time multi-camera detection and tracking system using YOLOv8, ArcFace, and InsightFace for identity recognition, with cross-camera geo-mapping and automated alerting over WebSockets.",
    tech: ["YOLOv8", "ArcFace", "InsightFace", "OpenCV", "FastAPI", "PostgreSQL"],
    github: "https://github.com/roshannair-04/delhack",
    demo: null,
    metric: "25-30 FPS",
    featured: true,
  },
  {
    title: "Alignyx",
    description:
      "Resume-to-job matching system using NLP and semantic similarity, with a real-time inference API for candidate ranking.",
    tech: ["Python", "NLP", "FastAPI"],
    github: "https://github.com/roshannair-04/resume-intelligence-ai",
    demo: "https://resume-intelligence-ai-1.onrender.com/",
    metric: null,
    featured: false,
  },
  {
    title: "Invisible Cloak",
    description:
      "Real-time color masking and background subtraction to simulate invisibility, stable across varying lighting conditions.",
    tech: ["Python", "OpenCV", "NumPy"],
    github: "https://github.com/roshannair-04/hp",
    demo: null,
    metric: "30 FPS",
    featured: false,
  },
];

function CornerFrame() {
  return (
    <>
      {(["tl", "tr", "bl", "br"] as const).map((corner) => (
        <span
          key={corner}
          className={[
            "pointer-events-none absolute w-3.5 h-3.5 border-accent/0 transition-colors duration-300 group-hover:border-accent/70",
            corner === "tl" && "top-3 left-3 border-t-2 border-l-2",
            corner === "tr" && "top-3 right-3 border-t-2 border-r-2",
            corner === "bl" && "bottom-3 left-3 border-b-2 border-l-2",
            corner === "br" && "bottom-3 right-3 border-b-2 border-r-2",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="px-6 md:px-10 py-24 md:py-32 border-t border-line-soft">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">Projects</h2>

        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`group relative border border-line rounded-md p-7 bg-surface hover:border-line hover:bg-surface-2 transition-colors duration-300 flex flex-col ${
                project.featured ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
              }`}
            >
              <CornerFrame />

              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
                {project.metric && (
                  <span className="shrink-0 font-mono text-[11px] text-accent border border-accent/30 rounded px-1.5 py-0.5">
                    {project.metric}
                  </span>
                )}
              </div>

              <p className="text-ink-dim text-[13.5px] leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10.5px] text-ink-faint border border-line-soft rounded px-1.5 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-4 text-[13px]">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-dim hover:text-ink transition-colors"
                >
                  <GithubLogo size={15} /> Code
                </a>

                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-live hover:text-accent-soft transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-live" />
                    Live demo <ArrowUpRight size={13} weight="bold" />
                  </a>
                ) : (
                  <span className="text-ink-faint">GPU inference, not deployed</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
