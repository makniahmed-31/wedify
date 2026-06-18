import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchFilters } from "@/components/marketplace/search-filters";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { CATEGORIES, CITIES } from "@/lib/constants";
import type { Vendor } from "@/lib/types";

export const metadata: Metadata = {
  title: "Rechercher des prestataires",
  description: "Trouvez le prestataire mariage idéal en Tunisie.",
};

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:4001";
const DEFAULT_COVER = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80";
const DEFAULT_THEME = {
  id: "default", name: "Default",
  primaryColor: "#C9A84C", secondaryColor: "#FDF8EC", accentColor: "#8B6914",
  fontHeading: "Playfair Display", fontBody: "Inter",
};

function toVendor(raw: any): Vendor {
  const cat = CATEGORIES.find((c) => c.slug === raw.categorySlug) ?? {
    id: raw.categorySlug ?? "other", slug: raw.categorySlug ?? "other",
    name: raw.category ?? "Autre", nameAr: "", icon: "🏪", vendorCount: 0, image: "",
  };
  const city = CITIES.find((c) => c.slug === raw.citySlug) ?? {
    id: raw.citySlug ?? "other", slug: raw.citySlug ?? "other",
    name: raw.city ?? "Tunisie", nameAr: "", region: "", vendorCount: 0, image: "",
  };
  return {
    id: raw.id,
    slug: raw.slug ?? raw.id,
    businessName: raw.businessName,
    tagline: raw.tagline,
    description: raw.description ?? "",
    category: cat,
    city,
    address: "",
    phone: raw.phone ?? "",
    email: raw.email ?? "",
    website: raw.website,
    whatsapp: raw.whatsapp,
    coverImage: raw.coverImage ?? DEFAULT_COVER,
    gallery: [],
    rating: raw.rating ?? 0,
    reviewCount: raw.reviewCount ?? 0,
    responseTime: raw.responseTime,
    plan: raw.plan ?? "BASIC",
    status: raw.status ?? "ACTIVE",
    rankScore: raw.rankScore ?? 0,
    isVerified: raw.isVerified ?? false,
    isFeatured: raw.isFeatured ?? false,
    theme: DEFAULT_THEME,
    languages: [],
    yearsInBusiness: raw.yearsInBusiness,
    minPrice: raw.minPrice,
    maxPrice: raw.maxPrice,
    services: [],
    packages: [],
    createdAt: raw.createdAt,
    updatedAt: raw.createdAt,
  };
}

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
      vendors = (json.data ?? []).map(toVendor);
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
  if (filters.plan === "PREMIUM") {
    vendors = vendors.filter((v) => v.plan === "PREMIUM");
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
