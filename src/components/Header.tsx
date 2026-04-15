"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/biography", label: "Biography" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo-alegria.png"
            alt="Víctor Álvarez Alegría logo"
            width={36}
            height={36}
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span
            className="text-sm font-medium tracking-widest uppercase text-foreground/80 group-hover:text-foreground transition-colors hidden sm:block"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Víctor Álvarez Alegría
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-xs tracking-widest uppercase font-medium text-primary hover:text-primary/80 transition-colors border-b border-primary pb-0.5"
          >
            Study With Me
          </Link>
          <Link
            href="/bookings"
            className="ml-2 px-5 py-2 text-xs tracking-widest uppercase font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm"
          >
            Book
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="text-sm tracking-widest uppercase font-medium text-primary"
          >
            Study With Me
          </Link>
          <Link
            href="/bookings"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-full text-center px-5 py-3 text-xs tracking-widest uppercase font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm"
          >
            Book
          </Link>
        </div>
      )}
    </header>
  );
}
