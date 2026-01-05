"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface HowItWorksProps {
  countryName: string;
  currencyCode: string;
  payoutTime: string;
}

const lottieFiles = [
  "/lotties/Touch Screen.json",
  "/lotties/earn online mobile and money bag.json",
  "/lotties/payment Gateway bank with check mark.json",
];

export function HowItWorks({ countryName, currencyCode, payoutTime }: HowItWorksProps) {
  const [lottieData, setLottieData] = useState<Record<string, unknown>>({});

  const steps = [
    {
      title: "Download the app",
      description: "Get HandyPay free from the App Store or Google Play. Sign up in minutes.",
      lottie: "/lotties/Touch Screen.json",
    },
    {
      title: "Create a payment link",
      description: "Generate a QR code or payment link for any amount. Share via WhatsApp, SMS, or email.",
      lottie: "/lotties/earn online mobile and money bag.json",
    },
    {
      title: `Get paid in ${currencyCode}`,
      description: `Receive funds directly to your ${countryName} bank account in ${payoutTime}.`,
      lottie: "/lotties/payment Gateway bank with check mark.json",
    },
  ];

  // Load lottie data
  const loadLottie = useCallback(async (path: string) => {
    if (lottieData[path]) return;
    try {
      const response = await fetch(path);
      const data = await response.json();
      setLottieData(prev => ({ ...prev, [path]: data }));
    } catch (error) {
      console.error("Failed to load lottie:", error);
    }
  }, [lottieData]);

  // Preload all lotties
  useEffect(() => {
    lottieFiles.forEach(path => loadLottie(path));
  }, [loadLottie]);

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-12 text-center">
          How to accept payments in {countryName}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-32 h-32 mx-auto mb-6">
                {lottieData[item.lottie] ? (
                  <Lottie
                    animationData={lottieData[item.lottie]}
                    loop={true}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-neutral-200 border-t-[#11AD30] rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
