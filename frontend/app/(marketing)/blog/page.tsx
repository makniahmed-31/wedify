import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — BonPlanMariage.tn",
  description: "Conseils, tendances et inspirations pour votre mariage en Tunisie.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className="text-foreground/70">Articles et conseils mariage — bientôt disponible.</p>
    </div>
  );
}
