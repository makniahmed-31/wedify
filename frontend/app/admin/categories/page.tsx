"use client";

import { useState } from "react";
import { Tag, Plus, Pencil, Trash2 } from "lucide-react";

const CATEGORIES = [
  {
    id: "1",
    slug: "wedding-halls",
    label: "Salles de mariage",
    count: 142,
    icon: "🏛️",
  },
  {
    id: "2",
    slug: "photographers",
    label: "Photographes",
    count: 98,
    icon: "📸",
  },
  {
    id: "3",
    slug: "sweets",
    label: "Gâteaux & Pâtisseries",
    count: 76,
    icon: "🎂",
  },
  { id: "4", slug: "djs", label: "DJs & Musique", count: 64, icon: "🎵" },
  {
    id: "5",
    slug: "decorators",
    label: "Décorateurs & Fleuristes",
    count: 88,
    icon: "💐",
  },
  {
    id: "6",
    slug: "makeup-artists",
    label: "Coiffure & Maquillage",
    count: 53,
    icon: "💄",
  },
  {
    id: "7",
    slug: "music-bands",
    label: "Groupes musicaux",
    count: 41,
    icon: "🎶",
  },
  {
    id: "8",
    slug: "traditional-services",
    label: "Services traditionnels",
    count: 37,
    icon: "🎎",
  },
  { id: "9", slug: "catering", label: "Traiteurs", count: 29, icon: "🍽️" },
  {
    id: "10",
    slug: "transport",
    label: "Transport & Limousines",
    count: 22,
    icon: "🚗",
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(CATEGORIES);

  return (
    <div className="space-y-6 ">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Catégories</h1>
          <p className="text-muted-foreground mt-1">
            {categories.length} catégories actives
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Nouvelle catégorie
        </button>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Catégorie
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Slug
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Prestataires
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-b last:border-0 hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="font-medium">{cat.label}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                  {cat.slug}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <Tag className="h-3 w-3" /> {cat.count}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      className="p-1.5 rounded-sm hover:bg-muted transition-colors"
                      title="Modifier"
                    >
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() =>
                        setCategories((c) => c.filter((x) => x.id !== cat.id))
                      }
                      className="p-1.5 rounded-sm hover:bg-red-50 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
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
