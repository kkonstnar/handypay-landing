import type { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import { IndividualsClient } from "./client"

export const metadata: Metadata = {
  title: "HandyPay for Individuals - Get Paid with QR Codes | Jamaica",
  description: "Get paid easily in Jamaica with HandyPay. Create QR codes and payment links for your freelance work, side hustle, or personal payments. Receive money in JMD or USD.",
  keywords: [
    "HandyPay individuals",
    "personal payments Jamaica",
    "freelance payments Jamaica",
    "QR code payments Jamaica",
    "payment links Jamaica",
    "get paid Jamaica",
    "receive money Jamaica",
    "Jamaican payments",
    "freelancer Jamaica",
    "side hustle payments",
    "personal banking Jamaica",
    "mobile payments Jamaica",
    "digital payments Jamaica"
  ],
  openGraph: {
    title: "HandyPay for Individuals - Get Paid Easily in Jamaica",
    description: "Create QR codes and payment links to get paid for your freelance work or side hustle. Receive money in JMD or USD. Free to sign up.",
    type: "website",
    images: [
      {
        url: "/generated teenagers.png",
        width: 1200,
        height: 630,
        alt: "HandyPay individual payments - Get paid with QR codes in Jamaica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HandyPay for Individuals - Get Paid Easily in Jamaica",
    description: "Create QR codes and payment links to get paid for your freelance work or side hustle. Receive money in JMD or USD.",
    images: ["/generated teenagers.png"],
  },
}

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

export default function IndividualsPage() {
  return <IndividualsClient />
}
