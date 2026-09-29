// Shared heading for numbered sections. Animated by lib/useReveal.js through the
// data-reveal-* attributes, so the parent section only needs to call useReveal().
export default function SectionHeading({ number, title, align = "left" }) {
  const right = align === "right";
  const index = "text-zinc-500 font-mono text-xl md:text-3xl font-light";

  return (
    <div data-reveal-title className={`mb-16 ${right ? "flex flex-col items-end" : ""}`}>
      <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center text-zinc-900 dark:text-white tracking-tight">
        {!right && <span className={`${index} mr-4`}>{number}.</span>}
        {title}
        {right && <span className={`${index} ml-4`}>.{number}</span>}
      </h2>
      <div
        data-reveal-rule
        className={
          right
            ? "w-24 h-1 rounded origin-right bg-gradient-to-l from-zinc-800 to-zinc-300 dark:from-white dark:to-zinc-600"
            : "w-24 h-1 rounded origin-left bg-gradient-to-r from-zinc-800 to-zinc-300 dark:from-white dark:to-zinc-600"
        }
      ></div>
    </div>
  );
}
