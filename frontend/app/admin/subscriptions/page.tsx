"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Crown,
  Gem,
  Clock,
  TrendingUp,
  TrendingDown,
  CreditCard,
} from "lucide-react";

type Plan = "BRONZE" | "SILVER" | "GOLD";
type ReqStatus = "PENDING" | "APPROVED" | "REJECTED";

interface SubRequest {
  id: string;
  vendor: string;
  city: string;
  fromPlan: Plan;
  toPlan: Plan;
  requestedAt: string;
  status: ReqStatus;
  monthlyRevenue: number;
}

interface ActiveSub {
  id: string;
  vendor: string;
  plan: Plan;
  since: string;
  nextBilling: string;
  amount: number;
  status: "ACTIVE" | "CANCELLED";
}

const INITIAL_REQUESTS: SubRequest[] = [
  {
    id: "r1",
    vendor: "Photo Elite Studio",
    city: "Tunis",
    fromPlan: "BRONZE",
    toPlan: "SILVER",
    requestedAt: "Il y a 2h",
    status: "PENDING",
    monthlyRevenue: 50,
  },
  {
    id: "r2",
    vendor: "Décor Rêve",
    city: "Sousse",
    fromPlan: "BRONZE",
    toPlan: "GOLD",
    requestedAt: "Il y a 4h",
    status: "PENDING",
    monthlyRevenue: 75,
  },
  {
    id: "r3",
    vendor: "DJ Maestro",
    city: "Nabeul",
    fromPlan: "SILVER",
    toPlan: "BRONZE",
    requestedAt: "Il y a 6h",
    status: "PENDING",
    monthlyRevenue: 25,
  },
  {
    id: "r4",
    vendor: "Cake Paradise",
    city: "Sfax",
    fromPlan: "BRONZE",
    toPlan: "SILVER",
    requestedAt: "Hier",
    status: "APPROVED",
    monthlyRevenue: 50,
  },
  {
    id: "r5",
    vendor: "Henna & Art",
    city: "Monastir",
    fromPlan: "SILVER",
    toPlan: "GOLD",
    requestedAt: "Hier",
    status: "REJECTED",
    monthlyRevenue: 75,
  },
];

const ACTIVE_SUBS: ActiveSub[] = [
  {
    id: "s1",
    vendor: "Elegance Hall Tunis",
    plan: "GOLD",
    since: "1 jan. 2026",
    nextBilling: "1 fév. 2026",
    amount: 75,
    status: "ACTIVE",
  },
  {
    id: "s2",
    vendor: "Le Jardin Royal",
    plan: "GOLD",
    since: "5 jan. 2026",
    nextBilling: "5 fév. 2026",
    amount: 75,
    status: "ACTIVE",
  },
  {
    id: "s3",
    vendor: "Cake Paradise",
    plan: "SILVER",
    since: "10 jan. 2026",
    nextBilling: "10 fév. 2026",
    amount: 50,
    status: "ACTIVE",
  },
  {
    id: "s4",
    vendor: "Orchestre Carthage",
    plan: "SILVER",
    since: "3 jan. 2026",
    nextBilling: "3 fév. 2026",
    amount: 50,
    status: "ACTIVE",
  },
  {
    id: "s5",
    vendor: "DJ Maestro",
    plan: "BRONZE",
    since: "8 jan. 2026",
    nextBilling: "8 fév. 2026",
    amount: 25,
    status: "ACTIVE",
  },
];

const PLAN_ICONS: Record<Plan, React.ReactNode> = {
  GOLD: <Crown className="h-3.5 w-3.5" />,
  SILVER: <Gem className="h-3.5 w-3.5" />,
  BRONZE: null,
};
const PLAN_STYLES: Record<Plan, string> = {
  GOLD: "bg-primary/10 text-primary",
  SILVER: "bg-blue-500/10 text-blue-600",
  BRONZE: "bg-muted text-muted-foreground",
};
const REQ_STYLES: Record<ReqStatus, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-600",
  APPROVED: "bg-green-500/10 text-green-600",
  REJECTED: "bg-red-500/10 text-red-500",
};
const REQ_LABELS: Record<ReqStatus, string> = {
  PENDING: "En attente",
  APPROVED: "Approuvée",
  REJECTED: "Rejetée",
};

