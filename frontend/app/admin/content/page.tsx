"use client";

import { useState } from "react";
import { FileText, Eye, Pencil, Plus, Globe, Clock } from "lucide-react";

type Status = "PUBLISHED" | "DRAFT" | "ARCHIVED";

const ARTICLES = [
  { id: "1", title: "Guide complet pour organiser votre mariage en Tunisie", slug: "guide-mariage-tunisie", status: "PUBLISHED" as Status, views: 4820, updatedAt: "2025-11-12" },
  { id: "2", title: "Top 10 des salles de mariage à Tunis", slug: "top-salles-mariage-tunis", status: "PUBLISHED" as Status, views: 7340, updatedAt: "2025-10-28" },
  { id: "3", title: "Comment choisir votre photographe de mariage", slug: "choisir-photographe-mariage", status: "PUBLISHED" as Status, views: 3210, updatedAt: "2025-11-01" },
  { id: "4", title: "Tendances décoration mariage 2026", slug: "tendances-decoration-2026", status: "DRAFT" as Status, views: 0, updatedAt: "2025-12-01" },
  { id: "5", title: "Budget mariage en Tunisie : guide pratique", slug: "budget-mariage-tunisie", status: "PUBLISHED" as Status, views: 9100, updatedAt: "2025-09-15" },
  { id: "6", title: "Les meilleures villes pour se marier en Tunisie", slug: "meilleures-villes-mariage", status: "ARCHIVED" as Status, views: 1240, updatedAt: "2025-06-10" },
];

const STATUS_STYLES: Record<Status, string> = {
  PUBLISHED: "bg-green-500/10 text-green-600",
  DRAFT: "bg-yellow-500/10 text-yellow-600",
  ARCHIVED: "bg-muted text-muted-foreground",
};
const STATUS_LABELS: Record<Status, string> = {
  PUBLISHED: "Publié",
  DRAFT: "Brouillon",
  ARCHIVED: "Archivé",
};

export default function AdminContentPage() {
  const [articles, setArticles] = useState(ARTICLES);
  const [filter, setFilter] = useState<Status | "ALL">("ALL");

  const filtered = filter === "ALL" ? articles : articles.filter((a) => a.status === filter);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Contenu & Blog</h1>
          <p className="text-muted-foreground mt-1">{articles.length} articles au total</p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Nouvel article
        </button>
      </div>

      <div className="flex gap-2">
        {(["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === s ? "bg-primary text-white" : "border hover:bg-muted"}`}>
            {s === "ALL" ? "Tous" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Titre</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Vues</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Modifié</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">{a.title}</p>
                      <p className="text-xs text-muted-foreground font-mono">{a.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[a.status]}`}>
                    {STATUS_LABELS[a.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" />
                    {a.views.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(a.updatedAt).toLocaleDateString("fr-FR")}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className="p-1.5 rounded-sm hover:bg-muted transition-colors" title="Voir">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-sm hover:bg-muted transition-colors" title="Modifier">
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
