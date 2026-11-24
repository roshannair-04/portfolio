"use client";

import { useEffect, useRef, useState } from "react";

// A trailing dot that grows into a label over anything with data-cursor="...".
// Fine pointers only; the native cursor stays visible.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const el = ref.current!;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let id = 0;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const hit = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(hit?.getAttribute("data-cursor") ?? "");
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      id = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    id = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[80] hidden [@media(pointer:fine)]:block">
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.12em] text-black transition-[width,height,background-color] duration-300 ease-[var(--ease-out-expo)] ${
          label ? "h-20 w-20 bg-signal" : "h-2 w-2 bg-ink"
        }`}
      >
        <span className={`transition-opacity duration-200 ${label ? "opacity-100" : "opacity-0"}`}>{label}</span>
      </div>
    </div>
  );
}
