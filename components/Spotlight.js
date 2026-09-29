"use client";
import { useEffect } from "react";

// Feeds the cursor position to any element with the `.spotlight` class (see
// globals.css) as --mx / --my, so its glow follows the pointer. One delegated
// listener for the whole page, hover-capable devices only.
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let event = null;

    const update = () => {
      frame = 0;
      const card = event.target instanceof Element ? event.target.closest(".spotlight") : null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    const onMove = (e) => {
      event = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
