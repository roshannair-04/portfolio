"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";

const sections = ["about", "skills", "projects", "experience", "achievements", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targets = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    targets.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const NavLink = ({ sec, onClick }: { sec: string; onClick?: () => void }) => (
    <a
      href={`#${sec}`}
      onClick={onClick}
      className={`relative py-1 transition-colors duration-200 ${
        active === sec ? "text-accent" : "text-ink-dim hover:text-ink"
      }`}
    >
      {sec.charAt(0).toUpperCase() + sec.slice(1)}
      {active === sec && <span className="absolute left-0 -bottom-[1px] w-full h-px bg-accent" />}
    </a>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-16 flex items-center bg-graphite/85 backdrop-blur-md border-b border-line-soft">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10">
        <Link
          href="https://www.linkedin.com/company/engineek?trk=public_profile_topcard-current-company"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 shrink-0"
        >
          <Image src="/logo.svg" alt="Roshan Nair" width={26} height={26} className="object-contain" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-7 text-[13px] font-mono">
          {sections.map((sec) => (
            <NavLink key={sec} sec={sec} />
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden p-2 -mr-2 text-ink-dim hover:text-ink"
        >
          {menuOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {/* Mobile menu sheet */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-graphite border-b border-line-soft px-6 py-5 flex flex-col gap-4 text-[14px] font-mono">
          {sections.map((sec) => (
            <NavLink key={sec} sec={sec} onClick={() => setMenuOpen(false)} />
          ))}
        </div>
      )}
    </nav>
  );
}
