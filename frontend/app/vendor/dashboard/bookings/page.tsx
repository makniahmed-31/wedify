import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bookings" };

const BOOKINGS = [
  {
    id: "b1",
    name: "Sarah & Ahmed",
    phone: "+216 55 123 456",
    date: "2025-02-14",
    status: "PENDING",
    amount: 8000,
    service: "Gold Package",
    notes: "300 guests, outdoor ceremony",
  },
  {
    id: "b2",
    name: "Fatima & Khalil",
    phone: "+216 55 234 567",
    date: "2025-03-22",
    status: "CONFIRMED",
    amount: 15000,
    service: "Diamond Package",
    notes: "500 guests",
  },
  {
    id: "b3",
    name: "Leila & Omar",
    phone: "+216 55 345 678",
    date: "2025-04-05",
    status: "CONFIRMED",
    amount: 8000,
    service: "Gold Package",
    notes: "",
  },
  {
    id: "b4",
    name: "Rim & Yassine",
    phone: "+216 55 456 789",
    date: "2024-12-20",
    status: "COMPLETED",
    amount: 8000,
    service: "Silver Package",
    notes: "",
  },
  {
    id: "b5",
    name: "Imen & Chedi",
    phone: "+216 55 567 890",
    date: "2025-01-12",
    status: "CANCELLED",
    amount: 0,
    service: "Gold Package",
    notes: "Cancelled by couple",
  },
];

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  CONFIRMED: "bg-green-500/10 text-green-600 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
  COMPLETED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export default function BookingsPage() {
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
          { label: "Pending", count: 1, color: "text-yellow-600" },
          { label: "Confirmed", count: 2, color: "text-green-600" },
          { label: "Completed", count: 1, color: "text-blue-600" },
          { label: "Cancelled", count: 1, color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bookings table */}
      <div className="rounded-lg border bg-card overflow-hidden">
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
              {BOOKINGS.map((b) => (
                <tr
                  key={b.id}
                  className="border-b last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(b.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">{b.service}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {b.amount > 0 ? `${b.amount.toLocaleString()} د.ت` : "—"}
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
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y">
          {BOOKINGS.map((b) => (
            <div key={b.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.phone}</p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium shrink-0 ${STATUS_STYLES[b.status]}`}
                >
                  {b.status}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <div className="space-y-0.5">
                  <p>
                    {new Date(b.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p>{b.service}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold text-foreground">
                    {b.amount > 0 ? `${b.amount.toLocaleString()} د.ت` : "—"}
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
          ))}
        </div>
      </div>
    </div>
  );
}
