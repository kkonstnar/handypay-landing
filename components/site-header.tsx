"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GetAppButton } from "@/components/get-app-button";
import { HeaderWaitlistModal } from "@/components/header-waitlist-modal";
import posthog from "posthog-js";
import { trackGAEvent } from "@/lib/google-analytics";

export function SiteHeader() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-white/95 backdrop-blur-sm border-b border-neutral-200 transition-all duration-300">
      <div className="max-w-5xl lg:max-w-4xl xl:max-w-3xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/handypay-full.svg" alt="HandyPay" width={120} height={32} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-neutral-700">
          <button
            className="hover:text-black transition-colors"
            onClick={() => {
              setShowWaitlistModal(true);
              const eventData = { link: "join_waitlist", location: "header" };
              posthog.capture("navigation_clicked", eventData);
              trackGAEvent("navigation_clicked", eventData);
            }}
          >
            Join Waitlist
          </button>
          <a 
            href="#testimonials" 
            className="hover:text-black"
            onClick={() => {
              const eventData = { link: "testimonials", location: "header" };
              posthog.capture("navigation_clicked", eventData);
              trackGAEvent("navigation_clicked", eventData);
            }}
          >
            Testimonials
          </a>
          <a 
            href="https://www.tiktok.com/@handypay" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-black transition-colors cursor-pointer"
            aria-label="TikTok"
            onClick={() => {
              const eventData = { platform: "tiktok", location: "header" };
              posthog.capture("social_link_clicked", eventData);
              trackGAEvent("social_link_clicked", eventData);
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <GetAppButton />
        </div>
      </div>

      <HeaderWaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
      />
    </header>
  );
}
