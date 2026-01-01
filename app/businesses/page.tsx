import type { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import { BusinessesClient } from "./client"

export const metadata: Metadata = {
  title: "HandyPay for Businesses - Accept Payments with QR Codes | Jamaica",
  description: "Scale your Jamaican business with HandyPay. Accept card payments, QR codes, and payment links. Get paid within 2 business days to your bank account. No setup fees, multi-currency support.",
  keywords: [
    "HandyPay business",
    "QR code payments Jamaica",
    "payment links Jamaica",
    "accept card payments Jamaica",
    "business payments Jamaica",
    "merchant payments Jamaica",
    "Jamaican business payments",
    "payment processing Jamaica",
    "multi-currency payments Jamaica",
    "JMD USD payments",
    "business banking Jamaica",
    "payment solutions Jamaica",
    "digital payments Jamaica"
  ],
  openGraph: {
    title: "HandyPay for Businesses - Scale Your Payments in Jamaica",
    description: "Accept payments your way with QR codes and payment links. Get paid to your Jamaican bank account in 2 business days. Free to sign up.",
    type: "website",
    images: [
      {
        url: "/webp/black man busines.webp",
        width: 1200,
        height: 630,
        alt: "HandyPay business payments - Accept QR codes and payment links in Jamaica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HandyPay for Businesses - Scale Your Payments in Jamaica",
    description: "Accept payments your way with QR codes and payment links. Get paid to your Jamaican bank account in 2 business days.",
    images: ["/webp/black man busines.webp"],
  },
}

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

export default function BusinessesPage() {
  return <BusinessesClient />
}
