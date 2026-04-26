"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "alegria-lang";
const VALID: Language[] = ["en", "es", "fi", "ko", "zh", "ja", "th"];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && VALID.includes(saved)) setLangState(saved);
  }, []);

  function setLang(l: Language) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  function t(path: string): string {
    const parts = path.split(".");
    let current: unknown = translations;
    for (const part of parts) {
      if (typeof current === "object" && current !== null && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return path;
      }
    }
    if (typeof current === "object" && current !== null && lang in current) {
      return (current as Record<string, string>)[lang] ?? (current as Record<string, string>).en ?? path;
    }
    return path;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
