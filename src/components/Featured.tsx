const stats = [
  { value: "18+", label: "Years of Experience" },
  { value: "30+", label: "Countries Performed" },
  { value: "100+", label: "Online Students Worldwide" },
];

const featured = [
  "Berlin Philharmonic Orchestra",
  "Helsinki Philharmonic Orchestra",
  "Royal Concertgebouw Orchestra",
  "Finnish Radio Symphony Orchestra",
  "Netherlands Youth Orchestra",
  "European Union Youth Orchestra",
  "Lucerne Festival Academy",
  "Taipei Music Festival Academy",
  "Youth Music Festival of The Greater Bay Area",
];

export default function Featured() {
  return (
    <>
      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-3 gap-10 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-4xl md:text-5xl font-light text-primary-foreground mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs tracking-widest uppercase text-primary-foreground/70"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p
            className="text-xs tracking-[0.3em] uppercase text-primary mb-10 text-center"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Featured In
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {featured.map((name, i) => (
              <span key={name} className="flex items-center gap-8">
                <span
                  className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {name}
                </span>
                {i < featured.length - 1 && (
                  <span className="text-primary/40 select-none">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
