"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { languages } from "@/lib/translations";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === lang)!;

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/biography", label: t("nav.biography") },
    { href: "/events", label: t("nav.events") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo-alegria.png"
            alt="Víctor Álvarez Alegría logo"
            width={36}
            height={36}
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span
            className="text-sm font-medium tracking-widest uppercase text-foreground/80 group-hover:text-foreground transition-colors hidden sm:block"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Víctor Álvarez Alegría
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-xs tracking-widest uppercase font-medium text-primary hover:text-primary/80 transition-colors border-b border-primary pb-0.5"
          >
            {t("nav.studyWithMe")}
          </Link>
          <Link
            href="/bookings"
            className="px-5 py-2 text-xs tracking-widest uppercase font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm"
          >
            {t("nav.book")}
          </Link>

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-sm shadow-lg py-1 min-w-[140px] z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs text-left hover:bg-card transition-colors ${
                      lang === l.code ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="text-sm tracking-widest uppercase font-medium text-primary"
          >
            {t("nav.studyWithMe")}
          </Link>
          <Link
            href="/bookings"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-full text-center px-5 py-3 text-xs tracking-widest uppercase font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm"
          >
            {t("nav.book")}
          </Link>

          {/* Mobile language switcher */}
          <div className="border-t border-border pt-4">
            <p className="text-[10px] tracking-widest uppercase text-primary mb-3" style={{ fontFamily: "var(--font-body)" }}>
              {t("nav.language")}
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMenuOpen(false); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs border transition-colors ${
                    lang === l.code
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span>{l.flag}</span>
                  <span>{l.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
