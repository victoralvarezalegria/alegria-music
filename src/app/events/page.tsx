import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type EventType =
  | "MASTERCLASS"
  | "CONCERT"
  | "FESTIVAL"
  | "RECORDING"
  | "CONGRESS"
  | "ORCHESTRA"
  | "TOUR"
  | "CONTEST"
  | "ENGAGEMENT";

interface EventEntry {
  date: string;
  type: EventType;
  event: string;
  location: string;
}

interface EventGroup {
  month: string;
  entries: EventEntry[];
}

const events: EventGroup[] = [
  {
    month: "April",
    entries: [
      { date: "7 – 21", type: "ENGAGEMENT", event: "Watches & Wonders Geneva", location: "Geneva · Switzerland" },
      { date: "24 – 26", type: "CONGRESS", event: "iBrass Congress", location: "Bétera, Valencia · Spain" },
      { date: "25 – 26", type: "CONCERT", event: "Soloist · Banda Sinfónica Centre Artístic Musical de Bétera", location: "Bétera, Valencia · Spain" },
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
      { date: "1 – 4", type: "RECORDING", event: "Recording · Romeo and Juliet (Schoenberg) · Helsinki Philharmonic", location: "Helsinki · Finland" },
      { date: "5 – 7", type: "MASTERCLASS", event: "Masterclass", location: "Povoletto · Italy" },
      { date: "8", type: "CONCERT", event: "Professional Engagement", location: "Venice · Italy" },
      { date: "26", type: "CONCERT", event: "Trio Litera · Festival Internacional de Santander", location: "Santander · Spain" },
    ],
  },
  {
    month: "July",
    entries: [
      { date: "2", type: "RECORDING", event: "Recording Sessions", location: "Helsinki · Finland" },
      { date: "15 – 19", type: "CONTEST", event: "International Brass Band Contest – Palau de les Arts", location: "Valencia · Spain" },
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
    month: "September",
    entries: [
      { date: "14 – 19", type: "ORCHESTRA", event: "Orchestral Project · Helsinki Philharmonic", location: "Helsinki · Finland" },
      { date: "31 Aug – 3 Sep", type: "ORCHESTRA", event: "Tchaikovsky 6 · Helsinki Philharmonic", location: "Helsinki · Finland" },
    ],
  },
  {
    month: "October",
    entries: [
      { date: "7 – 22", type: "TOUR", event: "Japan & South Korea Tour · Helsinki Philharmonic", location: "Japan & South Korea" },
      { date: "23", type: "MASTERCLASS", event: "Masterclass · Seoul University of the Arts", location: "Seoul · South Korea" },
    ],
  },
];

interface PastEvent {
  year: string;
  event: string;
  location: string;
}

const pastEvents: PastEvent[] = [
  { year: "2018 – 2022", event: "Netherlands Youth Orchestra (NJO)", location: "Netherlands" },
  { year: "2021", event: "Lucerne Festival Academy", location: "Lucerne · Switzerland" },
  { year: "2024", event: "Pacific Music Festival", location: "Sapporo · Japan" },
  { year: "2025", event: "Taipei Music Festival and Academy", location: "Taipei · Taiwan" },
  { year: "2025", event: "Youth Music Festival of The Greater Bay Area", location: "Greater Bay Area · China" },
];

const typeColor: Record<EventType, string> = {
  MASTERCLASS: "text-primary",
  CONCERT: "text-primary",
  CONGRESS: "text-primary",
  ENGAGEMENT: "text-primary",
  FESTIVAL: "text-muted-foreground",
  RECORDING: "text-muted-foreground",
  ORCHESTRA: "text-muted-foreground",
  TOUR: "text-muted-foreground",
  CONTEST: "text-muted-foreground",
};

interface ProjectCard {
  label: string;
  sub: string;
  img: string;
}

const upcomingProjects: ProjectCard[] = [
  { label: "Watches & Wonders Geneva", sub: "Geneva · Apr 7–21", img: "/images/project-geneva.png" },
  { label: "iBrass Congress", sub: "Bétera, Valencia · Apr 24–26", img: "/images/project-ibrass.png" },
  { label: "Colombia Tour 2026", sub: "Medellín · Cali · May 5–24", img: "/images/project-colombia.png" },
  { label: "Masterclass Italy", sub: "Povoletto · Jun 5–7", img: "/images/project-italy.png" },
  { label: "Żywieckie Suwakowanie", sub: "Poland · Jul 20–26", img: "/images/project-poland.png" },
  { label: "Trombonanza Festival", sub: "Santa Fe, Argentina · Aug 1–8", img: "/images/project-argentina.png" },
];

export default function EventsPage() {
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
              2026 Calendar
            </p>
            <h1
              className="text-5xl md:text-7xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Upcoming <span className="italic">Events</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Masterclasses, solo concerts, festivals, and orchestral engagements
              — following Víctor across four continents in 2026.
            </p>
          </div>
        </section>

        {/* ─── UPCOMING PROJECTS ───────────────────────────────── */}
        <section className="py-20 border-b border-border overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 md:px-10 mb-10">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Upcoming Projects
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-foreground leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              On the <span className="italic">Road</span>
            </h2>
          </div>

          {/* Horizontal scroll */}
          <div
            className="flex gap-6 overflow-x-auto px-6 md:px-10 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {upcomingProjects.map((project) => (
              <div
                key={project.label}
                className="shrink-0 snap-start w-56 bg-card border border-border rounded-sm overflow-hidden"
              >
                <div className="relative aspect-square bg-background/50 overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.label}
                    fill
                    className="object-cover"
                    sizes="224px"
                  />
                </div>
                <div className="p-4">
                  <p
                    className="text-sm text-foreground font-medium mb-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {project.label}
                  </p>
                  <p
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {project.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── EVENTS LIST ─────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <div className="space-y-10">
              {events.map((group) => (
                <div key={group.month}>
                  {/* Month header */}
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 pb-3 border-b border-border"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {group.month} 2026
                  </p>

                  {/* Entries */}
                  <div className="space-y-3">
                    {group.entries.map((entry) => (
                      <div
                        key={entry.date + entry.event}
                        className="grid items-baseline gap-x-4 gap-y-1"
                        style={{ gridTemplateColumns: "6rem 7rem 1fr auto" }}
                      >
                        <span
                          className="text-xs text-muted-foreground tabular-nums"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {entry.date}
                        </span>
                        <span
                          className={`text-[10px] tracking-widest uppercase ${typeColor[entry.type]}`}
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
          </div>
        </section>

        {/* ─── PAST EVENTS ─────────────────────────────────────── */}
        <section className="py-20 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Archive
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-foreground mb-12 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Past <span className="italic">Events</span>
            </h2>

            <div className="space-y-3">
              {pastEvents.map((entry) => (
                <div
                  key={entry.year + entry.event}
                  className="grid items-baseline gap-x-4 gap-y-1 pb-3 border-b border-border/50"
                  style={{ gridTemplateColumns: "8rem 1fr auto" }}
                >
                  <span
                    className="text-xs text-primary tabular-nums tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {entry.year}
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
        </section>

        {/* ─── BOTTOM CTA ──────────────────────────────────────── */}
        <section className="py-16 bg-background text-center border-t border-border">
          <div className="max-w-xl mx-auto px-6">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Interested in booking?
            </p>
            <h2
              className="text-3xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Work with <span className="italic">Víctor</span>
            </h2>
            <a
              href="mailto:victoralvarezalegria@gmail.com?subject=Event%20Booking%20Inquiry"
              className="inline-block px-10 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Get in Touch
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
