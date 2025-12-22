import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { GoogleAnalyticsProvider } from "@/components/providers/google-analytics-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

// Use Manrope Variable Font for both heading and body
const manropeHeading = localFont({ 
  src: "../public/fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-heading",
  display: "swap",
});

const manropeBody = localFont({ 
  src: "../public/fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tryhandypay.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HandyPay - Accept Card Payments with Payment Links in Jamaica",
    template: "%s | HandyPay"
  },
  description: "Accept card payments with payment links in Jamaica. Get paid directly to your bank account or Western Union in 2 business days. Free to download, ~5% per transaction.",
  keywords: [
    "HandyPay",
    "QR code payments",
    "payment links",
    "Jamaica payments",
    "digital payments Jamaica",
    "accept card payments",
    "mobile payments Jamaica",
    "Jamaican bank account",
    "Western Union Jamaica",
    "payment app Jamaica",
    "QR code Jamaica",
    "online payments Jamaica",
    "small business payments",
    "merchant payments Jamaica",
    "contactless payments",
    "payment processing Jamaica",
    "mobile wallet Jamaica",
    "card reader Jamaica",
    "point of sale Jamaica",
    "POS system Jamaica",
    "payment gateway Jamaica",
    "fintech Jamaica",
    "digital wallet Jamaica",
    "accept payments online Jamaica",
    "payment solutions Jamaica",
    "remittance",
    "remittance Jamaica",
    "money transfer Jamaica",
    "send money Jamaica",
    "receive money Jamaica",
    "remittance services Jamaica",
    "international money transfer Jamaica",
    "remittance app Jamaica",
    "digital remittance Jamaica"
  ],
  authors: [{ name: "HandyPay" }],
  creator: "HandyPay",
  publisher: "HandyPay",
  applicationName: "HandyPay",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_JM",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "HandyPay",
    title: "HandyPay - Accept Card Payments with Payment Links in Jamaica",
    description: "Accept card payments with payment links in Jamaica. Get paid directly to your bank account or Western Union in 2 business days. Free to download, ~5% per transaction.",
    images: [
      {
        url: `${siteUrl}/handypay-full.svg`,
        width: 1200,
        height: 630,
        alt: "HandyPay - Accept card payments with payment links in Jamaica",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HandyPay - Accept Card Payments with Payment Links in Jamaica",
    description: "Accept card payments with payment links in Jamaica. Get paid directly to your bank account or Western Union in 2 business days. Free to download, ~5% per transaction.",
    images: [`${siteUrl}/handypay-full.svg`],
    creator: "@handypay",
    site: "@handypay",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-JM": siteUrl,
      "en-US": siteUrl,
    },
  },
  category: "Finance",
  classification: "Payment Processing",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HandyPay",
  },
  other: {
    "geo.region": "JM",
    "geo.placename": "Jamaica",
    "geo.position": "18.1096;-77.2975",
    "ICBM": "18.1096, -77.2975",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light",
  themeColor: "#1a472a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HandyPay",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JMD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.75",
      "ratingCount": "100",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": "HandyPay makes it easy for anyone in Jamaica to accept digital payments with QR codes and payment links, directly to their Jamaican bank account or Western Union. Accept remittances and money transfers.",
    "url": siteUrl,
    "downloadUrl": [
      "https://apps.apple.com/jm/app/handypay/id6751820310",
      "https://play.google.com/store/apps/details?id=com.handypay.mobile&hl=en"
    ],
    "screenshot": `${siteUrl}/iphone-mockup.svg`,
    "featureList": [
      "QR Code Payments",
      "Payment Links",
      "Fast Payouts to Jamaican Bank Account",
      "Western Union Payouts",
      "Remittance Services",
      "Money Transfer",
      "Multi-Currency Support (USD, JMD)",
      "Donations"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Jamaica"
    },
    "availableLanguage": {
      "@type": "Language",
      "name": "English"
    }
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HandyPay",
    "legalName": "HandyPay",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/handypay-full.svg`,
      "width": 300,
      "height": 80
    },
    "description": "HandyPay makes it easy for anyone in Jamaica to accept digital payments with QR codes and payment links, directly to their Jamaican bank account or Western Union. Accept remittances and money transfers.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "JM",
      "addressRegion": "Jamaica"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": "JM",
      "availableLanguage": ["English"]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Jamaica"
    },
    "sameAs": [
      "https://www.instagram.com/handypayapp",
      "https://www.tiktok.com/@handypay",
      "https://discord.gg/handypay"
    ],
    "knowsAbout": [
      "Payment Processing",
      "QR Code Payments",
      "Mobile Payments",
      "Digital Payments",
      "Financial Technology"
    ]
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HandyPay",
    "url": siteUrl,
    "description": "HandyPay - Accept card payments with QR codes and payment links in Jamaica",
    "publisher": {
      "@type": "Organization",
      "name": "HandyPay"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-JM"
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      }
    ]
  };

  return (
    <html lang="en-JM" className="bg-[#1a472a]">
      <body className={`${manropeHeading.variable} ${manropeBody.variable} antialiased bg-white text-black`}>
        <Script
          id="structured-data-app"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          id="structured-data-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <Script
          id="structured-data-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <Script
          id="structured-data-breadcrumb"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17763251868"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17763251868');
            `,
          }}
        />
        <GoogleAnalyticsProvider>
          <PostHogProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <Toaster />
            <Analytics />
          </PostHogProvider>
        </GoogleAnalyticsProvider>
      </body>
    </html>
  );
}
