import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchFilters } from "@/components/marketplace/search-filters";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { CATEGORIES, CITIES } from "@/lib/constants";
import type { Vendor } from "@/types";
import { BACKEND } from "@/lib/config";

export const metadata: Metadata = {
  title: "Rechercher des prestataires",
  description: "Trouvez le prestataire mariage idéal en Tunisie.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; city?: string; rating?: string; plan?: string; sort?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const filters = await searchParams;

  const url = new URL("/api/v1/vendors", BACKEND);
  if (filters.category) url.searchParams.set("category", filters.category);
  if (filters.city) url.searchParams.set("city", filters.city);
  url.searchParams.set("limit", "100");

  let vendors: Vendor[] = [];
  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      vendors = (json.data ?? []) as Vendor[];
    }
  } catch {
    // fallback: empty list
  }

  // Client-side filters applied server-side
  if (filters.q) {
    const q = filters.q.toLowerCase();
    vendors = vendors.filter(
      (v) =>
        v.businessName.toLowerCase().includes(q) ||
        (v.tagline ?? "").toLowerCase().includes(q) ||
        v.category.name.toLowerCase().includes(q),
    );
  }
  if (filters.rating) {
    vendors = vendors.filter((v) => v.rating >= parseFloat(filters.rating!));
  }
  if (filters.plan === "GOLD") {
    vendors = vendors.filter((v) => v.plan === "GOLD");
  }

  const category = filters.category ? CATEGORIES.find((c) => c.slug === filters.category) : null;
  const city = filters.city ? CITIES.find((c) => c.slug === filters.city) : null;

  const title = [
    category?.name ?? (filters.q ?? "Tous les prestataires"),
    city ? `à ${city.name}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-1">
              {vendors.length} prestataire{vendors.length !== 1 ? "s" : ""} trouvé{vendors.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Suspense>
            <SearchFilters />
          </Suspense>

          {vendors.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-4">🔍</p>
              <h2 className="text-xl font-semibold mb-2">Aucun prestataire trouvé</h2>
              <p className="text-muted-foreground">Essayez d&apos;ajuster vos filtres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
