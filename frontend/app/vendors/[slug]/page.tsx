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
  Check,
  ChevronLeft,
  Calendar,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  getVendorBySlug,
  getReviewsByVendor,
  MOCK_VENDORS,
} from "@/lib/mock-data";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_VENDORS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) return {};

  return {
    title:
      vendor.seo?.metaTitle ??
      `${vendor.businessName} — ${vendor.category.name} in ${vendor.city.name}`,
    description:
      vendor.seo?.metaDescription ?? vendor.description.substring(0, 160),
    keywords: vendor.seo?.keywords ?? [
      vendor.businessName,
      vendor.category.name,
      vendor.city.name,
      "Tunisia",
    ],
    openGraph: {
      title: vendor.businessName,
      description: vendor.tagline ?? vendor.description.substring(0, 120),
      images: [{ url: vendor.coverImage, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function VendorPage({ params }: Props) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  const reviews = getReviewsByVendor(vendor.id);

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: vendor.businessName,
    description: vendor.description,
    image: vendor.coverImage,
    telephone: vendor.phone,
    email: vendor.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: vendor.city.name,
      addressCountry: "TN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: vendor.rating,
      reviewCount: vendor.reviewCount,
    },
    priceRange: vendor.minPrice
      ? `${vendor.minPrice.toLocaleString()} – ${vendor.maxPrice?.toLocaleString()} ${CURRENCY_SYMBOL}`
      : "Contact for pricing",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero / Cover */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <Image
            src={vendor.coverImage}
            alt={vendor.businessName}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-8">
              <Link
                href={`/${vendor.category.slug}`}
                className="inline-flex items-center gap-1.5 text-white/70 text-sm mb-3 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" /> {vendor.category.name}
              </Link>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {vendor.isVerified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">
                        <Shield className="h-3 w-3" /> Verified
                      </span>
                    )}
                    {vendor.plan === "GOLD" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                        <Crown className="h-3 w-3" /> Premium
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {vendor.businessName}
                  </h1>
                  {vendor.tagline && (
                    <p className="text-white/80 mt-1">{vendor.tagline}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-md border bg-card p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    {vendor.rating.toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {vendor.reviewCount} reviews
                  </p>
                </div>
                <div className="rounded-md border bg-card p-4 text-center">
                  <div className="text-xl font-bold">
                    {vendor.yearsInBusiness ?? "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Years in business
                  </p>
                </div>
                <div className="rounded-md border bg-card p-4 text-center">
                  <div className="text-sm font-bold text-green-600 flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {vendor.responseTime ?? "Quick response"}
                  </p>
                </div>
                <div className="rounded-md border bg-card p-4 text-center">
                  <div className="text-xl font-bold">
                    {vendor.languages.length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Languages spoken
                  </p>
                </div>
              </div>

              {/* About */}
              <section>
                <h2 className="text-xl font-bold mb-3">
                  About {vendor.businessName}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {vendor.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {vendor.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border px-3 py-1 text-xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              {vendor.gallery.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-3">Gallery</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {vendor.gallery.map((img, i) => (
                      <div
                        key={i}
                        className={`relative overflow-hidden rounded-md ${i === 0 ? "row-span-2 col-span-2 sm:col-span-1" : ""}`}
                        style={{ aspectRatio: i === 0 ? "1" : "4/3" }}
                      >
                        <Image
                          src={img}
                          alt={`${vendor.businessName} photo ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Services */}
              {vendor.services.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-3">Services</h2>
                  <div className="space-y-3">
                    {vendor.services
                      .filter((s) => s.isActive)
                      .map((service) => (
                        <div
                          key={service.id}
                          className="rounded-md border bg-card p-4 flex items-center justify-between gap-4"
                        >
                          <div>
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {service.description}
                            </p>
                            {service.duration && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Duration: {service.duration}
                              </p>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold">
                              {service.price.toLocaleString()} {CURRENCY_SYMBOL}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {service.priceUnit
                                .replace(/_/g, " ")
                                .toLowerCase()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              )}

              {/* Packages */}
              {vendor.packages.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-3">Packages</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {vendor.packages
                      .filter((p) => p.isActive)
                      .map((pkg) => (
                        <div
                          key={pkg.id}
                          className={`rounded-lg border p-5 relative ${pkg.isPopular ? "border-primary ring-1 ring-primary/30 shadow-gold" : ""}`}
                        >
                          {pkg.isPopular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-gold px-3 py-0.5 text-xs font-semibold text-white">
                              Most Popular
                            </span>
                          )}
                          <h3 className="font-bold mb-1">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {pkg.description}
                          </p>
                          <p className="text-2xl font-bold mb-4">
                            {pkg.price.toLocaleString()} {CURRENCY_SYMBOL}
                          </p>
                          <ul className="space-y-2 mb-4">
                            {pkg.features.map((f) => (
                              <li
                                key={f}
                                className="flex items-start gap-2 text-sm"
                              >
                                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={`/vendors/${vendor.slug}/book?package=${pkg.id}`}
                            className="block text-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                          >
                            Book this package
                          </Link>
                        </div>
                      ))}
                  </div>
                </section>
              )}

              {/* Reviews */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">
                    Reviews ({reviews.length})
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-bold">
                      {vendor.rating.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground text-sm">/ 5</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-md border bg-card p-5"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                            {review.customer.name[0]}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {review.customer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" },
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.title && (
                        <p className="font-semibold text-sm mb-1">
                          {review.title}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.body}
                      </p>
                      {review.vendorReply && (
                        <div className="mt-3 rounded-sm bg-muted p-3">
                          <p className="text-xs font-semibold mb-1">
                            Response from {vendor.businessName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {review.vendorReply}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: Contact / Booking sidebar */}
            <div className="space-y-4">
              {/* Price summary */}
              <div className="rounded-lg border bg-card p-5 sticky top-20">
                <div className="text-center mb-4">
                  {vendor.minPrice ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Starting from
                      </p>
                      <p className="text-3xl font-bold">
                        {vendor.minPrice.toLocaleString()}{" "}
                        <span className="text-lg">{CURRENCY_SYMBOL}</span>
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-semibold">Contact for pricing</p>
                  )}
                </div>

                <Link
                  href={`/vendors/${vendor.slug}/book`}
                  className="flex items-center justify-center gap-2 w-full rounded-full gradient-gold py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90 transition-opacity mb-3"
                >
                  <Calendar className="h-4 w-4" />
                  Request a Quote
                </Link>

                {vendor.whatsapp && (
                  <a
                    href={`https://wa.me/${vendor.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-full border border-green-600 py-3 text-sm font-semibold text-green-600 hover:bg-green-50 transition-colors mb-3"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}

                <div className="space-y-3 pt-3 border-t">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    {vendor.city.name}
                    {vendor.address ? `, ${vendor.address}` : ""}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <a
                      href={`tel:${vendor.phone}`}
                      className="hover:text-primary"
                    >
                      {vendor.phone}
                    </a>
                  </div>
                  {vendor.website && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary truncate"
                      >
                        {vendor.website.replace(/https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Languages */}
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">Languages</h3>
                <div className="flex flex-wrap gap-1.5">
                  {vendor.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border px-2.5 py-0.5 text-xs"
                    >
                      {lang}
                    </span>
                  ))}
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
