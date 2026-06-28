import { CATEGORIES, CITIES } from "@/lib/constants";
import type { Vendor } from "@/lib/types";

export const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:4001";
export const DEFAULT_COVER = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80";

const DEFAULT_THEME = {
  id: "default", name: "Default",
  primaryColor: "#C9A84C", secondaryColor: "#FDF8EC", accentColor: "#8B6914",
  fontHeading: "Playfair Display", fontBody: "Inter",
};

export function toVendor(raw: any): Vendor {
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
    plan: raw.plan ?? "BRONZE",
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
