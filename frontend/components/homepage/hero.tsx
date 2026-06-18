"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Grid3X3 } from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/constants";

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=90')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-white/90 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          La marketplace N°1 des mariages en Tunisie
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Planifiez Votre{" "}
          <span className="text-gradient-gold">Mariage</span>
          <br />
          de Rêve
        </h1>

        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Découvrez 1 850+ prestataires de mariage de confiance à travers la Tunisie. Comparez, consultez les avis et réservez — tout en un seul endroit.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto"
        >
          {/* Search input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Photographers, halls, decorators..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="hidden sm:block w-px bg-border" />

          {/* Category select */}
          <div className="flex items-center gap-3 px-4 py-2">
            <Grid3X3 className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-sm outline-none text-foreground min-w-[140px]"
            >
              <option value="">Toutes les catégories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:block w-px bg-border" />

          {/* City select */}
          <div className="flex items-center gap-3 px-4 py-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent text-sm outline-none text-foreground min-w-[120px]"
            >
              <option value="">Toutes les villes</option>
              {CITIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-90 active:scale-95 transition-all"
          >
            <Search className="h-4 w-4" />
            Rechercher
          </button>
        </form>

        {/* Popular searches */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-white/60">Populaire :</span>
          {["Salle de mariage Tunis", "Photographe Sousse", "Décorateur Sfax", "Gâteau de mariage"].map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                router.push(`/search?q=${encodeURIComponent(term)}`);
              }}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/80 hover:bg-white/20 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-9 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
