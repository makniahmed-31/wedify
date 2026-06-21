"use client";

import Link from "next/link";
import { Building2, Camera, Video, UtensilsCrossed, Sparkles, Shirt, Car, Music2, Music, ClipboardList, Wand2, Flower2, User, Armchair, Cake, Gift, Plus } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { useT } from "@/lib/i18n";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "salles-de-fete": <Building2 className="h-6 w-6" />,
  "photographes": <Camera className="h-6 w-6" />,
  "videastes": <Video className="h-6 w-6" />,
  "traiteurs": <UtensilsCrossed className="h-6 w-6" />,
  "decoration": <Sparkles className="h-6 w-6" />,
  "robes-de-mariee": <Shirt className="h-6 w-6" />,
  "location-voiture": <Car className="h-6 w-6" />,
  "dj-animation": <Music2 className="h-6 w-6" />,
  "troupes-musicales": <Music className="h-6 w-6" />,
  "wedding-planners": <ClipboardList className="h-6 w-6" />,
  "maquillage-coiffure": <Wand2 className="h-6 w-6" />,
  "fleurs": <Flower2 className="h-6 w-6" />,
  "costumes": <User className="h-6 w-6" />,
  "meubles": <Armchair className="h-6 w-6" />,
  "patisserie": <Cake className="h-6 w-6" />,
  "cadeaux": <Gift className="h-6 w-6" />,
};

export function CategoriesGrid() {
  const t = useT();
  const featured = CATEGORIES.slice(0, 9);

  return (
    <section className="py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
            {t("categories.title")}
          </h2>
          <div className="divider-heart" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
          {featured.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group flex flex-col items-center gap-2.5 rounded-xl border border-border bg-white p-4 hover:shadow-md hover:border-primary/30 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                {CATEGORY_ICONS[cat.slug] ?? <Building2 className="h-6 w-6" />}
              </div>
              <p className="text-xs font-medium text-center text-foreground/80 leading-snug">
                {cat.name}
              </p>
            </Link>
          ))}

          <Link
            href="/categories"
            className="group flex flex-col items-center gap-2.5 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 hover:bg-primary/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Plus className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium text-center text-primary leading-snug">
              {t("categories.viewAll")}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
