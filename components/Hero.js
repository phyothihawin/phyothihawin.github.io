"use client";
import { useRef } from "react";
import { Terminal } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";
import HeroBackground from "./HeroBackground";

const NAME = "Phyo Thiha Win";
const ROLE = "Software Engineer";
const COMMAND = "node init_profile.js";

// Resting pose of the terminal card, in degrees. Must match .terminal-tilt in globals.css.
const TILT = { x: 8, y: -16 };

// Terminal syntax colouring helpers
const Str = ({ children }) => (
  <span className="text-amber-600 dark:text-yellow-300">&apos;{children}&apos;</span>
);
const Line = ({ children }) => (
  <div data-term-line className="whitespace-pre-wrap break-words">
    {children}
  </div>
);
const Prompt = ({ children }) => (
  <>
    <span className="text-emerald-600 dark:text-green-400 mr-2 font-bold">➜</span>
    <span className="text-indigo-600 dark:text-blue-400 mr-2 font-bold">~</span>
    {children}
  </>
);

export default function Hero() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  useGsap(sectionRef, ({ motionOk, finePointer }) => {
    if (!motionOk) return;

    const root = sectionRef.current;
    const q = gsap.utils.selector(root);

    // Blinking cursor
    gsap.to(cursorRef.current, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      duration: 0.5,
    });

    // Intro: everything is positioned on one timeline so the pieces hand off to each other.
    // "Typing" animates the width of a `ch`-sized wrapper in whole-character steps (the fonts
    // are monospace), so the real text stays in the DOM untouched.
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(q("[data-hero-in]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, clearProps: "transform" }, 0)
      .fromTo(q(".name-char"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, clearProps: "transform" }, 0.15)
      .fromTo(q("[data-type-role]"), { width: "0ch" }, { width: `${ROLE.length}ch`, duration: ROLE.length * 0.045, ease: `steps(${ROLE.length})`, clearProps: "width" }, 1.1)
      .fromTo(q("[data-hero-terminal]"), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.1, clearProps: "transform" }, 0.3)
      .fromTo(q("[data-type-cmd]"), { width: "0ch" }, { width: `${COMMAND.length}ch`, duration: COMMAND.length * 0.045, ease: `steps(${COMMAND.length})`, clearProps: "width" }, 1.5)
      .fromTo(q("[data-term-line]"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.09, clearProps: "transform" }, 2.5);

    // Terminal card follows the pointer (desktop with a mouse only; touch keeps the CSS resting pose)
    if (!finePointer) return;

    const card = q(".terminal-tilt")[0];
    gsap.set(card, { rotationX: TILT.x, rotationY: TILT.y, rotation: 3 });
    // quickTo needs GSAP's canonical property names: it silently ignores aliases such as rotateX / scale.
    const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.7, ease: "power3.out" });
    const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.7, ease: "power3.out" });
    let hovered = false;
    const setHovered = (next) => {
      if (next === hovered) return;
      hovered = next;
      gsap.to(card, { scale: next ? 1.02 : 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    };

    const onMove = (e) => {
      const rect = card.parentElement.getBoundingClientRect();
      const nx = gsap.utils.clamp(-1, 1, (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2));
      const ny = gsap.utils.clamp(-1, 1, (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2));
      rotateY(TILT.y + nx * 12);
      rotateX(TILT.x - ny * 10);
      setHovered(card.contains(e.target));
    };
    const onLeave = () => {
      rotateX(TILT.x);
      rotateY(TILT.y);
      setHovered(false);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden" ref={sectionRef}>
      <HeroBackground />
      <div className="container max-w-6xl mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div data-hero-in className="inline-flex items-center space-x-2 bg-black/5 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 backdrop-blur-md text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-full font-mono text-xs tracking-wider mb-8 uppercase shadow-md dark:shadow-xl">
            <Terminal size={14} />
            <span>Welcome to my studio</span>
          </div>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-zinc-800/10 dark:bg-white/20 blur-3xl rounded-full opacity-50"></div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:text-white relative z-10">
              Hi, I&apos;m <br />
              <span className="text-3xl sm:text-6xl md:text-4xl lg:text-6xl uppercase block mt-2 leading-none">
                {/* One nowrap span per word so the name only ever wraps between words, never mid-word */}
                {NAME.split(" ").map((word, wordIndex, words) => (
                  <span key={wordIndex} className={`inline-block whitespace-nowrap ${wordIndex < words.length - 1 ? "mr-[0.3em]" : ""}`}>
                    {word.split("").map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className="inline-block name-char text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div data-hero-in className="text-xl md:text-2xl text-zinc-400 dark:text-zinc-500 font-mono mb-8 h-10 flex items-center justify-center md:justify-start font-light">
            <span className="text-zinc-600 mr-2">&gt;</span>
            <span data-type-role className="shrink-0 overflow-hidden whitespace-nowrap text-zinc-800 dark:text-zinc-300">{ROLE}</span>
            <span ref={cursorRef} className="w-2 h-7 bg-zinc-800 dark:bg-zinc-300 ml-1 inline-block rounded-sm"></span>
          </div>

          <p data-hero-in className="text-zinc-600 dark:text-zinc-400 max-w-lg mb-10 text-lg leading-relaxed font-light">
            I craft innovative and user-friendly applications across web and mobile platforms using Kotlin, Dart, Go and JavaScript. Always focused on system design, code quality and performance.
          </p>

          <div data-hero-in className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a
              href="/assets/PhyoThihaWin-MobileDeveloper.pdf"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden px-8 py-4 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-medium rounded-full hover:scale-105 hover:bg-zinc-800 dark:hover:bg-white transition-all duration-300 w-full sm:w-auto text-center shadow-lg dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 dark:via-black/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[300%] transition-[translate,opacity] duration-700 ease-out"
              ></span>
              <span className="relative">View My Resume</span>
            </a>
            <a
              href="#projects"
              className="px-8 py-4 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 font-medium rounded-full border border-zinc-200 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center backdrop-blur-md"
            >
              Explore Projects
            </a>
          </div>
        </div>

        <div data-hero-terminal className="hidden md:block relative terminal-tilt-container">
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
                <Prompt>
                  <span data-type-cmd className="shrink-0 overflow-hidden whitespace-nowrap text-zinc-800 dark:text-white">{COMMAND}</span>
                </Prompt>
              </div>
              <div className="mt-4 text-zinc-600 dark:text-zinc-400">
                <Line><span className="text-zinc-500">{"// Profile Initialized"}</span></Line>
                <Line><span className="text-pink-600 dark:text-pink-400">const</span> <span className="text-blue-600 dark:text-blue-300">developer</span> = {"{"}</Line>
                <Line>{"  "}name: <Str>PHYO THIHA WIN</Str>,</Line>
                <Line>{"  "}role: <Str>Software Engineer</Str>,</Line>
                <Line>{"  "}skills: [</Line>
                <Line>{"    "}<Str>Kotlin</Str>, <Str>Dart</Str>, <Str>Go</Str>, <Str>JavaScript</Str></Line>
                <Line>{"  "}],</Line>
                <Line>{"  "}platforms: [<Str>Android</Str>, <Str>Flutter</Str>, <Str>React</Str>, <Str>Node.js</Str>],</Line>
                <Line>{"  "}focus: [<Str>Clean Architecture</Str>, <Str>Security</Str>]</Line>
                <Line>{"};"}</Line>
                <Line>{" "}</Line>
                <Line><span className="text-emerald-600 dark:text-green-400">✓</span> Successfully built awesome app.</Line>
              </div>
              <div data-term-line className="flex items-center mt-4">
                <Prompt>
                  <span className="w-2.5 h-4 bg-zinc-700 dark:bg-zinc-300 animate-pulse ml-1 inline-block"></span>
                </Prompt>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div data-hero-in className="hidden sm:flex absolute inset-x-0 bottom-8 justify-center z-10 pointer-events-none">
        <a
          href="#profile"
          aria-label="Scroll to profile"
          className="pointer-events-auto flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <span className="relative block w-5 h-8 rounded-full border border-current">
            <span className="absolute left-1/2 top-1.5 -ml-0.5 w-1 h-1.5 rounded-full bg-current animate-scroll-dot"></span>
          </span>
        </a>
      </div>
    </section>
  );
}
