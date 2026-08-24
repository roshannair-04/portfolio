import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Chatbot from "../components/Chatbot";

export default function Home() {
  return (
    <main className="relative bg-graphite text-ink">
      <div className="grid-field" aria-hidden="true" />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
      <Chatbot />
    </main>
  );
}
