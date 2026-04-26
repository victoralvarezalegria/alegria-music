"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BiographyPage() {
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
              {t("biography.aboutLabel")}
            </p>
            <h1
              className="text-5xl md:text-7xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("biography.pageTitle").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic">{t("biography.pageTitle").split(" ").slice(-1)[0]}</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("biography.pageIntro")}
            </p>
          </div>
        </section>

        {/* ─── BEGINNINGS — SANTANDER ──────────────────────────── */}
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.section1Label")}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("biography.section1Title").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic">{t("biography.section1Title").split(" ").slice(-1)[0]}</span>
                </h2>
                <div className="section-divider mb-8" />
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.section1Body1")}
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.section1Body2")}
                </p>
              </div>

              <div className="flex flex-col gap-3 h-[480px]">
                <div className="relative flex-1 overflow-hidden rounded-sm bg-card">
                  <Image
                    src="/images/victor-child-playing.jpg"
                    alt="Víctor as a child playing trombone"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-48 shrink-0 overflow-hidden rounded-sm bg-card">
                  <Image
                    src="/images/conservatorio-santander.jpg"
                    alt="Conservatorio de Jesús de Monasterio, Santander"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── AMSTERDAM CONSERVATORY ──────────────────────────── */}
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.section2Label")}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("biography.section2Title").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic">{t("biography.section2Title").split(" ").slice(-1)[0]}</span>
                </h2>
                <div className="section-divider mb-8" />
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.section2Body1")}
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.section2Body2")}
                </p>
              </div>

              <div className="flex flex-col gap-3 h-[520px]">
                <div className="relative flex-1 overflow-hidden rounded-sm bg-card">
                  <Image
                    src="/images/amsterdam-conservatorium.jpg"
                    alt="Conservatorium van Amsterdam"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-3 h-48 shrink-0">
                  <div className="relative overflow-hidden rounded-sm bg-card">
                    <Image
                      src="/images/victor-amsterdam-solo.jpg"
                      alt="Víctor performing at the Amsterdam Conservatorium"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                  <div className="relative overflow-hidden rounded-sm bg-card">
                    <Image
                      src="/images/victor-amsterdam-professors.jpg"
                      alt="Víctor with professors at the Conservatorium van Amsterdam graduation"
                      fill
                      className="object-cover object-[center_20%]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── KARAJAN ACADEMY ─────────────────────────────────── */}
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              <div className="flex flex-col gap-3 h-[520px]">
                <div className="relative flex-1 overflow-hidden rounded-sm bg-card">
                  <Image
                    src="/images/karajan-group-panorama.jpg"
                    alt="Karajan Academy musicians — panoramic group photo"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-3 h-48 shrink-0">
                  <div className="relative overflow-hidden rounded-sm bg-card">
                    <Image
                      src="/images/berlin-stand.jpg"
                      alt="Berliner Philharmoniker — Posaune 2 music stand"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                  </div>
                  <div className="relative overflow-hidden rounded-sm bg-card">
                    <Image
                      src="/images/berlin-philharmonie.jpg"
                      alt="Berlin Philharmonie"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-8">
                  <Image
                    src="/images/karajan-logo.png"
                    alt="Karajan Academy"
                    width={52}
                    height={52}
                    className="object-contain rounded-sm"
                  />
                  <div>
                    <p
                      className="text-xs tracking-[0.3em] uppercase text-primary"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {t("biography.section3Year")}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {t("biography.section3Org")}
                    </p>
                  </div>
                </div>

                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("biography.section3Title").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic">{t("biography.section3Title").split(" ").slice(-1)[0]}</span>
                </h2>
                <div className="section-divider mb-8" />
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.section3Body1")}
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.section3Body2")}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="px-5 py-3 bg-card border border-border rounded-sm text-center">
                    <p className="text-2xl font-light text-primary mb-1" style={{ fontFamily: "var(--font-heading)" }}>20+</p>
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{t("biography.bpoProjects")}</p>
                  </div>
                  <div className="px-5 py-3 bg-card border border-border rounded-sm text-center">
                    <p className="text-2xl font-light text-primary mb-1" style={{ fontFamily: "var(--font-heading)" }}>2</p>
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{t("biography.seasons")}</p>
                  </div>
                  <div className="px-5 py-3 bg-card border border-border rounded-sm text-center">
                    <p className="text-2xl font-light text-primary mb-1" style={{ fontFamily: "var(--font-heading)" }}>15+</p>
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{t("biography.conductors")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WITH THE MASTERS ────────────────────────────────── */}
        <section className="py-20 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-10">
              <p
                className="text-xs tracking-[0.3em] uppercase text-primary mb-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t("biography.mastersLabel")}
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-foreground leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("biography.mastersTitle").split(" ").slice(0, -1).join(" ")}{" "}
                <span className="italic">{t("biography.mastersTitle").split(" ").slice(-1)[0]}</span>
              </h2>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { src: "/images/victor-with-dudamel.jpg", caption: "Gustavo Dudamel", sub: "Berliner Philharmoniker" },
                { src: "/images/victor-with-rattle.jpg", caption: "Sir Simon Rattle", sub: "Berliner Philharmoniker" },
                { src: "/images/victor-with-makela.jpg", caption: "Klaus Mäkelä", sub: "After Concert · Royal Concertgebouw Orchestra" },
                { src: "/images/victor-with-conductor4.jpg", caption: "Yannick Nézet-Séguin", sub: "After Concert · Berliner Philharmoniker" },
              ].map((item) => (
                <div key={item.src} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-background mb-3">
                    <Image src={item.src} alt={item.caption} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <p className="text-sm text-foreground font-medium" style={{ fontFamily: "var(--font-body)" }}>{item.caption}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { src: "/images/victor-alessi.jpg", caption: "Joseph Alessi", sub: "Taipei Music Festival and Academy" },
                { src: "/images/victor-with-batallan.jpg", caption: "Esteban Batallan", sub: "Taipei Music Festival and Academy" },
                { src: "/images/victor-fabio-luisi.jpg", caption: "Fabio Luisi", sub: "Taipei Music Festival and Academy" },
                { src: "/images/victor-pekka-kuusisto.jpg", caption: "Pekka Kuusisto", sub: "Helsinki Philharmonic Orchestra" },
              ].map((item) => (
                <div key={item.src} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-background mb-3">
                    <Image src={item.src} alt={item.caption} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <p className="text-sm text-foreground font-medium" style={{ fontFamily: "var(--font-body)" }}>{item.caption}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { src: "/images/victor-with-yannick.jpg", caption: "Yannick Nézet-Séguin", sub: "Berliner Philharmoniker" },
                { src: "/images/victor-with-jorgen.jpg", caption: "Jörgen van Rijen", sub: "Philharmonie Berlin" },
                { src: "/images/victor-with-danielharding.jpg", caption: "Daniel Harding", sub: "Guangzhou YMCG" },
                { src: "/images/victor-with-jpsaraste.jpg", caption: "Jukka-Pekka Saraste", sub: "Helsinki Philharmonic Orchestra" },
              ].map((item) => (
                <div key={item.src} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-background mb-3">
                    <Image src={item.src} alt={item.caption} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <p className="text-sm text-foreground font-medium" style={{ fontFamily: "var(--font-body)" }}>{item.caption}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { src: "/images/victor-with-zoltan.jpg", caption: "Zoltan Kiss", sub: "Italian Brass Week 2019" },
                { src: "/images/victor-with-ruben.jpg", caption: "Rubén Simeo", sub: "Italian Brass Week 2019" },
                { src: "/images/victor-with-mariaduenas.jpg", caption: "María Dueñas", sub: "Helsinki Philharmonic Orchestra" },
                { src: "/images/victor-berlin-section.jpg", caption: "BPO Trombone Section", sub: "Jesper Busk Sørensen · Stefan Schulz · Olaf Ott" },
              ].map((item) => (
                <div key={item.src} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-background mb-3">
                    <Image src={item.src} alt={item.caption} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <p className="text-sm text-foreground font-medium" style={{ fontFamily: "var(--font-body)" }}>{item.caption}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="border-t border-border pt-10 max-w-3xl">
              <p
                className="text-2xl md:text-3xl font-light text-foreground/80 italic mb-4 leading-relaxed"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("biography.quote")}
              </p>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t("biography.quoteBody")}
              </p>
            </div>
          </div>
        </section>

        {/* ─── HELSINKI PHILHARMONIC ───────────────────────────── */}
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-8">
                  <Image
                    src="/images/helsinki-logo.png"
                    alt="Helsinki Philharmonic"
                    width={52}
                    height={52}
                    className="object-contain rounded-sm"
                  />
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase text-primary" style={{ fontFamily: "var(--font-body)" }}>
                      {t("biography.helsinkiYear")}
                    </p>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                      {t("biography.helsinkiOrg")}
                    </p>
                  </div>
                </div>

                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("biography.helsinkiTitle").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic">{t("biography.helsinkiTitle").split(" ").slice(-1)[0]}</span>
                </h2>
                <div className="section-divider mb-8" />
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.helsinkiBody1")}
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("biography.helsinkiBody2")}
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-7 py-3 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-primary hover:text-foreground transition-colors rounded-sm"
                >
                  {t("biography.bookOrchestral")}
                </Link>
              </div>

              <div className="flex flex-col gap-3 h-[520px] order-1 md:order-2">
                <div className="relative flex-1 overflow-hidden rounded-sm bg-card">
                  <Image src="/images/victor-musiikkitalo.jpg" alt="Musiikkitalo — Helsinki Music Centre" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-3 h-48 shrink-0">
                  <div className="relative overflow-hidden rounded-sm bg-card">
                    <Image src="/images/victor-helsinki-brass.jpg" alt="Helsinki Philharmonic brass section" fill className="object-cover object-[center_40%]" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                  <div className="relative overflow-hidden rounded-sm bg-card">
                    <Image src="/images/victor-helsinki-solo.jpg" alt="Víctor Álvarez — Helsinki Philharmonic Orchestra" fill className="object-cover object-center" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── GLOBAL BRASS COLLECTIVE ─────────────────────────── */}
        <section className="py-24 bg-card">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative overflow-hidden rounded-sm bg-background">
                <Image
                  src="/images/victor-community.png"
                  alt="Global Brass Collective – Study with Víctor"
                  width={700}
                  height={420}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4" style={{ fontFamily: "var(--font-body)" }}>
                  {t("biography.communityLabel")}
                </p>
                <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  {t("biography.communityTitle").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic">{t("biography.communityTitle").split(" ").slice(-1)[0]}</span>
                </h2>
                <div className="section-divider mb-8" />
                <p className="text-base text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  {t("biography.communityBody")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/book"
                    className="px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                  >
                    {t("biography.studyWithMe")}
                  </Link>
                  <Link
                    href="/contact"
                    className="px-8 py-4 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-foreground/50 hover:text-foreground transition-colors rounded-sm"
                  >
                    {t("biography.askQuestion")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
