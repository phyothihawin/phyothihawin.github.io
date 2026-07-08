"use client";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
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
            <li><a href="#profile" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Profile</a></li>
            <li><a href="#tech" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Tech Stack</a></li>
            <li><a href="#experience" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Experience</a></li>
            <li><a href="#projects" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Contact</a></li>
          </ul>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300/60 dark:hover:bg-zinc-700/60 border border-zinc-300/30 dark:border-zinc-700/30 hover:scale-105 active:scale-95 transition-all duration-350 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200/50 dark:border-white/10 shadow-lg transition-all duration-300">
          <ul className="container mx-auto px-6 py-4 space-y-3 text-sm font-medium text-zinc-600 dark:text-zinc-300 max-w-6xl">
            <li>
              <a 
                href="#profile" 
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-zinc-900 dark:hover:text-white transition-colors border-b border-zinc-200/30 dark:border-zinc-800/30"
              >
                Profile
              </a>
            </li>
            <li>
              <a 
                href="#tech" 
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-zinc-900 dark:hover:text-white transition-colors border-b border-zinc-200/30 dark:border-zinc-800/30"
              >
                Tech Stack
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-zinc-900 dark:hover:text-white transition-colors border-b border-zinc-200/30 dark:border-zinc-800/30"
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-zinc-900 dark:hover:text-white transition-colors border-b border-zinc-200/30 dark:border-zinc-800/30"
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
