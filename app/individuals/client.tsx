"use client"

import Image from "next/image"
import Script from "next/script"
import { Check } from "lucide-react"

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

const IOS_APP_URL = "https://apps.apple.com/jm/app/handypay/id6751820310"

export function IndividualsClient() {
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
                  <div className="flex-shrink-0 w-6 h-6 bg-[#11AD30] rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Easy Setup</h3>
                    <p className="text-neutral-600">
                      Get started in seconds with our simple mobile app - no complex setup required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#11AD30] rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Multiple Payment Methods</h3>
                    <p className="text-neutral-600">
                      Accept payments via QR codes, payment links, Cash App, PayPal, and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#11AD30] rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Instant Notifications</h3>
                    <p className="text-neutral-600">
                      Get real-time alerts when you receive payments so you always know your balance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#11AD30] rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Flexible Payouts</h3>
                    <p className="text-neutral-600">
                      Choose to receive payments to your bank account or Western Union for instant access.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <a
                  href={IOS_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full font-medium text-sm hover:bg-neutral-800 transition-colors"
                >
                  <Image
                    src="/apple.svg"
                    alt="Apple"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] invert"
                  />
                  <span>Download on App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.handypay.mobile&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-full text-sm hover:bg-neutral-50 transition-colors"
                >
                  <Image
                    src="/webp/google-play-icon.webp"
                    alt="Google Play Store"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span>Get it on Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script
        id="structured-data-individuals"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(individualsStructuredData) }}
      />
    </main>
  )
}
