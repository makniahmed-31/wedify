import type { Metadata } from "next";
import { HeroSection } from "@/components/homepage/hero";
import { StatsBar } from "@/components/homepage/stats-bar";
import { CategoriesGrid } from "@/components/homepage/categories-grid";
import { FeaturedVendors } from "@/components/homepage/featured-vendors";
import { CitiesSection } from "@/components/homepage/cities-section";
import { LatestReviews } from "@/components/homepage/latest-reviews";
import { BlogPreview } from "@/components/homepage/blog-preview";
import { CTASection } from "@/components/homepage/cta-section";

export const metadata: Metadata = {
  title: "Wedify — Tunisia's #1 Wedding Marketplace",
  description:
    "Discover 1,850+ wedding vendors across Tunisia. Compare photographers, halls, decorators, caterers and more. Plan your perfect wedding on Wedify.",
  openGraph: {
    title: "Wedify — Tunisia's #1 Wedding Marketplace",
    description: "Find the best wedding vendors in Tunisia. Book photographers, halls, decorators and more.",
    type: "website",
    locale: "en_US",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedVendors />
      <CategoriesGrid />
      <CitiesSection />
      <LatestReviews />
      <BlogPreview />
      <CTASection />
    </>
  );
}
