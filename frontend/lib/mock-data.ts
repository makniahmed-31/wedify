import type { Vendor, Review, Booking, BlogPost } from "./types";
import { CATEGORIES, CITIES } from "./constants";

// ─── Mock Vendors ─────────────────────────────────────────────────────────────

export const MOCK_VENDORS: Vendor[] = [
  {
    id: "v1",
    slug: "elegance-hall-tunis",
    businessName: "Elegance Hall",
    tagline: "Where Dreams Become Reality",
    description:
      "Elegance Hall is Tunisia's premier wedding venue, offering breathtaking spaces for your special day. With capacity for up to 800 guests, our hall features crystal chandeliers, marble floors, and a dedicated team ensuring every detail is perfect.",
    category: CATEGORIES[0],
    city: CITIES[0],
    address: "15 Avenue Habib Bourguiba, Tunis 1001",
    phone: "+216 71 234 567",
    email: "contact@elegancehall.tn",
    website: "https://elegancehall.tn",
    whatsapp: "+21671234567",
    coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
    logoImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80",
      "https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 128,
    responseTime: "Within 1 hour",
    plan: "GOLD",
    status: "ACTIVE",
    rankScore: 98,
    isVerified: true,
    isFeatured: true,
    theme: { id: "luxury-gold", name: "Luxury Gold", primaryColor: "#C9A84C", secondaryColor: "#FDF8EC", accentColor: "#8B6914", fontHeading: "Playfair Display", fontBody: "Inter" },
    languages: ["Arabic", "French", "English"],
    yearsInBusiness: 12,
    minPrice: 5000,
    maxPrice: 25000,
    services: [
      { id: "s1", vendorId: "v1", name: "Grand Ballroom", description: "Full venue rental for up to 800 guests", price: 8000, priceUnit: "FIXED", duration: "12 hours", isActive: true },
      { id: "s2", vendorId: "v1", name: "Garden Terrace", description: "Outdoor ceremony space for up to 300 guests", price: 3500, priceUnit: "FIXED", duration: "6 hours", isActive: true },
    ],
    packages: [
      { id: "p1", vendorId: "v1", name: "Silver Package", description: "Essential wedding package", price: 8000, priceUnit: "FIXED", features: ["Venue rental 8h", "Basic decoration", "Sound system", "Parking"], isPopular: false, isActive: true },
      { id: "p2", vendorId: "v1", name: "Gold Package", description: "Our most popular choice", price: 15000, priceUnit: "FIXED", features: ["Venue rental 12h", "Luxury decoration", "Sound & lighting", "Parking", "Bridal suite", "Welcome cocktail"], isPopular: true, isActive: true },
      { id: "p3", vendorId: "v1", name: "Diamond Package", description: "The ultimate wedding experience", price: 25000, priceUnit: "FIXED", features: ["Venue rental 16h", "Premium decoration", "Full AV system", "Valet parking", "Bridal suite", "Welcome cocktail", "Coordination team", "Honeymoon suite"], isPopular: false, isActive: true },
    ],
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-11-01T10:00:00Z",
    seo: { metaTitle: "Elegance Hall - Premier Wedding Venue in Tunis", metaDescription: "Book Tunisia's finest wedding hall. Capacity 800 guests. Luxury décor, professional team.", keywords: ["wedding hall tunis", "salle des fêtes tunis", "mariage tunis"], score: 92 },
  },
  {
    id: "v2",
    slug: "dream-photography",
    businessName: "Dream Photography",
    tagline: "Capturing Your Love Story",
    description: "Award-winning wedding photography and videography studio based in Tunis. We travel across Tunisia to capture your most precious moments with artistic vision and technical excellence.",
    category: CATEGORIES[2],
    city: CITIES[0],
    address: "42 Rue de la République, Tunis",
    phone: "+216 54 987 654",
    email: "hello@dreamphotography.tn",
    whatsapp: "+21654987654",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
      "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 94,
    responseTime: "Within 2 hours",
    plan: "SILVER",
    status: "ACTIVE",
    rankScore: 87,
    isVerified: true,
    isFeatured: true,
    theme: { id: "modern-minimal", name: "Modern Minimal", primaryColor: "#2D2D2D", secondaryColor: "#F5F5F5", accentColor: "#888888", fontHeading: "Montserrat", fontBody: "Open Sans" },
    languages: ["Arabic", "French", "English"],
    yearsInBusiness: 8,
    minPrice: 1200,
    maxPrice: 8000,
    services: [
      { id: "s3", vendorId: "v2", name: "Full Day Coverage", description: "12 hours of photography coverage", price: 2500, priceUnit: "FIXED", isActive: true },
      { id: "s4", vendorId: "v2", name: "Photo + Video", description: "Complete photo and video package", price: 4500, priceUnit: "FIXED", isActive: true },
    ],
    packages: [
      { id: "p4", vendorId: "v2", name: "Memories Package", description: "Essential photography", price: 1200, priceUnit: "FIXED", features: ["6h coverage", "200+ edited photos", "Online gallery", "USB key"], isPopular: false, isActive: true },
      { id: "p5", vendorId: "v2", name: "Story Package", description: "Full day story", price: 2800, priceUnit: "FIXED", features: ["Full day coverage", "500+ edited photos", "Engagement session", "Photo album", "Online gallery"], isPopular: true, isActive: true },
    ],
    createdAt: "2023-03-10T10:00:00Z",
    updatedAt: "2024-10-15T10:00:00Z",
    seo: { score: 78 },
  },
  {
    id: "v3",
    slug: "royal-decor-sousse",
    businessName: "Royal Décor",
    tagline: "Transforming Spaces into Dreams",
    description: "Sousse's leading wedding decoration company. We specialize in floral arrangements, lighting design, and complete venue transformation. Every wedding is a unique masterpiece.",
    category: CATEGORIES[4],
    city: CITIES[2],
    address: "78 Boulevard 14 Janvier, Sousse",
    phone: "+216 73 456 789",
    email: "info@royaldecor.tn",
    whatsapp: "+21673456789",
    coverImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      "https://images.unsplash.com/photo-1478146878799-0780a54b2d97?w=800&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 67,
    responseTime: "Within 4 hours",
    plan: "SILVER",
    status: "ACTIVE",
    rankScore: 79,
    isVerified: true,
    isFeatured: false,
    theme: { id: "romantic-rose", name: "Romantic Rose", primaryColor: "#E8A0BF", secondaryColor: "#FDF2F7", accentColor: "#C45C8A", fontHeading: "Cormorant Garamond", fontBody: "Lato" },
    languages: ["Arabic", "French"],
    yearsInBusiness: 6,
    minPrice: 800,
    maxPrice: 6000,
    services: [
      { id: "s5", vendorId: "v3", name: "Floral Design", description: "Custom floral arrangements", price: 800, priceUnit: "STARTING_FROM", isActive: true },
      { id: "s6", vendorId: "v3", name: "Full Venue Transformation", description: "Complete decoration from concept to execution", price: 3500, priceUnit: "STARTING_FROM", isActive: true },
    ],
    packages: [
      { id: "p6", vendorId: "v3", name: "Blossom Package", description: "Essential floral decor", price: 1500, priceUnit: "FIXED", features: ["Ceremony arch", "Table centerpieces", "Aisle flowers", "Bridal bouquet"], isPopular: false, isActive: true },
      { id: "p7", vendorId: "v3", name: "Garden of Eden", description: "Full venue transformation", price: 4500, priceUnit: "FIXED", features: ["Full venue decor", "Lighting design", "Floral wall", "Entrance decor", "Bridal suite setup", "Setup & teardown"], isPopular: true, isActive: true },
    ],
    createdAt: "2023-05-20T10:00:00Z",
    updatedAt: "2024-09-01T10:00:00Z",
    seo: { score: 65 },
  },
  {
    id: "v4",
    slug: "sweet-moments-patisserie",
    businessName: "Sweet Moments",
    tagline: "Crafting Edible Art",
    description: "Tunis' finest wedding cake and patisserie studio. Custom cakes designed to match your theme, flavors curated to delight your guests.",
    category: CATEGORIES[8],
    city: CITIES[0],
    phone: "+216 58 321 654",
    email: "orders@sweetmoments.tn",
    whatsapp: "+21658321654",
    coverImage: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 203,
    responseTime: "Within 3 hours",
    plan: "GOLD",
    status: "ACTIVE",
    rankScore: 95,
    isVerified: true,
    isFeatured: true,
    theme: { id: "romantic-rose", name: "Romantic Rose", primaryColor: "#E8A0BF", secondaryColor: "#FDF2F7", accentColor: "#C45C8A", fontHeading: "Cormorant Garamond", fontBody: "Lato" },
    languages: ["Arabic", "French"],
    yearsInBusiness: 5,
    minPrice: 300,
    maxPrice: 2500,
    services: [
      { id: "s7", vendorId: "v4", name: "Custom Wedding Cake", description: "Bespoke multi-tier wedding cake", price: 350, priceUnit: "STARTING_FROM", isActive: true },
    ],
    packages: [],
    createdAt: "2023-07-01T10:00:00Z",
    updatedAt: "2024-11-10T10:00:00Z",
    seo: { score: 88 },
  },
];

