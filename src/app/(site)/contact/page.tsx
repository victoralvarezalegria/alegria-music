"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

type SendStatus = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<SendStatus>("idle");

  // The form used to be action="mailto:", which opens the visitor's mail app
  // (or does nothing on a phone without one) and never records the enquiry.
  // Now it posts to /api/contact, which writes the contact to Víctor's
  // ActiveCampaign with the "Website Contact" tag and the message as a note.
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Left — info */}
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("contact.headerLabel")}
                </p>
                <h1
                  className="text-4xl md:text-6xl font-light text-foreground mb-8 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("contact.headerTitle").split(" ").slice(0, -1).join(" ")}
                  <br />
                  <span className="italic">{t("contact.headerTitle").split(" ").slice(-1)[0]}</span>
                </h1>

                <div className="section-divider mb-10" />

                <p
                  className="text-base text-muted-foreground leading-relaxed mb-10"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("contact.headerBody")}
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-primary mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      {t("contact.emailLabel")}
                    </p>
                    <a
                      href="mailto:victoralvarezalegria@gmail.com"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      victoralvarezalegria@gmail.com
                    </a>
                  </div>

                  <div>
                    <p className="text-xs tracking-widest uppercase text-primary mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      {t("contact.socialLabel")}
                    </p>
                    <div className="space-y-1">
                      <a
                        href="https://www.instagram.com/alegria___music/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Instagram: @alegria___music
                      </a>
                      <a
                        href="https://facebook.com/victoralvarezalegria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Facebook: Víctor Álvarez Alegría
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div>
                {status === "sent" ? (
                  <div
                    className="bg-card border border-border rounded-sm px-6 py-10 text-center"
                    role="status"
                  >
                    <p
                      className="text-xl text-foreground mb-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {t("contact.sentTitle")}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {t("contact.sentBody")}
                    </p>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {t("contact.nameLabel")}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                        placeholder={t("contact.namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {t("contact.emailFieldLabel")}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {t("contact.subjectLabel")}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <option value="">{t("contact.selectTopic")}</option>
                      <option value="lesson">{t("contact.topicLesson")}</option>
                      <option value="concert">{t("contact.topicConcert")}</option>
                      <option value="orchestral">{t("contact.topicOrchestral")}</option>
                      <option value="media">{t("contact.topicPress")}</option>
                      <option value="other">{t("contact.topicOther")}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {t("contact.messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder={t("contact.msgPlaceholder")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm disabled:opacity-60"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {status === "sending" ? t("contact.sending") : t("contact.sendMessage")}
                  </button>
                  {status === "error" && (
                    <p
                      className="text-sm text-primary"
                      role="alert"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {t("contact.sendError")}
                    </p>
                  )}
                </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
