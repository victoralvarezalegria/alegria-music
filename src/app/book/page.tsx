import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const WAITLIST_URL = "https://forms.gle/QdecbmCBqqq5bubbA";

export default function BookPage() {
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
              Online Education
            </p>
            <h1
              className="text-5xl md:text-7xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Study <span className="italic">With Me</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Whether you&apos;re aiming for a conservatory, preparing for an
              audition, or simply passionate about the trombone — choose the
              format that fits you best.
            </p>
          </div>
        </section>

        {/* ─── SKOOL COMMUNITY ─────────────────────────────────── */}
        <section className="py-24 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Community image */}
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

              {/* Text */}
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
                  Join the{" "}
                  <span className="text-foreground font-medium">
                    Global Brass Collective
                  </span>{" "}
                  — Víctor&apos;s online community on Skool with over{" "}
                  <span className="text-primary font-medium">100 members</span>{" "}
                  from around the world. Get access to exclusive content,
                  masterclasses, Q&amp;A sessions, and a passionate community of
                  brass musicians at every level.
                </p>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-10"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Grow alongside fellow musicians guided by the same standards
                  as the Berlin Philharmonic and Helsinki Philharmonic
                  Orchestra.
                </p>

                <a
                  href="https://www.skool.com/timos-brass-circle-1123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Join the Community →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ONE-ON-ONE LESSONS ──────────────────────────────── */}
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
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

              {/* Text */}
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Individual Lessons
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  One-on-One <span className="italic">Lesson</span>
                </h2>
                <div className="section-divider mb-8" />

                <p
                  className="text-base text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Personalized online lesson via Zoom. We work on technique,
                  repertoire, audition preparation, or performance coaching —
                  tailored entirely to your level and goals. The sooner you
                  start, the sooner you will see results.
                </p>

                {/* Details */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[10px] tracking-widest uppercase text-primary w-24 shrink-0"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Duration
                    </span>
                    <span
                      className="text-sm text-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      60 minutes
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[10px] tracking-widest uppercase text-primary w-24 shrink-0"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Platform
                    </span>
                    <span
                      className="text-sm text-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Zoom
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[10px] tracking-widest uppercase text-primary w-24 shrink-0"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Price
                    </span>
                    <span
                      className="text-sm text-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Contact for pricing
                    </span>
                  </div>
                </div>

                <a
                  href={WAITLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Join the Waitlist
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
                Intensive Programmes
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-foreground mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Intensive <span className="italic">Courses</span>
              </h2>
              <p
                className="text-sm text-muted-foreground max-w-lg mx-auto"
                style={{ fontFamily: "var(--font-body)" }}
              >
                A complete programme designed to build real results — strong
                technique, consistent practice habits, and a disciplined mindset.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

              {/* 1-Month */}
              <div className="bg-card border border-border rounded-sm p-10 flex flex-col">
                <p
                  className="text-xs tracking-widest uppercase text-primary mb-3"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  1 Month · 4 Lessons
                </p>
                <h3
                  className="text-3xl font-light text-foreground mb-8 leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  1-Month <span className="italic">Intensive</span>
                </h3>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "1 lesson per week via Zoom (4 total)",
                    "Personalised practice plan & task list",
                    "24/7 WhatsApp assistance",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <span className="text-primary mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-6 mb-8">
                  <p
                    className="text-[10px] tracking-widest uppercase text-muted-foreground/60 mb-3"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Included as bonus
                  </p>
                  <ul className="space-y-2">
                    {["Mindset & Habits Routine", "Physical Training Routine"].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-muted-foreground/70"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
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
                  Join the Waitlist
                </a>
              </div>

              {/* 3-Month */}
              <div className="bg-card border border-primary/40 rounded-sm p-10 flex flex-col relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] tracking-widest uppercase px-4 py-1.5 font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Most Popular
                </div>

                <p
                  className="text-xs tracking-widest uppercase text-primary mb-3"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  3 Months · 12 Lessons
                </p>
                <h3
                  className="text-3xl font-light text-foreground mb-8 leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  3-Month <span className="italic">Intensive</span>
                </h3>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "1 lesson per week via Zoom (12 total)",
                    "Personalised practice plan & task list",
                    "24/7 WhatsApp assistance",
                    "Audition & competition preparation",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <span className="text-primary mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-6 mb-8">
                  <p
                    className="text-[10px] tracking-widest uppercase text-muted-foreground/60 mb-3"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Included as bonus
                  </p>
                  <ul className="space-y-2">
                    {["Mindset & Habits Routine", "Physical Training Routine"].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-muted-foreground/70"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
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
                  Join the Waitlist
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
