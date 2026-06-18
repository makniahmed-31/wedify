import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, MessageCircle, Crown, Gem, Shield } from "lucide-react";
import type { Vendor } from "@/lib/types";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface VendorCardProps {
  vendor: Vendor;
  featured?: boolean;
}

const PlanBadge = ({ plan }: { plan: Vendor["plan"] }) => {
  if (plan === "PREMIUM") return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
      <Crown className="h-3 w-3" /> Premium
    </span>
  );
  if (plan === "PRO") return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600">
      <Gem className="h-3 w-3" /> Pro
    </span>
  );
  return null;
};

export function VendorCard({ vendor, featured = false }: VendorCardProps) {
  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className={`group block rounded-2xl bg-card border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${featured ? "ring-1 ring-primary/30 shadow-gold" : ""}`}
    >
      {/* Cover Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={vendor.coverImage}
          alt={vendor.businessName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <PlanBadge plan={vendor.plan} />
          {vendor.isVerified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
              <Shield className="h-3 w-3" /> Verified
            </span>
          )}
        </div>

        {/* Category */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-xs text-white">
            {vendor.category.icon} {vendor.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name + City */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {vendor.businessName}
          </h3>
        </div>

        {vendor.tagline && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{vendor.tagline}</p>
        )}

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {vendor.city.name}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-semibold">{vendor.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">({vendor.reviewCount} reviews)</span>
        </div>

        {/* Price & Response */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="text-sm">
            {vendor.minPrice ? (
              <>
                <span className="text-muted-foreground">From </span>
                <span className="font-semibold">{vendor.minPrice.toLocaleString()} {CURRENCY_SYMBOL}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Contact for pricing</span>
            )}
          </div>
          {vendor.responseTime && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageCircle className="h-3 w-3" />
              {vendor.responseTime}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