function PlanBadge({ plan }: { plan: Plan }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${PLAN_STYLES[plan]}`}
    >
      {PLAN_ICONS[plan]}
      {plan}
    </span>
  );
}

export default function AdminSubscriptionsPage() {
  const [requests, setRequests] = useState<SubRequest[]>(INITIAL_REQUESTS);
  const [subs, setSubs] = useState<ActiveSub[]>(ACTIVE_SUBS);
  const [tab, setTab] = useState<"requests" | "active">("requests");

  function handleRequest(id: string, action: "APPROVED" | "REJECTED") {
    setRequests((r) =>
      r.map((x) => (x.id === id ? { ...x, status: action } : x)),
    );
  }

  function cancelSub(id: string) {
    setSubs((s) =>
      s.map((x) => (x.id === id ? { ...x, status: "CANCELLED" } : x)),
    );
  }

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const mrr = subs
    .filter((s) => s.status === "ACTIVE")
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Abonnements</h1>
        <p className="text-muted-foreground mt-1">
          Validez les demandes et gérez les abonnements actifs.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Demandes en attente",
            value: pendingCount,
            icon: Clock,
            color: "text-yellow-500",
          },
          {
            label: "Abonnements actifs",
            value: subs.filter((s) => s.status === "ACTIVE").length,
            icon: CreditCard,
            color: "text-green-500",
          },
          {
            label: "MRR (mois en cours)",
            value: `${mrr} TND`,
            icon: TrendingUp,
            color: "text-primary",
          },
          {
            label: "ARR estimé",
            value: `${mrr * 12} TND`,
            icon: TrendingUp,
            color: "text-blue-500",
          },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-lg border bg-card p-5">
            <kpi.icon className={`h-5 w-5 mb-3 ${kpi.color}`} />
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-md bg-muted p-1 w-fit">
        {(["requests", "active"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "requests"
              ? `Demandes${pendingCount > 0 ? ` (${pendingCount})` : ""}`
              : "Abonnements actifs"}
          </button>
        ))}
      </div>

      {/* Requests tab */}
      {tab === "requests" && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Prestataire
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Changement
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Impact MRR
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Demandé
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => {
                  const prices: Record<Plan, number> = {
                    BRONZE: 25,
                    SILVER: 50,
                    GOLD: 75,
                  };
                  const diff = prices[r.toPlan] - prices[r.fromPlan];
                  return (
                    <tr
                      key={r.id}
                      className="border-b last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium">{r.vendor}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.city}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <PlanBadge plan={r.fromPlan} />
                          <span className="text-muted-foreground">→</span>
                          <PlanBadge plan={r.toPlan} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`flex items-center gap-1 text-sm font-semibold ${diff >= 0 ? "text-green-600" : "text-red-500"}`}
                        >
                          {diff >= 0 ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                          )}
                          {diff >= 0 ? "+" : ""}
                          {diff} TND/mois
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {r.requestedAt}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${REQ_STYLES[r.status]}`}
                        >
                          {REQ_LABELS[r.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {r.status === "PENDING" && (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleRequest(r.id, "APPROVED")}
                              className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 transition-colors"
                            >
                              <CheckCircle2 className="h-3 w-3" /> Valider
                            </button>
                            <button
                              onClick={() => handleRequest(r.id, "REJECTED")}
                              className="flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <XCircle className="h-3 w-3" /> Rejeter
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y">
            {requests.map((r) => {
              const prices: Record<Plan, number> = { BRONZE: 25, SILVER: 50, GOLD: 75 };
              const diff = prices[r.toPlan] - prices[r.fromPlan];
              return (
                <div key={r.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">{r.vendor}</p>
                      <p className="text-xs text-muted-foreground">{r.city} · {r.requestedAt}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0 ${REQ_STYLES[r.status]}`}
                    >
                      {REQ_LABELS[r.status]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <PlanBadge plan={r.fromPlan} />
                      <span className="text-muted-foreground text-xs">→</span>
                      <PlanBadge plan={r.toPlan} />
                      <span
                        className={`flex items-center gap-0.5 text-xs font-semibold ${diff >= 0 ? "text-green-600" : "text-red-500"}`}
                      >
                        {diff >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {diff >= 0 ? "+" : ""}{diff} TND
                      </span>
                    </div>
                    {r.status === "PENDING" && (
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => handleRequest(r.id, "APPROVED")}
                          className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle2 className="h-3 w-3" /> Valider
                        </button>
                        <button
                          onClick={() => handleRequest(r.id, "REJECTED")}
                          className="flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <XCircle className="h-3 w-3" /> Rejeter
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active subscriptions tab */}
      {tab === "active" && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Prestataire
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Depuis
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Prochaine facture
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Montant
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {subs.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{s.vendor}</td>
                    <td className="px-4 py-3">
                      <PlanBadge plan={s.plan} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {s.since}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {s.nextBilling}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {s.amount} TND
                    </td>
                    <td className="px-4 py-3 text-right">
                      {s.status === "ACTIVE" ? (
                        <button
                          onClick={() => cancelSub(s.id)}
                          className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          Annuler
                        </button>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Annulé
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y">
            {subs.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-3 p-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{s.vendor}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <PlanBadge plan={s.plan} />
                    <span className="text-xs text-muted-foreground">
                      {s.since}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Prochaine : {s.nextBilling}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-sm font-semibold">{s.amount} TND</span>
                  {s.status === "ACTIVE" ? (
                    <button
                      onClick={() => cancelSub(s.id)}
                      className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Annuler
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Annulé</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
