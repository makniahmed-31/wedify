import Link from "next/link";
import { Heart } from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 fill-primary text-primary" />
              <span className="text-lg font-bold text-gradient-gold">Wedify</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Tunisia&apos;s premier wedding marketplace. Connecting couples with the best vendors.
            </p>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "TikTok"].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Cities</h4>
            <ul className="space-y-2">
              {CITIES.slice(0, 8).map((city) => (
                <li key={city.id}>
                  <Link href={`/vendors?city=${city.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="text-sm font-semibold mb-4">For Vendors</h4>
            <ul className="space-y-2">
              {[
                ["List Your Business", "/register/vendor"],
                ["Pricing Plans", "/pricing"],
                ["Vendor Dashboard", "/dashboard"],
                ["SEO Tools", "/dashboard/seo"],
                ["Analytics", "/dashboard/analytics"],
                ["Success Stories", "/blog"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                ["About Us", "/about"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
                ["Sitemap", "/sitemap.xml"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wedify. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-primary text-primary" /> in Tunisia
          </p>
        </div>
      </div>
    </footer>
  );
}
