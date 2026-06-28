"use client";

import { useEffect, useState } from "react";
import type { PlatformStats } from "@/types";

export function StatsBar() {
  const [stats, setStats] = useState<PlatformStats | null>(null);

  useEffect(() => {
    fetch("/api/v1/analytics/platform")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setStats(data); })
      .catch(() => {});
  }, []);

  const items = [
    {
      label: "Wedding Vendors",
      value: stats ? `${stats.totalVendors.toLocaleString()}+` : "—",
    },
    {
      label: "Cities Covered",
      value: stats ? stats.totalCities.toString() : "—",
    },
    ...(stats && stats.totalBookings > 0
      ? [
          {
            label: "Bookings Made",
            value:
              stats.totalBookings >= 1000
                ? `${(stats.totalBookings / 1000).toFixed(1)}K+`
                : stats.totalBookings.toString(),
          },
        ]
      : []),
    ...(stats && stats.totalUsers > 0
      ? [
          {
            label: "Happy Couples",
            value:
              stats.totalUsers >= 1000
                ? `${(stats.totalUsers / 1000).toFixed(1)}K+`
                : stats.totalUsers.toString(),
          },
        ]
      : []),
  ];

  return (
    <section className="border-b bg-card py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
