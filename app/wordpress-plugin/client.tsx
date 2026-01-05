"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function WordPressPluginClient() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          source: "wordpress-plugin",
          product: "wordpress_plugin" 
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("You're on the list! We'll notify you when it's ready.");
      } else {
        const data = await response.json();
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#11AD30]/5 border border-[#11AD30]/20 rounded-2xl p-8">
        <div className="w-16 h-16 bg-[#11AD30] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">You&apos;re on the list!</h3>
        <p className="text-neutral-600">We&apos;ll email you as soon as the WordPress plugin is available.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-12 px-5 rounded-full"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="h-12 px-6 bg-[#11AD30] text-white font-medium rounded-full hover:bg-[#0e9428] transition-colors disabled:opacity-50"
        >
          {isLoading ? "..." : "Join Waitlist"}
        </button>
      </div>
      <p className="text-xs text-neutral-400 mt-3">
        Be the first to know when we launch. No spam, ever.
      </p>
    </form>
  );
}

