import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// The one place GSAP plugins are registered. Import gsap / ScrollTrigger from
// here (not from "gsap" directly) so registration never depends on which
// component happens to load first.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
