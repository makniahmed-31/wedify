"use client";

import Link from "next/link";
import { BookOpen, Search } from "lucide-react";

export default function UserBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mes réservations</h1>
        <p className="text-muted-foreground mt-1">Suivez vos demandes de contact</p>
      </div>

      <div className="rounded-lg border bg-card p-12 text-center">
        <BookOpen className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
        <p className="font-medium text-foreground">Aucune réservation pour l&apos;instant</p>
        <p className="text-sm text-muted-foreground mt-1 mb-5">
          Vos demandes de contact apparaîtront ici une fois envoyées
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          <Search className="h-4 w-4" /> Trouver un prestataire
        </Link>
      </div>
    </div>
  );
}
