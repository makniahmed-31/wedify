import type { Category, City, SubscriptionPlanConfig } from "./types";

// ─── Categories ──────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: "cat_halls", slug: "wedding-halls", name: "Wedding Halls", nameAr: "قاعات الأعراس", icon: "🏛️", vendorCount: 142, image: "/images/categories/halls.jpg" },
  { id: "cat_venues", slug: "wedding-venues", name: "Wedding Venues", nameAr: "فضاءات الأعراس", icon: "🌿", vendorCount: 87, image: "/images/categories/venues.jpg" },
  { id: "cat_photo", slug: "photographers", name: "Photographers", nameAr: "المصورون", icon: "📸", vendorCount: 210, image: "/images/categories/photographers.jpg" },
  { id: "cat_video", slug: "videographers", name: "Videographers", nameAr: "مصورو الفيديو", icon: "🎬", vendorCount: 98, image: "/images/categories/video.jpg" },
  { id: "cat_decor", slug: "decorators", name: "Decorators", nameAr: "المزينون", icon: "🌸", vendorCount: 175, image: "/images/categories/decor.jpg" },
  { id: "cat_planners", slug: "wedding-planners", name: "Wedding Planners", nameAr: "منظمو الأعراس", icon: "📋", vendorCount: 63, image: "/images/categories/planners.jpg" },
  { id: "cat_catering", slug: "catering", name: "Catering", nameAr: "تقديم الطعام", icon: "🍽️", vendorCount: 134, image: "/images/categories/catering.jpg" },
  { id: "cat_juices", slug: "juices", name: "Juices & Drinks", nameAr: "العصائر والمشروبات", icon: "🥤", vendorCount: 45, image: "/images/categories/juices.jpg" },
  { id: "cat_sweets", slug: "sweets", name: "Sweets & Cakes", nameAr: "الحلويات والكعك", icon: "🎂", vendorCount: 89, image: "/images/categories/sweets.jpg" },
  { id: "cat_salty", slug: "salty-food", name: "Salty Food", nameAr: "المأكولات المالحة", icon: "🥗", vendorCount: 56, image: "/images/categories/salty.jpg" },
  { id: "cat_waiters", slug: "waiters", name: "Waiters & Staff", nameAr: "الطاقم والنوادل", icon: "🤵", vendorCount: 38, image: "/images/categories/waiters.jpg" },
  { id: "cat_music", slug: "music-bands", name: "Music Bands", nameAr: "الفرق الموسيقية", icon: "🎵", vendorCount: 72, image: "/images/categories/music.jpg" },
  { id: "cat_dj", slug: "djs", name: "DJs", nameAr: "الدي جي", icon: "🎧", vendorCount: 91, image: "/images/categories/dj.jpg" },
  { id: "cat_animators", slug: "animators", name: "Animators", nameAr: "المنشطون", icon: "🎭", vendorCount: 34, image: "/images/categories/animators.jpg" },
  { id: "cat_makeup", slug: "makeup-artists", name: "Makeup Artists", nameAr: "فنانو المكياج", icon: "💄", vendorCount: 156, image: "/images/categories/makeup.jpg" },
  { id: "cat_henna", slug: "henna-artists", name: "Henna Artists", nameAr: "فنانو الحناء", icon: "🌺", vendorCount: 67, image: "/images/categories/henna.jpg" },
  { id: "cat_traditional", slug: "traditional-services", name: "Traditional Services", nameAr: "الخدمات التقليدية", icon: "🎊", vendorCount: 49, image: "/images/categories/traditional.jpg" },
];

// ─── Cities ──────────────────────────────────────────────────────────────────

export const CITIES: City[] = [
  { id: "city_tunis", slug: "tunis", name: "Tunis", nameAr: "تونس", region: "Grand Tunis", vendorCount: 487, image: "/images/cities/tunis.jpg" },
  { id: "city_sfax", slug: "sfax", name: "Sfax", nameAr: "صفاقس", region: "Centre-Est", vendorCount: 213, image: "/images/cities/sfax.jpg" },
  { id: "city_sousse", slug: "sousse", name: "Sousse", nameAr: "سوسة", region: "Centre-Est", vendorCount: 178, image: "/images/cities/sousse.jpg" },
  { id: "city_monastir", slug: "monastir", name: "Monastir", nameAr: "المنستير", region: "Centre-Est", vendorCount: 124, image: "/images/cities/monastir.jpg" },
  { id: "city_gabes", slug: "gabes", name: "Gabès", nameAr: "قابس", region: "Sud", vendorCount: 89, image: "/images/cities/gabes.jpg" },
  { id: "city_nabeul", slug: "nabeul", name: "Nabeul", nameAr: "نابل", region: "Nord-Est", vendorCount: 96, image: "/images/cities/nabeul.jpg" },
  { id: "city_bizerte", slug: "bizerte", name: "Bizerte", nameAr: "بنزرت", region: "Nord", vendorCount: 71, image: "/images/cities/bizerte.jpg" },
  { id: "city_ariana", slug: "ariana", name: "Ariana", nameAr: "أريانة", region: "Grand Tunis", vendorCount: 143, image: "/images/cities/ariana.jpg" },
  { id: "city_manouba", slug: "manouba", name: "Manouba", nameAr: "منوبة", region: "Grand Tunis", vendorCount: 67, image: "/images/cities/manouba.jpg" },
  { id: "city_benarous", slug: "ben-arous", name: "Ben Arous", nameAr: "بن عروس", region: "Grand Tunis", vendorCount: 98, image: "/images/cities/benarous.jpg" },
  { id: "city_kairouan", slug: "kairouan", name: "Kairouan", nameAr: "القيروان", region: "Centre-Ouest", vendorCount: 54, image: "/images/cities/kairouan.jpg" },
  { id: "city_hammamet", slug: "hammamet", name: "Hammamet", nameAr: "الحمامات", region: "Nord-Est", vendorCount: 112, image: "/images/cities/hammamet.jpg" },
];

