"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BookingsPage() {
  const { t } = useLanguage();

  const bookings = [
    {
      tag: "",
      title: t("bookings.masterclassTag"),
      subtitle: t("bookings.masterclassSub"),
      description: t("bookings.masterclassDesc"),
      details: [
        { label: t("bookings.formatLabel"), value: t("bookings.masterclassFmt") },
        { label: t("bookings.durationLabel"), value: t("bookings.masterclassDur") },
      ],
      image: "/images/victor-concert.jpg",
      imageAlt: "Víctor Álvarez giving a masterclass",
      aspectRatio: "aspect-[4/3]",
      imageRight: false,
      cta: t("bookings.masterclassCta"),
      subject: "Masterclass%20Booking%20Inquiry",
    },
    {
      tag: t("bookings.soloTag"),
      title: t("bookings.soloTitle"),
      subtitle: t("bookings.soloSub"),
      description: t("bookings.soloDesc"),
      details: [
        { label: t("bookings.repertoireLabel"), value: t("bookings.soloRepertoire") },
        { label: t("bookings.availableLabel"), value: t("bookings.soloAvail") },
        { label: t("bookings.formatLabel"), value: t("bookings.soloFormat") },
      ],
      image: "/images/victor-berlin-stage.jpg",
      imageAlt: "Víctor Álvarez performing as soloist at the Philharmonie Berlin",
      aspectRatio: "aspect-[4/3]",
      imageRight: true,
      cta: t("bookings.soloCta"),
      subject: "Solo%20Concert%20Booking%20Inquiry",
    },
    {
      tag: t("bookings.auditionTag"),
      title: t("bookings.auditionTitle"),
      subtitle: t("bookings.auditionSub"),
      description: t("bookings.auditionDesc"),
      details: [
        { label: t("bookings.focusLabel"), value: t("bookings.auditionFocus") },
        { label: t("bookings.formatLabel"), value: t("bookings.auditionFormat") },
        { label: t("bookings.forLabel"), value: t("bookings.auditionFor") },
      ],
      testimonials: [
        { name: "Grégoire", instrument: "Tuba", result: "Orchestre de Paris Academy" },
        { name: "Joel Crespo", instrument: "Trombone", result: "Sibelius Academy · Helsinki" },
        { name: "Byronn", instrument: "Trombone", result: "4 conservatories — USA" },
      ],
      image: "/images/victor-amsterdam-solo.jpg",
      imageAlt: "Víctor Álvarez performing solo recital at the Philharmonie",
      aspectRatio: "aspect-[3/4]",
      imageRight: true,
      cta: t("bookings.auditionCta"),
      subject: "Audition%20Prep%20Booking%20Inquiry",
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
              {t("bookings.headerLabel")}
            </p>
            <h1
              className="text-5xl md:text-7xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("bookings.headerTitle").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic">{t("bookings.headerTitle").split(" ").slice(-1)[0]}</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("bookings.headerSub")}
            </p>
          </div>
        </section>

        {/* ─── BOOKING SECTIONS ────────────────────────────────── */}
        {bookings.map((item) => (
          <section key={item.title} className="py-16 border-b border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
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

                  <div className="space-y-3 mb-8">
                    {item.details.map((d) => (
                      <div key={d.label} className="flex items-center gap-4">
                        <span className="text-[10px] tracking-widest uppercase text-primary w-28 shrink-0" style={{ fontFamily: "var(--font-body)" }}>
                          {d.label}
                        </span>
                        <span className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                          {d.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {"testimonials" in item && item.testimonials && (
                    <div className="mb-8">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4" style={{ fontFamily: "var(--font-body)" }}>
                        {t("bookings.studentsGoals")}
                      </p>
                      <div className="space-y-3">
                        {item.testimonials.map((testimonial) => (
                          <div
                            key={testimonial.name}
                            className="flex items-baseline justify-between gap-4 border-b border-border pb-3"
                          >
                            <div>
                              <span className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>{testimonial.name}</span>
                              <span className="text-xs text-muted-foreground ml-2" style={{ fontFamily: "var(--font-body)" }}>· {testimonial.instrument}</span>
                            </div>
                            <span className="text-xs text-primary text-right shrink-0" style={{ fontFamily: "var(--font-body)" }}>{testimonial.result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4" style={{ fontFamily: "var(--font-body)" }}>
                {t("bookings.programmeLabel")}
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {t("bookings.programmeTitle").split(" ").slice(0, -1).join(" ")}{" "}
                <span className="italic">{t("bookings.programmeTitle").split(" ").slice(-1)[0]}</span>
              </h2>
            </div>

            <div className="space-y-8">
              {upcomingEvents.map((group) => (
                <div key={group.month}>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3 pb-3 border-b border-border" style={{ fontFamily: "var(--font-body)" }}>
                    {t(`events.months.${group.month}`)}
                  </p>
                  <div className="space-y-3">
                    {group.entries.map((entry) => (
                      <div
                        key={entry.date + entry.event}
                        className="grid items-baseline gap-4"
                        style={{ gridTemplateColumns: "5rem 7rem 1fr auto" }}
                      >
                        <span className="text-xs text-muted-foreground tabular-nums" style={{ fontFamily: "var(--font-body)" }}>{entry.date}</span>
                        <span
                          className={`text-[10px] tracking-widest uppercase ${
                            entry.type === "CONCERT" || entry.type === "CONGRESS" ? "text-primary" : "text-muted-foreground"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {entry.type}
                        </span>
                        <span className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>{entry.event}</span>
                        <span className="text-xs text-muted-foreground text-right" style={{ fontFamily: "var(--font-body)" }}>{entry.location}</span>
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
                {t("bookings.viewCalendar")}
              </Link>
            </div>
          </div>
        </section>

        {/* ─── BOTTOM CTA ──────────────────────────────────────── */}
        <section className="py-20 bg-card text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4" style={{ fontFamily: "var(--font-body)" }}>
              {t("bookings.notSureLabel")}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              {t("bookings.notSureTitle").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic">{t("bookings.notSureTitle").split(" ").slice(-1)[0]}</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)" }}>
              {t("bookings.notSureBody")}
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-primary hover:text-foreground transition-colors rounded-sm"
            >
              {t("bookings.goToContact")}
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
