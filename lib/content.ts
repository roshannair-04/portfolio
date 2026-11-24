// Single source for site copy. Everything here comes from the 3 Nov 2026 resume
// and the PatternBattle repo; keep it in sync with public/resume.pdf.

export const site = {
  name: "Roshan M Nair",
  role: "AI & ML Engineer",
  email: "roshannair2004@gmail.com",
  city: "Kollam, Kerala",
  timeZone: "Asia/Kolkata",
  github: "https://github.com/roshannair-04",
  linkedin: "https://www.linkedin.com/in/roshannair2004",
  resume: "/resume.pdf",
};

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  summary: string;
  points: string[];
  stack: string[];
  year: string;
  status?: string;
  links: { label: string; href: string }[];
  visual: "uwsd" | "shortlist" | "cadence" | "stream" | "patternbattle";
};

export const projects: Project[] = [
  {
    id: "uwsd",
    index: "01",
    title: "UWSD",
    kicker: "Unidentified & Wanted Surveillance Detection",
    summary:
      "A modular real-time surveillance pipeline that detects, tracks and recognises people across cameras, then raises alerts the moment a match appears.",
    points: [
      "YOLOv8 detection, ArcFace/InsightFace embeddings and object tracking",
      "PostgreSQL + pgvector similarity search for identity matching",
      "FastAPI and WebSocket layer for live threat events and alerts",
    ],
    stack: ["YOLOv8", "ArcFace", "InsightFace", "pgvector", "FastAPI", "WebSockets"],
    year: "2026",
    status: "2nd place, Smart Campus Hackathon",
    links: [{ label: "GitHub", href: "https://github.com/roshannair-04/delhack" }],
    visual: "uwsd",
  },
  {
    id: "shortlist",
    index: "02",
    title: "Shortlist",
    kicker: "AI resume analyser & job matcher",
    summary:
      "A FastAPI service that reads a resume against a job description and scores the fit with semantic similarity, contextual relevance and automated skill matching.",
    points: [
      "NLP and semantic similarity for resume-to-job matching",
      "Swapped PyTorch for ONNX Runtime with batched inference to fix out-of-memory crashes",
      "Dockerised and deployed on Render",
    ],
    stack: ["FastAPI", "NLP", "ONNX Runtime", "Docker", "Render"],
    year: "2026",
    links: [
      { label: "Live demo", href: "https://resume-intelligence-ai-1.onrender.com/" },
      { label: "GitHub", href: "https://github.com/roshannair-04/shortlist" },
    ],
    visual: "shortlist",
  },
  {
    id: "cadence",
    index: "03",
    title: "Cadence",
    kicker: "Adaptive notes & quiz study tool",
    summary:
      "Turns uploaded PDFs and slides into layered notes and practice questions, then schedules reviews around how each learner is actually forgetting.",
    points: [
      "Rule-based TF-IDF engine: 574 questions from 7 course files, no LLM",
      "Bayesian Knowledge Tracing + an exponential forgetting curve pick what to review next",
      "Dyslexia-friendly fonts, high contrast, read-aloud and keyboard-only quizzes",
    ],
    stack: ["FastAPI", "SQLite", "TF-IDF", "BKT", "Vanilla JS", "Docker"],
    year: "2026",
    links: [
      { label: "Live demo", href: "https://cadence-5d6g.onrender.com/" },
      { label: "GitHub", href: "https://github.com/roshannair-04/cadence" },
    ],
    visual: "cadence",
  },
  {
    id: "stream",
    index: "04",
    title: "Stream Reaction AI",
    kicker: "AI-powered livestream interaction",
    summary:
      "A computer vision layer for streamers: gestures and poses on camera trigger synchronised memes, overlays and sound effects through OBS.",
    points: [
      "Gesture and pose detection mapped to live triggers",
      "Desktop app: Python inference with a React/TypeScript front end",
      "Talks to OBS over WebSocket",
    ],
    stack: ["Computer Vision", "Python", "React", "TypeScript", "OBS WebSocket"],
    year: "2026",
    status: "In progress",
    links: [],
    visual: "stream",
  },
  {
    id: "patternbattle",
    index: "05",
    title: "PatternBattle",
    kicker: "Engineek's DSA battle & contest platform",
    summary:
      "Learn DSA pattern by pattern, then battle friends or run a live contest. Code is judged in Java, Python and C++ inside isolated sandboxes.",
    points: [
      "I built the contest events system end to end",
      "Real verdicts: Accepted, WA, TLE, MLE, runtime and compile errors",
      "Playable right here on this page",
    ],
    stack: ["React", "TypeScript", "Express", "PostgreSQL", "Docker"],
    year: "2026",
    status: "Co-founded at Engineek",
    links: [{ label: "Play a round", href: "#patternbattle" }],
    visual: "patternbattle",
  },
];

export const recognition = [
  { title: "2nd place", detail: "Smart Campus Hackathon 2026", where: "South Asian University", image: "/img/cheque.webp" },
  { title: "3rd place", detail: "AI-Powered Solution Expo", where: "Manipal University Jaipur, 2026", image: "/img/expo.webp" },
  { title: "3rd place", detail: "Bootcamp ’20 and Ideathon ’25", where: "Innovation events", image: null },
  { title: "NPTEL Elite", detail: "Deep Learning", where: "IIT Ropar", image: null },
  { title: "NPTEL", detail: "Introduction to Machine Learning", where: "IIT Madras", image: null },
];

export const toolkit = [
  { name: "Computer Vision", note: "Seeing in real time", tools: "YOLOv8 · ArcFace · InsightFace · OpenCV · ONNX Runtime" },
  { name: "NLP & Matching", note: "Meaning over keywords", tools: "Semantic similarity · Embeddings · TF-IDF · Scikit-learn" },
  { name: "Learning Models", note: "Systems that adapt", tools: "PyTorch · Bayesian Knowledge Tracing · Explainable AI" },
  { name: "Real-time Backends", note: "Built to stay up", tools: "FastAPI · REST · WebSockets · PostgreSQL · pgvector · SQLite" },
  { name: "Data & Analytics", note: "Numbers people act on", tools: "SQL · Tableau · Excel" },
  { name: "Shipping", note: "Off the laptop", tools: "Docker · Render · Git · GitHub" },
  { name: "Languages", note: "Daily drivers", tools: "Python · JavaScript · C++ · SQL · Rust · HTML · CSS" },
];
