import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { countries, getCountryBySlug } from "@/lib/countries-data";
import { CountryPageClient } from "./client";
import { FlagImage } from "@/components/flag-image";
import { HowItWorks } from "./how-it-works";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tryhandypay.com";

export async function generateStaticParams() {
  return countries.map((country) => ({
    slug: country.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  
  if (!country) {
    return {
      title: "Country Not Found - HandyPay",
    };
  }

  return {
    title: `${country.headline} | HandyPay`,
    description: country.metaDescription,
    keywords: [
      `accept card payments ${country.name}`,
      `payment links ${country.name}`,
      `QR code payments ${country.name}`,
      `${country.currencyCode} payments`,
      `receive payments ${country.name}`,
      `digital payments ${country.name}`,
      `mobile payments ${country.name}`,
      `payment app ${country.name}`,
    ],
    openGraph: {
      title: `${country.headline} | HandyPay`,
      description: country.metaDescription,
      url: `${siteUrl}/countries/${country.slug}`,
      siteName: "HandyPay",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${country.headline} | HandyPay`,
      description: country.metaDescription,
    },
    alternates: {
      canonical: `${siteUrl}/countries/${country.slug}`,
    },
  };
}

export default async function CountryPage({ params }: PageProps) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  // Get other countries for "Also available in" section
  const otherCountries = countries
    .filter((c) => c.slug !== slug)
    .slice(0, 6);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `HandyPay - ${country.headline}`,
    "description": country.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "HandyPay",
      "url": siteUrl,
      "logo": `${siteUrl}/handypay.svg`
    },
    "areaServed": {
      "@type": "Country",
      "name": country.name
    },
    "serviceType": "Payment Processing",
    "offers": {
      "@type": "Offer",
      "price": "4.9",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "4.9",
        "priceCurrency": "USD",
        "unitText": "percent per transaction + $0.40"
      }
    },
    "url": `${siteUrl}/countries/${country.slug}`
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Countries",
        "item": `${siteUrl}/countries`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": country.name,
        "item": `${siteUrl}/countries/${country.slug}`
      }
    ]
  };

  return (
    <>
      <Script
        id="country-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Breadcrumb - minimal */}
          <nav className="flex items-center gap-1.5 text-sm text-neutral-400 mb-8">
            <Link href="/countries" className="hover:text-neutral-600 transition-colors">
              Countries
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-neutral-600">{country.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FlagImage 
                  countryCode={country.countryCode} 
                  countryName={country.name} 
                  size="xl"
                  className="rounded-md shadow-md"
                />
                <span className="px-3 py-1 bg-[#11AD30]/10 text-[#11AD30] text-sm font-medium rounded-full">
                  {country.region}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-6">
                {country.headline}
              </h1>
              
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {country.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
                  <span className="text-sm font-medium text-neutral-900">{country.currencyCode}</span>
                  <span className="text-sm text-neutral-500">{country.currency}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
                  <span className="text-sm text-neutral-500">Payout:</span>
                  <span className="text-sm font-medium text-neutral-900">{country.payoutTime}</span>
                </div>
              </div>

              <CountryPageClient />
            </div>

            {/* Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <Image
                      src="/webp/happy-man.webp"
                      alt="Entrepreneur using HandyPay"
                      width={300}
                      height={375}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <Image
                      src="/webp/woman with phone.webp"
                      alt="Business owner accepting payments"
                      width={300}
                      height={375}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                    </div>
              
              {/* Floating currency badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-neutral-100 px-5 py-3 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900">{country.currencyCode}</div>
                  <div className="text-xs text-neutral-500">Currency</div>
                </div>
                <div className="w-px h-10 bg-neutral-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#11AD30]">{country.payoutTime.split(' ')[0]}</div>
                  <div className="text-xs text-neutral-500">Day payout</div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#11AD30]/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Local Context Section */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto max-w-5xl px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-6">
              Why HandyPay for {country.name}?
            </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-10">
              {country.localContext}
            </p>
            
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <div className="text-3xl font-bold text-[#11AD30] mb-2">4.9%</div>
                <div className="text-sm text-neutral-500">+ 40¢ per transaction</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <div className="text-3xl font-bold text-neutral-900 mb-2">{country.payoutTime}</div>
                <div className="text-sm text-neutral-500">Payout time</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <div className="text-3xl font-bold text-neutral-900 mb-2">$0</div>
                <div className="text-sm text-neutral-500">Monthly fees</div>
              </div>
            </div>

          {/* Powerful Features - Simple List */}
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-3">
            {[
              "Payment links for any amount",
              "QR codes up to $9M per transaction",
              "Donation links — customers choose amount",
              "Visa, Mastercard, Amex, Apple Pay, Google Pay",
              "Bank-level security with Face ID & Touch ID",
              "Real-time payment tracking",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <svg className="w-5 h-5 text-[#11AD30] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks 
        countryName={country.name}
        currencyCode={country.currencyCode}
        payoutTime={country.payoutTime}
      />

      {/* Other Countries */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-8">
            Also available in
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherCountries.map((c) => (
              <Link
                key={c.slug}
                href={`/countries/${c.slug}`}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-[#11AD30] hover:shadow-sm transition-all"
              >
                <FlagImage 
                  countryCode={c.countryCode} 
                  countryName={c.name} 
                  size="md"
                />
                <span className="text-sm font-medium text-neutral-700 truncate">{c.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/countries"
              className="text-[#11AD30] font-medium hover:underline"
            >
              View all 17 countries →
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}

