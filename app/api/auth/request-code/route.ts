import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({ email: z.string().email() });

// In-memory code store (dev/demo only). Replace with DB/Redis in production.
const globalAny = global as { __authCodes?: Map<string, { code: string; expiresAt: number }> };
const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes
if (!globalAny.__authCodes) globalAny.__authCodes = new Map<string, { code: string; expiresAt: number }>();
const codeStore: Map<string, { code: string; expiresAt: number }> = globalAny.__authCodes;

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const { email } = parsed.data;

  const code = generateCode();
  codeStore.set(email.toLowerCase(), { code, expiresAt: Date.now() + CODE_TTL_MS });

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_FROM_EMAIL;

  if (resendKey && from) {
    const resend = new Resend(resendKey);
    try {
      await resend.emails.send({
        from,
        to: email,
        subject: "Your sign-in code",
        text: `Your code is ${code}. It expires in 10 minutes.`,
      });
    } catch (err) {
      console.error("Failed to send email via Resend:", err);
      // Fall back to console
      console.log(`[DEV] Sign-in code for ${email}: ${code}`);
    }
  } else {
    // No email provider configured, log the code for dev
    console.log(`[DEV] Sign-in code for ${email}: ${code}`);
  }

  return NextResponse.json({ ok: true });
}
