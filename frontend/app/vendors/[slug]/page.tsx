import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Phone,
  Globe,
  MessageCircle,
  Clock,
  Shield,
  Crown,
  ChevronLeft,
  Calendar,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CATEGORIES, CITIES, CURRENCY_SYMBOL } from "@/lib/constants";

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:4001";
const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80";

interface Props {
  params: Promise<{ slug: string }>;
}

async function fetchVendor(slug: string) {
  try {
    const res = await fetch(`${BACKEND}/api/v1/vendors/slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const res = await fetch(`${BACKEND}/api/v1/vendors?limit=500`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? [])
      .filter((v: any) => v.slug)
      .map((v: any) => ({ slug: v.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = await fetchVendor(slug);
  if (!v) return {};
  return {
    title: `${v.businessName} — ${v.category ?? ""} à ${v.city ?? "Tunisie"}`,
    description: v.description?.substring(0, 160) ?? "",
    openGraph: {
      title: v.businessName,
      description: v.tagline ?? v.description?.substring(0, 120) ?? "",
      images: v.coverImage ? [{ url: v.coverImage }] : [],
    },
  };
}

export default async function VendorPage({ params }: Props) {
  const { slug } = await params;
  const v = await fetchVendor(slug);
  if (!v) notFound();

  const cat = CATEGORIES.find((c) => c.slug === v.categorySlug);
  const city = CITIES.find((c) => c.slug === v.citySlug);

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: v.businessName,
    description: v.description,
    image: v.coverImage,
    telephone: v.phone,
    email: v.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: v.city ?? city?.name,
      addressCountry: "TN",
    },
    ...(v.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: v.rating,
        reviewCount: v.reviewCount,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <Image
            src={v.coverImage || DEFAULT_COVER}
            alt={v.businessName}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-8">
              {cat && (
                <Link
                  href={`/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 text-white/70 text-sm mb-3 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" /> {cat.name}
                </Link>
              )}
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {v.isVerified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">
                        <Shield className="h-3 w-3" /> Vérifié
                      </span>
                    )}
                    {v.plan === "PREMIUM" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                        <Crown className="h-3 w-3" /> Premium
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {v.businessName}
                  </h1>
                  {v.tagline && (
                    <p className="text-white/80 mt-1">{v.tagline}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-md border bg-card p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    {v.rating > 0 ? v.rating.toFixed(1) : "—"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {v.reviewCount} avis
                  </p>
                </div>
                <div className="rounded-md border bg-card p-4 text-center">
                  <div className="text-xl font-bold">
                    {v.yearsInBusiness > 0 ? v.yearsInBusiness : "—"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ans d&apos;activité
                  </p>
                </div>
                <div className="rounded-md border bg-card p-4 text-center">
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {v.responseTime ?? "Répond rapidement"}
                  </p>
                </div>
                <div className="rounded-md border bg-card p-4 text-center">
                  <div className="text-xl font-bold capitalize">
                    {v.plan?.toLowerCase()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Abonnement
                  </p>
                </div>
              </div>

              {/* About */}
              {v.description && (
                <section>
                  <h2 className="text-xl font-bold mb-3">
                    À propos de {v.businessName}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </section>
              )}
            </div>

            {/* Right: Contact */}
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-5 sticky top-20">
                <div className="text-center mb-4">
                  {v.minPrice > 0 ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        À partir de
                      </p>
                      <p className="text-3xl font-bold">
                        {Number(v.minPrice).toLocaleString()}{" "}
                        <span className="text-lg">{CURRENCY_SYMBOL}</span>
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-semibold">
                      Contactez pour un devis
                    </p>
                  )}
                </div>

                <Link
                  href={`/vendors/${v.slug}/book`}
                  className="flex items-center justify-center gap-2 w-full rounded-full gradient-gold py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90 transition-opacity mb-3"
                >
                  <Calendar className="h-4 w-4" />
                  Demander un devis
                </Link>

                {v.whatsapp && (
                  <a
                    href={`https://wa.me/${v.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-full border border-green-600 py-3 text-sm font-semibold text-green-600 hover:bg-green-50 transition-colors mb-3"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}

                <div className="space-y-3 pt-3 border-t">
                  {(v.city || city) && (
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                      {v.city ?? city?.name}
                    </div>
                  )}
                  {v.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <a href={`tel:${v.phone}`} className="hover:text-primary">
                        {v.phone}
                      </a>
                    </div>
                  )}
                  {v.website && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                      <a
                        href={v.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary truncate"
                      >
                        {v.website.replace(/https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
