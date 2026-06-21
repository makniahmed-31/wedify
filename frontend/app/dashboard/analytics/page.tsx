"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Eye,
  MousePointerClick,
  CalendarCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const VIEWS_DATA = [
  { date: "Jan", views: 320, bookings: 4 },
  { date: "Feb", views: 480, bookings: 6 },
  { date: "Mar", views: 420, bookings: 5 },
  { date: "Apr", views: 650, bookings: 9 },
  { date: "May", views: 780, bookings: 11 },
  { date: "Jun", views: 920, bookings: 14 },
  { date: "Jul", views: 1100, bookings: 18 },
  { date: "Aug", views: 980, bookings: 15 },
  { date: "Sep", views: 1247, bookings: 22 },
  { date: "Oct", views: 1380, bookings: 20 },
  { date: "Nov", views: 1150, bookings: 18 },
  { date: "Dec", views: 890, bookings: 12 },
];

const TRAFFIC_DATA = [
  { name: "Wedify Search", value: 52, color: "#C9A84C" },
  { name: "Google", value: 28, color: "#4285F4" },
  { name: "Direct", value: 12, color: "#34A853" },
  { name: "Social Media", value: 8, color: "#EA4335" },
];

const STATS = [
  { label: "Profile Views", value: "14,820", change: "+12.5%", icon: Eye },
  {
    label: "Clicks to Contact",
    value: "1,247",
    change: "+8.3%",
    icon: MousePointerClick,
  },
  {
    label: "Total Bookings",
    value: "154",
    change: "+22.2%",
    icon: CalendarCheck,
  },
  {
    label: "Conversion Rate",
    value: "8.4%",
    change: "+1.2%",
    icon: TrendingUp,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your business performance over time.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs font-medium text-green-600">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Views chart */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold mb-1">Profile Views & Bookings</h2>
        <p className="text-sm text-muted-foreground mb-6">Last 12 months</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={VIEWS_DATA}>
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--card))",
              }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#C9A84C"
              strokeWidth={2}
              fill="url(#goldGrad)"
              name="Views"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings bar chart */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-6">Monthly Bookings</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={VIEWS_DATA}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tick={{ fontSize: 11 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  backgroundColor: "hsl(var(--card))",
                }}
              />
              <Bar
                dataKey="bookings"
                fill="#C9A84C"
                radius={[6, 6, 0, 0]}
                name="Bookings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic sources pie */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-6">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={TRAFFIC_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {TRAFFIC_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              <Tooltip
                formatter={(v) => `${v}%`}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  backgroundColor: "hsl(var(--card))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
