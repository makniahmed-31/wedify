"use client";

import { useState } from "react";
import {
  Search,
  Edit3,
  Check,
  X,
  Globe,
  FileText,
  MapPin,
  Tag,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface SeoPage {
  id: string;
  type: "home" | "category" | "city" | "vendor" | "static";
  path: string;
  label: string;
  title: string;
  description: string;
  indexed: boolean;
  hasSchema: boolean;
}

const INITIAL_PAGES: SeoPage[] = [
  {
    id: "p1",
    type: "home",
    path: "/",
    label: "Page d'accueil",
    title: "Wedify — La marketplace N°1 des mariages en Tunisie",
    description:
      "Découvrez 1 850+ prestataires de mariage de confiance à travers la Tunisie.",
    indexed: true,
    hasSchema: true,
  },
  {
    id: "p2",
    type: "category",
    path: "/photographes",
    label: "Photographes",
    title: "Photographes de mariage en Tunisie | Wedify",
    description:
      "Trouvez les meilleurs photographes de mariage en Tunisie. Comparez les tarifs et réservez.",
    indexed: true,
    hasSchema: true,
  },
  {
    id: "p3",
    type: "category",
    path: "/salles-de-mariage",
    label: "Salles de mariage",
    title: "Salles de mariage en Tunisie | Wedify",
    description:
      "Les plus belles salles de mariage en Tunisie. Réservez votre salle idéale sur Wedify.",
    indexed: true,
    hasSchema: false,
  },
  {
    id: "p4",
    type: "city",
    path: "/photographes/tunis",
    label: "Photographes à Tunis",
    title: "Photographes de mariage à Tunis | Wedify",
    description:
      "Photographes de mariage à Tunis. Comparez, lisez les avis et réservez en ligne.",
    indexed: true,
    hasSchema: true,
  },
  {
    id: "p5",
    type: "city",
    path: "/decorateurs/sousse",
    label: "Décorateurs à Sousse",
    title: "Décorateurs de mariage à Sousse | Wedify",
    description:
      "Décorateurs de mariage à Sousse. Créez le mariage de vos rêves avec les meilleurs décorateurs.",
    indexed: true,
    hasSchema: false,
  },
  {
    id: "p6",
    type: "static",
    path: "/a-propos",
    label: "À propos",
    title: "À propos de Wedify | La marketplace mariage Tunisie",
    description:
      "Wedify est la première marketplace dédiée aux mariages en Tunisie.",
    indexed: true,
    hasSchema: false,
  },
  {
    id: "p7",
    type: "static",
    path: "/contact",
    label: "Contact",
    title: "Contactez Wedify",
    description: "Besoin d'aide ? Contactez l'équipe Wedify.",
    indexed: true,
    hasSchema: false,
  },
  {
    id: "p8",
    type: "category",
    path: "/gateaux-mariage",
    label: "Gâteaux de mariage",
    title: "Gâteaux de mariage Tunisie | Wedify",
    description:
      "Trouvez les meilleurs pâtissiers pour votre gâteau de mariage en Tunisie.",
    indexed: false,
    hasSchema: false,
  },
];

const TYPE_ICONS = {
  home: Globe,
  category: Tag,
  city: MapPin,
  vendor: FileText,
  static: FileText,
};
const TYPE_LABELS = {
  home: "Accueil",
  category: "Catégorie",
  city: "Ville",
  vendor: "Prestataire",
  static: "Page statique",
};
const TYPE_COLORS = {
  home: "bg-primary/10 text-primary",
  category: "bg-blue-500/10 text-blue-600",
  city: "bg-purple-500/10 text-purple-600",
  vendor: "bg-orange-500/10 text-orange-600",
  static: "bg-muted text-muted-foreground",
};

interface EditState {
  title: string;
  description: string;
  indexed: boolean;
}

export default function AdminSeoPage() {
  const [pages, setPages] = useState<SeoPage[]>(INITIAL_PAGES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditState>({
    title: "",
    description: "",
    indexed: true,
  });
  const [search, setSearch] = useState("");

  function startEdit(page: SeoPage) {
    setEditingId(page.id);
    setEditForm({
      title: page.title,
      description: page.description,
      indexed: page.indexed,
    });
  }

  function saveEdit(id: string) {
    setPages((p) => p.map((x) => (x.id === id ? { ...x, ...editForm } : x)));
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  const filtered = pages.filter(
    (p) =>
      p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.path.toLowerCase().includes(search.toLowerCase()),
  );

  const issues = pages.filter(
    (p) => !p.hasSchema || !p.indexed || p.description.length < 50,
  ).length;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Gestion SEO</h1>
        <p className="text-muted-foreground mt-1">
          Optimisez les métadonnées de chaque page du site.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Pages indexées",
            value: pages.filter((p) => p.indexed).length,
            total: pages.length,
            ok: true,
          },
          {
            label: "Avec Schema.org",
            value: pages.filter((p) => p.hasSchema).length,
            total: pages.length,
            ok: true,
          },
          {
            label: "Non indexées",
            value: pages.filter((p) => !p.indexed).length,
            total: pages.length,
            ok: false,
          },
          {
            label: "Problèmes détectés",
            value: issues,
            total: pages.length,
            ok: false,
          },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-5">
            <div
              className={`text-2xl font-bold ${!s.ok && s.value > 0 ? "text-red-500" : "text-foreground"}`}
            >
              {s.value}
              <span className="text-sm font-normal text-muted-foreground">
                /{s.total}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Issues banner */}
      {issues > 0 && (
        <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <span className="font-semibold">
              {issues} page(s) nécessitent une attention
            </span>{" "}
            — descriptions trop courtes, Schema.org manquant, ou pages
            désindexées.
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher une page..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-md border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Pages list */}
      <div className="space-y-3">
        {filtered.map((page) => {
          const Icon = TYPE_ICONS[page.type];
          const isEditing = editingId === page.id;
          const hasIssue =
            !page.hasSchema || !page.indexed || page.description.length < 50;

          return (
            <div
              key={page.id}
              className={`rounded-lg border bg-card p-4 ${hasIssue ? "border-amber-200/60" : ""}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium shrink-0 ${TYPE_COLORS[page.type]}`}
                  >
                    <Icon className="h-3 w-3" />
                    {TYPE_LABELS[page.type]}
                  </span>
                  <code className="text-xs text-muted-foreground truncate">
                    {page.path}
                  </code>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {page.indexed ? (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle2 className="h-3 w-3" />
                      Indexé
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-red-500">
                      <X className="h-3 w-3" />
                      Non indexé
                    </span>
                  )}
                  {page.hasSchema && (
                    <span className="text-xs text-blue-600 bg-blue-50 rounded-full px-2 py-0.5">
                      Schema ✓
                    </span>
                  )}
                  {!isEditing && (
                    <button
                      onClick={() => startEdit(page)}
                      className="flex items-center gap-1 rounded-sm border px-2.5 py-1 text-xs font-medium hover:bg-muted transition-colors"
                    >
                      <Edit3 className="h-3 w-3" /> Modifier
                    </button>
                  )}
                </div>
              </div>

              {/* View mode */}
              {!isEditing && (
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-blue-700 truncate">
                    {page.title}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {page.description}
                  </p>
                  {page.description.length < 50 && (
                    <p className="text-xs text-amber-600">
                      ⚠ Description trop courte ({page.description.length} car.)
                      — recommandé : 120–160
                    </p>
                  )}
                </div>
              )}

              {/* Edit mode */}
              {isEditing && (
                <div className="space-y-3 mt-2">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                      Titre SEO
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, title: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-sm border text-sm outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Titre de la page (50–60 caractères)"
                    />
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {editForm.title.length} caractères
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                      Méta description
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      rows={2}
                      className="w-full px-3 py-2 rounded-sm border text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      placeholder="Description (120–160 caractères)"
                    />
                    <p
                      className={`text-xs mt-0.5 ${editForm.description.length < 120 ? "text-amber-600" : editForm.description.length > 160 ? "text-red-500" : "text-green-600"}`}
                    >
                      {editForm.description.length} / 160 caractères
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`indexed-${page.id}`}
                      checked={editForm.indexed}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          indexed: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <label htmlFor={`indexed-${page.id}`} className="text-sm">
                      Indexer cette page (robots: index, follow)
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(page.id)}
                      className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <Check className="h-3 w-3" /> Enregistrer
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
                    >
                      <X className="h-3 w-3" /> Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
