"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie, deleteCookie } from "./cookies";

export type UserRole = "USER" | "VENDOR" | "ADMIN";

interface AuthContextValue {
  loggedIn: boolean;
  role: UserRole | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
  initialLoggedIn?: boolean;
  initialRole?: UserRole | null;
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

export function AuthProvider({ children, initialLoggedIn = false, initialRole = null }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);
  const [role, setRole] = useState<UserRole | null>(initialRole);
  const router = useRouter();

  const login = useCallback((accessToken: string, refreshToken: string) => {
    const r = parseRole(accessToken);
    setCookie("wedify_token", accessToken, 86400);
    setCookie("wedify_refresh", refreshToken, 86400 * 7);
    setCookie("wedify_auth", r ?? "USER", 86400);
    setLoggedIn(true);
    setRole(r);
  }, []);

  const logout = useCallback(() => {
    deleteCookie("wedify_token");
    deleteCookie("wedify_refresh");
    deleteCookie("wedify_auth");
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

export { getCookie };
