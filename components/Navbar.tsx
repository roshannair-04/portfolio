"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const sections = ["about", "skills", "projects", "achievements", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();

          // 👇 NEW CLEAN LOGIC
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="flex justify-between items-center px-8 py-4">
        
        {/* LOGO */}
        <Link
  href="https://www.linkedin.com/company/engineek?trk=public_profile_topcard-current-company"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2"
>
          <Image
            src="/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </Link>

        {/* NAV LINKS */}
        <div className="flex gap-6 text-sm">
          {sections.map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className={`relative transition ${
                active === sec ? "text-cyan-400" : "text-gray-400"
              }`}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}

              {active === sec && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-cyan-400"></span>
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}