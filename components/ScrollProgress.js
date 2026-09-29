"use client";
import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";

const RING_RADIUS = 20;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
const SHOW_AFTER = 600; // px scrolled before the back-to-top button appears

// Thin reading-progress bar pinned to the top of the viewport, plus a floating
// back-to-top button whose ring fills as you scroll. One ScrollTrigger drives both.
export default function ScrollProgress() {
  const barRef = useRef(null);
  const buttonRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let visible = false;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        barRef.current.style.transform = `scaleX(${self.progress})`;
        ringRef.current.style.strokeDashoffset = RING_LENGTH * (1 - self.progress);
        const shouldShow = self.scroll() > SHOW_AFTER;
        if (shouldShow !== visible) {
          visible = shouldShow;
          buttonRef.current.dataset.visible = String(shouldShow);
        }
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-0.5 z-[60] pointer-events-none" aria-hidden="true">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent-from via-accent-to to-accent-from"
        ></div>
      </div>

      <button
        ref={buttonRef}
        type="button"
        data-visible="false"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0 })}
        className="group fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer text-zinc-700 dark:text-zinc-200 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/70 dark:border-white/10 shadow-lg opacity-0 translate-y-4 pointer-events-none transition-[opacity,translate,background-color] duration-500 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 data-[visible=true]:pointer-events-auto hover:bg-white dark:hover:bg-zinc-800"
      >
        <svg className="absolute inset-0 -rotate-90" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
          <circle
            ref={ringRef}
            cx="24"
            cy="24"
            r={RING_RADIUS}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH}
            className="stroke-accent-from"
          />
        </svg>
        <ArrowUp size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </>
  );
}
