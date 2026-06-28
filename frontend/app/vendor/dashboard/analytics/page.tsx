"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  MousePointerClick,
  CalendarCheck,
  TrendingUp,
  Star,
  BookOpen,
} from "lucide-react";
import type { VendorAnalytics } from "@/types";
import { getCookie } from "@/lib/cookies";

export default function AnalyticsPage() {
  const [data, setData] = useState<VendorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("wedify_token");
    fetch("/api/v1/analytics/vendor", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => r.ok ? r.json() : null)
      .then((json) => { setData(json); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: "Profile Views",
      value: loading ? "—" : (data?.profileViews ?? 0).toLocaleString(),
      icon: Eye,
    },
    {
      label: "Booking Requests",
      value: loading ? "—" : (data?.bookingRequests ?? 0).toLocaleString(),
      icon: MousePointerClick,
    },
    {
      label: "Confirmed Bookings",
      value: loading ? "—" : (data?.confirmedBookings ?? 0).toLocaleString(),
      icon: CalendarCheck,
    },
    {
      label: "Conversion Rate",
      value: loading ? "—" : `${(data?.conversionRate ?? 0).toFixed(1)}%`,
      icon: TrendingUp,
    },
    {
      label: "Avg Rating",
      value: loading ? "—" : (data?.averageRating ?? 0).toFixed(1),
      icon: Star,
    },
    {
      label: "Reviews",
      value: loading ? "—" : (data?.reviewCount ?? 0).toLocaleString(),
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your business performance over time.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {!loading && !data && (
        <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
          No analytics data available yet.
        </div>
      )}
    </div>
  );
}
