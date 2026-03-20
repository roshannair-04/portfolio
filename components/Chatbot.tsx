"use client";

import { useState } from "react";
import Image from "next/image";

const knowledge: Record<string, string> = {
  hello: "Hey 👋 I'm Rosh's assistant. Ask me about projects, skills, or contact.",
  projects: "Rosh has built AI systems like Resume Intelligence AI and a real-time surveillance system.",
  skills: "Python, Computer Vision, NLP, FastAPI, React, and system design.",
  contact: "You can reach him via email or LinkedIn in the contact section.",
  resume: "You can download the resume from the home section."
};

function getResponse(input: string) {
  const text = input.toLowerCase();

  for (let key in knowledge) {
    if (text.includes(key)) return knowledge[key];
  }

  return "Try asking about projects, skills, or contact.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 Ask me something!" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getResponse(input) };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-cyan-500 text-black px-4 py-2 rounded-full shadow-lg hover:scale-105 transition flex items-center justify-center"
      >
        <Image
          src="/chat.svg"
          alt="Chat Icon"
          width={24}
          height={24}
        />
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="mt-2 w-80 h-96 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl flex flex-col shadow-xl">

          <div className="p-3 border-b border-gray-700 text-cyan-400">
            Assistant
          </div>

          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${
                  msg.sender === "user"
                    ? "text-right"
                    : "text-left text-cyan-400"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 flex gap-2">
            <input
              className="flex-1 bg-transparent border border-gray-700 px-2 text-white rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              className="px-3 bg-cyan-500 text-black rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}