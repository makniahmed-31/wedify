import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  CalendarCheck,
  Star,
  ArrowRight,
  Crown,
  Zap,
} from "lucide-react";
import { serverFetch } from "@/lib/server-auth";
import type { VendorBooking } from "@/types";

export const metadata: Metadata = { title: "Dashboard" };

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-600",
  CONFIRMED: "bg-green-500/10 text-green-600",
  CANCELLED: "bg-red-500/10 text-red-600",
  COMPLETED: "bg-blue-500/10 text-blue-600",
};

export default async function DashboardPage() {
  let name = "votre entreprise";
  let slug = "";

  try {
    const res = await serverFetch("/api/v1/vendors/profile/me");
    if (res.ok) {
      const vendor = await res.json();
      name = vendor.businessName ?? name;
      slug = vendor.slug ?? "";
    }
  } catch {}

  // Fetch analytics
  let analytics: {
    profileViews: number;
    bookingRequests: number;
    averageRating: number;
  } | null = null;
  try {
    const res = await serverFetch("/api/v1/analytics/vendor");
    if (res.ok) analytics = await res.json();
  } catch {}

  // Fetch recent bookings
  let recentBookings: VendorBooking[] = [];
  try {
    const res = await serverFetch("/api/v1/bookings/vendor");
    if (res.ok) {
      const all = await res.json();
      recentBookings = Array.isArray(all) ? all.slice(0, 3) : [];
    }
  } catch {}

  const stats = [
    {
      label: "Profile Views",
      value: analytics ? analytics.profileViews.toLocaleString() : "—",
      change: null as number | null,
      icon: Eye,
      href: "/dashboard/analytics",
    },
    {
      label: "Clicks",
      value: "0",
      change: null as number | null,
      icon: MousePointerClick,
      href: "/dashboard/analytics",
    },
    {
      label: "Bookings",
      value: analytics ? analytics.bookingRequests.toLocaleString() : "—",
      change: null as number | null,
      icon: CalendarCheck,
      href: "/dashboard/bookings",
    },
    {
      label: "Avg Rating",
      value: analytics ? analytics.averageRating.toFixed(1) : "—",
      change: null as number | null,
      icon: Star,
      href: "/dashboard/reviews",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bonjour, {name} ! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        {slug && (
          <Link
            href={`/vendors/${slug}`}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted"
            target="_blank"
          >
            Voir le profil <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Plan upgrade banner */}
      <div className="rounded-lg bg-primary p-5 text-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Crown className="h-8 w-8" />
          <div>
            <p className="font-bold">Upgrade to Premium</p>
            <p className="text-sm text-white/80">
              Get homepage featured placement and 2× more leads.
            </p>
          </div>
        </div>
        <Link
          href="/vendor/dashboard/subscription"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shrink-0 hover:shadow-lg transition-shadow"
        >
          Upgrade Now
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const positive = stat.change === null || stat.change >= 0;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-lg border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                {stat.change !== null && (
                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${positive ? "text-green-600" : "text-red-500"}`}
                  >
                    {positive ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Add Service",
              href: "/dashboard/services/new",
              icon: "+",
            },
            { label: "Update Gallery", href: "/dashboard/media", icon: "🖼" },
            { label: "SEO Score", href: "/dashboard/seo", icon: "📈" },
            { label: "View Reviews", href: "/dashboard/reviews", icon: "⭐" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="rounded-md border bg-card p-4 text-center hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">{action.icon}</span>
              <p className="text-sm font-medium mt-2">{action.label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent bookings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Recent Bookings</h2>
          <Link
            href="/dashboard/bookings"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="rounded-lg border bg-card overflow-hidden">
          {recentBookings.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No bookings yet.
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Couple
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => {
                      const coupleName = b.name ?? b.coupleName ?? "—";
                      const date = b.date ?? b.eventDate ?? "";
                      const amount = b.amount ?? b.totalAmount ?? 0;
                      return (
                        <tr
                          key={b.id}
                          className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium">{coupleName}</td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {date
                              ? new Date(date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "—"}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[b.status] ?? ""}`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold">
                            {amount > 0 ? `${amount.toLocaleString()} د.ت` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden divide-y">
                {recentBookings.map((b) => {
                  const coupleName = b.name ?? b.coupleName ?? "—";
                  const date = b.date ?? b.eventDate ?? "";
                  const amount = b.amount ?? b.totalAmount ?? 0;
                  return (
                    <div
                      key={b.id}
                      className="flex items-center justify-between gap-3 p-4"
                    >
                      <div>
                        <p className="text-sm font-medium">{coupleName}</p>
                        <p className="text-xs text-muted-foreground">
                          {date
                            ? new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[b.status] ?? ""}`}
                        >
                          {b.status}
                        </span>
                        <span className="text-sm font-semibold">
                          {amount > 0 ? `${amount.toLocaleString()} د.ت` : "—"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Profile completeness */}
      <div className="rounded-lg border bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Profile Completeness — 65%
          </h2>
          <Link
            href="/dashboard/profile"
            className="text-sm text-primary hover:underline"
          >
            Complete profile
          </Link>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: "65%" }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            ["Profile photo", true],
            ["Business description", true],
            ["Services added", true],
            ["Gallery photos", false],
            ["Working hours", false],
            ["WhatsApp number", false],
          ].map(([item, done]) => (
            <div
              key={String(item)}
              className={`flex items-center gap-2 text-xs ${done ? "text-green-600" : "text-muted-foreground"}`}
            >
              <span>{done ? "✓" : "○"}</span> {String(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
