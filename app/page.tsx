"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Landmark } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { useState, useEffect } from "react";

export default function Home() {
  const [amount, setAmount] = useState(7250.0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prev) => prev + Math.random() * 100 - 50);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex items-end px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mt-12 md:mt-16 mb-4">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-medium mb-6 heading"
            >
              Accept Card Payments
              <br />
              with your phone.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base text-neutral-600 max-w-2xl mx-auto"
            >
              HandyPay makes it easy for anyone to accept digital payments with QR codes and payment links, directly to their <strong>Jamaican bank account</strong> or <strong>Western Union</strong>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center justify-center gap-3 mt-4"
            >
              <span className="text-sm text-neutral-600">Partnered with</span>
              <Image src="/stripe.svg" alt="Stripe" width={54} height={20} /> <span className="text-sm text-neutral-600">&</span>
              <Image src="/wulogo.png" alt="Western Union" width={54} height={20} />
            </motion.div>
          </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center relative -mt-2 md:-mt-4"
              style={{height: 460}}
            >
            <Image src="/iphone-mockup.svg" alt="iPhone" width={300} height={560} priority />
            <div className="absolute top-24 md:top-38">
              <Image src="/qr-icon.svg" alt="QR Code" width={140} height={140} />
            </div>
            <div className="absolute top-64 md:top-80 left-1/2 -translate-x-1/2 text-xl font-semibold text-black">
              <NumberFlow
                value={amount}
                format={{ style: "currency", currency: "JMD", minimumFractionDigits: 2 }}
                className="font-mono"
              />
            </div>
             <div className="pointer-events-none absolute md:bottom-0 bottom-10 z-50 left-0 right-0 h-26 bg-gradient-to-t from-white via-white/70 to-transparent" />
            </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 -mt-20 md:-mt-20 px-4 bg-white">
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
            <p className="text-sm text-neutral-600 mb-8">All major payment methods accepted</p>
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-12 h-6 relative">
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
