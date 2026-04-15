import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import Featured from "@/components/Featured";
import Videos from "@/components/Videos";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Bio />
        <Featured />
        <Videos />

        {/* CTA Section */}
        <section className="py-24 bg-background text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Online Education
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Learn from a
              <br />
              <span className="italic">World-Class Trombonist</span>
            </h2>
            <p
              className="text-base text-muted-foreground mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              With over 100 students from around the world, Víctor offers
              online lessons tailored to all levels — from conservatory
              students to professional orchestral players.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/book"
                className="px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
              >
                Book a Lesson
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-foreground/50 hover:text-foreground transition-colors rounded-sm"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
