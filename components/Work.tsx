"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { projects as all, type Project } from "@/lib/content";

// UWSD has its own flagship section above this gallery.
const projects = all.filter((p) => p.id !== "uwsd");
import ProjectVisual from "./ProjectVisual";

function Panel({ p }: { p: Project }) {
  return (
    <article className="grid w-full shrink-0 gap-8 lg:h-full lg:w-[78vw] lg:max-w-[1180px] lg:grid-cols-[1fr_minmax(0,0.85fr)] lg:items-center lg:gap-12 lg:pr-[6vw]">
      <div className="order-2 lg:order-1">
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-mute">
          <span>{p.index} — {p.kicker}</span>
          {p.status && <span className="rounded-full border border-hairline-strong px-2 py-0.5 text-dim">{p.status}</span>}
        </p>
        <h3 className="display mt-4 text-[clamp(3.2rem,7vw,7.5rem)]">{p.title}</h3>
        <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-body">{p.summary}</p>
        <ul className="mt-6 max-w-[52ch] space-y-2.5 border-t border-hairline pt-5">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-dim">
              <span className="mt-[9px] h-1 w-3 shrink-0 bg-signal" />
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="label text-mute">{p.year}</span>
          <span className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full bg-elevated px-2.5 py-1 font-mono text-[11px] text-dim">
                {s}
              </span>
            ))}
          </span>
        </div>
        {p.links.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-5">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center gap-1.5 border-b border-hairline-strong pb-1 text-[15px] font-medium transition-colors hover:border-signal hover:text-signal"
              >
                {l.label}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  {l.href.startsWith("#") ? "↓" : "↗"}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="order-1 flex justify-center lg:order-2 lg:h-[72vh]" data-cursor={p.id === "patternbattle" ? "play" : "view"}>
        <ProjectVisual kind={p.visual} />
      </div>
    </article>
  );
}

export default function Work() {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches && !matchMedia("(prefers-reduced-motion: reduce)").matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useLayoutEffect(() => {
    if (!wide) return;
    const measure = () => setDistance(Math.max(0, track.current!.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current!);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [wide]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(projects.length - 1, Math.round(v * (projects.length - 1)))));

  const heading = (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="label text-mute">(03) More work</p>
        <h2 className="display mt-3 text-[clamp(2.8rem,6vw,6rem)]">
          Also <em className="text-signal">shipped</em>
        </h2>
      </div>
      {wide && (
        <p className="label hidden tabular-nums text-dim lg:block">
          {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      )}
    </div>
  );

  return (
    <section id="work" ref={section} className="relative" style={wide ? { height: `calc(100vh + ${distance}px)` } : undefined}>
      {wide ? (
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-20">
          <div className="glow" />
          <div className="relative mx-auto w-full max-w-[1440px] px-10">{heading}</div>
          <motion.div ref={track} style={{ x }} className="relative flex min-h-0 flex-1 items-center gap-[6vw] py-8 pl-10 pr-[12vw] will-change-transform">
            {projects.map((p) => (
              <Panel key={p.id} p={p} />
            ))}
          </motion.div>
          <div className="relative mx-10 mb-8 h-px bg-hairline">
            <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-signal" />
          </div>
        </div>
      ) : (
        <div className="relative px-5 py-24 md:px-10">
          <div className="glow" />
          <div className="relative mx-auto max-w-[1440px]">
            {heading}
            <div className="mt-14 space-y-24">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Panel p={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
