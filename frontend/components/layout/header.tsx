"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, Crown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  const navLinks: [string, string][] = [
    [t("nav.home"), "/"],
    [t("nav.vendors"), "/vendors"],
    [t("nav.promotions"), "/promotions"],
    [t("nav.blog"), "/blog"],
    [t("nav.cities"), "/villes"],
    [t("nav.contact"), "/contact"],
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 24s-10-6.5-10-13a6 6 0 0 1 10-4.47A6 6 0 0 1 24 11c0 6.5-10 13-10 13z"
                fill="#D88C70"
                stroke="#D88C70"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="14" cy="11" r="3" fill="white" fillOpacity="0.6" />
            </svg>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-foreground">BonPlanMariage</span>
              <span className="text-primary">.tn</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(([label, href], i) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${i === 0 ? "text-foreground border-b-2 border-primary pb-0.5" : "text-foreground/70 hover:text-foreground"}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Language switcher */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground/70 hover:bg-muted transition-colors"
              title={locale === "fr" ? "عربي" : "Français"}
            >
              {locale === "fr" ? "🇹🇳 عربي" : "🇫🇷 FR"}
            </button>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-muted transition-colors"
            >
              <User className="h-4 w-4" />
              {t("nav.login")}
            </Link>
            <Link
              href="/register/vendor"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-coral hover:opacity-90 transition-opacity"
            >
              <Crown className="h-4 w-4" />
              {t("nav.becomeVendor")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-4 space-y-3">
          <nav className="space-y-1">
            {navLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="border-t pt-3 space-y-2">
            <button
              onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium"
            >
              {locale === "fr" ? "🇹🇳 عربي" : "🇫🇷 Français"}
            </button>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              <User className="h-4 w-4" /> {t("nav.login")}
            </Link>
            <Link
              href="/register/vendor"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              <Crown className="h-4 w-4" /> {t("nav.becomeVendor")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
