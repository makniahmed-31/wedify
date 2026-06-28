"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  Store,
  CreditCard,
  DollarSign,
  AlertCircle,
  Link,
} from "lucide-react";

const MRR_DATA = [
  { month: "Jan", mrr: 18500 },
  { month: "Feb", mrr: 22400 },
  { month: "Mar", mrr: 26800 },
  { month: "Apr", mrr: 31200 },
  { month: "May", mrr: 34500 },
  { month: "Jun", mrr: 39100 },
  { month: "Jul", mrr: 43800 },
  { month: "Aug", mrr: 48200 },
  { month: "Sep", mrr: 52400 },
  { month: "Oct", mrr: 57900 },
  { month: "Nov", mrr: 62100 },
  { month: "Dec", mrr: 68400 },
];

const VENDOR_BREAKDOWN = [
  { plan: "Premium", count: 142, revenue: 21158 },
  { plan: "Pro", count: 387, revenue: 30573 },
  { plan: "Basic", count: 1321, revenue: 38309 },
];

const PENDING_REVIEWS = [
  {
    vendor: "Elegance Hall",
    reviewer: "Sarah & Ahmed",
    rating: 5,
    date: "1h ago",
  },
  {
    vendor: "Dream Photography",
    reviewer: "Fatima & Khalil",
    rating: 4,
    date: "3h ago",
  },
  {
    vendor: "Sweet Moments",
    reviewer: "Rim & Yassine",
    rating: 5,
    date: "5h ago",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground mt-1">
          Platform performance at a glance.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "MRR",
            value: "68,400 TND",
            change: "+10.2%",
            icon: DollarSign,
          },
          {
            label: "ARR",
            value: "820,800 TND",
            change: "+10.2%",
            icon: TrendingUp,
          },
          {
            label: "Total Vendors",
            value: "1,850",
            change: "+42 this month",
            icon: Store,
          },
          {
            label: "Active Subscriptions",
            value: "1,734",
            change: "93.7% paid",
            icon: CreditCard,
          },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs font-medium text-green-600">
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* MRR chart */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold mb-1">Monthly Recurring Revenue</h2>
        <p className="text-sm text-muted-foreground mb-6">
          2025 growth trajectory
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={MRR_DATA}>
            <defs>
              <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip
              formatter={(v) => [`${Number(v).toLocaleString()} TND`, "MRR"]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--card))",
              }}
            />
            <Area
              type="monotone"
              dataKey="mrr"
              stroke="#C9A84C"
              strokeWidth={2}
              fill="url(#mrrGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor breakdown */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-4">Vendors by Plan</h2>
          <div className="space-y-4">
            {VENDOR_BREAKDOWN.map((tier) => (
              <div key={tier.plan}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="font-medium">{tier.plan}</span>
                  <div className="flex gap-4 text-muted-foreground">
                    <span>{tier.count} vendors</span>
                    <span className="font-medium text-foreground">
                      {tier.revenue.toLocaleString()} TND/mo
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(tier.count / 1850) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending moderation */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <h2 className="font-semibold">Pending Reviews</h2>
          </div>
          <div className="space-y-3">
            {PENDING_REVIEWS.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{r.vendor}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.reviewer} · {r.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{r.rating}★</span>
                  <button className="rounded-sm bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 hover:bg-green-500/20">
                    Approve
                  </button>
                  <button className="rounded-sm bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-500/20">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent vendor signups */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Vendor Signups</h2>
          <Link
            href="/admin/vendors"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        {(() => {
          const rows = [
            { name: "Le Jardin Royal", cat: "Wedding Venues", city: "Sousse", plan: "PRO", status: "ACTIVE" },
            { name: "Photo Elite", cat: "Photographers", city: "Tunis", plan: "BASIC", status: "PENDING" },
            { name: "Cake Paradise", cat: "Sweets", city: "Sfax", plan: "PRO", status: "ACTIVE" },
            { name: "DJ Maestro", cat: "DJs", city: "Nabeul", plan: "BASIC", status: "ACTIVE" },
          ];
          return (
            <>
              <div className="hidden md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium text-muted-foreground">Business</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Category</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">City</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Plan</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((v) => (
                      <tr key={v.name} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="py-3 font-medium">{v.name}</td>
                        <td className="py-3 text-muted-foreground">{v.cat}</td>
                        <td className="py-3 text-muted-foreground">{v.city}</td>
                        <td className="py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${v.plan === "PRO" ? "bg-blue-500/10 text-blue-600" : "bg-muted text-muted-foreground"}`}>
                            {v.plan}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${v.status === "ACTIVE" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                            {v.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden divide-y -mx-6">
                {rows.map((v) => (
                  <div key={v.name} className="flex items-center justify-between gap-3 px-6 py-3">
                    <div>
                      <p className="text-sm font-medium">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.cat} · {v.city}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${v.plan === "PRO" ? "bg-blue-500/10 text-blue-600" : "bg-muted text-muted-foreground"}`}>
                        {v.plan}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${v.status === "ACTIVE" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                        {v.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
