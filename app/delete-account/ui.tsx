"use client";
import { useState } from "react";
import Image from "next/image";

export default function DeleteClient() {
  const [userId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const deleteAccount = async () => {
    const backend = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "https://handypay-backend.handypay.workers.dev").replace(/\/$/, "");
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    setBusy(true); setError(null); setSuccess(null);
    try {
      // Check backend session to get userId
      const sessionRes = await fetch(`${backend}/api/auth/session`, { credentials: "include" });
      if (!sessionRes.ok) throw new Error("Please sign in first with Google or Apple");
      const session = await sessionRes.json().catch(() => null);
      const id = session?.user?.id || session?.id || session?.userId || userId;
      if (!id) throw new Error("Could not determine your user ID from the session");
      const resp = await fetch(`${backend}/api/users/${encodeURIComponent(id)}`, { method: "DELETE", credentials: "include", headers: { "content-type": "application/json" } });
      if (!resp.ok) {
        let msg = "Failed to delete account";
        try { const d = await resp.json(); if (typeof d?.error === "string") msg = d.error; } catch {}
        throw new Error(msg);
      }
      setSuccess("Account deleted successfully.");
    } catch (e: unknown) {
      setError((e as Error)?.message || "Deletion failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-2">Delete Account</h1>
        <p className="text-center text-neutral-600 mb-6">Sign in to confirm it’s you, then request account deletion.</p>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-700 mb-4 text-center">{success}</p>}

        {/* OAuth shortcuts (uses backend OAuth endpoints) */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <button
            onClick={() => {
              const backend = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "https://handypay-backend.handypay.workers.dev").replace(/\/$/, "");
              const redirect = `${window.location.origin}/delete-account`;
              const url = `${backend}/api/auth/sign-in/google?redirect=${encodeURIComponent(redirect)}&returnTo=${encodeURIComponent(redirect)}&callbackUrl=${encodeURIComponent(redirect)}`;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className="border rounded px-4 py-2 flex items-center justify-center gap-2 hover:bg-neutral-50 cursor-pointer"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            <span>Continue with Google</span>
          </button>
          <button
            onClick={() => {
              const backend = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "https://handypay-backend.handypay.workers.dev").replace(/\/$/, "");
              const redirect = `${window.location.origin}/delete-account`;
              const url = `${backend}/api/auth/sign-in/apple?redirect=${encodeURIComponent(redirect)}&returnTo=${encodeURIComponent(redirect)}&callbackUrl=${encodeURIComponent(redirect)}`;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className="border rounded px-4 py-2 flex items-center justify-center gap-2 hover:bg-neutral-50 cursor-pointer"
          >
            <Image src="/apple.svg" alt="Apple" width={20} height={20} />
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-red-600 text-white rounded px-4 py-2 disabled:opacity-50" disabled={busy} onClick={deleteAccount}>Delete my account</button>
          <p className="text-xs text-neutral-500 text-center">You must sign in first so we can verify your identity.</p>
        </div>
      </div>
    </main>
  );
}
