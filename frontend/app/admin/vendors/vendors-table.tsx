"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import {
  Search, Filter, CheckCircle2, XCircle, Eye,
  ChevronDown, Crown, Gem, Loader2,
} from "lucide-react";

type Status = "ACTIVE" | "PENDING" | "SUSPENDED";
type Plan = "BRONZE" | "SILVER" | "GOLD";

interface Vendor {
  id: string;
  name: string;
  category: string;
  city: string;
  plan: Plan;
  status: Status;
  joined: string;
  revenue: number;
}

const STATUS_STYLES: Record<Status, string> = {
  ACTIVE: "bg-green-500/10 text-green-600",
  PENDING: "bg-yellow-500/10 text-yellow-600",
  SUSPENDED: "bg-red-500/10 text-red-500",
};
const STATUS_LABELS: Record<Status, string> = {
  ACTIVE: "Actif",
  PENDING: "En attente",
  SUSPENDED: "Suspendu",
};
const PLAN_STYLES: Record<Plan, string> = {
  GOLD: "bg-primary/10 text-primary",
  SILVER: "bg-blue-500/10 text-blue-600",
  BRONZE: "bg-muted text-muted-foreground",
};

export default function VendorsTable({ initialVendors }: { initialVendors: Vendor[] }) {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "ALL">("ALL");
  const [filterPlan, setFilterPlan] = useState<Plan | "ALL">("ALL");

  async function refresh() {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 800);
  }

  async function updateStatus(id: string, status: Status) {
    const prev = vendors.find((v) => v.id === id)?.status;
    setVendors((v) => v.map((x) => (x.id === id ? { ...x, status } : x)));
    const res = await apiFetch(`/api/v1/admin/vendors/${id}/action`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok && prev) {
      setVendors((v) => v.map((x) => (x.id === id ? { ...x, status: prev } : x)));
    }
  }

  const filtered = vendors.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch = !search || v.name.toLowerCase().includes(q) || v.city.toLowerCase().includes(q);
    const matchStatus = filterStatus === "ALL" || v.status === filterStatus;
    const matchPlan = filterPlan === "ALL" || v.plan === filterPlan;
    return matchSearch && matchStatus && matchPlan;
  });

  const pending = vendors.filter((v) => v.status === "PENDING");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Prestataires</h1>
          <p className="text-muted-foreground mt-1">
            {vendors.length} prestataires inscrits
            {pending.length > 0 && (
              <span className="ml-2 rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-semibold text-yellow-600">
                {pending.length} en attente
              </span>
            )}
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={refreshing}
          className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-muted transition-colors disabled:opacity-50"
        >
          {refreshing && <Loader2 className="h-4 w-4 animate-spin" />}
          Actualiser
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un prestataire..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-md border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Status | "ALL")}
            className="pl-9 pr-8 py-2 rounded-md border bg-card text-sm outline-none appearance-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="ACTIVE">Actif</option>
            <option value="PENDING">En attente</option>
            <option value="SUSPENDED">Suspendu</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value as Plan | "ALL")}
            className="px-4 py-2 rounded-md border bg-card text-sm outline-none appearance-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="ALL">Tous les plans</option>
            <option value="GOLD">Gold</option>
            <option value="SILVER">Silver</option>
            <option value="BRONZE">Bronze</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Pending approvals banner */}
      {pending.length > 0 && filterStatus === "ALL" && (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm font-semibold text-yellow-800 mb-3">
            {pending.length} prestataire(s) en attente d&apos;approbation
          </p>
          <div className="space-y-2">
            {pending.map((v) => (
              <div key={v.id} className="flex items-center justify-between gap-4 rounded-sm bg-white border border-yellow-100 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.category} · {v.city} · Plan {v.plan}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => updateStatus(v.id, "ACTIVE")} className="flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 transition-colors">
                    <CheckCircle2 className="h-3 w-3" /> Approuver
                  </button>
                  <button onClick={() => updateStatus(v.id, "SUSPENDED")} className="flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors">
                    <XCircle className="h-3 w-3" /> Rejeter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Prestataire</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Catégorie</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ville</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Plan</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Inscrit le</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{v.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.city}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${PLAN_STYLES[v.plan]}`}>
                      {v.plan === "GOLD" && <Crown className="h-3 w-3" />}
                      {v.plan === "SILVER" && <Gem className="h-3 w-3" />}
                      {v.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[v.status]}`}>
                      {STATUS_LABELS[v.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{v.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-1.5 rounded-sm hover:bg-muted transition-colors" title="Voir le profil">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {v.status === "PENDING" && (
                        <button onClick={() => updateStatus(v.id, "ACTIVE")} className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-600 hover:bg-green-500/20 transition-colors">
                          Approuver
                        </button>
                      )}
                      {v.status === "ACTIVE" && (
                        <button onClick={() => updateStatus(v.id, "SUSPENDED")} className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-500 hover:bg-red-500/20 transition-colors">
                          Suspendre
                        </button>
                      )}
                      {v.status === "SUSPENDED" && (
                        <button onClick={() => updateStatus(v.id, "ACTIVE")} className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-600 hover:bg-green-500/20 transition-colors">
                          Réactiver
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-muted-foreground text-sm">Aucun prestataire trouvé.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y">
          {filtered.map((v) => (
            <div key={v.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.category} · {v.city}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${PLAN_STYLES[v.plan]}`}>
                    {v.plan === "GOLD" && <Crown className="h-3 w-3" />}
                    {v.plan === "SILVER" && <Gem className="h-3 w-3" />}
                    {v.plan}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[v.status]}`}>
                    {STATUS_LABELS[v.status]}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">{v.joined}</p>
                <div className="flex gap-1.5">
                  {v.status === "PENDING" && (
                    <button onClick={() => updateStatus(v.id, "ACTIVE")} className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-600 hover:bg-green-500/20 transition-colors">Approuver</button>
                  )}
                  {v.status === "ACTIVE" && (
                    <button onClick={() => updateStatus(v.id, "SUSPENDED")} className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-500 hover:bg-red-500/20 transition-colors">Suspendre</button>
                  )}
                  {v.status === "SUSPENDED" && (
                    <button onClick={() => updateStatus(v.id, "ACTIVE")} className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-600 hover:bg-green-500/20 transition-colors">Réactiver</button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-12 text-center text-muted-foreground text-sm">Aucun prestataire trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
}
