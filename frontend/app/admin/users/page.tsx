import type { Metadata } from "next";
import { serverFetch } from "@/lib/server-auth";
import UsersTable from "./users-table";

export const metadata: Metadata = { title: "Utilisateurs" };

export default async function AdminUsersPage() {
  let users: any[] = [];
  try {
    const res = await serverFetch("/api/v1/users");
    if (res.ok) {
      const data = await res.json();
      users = Array.isArray(data) ? data : (data.data ?? []);
    }
  } catch {}

  return <UsersTable initialUsers={users} />;
}
