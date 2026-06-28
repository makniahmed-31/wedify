import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villes — BonPlanMariage.tn",
  description: "Trouvez les meilleurs prestataires mariage par ville en Tunisie.",
};

export default function VillesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-4">Villes</h1>
      <p className="text-foreground/70">Prestataires par ville — bientôt disponible.</p>
    </div>
  );
}
