"use client";

import Link from "next/link";
import { Home, Heart, Search, BookOpen, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const NAV = [
  { label: "Accueil", href: "/user/dashboard", icon: Home },
  { label: "Explorer", href: "/vendors", icon: Search },
  { label: "Mes favoris", href: "/user/dashboard/favorites", icon: Heart },
  { label: "Mes réservations", href: "/user/dashboard/bookings", icon: BookOpen },
];

function UserSidebar({ onClose }: { onClose?: () => void }) {
  const { logout } = useAuth();
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground min-h-screen h-full">
      <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border shrink-0">
        <Heart className="h-5 w-5 fill-sidebar-primary text-sidebar-primary" />
        <span className="font-bold text-white">BonPlanMariage</span>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden ml-auto p-1.5 rounded-sm hover:bg-sidebar-accent/50 transition-colors"
          >
            <X className="h-4 w-4 text-sidebar-foreground/70" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-3 space-y-0.5 shrink-0">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        >
          <Home className="h-4 w-4" /> Retour au site
        </Link>
        <button
          onClick={() => { onClose?.(); logout(); }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" /> Se déconnecter
        </button>
      </div>
    </aside>
  );
}

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <UserSidebar onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-background min-w-0">
        <div className="flex lg:hidden items-center h-14 px-4 border-b bg-background gap-3 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-sm hover:bg-muted transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-bold text-sm">Mon espace</span>
        </div>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
