import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const session = await verifySessionToken(token);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const backendUrl = process.env.BACKEND_DELETE_URL;
  if (backendUrl) {
    try {
      const resp = await fetch(backendUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: session.email }),
      });
      const ok = resp.ok;
      const status = resp.status;
      const data = await resp.json().catch(() => ({}));
      if (!ok)
        return NextResponse.json(
          { error: data?.error ?? "Backend error" },
          { status }
        );
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("Proxy deletion failed:", err);
      return NextResponse.json({ error: "Proxy failed" }, { status: 502 });
    }
  }

  console.log(`[STUB] Delete requested for ${session.email}`);
  return NextResponse.json({ ok: true, stub: true });
}
