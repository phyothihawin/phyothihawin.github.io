"use client";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "profile", label: "Profile" },
  { id: "tech", label: "Tech Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// Sections tracked for the active-link highlight (home has no nav link).
const TRACKED_IDS = ["home", ...NAV_LINKS.map((link) => link.id)];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const { toggleTheme } = useTheme();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the link of the section crossing a thin band near the top-middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    TRACKED_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || isOpen ? (isOpen ? 'bg-white dark:bg-zinc-900' : 'bg-white/40 dark:bg-black/40 backdrop-blur-2xl') + ' border-b border-zinc-200/50 dark:border-white/10 shadow-lg dark:shadow-2xl py-4' : 'bg-transparent border-b border-transparent backdrop-blur-none shadow-none py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center max-w-6xl">
        <a href="#home" className="text-xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
          &lt;PhThWn /&gt;
        </a>
        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex space-x-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {NAV_LINKS.map((link) => {
              const active = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    data-active={active}
                    aria-current={active ? "location" : undefined}
                    className="group relative block py-1 hover:text-zinc-900 dark:hover:text-white data-[active=true]:text-zinc-900 dark:data-[active=true]:text-white transition-colors"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-from to-accent-to transition-transform duration-500 ease-out group-hover:scale-x-100 group-data-[active=true]:scale-x-100"></span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme Toggle Button — icons swap with CSS `dark:` so there's no flash before hydration */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300/60 dark:hover:bg-zinc-700/60 border border-zinc-300/30 dark:border-zinc-700/30 hover:scale-105 active:scale-95 transition-all duration-350 cursor-pointer"
            aria-label="Toggle Theme"
          >
            <span className="relative block w-4 h-4">
              <Sun className="absolute inset-0 w-4 h-4 transition-all duration-500 -rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100" />
              <Moon className="absolute inset-0 w-4 h-4 transition-all duration-500 rotate-0 scale-100 opacity-100 dark:rotate-90 dark:scale-0 dark:opacity-0" />
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-6 h-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
            <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown — always mounted so it can animate open/closed */}
      <div
        inert={!isOpen}
        className={`md:hidden absolute top-full left-0 w-full grid bg-white dark:bg-zinc-900 transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 shadow-lg" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <ul className="container mx-auto px-6 py-4 space-y-3 text-sm font-medium text-zinc-600 dark:text-zinc-300 max-w-6xl border-b border-zinc-200/50 dark:border-white/10">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.id}
                className={`transition-[opacity,translate] duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                style={{ transitionDelay: isOpen ? `${index * 40}ms` : "0ms" }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={activeId === link.id ? "location" : undefined}
                  className={`block py-2 hover:text-zinc-900 dark:hover:text-white aria-[current=location]:text-zinc-900 dark:aria-[current=location]:text-white transition-colors ${index < NAV_LINKS.length - 1 ? "border-b border-zinc-200/30 dark:border-zinc-800/30" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