// ─── Mock Reviews ─────────────────────────────────────────────────────────────

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    vendorId: "v1",
    customer: { id: "u1", name: "Sarah & Ahmed", avatar: "https://i.pravatar.cc/100?img=1" },
    rating: 5,
    title: "Absolutely Perfect Wedding Night",
    body: "Elegance Hall exceeded all our expectations. The team was incredibly professional and attentive to every detail. Our guests were amazed by the venue. We couldn't have asked for a better place to celebrate our special day.",
    isVerified: true,
    createdAt: "2024-10-15T10:00:00Z",
    vendorReply: "Thank you Sarah & Ahmed! It was our absolute pleasure to host your beautiful wedding. We wish you a lifetime of happiness!",
  },
  {
    id: "r2",
    vendorId: "v1",
    customer: { id: "u2", name: "Fatima & Khalil", avatar: "https://i.pravatar.cc/100?img=2" },
    rating: 5,
    title: "Dream Come True",
    body: "The venue is breathtaking. From the moment we walked in for our consultation to the last dance of our wedding night, everything was handled perfectly. The gold décor and crystal chandeliers are absolutely stunning.",
    isVerified: true,
    createdAt: "2024-09-22T10:00:00Z",
  },
  {
    id: "r3",
    vendorId: "v1",
    customer: { id: "u3", name: "Leila & Omar", avatar: "https://i.pravatar.cc/100?img=3" },
    rating: 5,
    title: "Professional and Elegant",
    body: "We had our wedding last month and it was magical. The staff is very professional and made us feel special throughout the entire planning process. Highly recommend!",
    isVerified: true,
    createdAt: "2024-08-05T10:00:00Z",
  },
];

