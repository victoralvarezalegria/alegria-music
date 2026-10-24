"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

type EventType =
  | "MASTERCLASS"
  | "CONCERT"
  | "FESTIVAL"
  | "RECORDING"
  | "CONGRESS"
  | "ORCHESTRA"
  | "TOUR"
  | "CONTEST"
  | "ENGAGEMENT"
  | "TBA";

interface EventEntry {
  date: string;
  type: EventType;
  event: string;
  location: string;
  cancelled?: boolean;
}

interface EventGroup {
  month: string;
  year?: string;
  entries: EventEntry[];
}

const events: EventGroup[] = [
  {
    month: "April",
    entries: [
      { date: "17 – 21", type: "ENGAGEMENT", event: "Watches & Wonders Geneva", location: "Geneva · Switzerland" },
      { date: "24 – 26", type: "CONGRESS", event: "iBrass Congress", location: "Bétera, Valencia · Spain" },
      { date: "25", type: "CONCERT", event: "Soloist · Banda Sinfónica Centre Artístic Musical de Bétera", location: "Bétera, Valencia · Spain" },
    ],
  },
  {
    month: "May",
    entries: [
      { date: "1", type: "CONCERT", event: "Vappu Concert · World Premiere · Ricardo Mollá «Dance of Fire»", location: "Helsinki · Finland" },
      { date: "6 – 10", type: "MASTERCLASS", event: "Mastermind – El Poblado", location: "Medellín · Colombia" },
      { date: "11 – 17", type: "MASTERCLASS", event: "Masterclass · Universidad del Valle", location: "Cali · Colombia" },
      { date: "15", type: "CONCERT", event: "Soloist · Banda Sinfónica Universidad del Valle", location: "Cali · Colombia" },
      { date: "18 – 24", type: "MASTERCLASS", event: "Masterclass · Universidad de Antioquia", location: "Medellín · Colombia" },
      { date: "22", type: "CONCERT", event: "Soloist · Orquesta Departamental de Antioquia", location: "Medellín · Colombia" },
      { date: "28 – 29", type: "MASTERCLASS", event: "Masterclass · Hong Kong Low Brass Center", location: "Hong Kong" },
    ],
  },
  {
    month: "June",
    entries: [
      { date: "1 – 4", type: "RECORDING", event: "Recording · Romeo and Juliet (Schoenberg) · Helsinki Philharmonic", location: "Helsinki · Finland" },
      { date: "5 – 7", type: "MASTERCLASS", event: "Masterclass", location: "Povoletto · Italy" },
      { date: "8", type: "RECORDING", event: "Recording · Venice", location: "Venice · Italy" },
      { date: "15 – 25", type: "ORCHESTRA", event: "UAE National Orchestra · Season Residency", location: "Abu Dhabi · UAE" },
      { date: "21", type: "CONCERT", event: "End of Season · UAE National Orchestra", location: "Abu Dhabi Cultural Foundation · UAE" },
      { date: "24", type: "CONCERT", event: "End of Season · UAE National Orchestra", location: "Dubai Opera · UAE" },
      { date: "25", type: "CONCERT", event: "End of Season · Last Concert of the Season · UAE National Orchestra", location: "NYU Abu Dhabi · UAE" },
      { date: "26", type: "CONCERT", event: "Trio Litera · Festival Internacional de Santander", location: "Santander · Spain" },
      { date: "26 – 30", type: "ENGAGEMENT", event: "Engagement", location: "Dubai · UAE" },
    ],
  },
  {
    month: "July",
    entries: [
      { date: "2 – 19", type: "RECORDING", event: "Grabaciones en Helsinki", location: "Helsinki · Finland" },
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
      { date: "23 – 26", type: "ENGAGEMENT", event: "Monaco Yacht Show 2026", location: "Monaco" },
      { date: "31 Aug – 3 Sep", type: "ORCHESTRA", event: "Tchaikovsky 6 · Helsinki Philharmonic", location: "Helsinki · Finland" },
    ],
  },
  {
    month: "October",
    entries: [
      { date: "7 – 22", type: "TOUR", event: "Japan & South Korea Tour · Helsinki Philharmonic", location: "Japan & South Korea", cancelled: true },
      { date: "23", type: "MASTERCLASS", event: "Masterclass · Seoul University of the Arts", location: "Seoul · South Korea", cancelled: true },
      { date: "18 Oct – 2 Nov", type: "ENGAGEMENT", event: "Engagement", location: "Santander · Spain" },
    ],
  },
  {
    month: "November",
    entries: [
      { date: "5 – 9", type: "FESTIVAL", event: "Pacific Brass Festival", location: "Mazatlán · Mexico" },
      { date: "11", type: "MASTERCLASS", event: "Masterclass", location: "Mexico City · Mexico" },
      { date: "14", type: "CONCERT", event: "Soloist · Orquesta Sinfónica de Campeche", location: "Campeche · Mexico" },
      { date: "17 – 18", type: "RECORDING", event: "Recording Sessions", location: "Cancún · Mexico" },
      { date: "20", type: "CONCERT", event: "Soloist · Orquesta Sinfónica de Oaxaca", location: "Oaxaca · Mexico" },
      { date: "21 – 23", type: "MASTERCLASS", event: "Masterclass", location: "Puebla · Mexico" },
      { date: "24", type: "MASTERCLASS", event: "Masterclass", location: "Toluca · Mexico" },
      { date: "27 – 30", type: "ENGAGEMENT", event: "Engagement", location: "Bangkok · Thailand" },
    ],
  },
  {
    month: "December",
    entries: [
      { date: "1 – 31", type: "ENGAGEMENT", event: "Engagement", location: "Bangkok · Thailand" },
    ],
  },
  {
    month: "January",
    year: "2027",
    entries: [
      { date: "", type: "TBA", event: "More information coming soon", location: "" },
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

interface PastMasterclass {
  title: string;
  type: "reel" | "p";
  id: string;
  image?: string;
  video?: string;
}

const pastMasterclasses: PastMasterclass[] = [
  { title: "Masterclass in Italy", type: "reel", id: "DZRgw4jCmkN", video: "/videos/masterclasses/DZRgw4jCmkN.mp4", image: "/videos/masterclasses/DZRgw4jCmkN.jpg" },
  { title: "Masterclass in Hong Kong", type: "p", id: "DasC5p7Ct1q", video: "/videos/masterclasses/DasC5p7Ct1q.mp4", image: "/videos/masterclasses/DasC5p7Ct1q.jpg" },
  { title: "Masterclass in Medellín", type: "reel", id: "DYlV91UhXl3", video: "/videos/masterclasses/DYlV91UhXl3.mp4", image: "/videos/masterclasses/DYlV91UhXl3.jpg" },
  { title: "Masterclass in Cali", type: "reel", id: "DYP_oFUCbH-", video: "/videos/masterclasses/DYP_oFUCbH-.mp4", image: "/videos/masterclasses/DYP_oFUCbH-.jpg" },
  { title: "Masterclass in Valencia", type: "reel", id: "DXokATSAiZv", video: "/videos/masterclasses/DXokATSAiZv.mp4", image: "/videos/masterclasses/DXokATSAiZv.jpg" },
  { title: "Masterclass for Young Talents in Valencia", type: "reel", id: "DXtGlUtgqaz", video: "/videos/masterclasses/DXtGlUtgqaz.mp4", image: "/videos/masterclasses/DXtGlUtgqaz.jpg" },
  { title: "Trombonanza Festival, Santa Fe, Argentina", type: "p", id: "DboXbGtik9n", video: "/videos/masterclasses/DboXbGtik9n.mp4", image: "/videos/masterclasses/DboXbGtik9n.jpg" },
  { title: "Żywieckie Suwakowanie Festival, Poland", type: "p", id: "DbI7928RsKQ", video: "/videos/masterclasses/DbI7928RsKQ.mp4", image: "/videos/masterclasses/DbI7928RsKQ.jpg" },
];

function MasterclassCard({ mc }: { mc: PastMasterclass }) {
  // Video plays in-page, muted and looping, only while on screen (no Instagram frame). Tap to toggle sound.
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden">
      <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "9 / 16" }}>
        {mc.video ? (
          <>
            <video
              ref={ref}
              src={mc.video}
              poster={mc.image}
              muted
              loop
              playsInline
              preload="metadata"
              onClick={toggleSound}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              aria-label={mc.title}
            />
            <button
              type="button"
              onClick={toggleSound}
              className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/75 transition-colors"
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </>
        ) : mc.image ? (
          <Image
            src={mc.image}
            alt={mc.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        ) : null}
      </div>
      <div className="p-4">
        <p
          className="text-sm text-foreground font-medium mb-1"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {mc.title}
        </p>
      </div>
    </div>
  );
}

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
  TBA: "text-muted-foreground",
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
  const { t } = useLanguage();

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
              {t("events.calendarLabel")}
            </p>
            <h1
              className="text-5xl md:text-7xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("events.upcomingEvents").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic">{t("events.upcomingEvents").split(" ").slice(-1)}</span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("events.description")}
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
              {t("events.upcomingProjects")}
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-foreground leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("events.onTheRoad").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic">{t("events.onTheRoad").split(" ").slice(-1)}</span>
            </h2>
          </div>

          {/* Auto-scrolling marquee */}
          <div
            className="overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="flex gap-6 pl-6"
              style={{ animation: "marquee 45s linear infinite", width: "max-content" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}
            >
              {[...upcomingProjects, ...upcomingProjects].map((project, i) => (
                <div
                  key={i}
                  className="shrink-0 w-56 bg-card border border-border rounded-sm overflow-hidden"
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
          </div>
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
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
                    {t(`events.months.${group.month}`)} {group.year ?? "2026"}
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
                          className={`text-sm ${entry.cancelled ? "text-muted-foreground line-through" : "text-foreground"}`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {entry.event}
                          {entry.cancelled && (
                            <span className="ml-2 inline-block text-[10px] tracking-widest uppercase text-red-500 no-underline">
                              Cancelled
                            </span>
                          )}
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
              {t("events.archive")}
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-foreground mb-12 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("events.pastEvents").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic">{t("events.pastEvents").split(" ").slice(-1)}</span>
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

        {/* ─── PAST MASTERCLASSES ──────────────────────────────── */}
        <section className="py-20 bg-background border-t border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("events.masterclassesLabel")}
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-foreground mb-12 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("events.pastMasterclasses").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic">{t("events.pastMasterclasses").split(" ").slice(-1)}</span>
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {pastMasterclasses.map((mc) => (
                <MasterclassCard key={mc.id} mc={mc} />
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
              {t("events.interestedBooking")}
            </p>
            <h2
              className="text-3xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("events.workWith").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic">{t("events.workWith").split(" ").slice(-1)}</span>
            </h2>
            <a
              href="mailto:victoralvarezalegria@gmail.com?subject=Event%20Booking%20Inquiry"
              className="inline-block px-10 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("events.getInTouch")}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
