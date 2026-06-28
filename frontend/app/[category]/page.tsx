import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchFilters } from "@/components/marketplace/search-filters";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { CATEGORIES } from "@/lib/constants";
import type { Vendor } from "@/types";
import { BACKEND } from "@/lib/config";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ city?: string; sort?: string; rating?: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} in Tunisia`,
    description: `Find the best ${category.name.toLowerCase()} in Tunisia. Compare ${category.vendorCount}+ verified vendors, read reviews, and book online.`,
    openGraph: {
      title: `${category.name} in Tunisia | Wedify`,
      description: `Find ${category.vendorCount}+ ${category.name.toLowerCase()} across Tunisia.`,
    },
  };
}

async function fetchVendors(categorySlug: string, city?: string, rating?: string): Promise<Vendor[]> {
  try {
    const params = new URLSearchParams({ status: "ACTIVE", limit: "100" });
    if (city) params.set("city", city);
    if (rating) params.set("minRating", rating);
    const res = await fetch(
      `${BACKEND}/api/v1/vendors?category=${categorySlug}&${params.toString()}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.vendors ?? data.data ?? []);
  } catch {
    return [];
  }
}

async function fetchCityVendorCount(categorySlug: string, citySlug: string): Promise<number> {
  try {
    const res = await fetch(
      `${BACKEND}/api/v1/vendors?status=ACTIVE&category=${categorySlug}&city=${citySlug}&limit=1`,
      { cache: "no-store" }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data.total ?? (Array.isArray(data) ? data.length : 0);
  } catch {
    return 0;
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: slug } = await params;
  const filters = await searchParams;

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const vendors = await fetchVendors(slug, filters.city, filters.rating);

  const popularCitySlugs = ["tunis", "sousse", "sfax", "monastir", "nabeul"];
  const cityCounts = await Promise.all(
    popularCitySlugs.map(async (citySlug) => ({
      slug: citySlug,
      count: await fetchCityVendorCount(slug, citySlug),
    }))
  );

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Category hero */}
        <div className="bg-secondary/50 border-b py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{category.icon}</span>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">{category.name}</h1>
                <p className="text-muted-foreground mt-1">
                  {category.vendorCount}+ vendors across Tunisia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* SEO landing pages for city combos */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Popular cities:</span>
            {cityCounts.map(({ slug: citySlug, count }) => (
              <a
                key={citySlug}
                href={`/${slug}/${citySlug}`}
                className="rounded-full border px-3 py-1 text-xs hover:bg-muted transition-colors capitalize"
              >
                {citySlug.replace(/-/g, " ")} ({count})
              </a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-4">{vendors.length} results</p>

          <Suspense>
            <SearchFilters />
          </Suspense>

          {vendors.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-4">{category.icon}</p>
              <h2 className="text-xl font-semibold">No vendors in this category yet</h2>
              <p className="text-muted-foreground mt-2">Check back soon or explore other categories.</p>
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
