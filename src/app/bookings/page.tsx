import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const bookings = [
  {
    tag: "",
    title: "Masterclass",
    subtitle: "& Educational Events",
    description:
      "Available for masterclasses at conservatories, universities, music festivals, and brass events — in person across the world or online. Each session is tailored to the institution's needs, combining world-class technique with practical, results-driven teaching.",
    details: [
      { label: "Format", value: "In-person worldwide · Online" },
      { label: "Duration", value: "Custom" },
    ],
    image: "/images/victor-concert.jpg",
    imageAlt: "Víctor Álvarez giving a masterclass",
    aspectRatio: "aspect-[4/3]",
    imageRight: false,
    cta: "Request a Masterclass",
    subject: "Masterclass%20Booking%20Inquiry",
  },
  {
    tag: "Solo Concert · Orchestral",
    title: "Solo Concert",
    subtitle: "with Orchestra",
    description:
      "Víctor performs as guest soloist with orchestras and chamber ensembles across Europe. His solo repertoire spans the classical canon to contemporary premieres, bringing technical brilliance and expressive depth to every stage — including the Philharmonie Berlin.",
    details: [
      { label: "Repertoire", value: "Classical, Romantic, Contemporary" },
      { label: "Available", value: "Europe & international" },
      { label: "Format", value: "Solo recital or orchestral concert" },
    ],
    image: "/images/victor-performance.jpg",
    imageAlt: "Víctor Álvarez performing as soloist",
    aspectRatio: "aspect-[4/3]",
    imageRight: true,
    cta: "Book a Solo Concert",
    subject: "Solo%20Concert%20Booking%20Inquiry",
  },
  {
    tag: "Mindset · Lifestyle · Audition Prep",
    title: "Mindset &",
    subtitle: "Peak Performance",
    description:
      "Beyond trombone technique, Víctor coaches musicians on the mental and physical pillars of a high-performance career — audition preparation, discipline, healthy lifestyle, and training routines. Tailored sessions for musicians who want to perform at their absolute best.",
    details: [
      { label: "Focus", value: "Mindset, habits, physical training" },
      { label: "Format", value: "Online sessions via Zoom" },
      { label: "For", value: "Musicians at any level" },
    ],
    image: "/images/victor-gym.jpg",
    imageAlt: "Víctor Álvarez — peak performance coaching",
    aspectRatio: "aspect-[3/4]",
    imageRight: true,
    cta: "Book a Session",
    subject: "Mindset%20Session%20Booking%20Inquiry",
  },
];

const upcomingEvents = [
  {
    month: "April",
    entries: [
      { date: "24 – 26", type: "CONGRESS", event: "iBrass Congress", location: "Bétera, Valencia · Spain" },
      { date: "25 – 26", type: "CONCERT", event: "Soloist · Banda Sinfónica C.A.M. de Bétera", location: "Bétera, Valencia · Spain" },
    ],
  },
  {
    month: "May",
    entries: [
      { date: "6 – 10", type: "MASTERCLASS", event: "Mastermind – El Poblado", location: "Medellín · Colombia" },
      { date: "11 – 17", type: "MASTERCLASS", event: "Masterclass · Universidad del Valle", location: "Cali · Colombia" },
      { date: "15", type: "CONCERT", event: "Soloist · Banda Sinfónica Universidad del Valle", location: "Cali · Colombia" },
      { date: "18 – 24", type: "MASTERCLASS", event: "Masterclass · Universidad de Antioquia", location: "Medellín · Colombia" },
      { date: "22", type: "CONCERT", event: "Soloist · Orquesta Departamental de Antioquia", location: "Medellín · Colombia" },
      { date: "26 – 31", type: "MASTERCLASS", event: "Masterclass · Hong Kong Low Brass Center", location: "Hong Kong" },
    ],
  },
  {
    month: "June",
    entries: [
      { date: "5 – 7", type: "MASTERCLASS", event: "Masterclass", location: "Povoletto · Italy" },
    ],
  },
  {
    month: "July",
    entries: [
      { date: "19 – 26", type: "FESTIVAL", event: "Żywieckie Suwakowanie Festival", location: "Poland" },
    ],
  },
  {
    month: "August",
    entries: [
      { date: "1 – 8", type: "FESTIVAL", event: "Trombonanza Festival", location: "Santa Fe · Argentina" },
    ],
  },
  {
    month: "October",
    entries: [
      { date: "23", type: "MASTERCLASS", event: "Masterclass · Seoul University of the Arts", location: "Seoul · South Korea" },
    ],
  },
];

