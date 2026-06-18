"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Menu, X, Heart, ChevronDown, Bell, User } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openCategories() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCategoriesOpen(true);
  }

  function delayCloseCategories() {
    closeTimer.current = setTimeout(() => setCategoriesOpen(false), 200);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 fill-primary text-primary" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gradient-gold">Wedify</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={openCategories}
              onMouseLeave={delayCloseCategories}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Catégories
                <ChevronDown className="h-4 w-4" />
              </button>
              {categoriesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-72 rounded-xl border bg-card shadow-lg p-3 grid grid-cols-2 gap-1"
                  onMouseEnter={openCategories}
                  onMouseLeave={delayCloseCategories}
                >
                  {CATEGORIES.slice(0, 12).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className="col-span-2 rounded-lg px-3 py-2 text-sm text-primary font-medium hover:bg-muted text-center transition-colors"
                  >
                    Voir toutes les catégories →
                  </Link>
                </div>
              )}
            </div>

            <Link href="/vendors" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Prestataires
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Pour les prestataires
            </Link>
            <Link href="/blog" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Inspiration
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              <Bell className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href="/register/vendor"
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-gold hover:opacity-90 transition-opacity"
            >
              Référencer mon entreprise
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-background px-4 py-4 space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-1">Catégories</p>
            {CATEGORIES.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
          <div className="border-t pt-3 space-y-1">
            <Link href="/vendors" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Prestataires</Link>
            <Link href="/pricing" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Pour les prestataires</Link>
            <Link href="/blog" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Inspiration</Link>
          </div>
          <div className="border-t pt-3 flex flex-col gap-2">
            <Link href="/login" className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>
              <User className="h-4 w-4" /> Se connecter
            </Link>
            <Link href="/register/vendor" className="flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground" onClick={() => setMobileOpen(false)}>
              Référencer mon entreprise
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
