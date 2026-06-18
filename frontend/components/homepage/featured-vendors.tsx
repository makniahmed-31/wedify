import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { getFeaturedVendors } from "@/lib/mock-data";

export function FeaturedVendors() {
  const vendors = getFeaturedVendors();

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-3">
              <Crown className="h-4 w-4" /> Featured Vendors
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Premium Picks for
              <br />
              <span className="text-gradient-gold">Your Special Day</span>
            </h2>
          </div>
          <Link
            href="/vendors?plan=PREMIUM"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Vendor grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} featured />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/vendors?plan=PREMIUM" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            View all premium vendors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
