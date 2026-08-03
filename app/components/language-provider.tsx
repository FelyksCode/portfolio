"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Lang } from "../content";

export const LANG_KEY = "felix-lang";

declare global {
  interface Window {
    __LANG__?: Lang;
  }
}

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() =>
    typeof window === "undefined"
      ? "en"
      : window.__LANG__ === "id"
        ? "id"
        : "en",
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const apply = useCallback((next: Lang) => {
    setLang(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      // storage unavailable — language still applies for this session
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang: apply }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const next: Lang = lang === "en" ? "id" : "en";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setLang(next)}
      aria-pressed={lang === "id"}
      aria-label={lang === "en" ? "Switch to Indonesian" : "Beralih ke Bahasa Inggris"}
    >
      {lang === "en" ? "EN" : "ID"}
    </button>
  );
}
