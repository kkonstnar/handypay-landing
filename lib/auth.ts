import { SignJWT, jwtVerify } from "jose";

const ISSUER = "phonetap-landing";
const AUDIENCE = "session";

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) throw new Error("AUTH_JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(email: string): Promise<string> {
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    const email = typeof payload.email === "string" ? payload.email : null;
    return email ? { email } : null;
  } catch {
    return null;
  }
}
