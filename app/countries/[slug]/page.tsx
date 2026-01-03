import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { countries, getCountryBySlug } from "@/lib/countries-data";
import { CountryPageClient } from "./client";
import { FlagImage } from "@/components/flag-image";

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
        {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto max-w-5xl px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/countries" className="hover:text-neutral-900 transition-colors">
              Countries
            </Link>
            <span>/</span>
            <span className="text-neutral-900">{country.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-5xl">
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

            {/* Features Card */}
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                What you get in {country.name}
              </h2>
              <ul className="space-y-4">
                {country.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#11AD30]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#11AD30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h3 className="text-sm font-medium text-neutral-500 mb-3">Payout Methods</h3>
                <div className="flex flex-wrap gap-2">
                  {country.payoutMethods.map((method, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Context Section */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-6">
              Why HandyPay for {country.name}?
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              {country.localContext}
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6">
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
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-12 text-center">
            How to accept payments in {country.name}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Download the app",
                description: "Get HandyPay free from the App Store or Google Play. Sign up in minutes."
              },
              {
                step: "2",
                title: "Create a payment link",
                description: "Generate a QR code or payment link for any amount. Share via WhatsApp, SMS, or email."
              },
              {
                step: "3",
                title: `Get paid in ${country.currencyCode}`,
                description: `Receive funds directly to your ${country.name} bank account in ${country.payoutTime}.`
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-[#11AD30] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

