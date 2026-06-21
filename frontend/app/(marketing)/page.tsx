import type { Metadata } from "next";
import { HeroSection } from "@/components/homepage/hero";
import { CategoriesGrid } from "@/components/homepage/categories-grid";
import { FeaturedVendors } from "@/components/homepage/featured-vendors";
import { NewVendors } from "@/components/homepage/new-vendors";
import { PromotionsSection } from "@/components/homepage/promotions-section";
import { BlogPreview } from "@/components/homepage/blog-preview";
import { CTASection } from "@/components/homepage/cta-section";

export const metadata: Metadata = {
  title: "BonPlanMariage.tn — La marketplace N°1 des mariages en Tunisie",
  description:
    "Trouvez les meilleurs prestataires pour votre mariage en Tunisie. Salles de fêtes, photographes, traiteurs, décorateurs et bien plus.",
  openGraph: {
    title: "BonPlanMariage.tn — La marketplace N°1 des mariages en Tunisie",
    description: "Trouvez les meilleurs prestataires pour votre mariage en Tunisie.",
    type: "website",
    locale: "fr_TN",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesGrid />
      <FeaturedVendors />
      <NewVendors />
      <PromotionsSection />
      <BlogPreview />
      <CTASection />
    </>
  );
}
