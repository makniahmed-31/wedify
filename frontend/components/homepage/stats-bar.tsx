import { PLATFORM_STATS } from "@/lib/constants";

const stats = [
  { label: "Wedding Vendors", value: `${PLATFORM_STATS.vendors.toLocaleString()}+` },
  { label: "Cities Covered", value: PLATFORM_STATS.cities.toString() },
  { label: "Bookings Made", value: `${(PLATFORM_STATS.bookings / 1000).toFixed(1)}K+` },
  { label: "Happy Couples", value: `${(PLATFORM_STATS.happyCouples / 1000).toFixed(1)}K+` },
];

export function StatsBar() {
  return (
    <section className="border-b bg-card py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gradient-gold">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
