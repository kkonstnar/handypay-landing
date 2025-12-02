import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Supported Countries - HandyPay",
  description: "HandyPay supports payouts to 17 countries across the Caribbean, Africa, and North America. See the full list of supported countries.",
}

const countries = {
  "North America": ["United States", "Canada"],
  "Caribbean": ["Jamaica", "Trinidad & Tobago", "St. Lucia", "Antigua & Barbuda", "Bahamas", "Dominican Republic", "Guyana"],
  "Africa": ["Ghana", "Nigeria", "Gambia", "Namibia", "Tanzania", "Mauritius", "Mozambique"],
  "Asia": ["Bangladesh"],
}

export default function CountriesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link 
            href="/#countries" 
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-black mb-8 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-medium mb-6 heading">
            Supported Countries
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed">
            HandyPay supports payouts to 17 countries. Receive payments directly to your local bank account.
          </p>
        </div>
      </section>

      {/* Countries List */}
      <section className="pb-32 px-4">
        <div className="container mx-auto max-w-3xl">
          {Object.entries(countries).map(([region, countryList]) => (
            <div key={region} className="mb-10">
              <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                {region}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {countryList.map((country) => (
                  <span key={country} className="text-neutral-800">
                    {country}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Coming Soon Note */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-neutral-500 text-sm">
              More countries coming soon. If your country isn&apos;t listed, let us know at{" "}
              <a href="mailto:support@tryhandypay.com" className="text-[#11AD30] hover:underline">
                support@tryhandypay.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
