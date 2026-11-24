"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/content";

const nav = [
  { href: "#about", label: "About" },
  { href: "#uwsd", label: "Work" },
  { href: "#toolkit", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function useClock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: site.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Header() {
  const time = useClock();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 border-b ${
          scrolled && !open ? "bg-black/70 backdrop-blur-xl border-hairline" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="group flex items-center gap-3" aria-label="Roshan M Nair, back to top">
            <svg viewBox="0 0 32 32" className="h-6 w-6 transition-transform duration-500 group-hover:rotate-90" aria-hidden="true">
              <path d="M4 10V5.5C4 4.7 4.7 4 5.5 4H10M22 4h4.5c.8 0 1.5.7 1.5 1.5V10M28 22v4.5c0 .8-.7 1.5-1.5 1.5H22M10 28H5.5C4.7 28 4 27.3 4 26.5V22" stroke="currentColor" className="text-signal" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <rect x="13.5" y="13.5" width="5" height="5" rx=".75" className="fill-signal" />
            </svg>
            <span className="text-[14px] font-medium tracking-tight">{site.name}</span>
            <span className="hidden text-[14px] text-mute lg:inline">{site.role}</span>
          </a>

          <p className="label hidden text-mute md:block" aria-label="Local time in Kollam">
            Kollam — <span className="tabular-nums text-ink">{time || "--:--:--"}</span> IST
          </p>

          <nav className="flex items-center gap-1">
            <ul className="hidden items-center lg:flex">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="px-3 py-2 text-[14px] text-dim transition-colors hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.resume}
              download
              className="ml-2 hidden h-9 items-center rounded-full bg-ink px-4 text-[14px] font-medium text-black transition-colors hover:bg-signal sm:inline-flex"
            >
              Résumé
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="ml-2 flex h-9 items-center gap-2 rounded-full border border-hairline-strong px-4 text-[14px] lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-canvas px-5 pb-10 pt-24"
          >
            <ul>
              {nav.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-hairline"
                >
                  <a href={n.href} onClick={() => setOpen(false)} className="display flex items-baseline gap-4 py-3 text-[15vw] sm:text-7xl">
                    <span className="label text-mute">0{i + 1}</span>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between">
              <a href={site.resume} download className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-[15px] font-medium text-black">
                Download résumé
              </a>
              <span className="label tabular-nums text-mute">{time} IST</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
