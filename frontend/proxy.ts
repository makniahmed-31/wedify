import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/dashboard"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("wedify_auth")?.value;
  const isLoggedIn = !!authCookie;
  const isAdmin = authCookie === "ADMIN";

  // Admin routes: must be logged in as ADMIN
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Already logged in → keep away from auth pages
  if (isLoggedIn && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL(isAdmin ? "/admin" : "/dashboard", request.url));
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
