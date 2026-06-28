import { cookies } from "next/headers";
import { BACKEND } from "./config";

export async function getToken(): Promise<string | null> {
  const store = await cookies();
  return store.get("wedify_token")?.value ?? null;
}

export async function serverFetch(path: string, init: RequestInit = {}) {
  const token = await getToken();
  return fetch(`${BACKEND}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...(init.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
