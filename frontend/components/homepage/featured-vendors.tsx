"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { useT } from "@/lib/i18n";
import type { Vendor } from "@/types";

export function FeaturedVendors() {
  const t = useT();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/vendors?limit=5&featured=true")
      .then((res) => (res.ok ? res.json() : { data: [] }))
      .then((json) => {
        setVendors((json.data ?? []) as Vendor[]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
          {loading
            ? [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-white overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-muted" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))
            : vendors.slice(0, 5).map((vendor) => (
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
