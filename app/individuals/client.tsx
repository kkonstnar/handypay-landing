"use client"

import { useState } from "react"
import Image from "next/image"
import Script from "next/script"
import { HeaderWaitlistModal } from "@/components/header-waitlist-modal"

// Structured data for individuals page
const individualsStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "HandyPay for Individuals",
  "description": "Get paid easily in Jamaica with QR codes and payment links. Perfect for freelancers, side hustles, and personal payments.",
  "provider": {
    "@type": "Organization",
    "name": "HandyPay",
    "url": "https://tryhandypay.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Jamaica"
  },
  "serviceType": "Personal Payment Solutions",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JMD",
    "description": "Free to sign up"
  },
  "featureList": [
    "QR Code Payments",
    "Payment Links",
    "Multi-Currency Support (JMD, USD)",
    "Fast Payouts",
    "Mobile Payments",
    "Bank-Grade Security"
  ]
}

export function IndividualsClient() {
  const [showModal, setShowModal] = useState(false)

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center px-4 py-12 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 heading">
              For Individuals
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Simple, secure payment solutions for freelancers, entrepreneurs, and anyone who needs to get paid.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image - Left */}
            <div className="flex justify-center order-2 md:order-1">
              <div className="bg-neutral-100 rounded-3xl aspect-square w-full max-w-[400px] relative overflow-hidden">
                <Image
                  src="/webp/generated teenagers.webp"
                  alt="Individual payments with HandyPay"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text Content - Right */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-medium mb-6 heading">
                Get Paid Your Way
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3AB75C] rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Easy Setup</h3>
                    <p className="text-neutral-600">
                      Get started in minutes with our simple mobile app - no complex setup required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3AB75C] rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Multiple Payment Methods</h3>
                    <p className="text-neutral-600">
                      Accept payments via QR codes, payment links, Cash App, PayPal, and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3AB75C] rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Instant Notifications</h3>
                    <p className="text-neutral-600">
                      Get real-time alerts when you receive payments so you always know your balance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3AB75C] rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Flexible Payouts</h3>
                    <p className="text-neutral-600">
                      Choose to receive payments to your bank account or Western Union for instant access.
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
          </div>
        </div>
      </section>

      <HeaderWaitlistModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <Script
        id="structured-data-individuals"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(individualsStructuredData) }}
      />
    </main>
  )
}
