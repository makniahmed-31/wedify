"use client";

import { useState } from "react";
import { Save, Eye, Star, TrendingUp, Crown } from "lucide-react";

const FEATURED_SLOTS = [
  { slot: 1, vendorId: "elegance-hall-tunis", vendorName: "Elegance Hall Tunis", category: "Salles de mariage", active: true },
  { slot: 2, vendorId: "chateau-des-roses-hammamet", vendorName: "Château des Roses", category: "Salles de mariage", active: true },
  { slot: 3, vendorId: "villa-jasmin-la-marsa", vendorName: "Villa Jasmin", category: "Salles de mariage", active: true },
  { slot: 4, vendorId: "band-el-andalus-tunis", vendorName: "Band El Andalus", category: "Groupes musicaux", active: false },
];

const HERO_STATS = [
  { label: "Prestataires inscrits", value: "1 850+", editable: false },
  { label: "Mariages organisés", value: "12 400+", editable: false },
  { label: "Villes couvertes", value: "24", editable: false },
  { label: "Note moyenne", value: "4.8/5", editable: false },
];

export default function AdminHomepagePage() {
  const [slots, setSlots] = useState(FEATURED_SLOTS);
  const [saved, setSaved] = useState(false);

  function toggleSlot(slot: number) {
    setSlots((s) => s.map((x) => x.slot === slot ? { ...x, active: !x.active } : x));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Page d&apos;accueil</h1>
          <p className="text-muted-foreground mt-1">Gérer le contenu affiché sur la page principale</p>
        </div>
        <div className="flex gap-2">
          <a href="/" target="_blank"
            className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-muted transition-colors">
            <Eye className="h-4 w-4" /> Aperçu
          </a>
          <button onClick={handleSave}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Save className="h-4 w-4" /> {saved ? "Enregistré !" : "Enregistrer"}
          </button>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Statistiques hero</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="rounded-md border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="font-bold text-lg">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Prestataires mis en avant</h2>
          <span className="ml-auto text-xs text-muted-foreground">{slots.filter((s) => s.active).length}/4 actifs</span>
        </div>
        <div className="space-y-2">
          {slots.map((s) => (
            <div key={s.slot} className={`flex items-center justify-between gap-4 rounded-md border p-3 transition-colors ${s.active ? "bg-primary/5 border-primary/20" : "opacity-60"}`}>
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Star className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{s.vendorName}</p>
                  <p className="text-xs text-muted-foreground">{s.category} · Slot #{s.slot}</p>
                </div>
              </div>
              <button onClick={() => toggleSlot(s.slot)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${s.active ? "bg-green-500/10 text-green-600 hover:bg-red-500/10 hover:text-red-500" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>
                {s.active ? "Actif" : "Inactif"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
