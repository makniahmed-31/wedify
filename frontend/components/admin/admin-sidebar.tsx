"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Store, Tag, CreditCard,
  BarChart3, FileText, Search, Settings, Heart,
  LogOut, Star, Home, Sliders, X, ShieldCheck,
} from "lucide-react";

const NAV = [
  { label: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
  { label: "Prestataires", href: "/admin/vendors", icon: Store },
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  { label: "Catégories", href: "/admin/categories", icon: Tag },
  { label: "Abonnements", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Revenus", href: "/admin/revenue", icon: BarChart3 },
  { label: "Contenu", href: "/admin/content", icon: FileText },
  { label: "Avis clients", href: "/admin/reviews", icon: Star },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Page d'accueil", href: "/admin/homepage", icon: Home },
  { label: "Classement", href: "/admin/ranking", icon: Sliders },
  { label: "Paramètres", href: "/admin/settings", icon: Settings },
];

interface Props {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: Props) {
  const pathname = usePathname();
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-gray-950 text-gray-100 min-h-screen h-full">
      <div className="flex h-16 items-center gap-2 px-5 border-b border-white/10 shrink-0">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <span className="font-bold">Super Admin</span>
        <span className="ml-auto text-xs text-gray-500">Wedify</span>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden ml-1 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white mb-0.5"
        >
          <Heart className="h-4 w-4" /> Voir le site
        </Link>
        <button
          onClick={() => {
            document.cookie = "wedify_admin_auth=; path=/; max-age=0";
            window.location.href = "/admin/login";
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" /> Se déconnecter
        </button>
      </div>
    </aside>
  );
}
