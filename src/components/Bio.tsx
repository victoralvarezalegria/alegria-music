"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Bio() {
  const { t } = useLanguage();

  return (
    <section id="biography" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="aspect-[3/4] relative overflow-hidden rounded-sm">
            <Image
              src="/images/victor-bio.jpg"
              alt="Víctor Álvarez Alegría"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("bio.label")}
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("bio.title1")}
              <br />
              <span className="italic">{t("bio.title2")}</span>
            </h2>

            <div className="section-divider mb-8" />

            <p
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("bio.body")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="inline-block px-7 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
              >
                {t("bio.bookLesson")}
              </Link>
              <Link
                href="/contact"
                className="inline-block px-7 py-3 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-foreground/50 hover:text-foreground transition-colors rounded-sm"
              >
                {t("bio.getInTouch")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
