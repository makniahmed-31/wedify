import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchFilters } from "@/components/marketplace/search-filters";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { CATEGORIES, CITIES } from "@/lib/constants";
import type { Vendor } from "@/types";
import { BACKEND } from "@/lib/config";

interface Props {
  params: Promise<{ category: string; city: string }>;
}

export async function generateStaticParams() {
  const paths: { category: string; city: string }[] = [];
  for (const cat of CATEGORIES) {
    for (const city of CITIES) {
      paths.push({ category: cat.slug, city: city.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug, city: citySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === catSlug);
  const city = CITIES.find((c) => c.slug === citySlug);
  if (!category || !city) return {};

  return {
    title: `${category.name} in ${city.name}`,
    description: `Find the best ${category.name.toLowerCase()} in ${city.name}, Tunisia. Compare verified vendors, read reviews, and book online on Wedify.`,
    openGraph: {
      title: `${category.name} in ${city.name} | Wedify`,
    },
  };
}

async function fetchVendors(categorySlug: string, citySlug: string): Promise<Vendor[]> {
  try {
    const res = await fetch(
      `${BACKEND}/api/v1/vendors?status=ACTIVE&category=${categorySlug}&city=${citySlug}&limit=100`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.vendors ?? data.data ?? []);
  } catch {
    return [];
  }
}

export default async function CategoryCityPage({ params }: Props) {
  const { category: catSlug, city: citySlug } = await params;

  const category = CATEGORIES.find((c) => c.slug === catSlug);
  const city = CITIES.find((c) => c.slug === citySlug);

  if (!category || !city) notFound();

  const vendors = await fetchVendors(catSlug, citySlug);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Breadcrumb + Hero */}
        <div className="bg-secondary/50 border-b py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-muted-foreground mb-3">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              {" / "}
              <Link href={`/${catSlug}`} className="hover:text-foreground">
                {category.name}
              </Link>
              {" / "}
              <span>{city.name}</span>
            </nav>
            <h1 className="text-3xl lg:text-4xl font-bold">
              {category.name} in {city.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              {vendors.length > 0
                ? `${vendors.length} verified ${category.name.toLowerCase()} in ${city.name}`
                : `Find the best ${category.name.toLowerCase()} for your wedding in ${city.name}`}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* SEO text block */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <h2 className="font-semibold mb-2">
              About {category.name} in {city.name}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Looking for the perfect {category.name.toLowerCase()} for your
              wedding in {city.name}? Wedify connects you with{" "}
              {category.vendorCount}+ verified {category.name.toLowerCase()}{" "}
              across Tunisia. Read genuine reviews, compare prices, and book
              directly — all in one place.
            </p>
          </div>

          <Suspense>
            <SearchFilters />
          </Suspense>

          {vendors.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">{category.icon}</p>
              <h2 className="text-xl font-semibold">
                No {category.name.toLowerCase()} in {city.name} yet
              </h2>
              <p className="text-muted-foreground mt-2 mb-6">
                Browse {category.name.toLowerCase()} in other cities.
              </p>
              <Link
                href={`/${catSlug}`}
                className="rounded-full border px-5 py-2.5 text-sm font-medium hover:bg-muted"
              >
                View all {category.name}
              </Link>
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
