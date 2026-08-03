"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "felix-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(THEME_KEY);
      } catch {
        // storage unavailable — fall back to system preference
      }
      const next = stored
        ? stored === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(next);
      document.documentElement.dataset.theme = next ? "dark" : "light";
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // storage unavailable — theme still applies for this session
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="theme-dot" aria-hidden="true" />
      {dark ? "dark" : "light"}
    </button>
  );
}
