import type { Metadata } from "next";
import { serverFetch } from "@/lib/server-auth";
import type { AdminVendor } from "@/types";
import VendorsTable from "./vendors-table";

export const metadata: Metadata = { title: "Prestataires" };

export default async function AdminVendorsPage() {
  let vendors: AdminVendor[] = [];
  try {
    const res = await serverFetch("/api/v1/admin/vendors");
    if (res.ok) {
      const json = await res.json();
      vendors = (json.data ?? []).map((v: Record<string, unknown>) => ({
        id: v.id as string,
        name: (v.name as string) ?? "",
        category: (v.category as string) ?? "",
        city: (v.city as string) ?? "",
        plan: ((v.plan as string) ?? "BRONZE") as AdminVendor["plan"],
        status: ((v.status as string) ?? "PENDING") as AdminVendor["status"],
        joined: v.joined
          ? new Date(v.joined as string).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",
        revenue: (v.revenue as number) ?? 0,
      }));
    }
  } catch {}

  return <VendorsTable initialVendors={vendors} />;
}
