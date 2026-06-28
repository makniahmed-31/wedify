"use client";

import { useState } from "react";
import { Save, Globe, Bell, Shield, CreditCard } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "BonPlanMariage.tn",
    siteUrl: "https://bonplanmariage.tn",
    supportEmail: "support@bonplanmariage.tn",
    commissionRate: "10",
    maintenanceMode: false,
    registrationOpen: true,
    emailNotifications: true,
    autoApproveVendors: false,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function toggle(key: keyof typeof settings) {
    setSettings((s) => ({ ...s, [key]: !s[key as keyof typeof s] }));
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground mt-1">Configuration globale de la plateforme</p>
        </div>
        <button onClick={handleSave}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
          <Save className="h-4 w-4" /> {saved ? "Enregistré !" : "Enregistrer"}
        </button>
      </div>

      <section className="rounded-lg border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Général</h2>
        </div>
        {[
          { key: "siteName", label: "Nom du site" },
          { key: "siteUrl", label: "URL du site" },
          { key: "supportEmail", label: "Email support" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input type="text" value={settings[key as keyof typeof settings] as string}
              onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        ))}
      </section>

      <section className="rounded-lg border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Facturation</h2>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Taux de commission (%)</label>
          <input type="number" min="0" max="100"
            value={settings.commissionRate}
            onChange={(e) => setSettings((s) => ({ ...s, commissionRate: e.target.value }))}
            className="w-32 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </section>

      <section className="rounded-lg border bg-card p-6 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Accès & modération</h2>
        </div>
        {[
          { key: "maintenanceMode", label: "Mode maintenance", desc: "Désactive l'accès public au site" },
          { key: "registrationOpen", label: "Inscriptions ouvertes", desc: "Autoriser les nouvelles inscriptions" },
          { key: "autoApproveVendors", label: "Approbation automatique", desc: "Approuver les prestataires sans validation manuelle" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between gap-4 py-2 border-b last:border-0">
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <button onClick={() => toggle(key as keyof typeof settings)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings[key as keyof typeof settings] ? "bg-primary" : "bg-muted"}`}>
              <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${settings[key as keyof typeof settings] ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        ))}
      </section>

      <section className="rounded-lg border bg-card p-6 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        <div className="flex items-center justify-between gap-4 py-2">
          <div>
            <p className="text-sm font-medium">Notifications par email</p>
            <p className="text-xs text-muted-foreground">Recevoir des alertes pour les nouvelles inscriptions et signalements</p>
          </div>
          <button onClick={() => toggle("emailNotifications")}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings.emailNotifications ? "bg-primary" : "bg-muted"}`}>
            <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${settings.emailNotifications ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
      </section>
    </div>
  );
}
