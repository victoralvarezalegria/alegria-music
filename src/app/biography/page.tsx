import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function BiographyPage() {
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
              About Víctor
            </p>
            <h1
              className="text-5xl md:text-7xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A Life in <span className="italic">Music</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              From Santander to Helsinki — the story of an international trombone
              soloist shaped by world-class orchestras, legendary conductors, and
              a lifelong passion for teaching.
            </p>
          </div>
        </section>

        {/* ─── BEGINNINGS — SANTANDER ──────────────────────────── */}
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  2008 · Santander, Spain
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  The <span className="italic">Beginning</span>
                </h2>
                <div className="section-divider mb-8" />
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Born in Santander, Spain, Víctor began his musical journey at
                  the age of{" "}
                  <span className="text-foreground">9</span> at the{" "}
                  <span className="text-foreground">
                    Conservatorio de Jesús de Monasterio
                  </span>{" "}
                  — one of the north&apos;s finest music schools. From his very
                  first steps on stage, it became clear that music was not a
                  hobby — it was a calling.
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  His early years were defined by relentless daily practice,
                  regional competitions, and a growing fascination with the
                  trombone&apos;s expressive power. At just{" "}
                  <span className="text-foreground">13</span>, he won his first
                  international prize — the beginning of a competition career
                  that would continue across Europe.
                </p>
              </div>

              {/* Photos — child playing trombone + conservatorio building */}
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
              {/* Text (left) */}
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  2018 – 2022 · Amsterdam
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Conservatorium <span className="italic">van Amsterdam</span>
                </h2>
                <div className="section-divider mb-8" />
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  At 18, Víctor moved to Amsterdam to study at the{" "}
                  <span className="text-foreground">
                    Conservatorium van Amsterdam
                  </span>{" "}
                  — one of Europe&apos;s leading conservatories — under
                  world-renowned trombonist{" "}
                  <span className="text-foreground">Jörgen van Rijen</span>. He
                  graduated with a{" "}
                  <span className="text-primary font-medium">9.5 / 10</span> and
                  was awarded the{" "}
                  <span className="text-foreground">
                    Extraordinary Prize for Outstanding Graduation
                  </span>
                  .
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  During his four years in Amsterdam, he participated in the{" "}
                  <span className="text-foreground">
                    Nederlands Jeugdorkest (NJO)
                  </span>{" "}
                  for four consecutive seasons, the{" "}
                  <span className="text-foreground">
                    Lucerne Festival Academy (2021)
                  </span>
                  , and launched his international solo career — performing
                  across Europe and winning at the Italian Brass Week.
                </p>
              </div>

              {/* Photos — building top, solo + professors below */}
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

              {/* Photos — panoramic group top, stand + exterior below */}
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

              {/* Text */}
              <div>
                {/* Logo */}
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
                      2023 – 2025
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Berlin Philharmonic
                    </p>
                  </div>
                </div>

                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Karajan <span className="italic">Academy</span>
                </h2>
                <div className="section-divider mb-8" />
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Selected as an Academist at the Karajan Academy of the Berlin
                  Philharmonic — one of the most prestigious orchestral training
                  programmes in the world — Víctor participated in over{" "}
                  <span className="text-foreground">20 projects</span> across
                  two seasons, performing on the stages of the Philharmonie
                  alongside the world&apos;s finest musicians.
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  During his time in Berlin, he had the privilege of working
                  under more than{" "}
                  <span className="text-foreground">
                    15 world-renowned conductors
                  </span>{" "}
                  including Gustavo Dudamel, Zubin Mehta, Daniel Barenboim, Sir
                  Simon Rattle, and Kirill Petrenko — an experience that
                  profoundly shaped his artistry.
                </p>

                {/* Stat pills */}
                <div className="flex flex-wrap gap-4">
                  <div className="px-5 py-3 bg-card border border-border rounded-sm text-center">
                    <p
                      className="text-2xl font-light text-primary mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      20+
                    </p>
                    <p
                      className="text-[10px] tracking-widest uppercase text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      BPO Projects
                    </p>
                  </div>
                  <div className="px-5 py-3 bg-card border border-border rounded-sm text-center">
                    <p
                      className="text-2xl font-light text-primary mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      2
                    </p>
                    <p
                      className="text-[10px] tracking-widest uppercase text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Seasons
                    </p>
                  </div>
                  <div className="px-5 py-3 bg-card border border-border rounded-sm text-center">
                    <p
                      className="text-2xl font-light text-primary mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      15+
                    </p>
                    <p
                      className="text-[10px] tracking-widest uppercase text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      World-Class Conductors
                    </p>
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
                Berlin · Helsinki · Amsterdam · Taipei
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-foreground leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                With the <span className="italic">Masters</span>
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
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <p
                    className="text-sm text-foreground font-medium"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.caption}
                  </p>
                  <p
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.sub}
                  </p>
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
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <p
                    className="text-sm text-foreground font-medium"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.caption}
                  </p>
                  <p
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="border-t border-border pt-10 max-w-3xl">
              <p
                className="text-2xl md:text-3xl font-light text-foreground/80 italic mb-4 leading-relaxed"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                &ldquo;Tell me who you surround yourself with, and I will tell you who you are.&rdquo;
              </p>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Growing up and training in music, I always sought to be surrounded by the finest musicians,
                the greatest personalities, and the most influential figures of our era in the world of
                classical music.
              </p>
            </div>
          </div>
        </section>

        {/* ─── HELSINKI PHILHARMONIC ───────────────────────────── */}
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Text (left) */}
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
                    <p
                      className="text-xs tracking-[0.3em] uppercase text-primary"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      2025 – Present
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Helsinki Philharmonic Orchestra
                    </p>
                  </div>
                </div>

                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Principal <span className="italic">Trombone</span>
                </h2>
                <div className="section-divider mb-8" />
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Appointed{" "}
                  <span className="text-foreground">
                    Principal Trombone of the Helsinki Philharmonic Orchestra
                  </span>{" "}
                  — one of Finland&apos;s most prestigious ensembles — Víctor
                  leads the trombone section across a broad symphonic repertoire.
                  Based at the{" "}
                  <span className="text-foreground">Musiikkitalo</span>, he
                  performs alongside some of the world&apos;s finest musicians
                  in Helsinki&apos;s iconic concert hall.
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Beyond Helsinki, he is regularly invited as guest principal
                  with orchestras including the{" "}
                  <span className="text-foreground">
                    Royal Concertgebouw Orchestra
                  </span>{" "}
                  and the{" "}
                  <span className="text-foreground">
                    Finnish Radio Symphony Orchestra
                  </span>
                  .
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-7 py-3 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-primary hover:text-foreground transition-colors rounded-sm"
                >
                  Book Orchestral Engagement
                </Link>
              </div>

              {/* Photos — building top, brass group + solo portrait below */}
              <div className="flex flex-col gap-3 h-[520px] order-1 md:order-2">
                <div className="relative flex-1 overflow-hidden rounded-sm bg-card">
                  <Image
                    src="/images/victor-musiikkitalo.jpg"
                    alt="Musiikkitalo — Helsinki Music Centre"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-3 h-48 shrink-0">
                  <div className="relative overflow-hidden rounded-sm bg-card">
                    <Image
                      src="/images/victor-helsinki-brass.jpg"
                      alt="Helsinki Philharmonic brass section"
                      fill
                      className="object-cover object-bottom"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                  <div className="relative overflow-hidden rounded-sm bg-card">
                    <Image
                      src="/images/victor-helsinki-solo.jpg"
                      alt="Víctor Álvarez — Helsinki Philharmonic Orchestra"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
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
                <p
                  className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Online Community
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Global Brass <span className="italic">Collective</span>
                </h2>
                <div className="section-divider mb-8" />
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Víctor is the founder of the{" "}
                  <span className="text-foreground">Global Brass Collective</span>{" "}
                  — an online community of over{" "}
                  <span className="text-primary font-medium">100 musicians</span>{" "}
                  from every corner of the world.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/book"
                    className="px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                  >
                    Study With Me
                  </Link>
                  <Link
                    href="/contact"
                    className="px-8 py-4 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-foreground/50 hover:text-foreground transition-colors rounded-sm"
                  >
                    Ask a Question
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
