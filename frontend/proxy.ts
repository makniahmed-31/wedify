import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/dashboard"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!request.cookies.get("wedify_auth");

  // Admin protection
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminAuth = request.cookies.get("wedify_admin_auth");
    if (!adminAuth || adminAuth.value !== "1") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Already logged in → keep away from auth pages
  if (isLoggedIn && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Not logged in → keep away from protected pages
  if (!isLoggedIn && PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/register/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
