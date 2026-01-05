import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WordPressPluginClient } from "./client";

export const metadata: Metadata = {
  title: "WordPress Plugin | HandyPay",
  description: "Accept HandyPay payments on your WordPress site. Install our plugin to add payment buttons, checkout forms, and QR codes. Coming soon.",
};

export default function WordPressPluginPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#11AD30]/10 text-[#11AD30] rounded-full text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#11AD30] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#11AD30]"></span>
            </span>
            Coming Soon
          </div>

          {/* WordPress Logo */}
          <div className="w-20 h-20 mx-auto mb-8">
            <Image 
              src="/wordpress.svg" 
              alt="WordPress" 
              width={80} 
              height={80}
              className="w-full h-full"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-6">
            HandyPay for WordPress
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Install our WordPress plugin to accept payments directly on your site. Works with WooCommerce, Elementor, and any WordPress theme.
          </p>

          {/* Features Preview */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12 text-left">
            <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="w-10 h-10 bg-[#11AD30]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#11AD30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Gutenberg Blocks</h3>
                <p className="text-sm text-neutral-500">Drag and drop payment buttons and forms</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="w-10 h-10 bg-[#11AD30]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#11AD30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">WooCommerce Ready</h3>
                <p className="text-sm text-neutral-500">Accept HandyPay as a payment method at checkout</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="w-10 h-10 bg-[#11AD30]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#11AD30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Shortcodes</h3>
                <p className="text-sm text-neutral-500">Add payments anywhere with simple shortcodes</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="w-10 h-10 bg-[#11AD30]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#11AD30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Easy Setup</h3>
                <p className="text-sm text-neutral-500">Connect your HandyPay account in one click</p>
              </div>
            </div>
          </div>

          {/* Waitlist Form */}
          <WordPressPluginClient />

          {/* Other options */}
          <p className="mt-8 text-sm text-neutral-500">
            Not using WordPress?{" "}
            <Link href="/website-payments" className="text-[#11AD30] hover:underline font-medium">
              See all website integration options →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

