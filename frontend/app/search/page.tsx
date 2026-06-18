import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchFilters } from "@/components/marketplace/search-filters";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { MOCK_VENDORS } from "@/lib/mock-data";
import { CATEGORIES, CITIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Search Wedding Vendors",
  description: "Find the perfect wedding vendor in Tunisia. Search by category, city, price and rating.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; city?: string; rating?: string; plan?: string; sort?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const filters = await searchParams;

  // Filter vendors based on query params
  let vendors = [...MOCK_VENDORS];

  if (filters.category) {
    vendors = vendors.filter((v) => v.category.slug === filters.category);
  }
  if (filters.city) {
    vendors = vendors.filter((v) => v.city.slug === filters.city);
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    vendors = vendors.filter(
      (v) =>
        v.businessName.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.category.name.toLowerCase().includes(q)
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
    category?.name ?? (filters.q ?? "All Vendors"),
    city ? `in ${city.name}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-1">
              {vendors.length} vendor{vendors.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Filters */}
          <Suspense>
            <SearchFilters />
          </Suspense>

          {/* Results */}
          {vendors.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-4">🔍</p>
              <h2 className="text-xl font-semibold mb-2">No vendors found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
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
