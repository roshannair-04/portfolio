"use client";

import { useState } from "react";
import { EnvelopeSimple, GithubLogo, LinkedinLogo, Copy, Check } from "@phosphor-icons/react";

const links = [
  {
    label: "roshannair2004@gmail.com",
    href: "mailto:roshannair2004@gmail.com",
    icon: EnvelopeSimple,
    copyValue: "roshannair2004@gmail.com",
  },
  {
    label: "roshannair-04",
    href: "https://github.com/roshannair-04",
    icon: GithubLogo,
  },
  {
    label: "roshannair2004",
    href: "https://linkedin.com/in/roshannair2004",
    icon: LinkedinLogo,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("roshannair2004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="px-6 md:px-10 py-24 md:py-32 border-t border-line-soft">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Contact</h2>
          <p className="text-ink-dim leading-relaxed max-w-[46ch]">
            I&apos;m open to AI and computer vision roles, plus interesting collaborations.
            Reach out through any of the channels here.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.label}
                className="group flex items-center justify-between gap-4 px-5 py-4 rounded-md border border-line bg-surface hover:border-accent/50 transition-colors duration-200"
              >
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                >
                  <Icon size={19} className="text-accent shrink-0" />
                  <span className="text-[14px] truncate">{link.label}</span>
                </a>

                {link.copyValue && (
                  <button
                    onClick={handleCopy}
                    aria-label="Copy email address"
                    className="p-1.5 rounded hover:bg-surface-2 transition-colors shrink-0"
                  >
                    {copied ? (
                      <Check size={16} className="text-live" />
                    ) : (
                      <Copy size={16} className="text-ink-faint" />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
