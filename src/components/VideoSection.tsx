export default function VideoSection() {
  return (
    <section className="relative w-full h-[65vh] md:h-screen overflow-hidden">
      {/* YouTube video background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://www.youtube.com/embed/l4FJULCFhbU?autoplay=1&mute=1&loop=1&playlist=l4FJULCFhbU&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          allow="autoplay; fullscreen"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "calc(100vw + 200px)",
            height: "calc(100vh + 200px)",
            minWidth: "177.78vh",
            minHeight: "56.25vw",
            pointerEvents: "none",
            border: "none",
          }}
        />
      </div>

      {/* Transparent interaction blocker — prevents YouTube controls from appearing on tap/click */}
      <div className="absolute inset-0" style={{ zIndex: 1 }} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" style={{ zIndex: 2 }} />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-background via-background/80 to-transparent" style={{ zIndex: 3 }} />

      {/* Logo centered — fades in after 1s over 2s */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 4 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/victor-protrait-blanco.jpg"
          alt="Víctor Álvarez Alegría"
          className="w-[320px] md:w-[480px] lg:w-[600px] max-w-[80vw] object-contain"
          style={{
            mixBlendMode: "screen",
            opacity: 0,
            animation: "fadeIn 2s ease-in 1s forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
