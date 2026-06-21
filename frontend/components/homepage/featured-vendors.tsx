"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { getFeaturedVendors } from "@/lib/mock-data";
import { useT } from "@/lib/i18n";

export function FeaturedVendors() {
  const t = useT();
  const vendors = getFeaturedVendors();

  return (
    <section className="py-14 lg:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              {t("vendors.certifiedTitle")}
            </h2>
            <div className="divider-heart" />
          </div>
          <Link
            href="/vendors"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline shrink-0"
          >
            {t("vendors.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {vendors.slice(0, 5).map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} featured />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/vendors" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            {t("vendors.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
