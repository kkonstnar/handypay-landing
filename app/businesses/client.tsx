"use client"

import { useState } from "react"
import Image from "next/image"
import Script from "next/script"
import { HeaderWaitlistModal } from "@/components/header-waitlist-modal"

// Structured data for business page
const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "HandyPay for Businesses",
  "description": "Scale your Jamaican business with QR code payments and payment links. Get paid within 2 business days to your bank account.",
  "provider": {
    "@type": "Organization",
    "name": "HandyPay",
    "url": "https://tryhandypay.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Jamaica"
  },
  "serviceType": "Payment Processing",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JMD",
    "description": "Free to sign up, no setup fees"
  },
  "featureList": [
    "QR Code Payments",
    "Payment Links",
    "Multi-Currency Support (JMD, USD)",
    "Fast Payouts (2 business days)",
    "Real-time Analytics",
    "Bank-Grade Security"
  ]
}

export function BusinessesClient() {
  const [showModal, setShowModal] = useState(false)

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center px-4 py-12 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 heading">
              For Businesses
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Everything your business needs to accept payments seamlessly and grow your revenue with HandyPay.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left */}
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6 heading">
                Scale Your Business with Modern Payments
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3AB75C] rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">No Setup Fees</h3>
                    <p className="text-neutral-600">
                      Start accepting payments immediately without any upfront costs or hidden fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3AB75C] rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Fast Payouts</h3>
                    <p className="text-neutral-600">
                      Get paid within 2 business days directly to your Jamaican bank account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3AB75C] rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Multi-Currency Support</h3>
                    <p className="text-neutral-600">
                      Accept payments in both USD and JMD to serve international and local customers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3AB75C] rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Real-Time Analytics</h3>
                    <p className="text-neutral-600">
                      Track your sales, monitor payment trends, and optimize your business performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-white text-black border-1 border-black px-8 py-3 rounded-full font-medium hover:bg-neutral-50 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            </div>

            {/* Image - Right */}
            <div className="flex justify-center">
              <div className="bg-neutral-100 rounded-3xl aspect-square w-full max-w-[400px] relative overflow-hidden">
                <Image
                  src="/webp/black man busines.webp"
                  alt="Business payments with HandyPay"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HeaderWaitlistModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <Script
        id="structured-data-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessStructuredData) }}
      />
    </main>
  )
}
