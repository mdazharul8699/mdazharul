import Education from "@/components/Education";
import Hero from "../components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SolarSystemSection from "@/components/SolarSystemSection";
import MemoryGameSection from "@/components/MemoryGameSection";
import GameHub from "@/components/GameHub";
import LoveTimeline from "@/components/LoveTimeline";

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <About />
      <Education />
       <GameHub />
       <LoveTimeline />
      <Projects />
      <Contact />
      {/* অন্য সেকশনগুলো এখানে যোগ হবে */}
    </main>
  );
}