async function refreshTokens(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;
  try {
    const res = await fetch("/api/v1/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

export async function apiFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem("accessToken");

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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      document.cookie = "wedify_auth=; path=/; max-age=0";
      window.location.href = "/login";
    }
  }

  return res;
}
