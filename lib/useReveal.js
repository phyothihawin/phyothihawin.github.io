import { gsap, ScrollTrigger } from "./gsap";
import { useGsap } from "./useGsap";

/**
 * Scroll-reveal for a page section. Markup opts in with data attributes:
 *
 *   data-reveal-title     the section heading block (see SectionHeading)
 *   data-reveal-rule      the underline bar inside it (grows from its origin)
 *   data-reveal-item      anything that should fade/slide in as it scrolls into view
 *   data-timeline         a vertical timeline container
 *   data-timeline-line    its progress line (scrubbed with scroll)
 *   data-timeline-item    each entry; gets data-active="true" once scrolled past
 *
 * Items reveal individually as they enter the viewport (ScrollTrigger.batch), so
 * long lists don't animate off-screen. GSAP's inline styles are cleared when a
 * reveal finishes, so CSS hover transforms/transitions on the elements are not
 * fought over afterwards.
 */
export function useReveal(scopeRef) {
  useGsap(scopeRef, ({ motionOk }) => {
    const scope = scopeRef.current;
    if (!scope) return;

    const timelineItems = gsap.utils.toArray("[data-timeline-item]", scope);

    if (!motionOk) {
      // Reduced motion: no animation, but show timelines in their "completed" state.
      timelineItems.forEach((el) => (el.dataset.active = "true"));
      return () => timelineItems.forEach((el) => delete el.dataset.active);
    }

    // Headings
    gsap.utils.toArray("[data-reveal-title]", scope).forEach((title) => {
      const rule = title.querySelector("[data-reveal-rule]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: title, start: "top 88%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(title, { opacity: 0, y: 24, duration: 0.8, clearProps: "opacity,transform" });
      if (rule) tl.from(rule, { scaleX: 0, duration: 0.8, ease: "power3.inOut", clearProps: "transform" }, "-=0.5");
    });

    // Cards / blocks, revealed in staggered batches as they scroll in
    const items = gsap.utils.toArray("[data-reveal-item]", scope);
    if (items.length) {
      gsap.set(items, { opacity: 0, y: 36 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        // "max" keeps the trigger live for content above the fold when the page
        // loads scrolled (e.g. /#contact), so nothing stays hidden.
        end: "max",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
            clearProps: "opacity,transform",
          }),
      });
    }

    // Timelines: progress line + node activation
    gsap.utils.toArray("[data-timeline]", scope).forEach((timeline) => {
      const line = timeline.querySelector("[data-timeline-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: timeline, start: "top 65%", end: "bottom 65%", scrub: 0.4 },
          }
        );
      }
      timeline.querySelectorAll("[data-timeline-item]").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "max",
          onEnter: () => (item.dataset.active = "true"),
          onLeaveBack: () => delete item.dataset.active,
        });
      });
    });

    return () => timelineItems.forEach((el) => delete el.dataset.active);
  });
}
