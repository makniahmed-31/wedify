import type { Category, City, SubscriptionPlanConfig } from "./types";

// ─── Categories ──────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: "cat_halls", slug: "salles-de-fete", name: "Salle des fêtes", nameAr: "قاعات الأفراح", icon: "🏛️", vendorCount: 142, image: "/images/categories/halls.jpg" },
  { id: "cat_photo", slug: "photographes", name: "Photographe", nameAr: "المصورون", icon: "📸", vendorCount: 210, image: "/images/categories/photographers.jpg" },
  { id: "cat_video", slug: "videastes", name: "Vidéaste", nameAr: "مصورو الفيديو", icon: "🎬", vendorCount: 98, image: "/images/categories/video.jpg" },
  { id: "cat_catering", slug: "traiteurs", name: "Traiteur", nameAr: "تقديم الطعام", icon: "🍽️", vendorCount: 134, image: "/images/categories/catering.jpg" },
  { id: "cat_decor", slug: "decoration", name: "Décoration", nameAr: "الديكور", icon: "🌸", vendorCount: 175, image: "/images/categories/decor.jpg" },
  { id: "cat_dress", slug: "robes-de-mariee", name: "Robe de mariée", nameAr: "فساتين الأعراس", icon: "👗", vendorCount: 89, image: "/images/categories/dress.jpg" },
  { id: "cat_car", slug: "location-voiture", name: "Location Voiture", nameAr: "تأجير سيارات", icon: "🚗", vendorCount: 56, image: "/images/categories/car.jpg" },
  { id: "cat_dj", slug: "dj-animation", name: "DJ & Animation", nameAr: "الدي جي", icon: "🎧", vendorCount: 91, image: "/images/categories/dj.jpg" },
  { id: "cat_music", slug: "troupes-musicales", name: "Troupe musicale", nameAr: "الفرق الموسيقية", icon: "🎵", vendorCount: 72, image: "/images/categories/music.jpg" },
  { id: "cat_planners", slug: "wedding-planners", name: "Wedding Planner", nameAr: "منظمو الأعراس", icon: "📋", vendorCount: 63, image: "/images/categories/planners.jpg" },
  { id: "cat_makeup", slug: "maquillage-coiffure", name: "Beauté & Maquillage", nameAr: "التجميل", icon: "💄", vendorCount: 156, image: "/images/categories/makeup.jpg" },
  { id: "cat_flowers", slug: "fleurs", name: "Fleurs", nameAr: "الزهور", icon: "💐", vendorCount: 67, image: "/images/categories/flowers.jpg" },
  { id: "cat_costume", slug: "costumes", name: "Costume", nameAr: "بدلات الرجال", icon: "🤵", vendorCount: 45, image: "/images/categories/costume.jpg" },
  { id: "cat_furniture", slug: "meubles", name: "Meubles & Déco", nameAr: "الأثاث", icon: "🪑", vendorCount: 38, image: "/images/categories/furniture.jpg" },
  { id: "cat_sweets", slug: "patisserie", name: "Pâtisserie", nameAr: "الحلويات", icon: "🎂", vendorCount: 89, image: "/images/categories/sweets.jpg" },
  { id: "cat_gifts", slug: "cadeaux", name: "Cadeaux", nameAr: "الهدايا", icon: "🎁", vendorCount: 49, image: "/images/categories/gifts.jpg" },
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
    id: "plan_bronze",
    name: "BRONZE",
    label: "Bronze",
    description: "Idéal pour bien démarrer",
    priceMonthly: 25,
    priceAnnual: 250,
    rankBoost: 10,
    features: [
      "Profil prestataire standard",
      "Jusqu'à 5 photos dans votre galerie",
      "Publier jusqu'à 5 services",
      "Apparition dans les résultats de recherche",
      "Support par email",
    ],
  },
  {
    id: "plan_silver",
    name: "SILVER",
    label: "Silver",
    description: "Pour plus de visibilité",
    priceMonthly: 50,
    priceAnnual: 500,
    rankBoost: 50,
    isPopular: true,
    features: [
      "Tout dans le pack Bronze",
      "Jusqu'à 15 photos dans votre galerie",
      "Publier jusqu'à 15 services",
      "Mise en avant dans les résultats",
      "Badge « Prestataire vérifié »",
      "Support prioritaire",
    ],
  },
  {
    id: "plan_gold",
    name: "GOLD",
    label: "Gold",
    description: "Pour une visibilité maximale",
    priceMonthly: 75,
    priceAnnual: 750,
    rankBoost: 100,
    features: [
      "Tout dans le pack Silver",
      "Galerie illimitée",
      "Services illimités",
      "Mise en avant premium en page d'accueil",
      "Statistiques détaillées de votre profil",
      "Support dédié 7j/7",
    ],
  },
];

// ─── Ranking Weights ──────────────────────────────────────────────────────────

export const RANKING_WEIGHTS = {
  subscription: { GOLD: 100, SILVER: 50, BRONZE: 10 },
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
  vendors: 5000,
  cities: 24,
  bookings: 10000,
  happyCouples: 10000,
};

export const CURRENCY = "TND";
export const CURRENCY_SYMBOL = "د.ت";
