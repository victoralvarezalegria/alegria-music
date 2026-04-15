import Image from "next/image";
import Link from "next/link";

export default function Bio() {
  return (
    <section id="biography" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image */}
          <div className="aspect-[3/4] relative overflow-hidden rounded-sm">
            <Image
              src="/images/victor-bio.jpg"
              alt="Víctor Álvarez Alegría"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              About
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A Voice in Brass,
              <br />
              <span className="italic">Heard Worldwide</span>
            </h2>

            <div className="section-divider mb-8" />

            <p
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Principal Trombone of the Helsinki Philharmonic Orchestra,
              international trombone soloist, and online educator with over 100
              students across the globe. Former Academist at the Karajan Academy
              of the Berlin Philharmonic (2023–2025), where he performed in more
              than 20 projects alongside the world&apos;s finest musicians.
              Regular guest with the Royal Concertgebouw Orchestra, Finnish Radio
              Symphony Orchestra, and Berlin Philharmonic.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="inline-block px-7 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
              >
                Book a Lesson
              </Link>
              <Link
                href="/contact"
                className="inline-block px-7 py-3 border border-border text-muted-foreground text-xs tracking-widest uppercase font-medium hover:border-foreground/50 hover:text-foreground transition-colors rounded-sm"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
