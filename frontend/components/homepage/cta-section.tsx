"use client";

import Link from "next/link";
import { Heart, ArrowRight, Gem } from "lucide-react";
import { useT } from "@/lib/i18n";

export function CTASection() {
  const t = useT();

  return (
    <section className="py-14 lg:py-16" style={{ background: "oklch(0.18 0.02 255)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-full border-2 border-amber-400/60 flex items-center justify-center shrink-0">
              <Gem className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-1">{t("cta.title")}</h2>
              <p className="text-white/60 text-sm max-w-lg">{t("cta.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/register/vendor" className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-coral hover:opacity-90 transition-opacity">
              <Heart className="h-4 w-4 fill-white" />
              {t("cta.becomeVendor")}
            </Link>
            <Link href="/dashboard/subscription" className="flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              {t("cta.viewPlans")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
