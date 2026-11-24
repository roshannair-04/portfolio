"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { useClock } from "./Header";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const time = useClock();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${site.email}`;
    }
  };

  return (
    <footer id="contact" className="relative z-10 overflow-hidden px-5 pb-8 pt-32 md:px-10 md:pt-44">
      <div className="glow" />
      <div className="relative mx-auto max-w-[1440px]">
        <p className="label text-mute">(07) Let’s work together</p>
        <p className="mt-5 max-w-[40ch] text-[17px] text-dim">
          Looking for internships and full-time roles in AI, ML and data. Collaborations welcome too.
        </p>

        <button onClick={copy} data-cursor={copied ? "copied" : "copy"} className="group mt-10 block w-full text-left" aria-label={`Copy ${site.email}`}>
          <span className="display block break-all text-[clamp(2.4rem,8.4vw,9rem)] leading-[0.95] transition-colors duration-300 group-hover:text-signal">
            {site.email.split("@")[0]}
            <em className="text-mute transition-colors duration-300 group-hover:text-signal">@gmail.com</em>
          </span>
          <span className="label mt-4 block text-mute">{copied ? "Copied. Talk soon." : "Click to copy"}</span>
        </button>

        <div className="mt-14 flex flex-wrap gap-3">
          {[
            ["LinkedIn", site.linkedin],
            ["GitHub", site.github],
            ["Email", `mailto:${site.email}`],
          ].map(([l, h]) => (
            <a
              key={l}
              href={h}
              {...(h.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline-strong px-5 text-[15px] transition-colors hover:border-signal hover:text-signal"
            >
              {l} <span aria-hidden="true">↗</span>
            </a>
          ))}
          <a href={site.resume} download className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-[15px] font-medium text-black transition-colors hover:bg-signal">
            Download résumé
          </a>
        </div>

        <div className="label mt-28 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6 text-mute">
          <span>Designed &amp; built by {site.name}</span>
          <span className="tabular-nums">Kollam, {time.slice(0, 5)} IST</span>
          <a href="#top" className="hover:text-ink">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
