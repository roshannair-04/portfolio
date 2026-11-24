"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* ---------- problem: Relay Pair Budget (PatternBattle's original two-pointers question) ---------- */

const STARTER = `import sys

def solve():
    data = sys.stdin.read().split()
    n, budget = int(data[0]), int(data[1])
    costs = list(map(int, data[2:2 + n]))

    count = 0
    # Count pairs i < j with costs[i] + costs[j] <= budget
    for i in range(n):
        for j in range(i + 1, n):
            if costs[i] + costs[j] <= budget:
                count += 1
    print(count)

solve()
`;

const HINTS = [
  "Start by considering the cheapest and most expensive remaining stations.",
  "If those two fit, the cheapest station also fits with every remaining station between them.",
  "Use a counter. Add right - left when the pair fits, then move left; otherwise move right.",
];

type Case = { input: string; expected: string; label: string; show: boolean; limit: number };

const SAMPLES: Case[] = [
  { input: "5 7\n1 2 3 5 6\n", expected: "6", label: "Sample 1", show: true, limit: 2500 },
  { input: "4 4\n2 2 2 2\n", expected: "6", label: "Sample 2", show: true, limit: 2500 },
];

function count(costs: number[], budget: number) {
  let l = 0, r = costs.length - 1, c = 0;
  while (l < r) {
    if (costs[l] + costs[r] <= budget) { c += r - l; l++; } else r--;
  }
  return c;
}
function brute(costs: number[], budget: number) {
  let c = 0;
  for (let i = 0; i < costs.length; i++) for (let j = i + 1; j < costs.length; j++) if (costs[i] + costs[j] <= budget) c++;
  return c;
}
const mk = (costs: number[], budget: number, label: string, show = true, limit = 2500): Case => ({
  input: `${costs.length} ${budget}\n${costs.join(" ")}\n`,
  expected: String(costs.length > 3000 ? count(costs, budget) : brute(costs, budget)),
  label,
  show,
  limit,
});
const rand = (n: number, max: number) => Array.from({ length: n }, () => Math.floor(Math.random() * (max + 1))).sort((a, b) => a - b);

function buildTests(): Case[] {
  const t: Case[] = [
    ...SAMPLES,
    mk([5, 6], 3, "Nothing fits"),
    mk([3, 4], 7, "Exactly on budget"),
    mk([0, 0, 0, 0, 0], 0, "All zero"),
    mk([1, 1, 2, 2, 3, 3, 9], 4, "Duplicates"),
    mk([1, 2, 3, 4, 5, 6, 7, 8], 1000, "Everything fits"),
  ];
  for (let i = 0; i < 12; i++) {
    const n = 2 + Math.floor(Math.random() * 60);
    t.push(mk(rand(n, 100), Math.floor(Math.random() * 200), `Random ${i + 1}`));
  }
  t.push(mk(rand(100000, 1000000), 1000000, "Large: n = 100,000", false, 4000));
  return t;
}

/* ---------- judge worker wrapper ---------- */

