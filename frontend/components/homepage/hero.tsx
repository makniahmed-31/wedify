"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  LayoutGrid,
  Wallet,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";

const HERO_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=85",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=85",
  },
];

export function HeroSection() {
  const router = useRouter();
  const { t } = useI18n();
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    if (budget) params.set("budget", budget);
    if (date) params.set("date", date);
    router.push(`/search?${params.toString()}`);
  }

  function prev() {
    setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }
  function next() {
    setSlide((s) => (s + 1) % HERO_SLIDES.length);
  }

  return (
    <div>
      <section className="relative h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('${HERO_SLIDES[slide].image}')` }}
        />
        <div className="absolute inset-0 gradient-hero" />

        <div className="relative z-10 h-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
              {t("hero.title")}{" "}
              <span className="text-primary">{t("hero.highlight")}</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push("/search")}
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-coral hover:opacity-90 transition-opacity"
              >
                <Search className="h-4 w-4" />
                {t("hero.findVendor")}
              </button>
              <button
                onClick={() => router.push("/devis")}
                className="flex items-center gap-2 rounded-lg border border-white/50 bg-white/10 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                {t("hero.postRequest")}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all ${i === slide ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/50"}`}
            />
          ))}
        </div>
      </section>

      {/* Search bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-xl border border-border/40 p-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
              <LayoutGrid className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground leading-none mb-0.5">
                  {t("search.category")}
                </p>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-foreground"
                >
                  <option value="">{t("search.allCategories")}</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground leading-none mb-0.5">
                  {t("search.city")}
                </p>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-foreground"
                >
                  <option value="">{t("search.allCities")}</option>
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
              <Wallet className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground leading-none mb-0.5">
                  {t("search.budget")}
                </p>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-foreground"
                >
                  <option value="">{t("search.allBudgets")}</option>
                  <option value="0-500">{"< 500 DT"}</option>
                  <option value="500-1000">500 – 1 000 DT</option>
                  <option value="1000-3000">1 000 – 3 000 DT</option>
                  <option value="3000+">{"+ 3 000 DT"}</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground leading-none mb-0.5">
                  {t("search.weddingDate")}
                </p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-foreground"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-coral hover:opacity-90 transition-opacity"
            >
              <Search className="h-4 w-4" />
              {t("search.search")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
