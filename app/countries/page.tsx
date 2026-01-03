import type { Metadata } from "next";
import Link from "next/link";
import { getCountriesByRegion } from "@/lib/countries-data";
import { FlagImage } from "@/components/flag-image";

export const metadata: Metadata = {
  title: "Supported Countries - Accept Card Payments Worldwide | HandyPay",
  description: "HandyPay supports payouts to 17 countries across the Caribbean, Africa, and North America. Accept card payments and get paid to your local bank account.",
  keywords: [
    "accept card payments Caribbean",
    "accept card payments Africa",
    "payment links Jamaica",
    "payment links Nigeria",
    "QR code payments Caribbean",
    "international payment app",
    "receive payments locally",
  ],
};

export default function CountriesPage() {
  const countriesByRegion = getCountriesByRegion();
  const regionOrder = ["Caribbean", "Africa", "North America", "Asia"];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-6 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto max-w-5xl">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-black mb-8 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight text-neutral-900">
            Accept Payments in 17 Countries
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl">
            HandyPay supports payouts to your local bank account across the Caribbean, Africa, and North America. Click on your country to learn more.
          </p>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          {regionOrder.map((region) => {
            const regionCountries = countriesByRegion[region];
            if (!regionCountries) return null;
            
            return (
              <div key={region} className="mb-16 last:mb-0">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-6">
                  {region}
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {regionCountries.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/countries/${country.slug}`}
                      className="group flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-xl hover:border-[#11AD30] hover:shadow-md transition-all"
                    >
                      <FlagImage 
                        countryCode={country.countryCode} 
                        countryName={country.name} 
                        size="lg"
                      />
                      <div>
                        <div className="font-medium text-neutral-900 group-hover:text-[#11AD30] transition-colors">
                          {country.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {country.currencyCode}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Coming Soon Note */}
          <div className="mt-16 pt-8 border-t border-neutral-200">
            <p className="text-neutral-500">
              More countries coming soon. If your country isn&apos;t listed, let us know at{" "}
              <a href="mailto:support@tryhandypay.com" className="text-[#11AD30] hover:underline">
                support@tryhandypay.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Ready to accept payments?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Download HandyPay and start accepting card payments today. Free to download, no monthly fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://apps.apple.com/jm/app/handypay/id6751820310"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-colors"
            >
              Download on App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.handypay.mobile&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20"
            >
              Get it on Google Play
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
