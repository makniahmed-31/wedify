"use client";

import { useState } from "react";
import { Check, Crown, CheckCircle2, AlertTriangle } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

type PlanName = "BRONZE" | "SILVER" | "GOLD";

const PLAN_PRICES: Record<PlanName, number> = {
  BRONZE: 25,
  SILVER: 50,
  GOLD: 75,
};
const PLAN_ANNUAL: Record<PlanName, number> = {
  BRONZE: 250,
  SILVER: 500,
  GOLD: 750,
};
const PLAN_LABELS: Record<PlanName, string> = {
  BRONZE: "Bronze",
  SILVER: "Silver",
  GOLD: "Gold",
};

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<PlanName>("SILVER");
  const [confirming, setConfirming] = useState<PlanName | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "info";
    msg: string;
  } | null>(null);

  function requestChange(planName: PlanName) {
    setConfirming(planName);
  }

  function confirmChange() {
    if (!confirming) return;
    const label = PLAN_LABELS[confirming];
    setCurrentPlan(confirming);
    setConfirming(null);
    setToast({
      type: "success",
      msg: `Plan changé vers ${label} avec succès.`,
    });
    setTimeout(() => setToast(null), 4000);
  }

  const isDowngrade = (planName: PlanName) => {
    const order: PlanName[] = ["BRONZE", "SILVER", "GOLD"];
    return order.indexOf(planName) < order.indexOf(currentPlan);
  };

  return (
    <div className="space-y-8 ">
      {/* Toast */}
      {toast && (
        <div className="flex items-center gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
          {toast.msg}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold">Abonnement</h1>
        <p className="text-muted-foreground mt-1">
          Gérez votre abonnement Wedify.
        </p>
      </div>

      {/* Current plan */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground">Plan actuel</p>
            <p className="text-xl font-bold mt-0.5">
              {PLAN_LABELS[currentPlan]} — {PLAN_PRICES[currentPlan]} DT/mois ou{" "}
              {PLAN_ANNUAL[currentPlan]} DT/an
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Prochaine facturation : 18 janvier 2026
            </p>
          </div>
          <span className="rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-600">
            Actif
          </span>
        </div>
      </div>

      {/* Confirm banner */}
      {confirming && (
        <div className="flex items-start gap-4 rounded-md border border-amber-200 bg-amber-50 px-5 py-4">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-900">
              {isDowngrade(confirming) ? "Rétrograder" : "Passer"} vers le plan{" "}
              {PLAN_LABELS[confirming]} ({PLAN_PRICES[confirming]} DT/mois) ?
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              {isDowngrade(confirming)
                ? "Certaines fonctionnalités seront désactivées à la fin de la période en cours."
                : "Le changement prend effet immédiatement. La différence sera facturée au prorata."}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setConfirming(null)}
              className="rounded-full border px-4 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={confirmChange}
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-gold hover:opacity-90 transition-opacity"
            >
              Confirmer
            </button>
          </div>
        </div>
      )}

      {/* Plans grid */}
      <div>
        <h2 className="font-semibold mb-4">Plans disponibles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrent = plan.name === currentPlan;
            const planName = plan.name as PlanName;
            const downgrade = isDowngrade(planName);

            return (
              <div
                key={plan.id}
                className={`rounded-lg border p-5 relative transition-shadow ${
                  plan.isPopular && !isCurrent
                    ? "border-primary ring-1 ring-primary/30 shadow-gold"
                    : ""
                } ${isCurrent ? "border-blue-500/40 bg-blue-50/30" : ""}`}
              >
                {plan.isPopular && !isCurrent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white whitespace-nowrap">
                    Le plus populaire
                  </span>
                )}
                {isCurrent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-0.5 text-xs font-semibold text-white whitespace-nowrap">
                    Plan actuel
                  </span>
                )}

                <div className="flex items-center gap-2 mb-2">
                  {plan.name === "GOLD" && (
                    <Crown className="h-4 w-4 text-primary" />
                  )}
                  <h3 className="font-bold">{plan.label}</h3>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    {plan.priceMonthly}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    DT/mois
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    ou {plan.priceAnnual} DT/an (2 mois offerts)
                  </p>
                </div>

                <ul className="space-y-2 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <button
                    disabled
                    className="w-full rounded-full border py-2.5 text-sm font-medium text-muted-foreground cursor-not-allowed"
                  >
                    Plan actuel
                  </button>
                ) : (
                  <button
                    onClick={() => requestChange(planName)}
                    className={`w-full rounded-full py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                      downgrade
                        ? "border border-muted-foreground/40 text-foreground hover:bg-muted"
                        : "bg-primary text-white shadow-gold"
                    }`}
                  >
                    {downgrade ? "Rétrograder" : "Passer"} vers {plan.label}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing history */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold mb-4">Historique de facturation</h2>
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium text-muted-foreground">
                  Date
                </th>
                <th className="pb-2 text-left font-medium text-muted-foreground">
                  Plan
                </th>
                <th className="pb-2 text-right font-medium text-muted-foreground">
                  Montant
                </th>
                <th className="pb-2 text-left font-medium text-muted-foreground pl-4">
                  Facture
                </th>
              </tr>
            </thead>
            <tbody>
              {["18 déc. 2025", "18 nov. 2025", "18 oct. 2025"].map((date) => (
                <tr key={date} className="border-b last:border-0">
                  <td className="py-3 text-muted-foreground">{date}</td>
                  <td className="py-3">{PLAN_LABELS[currentPlan]}</td>
                  <td className="py-3 text-right font-medium">
                    {PLAN_PRICES[currentPlan]} DT
                  </td>
                  <td className="py-3 pl-4">
                    <button className="text-primary text-xs hover:underline">
                      Télécharger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-3">
          {["18 déc. 2025", "18 nov. 2025", "18 oct. 2025"].map((date) => (
            <div
              key={date}
              className="flex items-center justify-between gap-3 rounded-md border p-4"
            >
              <div>
                <p className="text-sm font-medium">{PLAN_LABELS[currentPlan]}</p>
                <p className="text-xs text-muted-foreground">{date}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold">
                  {PLAN_PRICES[currentPlan]} DT
                </span>
                <button className="text-primary text-xs hover:underline">
                  Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