// ─── Subscription Plans ───────────────────────────────────────────────────────

export const SUBSCRIPTION_PLANS: SubscriptionPlanConfig[] = [
  {
    id: "plan_basic",
    name: "BASIC",
    label: "Basic",
    description: "Start your online presence",
    priceMonthly: 29,
    priceAnnual: 290,
    rankBoost: 10,
    features: [
      "Standard profile page",
      "Up to 10 gallery photos",
      "Basic analytics dashboard",
      "Standard search placement",
      "Email notifications",
      "1 service listing",
    ],
  },
  {
    id: "plan_pro",
    name: "PRO",
    label: "Pro",
    description: "Grow your business",
    priceMonthly: 79,
    priceAnnual: 790,
    rankBoost: 50,
    isPopular: true,
    features: [
      "Everything in Basic",
      "Up to 50 gallery photos",
      "SEO optimization tools",
      "Advanced analytics",
      "Better search ranking",
      "Up to 10 service listings",
      "Custom packages",
      "Review management",
      "Lead inbox",
    ],
  },
  {
    id: "plan_premium",
    name: "PREMIUM",
    label: "Premium",
    description: "Dominate your market",
    priceMonthly: 149,
    priceAnnual: 1490,
    rankBoost: 100,
    features: [
      "Everything in Pro",
      "Unlimited gallery",
      "Homepage featured placement",
      "Highest ranking priority",
      "Full branding & theme control",
      "Custom domain support",
      "AI SEO recommendations",
      "Priority support",
      "Unlimited service listings",
      "WhatsApp notifications",
      "Booking calendar",
    ],
  },
];

// ─── Ranking Weights ──────────────────────────────────────────────────────────

export const RANKING_WEIGHTS = {
  subscription: { PREMIUM: 100, PRO: 50, BASIC: 10 },
  profileCompleteness: 0.15,
  reviewScore: 0.25,
  reviewCount: 0.10,
  responseTime: 0.10,
  bookingConversions: 0.15,
  recentActivity: 0.10,
  clickThroughRate: 0.15,
} as const;

// ─── Vendor Themes ────────────────────────────────────────────────────────────

export const VENDOR_THEMES = [
  { id: "luxury-gold", name: "Luxury Gold", primaryColor: "#C9A84C", secondaryColor: "#FDF8EC", accentColor: "#8B6914", fontHeading: "Playfair Display", fontBody: "Inter" },
  { id: "romantic-rose", name: "Romantic Rose", primaryColor: "#E8A0BF", secondaryColor: "#FDF2F7", accentColor: "#C45C8A", fontHeading: "Cormorant Garamond", fontBody: "Lato" },
  { id: "modern-minimal", name: "Modern Minimal", primaryColor: "#2D2D2D", secondaryColor: "#F5F5F5", accentColor: "#888888", fontHeading: "Montserrat", fontBody: "Open Sans" },
  { id: "traditional", name: "Traditional Wedding", primaryColor: "#8B1A1A", secondaryColor: "#FFF8F0", accentColor: "#C65B00", fontHeading: "Scheherazade New", fontBody: "Noto Sans Arabic" },
] as const;

// ─── Languages ────────────────────────────────────────────────────────────────

export const LANGUAGES = ["Arabic", "French", "English", "German", "Italian", "Spanish"];

// ─── Sort Options ─────────────────────────────────────────────────────────────

export const SORT_OPTIONS = [
  { value: "RANK", label: "Best Match" },
  { value: "RATING", label: "Highest Rated" },
  { value: "PRICE_ASC", label: "Price: Low to High" },
  { value: "PRICE_DESC", label: "Price: High to Low" },
  { value: "NEWEST", label: "Newest" },
] as const;

// ─── Platform Stats ───────────────────────────────────────────────────────────

export const PLATFORM_STATS = {
  vendors: 1850,
  cities: 24,
  bookings: 12400,
  happyCouples: 8700,
};

export const CURRENCY = "TND";
export const CURRENCY_SYMBOL = "د.ت";
