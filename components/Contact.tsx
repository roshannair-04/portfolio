"use client";
import { Mail, Github, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("roshannair2004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen px-8 md:px-20 py-20 flex flex-col justify-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-cyan-400 text-center">
        Contact
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT — GLASS CARD */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Let’s Connect
          </h3>

          <p className="text-gray-400">
            I'm open to AI/ML roles, collaborations, and interesting projects.
            If you’ve got something exciting — let’s talk.
          </p>
        </div>

        {/* RIGHT — CONTACT LINKS */}
        <div className="flex flex-col gap-4">

          {/* EMAIL */}
          <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-800 bg-white/5 backdrop-blur-lg 
          hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 
          hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out">

            <a
              href="mailto:roshannair2004@gmail.com"
              className="flex items-center gap-4 w-full"
            >
              <Mail className="text-cyan-400 transition-transform duration-300 group-hover:rotate-6" />
              <span>roshannair2004@gmail.com</span>
            </a>

            {/* COPY BUTTON */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              {copied ? (
                <Check className="text-green-400" size={18} />
              ) : (
                <Copy className="text-gray-400" size={18} />
              )}
            </button>
          </div>

          {/* GITHUB */}
          <a
            href="https://github.com/roshannair-04"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 rounded-xl border border-gray-800 bg-white/5 backdrop-blur-lg 
            hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 
            hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out"
          >
            <Github className="text-cyan-400 transition-transform duration-300 group-hover:rotate-6" />
            <span>roshannair-04</span>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://linkedin.com/in/roshannair2004"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 rounded-xl border border-gray-800 bg-white/5 backdrop-blur-lg 
            hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 
            hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out"
          >
            <Linkedin className="text-cyan-400 transition-transform duration-300 group-hover:rotate-6" />
            <span>roshannair2004</span>
          </a>

        </div>
      </div>
    </section>
  );
}