import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const posts = [
  {
    date: "March 2025",
    category: "Berlin Philharmonic",
    title: "A Season at the Karajan Academy",
    excerpt:
      "Reflecting on two seasons as an Academist at the Berlin Philharmonic — the repertoire, the conductors, and what it means to perform at the highest level night after night.",
    image: "/images/victor-concert.jpg",
  },
  {
    date: "January 2025",
    category: "Teaching",
    title: "How I Structure My Online Trombone Lessons",
    excerpt:
      "After teaching 100+ students from every corner of the world, I've developed a framework that works across levels — from beginners to conservatory students.",
    image: "/images/victor-gallery1.jpg",
  },
  {
    date: "October 2024",
    category: "Competitions",
    title: "Winning the Michel Becquet Competition",
    excerpt:
      "What I learned from preparing for one of the most prestigious trombone competitions in the world, and how it changed my approach to practice.",
    image: "/images/victor-performance.jpg",
  },
  {
    date: "June 2024",
    category: "Orchestral Life",
    title: "Principal Trombone: My First Season in Helsinki",
    excerpt:
      "Joining the Helsinki Philharmonic as Principal Trombone was the realization of a long dream. Here's what the first season looked and felt like.",
    image: "/images/victor-orchestra.jpg",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-background min-h-screen">
        {/* Header */}
        <section className="py-24 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Writing & Thoughts
            </p>
            <h1
              className="text-5xl md:text-6xl font-light text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The <span className="italic">Blog</span>
            </h1>
          </div>
        </section>

        {/* Posts grid */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-10">
              {posts.map((post) => (
                <article
                  key={post.title}
                  className="group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden rounded-sm mb-5 bg-card">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-colors" />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="text-[10px] tracking-widest uppercase text-primary"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {post.category}
                    </span>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <span
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-xl md:text-2xl font-light text-foreground mb-3 group-hover:text-primary transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    className="text-sm text-muted-foreground leading-relaxed mb-4"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {post.excerpt}
                  </p>

                  <span
                    className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Read More →
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
