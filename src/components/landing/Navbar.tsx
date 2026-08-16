"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#portfolio" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "#why-us" },
  { label: "For GCs", href: "/commercial" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={
                scrolled
                  ? "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1767487583/pro_court_logo_full_color_no_bg_2_owjtqf.png"
                  : "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1767487552/pro_court_logo_white_no_bg_2_ludutv.png"
              }
              alt="Pro Court Surfaces logo"
              width={160}
              height={40}
              className="h-8 sm:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-brand-text hover:text-brand-blue"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-brand-text hover:text-brand-blue"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue/90 transition-colors"
            >
              Get a Free Estimate
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={`h-6 w-6 ${scrolled ? "text-brand-text" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? "text-brand-text" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-brand-text text-sm font-medium py-2"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-brand-text text-sm font-medium py-2"
                >
                  {link.label}
                </a>
              )
            )}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold"
            >
              Get a Free Estimate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
