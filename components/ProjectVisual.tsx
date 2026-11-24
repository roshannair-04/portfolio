"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

// Face boxes from an OpenCV pass over the hackathon photo (percent of width/height).
const faces = [
  { x: 21.0, y: 28.0, w: 8.6, h: 6.4, label: "p1" },
  { x: 41.2, y: 26.8, w: 9.0, h: 6.8, label: "p2" },
  { x: 58.3, y: 27.3, w: 8.4, h: 6.3, label: "p3" },
  { x: 75.2, y: 22.8, w: 9.2, h: 6.9, label: "match · roshan", me: true },
];

export function Uwsd() {
  const reduce = useReducedMotion();
  return (
    <div className="relative aspect-[3/4] h-full max-h-full overflow-hidden rounded-[12px] border border-hairline-strong bg-surface">
      <Image src="/img/team-hackathon.webp" alt="Team UWSD holding the Smart Campus Hackathon cheque" fill sizes="(min-width:1024px) 30vw, 92vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/25" />
      {!reduce && (
        <motion.div
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-signal/25 to-transparent"
          initial={{ top: "-15%" }}
          whileInView={{ top: "110%" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6, ease: "linear" }}
        />
      )}
      {faces.map((f, i) => (
        <motion.div
          key={f.label}
          className={`absolute reticle ${f.me ? "" : "[--c:rgb(255_255_255/0.85)]"}`}
          style={{ left: `${f.x - 1}%`, top: `${f.y - 1}%`, width: `${f.w + 2}%`, height: `${f.h + 2}%` }}
          initial={reduce ? false : { opacity: 0, scale: 1.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.35 + i * 0.28, duration: 0.5, ease }}
        >
          <span className={`label absolute -top-5 left-0 whitespace-nowrap px-1 text-[9px] ${f.me ? "bg-signal text-black" : "bg-black/70 text-ink"}`}>
            {f.label}
          </span>
        </motion.div>
      ))}
      <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
        <span className="label text-ink/80">cam_03 · courtyard</span>
        <span className="label text-signal">1 match → alert sent</span>
      </div>
    </div>
  );
}

