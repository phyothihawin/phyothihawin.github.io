import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative selection:bg-cyan-500/30 selection:text-cyan-500">
      <Navbar />
      <Hero />
      <Profile />
      <TechStack />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