// ─── Mock Blog Posts ──────────────────────────────────────────────────────────

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "top-wedding-trends-2025-tunisia",
    title: "Top 10 Wedding Trends in Tunisia for 2025",
    excerpt: "From outdoor garden ceremonies to minimalist luxury, discover what's defining weddings across Tunisia this year.",
    body: "",
    coverImage: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=800&q=80",
    author: { name: "Wedify Editorial", avatar: "" },
    tags: ["Trends", "2025", "Tunisia"],
    publishedAt: "2024-11-01T10:00:00Z",
    readingTime: 5,
  },
  {
    id: "b2",
    slug: "how-to-choose-wedding-photographer",
    title: "How to Choose the Right Wedding Photographer",
    excerpt: "Your wedding photos will last a lifetime. Here's what to look for when booking a photographer.",
    body: "",
    coverImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
    author: { name: "Wedify Editorial", avatar: "" },
    tags: ["Photography", "Guide", "Tips"],
    publishedAt: "2024-10-20T10:00:00Z",
    readingTime: 7,
  },
  {
    id: "b3",
    slug: "wedding-budget-guide-tunisia",
    title: "Complete Wedding Budget Guide for Tunisia 2025",
    excerpt: "Plan your dream wedding without breaking the bank. Average costs, tips, and how to prioritize.",
    body: "",
    coverImage: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80",
    author: { name: "Wedify Editorial", avatar: "" },
    tags: ["Budget", "Planning", "Guide"],
    publishedAt: "2024-10-05T10:00:00Z",
    readingTime: 9,
  },
];

// ─── Utility functions ────────────────────────────────────────────────────────

export function getVendorBySlug(slug: string): Vendor | undefined {
  return MOCK_VENDORS.find((v) => v.slug === slug);
}

export function getVendorsByCategory(categorySlug: string, citySlug?: string): Vendor[] {
  return MOCK_VENDORS.filter(
    (v) =>
      v.category.slug === categorySlug &&
      (citySlug ? v.city.slug === citySlug : true)
  );
}

export function getFeaturedVendors(): Vendor[] {
  return MOCK_VENDORS.filter((v) => v.isFeatured).sort((a, b) => b.rankScore - a.rankScore);
}

export function getReviewsByVendor(vendorId: string): Review[] {
  return MOCK_REVIEWS.filter((r) => r.vendorId === vendorId);
}
