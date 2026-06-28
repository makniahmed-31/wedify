"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

function AuthCallbackInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    if (accessToken && refreshToken) {
      login(accessToken, refreshToken);
      try {
        const { role } = JSON.parse(atob(accessToken.split(".")[1]));
        if (role === "ADMIN") router.replace("/admin");
        else if (role === "VENDOR") router.replace("/vendor/dashboard");
        else router.replace("/user/dashboard");
      } catch {
        router.replace("/user/dashboard");
      }
    } else {
      router.replace("/login?error=auth_failed");
    }
  }, [params, router, login]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground text-sm">Connexion en cours…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallbackInner />
    </Suspense>
  );
}
