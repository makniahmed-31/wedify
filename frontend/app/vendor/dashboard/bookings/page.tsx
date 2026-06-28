"use client";

import { useEffect, useState } from "react";
import type { VendorBooking } from "@/types";
import { getCookie } from "@/lib/cookies";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  CONFIRMED: "bg-green-500/10 text-green-600 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
  COMPLETED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

function getField<T>(a: T | undefined, b: T | undefined, fallback: T): T {
  return a ?? b ?? fallback;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<VendorBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("wedify_token");
    fetch("/api/v1/bookings/vendor", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => r.ok ? r.json() : [])
      .then((data) => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const counts = {
    PENDING: bookings.filter((b) => b.status === "PENDING").length,
    CONFIRMED: bookings.filter((b) => b.status === "CONFIRMED").length,
    COMPLETED: bookings.filter((b) => b.status === "COMPLETED").length,
    CANCELLED: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your booking requests
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Pending", count: counts.PENDING, color: "text-yellow-600" },
          { label: "Confirmed", count: counts.CONFIRMED, color: "text-green-600" },
          { label: "Completed", count: counts.COMPLETED, color: "text-blue-600" },
          { label: "Cancelled", count: counts.CANCELLED, color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-4">
            <p className={`text-2xl font-bold ${s.color}`}>
              {loading ? "—" : s.count}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bookings table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading…</div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No bookings yet.
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Couple
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Event Date
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => {
                    const name = getField(b.name, b.coupleName, "—");
                    const phone = getField(b.phone, b.couplePhone, "");
                    const date = getField(b.date, b.eventDate, "");
                    const service = getField(b.service, b.serviceName, "—");
                    const amount = getField(b.amount, b.totalAmount, 0);
                    return (
                      <tr
                        key={b.id}
                        className="border-b last:border-0 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium">{name}</p>
                          {phone && (
                            <p className="text-xs text-muted-foreground">{phone}</p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {date
                            ? new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </td>
                        <td className="px-4 py-3">{service}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[b.status] ?? ""}`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {amount > 0 ? `${amount.toLocaleString()} د.ت` : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {b.status === "PENDING" && (
                              <>
                                <button className="rounded-sm bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 hover:bg-green-500/20">
                                  Confirm
                                </button>
                                <button className="rounded-sm bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-500/20">
                                  Decline
                                </button>
                              </>
                            )}
                            {(b.status === "CONFIRMED" ||
                              b.status === "COMPLETED") && (
                              <button className="rounded-sm bg-muted px-2.5 py-1 text-xs font-medium hover:bg-muted/80">
                                View
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="md:hidden divide-y">
              {bookings.map((b) => {
                const name = getField(b.name, b.coupleName, "—");
                const phone = getField(b.phone, b.couplePhone, "");
                const date = getField(b.date, b.eventDate, "");
                const service = getField(b.service, b.serviceName, "—");
                const amount = getField(b.amount, b.totalAmount, 0);
                return (
                  <div key={b.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{name}</p>
                        {phone && (
                          <p className="text-xs text-muted-foreground">{phone}</p>
                        )}
                      </div>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium shrink-0 ${STATUS_STYLES[b.status] ?? ""}`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <div className="space-y-0.5">
                        <p>
                          {date
                            ? new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </p>
                        <p>{service}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-semibold text-foreground">
                          {amount > 0 ? `${amount.toLocaleString()} د.ت` : "—"}
                        </span>
                        {b.status === "PENDING" && (
                          <div className="flex gap-1">
                            <button className="rounded-sm bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 hover:bg-green-500/20">
                              Confirm
                            </button>
                            <button className="rounded-sm bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-500/20">
                              Decline
                            </button>
                          </div>
                        )}
                        {(b.status === "CONFIRMED" || b.status === "COMPLETED") && (
                          <button className="rounded-sm bg-muted px-2.5 py-1 text-xs font-medium hover:bg-muted/80">
                            View
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
