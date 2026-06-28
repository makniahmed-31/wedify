"use client";

import Link from "next/link";
import { Search, Heart, BookOpen, ArrowRight } from "lucide-react";

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Bienvenue</h1>
        <p className="text-muted-foreground mt-1">
          Préparez votre mariage de rêve
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/vendors"
          className="rounded-lg border bg-card p-5 hover:shadow-md transition-shadow group"
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <p className="font-semibold">Trouver un prestataire</p>
          <p className="text-sm text-muted-foreground mt-1">
            Photographes, traiteurs, salles...
          </p>
          <div className="flex items-center gap-1 text-primary text-sm mt-3 font-medium">
            Explorer <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/user/dashboard/favorites"
          className="rounded-lg border bg-card p-5 hover:shadow-md transition-shadow group"
        >
          <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
            <Heart className="h-5 w-5 text-red-500" />
          </div>
          <p className="font-semibold">Mes favoris</p>
          <p className="text-sm text-muted-foreground mt-1">
            Prestataires sauvegardés
          </p>
          <div className="flex items-center gap-1 text-primary text-sm mt-3 font-medium">
            Voir <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/user/dashboard/bookings"
          className="rounded-lg border bg-card p-5 hover:shadow-md transition-shadow group"
        >
          <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
            <BookOpen className="h-5 w-5 text-blue-500" />
          </div>
          <p className="font-semibold">Mes réservations</p>
          <p className="text-sm text-muted-foreground mt-1">
            Suivre vos demandes
          </p>
          <div className="flex items-center gap-1 text-primary text-sm mt-3 font-medium">
            Voir <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold mb-4">Prestataires recommandés</h2>
        <div className="text-sm text-muted-foreground text-center py-8">
          <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
          <p>Explorez notre catalogue pour trouver les meilleurs prestataires</p>
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Voir les prestataires
          </Link>
        </div>
      </div>
    </div>
  );
}
