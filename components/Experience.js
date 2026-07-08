"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, ExternalLink } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  const experiences = [
    {
      role: "Senior Android Developer",
      company: "ONENEX (ATLAS DIGI MYANMAR LIMITED)",
      link: "https://onenex.co/",
      period: "2024-01 – Present",
      bullets: [
        "Manage to work with junior devs, task assigning, problems solving and architecting software design.",
        "Apply Jetpack Compose, Unit Testing, SOLID.",
        "Focus on software security and integrity."
      ]
    },
    {
      role: "Mid Android Developer",
      company: "ONENEX (ATLAS DIGI MYANMAR LIMITED)",
      link: "https://onenex.co/",
      period: "2022-09 – 2024-01",
      bullets: [
        "Working with big team size, focusing on team communication and software quality and work done.",
        "Apply multi modules & clean architecture, Kotlin.",
        "Deploy with CI/CD Pipelines and Firebase distribution.",
        "Learned new trends of Android, business domain and workflows."
      ]
    },
    {
      role: "Mid Android Developer",
      company: "EZAY ENTERPRISE CO., LTD.",
      link: "https://ezaymyanmar.com/",
      period: "2021-08 – 2022-09",
      bullets: [
        "Give priority to UX for older people.",
        "Developed 3 apps, including Seller, Buyer and Delivery for e-commerce and Logistic.",
        "Attending business meeting and writing up reports as an in-house team."
      ]
    },
    {
      role: "Android Developer",
      company: "NANOLABS (LEGEND MYANMAR TECHNOLOGY)",
      link: "https://lmtech.asia/",
      period: "2020-01 – 2021-08",
      bullets: [
        "Start Android development with Kotlin and jetpack libraries.",
        "Follow senior guide lines and carrying out projects before deadline."
      ]
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
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power4.out" }
    )
    .fromTo(itemsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power4.out", stagger: 0.15 },
      "-=0.4"
    );
  }, []);

  return (
    <section id="experience" className="py-24 relative" ref={sectionRef}>
      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-16" ref={titleRef}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center text-zinc-900 dark:text-white tracking-tight">
            <span className="text-zinc-550 dark:text-zinc-500 font-mono text-xl md:text-3xl mr-4 font-light">03.</span>
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-zinc-800 to-zinc-300 dark:from-white dark:to-zinc-600 rounded"></div>
        </div>

        <div className="relative border-l-2 border-zinc-200 dark:border-white/10 ml-2 md:ml-4 space-y-8 pb-4 pt-4 mt-8">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="relative pl-6 md:pl-8 group"
              ref={el => itemsRef.current[index] = el}
            >
              {/* Timeline Node */}
              <div className="absolute w-4 h-4 bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-400 dark:border-zinc-500 rounded-full -left-[9px] top-10 group-hover:bg-zinc-900 group-hover:border-zinc-900 dark:group-hover:bg-white dark:group-hover:border-white transition-colors duration-500 z-10 shadow-[0_0_0_4px_rgba(244,244,245,1)] dark:shadow-[0_0_0_4px_rgba(0,0,0,1)]"></div>
              
              <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden hover:border-zinc-300 dark:hover:border-white/30 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-700"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 relative z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{exp.role}</h3>
                    <a 
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 font-medium mt-1 group/link"
                    >
                      <span>{exp.company}</span>
                      <ExternalLink size={14} className="opacity-60 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                    </a>
                  </div>
                  <div className="mt-4 md:mt-0 inline-block bg-black/5 dark:bg-white/10 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 font-mono text-sm text-zinc-700 dark:text-zinc-300 self-start md:self-auto">
                    {exp.period}
                  </div>
                </div>
                
                <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed relative z-10">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex">
                      <span className="text-zinc-800 dark:text-white mr-3 mt-1.5 opacity-50 text-xs">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
