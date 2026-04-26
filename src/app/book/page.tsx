"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const WAITLIST_URL = "https://forms.gle/QdecbmCBqqq5bubbA";

export default function BookPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="pt-16 bg-background min-h-screen">

        {/* ─── PAGE HEADER ─────────────────────────────────────── */}
        <section className="py-24 text-center border-b border-border">
          <div className="max-w-3xl mx-auto px-6">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("book.headerLabel")}
            </p>
            <h1
              className="text-5xl md:text-7xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("book.headerTitle").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic">{t("book.headerTitle").split(" ").slice(-1)[0]}</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("book.headerSubtitle")}
            </p>
          </div>
        </section>

        {/* ─── SKOOL COMMUNITY ─────────────────────────────────── */}
        <section className="py-24 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="overflow-hidden rounded-sm">
                <Image
                  src="/images/victor-community.png"
                  alt="Global Brass Collective – Skool Community"
                  width={700}
                  height={420}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.communityLabel")}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("book.communityTitle").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic">{t("book.communityTitle").split(" ").slice(-1)[0]}</span>
                </h2>
                <div className="section-divider mb-8" />

                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.communityBody1")}
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-10"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.communityBody2")}
                </p>

                <a
                  href="https://www.skool.com/timos-brass-circle-1123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.joinCommunity")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ONE-ON-ONE LESSONS ──────────────────────────────── */}
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-card">
                <Image
                  src="/images/victor-bio.jpg"
                  alt="Víctor Álvarez teaching"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>

              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.lessonLabel")}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("book.lessonTitle").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic">{t("book.lessonTitle").split(" ").slice(-1)[0]}</span>
                </h2>
                <div className="section-divider mb-8" />

                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.lessonBody")}
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-primary w-24 shrink-0" style={{ fontFamily: "var(--font-body)" }}>{t("book.duration")}</span>
                    <span className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>60 minutes</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-primary w-24 shrink-0" style={{ fontFamily: "var(--font-body)" }}>{t("book.platform")}</span>
                    <span className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>Zoom</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-primary w-24 shrink-0" style={{ fontFamily: "var(--font-body)" }}>{t("book.price")}</span>
                    <span className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>{t("book.contactPricing")}</span>
                  </div>
                </div>

                <a
                  href={WAITLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.joinWaitlist")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── INTENSIVE COURSES ───────────────────────────────── */}
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-16">
              <p
                className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t("book.intensiveLabel")}
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-foreground mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("book.intensiveTitle").split(" ").slice(0, -1).join(" ")}{" "}
                <span className="italic">{t("book.intensiveTitle").split(" ").slice(-1)[0]}</span>
              </h2>
              <p
                className="text-sm text-muted-foreground max-w-lg mx-auto"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t("book.intensiveSub")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

              {/* 1-Month */}
              <div className="bg-card border border-border rounded-sm p-10 flex flex-col">
                <p className="text-xs tracking-widest uppercase text-primary mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  {t("book.oneMonth")}
                </p>
                <h3 className="text-3xl font-light text-foreground mb-8 leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                  {t("book.oneMonthTitle").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic">{t("book.oneMonthTitle").split(" ").slice(-1)[0]}</span>
                </h3>

                <ul className="space-y-3 mb-8 flex-1">
                  {[t("book.item4lessons"), t("book.itemPractice"), t("book.itemWhatsapp")].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                      <span className="text-primary mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-6 mb-8">
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground/60 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {t("book.includedBonus")}
                  </p>
                  <ul className="space-y-2">
                    {[t("book.itemMindset"), t("book.itemPhysical")].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground/70" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="text-primary/60 mt-0.5 shrink-0">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={WAITLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.joinWaitlist")}
                </a>
              </div>

              {/* 3-Month */}
              <div className="bg-card border border-primary/40 rounded-sm p-10 flex flex-col relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] tracking-widest uppercase px-4 py-1.5 font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.mostPopular")}
                </div>

                <p className="text-xs tracking-widest uppercase text-primary mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  {t("book.threeMonths")}
                </p>
                <h3 className="text-3xl font-light text-foreground mb-8 leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                  {t("book.threeMonthTitle").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic">{t("book.threeMonthTitle").split(" ").slice(-1)[0]}</span>
                </h3>

                <ul className="space-y-3 mb-8 flex-1">
                  {[t("book.item12lessons"), t("book.itemPractice"), t("book.itemWhatsapp"), t("book.itemAudition")].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                      <span className="text-primary mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-6 mb-8">
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground/60 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {t("book.includedBonus")}
                  </p>
                  <ul className="space-y-2">
                    {[t("book.itemMindset"), t("book.itemPhysical")].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground/70" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="text-primary/60 mt-0.5 shrink-0">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={WAITLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("book.joinWaitlist")}
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
