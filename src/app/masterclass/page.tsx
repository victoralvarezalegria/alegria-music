"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BENEFIT_KEYS = [
  { title: "benefit1Title", body: "benefit1Body" },
  { title: "benefit2Title", body: "benefit2Body" },
  { title: "benefit3Title", body: "benefit3Body" },
  { title: "benefit4Title", body: "benefit4Body" },
] as const;

export default function MasterclassPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() }),
      });
      const data = await res.json().catch(() => ({}));

      if (data && data.ok) {
        router.push("/masterclass/registered");
        return;
      }
      setError(
        data && data.error === "invalid_email"
          ? t("masterclass.errorInvalidEmail")
          : t("masterclass.errorGeneric"),
      );
      setSubmitting(false);
    } catch {
      setError(t("masterclass.errorNetwork"));
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <section className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("masterclass.eyebrow")}
            </p>
            <h1
              className="text-4xl md:text-6xl font-semibold text-white leading-[1.12] tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("masterclass.headingMain")}
              <span className="block italic font-normal text-2xl md:text-4xl text-foreground mt-3">
                {t("masterclass.headingSub")}
              </span>
            </h1>

            <button
              onClick={() => setOpen(true)}
              className="inline-block mt-9 mb-2 px-11 py-5 bg-primary text-primary-foreground font-bold text-base md:text-lg tracking-wide uppercase rounded-sm shadow-[0_12px_30px_rgba(255,107,53,0.28)] hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("masterclass.ctaButton")}
            </button>
          </div>

          <div className="max-w-5xl mx-auto px-6 md:px-10 mt-10 flex flex-col md:flex-row gap-10 md:gap-14 items-start text-left">
            <div className="w-full md:flex-[0_0_44%]">
              <Image
                src="/images/masterclass-victor.jpg"
                alt="Victor Alegria, Principal Trombone of the Helsinki Philharmonic, with his trombone"
                width={1080}
                height={1080}
                className="w-full h-auto rounded-sm"
              />
            </div>

            <div className="flex-1">
              <p
                className="text-xs text-center tracking-[0.2em] uppercase text-primary mb-7"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t("masterclass.benefitsLabel")}
              </p>

              <ul className="space-y-6">
                {BENEFIT_KEYS.map((b) => (
                  <li
                    key={b.title}
                    className="relative pl-8 text-[17px] leading-relaxed text-foreground"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span className="absolute left-0 top-0.5 text-primary font-bold" aria-hidden="true">
                      &#10003;
                    </span>
                    <span className="font-bold text-white">{t(`masterclass.${b.title}`)}</span>{" "}
                    {t(`masterclass.${b.body}`)}
                  </li>
                ))}
              </ul>

              <p
                className="text-center text-2xl md:text-3xl font-semibold text-white mt-9 mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("masterclass.fireLine")}
              </p>

              <div className="text-center mt-6">
                <button
                  onClick={() => setOpen(true)}
                  className="inline-block px-11 py-5 bg-primary text-primary-foreground font-bold text-base md:text-lg tracking-wide uppercase rounded-sm shadow-[0_12px_30px_rgba(255,107,53,0.28)] hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("masterclass.ctaButton")}
                </button>
                <p
                  className="text-sm text-muted-foreground mt-4 tracking-wide"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("masterclass.freeNote")}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 md:px-10 mt-16 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              {t("masterclass.disclaimer1")}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2" style={{ fontFamily: "var(--font-body)" }}>
              {t("masterclass.disclaimer2")}
            </p>
          </div>
        </section>
      </main>
      <Footer />

      {open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-100 p-5"
          onClick={(ev) => {
            if (ev.target === ev.currentTarget) setOpen(false);
          }}
        >
          <div className="bg-card border border-border rounded-lg max-w-[520px] w-full px-8 md:px-11 py-9 text-center relative shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-2.5 right-4 text-2xl text-muted-foreground hover:text-foreground leading-none"
            >
              &times;
            </button>
            <h2
              className="text-3xl font-semibold text-white mb-2.5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("masterclass.modalTitle")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
              {t("masterclass.modalSubtitle")}
            </p>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <input
                type="text"
                required
                placeholder={t("masterclass.firstNamePlaceholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-background border border-border rounded-sm px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <input
                type="email"
                required
                placeholder={t("masterclass.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border rounded-sm px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-primary text-primary-foreground font-bold text-base tracking-wide uppercase rounded-sm shadow-[0_10px_24px_rgba(255,107,53,0.28)] hover:bg-primary/90 transition-colors disabled:opacity-60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {submitting ? t("masterclass.submitLoading") : t("masterclass.submitIdle")}
              </button>
            </form>
            {error && (
              <p className="text-primary font-medium text-sm mt-3" style={{ fontFamily: "var(--font-body)" }}>
                {error}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-3.5" style={{ fontFamily: "var(--font-body)" }}>
              {t("masterclass.modalFine")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
