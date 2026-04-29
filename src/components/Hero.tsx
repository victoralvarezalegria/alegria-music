"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      <Image
        src="/images/victor-hero.jpg"
        alt="Víctor Álvarez Alegría performing"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute top-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-b from-background via-background/60 to-transparent z-10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <p
          className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {t("hero.eyebrow")}
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-none mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Víctor
          <br />
          <span className="italic">Álvarez Alegría</span>
        </h1>
        <p
          className="text-base md:text-lg text-muted-foreground max-w-xl mb-8"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {t("hero.tagline")}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/book"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
          >
            {t("hero.studyWithMe")}
          </Link>
          <Link
            href="/biography"
            className="inline-block px-8 py-3 border border-foreground/30 text-foreground text-xs tracking-widest uppercase font-medium hover:border-foreground/70 transition-colors rounded-sm"
          >
            {t("hero.aboutMe")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] tracking-widest uppercase text-foreground">{t("hero.scroll")}</span>
        <div className="w-px h-10 bg-foreground/50 animate-pulse" />
      </div>
    </section>
  );
}
