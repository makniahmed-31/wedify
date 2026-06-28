"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CATEGORIES, CITIES } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export default function DevisPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    city: "",
    date: "",
    budget: "",
    guestCount: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-2xl px-4 py-12">
          {submitted ? (
            <div className="rounded-xl border bg-card p-10 text-center space-y-4">
              <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
              <h1 className="text-2xl font-bold">Demande envoyée !</h1>
              <p className="text-muted-foreground">
                Votre demande de devis a été transmise. Les prestataires
                correspondants vous contacteront sous 24h.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Publier une demande</h1>
                <p className="text-muted-foreground mt-2">
                  Décrivez votre projet de mariage et recevez des devis
                  personnalisés des meilleurs prestataires.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-xl border bg-card p-6 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Nom complet *
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Téléphone *
                    </label>
                    <input
                      required
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+216 XX XXX XXX"
                      className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Type de prestataire *
                    </label>
                    <select
                      required
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="">Sélectionner</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Ville *
                    </label>
                    <select
                      required
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="">Sélectionner</option>
                      {CITIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Date du mariage
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Nombre d&apos;invités
                    </label>
                    <input
                      type="number"
                      name="guestCount"
                      value={form.guestCount}
                      onChange={handleChange}
                      placeholder="ex: 200"
                      min="1"
                      className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Budget approximatif
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Non précisé</option>
                    <option value="<2000">Moins de 2 000 DT</option>
                    <option value="2000-5000">2 000 – 5 000 DT</option>
                    <option value="5000-10000">5 000 – 10 000 DT</option>
                    <option value="10000-20000">10 000 – 20 000 DT</option>
                    <option value=">20000">Plus de 20 000 DT</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Description de votre projet
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Décrivez vos besoins, vos préférences, vos questions..."
                    className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90 transition-opacity"
                >
                  Envoyer ma demande
                </button>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
