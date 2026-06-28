import { NextRequest, NextResponse } from "next/server";
import { BACKEND } from "@/lib/config";
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";

export async function GET(request: NextRequest) {
  if (request.cookies.get("wedify_admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL("/api/v1/admin/vendors", BACKEND);
  request.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { "X-Admin-Secret": ADMIN_SECRET },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