function Shortlist() {
  const reduce = useReducedMotion();
  const skills = [
    ["Python", true],
    ["FastAPI", true],
    ["NLP", true],
    ["Docker", true],
    ["Kubernetes", false],
    ["SQL", true],
  ] as const;
  return (
    <div className="flex aspect-[4/5] h-full max-h-full flex-col justify-between rounded-[12px] border border-hairline-strong bg-surface p-6">
      <div className="flex items-center justify-between">
        <span className="label text-mute">resume.pdf ⇄ job_post.txt</span>
        <span className="label text-mute">sample</span>
      </div>
      <div className="relative mx-auto my-6 aspect-square w-[58%]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgb(255 255 255 / .08)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="44" fill="none" stroke="#4fbe7b" strokeWidth="6" strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 0.83 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, ease }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="display text-[clamp(2rem,3.4vw,3.2rem)]">Strong fit</span>
          <span className="label mt-1 text-mute">semantic + skills</span>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {skills.map(([s, ok], i) => (
          <motion.li
            key={s}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className={`rounded-full border px-3 py-1 font-mono text-[12px] ${ok ? "border-signal/50 text-signal" : "border-hairline-strong text-mute line-through"}`}
          >
            {s}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Cadence() {
  const reduce = useReducedMotion();
  // Recall decays exponentially; each review resets it and the next decay is slower.
  const pts: string[] = [];
  const reviews = [0, 22, 52, 92];
  for (let x = 0; x <= 100; x += 1) {
    const k = reviews.filter((r) => r <= x).length - 1;
    const since = x - reviews[k];
    const y = 100 * Math.exp(-since / (14 + k * 22));
    pts.push(`${x},${(100 - y * 0.9).toFixed(2)}`);
  }
  return (
    <div className="flex aspect-[4/5] h-full max-h-full flex-col justify-between rounded-[12px] border border-hairline-strong bg-surface p-6">
      <div className="flex items-center justify-between">
        <span className="label text-mute">recall ↓ time →</span>
        <span className="label text-signal">review now</span>
      </div>
      <svg viewBox="-2 -4 104 110" className="my-4 w-full flex-1" preserveAspectRatio="none" aria-hidden="true">
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgb(255 255 255 / .06)" strokeWidth=".4" />
        ))}
        <polygon points={`0,100 ${pts.join(" ")} 100,100`} fill="rgb(79 190 123 / .08)" />
        <motion.polyline
          points={pts.join(" ")}
          fill="none"
          stroke="#4fbe7b"
          strokeWidth="0.9"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {reviews.slice(1).map((r) => (
          <circle key={r} cx={r} cy="10" r="1.6" fill="#fcfdff" />
        ))}
      </svg>
      <div className="grid grid-cols-3 gap-3 border-t border-hairline pt-4">
        {[
          ["574", "questions"],
          ["7", "course files"],
          ["0", "LLM calls"],
        ].map(([n, l]) => (
          <div key={l}>
            <div className="display text-[clamp(1.8rem,3vw,2.8rem)]">{n}</div>
            <div className="label mt-1 text-mute">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stream() {
  const reduce = useReducedMotion();
  return (
    <div className="flex aspect-[4/5] h-full max-h-full flex-col rounded-[12px] border border-hairline-strong bg-surface p-6">
      <div className="flex items-center justify-between">
        <span className="label text-mute">webcam → pose → trigger</span>
        <span className="label text-warn">building</span>
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <svg viewBox="0 0 120 160" className="h-[70%]" aria-hidden="true">
          <g stroke="#fcfdff" strokeWidth="3" strokeLinecap="round" fill="none">
            <circle cx="60" cy="34" r="16" />
            <line x1="60" y1="50" x2="60" y2="104" />
            <line x1="60" y1="104" x2="44" y2="150" />
            <line x1="60" y1="104" x2="76" y2="150" />
            <line x1="60" y1="62" x2="90" y2="80" />
            <line x1="90" y1="80" x2="96" y2="110" />
            <g className={reduce ? "" : "animate-[facepalm_2.6s_ease-in-out_infinite]"} style={{ transformBox: "view-box", transformOrigin: "60px 62px" }}>
              <line x1="60" y1="62" x2="34" y2="84" />
              <line x1="34" y1="84" x2="30" y2="112" />
            </g>
          </g>
          {[[60, 34], [60, 62], [90, 80], [60, 104]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="3.2" fill="#4fbe7b" />
          ))}
        </svg>
        <motion.div
          className="absolute right-0 top-6 rounded-[8px] border border-signal/50 bg-black px-3 py-2 font-mono text-[12px] text-signal"
          animate={reduce ? undefined : { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, -4] }}
          transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.3, 0.38, 0.75, 0.9] }}
        >
          <style>{`@keyframes facepalm{0%,100%{transform:rotate(0)}30%,75%{transform:rotate(118deg)}}`}</style>
          FACEPALM detected
          <br />→ overlay + sfx
        </motion.div>
      </div>
      <div className="flex items-center justify-between border-t border-hairline pt-4 font-mono text-[12px] text-mute">
        <span>OBS · WebSocket</span>
        <span>React + Python</span>
      </div>
    </div>
  );
}

function PatternBattle() {
  const code = [
    ["left, right = 0, n - 1", ""],
    ["while left < right:", ""],
    ["    if c[left] + c[right] <= budget:", ""],
    ["        count += right - left", "text-signal"],
    ["        left += 1", ""],
    ["    else:", ""],
    ["        right -= 1", ""],
  ];
  return (
    <div className="flex aspect-[4/5] h-full max-h-full flex-col rounded-[12px] border border-hairline-strong bg-deep">
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-danger" />
        <span className="h-2.5 w-2.5 rounded-full bg-warn" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal" />
        <span className="ml-3 font-mono text-[12px] text-mute">relay_pair_budget.py</span>
      </div>
      <pre className="flex-1 overflow-hidden p-5 font-mono text-[clamp(11px,1vw,14px)] leading-[1.8] text-body">
        {code.map(([l, c], i) => (
          <div key={i} className={c}>
            <span className="mr-4 inline-block w-4 text-right text-stone">{i + 1}</span>
            {l}
          </div>
        ))}
      </pre>
      <ul className="mx-4 space-y-1 font-mono text-[12px]">
        {[
          ["01", "you", "Accepted", "text-signal"],
          ["02", "player_2", "Wrong Answer", "text-danger"],
          ["03", "player_3", "judging…", "text-warn"],
        ].map(([r, n, v, c]) => (
          <li key={r} className="flex items-center justify-between border-t border-hairline py-2">
            <span className="text-mute">{r} <span className="ml-2 text-body">{n}</span></span>
            <span className={c}>{v}</span>
          </li>
        ))}
      </ul>
      <div className="m-4 flex items-center justify-between rounded-[8px] border border-signal/40 bg-signal/10 px-4 py-3">
        <span className="display text-[28px] italic text-signal">Accepted</span>
        <span className="font-mono text-[12px] text-signal">your turn ↓</span>
      </div>
    </div>
  );
}

export default function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  switch (kind) {
    case "uwsd":
      return <Uwsd />;
    case "shortlist":
      return <Shortlist />;
    case "cadence":
      return <Cadence />;
    case "stream":
      return <Stream />;
    case "patternbattle":
      return <PatternBattle />;
  }
}
