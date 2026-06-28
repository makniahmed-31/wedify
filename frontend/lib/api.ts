import { getCookie, setCookie, deleteCookie } from "./cookies";

async function refreshTokens(): Promise<string | null> {
  const refreshToken = getCookie("wedify_refresh");
  if (!refreshToken) return null;
  try {
    const res = await fetch("/api/v1/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    setCookie("wedify_token", data.accessToken, 86400);
    setCookie("wedify_refresh", data.refreshToken, 86400 * 7);
    return data.accessToken;
  } catch {
    return null;
  }
}

export async function apiFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const token = getCookie("wedify_token");

  const withAuth = (t: string | null): RequestInit => ({
    ...init,
    headers: {
      ...(init.headers ?? {}),
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    },
  });

  let res = await fetch(input, withAuth(token));

  if (res.status === 401) {
    const newToken = await refreshTokens();
    if (newToken) {
      res = await fetch(input, withAuth(newToken));
    } else {
      deleteCookie("wedify_token");
      deleteCookie("wedify_refresh");
      deleteCookie("wedify_auth");
      window.location.href = "/login";
    }
  }

  return res;
}
