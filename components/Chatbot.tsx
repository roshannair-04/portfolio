"use client";

import { useState } from "react";
import { ChatCircleDots, X, PaperPlaneRight } from "@phosphor-icons/react";

const knowledge: Record<string, string> = {
  hello: "Hi, I'm Roshan's assistant. Ask me about projects, skills, or contact.",
  projects: "Roshan has built an AI surveillance detection system, Alignyx (resume matching), and Invisible Cloak.",
  skills: "Python, computer vision (YOLOv8, ArcFace, OpenCV), NLP, and FastAPI.",
  contact: "You can reach him by email or LinkedIn in the contact section.",
  resume: "You can download the resume from the top of the page.",
};

function getResponse(input: string) {
  const text = input.toLowerCase();
  for (const key in knowledge) {
    if (text.includes(key)) return knowledge[key];
  }
  return "Try asking about projects, skills, or contact.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Ask me something about Roshan's work." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="h-11 w-11 flex items-center justify-center rounded-full bg-accent text-graphite shadow-lg hover:bg-accent-soft transition-colors duration-200"
      >
        {open ? <X size={19} weight="bold" /> : <ChatCircleDots size={20} weight="fill" />}
      </button>

      {open && (
        <div className="mt-2 w-80 h-96 bg-surface border border-line rounded-md flex flex-col shadow-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-line-soft font-mono text-[11px] tracking-wide uppercase text-ink-faint">
            Assistant
          </div>

          <div className="flex-1 p-4 overflow-y-auto text-[13.5px] space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === "user" ? "text-right text-ink" : "text-left text-ink-dim"}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 flex gap-2 border-t border-line-soft">
            <input
              className="flex-1 bg-graphite border border-line px-3 py-2 text-[13px] text-ink rounded focus:outline-none focus:border-accent"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something"
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              aria-label="Send message"
              className="px-3 bg-accent text-graphite rounded hover:bg-accent-soft transition-colors"
            >
              <PaperPlaneRight size={15} weight="fill" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
