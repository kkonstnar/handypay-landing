"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetAppButton } from "@/components/get-app-button";
import posthog from "posthog-js";
import { trackGAEvent } from "@/lib/google-analytics";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/#pricing", label: "Pricing", event: "pricing" },
  { href: "/#countries", label: "Countries", event: "countries" },
  { href: "/faqs", label: "FAQs", event: "faqs" },
];

const productLinks = [
  { 
    href: "/app/download", 
    label: "Mobile App", 
    description: "Accept payments on the go",
    event: "mobile_app" 
  },
  { 
    href: "/website-payments", 
    label: "Website Payments", 
    description: "Embed checkout on your site",
    event: "website_payments",
    badge: "Coming Soon"
  },
  { 
    href: "/wordpress-plugin", 
    label: "WordPress Plugin", 
    description: "WooCommerce & Gutenberg blocks",
    event: "wordpress_plugin",
    badge: "Coming Soon"
  },
  { 
    href: "/developers", 
    label: "Developers", 
    description: "API & SDKs for any platform",
    event: "developers",
    badge: "Coming Soon"
  },
];

const socialLinks = [
  {
    href: "https://www.tiktok.com/@handypay",
    label: "TikTok",
    event: "tiktok",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
  },
  {
    href: "https://discord.gg/JcbAPzwR",
    label: "Discord",
    event: "discord",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
];

function ProductsDropdown({ isFloating = false }: { isFloating?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 hover:text-neutral-900 transition-colors ${isFloating ? "text-[14px]" : "text-[15px]"}`}
      >
        Products
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 pt-2 ${isFloating ? "left-1/2 -translate-x-1/2" : ""}`}>
          <div className="w-64 bg-white rounded-xl shadow-lg border border-neutral-200 py-2">
            {productLinks.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="block px-4 py-3 hover:bg-neutral-50 transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  const eventData = { link: product.event, location: isFloating ? "header_floating" : "header" };
                  posthog.capture("navigation_clicked", eventData);
                  trackGAEvent("navigation_clicked", eventData);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-900 text-sm">{product.label}</span>
                  {product.badge && (
                    <span className="text-[10px] font-medium text-[#11AD30] bg-[#11AD30]/10 px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Static Header - visible at top, hides instantly when scrolled */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 transition-all duration-300 ${
          isScrolled ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/handypay-full.svg" alt="HandyPay" width={110} height={28} />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[15px] text-neutral-600">
            <ProductsDropdown />
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-neutral-900 transition-colors"
                onClick={() => {
                  const eventData = { link: link.event, location: "header" };
                  posthog.capture("navigation_clicked", eventData);
                  trackGAEvent("navigation_clicked", eventData);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1 mr-2">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-400 hover:text-neutral-700 transition-colors"
                  aria-label={social.label}
                  onClick={() => {
                    const eventData = { platform: social.event, location: "header" };
                    posthog.capture("social_link_clicked", eventData);
                    trackGAEvent("social_link_clicked", eventData);
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <GetAppButton />
          </div>
        </div>
      </header>

      {/* Floating Pill Header - slides down on scroll */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4 transition-all duration-300 ease-out ${
          isScrolled 
            ? "translate-y-0 opacity-100" 
            : "-translate-y-[calc(100%+1rem)] opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl border border-neutral-200/60 rounded-full shadow-lg shadow-black/[0.04] px-5 py-2.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/handypay-full.svg" alt="HandyPay" width={100} height={26} />
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[14px] text-neutral-600">
            <ProductsDropdown isFloating />
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-neutral-900 transition-colors"
                onClick={() => {
                  const eventData = { link: link.event, location: "header_floating" };
                  posthog.capture("navigation_clicked", eventData);
                  trackGAEvent("navigation_clicked", eventData);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors"
                  aria-label={social.label}
                  onClick={() => {
                    const eventData = { platform: social.event, location: "header_floating" };
                    posthog.capture("social_link_clicked", eventData);
                    trackGAEvent("social_link_clicked", eventData);
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <GetAppButton variant="rounded" />
          </div>
        </div>
      </header>
    </>
  );
}
