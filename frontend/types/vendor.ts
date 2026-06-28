export type SubscriptionPlan = "BRONZE" | "SILVER" | "GOLD";
export type VendorStatus = "ACTIVE" | "PENDING" | "SUSPENDED" | "INACTIVE";

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  icon: string;
  description?: string;
  vendorCount: number;
  image?: string;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  region?: string;
  vendorCount: number;
  image?: string;
}

export interface VendorTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface VendorSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  score: number;
}

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  priceUnit: "FIXED" | "PER_PERSON" | "PER_HOUR" | "STARTING_FROM";
  duration?: string;
  image?: string;
  isActive: boolean;
}

export interface Package {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  priceUnit: "FIXED" | "PER_PERSON";
  features: string[];
  isPopular: boolean;
  isActive: boolean;
}

export interface Vendor {
  id: string;
  slug: string;
  businessName: string;
  tagline?: string;
  description: string;
  category: Category;
  city: City;
  address?: string;
  phone: string;
  email: string;
  website?: string;
  whatsapp?: string;
  coverImage: string;
  logoImage?: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  responseTime?: string;
  plan: SubscriptionPlan;
  status: VendorStatus;
  rankScore: number;
  isVerified: boolean;
  isFeatured: boolean;
  theme?: VendorTheme;
  languages?: string[];
  yearsInBusiness?: number;
  minPrice?: number;
  maxPrice?: number;
  services?: Service[];
  packages?: Package[];
  createdAt: string;
  updatedAt: string;
  seo?: VendorSEO;
}
