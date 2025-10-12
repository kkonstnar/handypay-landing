"use client";
import { useState } from "react";

async function postJson(path: string, body: unknown) {
  const res = await fetch(path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error ?? "Request failed");
  return data;
}

export default function DeleteClient({ initialAuthed }: { initialAuthed: boolean }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState<"request" | "verify" | "authed">(initialAuthed ? "authed" : "request");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const requestCode = async () => {
    setBusy(true); setError(null); setSuccess(null);
    try {
      await postJson("/api/auth/request-code", { email });
      setStep("verify");
      setSuccess("Code sent. Check your email (or console in dev).");
    } catch (e: any) { setError(e.message); } finally { setBusy(false); }
  };

  const verifyCode = async () => {
    setBusy(true); setError(null); setSuccess(null);
    try {
      await postJson("/api/auth/verify", { email, code });
      setStep("authed");
      setSuccess("Signed in.");
    } catch (e: any) { setError(e.message); } finally { setBusy(false); }
  };

  const deleteAccount = async () => {
    setBusy(true); setError(null); setSuccess(null);
    try {
      await postJson("/api/delete", { userId });
      setSuccess("Your deletion request has been received.");
    } catch (e: any) { setError(e.message); } finally { setBusy(false); }
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-xl">
      <h1 className="text-3xl font-semibold mb-6">Delete Account</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-700 mb-4">{success}</p>}

      {step === "request" && (
        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium">Email</span>
            <input className="mt-1 w-full border rounded px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>
          <button className="bg-black text-white rounded px-4 py-2 disabled:opacity-50" disabled={busy || !email} onClick={requestCode}>Send code</button>
        </div>
      )}

      {step === "verify" && (
        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium">6-digit code</span>
            <input className="mt-1 w-full border rounded px-3 py-2" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0,6))} placeholder="123456" />
          </label>
          <div className="flex gap-2">
            <button className="bg-black text-white rounded px-4 py-2 disabled:opacity-50" disabled={busy || code.length !== 6} onClick={verifyCode}>Verify</button>
            <button className="rounded px-4 py-2 border" disabled={busy} onClick={() => setStep("request")}>Back</button>
          </div>
        </div>
      )}

      {step === "authed" && (
        <div className="space-y-4">
          <p>You're signed in. Enter your app user ID to request deletion.</p>
          <label className="block">
            <span className="block text-sm font-medium">User ID</span>
            <input className="mt-1 w-full border rounded px-3 py-2" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="e.g. user_123" />
          </label>
          <button className="bg-red-600 text-white rounded px-4 py-2 disabled:opacity-50" disabled={busy || !userId} onClick={deleteAccount}>Delete my account</button>
        </div>
      )}
    </main>
  );
}
