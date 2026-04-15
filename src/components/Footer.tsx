"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/alegria___music/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61576574437213",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@alegria___music",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/biography", label: t("nav.biography") },
    { href: "/events", label: t("nav.events") },
    { href: "/book", label: t("nav.studyWithMe") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-alegria.png"
              alt="Logo"
              width={52}
              height={52}
              className="object-contain mb-4 opacity-80"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <h3
              className="text-lg font-light text-foreground mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Víctor Álvarez Alegría
            </h3>
            <p
              className="text-xs text-muted-foreground leading-relaxed mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("footer.desc1")}<br />
              {t("footer.desc2")}<br />
              {t("footer.desc3")}<br />
              {t("footer.desc4")}
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="/images/karajan-logo.png"
                alt="Karajan Academy"
                width={28}
                height={28}
                className="object-contain opacity-60 hover:opacity-90 transition-opacity"
              />
              <Image
                src="/images/helsinki-logo.png"
                alt="Helsinki Philharmonic Orchestra"
                width={28}
                height={28}
                className="object-contain opacity-60 hover:opacity-90 transition-opacity"
              />
            </div>
          </div>

          {/* Links */}
          <div>
            <p
              className="text-xs tracking-widest uppercase text-primary mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("footer.navigation")}
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs tracking-widest uppercase text-primary mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("footer.contact")}
            </p>
            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href="mailto:victoralvarezalegria@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  victoralvarezalegria@gmail.com
                </a>
              </li>
            </ul>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © {new Date().getFullYear()} Víctor Álvarez Alegría. {t("footer.rights")}
          </p>
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Alegría Global LLC · Helsinki, Finland
          </p>
        </div>
      </div>
    </footer>
  );
}
