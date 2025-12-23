"use client";
import Image from "next/image";
import Link from "next/link";
import { GetAppButton } from "@/components/get-app-button";
import posthog from "posthog-js";
import { trackGAEvent } from "@/lib/google-analytics";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-white/95 backdrop-blur-sm border-b border-neutral-200 transition-all duration-300">
      <div className="max-w-5xl lg:max-w-4xl xl:max-w-3xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/handypay-full.svg" alt="HandyPay" width={120} height={32} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-neutral-700">
          <a 
            href="#pricing" 
            className="hover:text-black transition-colors font-medium"
            onClick={() => {
              const eventData = { link: "pricing", location: "header" };
              posthog.capture("navigation_clicked", eventData);
              trackGAEvent("navigation_clicked", eventData);
            }}
          >
            Pricing
          </a>
          <a 
            href="#countries" 
            className="hover:text-black transition-colors"
            onClick={() => {
              const eventData = { link: "countries", location: "header" };
              posthog.capture("navigation_clicked", eventData);
              trackGAEvent("navigation_clicked", eventData);
            }}
          >
            Countries
          </a>
          <a 
            href="#testimonials" 
            className="hover:text-black transition-colors"
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
          <a 
            href="https://discord.gg/JcbAPzwR" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-black transition-colors cursor-pointer"
            aria-label="Discord"
            onClick={() => {
              const eventData = { platform: "discord", location: "header" };
              posthog.capture("social_link_clicked", eventData);
              trackGAEvent("social_link_clicked", eventData);
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <GetAppButton />
        </div>
      </div>
    </header>
  );
}
