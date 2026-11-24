"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { recognition, toolkit } from "@/lib/content";

export function Recognition() {
  const [hover, setHover] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 30 });
  const y = useSpring(my, { stiffness: 300, damping: 30 });
  const place = (e: React.PointerEvent, jump = false) => {
    const r = box.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    if (jump) {
      x.jump(e.clientX - r.left);
      y.jump(e.clientY - r.top);
    }
  };

  return (
    <section className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="label text-mute">(05) Recognition</p>
            <h2 className="display mt-3 text-[clamp(2.8rem,6vw,6rem)]">
              Podiums &amp; <em className="text-signal">paper</em>
            </h2>
          </div>
          <p className="label hidden text-mute md:block">Hover for the photo</p>
        </div>

        <div
          ref={box}
          className="relative border-t border-hairline-strong"
          onPointerMove={(e) => place(e)}
          onPointerLeave={() => setHover(null)}
        >
          {recognition.map((r) => (
            <div
              key={r.detail}
              onPointerEnter={(e) => {
                place(e, !hover);
                setHover(r.image);
              }}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-hairline py-6 md:grid-cols-[220px_1fr_auto] md:py-8"
            >
              <span className="label text-signal">{r.title}</span>
              <span className="order-3 col-span-2 text-[clamp(1.5rem,3.2vw,2.8rem)] leading-tight tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 md:order-none md:col-span-1">
                {r.detail}
              </span>
              <span className="label text-right text-mute">{r.where}</span>
            </div>
          ))}

          <AnimatePresence>
            {hover && (
              <motion.div
                key={hover}
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
              >
                <div className="relative -ml-36 -mt-48 h-64 w-52 overflow-hidden rounded-[12px] border border-hairline-strong shadow-2xl">
                  <Image src={hover} alt="" fill sizes="208px" className="object-cover" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function Toolkit() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  return (
    <section id="toolkit" className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-mute">(06) Toolkit</p>
          <h2 className="display mt-3 text-[clamp(2.8rem,5vw,5rem)]">
            What I <em className="text-signal">reach for</em>
          </h2>
          <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-dim">
            Most comfortable in Python. Fundamentals in C++ and SQL, and picking up Rust.
          </p>
        </div>
        <ol className="lg:col-span-8">
          {toolkit.map((t, i) => (
            <motion.li
              key={t.name}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              onPointerEnter={() => setActive(i)}
              className="grid grid-cols-[40px_1fr] items-baseline gap-x-4 border-b border-hairline py-5 md:grid-cols-[48px_1fr_auto]"
            >
              <span className="label text-stone">0{i + 1}</span>
              <span
                className={`display text-[clamp(2rem,5vw,4.6rem)] uppercase leading-none transition-[opacity,filter,color] duration-500 ${
                  reduce || active === i ? "text-ink opacity-100 blur-0" : "opacity-30 blur-[3px]"
                }`}
              >
                {t.name}
              </span>
              <span className="label col-start-2 mt-2 text-mute md:col-start-3 md:mt-0 md:text-right">{t.note}</span>
              <span
                className={`col-start-2 mt-2 font-mono text-[13px] transition-colors duration-500 md:col-span-2 ${
                  active === i ? "text-signal" : "text-stone"
                }`}
              >
                {t.tools}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
