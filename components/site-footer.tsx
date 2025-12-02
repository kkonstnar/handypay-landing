"use client";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import posthog from "posthog-js";
import { trackGAEvent } from "@/lib/google-analytics";

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#1a472a] text-white overflow-hidden relative">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Logo & Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer mb-4"
              onClick={() => {
                const eventData = { location: "footer" };
                posthog.capture("logo_clicked", eventData);
                trackGAEvent("logo_clicked", eventData);
              }}
            >
              <Image src="/handypay.svg" alt="HandyPay" width={28} height={28} style={{ filter: 'brightness(0) invert(1)' }} />
              <span className="font-semibold text-lg">HandyPay</span>
            </Link>
            <p className="text-sm text-white/60 mb-6">
              Accept payments anywhere.<br />
              Get paid to your bank.
            </p>
            <p className="text-xs text-white/40">© {new Date().getFullYear()} HandyPay</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-medium text-sm text-white/80 mb-4 uppercase tracking-wider">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/businesses"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                  onClick={() => {
                    const eventData = { link: "businesses" };
                    posthog.capture("footer_link_clicked", eventData);
                    trackGAEvent("footer_link_clicked", eventData);
                  }}
                >
                  For Businesses
                </Link>
              </li>
              <li>
                <Link
                  href="/individuals"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                  onClick={() => {
                    const eventData = { link: "individuals" };
                    posthog.capture("footer_link_clicked", eventData);
                    trackGAEvent("footer_link_clicked", eventData);
                  }}
                >
                  For Individuals
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                  onClick={() => {
                    const eventData = { link: "faqs" };
                    posthog.capture("footer_link_clicked", eventData);
                    trackGAEvent("footer_link_clicked", eventData);
                  }}
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-sm text-white/80 mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                  onClick={() => {
                    const eventData = { link: "about" };
                    posthog.capture("footer_link_clicked", eventData);
                    trackGAEvent("footer_link_clicked", eventData);
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                  onClick={() => {
                    const eventData = { link: "contact" };
                    posthog.capture("footer_link_clicked", eventData);
                    trackGAEvent("footer_link_clicked", eventData);
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-sm text-white/80 mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                  onClick={() => {
                    const eventData = { link: "terms" };
                    posthog.capture("footer_link_clicked", eventData);
                    trackGAEvent("footer_link_clicked", eventData);
                  }}
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                  onClick={() => {
                    const eventData = { link: "privacy" };
                    posthog.capture("footer_link_clicked", eventData);
                    trackGAEvent("footer_link_clicked", eventData);
                  }}
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="font-medium text-sm text-white/80 mb-4 uppercase tracking-wider">Social</h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/handypayapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Instagram"
                onClick={() => {
                  const eventData = { platform: "instagram", location: "footer" };
                  posthog.capture("social_link_clicked", eventData);
                  trackGAEvent("social_link_clicked", eventData);
                }}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@handypay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="TikTok"
                onClick={() => {
                  const eventData = { platform: "tiktok", location: "footer" };
                  posthog.capture("social_link_clicked", eventData);
                  trackGAEvent("social_link_clicked", eventData);
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://discord.gg/handypay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Discord"
                onClick={() => {
                  const eventData = { platform: "discord", location: "footer" };
                  posthog.capture("social_link_clicked", eventData);
                  trackGAEvent("social_link_clicked", eventData);
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.007-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-white/70 text-sm leading-relaxed">
            HandyPay was created to empower entrepreneurs and businesses across Jamaica and the Caribbean. 
            Our mission is to remove the financial barriers that hold people back, making it simple for anyone 
            to accept payments and get paid — quickly, securely, and without friction.
          </p>
        </div>
      </div>

      {/* Large Translucent Logo */}
      <div className="relative w-full overflow-hidden">
        <div className="text-[20vw] md:text-[18vw] font-bold text-white/[0.06] whitespace-nowrap text-center leading-none select-none pointer-events-none -mb-[4vw]">
          HandyPay
        </div>
      </div>
    </footer>
  );
}
