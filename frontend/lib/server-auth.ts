import { cookies } from "next/headers";

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:4001";

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
