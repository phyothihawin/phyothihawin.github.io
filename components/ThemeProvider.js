"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useSyncExternalStore } from "react";

const ThemeContext = createContext();

// The source of truth is the `dark` class on <html>: the inline script in
// app/layout.js sets it before hydration (no flash), and toggleTheme updates it.
// Subscribing to that class keeps React in sync without a setState-in-effect.
function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");
const getServerSnapshot = () => null; // unknown on the server; avoids a hydration mismatch

function applyTheme(next) {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // With a view transition the <html> class only changes on the next frame, so a fast
  // second click must build on the theme we already decided on, not on the stale DOM.
  const pendingTheme = useRef(null);

  // `event` (optional) is the click that triggered the toggle: when the browser
  // supports View Transitions, the new theme is revealed as a circle expanding
  // from that point. Otherwise (or with reduced motion) the theme just switches.
  const toggleTheme = useCallback((event) => {
    const root = document.documentElement;
    const current = pendingTheme.current ?? (root.classList.contains("dark") ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    pendingTheme.current = next;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      pendingTheme.current = null;
      return;
    }

    const rect = event?.currentTarget?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    // Suspend CSS colour transitions so the incoming snapshot is the final theme.
    root.classList.add("theme-switching");
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
        )
      )
      // `ready` rejects when the transition is skipped (hidden tab, or superseded by a newer toggle); the theme still applies.
      .catch(() => {});
    transition.finished.finally(() => {
      // Only the most recent toggle clears the pending state
      if (pendingTheme.current === next) {
        pendingTheme.current = null;
        root.classList.remove("theme-switching");
      }
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