type Result = { stdout: string; kind: string; err: string; ms: number };
type Row = { label: string; status: "pass" | "fail" | "tle" | "error"; ms?: number; detail?: string };
type Verdict = { title: string; tone: "ok" | "bad"; note: string };

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function Arena() {
  const worker = useRef<Worker | null>(null);
  const pending = useRef<Map<number, (r: Result) => void>>(new Map());
  const seq = useRef(0);
  const [judge, setJudge] = useState<"off" | "loading" | "ready" | "error">("off");
  const [started, setStarted] = useState(false);
  const [code, setCode] = useState(STARTER);
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [hints, setHints] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [won, setWon] = useState<{ time: number; score: number } | null>(null);
  const gutter = useRef<HTMLDivElement>(null);

  const score = Math.max(40, 100 - Math.floor(elapsed / 6) - hints * 15);

  useEffect(() => () => worker.current?.terminate(), []);

  useEffect(() => {
    if (!started) return;
    try {
      localStorage.setItem("pb-draft", code);
    } catch {}
  }, [code, started]);

  useEffect(() => {
    if (!started || won) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [started, won]);

  const ready = useRef<Promise<void> | null>(null);

  const boot = useCallback(() => {
    worker.current?.terminate();
    setJudge("loading");
    const w = new Worker("/pb-judge.js", { type: "module" });
    worker.current = w;
    const p = new Promise<void>((resolve, reject) => {
      w.onmessage = ({ data }) => {
        if (data.type === "ready") {
          setJudge("ready");
          resolve();
        } else if (data.type === "fatal") {
          setJudge("error");
          reject(new Error(data.message));
        } else if (data.type === "result") {
          pending.current.get(data.id)?.(data);
          pending.current.delete(data.id);
        }
      };
      w.postMessage({ type: "init" });
    });
    ready.current = p;
    p.catch(() => (ready.current = null));
    return p;
  }, []);

  const start = async () => {
    try {
      const saved = localStorage.getItem("pb-draft");
      if (saved) setCode(saved);
    } catch {}
    setStarted(true);
    try {
      await boot();
    } catch {}
  };

  const runOne = (c: Case) =>
    new Promise<Result | "tle">((resolve) => {
      const id = ++seq.current;
      const timer = setTimeout(() => {
        pending.current.delete(id);
        resolve("tle");
      }, c.limit);
      pending.current.set(id, (r) => {
        clearTimeout(timer);
        resolve(r);
      });
      worker.current!.postMessage({ type: "run", id, code, input: c.input });
    });

  const judgeCases = async (cases: Case[], full: boolean) => {
    if (busy) return;
    setBusy(true);
    setVerdict(null);
    setRows([]);
    try {
      await (ready.current ?? boot());
    } catch {
      setBusy(false);
      return;
    }
    const out: Row[] = [];
    for (let i = 0; i < cases.length; i++) {
      const c = cases[i];
      const r = await runOne(c);
      if (r === "tle") {
        out.push({ label: c.label, status: "tle" });
        setRows([...out]);
        setVerdict({ title: "Time Limit Exceeded", tone: "bad", note: `${c.label} ran past ${c.limit / 1000}s. O(n²) won’t survive n = 100,000. Try two pointers.` });
        boot().catch(() => {}); // the stuck worker is gone; warm a fresh one
        setBusy(false);
        return;
      }
      if (r.kind) {
        out.push({ label: c.label, status: "error", detail: r.err.trim() });
        setRows([...out]);
        setVerdict({ title: r.kind === "CE" ? "Compilation Error" : "Runtime Error", tone: "bad", note: r.err.trim().split("\n").pop() ?? "" });
        setBusy(false);
        return;
      }
      const ok = r.stdout.trim() === c.expected;
      out.push({
        label: c.label,
        status: ok ? "pass" : "fail",
        ms: Math.round(r.ms),
        detail: ok || !c.show ? undefined : `input  ${c.input.trim().replace(/\n/g, " ⏎ ")}\nwanted ${c.expected}\ngot    ${r.stdout.trim() || "(nothing)"}`,
      });
      setRows([...out]);
      if (!ok) {
        setVerdict({ title: "Wrong Answer", tone: "bad", note: `Failed on ${c.label.toLowerCase()} (test ${i + 1} of ${cases.length}).` });
        setBusy(false);
        return;
      }
    }
    if (full) {
      setVerdict({ title: "Accepted", tone: "ok", note: `All ${cases.length} tests passed, including n = 100,000.` });
      setWon({ time: elapsed, score });
    } else {
      setVerdict({ title: "Samples pass", tone: "ok", note: "Now submit. The hidden large test is where brute force breaks." });
    }
    setBusy(false);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const t = e.currentTarget;
      const { selectionStart: s, selectionEnd: en } = t;
      const next = code.slice(0, s) + "    " + code.slice(en);
      setCode(next);
      requestAnimationFrame(() => t.setSelectionRange(s + 4, s + 4));
    }
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      judgeCases(buildTests(), true);
    }
  };

  const reset = () => {
    setCode(STARTER);
    setRows([]);
    setVerdict(null);
    setHints(0);
    setElapsed(0);
    setWon(null);
  };

  const lines = code.split("\n").length;

  return (
    <div className="relative overflow-hidden rounded-[12px] border border-hairline-strong bg-surface">
      {/* top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[13px] text-ink">Relay Pair Budget</span>
          <span className="rounded-full bg-elevated px-2.5 py-0.5 font-mono text-[11px] text-dim">Two Pointers</span>
          <span className="rounded-full bg-signal/15 px-2.5 py-0.5 font-mono text-[11px] text-signal">Easy</span>
        </div>
        <div className="flex items-center gap-5 font-mono text-[12px]">
          <span className="text-mute">
            time <span className="tabular-nums text-ink">{fmt(elapsed)}</span>
          </span>
          <span className="text-mute">
            score <span className="tabular-nums text-signal">{score}</span>
          </span>
          <span className="flex items-center gap-1.5 text-mute">
            <span className={`h-2 w-2 rounded-full ${judge === "ready" ? "bg-signal" : judge === "loading" ? "animate-pulse bg-warn" : judge === "error" ? "bg-danger" : "bg-stone"}`} />
            judge {judge === "off" ? "idle" : judge}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* statement */}
        <div data-lenis-prevent className="max-h-[640px] overflow-y-auto border-b border-hairline p-5 text-[15px] leading-relaxed text-body md:p-6 lg:border-b-0 lg:border-r">
          <p>
            Engineek is pairing relay stations for a field exercise. Each station has a setup cost. A pair is usable when
            the sum of its two costs is at most the budget. Stations are distinct even when their costs are equal.
          </p>
          <p className="mt-3">
            Count the usable pairs of distinct stations, each unordered pair once. Costs are already sorted in
            non-decreasing order.
          </p>
          <h4 className="label mt-6 text-mute">Input</h4>
          <p className="mt-1.5">
            First line: <code className="font-mono text-[13px] text-ink">n budget</code>. Second line: n sorted costs.
          </p>
          <h4 className="label mt-5 text-mute">Output</h4>
          <p className="mt-1.5">The number of usable pairs.</p>
          <h4 className="label mt-5 text-mute">Constraints</h4>
          <ul className="mt-1.5 space-y-1 font-mono text-[13px] text-dim">
            <li>2 ≤ n ≤ 100,000</li>
            <li>0 ≤ cost[i] ≤ 1,000,000</li>
            <li>0 ≤ budget ≤ 2,000,000</li>
            <li>The answer may exceed 32 bits</li>
          </ul>
          <h4 className="label mt-5 text-mute">Sample</h4>
          <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-[13px]">
            <pre className="rounded-[8px] bg-deep p-3 text-ink">5 7{"\n"}1 2 3 5 6</pre>
            <pre className="rounded-[8px] bg-deep p-3 text-signal">6</pre>
          </div>
          <p className="mt-2 text-[14px] text-dim">(1,2) (1,3) (1,5) (1,6) (2,3) (2,5)</p>

          <div className="mt-6 border-t border-hairline pt-4">
            <div className="flex items-center justify-between">
              <span className="label text-mute">Hints · −15 each</span>
              <button
                onClick={() => setHints((h) => Math.min(HINTS.length, h + 1))}
                disabled={hints >= HINTS.length || !started}
                className="font-mono text-[12px] text-signal underline-offset-4 hover:underline disabled:text-stone disabled:no-underline"
              >
                {hints >= HINTS.length ? "no more hints" : "reveal hint"}
              </button>
            </div>
            <ol className="mt-3 space-y-2">
              {HINTS.slice(0, hints).map((h, i) => (
                <motion.li key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-[14px] text-dim">
                  <span className="mr-2 font-mono text-signal">{i + 1}.</span>
                  {h}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* editor + results */}
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2">
            <span className="font-mono text-[12px] text-mute">solution.py · Python 3</span>
            <button onClick={reset} className="font-mono text-[12px] text-mute hover:text-ink">
              reset
            </button>
          </div>
          <div className="relative flex h-[340px] bg-deep font-mono text-[13px] leading-[1.7]">
            <div ref={gutter} aria-hidden="true" className="w-11 shrink-0 select-none overflow-hidden py-3 pr-3 text-right text-stone">
              {Array.from({ length: lines }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              data-lenis-prevent
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={onKey}
              onScroll={(e) => {
                if (gutter.current) gutter.current.scrollTop = e.currentTarget.scrollTop;
              }}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="Python solution editor"
              disabled={!started}
              className="h-full flex-1 resize-none bg-transparent py-3 pr-4 text-body caret-signal outline-none disabled:opacity-40"
              style={{ tabSize: 4, whiteSpace: "pre", overflowWrap: "normal" }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-hairline px-4 py-3">
            <button
              onClick={() => judgeCases(SAMPLES, false)}
              disabled={!started || busy}
              className="h-10 rounded-full border border-hairline-strong px-4 text-[14px] transition-colors hover:border-ink disabled:opacity-40"
            >
              Run samples
            </button>
            <button
              onClick={() => judgeCases(buildTests(), true)}
              disabled={!started || busy}
              className="h-10 rounded-full bg-ink px-5 text-[14px] font-medium text-black transition-colors hover:bg-signal disabled:opacity-40"
            >
              {busy ? "Judging…" : "Submit"}
            </button>
            <span className="hidden font-mono text-[11px] text-stone sm:inline">⌘/Ctrl + Enter submits</span>
          </div>

          <div data-lenis-prevent className="min-h-[150px] flex-1 overflow-y-auto border-t border-hairline p-4" aria-live="polite">
            {verdict && (
              <div className={`mb-3 rounded-[8px] border px-4 py-3 ${verdict.tone === "ok" ? "border-signal/40 bg-signal/10" : "border-danger/40 bg-danger/10"}`}>
                <p className={`display text-[28px] italic ${verdict.tone === "ok" ? "text-signal" : "text-danger"}`}>{verdict.title}</p>
                <p className="mt-1 text-[14px] text-body">{verdict.note}</p>
              </div>
            )}
            {rows.length === 0 && !verdict && (
              <p className="font-mono text-[12px] text-mute">
                {judge === "loading"
                  ? "Loading Python into your browser (first time takes a few seconds)…"
                  : started
                    ? "The starter code is brute force. It passes the samples. Submit and see what happens."
                    : "Start the round to load the judge."}
              </p>
            )}
            <ul className="grid gap-1 font-mono text-[12px] sm:grid-cols-2">
              {rows.map((r, i) => (
                <li key={i} className={r.detail ? "sm:col-span-2" : ""}>
                  <span className={r.status === "pass" ? "text-signal" : "text-danger"}>
                    {r.status === "pass" ? "✓" : r.status === "tle" ? "⏱" : "✗"}
                  </span>{" "}
                  <span className="text-body">{r.label}</span>
                  {r.ms !== undefined && <span className="text-stone"> · {r.ms} ms</span>}
                  {r.detail && <pre className="mt-1 whitespace-pre-wrap rounded-[6px] bg-deep p-2 text-dim">{r.detail}</pre>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* start gate */}
      <AnimatePresence>
        {!started && (
          <motion.div exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/75 p-6 text-center backdrop-blur-sm">
            <p className="label text-signal">Round 01 · 10 minute target</p>
            <p className="display mt-4 max-w-[16ch] text-[clamp(2.4rem,5vw,4.4rem)]">Think you can beat brute force?</p>
            <p className="mt-4 max-w-[46ch] text-[15px] text-dim">
              Real Python, judged in your browser against hidden tests. Score starts at 100 and drops as the clock runs.
            </p>
            <button
              onClick={start}
              data-cursor="go"
              className="mt-8 h-12 rounded-full bg-signal px-7 text-[15px] font-medium text-black transition-transform hover:scale-[1.04]"
            >
              Start the round
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* win */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/85 p-6 text-center backdrop-blur-md"
          >
            <motion.p
              initial={{ scale: 1.6, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="display rounded-[12px] border-2 border-signal px-6 py-2 text-[clamp(3rem,8vw,6.5rem)] italic text-signal"
            >
              Accepted
            </motion.p>
            <div className="mt-8 flex gap-10 font-mono">
              <div>
                <div className="text-[32px] tabular-nums text-ink">{won.score}</div>
                <div className="label text-mute">score</div>
              </div>
              <div>
                <div className="text-[32px] tabular-nums text-ink">{fmt(won.time)}</div>
                <div className="label text-mute">time</div>
              </div>
            </div>
            <p className="mt-6 max-w-[44ch] text-[15px] text-dim">
              That’s one round. On PatternBattle you’d be racing up to three friends on a shared timer, with a live
              scoreboard.
            </p>
            <button onClick={() => setWon(null)} className="mt-6 font-mono text-[12px] text-mute underline underline-offset-4 hover:text-ink">
              back to the editor
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