export default function BookingsPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-background min-h-screen">

        {/* ─── PAGE HEADER ─────────────────────────────────────── */}
        <section className="py-20 text-center border-b border-border">
          <div className="max-w-3xl mx-auto px-6">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Professional Engagements
            </p>
            <h1
              className="text-5xl md:text-7xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Book <span className="italic">Víctor</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Available for masterclasses, solo concerts, and peak performance
              coaching. Get in touch and let&apos;s build something together.
            </p>
          </div>
        </section>

        {/* ─── BOOKING SECTIONS ────────────────────────────────── */}
        {bookings.map((item) => (
          <section
            key={item.title}
            className="py-16 border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div
                  className={`relative ${item.aspectRatio} overflow-hidden rounded-sm bg-card ${
                    item.imageRight ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

                {/* Text */}
                <div className={item.imageRight ? "md:order-1" : ""}>
                  {item.tag && (
                    <p
                      className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.tag}
                    </p>
                  )}
                  <h2
                    className="text-4xl md:text-5xl font-light text-foreground mb-1 leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h2>
                  <h2
                    className="text-4xl md:text-5xl font-light italic text-foreground mb-5 leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.subtitle}
                  </h2>
                  <div className="section-divider mb-6" />
                  <p
                    className="text-base text-muted-foreground leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 mb-8">
                    {item.details.map((d) => (
                      <div key={d.label} className="flex items-center gap-4">
                        <span
                          className="text-[10px] tracking-widest uppercase text-primary w-28 shrink-0"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {d.label}
                        </span>
                        <span
                          className="text-sm text-foreground"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {d.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`mailto:victoralvarezalegria@gmail.com?subject=${item.subject}`}
                    className="inline-block px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.cta}
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ─── UPCOMING PROGRAMME ──────────────────────────────── */}
        <section className="py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <div className="mb-12">
              <p
                className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                2026 Programme
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-foreground leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Upcoming <span className="italic">Engagements</span>
              </h2>
            </div>

            <div className="space-y-8">
              {upcomingEvents.map((group) => (
                <div key={group.month}>
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3 pb-3 border-b border-border"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {group.month}
                  </p>
                  <div className="space-y-3">
                    {group.entries.map((entry) => (
                      <div
                        key={entry.date + entry.event}
                        className="grid items-baseline gap-4"
                        style={{ gridTemplateColumns: "5rem 7rem 1fr auto" }}
                      >
                        <span
                          className="text-xs text-muted-foreground tabular-nums"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {entry.date}
                        </span>
                        <span
                          className={`text-[10px] tracking-widest uppercase ${
                            entry.type === "CONCERT" || entry.type === "CONGRESS"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {entry.type}
                        </span>
                        <span
                          className="text-sm text-foreground"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {entry.event}
                        </span>
                        <span
                          className="text-xs text-muted-foreground text-right"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {entry.location}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/events"
                className="text-xs tracking-widest uppercase text-primary hover:text-primary/80 transition-colors border-b border-primary pb-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                View full calendar →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── BOTTOM CTA ──────────────────────────────────────── */}
        <section className="py-20 bg-card text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Not sure which fits?
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Just send a <span className="italic">message</span>
            </h2>
            <p
              className="text-sm text-muted-foreground leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-body)" }}
            >
              If you&apos;re not sure which option fits your project, reach out
              directly and Víctor will get back to you personally.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-primary hover:text-foreground transition-colors rounded-sm"
            >
              Go to Contact
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
