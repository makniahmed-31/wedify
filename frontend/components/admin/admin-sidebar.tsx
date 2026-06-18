"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Store, Tag, CreditCard,
  BarChart3, FileText, Search, Settings, Heart,
  LogOut, Star, Home, Sliders,
} from "lucide-react";

const NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Vendors", href: "/admin/vendors", icon: Store },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Revenue", href: "/admin/revenue", icon: BarChart3 },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "SEO Monitor", href: "/admin/seo", icon: Search },
  { label: "Homepage", href: "/admin/homepage", icon: Home },
  { label: "Ranking", href: "/admin/ranking", icon: Sliders },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-gray-950 text-gray-100 min-h-screen">
      <div className="flex h-16 items-center gap-2 px-5 border-b border-white/10">
        <Heart className="h-5 w-5 fill-primary text-primary" />
        <span className="font-bold">Wedify Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
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
      <div className="border-t border-white/10 p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
