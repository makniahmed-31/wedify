"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type UserRole = "COUPLE" | "VENDOR" | "ADMIN";

interface AuthContextValue {
  loggedIn: boolean;
  role: UserRole | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  loggedIn: false,
  role: null,
  login: () => {},
  logout: () => {},
});

function parseRole(token: string): UserRole | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const r = parseRole(token);
      setLoggedIn(true);
      setRole(r);
      syncCookie(true, r);
    }
  }, []);

  const login = useCallback((accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const r = parseRole(accessToken);
    setLoggedIn(true);
    setRole(r);
    syncCookie(true, r);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    syncCookie(false);
    setLoggedIn(false);
    setRole(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ loggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function syncCookie(loggedIn: boolean, role?: UserRole | null) {
  if (loggedIn) {
    const value = role === "ADMIN" ? "ADMIN" : "1";
    document.cookie = `wedify_auth=${value}; path=/; max-age=86400; SameSite=Lax`;
  } else {
    document.cookie = "wedify_auth=; path=/; max-age=0";
  }
}
