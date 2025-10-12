import Image from "next/image";
import { Landmark } from "lucide-react";
import { AppleHelloEnglishEffect } from "@/components/ui/shadcn-io/apple-hello-effect";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex items-end px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mt-12 md:mt-16 mb-4">
            <AppleHelloEnglishEffect className="mb-2 mx-auto h-8 md:h-10 text-black" speed={1.2} />
            <h1 className="text-5xl md:text-6xl font-medium mb-6 heading">
              Accept Card Payments
              <br />
              with your phone.
            </h1>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
              HandyPay makes it easy for small businesses to accept digital payments with QR codes, payment links, directly to your Jamaican bank account or Western Union.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-sm text-neutral-600">Partnered with</span>
              <Image src="/stripe.svg" alt="Stripe" width={64} height={24} />
            </div>
          </div>
          <div className="flex justify-center relative -mt-2 md:-mt-4" style={{height: 460}}>
            <Image src="/iphone-mockup.svg" alt="iPhone" width={300} height={560} priority />
            <div className="absolute top-38">
              <Image src="/qr-icon.svg" alt="QR Code" width={140} height={140} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 heading">Features</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 relative">
                  <Image src="/home-tab.svg" alt="QR" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-semibold">QR Code Payments</h3>
              </div>
              <p className="text-neutral-600">
                Generate a QR code and let customers pay instantly with their phone
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 relative">
                  <Image src="/payment-link-green.svg" alt="Payment Link" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-semibold">Payment Links</h3>
              </div>
              <p className="text-neutral-600">
                Share a link via WhatsApp, SMS, or social media to collect payments
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Landmark className="w-8 h-8 text-[#3AB75C]" />
                <h3 className="text-xl font-semibold">Fast Payouts</h3>
              </div>
              <p className="text-neutral-600">
                Get paid to your Jamaican bank account or Western Union in 2-5 days
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="text-center mb-12">
            <p className="text-sm text-neutral-600 mb-4">All major payment methods accepted</p>
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-16 h-10 relative">
                  <Image src={`/payment-${i + 1}.svg`} alt={`Payment method ${i + 1}`} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Removed benefits card per request */}
        </div>
      </section>
    </div>
  );
}
