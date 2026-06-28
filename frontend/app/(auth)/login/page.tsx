"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, Loader2, Mail, Phone, Lock } from "lucide-react";

type Tab = "login" | "register";
type Method = "email" | "phone" | "password";

export default function LoginPage() {
  const router = useRouter();
  const { loggedIn, role, login } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [method, setMethod] = useState<Method>("email");

  useEffect(() => {
    if (loggedIn && role) router.replace(`/${role.toLowerCase()}/dashboard`);
  }, [loggedIn, role, router]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    remember: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        },
      );
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      login(data.accessToken, data.refreshToken);
      try {
        const r: string = JSON.parse(atob(data.accessToken.split(".")[1])).role;
        router.replace(`/${r.toLowerCase()}/dashboard`);
      } catch {
        router.replace("/user/dashboard");
      }
    } catch {
      setLoading(false);
    }
  }

  function handleGoogleAuth() {
    window.location.href = `/api/v1/auth/google`;
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${tab === "login" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Se connecter
        </button>
        <button
          onClick={() => setTab("register")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${tab === "register" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Créer un compte
        </button>
      </div>

      {tab === "login" ? (
        <div>
          <h2 className="text-xl font-bold text-foreground text-center mb-1">
            Connectez-vous à votre compte
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Accédez à votre espace personnel
          </p>

          {/* Google */}
          <button onClick={handleGoogleAuth} className="w-full flex items-center justify-center gap-3 border border-border rounded-md py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors mb-5">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuer avec Google
          </button>

          <div className="relative flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Method selector */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              {
                id: "email" as Method,
                icon: <Mail className="h-4 w-4" />,
                label: "Par email",
              },
              {
                id: "phone" as Method,
                icon: <Phone className="h-4 w-4" />,
                label: "Par téléphone",
              },
              {
                id: "password" as Method,
                icon: <Lock className="h-4 w-4" />,
                label: "Par mot de passe",
              },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex flex-col items-center gap-1 rounded-md border py-2.5 px-2 text-xs font-medium transition-colors ${method === m.id ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Phone field */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">
                {method === "phone" ? "Téléphone" : "Email"}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {method === "phone" ? (
                    <Phone className="h-4 w-4" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </div>
                <input
                  required
                  type={method === "phone" ? "tel" : "email"}
                  value={method === "phone" ? form.phone : form.email}
                  onChange={(e) =>
                    setForm(
                      method === "phone"
                        ? { ...form, phone: e.target.value }
                        : { ...form, email: e.target.value },
                    )
                  }
                  placeholder={
                    method === "phone"
                      ? "Votre numéro de téléphone"
                      : "Entrez votre email"
                  }
                  className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">
                  Mot de passe
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Entrez votre mot de passe"
                  className="w-full rounded-md border border-border bg-background pl-10 pr-11 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) =>
                  setForm({ ...form, remember: e.target.checked })
                }
                className="rounded border-border accent-primary"
              />
              Se souvenir de moi
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white shadow-coral hover:opacity-90 disabled:opacity-70 transition-opacity"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Se connecter
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Vous n&apos;avez pas de compte ?{" "}
            <button
              onClick={() => setTab("register")}
              className="font-medium text-primary hover:underline"
            >
              Créer un compte
            </button>
          </p>
        </div>
      ) : (
        <RegisterForm onLogin={() => setTab("login")} />
      )}
    </div>
  );
}

function RegisterForm({ onLogin }: { onLogin: () => void }) {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  function handleGoogleAuth() {
    window.location.href = `/api/v1/auth/google`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/v1/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone || undefined,
            password: form.password,
          }),
        },
      );
      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();
      login(data.accessToken, data.refreshToken);
      const r: string = (() => { try { return JSON.parse(atob(data.accessToken.split(".")[1])).role; } catch { return "USER"; } })();
      router.replace(`/${r.toLowerCase()}/dashboard`);
    } catch {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground text-center mb-1">
        Créer un compte
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-5">
        Rejoignez la communauté des futurs mariés
      </p>

      {/* Google */}
      <button onClick={handleGoogleAuth} className="w-full flex items-center justify-center gap-3 border border-border rounded-md py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors mb-5">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continuer avec Google
      </button>

      <div className="relative flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="relative">
              <input
                required
                placeholder="Nom"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 pl-9 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                👤
              </span>
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                required
                placeholder="Prénom"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 pl-9 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                👤
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <span className="text-sm">🇹🇳</span>
            <span className="text-xs text-muted-foreground">+216</span>
            <span className="text-muted-foreground">|</span>
          </div>
          <input
            type="tel"
            placeholder="Téléphone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-md border border-border bg-background py-2.5 pl-20 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            required
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white shadow-coral hover:opacity-90 disabled:opacity-70 transition-opacity"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          S&apos;inscrire
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        En créant un compte, vous acceptez nos{" "}
        <Link href="/conditions" className="underline">
          CGU
        </Link>{" "}
        et notre{" "}
        <Link href="/confidentialite" className="underline">
          Politique de confidentialité
        </Link>
      </p>

      <div className="mt-5 border border-border rounded-md p-4 text-center">
        <p className="text-sm font-semibold text-foreground mb-1">
          Déjà un compte ?
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Connectez-vous pour accéder à votre espace
        </p>
        <button
          onClick={onLogin}
          className="w-full rounded-md border border-border py-2.5 text-sm font-medium text-foreground/70 hover:bg-muted transition-colors"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}
