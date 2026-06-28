import type { Metadata } from "next";
import { serverFetch } from "@/lib/server-auth";
import ProfileForm from "./profile-form";

export const metadata: Metadata = { title: "Edit Profile" };

export default async function ProfilePage() {
  let initialData = null;
  try {
    const res = await serverFetch("/api/v1/vendors/profile/me");
    if (res.ok) initialData = await res.json();
  } catch {}

  return <ProfileForm initialData={initialData} />;
}
