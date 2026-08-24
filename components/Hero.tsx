"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex items-center px-6 md:px-10 pt-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-[1.25fr_1fr] gap-14 md:gap-10 items-center py-20">
        {/* TEXT */}
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-wide text-ink-faint mb-6 flex items-center gap-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-live opacity-75 animate-ping [animation-duration:2s]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
            </span>
            STATUS: OPEN TO WORK
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[2.6rem] leading-[1.08] md:text-6xl md:leading-[1.05] font-semibold tracking-tight text-balance mb-6"
          >
            Real-time systems for <span className="text-accent">computer vision</span>.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-ink-dim text-[15.5px] leading-relaxed max-w-[46ch] mb-9"
          >
            I build detection, tracking, and identity recognition systems that run in real
            time, from research notebook to production inference.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-graphite text-sm font-medium rounded-md hover:bg-accent-soft transition-colors duration-200"
            >
              View work <ArrowUpRight size={15} weight="bold" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-line text-ink text-sm font-medium rounded-md hover:border-accent hover:text-accent transition-colors duration-200"
            >
              Resume <DownloadSimple size={15} weight="bold" />
            </a>
          </motion.div>
        </div>

        {/* FRAMED PORTRAIT */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto md:mx-0 md:ml-auto w-[260px] md:w-[300px] group"
        >
          <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-line bg-surface">
            <Image
              src="/profile.jpg"
              alt="Roshan Nair"
              fill
              priority
              sizes="(min-width: 768px) 300px, 260px"
              className="object-cover grayscale-[35%] contrast-[1.05] transition-[filter] duration-300 group-hover:grayscale-0"
            />
            {!reduce && (
              <span className="pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-[scan_2.6s_ease-out_0.5s_1_both]" />
            )}
          </div>

          {/* corner brackets */}
          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <span
              key={corner}
              className={[
                "absolute w-4 h-4 border-accent/50 transition-all duration-300 group-hover:border-accent",
                corner === "tl" && "-top-1.5 -left-1.5 border-t-2 border-l-2 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5",
                corner === "tr" && "-top-1.5 -right-1.5 border-t-2 border-r-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                corner === "bl" && "-bottom-1.5 -left-1.5 border-b-2 border-l-2 group-hover:-translate-x-0.5 group-hover:translate-y-0.5",
                corner === "br" && "-bottom-1.5 -right-1.5 border-b-2 border-r-2 group-hover:translate-x-0.5 group-hover:translate-y-0.5",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}

          <p className="mt-4 font-mono text-[11px] text-ink-faint text-center">
            Kollam, Kerala &nbsp;/&nbsp; B.Tech CSE (AI &amp; ML)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
