"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, DollarSign, CreditCard, ArrowUpRight } from "lucide-react";

const MRR_DATA = [
  { month: "Jan", mrr: 18500, arr: 222000 },
  { month: "Fév", mrr: 22400, arr: 268800 },
  { month: "Mar", mrr: 26800, arr: 321600 },
  { month: "Avr", mrr: 31200, arr: 374400 },
  { month: "Mai", mrr: 34500, arr: 414000 },
  { month: "Juin", mrr: 39100, arr: 469200 },
  { month: "Juil", mrr: 43800, arr: 525600 },
  { month: "Août", mrr: 48200, arr: 578400 },
  { month: "Sep", mrr: 52400, arr: 628800 },
  { month: "Oct", mrr: 57900, arr: 694800 },
  { month: "Nov", mrr: 62100, arr: 745200 },
  { month: "Déc", mrr: 68400, arr: 820800 },
];

const PLAN_REVENUE = [
  { plan: "Premium", vendors: 142, mrr: 21158, color: "#C9A84C" },
  { plan: "Pro", vendors: 387, mrr: 30573, color: "#3B82F6" },
  { plan: "Basic", vendors: 1321, mrr: 38309, color: "#6B7280" },
];

const KPIS = [
  { label: "MRR actuel", value: "68 400 TND", change: "+10.2%", icon: DollarSign },
  { label: "ARR projeté", value: "820 800 TND", change: "+10.2%", icon: TrendingUp },
  { label: "Abonnés actifs", value: "1 734", change: "+42 ce mois", icon: CreditCard },
  { label: "Revenu moyen/vendor", value: "51.6 TND", change: "+3.1%", icon: ArrowUpRight },
];

export default function AdminRevenuePage() {
  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Revenus</h1>
        <p className="text-muted-foreground mt-1">Suivi financier de la plateforme</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs font-medium text-green-600">{kpi.change}</span>
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold mb-1">Évolution MRR — 2025</h2>
        <p className="text-sm text-muted-foreground mb-6">Revenu mensuel récurrent</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={MRR_DATA}>
            <defs>
              <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} TND`, "MRR"]}
              contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--card))" }} />
            <Area type="monotone" dataKey="mrr" stroke="#C9A84C" strokeWidth={2} fill="url(#mrrGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold mb-4">Revenus par plan</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={PLAN_REVENUE}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="plan" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} TND`, "MRR"]}
              contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--card))" }} />
            <Bar dataKey="mrr" fill="#C9A84C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
