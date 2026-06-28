import { NextRequest, NextResponse } from "next/server";
import { BACKEND } from "@/lib/config";
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (request.cookies.get("wedify_admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const res = await fetch(`${BACKEND}/api/v1/admin/vendors/${id}/action`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Secret": ADMIN_SECRET,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
