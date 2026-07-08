"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Database, LayoutTemplate, Settings } from "lucide-react";

export default function TechStack() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  const techCategories = [
    {
      title: "Languages",
      icon: <Code2 size={24} strokeWidth={1.5} />,
      skills: ["Kotlin", "Dart", "Java", "JS & TS"]
    },
    {
      title: "Architecture",
      icon: <LayoutTemplate size={24} strokeWidth={1.5} />,
      skills: ["Clean Arch", "MVVM & MVI", "BLOC", "Redux"]
    },
    {
      title: "Security & Testing",
      icon: <Database size={24} strokeWidth={1.5} />,
      skills: ["JWT & RASP", "Biometric", "SSL Pinning", "JUnit/Espresso"]
    },
    {
      title: "Tools & Deploy",
      icon: <Settings size={24} strokeWidth={1.5} />,
      skills: ["CI/CD & Git", "Fastlane", "Firebase", "App Stores"]
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" }
    )
    .fromTo(itemsRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", stagger: 0.04 },
      "-=0.15"
    );
  }, []);

  return (
    <section id="tech" className="py-24 relative" ref={sectionRef}>
      
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col items-end" ref={titleRef}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center text-zinc-900 dark:text-white tracking-tight">
            Tech Stack
            <span className="text-zinc-550 dark:text-zinc-500 font-mono text-xl md:text-3xl ml-4 font-light">.02</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-l from-zinc-800 to-zinc-300 dark:from-white dark:to-zinc-600 rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, index) => (
            <div 
              key={index} 
              className="glass-panel p-8 rounded-3xl hover:bg-zinc-200/50 dark:hover:bg-white/10 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
              ref={el => itemsRef.current[index] = el}
            >
              <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center mb-8 border border-zinc-200 dark:border-white/20 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-500 text-zinc-800 dark:text-white">
                {cat.icon}
              </div>
              <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-4 tracking-wide">{cat.title}</h3>
              <ul className="space-y-3 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                {cat.skills.map((skill, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-zinc-400 dark:text-zinc-600 mr-2">/</span>
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
