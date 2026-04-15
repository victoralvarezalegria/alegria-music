import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
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
                  Get in Touch
                </p>
                <h1
                  className="text-4xl md:text-6xl font-light text-foreground mb-8 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Let&apos;s Work
                  <br />
                  <span className="italic">Together</span>
                </h1>

                <div className="section-divider mb-10" />

                <p
                  className="text-base text-muted-foreground leading-relaxed mb-10"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Available for solo engagements, orchestral performances,
                  masterclasses, and online lessons. Don&apos;t hesitate to reach out
                  for bookings, collaborations, or any inquiries.
                </p>

                {/* Contact details */}
                <div className="space-y-6">
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase text-primary mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Email
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
                    <p
                      className="text-xs tracking-widest uppercase text-primary mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Social Media
                    </p>
                    <div className="space-y-1">
                      <a
                        href="https://instagram.com/alegriamusic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Instagram: @alegriamusic
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
                <form
                  action="mailto:victoralvarezalegria@gmail.com"
                  method="post"
                  encType="text/plain"
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Email
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
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <option value="">Select a topic</option>
                      <option value="lesson">Online Lesson / Masterclass</option>
                      <option value="concert">Concert Booking / Solo Engagement</option>
                      <option value="orchestral">Orchestral Performance</option>
                      <option value="media">Press / Media Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="Tell me about your project, question, or what you're looking to work on..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
