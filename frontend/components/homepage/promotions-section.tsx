"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  Drone,
  Lightbulb,
  Candy,
  Sparkles,
} from "lucide-react";
import { useT } from "@/lib/i18n";

const PROMOTIONS = [
  {
    id: "p1",
    vendor: "Le Palace",
    description: "Réduction sur location salle été 2024",
    discount: -20,
    expires: "30/06/2024",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=70",
    slug: "le-palace",
  },
  {
    id: "p2",
    vendor: "Focus Studio",
    description: "Pack photo + vidéo",
    discount: -15,
    expires: "25/06/2024",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=70",
    slug: "focus-studio",
  },
  {
    id: "p3",
    vendor: "Délices Traiteur",
    description: "Menu spécial été",
    discount: -30,
    expires: "10/06/2024",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=70",
    slug: "delices-traiteur",
  },
  {
    id: "p4",
    vendor: "RoseFloriste",
    description: "Décoration florale",
    discount: -10,
    expires: "15/06/2024",
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&q=70",
    slug: "rosefloriste",
  },
];

const NEW_SERVICES = [
  {
    id: "s1",
    name: "Pack photo drone",
    desc: "Captures aériennes professionnelles",
    Icon: Drone,
    slug: "drone",
  },
  {
    id: "s2",
    name: "Animation LED",
    desc: "Ambiance lumineuse personnalisée",
    Icon: Lightbulb,
    slug: "led",
  },
  {
    id: "s3",
    name: "Candy Bar",
    desc: "Buffets sucrés personnalisés",
    Icon: Candy,
    slug: "candy-bar",
  },
  {
    id: "s4",
    name: "Feux d'artifice",
    desc: "Spectacle pyrotechnique pour votre soirée",
    Icon: Sparkles,
    slug: "fireworks",
  },
];

export function PromotionsSection() {
  const t = useT();

  return (
    <section className="py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Promotions */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-foreground">
                {t("promotions.title")}
              </h2>
              <Link
                href="/promotions"
                className="text-sm text-secondary font-medium hover:underline flex items-center gap-1"
              >
                {t("promotions.viewAll")} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PROMOTIONS.map((promo) => (
                <Link
                  key={promo.id}
                  href={`/vendors/${promo.slug}`}
                  className="group relative rounded-xl overflow-hidden border border-border bg-white hover:shadow-md transition-shadow"
                >
                  <div className="relative h-28 overflow-hidden">
                    <Image
                      src={promo.image}
                      alt={promo.vendor}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                      {promo.discount}%
                    </span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-foreground">
                      {promo.vendor}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {promo.description}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {t("promotions.expires")}{" "}
                      {promo.expires}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* New Services */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-foreground">
                {t("services.newTitle")}
              </h2>
              <Link
                href="/services"
                className="text-sm text-secondary font-medium hover:underline flex items-center gap-1"
              >
                {t("services.viewAll")} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {NEW_SERVICES.map(({ id, name, desc, Icon, slug }) => (
                <Link
                  key={id}
                  href={`/search?q=${slug}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-white hover:shadow-md hover:border-primary/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-primary shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Ad banners */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
          <div
            className="relative overflow-hidden rounded-xl h-24 flex items-center px-6 gap-4 lg:col-span-2"
            style={{ background: "linear-gradient(135deg, #D88C70, #c4795c)" }}
          >
            <div className="text-white">
              <p className="font-bold text-base">{t("ads.premium")}</p>
              <p className="text-sm text-white/80">{t("ads.premiumSub")}</p>
            </div>
            <Link
              href="/dashboard/subscription"
              className="ml-auto shrink-0 rounded-lg border border-white/50 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              {t("ads.adSpace")}
            </Link>
          </div>
          <div
            className="relative overflow-hidden rounded-xl h-24 flex items-center px-6 gap-4"
            style={{ background: "linear-gradient(135deg, #A8B5A0, #8fa087)" }}
          >
            <div className="text-white">
              <p className="font-bold text-base">{t("ads.classic")}</p>
              <p className="text-sm text-white/80">{t("ads.classicSub")}</p>
            </div>
            <Link
              href="/dashboard/subscription"
              className="ml-auto shrink-0 rounded-lg border border-white/50 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              {t("ads.learnMore")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
