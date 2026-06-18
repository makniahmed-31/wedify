"use client";

import { useState } from "react";
import { Star, CheckCircle2, XCircle, Flag, Eye, Search } from "lucide-react";

type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED" | "FLAGGED";

interface Review {
  id: string;
  vendor: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
  category: string;
}

const INITIAL_REVIEWS: Review[] = [
  { id: "rv1", vendor: "Elegance Hall Tunis", reviewer: "Sarah & Ahmed Boughanmi", rating: 5, comment: "Une salle magnifique, un service impeccable. Le personnel était aux petits soins. Nous recommandons vivement pour un mariage inoubliable.", date: "Il y a 1h", status: "PENDING", category: "Salles de mariage" },
  { id: "rv2", vendor: "Dream Photography", reviewer: "Fatima & Khalil Mansouri", rating: 4, comment: "Très bon photographe, photos de qualité professionnelle. Quelques petits retards mais le résultat final est excellent.", date: "Il y a 3h", status: "PENDING", category: "Photographes" },
  { id: "rv3", vendor: "Sweet Moments", reviewer: "Rim & Yassine Trabelsi", rating: 5, comment: "Le gâteau de mariage était absolument délicieux et magnifiquement décoré. Exactement comme nous l'avions demandé.", date: "Il y a 5h", status: "PENDING", category: "Gâteaux" },
  { id: "rv4", vendor: "Orchestre Carthage", reviewer: "Nour & Sami Gharbi", rating: 2, comment: "Déçus par la prestation. L'orchestre est arrivé en retard et le son n'était pas au niveau. À éviter.", date: "Il y a 8h", status: "FLAGGED", category: "Groupes musicaux" },
  { id: "rv5", vendor: "DJ Maestro", reviewer: "Lina & Omar Hamdi", rating: 5, comment: "DJ exceptionnel ! Toute la soirée était électrique, les invités ont adoré. On recommande les yeux fermés !", date: "Hier", status: "APPROVED", category: "DJs" },
  { id: "rv6", vendor: "Décor Rêve", reviewer: "Amira & Walid Zouari", rating: 1, comment: "ARNAQUE ! Ne pas faire confiance à ce prestataire. Pris l'argent et n'est pas venu le jour J.", date: "Hier", status: "FLAGGED", category: "Décorateurs" },
];

const STATUS_STYLES: Record<ReviewStatus, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-600",
  APPROVED: "bg-green-500/10 text-green-600",
  REJECTED: "bg-red-500/10 text-red-500",
  FLAGGED: "bg-orange-500/10 text-orange-600",
};
const STATUS_LABELS: Record<ReviewStatus, string> = {
  PENDING: "En attente",
  APPROVED: "Approuvé",
  REJECTED: "Rejeté",
  FLAGGED: "Signalé",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${s <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [filter, setFilter] = useState<ReviewStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  function updateStatus(id: string, status: ReviewStatus) {
    setReviews((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  const filtered = reviews.filter((r) => {
    const matchFilter = filter === "ALL" || r.status === filter;
    const matchSearch = r.vendor.toLowerCase().includes(search.toLowerCase()) || r.reviewer.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const pending = reviews.filter((r) => r.status === "PENDING").length;
  const flagged = reviews.filter((r) => r.status === "FLAGGED").length;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Modération des avis</h1>
        <p className="text-muted-foreground mt-1">
          Approuvez, rejetez ou signalez les avis clients.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total avis", value: reviews.length },
          { label: "En attente", value: pending, urgent: pending > 0 },
          { label: "Signalés", value: flagged, urgent: flagged > 0 },
          { label: "Approuvés", value: reviews.filter((r) => r.status === "APPROVED").length, urgent: false },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border bg-card p-5 ${s.urgent ? "border-amber-200" : ""}`}>
            <p className={`text-2xl font-bold ${s.urgent ? "text-amber-600" : ""}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher par prestataire ou auteur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["ALL", "PENDING", "FLAGGED", "APPROVED", "REJECTED"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === s ? "bg-foreground text-background" : "border hover:bg-muted"
              }`}
            >
              {s === "ALL" ? "Tous" : STATUS_LABELS[s]}
              {s === "PENDING" && pending > 0 && <span className="ml-1">({pending})</span>}
              {s === "FLAGGED" && flagged > 0 && <span className="ml-1">({flagged})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        {filtered.map((review) => (
          <div
            key={review.id}
            className={`rounded-2xl border bg-card p-4 ${
              review.status === "FLAGGED" ? "border-orange-200/60" :
              review.status === "PENDING" ? "border-yellow-200/60" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-semibold text-sm">{review.vendor}</p>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{review.category}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Stars rating={review.rating} />
                  <span className="text-xs text-muted-foreground">par {review.reviewer}</span>
                  <span className="text-xs text-muted-foreground">· {review.date}</span>
                </div>
                <p className={`text-sm text-muted-foreground ${expanded === review.id ? "" : "line-clamp-2"}`}>
                  {review.comment}
                </p>
                {review.comment.length > 120 && (
                  <button
                    onClick={() => setExpanded(expanded === review.id ? null : review.id)}
                    className="text-xs text-primary hover:underline mt-1"
                  >
                    {expanded === review.id ? "Réduire" : "Lire plus"}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[review.status]}`}>
                  {STATUS_LABELS[review.status]}
                </span>
                {review.status !== "APPROVED" && (
                  <button
                    onClick={() => updateStatus(review.id, "APPROVED")}
                    title="Approuver"
                    className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle2 className="h-3 w-3" /> Approuver
                  </button>
                )}
                {review.status !== "REJECTED" && (
                  <button
                    onClick={() => updateStatus(review.id, "REJECTED")}
                    title="Rejeter"
                    className="flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="h-3 w-3" /> Rejeter
                  </button>
                )}
                {review.status !== "FLAGGED" && (
                  <button
                    onClick={() => updateStatus(review.id, "FLAGGED")}
                    title="Signaler"
                    className="p-1.5 rounded-lg hover:bg-orange-50 text-orange-500 transition-colors"
                  >
                    <Flag className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border bg-card p-12 text-center text-muted-foreground text-sm">
            Aucun avis trouvé.
          </div>
        )}
      </div>
    </div>
  );
}
