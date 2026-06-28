import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — BonPlanMariage.tn",
  description: "Contactez l'équipe BonPlanMariage.tn.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-foreground/70">Formulaire de contact — bientôt disponible.</p>
    </div>
  );
}
