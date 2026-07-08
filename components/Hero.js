"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Terminal } from "lucide-react";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Blinking cursor
    gsap.to(cursorRef.current, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      duration: 0.5,
    });

    // Intro Animation timeline - Apple style smooth easing
    const tl = gsap.timeline();

    tl.fromTo(containerRef.current,
      { opacity: 0, y: 40, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power4.out" }
    );

    // Staggered character animation for my name using reliable ref query
    const nameChars = containerRef.current.querySelectorAll(".name-char");
    if (nameChars.length > 0) {
      gsap.fromTo(nameChars,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power4.out", 
          stagger: 0.04, 
          delay: 0.2
        }
      );
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden" ref={containerRef}>
      <HeroBackground />
      <div className="container max-w-6xl mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 bg-black/5 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 backdrop-blur-md text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-full font-mono text-xs tracking-wider mb-8 uppercase shadow-md dark:shadow-xl">
            <Terminal size={14} />
            <span>Welcome to my studio</span>
          </div>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-zinc-800/10 dark:bg-white/20 blur-3xl rounded-full opacity-50"></div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:text-white relative z-10">
              Hi, I'm <br />
              <span className="text-3xl sm:text-6xl uppercase block mt-2 leading-none">
                {"Phyo Thiha Win".split("").map((char, index) => (
                  <span 
                    key={index} 
                    className="inline-block name-char text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500"
                    style={{ 
                      display: char === " " ? "inline" : "inline-block",
                      opacity: 0
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div className="text-xl md:text-2xl text-zinc-400 dark:text-zinc-500 font-mono mb-8 h-10 flex items-center justify-center md:justify-start font-light">
            <span className="text-zinc-600 mr-2">&gt;</span>
            <span ref={textRef} className="text-zinc-800 dark:text-zinc-300">Software Engineer</span>
            <span ref={cursorRef} className="w-2 h-7 bg-zinc-800 dark:bg-zinc-300 ml-1 inline-block rounded-sm"></span>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mb-10 text-lg leading-relaxed font-light">
            I craft innovative and user-friendly applications across web and mobile platforms using Kotlin, Dart, Go and JavaScript. Always focused on system design,code quality and performance.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a
              href="/assets/PhyoThihaWin-MobileDeveloper.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-medium rounded-full hover:scale-105 hover:bg-zinc-800 dark:hover:bg-white transition-all duration-300 w-full sm:w-auto text-center shadow-lg dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              View My Resume
            </a>
            <a
              href="#projects"
              className="px-8 py-4 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 font-medium rounded-full border border-zinc-200 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center backdrop-blur-md"
            >
              Explore Projects
            </a>
          </div>
        </div>

        <div className="hidden md:block relative terminal-tilt-container">
          <div className="glass-panel rounded-2xl p-0 overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] dark:bg-black/80 terminal-tilt">
            {/* Terminal Header */}
            <div className="relative w-full h-10 bg-zinc-200/90 dark:bg-zinc-900/80 backdrop-blur-md flex items-center px-4 border-b border-zinc-300/80 dark:border-white/10">
              <div className="flex space-x-2 absolute left-4">
                <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-inner"></div>
              </div>
              <div className="w-full text-center text-xs font-mono text-zinc-600 dark:text-zinc-400 select-none flex justify-center items-center">
                <Terminal size={12} className="mr-2 opacity-50" />
                phyothihawin@macbook: ~
              </div>
            </div>
            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed overflow-hidden h-[400px]">
              <div className="flex items-center">
                <span className="text-emerald-600 dark:text-green-400 mr-2 font-bold">➜</span>
                <span className="text-indigo-600 dark:text-blue-400 mr-2 font-bold">~</span>
                <span className="text-zinc-800 dark:text-white">node init_profile.js</span>
              </div>
              <div className="mt-4 text-zinc-600 dark:text-zinc-400">
                <span className="text-zinc-500">{"// Profile Initialized"}</span><br />
                <span className="text-pink-600 dark:text-pink-400">const</span> <span className="text-blue-600 dark:text-blue-300">developer</span> = {"{"} <br />
                &nbsp;&nbsp;name: <span className="text-amber-600 dark:text-yellow-300">'PHYO THIHA WIN'</span>,<br />
                &nbsp;&nbsp;role: <span className="text-amber-600 dark:text-yellow-300">'Software Engineer'</span>,<br />
                &nbsp;&nbsp;skills: [<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-600 dark:text-yellow-300">'Kotlin'</span>, <span className="text-amber-600 dark:text-yellow-300">'Dart'</span>, <span className="text-amber-600 dark:text-yellow-300">'Java'</span>, <span className="text-amber-600 dark:text-yellow-300">'JS/TS'</span><br />
                &nbsp;&nbsp;],<br />
                &nbsp;&nbsp;platforms: [<span className="text-amber-600 dark:text-yellow-300">'Android'</span>, <span className="text-amber-600 dark:text-yellow-300">'Flutter'</span>, <span className="text-amber-600 dark:text-yellow-300">'React'</span>, <span className="text-amber-600 dark:text-yellow-300">'Node.js'</span>],<br />
                &nbsp;&nbsp;focus: [<span className="text-amber-600 dark:text-yellow-300">'Clean Architecture'</span>, <span className="text-amber-600 dark:text-yellow-300">'Security'</span>]<br />
                {"}"};<br /><br />
                <span className="text-emerald-600 dark:text-green-400">✓</span> Successfully built awesome app.<br />
              </div>
              <div className="flex items-center mt-4">
                <span className="text-emerald-600 dark:text-green-400 mr-2 font-bold">➜</span>
                <span className="text-indigo-600 dark:text-blue-400 mr-2 font-bold">~</span>
                <span className="w-2.5 h-4 bg-zinc-700 dark:bg-zinc-300 animate-pulse ml-1 inline-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
