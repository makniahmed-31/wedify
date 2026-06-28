import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];

function roleHome(role: string | undefined) {
  if (role === "ADMIN") return "/admin";
  if (role === "VENDOR") return "/vendor/dashboard";
  return "/user/dashboard";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("wedify_auth")?.value;
  const isLoggedIn = !!authCookie;
  const role = authCookie; // "ADMIN" | "VENDOR" | "USER" | undefined

  // Admin routes: must be ADMIN
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Vendor dashboard: must be VENDOR (or ADMIN)
  if (pathname.startsWith("/vendor/dashboard")) {
    if (role !== "VENDOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // User dashboard: any logged-in user
  if (pathname.startsWith("/user/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Already logged in → keep away from auth pages
  if (isLoggedIn && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL(roleHome(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/vendor/dashboard/:path*",
    "/user/dashboard/:path*",
    "/login",
    "/register/:path*",
  ],
};
