"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

const ADMIN_EMAIL = "admin@wedify.tn";
const ADMIN_PASSWORD = "wedify@2026!";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      document.cookie =
        "wedify_admin_auth=1; path=/; max-age=86400; SameSite=Lax";
      router.push("/admin");
      router.refresh();
    } else {
      setError(
        "Identifiants incorrects. Vérifiez votre email et mot de passe.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 mb-4">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-white">Super Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Accès restreint — Wedify</p>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          {error && (
            <div className="flex items-start gap-2.5 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 mb-5">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email administrateur
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-white/10 bg-white/5 text-white px-4 py-2.5 text-sm outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-primary"
                placeholder="admin@wedify.tn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full rounded-md border border-white/10 bg-white/5 text-white px-4 py-2.5 pr-10 text-sm outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-gold disabled:opacity-70 mt-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Wedify Super Admin · Accès réservé
        </p>
      </div>
    </div>
  );
}
