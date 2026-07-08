"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Mail, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Profile() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }
    )
      .fromTo(cardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power4.out", stagger: 0.15 },
        "-=0.4"
      )
      .fromTo(textRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power4.out" },
        "-=0.4"
      );

  }, []);

  return (
    <section id="profile" className="py-24 relative" ref={sectionRef}>
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-16" ref={titleRef}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center text-zinc-900 dark:text-white tracking-tight">
            <span className="text-zinc-550 dark:text-zinc-500 font-mono text-xl md:text-3xl mr-4 font-light">01.</span>
            My Profile
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-zinc-800 to-zinc-300 dark:from-white dark:to-zinc-600 rounded"></div>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div
            className="md:col-span-5 relative group"
            ref={el => cardsRef.current[0] = el}
          >
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 blur-3xl rounded-full group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-700 pointer-events-none"></div>
            <div className="glass-panel p-8 rounded-3xl relative z-10 text-center hover:-translate-y-2 transition-transform duration-500">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-zinc-200 dark:border-white/10 group-hover:border-zinc-300 dark:group-hover:border-white/30 transition-all duration-500 relative shadow-2xl">
                <img
                  src="/assets/profile.jpg"
                  alt="Phyo Thiha Win"
                  className="relative z-10 w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">Phyo Thiha Win</h3>
              <p className="text-zinc-550 dark:text-zinc-400 font-mono mb-6 text-sm">Software Engineer</p>

              <div className="flex justify-center flex-wrap gap-4">
                <a href="https://github.com/phyothihawin" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-zinc-600 dark:text-zinc-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </a>
                <a href="https://www.linkedin.com/in/phyo-thiha-win-a8a496183/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-zinc-600 dark:text-zinc-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://wa.me/qr/SXKII6FBHRTGE1" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-zinc-600 dark:text-zinc-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                </a>
                <a href="https://play.google.com/store/apps/dev?id=5729357381500909341" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-zinc-600 dark:text-zinc-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/></svg>
                </a>
                <a href="https://apps.apple.com/us/developer/phyo-thiha-win/id1808051048" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-zinc-600 dark:text-zinc-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/></svg>
                </a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl relative z-10 mt-6 hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center space-x-3 mb-4">
                <Globe size={20} className="text-zinc-800 dark:text-white" />
                <h4 className="font-bold text-zinc-800 dark:text-white text-lg">Languages</h4>
              </div>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-500/50 dark:bg-white/50 mr-2"></span> Burmese (Native)</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-500/50 dark:bg-white/50 mr-2"></span> English (Intermediate)</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-500/50 dark:bg-white/50 mr-2"></span> Japanese (N5)</li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6 text-lg text-zinc-650 dark:text-zinc-300 font-light" ref={textRef}>
            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-zinc-800 to-zinc-300 dark:from-white dark:to-zinc-700"></div>
              <p className="mb-6 leading-relaxed">
                I’m an Android and Flutter developer passionate about building apps that make a real impact. With hands-on experience in <span className="text-zinc-900 dark:text-zinc-100 font-mono text-base bg-zinc-200/80 dark:bg-white/10 px-2 py-1 rounded">Kotlin, Java, Dart</span> and web technologies, I love turning ideas into clean, high-performing, and user-friendly experiences.
              </p>
              <p className="mb-0 leading-relaxed">
                I’m eager to join a team that values creativity, collaboration, and clean code, where I can keep growing, share what I know, and help deliver products people enjoy using.
              </p>
            </div>

            <div className="mt-8 glass-panel p-8 rounded-3xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Education</h3>
              <div className="relative border-l-2 border-zinc-200 dark:border-white/10 ml-4 space-y-8 pb-4 pt-4 mt-4">
                <div className="relative pl-8 group">
                  <div className="absolute w-4 h-4 bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-400 dark:border-zinc-500 rounded-full -left-[9px] top-1 group-hover:bg-zinc-900 group-hover:border-zinc-900 dark:group-hover:bg-white dark:group-hover:border-white transition-colors duration-500 z-10 shadow-[0_0_0_4px_rgba(244,244,245,1)] dark:shadow-[0_0_0_4px_rgba(0,0,0,1)]"></div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white">IES Intermediate In-person Course</div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-sm">Ivy English School (2023 - 2024)</div>
                  </div>
                </div>
                
                <div className="relative pl-8 group">
                  <div className="absolute w-4 h-4 bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-400 dark:border-zinc-500 rounded-full -left-[9px] top-1 group-hover:bg-zinc-900 group-hover:border-zinc-900 dark:group-hover:bg-white dark:group-hover:border-white transition-colors duration-500 z-10 shadow-[0_0_0_4px_rgba(244,244,245,1)] dark:shadow-[0_0_0_4px_rgba(0,0,0,1)]"></div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white">Samsung Tech Institute Mobile Training</div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-sm">University of Computer Studies, Yangon (2017)</div>
                  </div>
                </div>

                <div className="relative pl-8 group">
                  <div className="absolute w-4 h-4 bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-400 dark:border-zinc-500 rounded-full -left-[9px] top-1 group-hover:bg-zinc-900 group-hover:border-zinc-900 dark:group-hover:bg-white dark:group-hover:border-white transition-colors duration-500 z-10 shadow-[0_0_0_4px_rgba(244,244,245,1)] dark:shadow-[0_0_0_4px_rgba(0,0,0,1)]"></div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white">Bachelor of Computer Science (B.C.Sc)</div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-sm">University of Computer Studies, Thaton (2014 - 2019)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
