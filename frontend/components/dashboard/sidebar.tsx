"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Package,
  CalendarDays,
  Inbox,
  MessageSquare,
  Star,
  BarChart3,
  Search,
  CreditCard,
  Palette,
  Settings,
  Heart,
  LogOut,
  Bell,
  Image,
  X,
} from "lucide-react";

const NAV = [
  { label: "Aperçu", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profil", href: "/dashboard/profile", icon: User },
  { label: "Services", href: "/dashboard/services", icon: Briefcase },
  { label: "Forfaits", href: "/dashboard/packages", icon: Package },
  { label: "Réservations", href: "/dashboard/bookings", icon: CalendarDays },
  { label: "Prospects", href: "/dashboard/leads", icon: Inbox },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Avis clients", href: "/dashboard/reviews", icon: Star },
  { label: "Médiathèque", href: "/dashboard/media", icon: Image },
  { label: "Statistiques", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "SEO", href: "/dashboard/seo", icon: Search },
  { label: "Abonnement", href: "/dashboard/subscription", icon: CreditCard },
  { label: "Thème", href: "/dashboard/theme", icon: Palette },
  { label: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

interface Props {
  onClose?: () => void;
}

export function DashboardSidebar({ onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground min-h-screen h-full">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border shrink-0">
        <Heart className="h-5 w-5 fill-sidebar-primary text-sidebar-primary" />
        <span className="font-bold text-white">Wedify</span>
        <span className="ml-auto rounded-full bg-sidebar-primary/20 px-2 py-0.5 text-xs font-medium text-sidebar-primary">
          PRO
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden ml-1 p-1.5 rounded-sm hover:bg-sidebar-accent/50 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="h-4 w-4 text-sidebar-foreground/70" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === href
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${active ? "text-sidebar-primary" : ""}`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-3 space-y-0.5 shrink-0">
        <Link
          href="/dashboard/notifications"
          onClick={onClose}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        >
          <Bell className="h-4 w-4" /> Notifications
        </Link>
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-red-500/10 hover:text-red-400">
          <LogOut className="h-4 w-4" /> Se déconnecter
        </button>
      </div>
    </aside>
  );
}
