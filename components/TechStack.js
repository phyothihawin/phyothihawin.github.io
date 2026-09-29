"use client";
import { useRef } from "react";
import { Code2, Database, LayoutTemplate, Settings } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "./SectionHeading";

const techCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Kotlin", "Dart", "Go", "JS & TS"]
  },
  {
    title: "Architecture",
    icon: LayoutTemplate,
    skills: ["Clean Arch", "MVVM & MVI", "BLOC", "Redux"]
  },
  {
    title: "Security & Testing",
    icon: Database,
    skills: ["JWT & RASP", "Biometric", "SSL Pinning", "JUnit/Espresso"]
  },
  {
    title: "Tools & Deploy",
    icon: Settings,
    skills: ["CI/CD & Git", "Fastlane", "Firebase", "App Stores"]
  }
];

export default function TechStack() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section id="tech" className="py-24 relative" ref={sectionRef}>
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeading number="02" title="Tech Stack" align="right" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map(({ title, icon: Icon, skills }) => (
            <div
              key={title}
              data-reveal-item
              className="glass-panel spotlight group p-8 rounded-3xl hover:bg-zinc-200/50 dark:hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center mb-8 border border-zinc-200 dark:border-white/20 text-zinc-800 dark:text-white group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:-rotate-6 group-hover:scale-110 transition-[background-color,color,rotate,scale] duration-500">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-4 tracking-wide">{title}</h3>
              <ul className="space-y-3 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="group/skill flex items-center transition-[translate,color] duration-300 hover:translate-x-1 hover:text-zinc-900 dark:hover:text-white"
                  >
                    <span className="text-zinc-400 dark:text-zinc-600 mr-2 transition-colors duration-300 group-hover/skill:text-accent-from">/</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
