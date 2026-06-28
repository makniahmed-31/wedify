// ─── Enums ─────────────────────────────────────────────────────────────────

export type SubscriptionPlan = "BRONZE" | "SILVER" | "GOLD";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "REFUNDED";

export type VendorStatus = "ACTIVE" | "PENDING" | "SUSPENDED" | "INACTIVE";

export type UserRole = "CUSTOMER" | "VENDOR" | "ADMIN";

export type NotificationChannel = "EMAIL" | "SMS" | "WHATSAPP" | "IN_APP";

// ─── User ───────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
}

// ─── Vendor ─────────────────────────────────────────────────────────────────

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
  responseTime?: string; // e.g. "Within 2 hours"
  plan: SubscriptionPlan;
  status: VendorStatus;
  rankScore: number;
  isVerified: boolean;
  isFeatured: boolean;
  theme: VendorTheme;
  languages: string[];
  yearsInBusiness?: number;
  minPrice?: number;
  maxPrice?: number;
  services: Service[];
  packages: Package[];
  createdAt: string;
  updatedAt: string;
  seo?: VendorSEO;
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
  score: number; // 0–100
}

// ─── Category ───────────────────────────────────────────────────────────────

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

// ─── City ───────────────────────────────────────────────────────────────────

export interface City {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  region?: string;
  vendorCount: number;
  image?: string;
}

// ─── Service ────────────────────────────────────────────────────────────────

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

// ─── Package ────────────────────────────────────────────────────────────────

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

// ─── Booking ─────────────────────────────────────────────────────────────────

export interface Booking {
  id: string;
  vendor: Pick<Vendor, "id" | "businessName" | "slug" | "coverImage" | "category">;
  customer: Pick<User, "id" | "name" | "email" | "phone">;
  serviceId?: string;
  packageId?: string;
  date: string;
  time?: string;
  guestCount?: number;
  status: BookingStatus;
  totalAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  vendorId: string;
  customer: Pick<User, "id" | "name" | "avatar">;
  rating: number; // 1–5
  title?: string;
  body: string;
  photos?: string[];
  isVerified: boolean;
  createdAt: string;
  vendorReply?: string;
}

// ─── Subscription ────────────────────────────────────────────────────────────

export interface SubscriptionPlanConfig {
  id: string;
  name: SubscriptionPlan;
  label: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  rankBoost: number;
  isPopular?: boolean;
}

export interface VendorSubscription {
  id: string;
  vendorId: string;
  plan: SubscriptionPlan;
  status: "ACTIVE" | "CANCELLED" | "PAST_DUE" | "TRIALING";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface VendorAnalytics {
  profileViews: number;
  profileViewsChange: number;
  clicks: number;
  clicksChange: number;
  leads: number;
  leadsChange: number;
  bookings: number;
  bookingsChange: number;
  conversionRate: number;
  conversionRateChange: number;
  revenue: number;
  revenueChange: number;
  viewsOverTime: TimeSeriesPoint[];
  bookingsOverTime: TimeSeriesPoint[];
  topSearchKeywords: string[];
  trafficSources: TrafficSource[];
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface TrafficSource {
  source: string;
  percentage: number;
  visits: number;
}

// ─── Admin Analytics ─────────────────────────────────────────────────────────

export interface AdminAnalytics {
  mrr: number;
  mrrChange: number;
  arr: number;
  totalVendors: number;
  totalVendorsChange: number;
  activeSubscriptions: number;
  totalBookings: number;
  totalRevenue: number;
  revenueOverTime: TimeSeriesPoint[];
  vendorsByPlan: { plan: SubscriptionPlan; count: number }[];
  revenueByCategory: { category: string; revenue: number }[];
  conversionFunnel: FunnelStep[];
}

export interface FunnelStep {
  step: string;
  count: number;
  percentage: number;
}

// ─── Search ──────────────────────────────────────────────────────────────────

export interface SearchFilters {
  query?: string;
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  plan?: SubscriptionPlan;
  languages?: string[];
  sort?: "RANK" | "RATING" | "PRICE_ASC" | "PRICE_DESC" | "NEWEST";
  page?: number;
  limit?: number;
}

export interface SearchResult {
  vendors: Vendor[];
  total: number;
  page: number;
  totalPages: number;
  filters: SearchFilters;
}

// ─── Notification ────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: Pick<User, "name" | "avatar">;
  tags: string[];
  publishedAt: string;
  readingTime: number;
}

// ─── Page Builder ────────────────────────────────────────────────────────────

export type BlockType =
  | "HERO"
  | "ABOUT"
  | "SERVICES"
  | "GALLERY"
  | "PRICING"
  | "TESTIMONIALS"
  | "FAQ"
  | "CONTACT"
  | "CTA"
  | "VIDEO";

export interface PageBlock {
  id: string;
  type: BlockType;
  order: number;
  isVisible: boolean;
  config: Record<string, unknown>;
}
