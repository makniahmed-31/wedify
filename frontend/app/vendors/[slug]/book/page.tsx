"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Calendar,
  Users,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

interface VendorBasic {
  businessName: string;
  slug: string;
  responseTime?: string;
}

export default function BookingPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [vendor, setVendor] = useState<VendorBasic | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    notes: "",
  });

  useEffect(() => {
    fetch(`/api/v1/vendors/slug/${slug}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { setVendor(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return null;
  if (!vendor) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("success");
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {step === "form" ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold">Request a Quote</h1>
                <p className="text-muted-foreground mt-1">
                  Send a booking request to{" "}
                  <strong>{vendor.businessName}</strong>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your name"
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
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                      placeholder="+216 xx xxx xxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" /> Event Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
                      <Users className="h-4 w-4" /> Number of Guests
                    </label>
                    <input
                      type="number"
                      value={form.guests}
                      onChange={(e) =>
                        setForm({ ...form, guests: e.target.value })
                      }
                      className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g. 200"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" /> Notes / Special
                    Requests
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    rows={4}
                    className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="Tell the vendor about your wedding vision..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white shadow-gold hover:opacity-90 transition-opacity"
                >
                  Send Booking Request
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to our Terms of Service. The vendor
                  will respond within {vendor.responseTime ?? "24 hours"}.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-16">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Request Sent!</h2>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                Your booking request has been sent to{" "}
                <strong>{vendor.businessName}</strong>. They will contact you
                within {vendor.responseTime ?? "24 hours"}.
              </p>
              <a
                href={`/vendors/${vendor.slug}`}
                className="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium hover:bg-muted"
              >
                Back to vendor page
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
