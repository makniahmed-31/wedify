"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface CityData {
  name: string;
  slug: string;
  vendorCount: number;
}

export function CitiesSection() {
  const [cities, setCities] = useState<CityData[]>([]);

  useEffect(() => {
    fetch("/api/v1/marketplace/cities")
      .then((r) => r.ok ? r.json() : [])
      .then((data) => { if (Array.isArray(data)) setCities(data); })
      .catch(() => {});
  }, []);

  if (cities.length === 0) return null;

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-3">
            <MapPin className="h-4 w-4" /> By Location
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Find Vendors in Your <span className="text-bg-primary">City</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/vendors?city=${city.slug}`}
              className="group relative overflow-hidden rounded-lg border bg-card aspect-[4/3] flex items-end hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Gradient bg */}
              <div className="absolute inset-0 bg-primary opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                🏙️
              </div>

              <div className="relative p-4 w-full">
                <p className="font-semibold text-foreground">{city.name}</p>
                <p className="text-xs text-muted-foreground">
                  {city.vendorCount} vendors
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
