"use client";

import Link from "next/link";
import { Heart, Search } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mes favoris</h1>
        <p className="text-muted-foreground mt-1">Prestataires sauvegardés</p>
      </div>

      <div className="rounded-lg border bg-card p-12 text-center">
        <Heart className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
        <p className="font-medium text-foreground">Aucun favori pour l&apos;instant</p>
        <p className="text-sm text-muted-foreground mt-1 mb-5">
          Cliquez sur le cœur d&apos;un prestataire pour le sauvegarder ici
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          <Search className="h-4 w-4" /> Explorer les prestataires
        </Link>
      </div>
    </div>
  );
}
