"use client";
import { useRef } from "react";
import { Send, MapPin, Phone } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

export default function Contact() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section id="contact" className="py-32 relative" ref={sectionRef}>
      <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div data-reveal-item className="glass-panel spotlight p-6 sm:p-12 md:p-20 rounded-3xl sm:rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-black/5 dark:bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-zinc-900 dark:text-white">
            Let&apos;s Build Something
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <div className="flex flex-col items-center justify-center space-y-8">
            <a
              href="mailto:phyothiha2580@gmail.com"
              className="group relative overflow-hidden inline-flex items-center justify-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-10 sm:py-4 bg-zinc-950 dark:bg-white text-white dark:text-black text-sm sm:text-base font-semibold rounded-full hover:scale-105 transition-all duration-500 shadow-lg dark:shadow-[0_0_40px_rgba(255,255,255,0.15)] cursor-pointer max-w-full"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 dark:via-black/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[300%] transition-[translate,opacity] duration-700 ease-out"
              ></span>
              <Send size={18} className="relative sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="relative truncate">phyothiha2580@gmail.com</span>
            </a>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-zinc-600 dark:text-zinc-400 font-mono text-sm">
              <a
                href="tel:+959973584655"
                className="flex items-center space-x-2 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white hover:-translate-y-0.5 transition-[background-color,color,translate] duration-300"
              >
                <Phone size={16} className="text-zinc-800 dark:text-white" />
                <span>+95 997 358 4655</span>
              </a>
              <div className="flex items-center space-x-2 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10">
                <MapPin size={16} className="text-zinc-800 dark:text-white" />
                <span>Yangon, Myanmar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-20 text-zinc-500 dark:text-zinc-600 font-mono text-sm">
        <p>Built with Next.js & Tailwind CSS</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} Phyo Thiha Win</p>
      </div>
    </section>
  );
}
