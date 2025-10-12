import { NextResponse } from "next/server";
import { z } from "zod";
import { signSessionToken } from "@/lib/auth";

const schema = z.object({ email: z.string().email(), code: z.string().length(6) });

const globalAny = global as any;
if (!globalAny.__authCodes) globalAny.__authCodes = new Map<string, { code: string; expiresAt: number }>();
const codeStore: Map<string, { code: string; expiresAt: number }> = globalAny.__authCodes;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { email, code } = parsed.data;
  const record = codeStore.get(email.toLowerCase());
  if (!record || record.code !== code || record.expiresAt < Date.now()) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
  }

  codeStore.delete(email.toLowerCase());
  const token = await signSessionToken(email.toLowerCase());

  const res = NextResponse.json({ ok: true });
  res.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
  return res;
}
