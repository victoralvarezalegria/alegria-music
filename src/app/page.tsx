"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import Featured from "@/components/Featured";
import Videos from "@/components/Videos";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Bio />
        <Featured />
        <Videos />

        {/* CTA Section */}
        <section className="py-24 bg-background text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("home.ctaLabel")}
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("home.ctaTitle1")}
              <br />
              <span className="italic">{t("home.ctaTitle2")}</span>
            </h2>
            <p
              className="text-base text-muted-foreground mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("home.ctaBody")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/book"
                className="px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
              >
                {t("home.bookLesson")}
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-foreground/50 hover:text-foreground transition-colors rounded-sm"
              >
                {t("home.contactMe")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
