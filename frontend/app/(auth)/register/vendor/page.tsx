"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { CATEGORIES, CITIES, SUBSCRIPTION_PLANS } from "@/lib/constants";

type Step = "business" | "contact" | "plan" | "success";

export default function VendorRegisterPage() {
  const [step, setStep] = useState<Step>("business");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    city: "",
    description: "",
    phone: "",
    email: "",
    password: "",
    plan: "BRONZE",
  });

  const STEPS: { id: Step; label: string }[] = [
    { id: "business", label: "Business Info" },
    { id: "contact", label: "Contact" },
    { id: "plan", label: "Choose Plan" },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === "business") {
      setStep("contact");
      return;
    }
    if (step === "contact") {
      setStep("plan");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setStep("success");
    setLoading(false);
  }

  if (step === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">You&apos;re all set!</h2>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Welcome to Wedify! Your vendor account has been created. You can now
          set up your profile and start receiving bookings.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-gold"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">List your business</h1>
        <p className="text-muted-foreground mt-1">
          Start receiving wedding bookings on Wedify
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                s.id === step
                  ? "bg-primary text-white"
                  : STEPS.indexOf(STEPS.find((x) => x.id === step)!) > i
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {STEPS.indexOf(STEPS.find((x) => x.id === step)!) > i ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                i + 1
              )}
            </div>
            <span className="text-xs font-medium hidden sm:block">
              {s.label}
            </span>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-border" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === "business" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Business Name *
              </label>
              <input
                required
                value={form.businessName}
                onChange={(e) =>
                  setForm({ ...form, businessName: e.target.value })
                }
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Elegance Hall"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Category *
              </label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">City *</label>
              <select
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select a city</option>
                {CITIES.map((city) => (
                  <option key={city.id} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Short Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary resize-none"
                placeholder="Describe your business in a few sentences..."
              />
            </div>
          </>
        )}

        {step === "contact" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Email Address *
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="business@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Phone Number *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="+216 xx xxx xxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Password *
              </label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Minimum 8 characters"
                minLength={8}
              />
            </div>
          </>
        )}

        {step === "plan" && (
          <div className="space-y-3">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setForm({ ...form, plan: plan.name })}
                className={`w-full rounded-lg border p-4 text-left transition-all ${form.plan === plan.name ? "border-primary ring-1 ring-primary/30 shadow-gold" : "hover:border-primary/30"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{plan.label}</span>
                      {plan.isPopular && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {plan.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold">{plan.priceMonthly} TND</span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {plan.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                    >
                      <Check className="h-3 w-3 text-primary" /> {f}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-gold disabled:opacity-70 mt-6"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {step === "plan" ? "Create Account" : "Continue"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
