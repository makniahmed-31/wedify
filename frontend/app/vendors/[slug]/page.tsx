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
  Share2,
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

function getYoutubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?/]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return null;
}

export default async function VendorPage({ params }: Props) {
  const { slug } = await params;
  const v = await fetchVendor(slug);
  if (!v) notFound();

  const cat = CATEGORIES.find((c) => c.slug === v.categorySlug);
  const city = CITIES.find((c) => c.slug === v.citySlug);
  const embedUrl = getYoutubeEmbedUrl(v.videoUrl);
  const gallery: string[] = Array.isArray(v.gallery) ? v.gallery : [];
  const pageUrl = `https://bonplanmariage.tn/vendors/${v.slug}`;

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
                    {v.plan === "GOLD" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                        <Crown className="h-3 w-3" /> Gold
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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

              {/* Gallery */}
              {gallery.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4">Photos</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {gallery.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-lg overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt={`${v.businessName} photo ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Video */}
              {embedUrl && (
                <section>
                  <h2 className="text-xl font-bold mb-4">Vidéo</h2>
                  <div
                    className="relative w-full rounded-xl overflow-hidden"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={embedUrl}
                      title={`Vidéo de ${v.businessName}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </section>
              )}

              {/* Share */}
              <section className="border-t pt-6">
                <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Share2 className="h-4 w-4" /> Partager cette page
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "#1877F2" }}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${v.businessName} sur BonPlanMariage.tn : ${pageUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "#25D366" }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.instagram.com/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </section>
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
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90 transition-opacity mb-3"
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

                {/* Social links */}
                {(v.facebook || v.instagram || v.youtube || v.tiktok) && (
                  <div className="flex items-center gap-2 pt-3 border-t mt-3 flex-wrap">
                    {v.facebook && (
                      <a
                        href={v.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Facebook"
                        className="flex items-center justify-center w-9 h-9 rounded-full text-white text-xs font-bold hover:opacity-80 transition-opacity"
                        style={{ background: "#1877F2" }}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    )}
                    {v.instagram && (
                      <a
                        href={v.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                        className="flex items-center justify-center w-9 h-9 rounded-full text-white hover:opacity-80 transition-opacity"
                        style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    )}
                    {v.youtube && (
                      <a
                        href={v.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="YouTube"
                        className="flex items-center justify-center w-9 h-9 rounded-full text-white hover:opacity-80 transition-opacity"
                        style={{ background: "#FF0000" }}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                          <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                        </svg>
                      </a>
                    )}
                    {v.tiktok && (
                      <a
                        href={v.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="TikTok"
                        className="flex items-center justify-center w-9 h-9 rounded-full text-white text-xs font-bold hover:opacity-80 transition-opacity"
                        style={{ background: "#010101" }}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.73a8.19 8.19 0 0 0 4.78 1.52V6.78a4.86 4.86 0 0 1-1.01-.09z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
