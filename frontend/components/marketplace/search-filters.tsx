"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, CITIES, SORT_OPTIONS } from "@/lib/constants";

export function SearchFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`?${next.toString()}`);
  }

  function clear() {
    router.push("?");
  }

  const hasFilters = params.size > 0;

  return (
    <div className="flex flex-wrap items-center gap-3 py-4">
      <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <SlidersHorizontal className="h-4 w-4" />
        Filters:
      </div>

      {/* Category */}
      <select
        value={params.get("category") ?? ""}
        onChange={(e) => update("category", e.target.value)}
        className="rounded-full border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.id} value={cat.slug}>{cat.icon} {cat.name}</option>
        ))}
      </select>

      {/* City */}
      <select
        value={params.get("city") ?? ""}
        onChange={(e) => update("city", e.target.value)}
        className="rounded-full border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">All Cities</option>
        {CITIES.map((city) => (
          <option key={city.id} value={city.slug}>{city.name}</option>
        ))}
      </select>

      {/* Rating */}
      <select
        value={params.get("rating") ?? ""}
        onChange={(e) => update("rating", e.target.value)}
        className="rounded-full border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">Any Rating</option>
        <option value="4.5">4.5+ ⭐</option>
        <option value="4">4.0+ ⭐</option>
        <option value="3">3.0+ ⭐</option>
      </select>

      {/* Plan */}
      <select
        value={params.get("plan") ?? ""}
        onChange={(e) => update("plan", e.target.value)}
        className="rounded-full border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">All Plans</option>
        <option value="PREMIUM">Premium Only</option>
        <option value="PRO">Pro & Premium</option>
      </select>

      {/* Sort */}
      <select
        value={params.get("sort") ?? "RANK"}
        onChange={(e) => update("sort", e.target.value)}
        className="rounded-full border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary ml-auto"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={clear}
          className="flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/5 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
        >
          <X className="h-3.5 w-3.5" /> Clear all
        </button>
      )}
    </div>
  );
}
