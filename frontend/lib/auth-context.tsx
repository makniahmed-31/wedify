"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  loggedIn: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  loggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasToken = !!localStorage.getItem("accessToken");
    setLoggedIn(hasToken);
    syncCookie(hasToken);
  }, []);

  const login = useCallback((accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    syncCookie(true);
    setLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    syncCookie(false);
    setLoggedIn(false);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function syncCookie(loggedIn: boolean) {
  if (loggedIn) {
    document.cookie = "wedify_auth=1; path=/; max-age=86400; SameSite=Lax";
  } else {
    document.cookie = "wedify_auth=; path=/; max-age=0";
  }
}
