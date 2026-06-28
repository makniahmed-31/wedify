import type { Metadata } from "next";
import { serverFetch } from "@/lib/server-auth";
import VendorsTable from "./vendors-table";

export const metadata: Metadata = { title: "Prestataires" };

export default async function AdminVendorsPage() {
  let vendors: any[] = [];
  try {
    const res = await serverFetch("/api/v1/admin/vendors");
    if (res.ok) {
      const json = await res.json();
      vendors = (json.data ?? []).map((v: any) => ({
        id: v.id,
        name: v.name ?? "",
        category: v.category ?? "",
        city: v.city ?? "",
        plan: (v.plan ?? "BRONZE") as "BRONZE" | "SILVER" | "GOLD",
        status: (v.status ?? "PENDING") as "ACTIVE" | "PENDING" | "SUSPENDED",
        joined: v.joined
          ? new Date(v.joined).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",
        revenue: v.revenue ?? 0,
      }));
    }
  } catch {}

  return <VendorsTable initialVendors={vendors} />;
}
