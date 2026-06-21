"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/constants";
import { useT } from "@/lib/i18n";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.54V6.79a4.85 4.85 0 0 1-1.06-.1z"/>
    </svg>
  );
}

export function Footer() {
  const t = useT();

  return (
    <footer style={{ background: "oklch(0.18 0.02 255)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <path d="M14 24s-10-6.5-10-13a6 6 0 0 1 10-4.47A6 6 0 0 1 24 11c0 6.5-10 13-10 13z" fill="#D88C70" stroke="#D88C70" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg font-bold">
                <span className="text-white">BonPlanMariage</span>
                <span className="text-primary">.tn</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              {t("footer.description")}
            </p>
            <div className="flex gap-2.5">
              {([
                [FacebookIcon, "#", "Facebook"],
                [InstagramIcon, "#", "Instagram"],
                [TikTokIcon, "#", "TikTok"],
                [YoutubeIcon, "#", "YouTube"],
              ] as const).map(([Icon, href, label]) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Prestataires */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">{t("footer.vendors")}</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="text-sm text-white/60 hover:text-white transition-colors">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Villes populaires */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">{t("footer.popularCities")}</h4>
            <ul className="space-y-2.5">
              {CITIES.slice(0, 7).map((city) => (
                <li key={city.id}>
                  <Link href={`/vendors?city=${city.slug}`} className="text-sm text-white/60 hover:text-white transition-colors">{city.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/villes" className="text-sm text-primary hover:underline">{t("footer.allCities")}</Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">{t("footer.actions")}</h4>
            <div className="space-y-2.5 mb-6">
              <Link href="/register/vendor" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                <Heart className="h-4 w-4 fill-white" />
                {t("nav.becomeVendor")}
              </Link>
              <Link href="/contact" className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors">
                {t("footer.contactUs")}
              </Link>
            </div>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="h-3.5 w-3.5 text-white/40 shrink-0" /> +216 98 123 456
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-3.5 w-3.5 text-white/40 shrink-0" /> contact@bonplanmariage.tn
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-3.5 w-3.5 text-white/40 shrink-0" /> Tunisie
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} BonPlanMariage.tn — {t("footer.copyright")}
          </p>
          <div className="flex gap-5">
            {([
              [t("footer.legal"), "/mentions-legales"],
              [t("footer.terms"), "/conditions"],
              [t("footer.privacy"), "/confidentialite"],
            ] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="text-xs text-white/40 hover:text-white/70 transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
