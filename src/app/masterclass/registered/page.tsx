import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  MASTERCLASS_DATE_HEADING,
  MASTERCLASS_DAY,
  MASTERCLASS_TIME_EST,
  MASTERCLASS_TIME_PST,
  MASTERCLASS_GOOGLE_CALENDAR_URL,
  MASTERCLASS_IS_PLACEHOLDER,
} from "@/lib/masterclass-config";

export const metadata = {
  title: "You're Registered. The 1% Method Masterclass",
  robots: "noindex",
};

export default function MasterclassRegisteredPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-6 md:px-10 text-center">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              You&apos;re registered
            </p>

            <h1
              className="text-4xl md:text-6xl font-semibold text-white leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {MASTERCLASS_DATE_HEADING}
            </h1>
            <p
              className="italic text-xl md:text-3xl text-foreground mt-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {MASTERCLASS_DAY}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5 mt-5">
              <span className="text-base font-medium text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                {MASTERCLASS_TIME_EST}
              </span>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-muted-foreground" aria-hidden="true" />
              <span className="text-base font-medium text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                {MASTERCLASS_TIME_PST}
              </span>
            </div>

            {MASTERCLASS_IS_PLACEHOLDER && (
              <div
                className="inline-block mt-5 px-4 py-2 border border-dashed border-border rounded-sm text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Placeholder date. Victor confirms the final time by email before the session.
              </div>
            )}

            <p
              className="text-base text-muted-foreground mt-10 max-w-xs mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Add it to your calendar now so it doesn&apos;t slip past you.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-4 max-w-md mx-auto">
              <a
                href={MASTERCLASS_GOOGLE_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-sm bg-white/5 border border-border text-foreground text-sm font-medium hover:bg-white/10 hover:border-primary/50 hover:-translate-y-0.5 transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="17" rx="3" fill="#fff" />
                  <rect x="3" y="4" width="18" height="4.5" rx="3" fill="#4285F4" />
                  <rect x="3" y="6" width="18" height="2.5" fill="#4285F4" />
                  <rect x="5.5" y="11" width="5" height="3" rx="1" fill="#EA4335" />
                  <rect x="13" y="11" width="5" height="3" rx="1" fill="#FBBC05" />
                  <rect x="5.5" y="16" width="5" height="3" rx="1" fill="#34A853" />
                  <rect x="13" y="16" width="5" height="3" rx="1" fill="#4285F4" />
                </svg>
                Google Calendar
              </a>

              <a
                href="/masterclass.ics"
                download
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-sm bg-white/5 border border-border text-foreground text-sm font-medium hover:bg-white/10 hover:border-primary/50 hover:-translate-y-0.5 transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path d="M16.4 12.6c0-2 1.6-3 1.7-3.05-.9-1.35-2.35-1.55-2.85-1.55-1.2-.12-2.35.72-2.97.72-.61 0-1.56-.7-2.57-.68-1.32.02-2.54.77-3.22 1.95-1.37 2.39-.35 5.93 1 7.87.65.95 1.43 2.02 2.45 1.98.98-.04 1.35-.64 2.54-.64s1.52.64 2.56.62c1.06-.02 1.73-.97 2.38-1.92.75-1.1 1.06-2.17 1.07-2.22-.02-.01-2.06-.79-2.09-3.08z" />
                  <path d="M14.6 6.5c.54-.66.9-1.57.8-2.5-.78.03-1.72.52-2.28 1.17-.5.58-.94 1.51-.82 2.4.87.07 1.76-.44 2.3-1.07z" />
                </svg>
                Apple Calendar
              </a>
            </div>

            <div className="mt-12 p-7 bg-card border border-border rounded-lg text-left max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                What happens next
              </h2>
              <p className="text-[15px] leading-relaxed text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                Check your inbox. A confirmation is on its way with everything you need.
              </p>
              <p className="text-[15px] leading-relaxed text-foreground mt-2.5" style={{ fontFamily: "var(--font-body)" }}>
                You&apos;ll get the <span className="font-bold text-white">join link and a reminder</span> before
                the session starts. If nothing arrives in a few minutes, check your promotions or spam
                folder and drag it to your main inbox.
              </p>
            </div>

            <Link
              href="/masterclass"
              className="inline-block mt-10 text-sm text-muted-foreground hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              &larr; Back to the masterclass page
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
