import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, MessageCircle, Shield } from "lucide-react";
import type { Vendor } from "@/types";

const DEFAULT_COVER = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80";

interface VendorCardProps {
  vendor: Vendor;
  featured?: boolean;
}

const PlanBadge = ({ plan }: { plan: Vendor["plan"] }) => {
  if (plan === "GOLD")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-700">
        ★ Gold
      </span>
    );
  if (plan === "SILVER")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-400/20 px-2 py-0.5 text-xs font-medium text-slate-600">
        ★ Silver
      </span>
    );
  return null;
};

export function VendorCard({ vendor, featured = false }: VendorCardProps) {
  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className={`group block rounded-lg bg-white border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${featured ? "ring-1 ring-primary/20 shadow-md" : ""}`}
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={vendor.coverImage ?? DEFAULT_COVER}
          alt={vendor.businessName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Vérifié badge */}
        {vendor.isVerified && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white">
              <Shield className="h-3 w-3" /> Vérifié
            </span>
          </div>
        )}

        {/* Plan badge */}
        <div className="absolute top-3 right-3">
          <PlanBadge plan={vendor.plan} />
        </div>

        {/* Logo */}
        {vendor.logoImage && (
          <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white">
            <Image
              src={vendor.logoImage}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors mb-1">
          {vendor.businessName}
        </h3>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 shrink-0" />
          {vendor.city.name}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3.5 w-3.5 ${star <= Math.round(vendor.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold">
            {vendor.rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({vendor.reviewCount} avis)
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-border/60">
          {vendor.minPrice ? (
            <p className="text-xs text-muted-foreground">
              À partir de{" "}
              <span className="font-semibold text-foreground">
                {vendor.minPrice.toLocaleString()} DT
              </span>
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">Sur devis</p>
          )}
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
