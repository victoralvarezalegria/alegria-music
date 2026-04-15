import Image from "next/image";
import Link from "next/link";

const galleryPhotos = [
  "/images/victor-gallery1.jpg",
  "/images/victor-gallery2.jpg",
  "/images/victor-gallery3.jpg",
  "/images/victor-gallery4.jpg",
  "/images/victor-gallery5.jpg",
  "/images/victor-performance.jpg",
  "/images/victor-concert.jpg",
  "/images/victor-orchestra.jpg",
];

export default function Gallery() {
  return (
    <section className="py-20 bg-card overflow-hidden relative">

      {/* Background video — drop /public/videos/gallery-bg.mp4 to activate */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20 blur-sm scale-110"
        >
          <source src="/videos/gallery-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-card/60" />
      </div>

      <div className="relative z-10">

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
          <p
            className="text-xs tracking-[0.3em] uppercase text-primary mb-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Gallery
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Moments on <span className="italic">Stage</span>
          </h2>
        </div>

        {/* Auto-scrolling carousel */}
        <style>{`
          @keyframes scroll-gallery {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .gallery-track {
            animation: scroll-gallery 35s linear infinite;
          }
          .gallery-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="overflow-hidden">
          <div className="gallery-track flex gap-4" style={{ width: "max-content" }}>
            {[...galleryPhotos, ...galleryPhotos].map((src, i) => (
              <div
                key={i}
                className="shrink-0 relative w-72 aspect-[4/3] overflow-hidden rounded-sm"
              >
                <Image
                  src={src}
                  alt={`Gallery photo ${(i % galleryPhotos.length) + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="288px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Community CTA */}
        <div className="max-w-2xl mx-auto px-6 mt-16 text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Online Community
          </p>
          <h3
            className="text-3xl md:text-4xl font-light text-foreground mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Global Brass <span className="italic">Collective</span>
          </h3>
          <p
            className="text-sm text-muted-foreground leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Join Víctor&apos;s online community of over 100 musicians from around the world.
          </p>
          <Link
            href="https://www.skool.com/timos-brass-circle-1123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Join the Community →
          </Link>
        </div>

      </div>
    </section>
  );
}
