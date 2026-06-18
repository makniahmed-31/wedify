import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export function CategoriesGrid() {
  const featured = CATEGORIES.slice(0, 8);

  return (
    <section className="py-16 lg:py-20 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            Browse by <span className="text-gradient-gold">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From stunning venues to expert photographers — find every service you need.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
                {cat.icon}
              </div>
              <div className="text-center">
                <p className="font-medium text-sm leading-snug">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cat.vendorCount} vendors</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            View all {CATEGORIES.length} categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
