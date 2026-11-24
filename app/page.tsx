import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About, { Marquee } from "@/components/About";
import Flagship from "@/components/Flagship";
import Work from "@/components/Work";
import PatternBattle from "@/components/PatternBattle";
import { Recognition, Toolkit } from "@/components/Recognition";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Loader />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Flagship />
        <Work />
        <PatternBattle />
        <Recognition />
        <Toolkit />
      </main>
      <Contact />
    </>
  );
}
