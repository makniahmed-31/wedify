"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Vendor } from "@/types";

export function NewVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    fetch("/api/v1/vendors?limit=5&sort=newest")
      .then((res) => (res.ok ? res.json() : { data: [] }))
      .then((json) => setVendors((json.data ?? []) as Vendor[]))
      .catch(() => {});
  }, []);

  return (
    <section className="py-14 lg:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Nouveaux prestataires
          </h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {vendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendors/${vendor.slug}`}
              className="group block rounded-md overflow-hidden border border-border bg-white hover:shadow-md transition-shadow"
            >
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={vendor.coverImage}
                  alt={vendor.businessName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-foreground truncate">
                  {vendor.businessName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {vendor.city.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {vendor.category.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ajouté le{" "}
                  {new Date(vendor.createdAt).toLocaleDateString("fr-TN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <span className="inline-block mt-1.5 text-xs text-primary font-medium group-hover:underline">
                  Découvrir
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Ad banner */}
        <div className="mt-8 rounded-md overflow-hidden">
          <div
            className="flex items-center gap-4 px-6 py-4 text-white"
            style={{ background: "linear-gradient(135deg, #D88C70, #c4795c)" }}
          >
            <span className="text-2xl">📣</span>
            <div className="flex-1">
              <p className="font-semibold text-sm">
                Postez votre certifiés avec nos offres spéciales !
              </p>
              <p className="text-white/80 text-xs">
                Réservez maintenant et bénéficiez de réductions exclusives.
              </p>
            </div>
            <Link
              href="/vendor/dashboard/subscription"
              className="shrink-0 rounded-sm border border-white/50 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Espace publicitaire
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
