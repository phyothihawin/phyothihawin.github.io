import { useEffect, useRef } from "react";
import { gsap } from "./gsap";

const CONDITIONS = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
};

/**
 * Runs `setup` inside a scoped gsap.matchMedia().
 *
 * - Everything GSAP creates inside `setup` (tweens, timelines, ScrollTriggers)
 *   is reverted on unmount, so nothing leaks (this also keeps React Strict
 *   Mode's double-invoked effects harmless).
 * - `setup` receives `{ motionOk, reduceMotion, finePointer }`. It re-runs if
 *   the user changes their OS motion setting. Skip animating when `motionOk`
 *   is false; content is visible by default, so nothing is lost.
 * - `setup` may return a cleanup function (e.g. to remove event listeners).
 */
export function useGsap(scopeRef, setup) {
  const setupRef = useRef(setup);

  useEffect(() => {
    setupRef.current = setup;
  });

  useEffect(() => {
    const mm = gsap.matchMedia(scopeRef.current ?? undefined);
    mm.add(CONDITIONS, (ctx) => setupRef.current(ctx.conditions));
    return () => mm.revert();
  }, [scopeRef]);
}
