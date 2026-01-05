import type { Metadata } from "next";
import Link from "next/link";
import { WebsitePaymentsClient } from "./client";

export const metadata: Metadata = {
  title: "Accept Payments on Your Website | HandyPay",
  description: "Add HandyPay to your website and accept card payments online. Coming soon with WordPress plugin, embeddable checkout, and payment buttons.",
};

export default function WebsitePaymentsPage() {
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

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-6">
            Accept payments on your website
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Add HandyPay to your website with just a few clicks. Embed checkout forms, payment buttons, and accept cards from customers worldwide.
          </p>

          {/* Features Preview */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <div className="w-12 h-12 bg-[#11AD30]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#11AD30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Embeddable Checkout</h3>
              <p className="text-sm text-neutral-500">Add a payment form to any page with a simple embed code</p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <div className="w-12 h-12 bg-[#11AD30]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#11AD30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Payment Links</h3>
              <p className="text-sm text-neutral-500">Generate shareable payment links for any product or service</p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <div className="w-12 h-12 bg-[#11AD30]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#11AD30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h2m10 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">QR Code Widgets</h3>
              <p className="text-sm text-neutral-500">Display QR codes on your site for quick scan-to-pay</p>
            </div>
          </div>

          {/* Waitlist Form */}
          <WebsitePaymentsClient />

          {/* WordPress Plugin Link */}
          <p className="mt-8 text-sm text-neutral-500">
            Using WordPress?{" "}
            <Link href="/wordpress-plugin" className="text-[#11AD30] hover:underline font-medium">
              Join the WordPress plugin waitlist →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

