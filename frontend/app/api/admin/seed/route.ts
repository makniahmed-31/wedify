import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:4001";
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";

export async function POST(request: NextRequest) {
  if (request.cookies.get("wedify_admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${BACKEND}/api/v1/admin/seed`, {
    method: "POST",
    headers: { "X-Admin-Secret": ADMIN_SECRET },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
