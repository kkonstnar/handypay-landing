"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  {
    id: "food",
    title: "Food +\nBeverage",
    shortTitle: "Food & Bev",
    image: "/webp/african-lady-making-use-her-pos-machine.webp",
    alt: "Restaurant owner accepting QR code payment from customer at food counter",
    stat: "Instant",
    statLabel: "QR code generation",
    description: "Let customers pay at the table or counter—no hardware needed.",
  },
  {
    id: "retail",
    title: "Retail",
    shortTitle: "Retail",
    image: "/webp/woman-making-mobile-payment.webp",
    alt: "Retail store customer making mobile payment with HandyPay",
    stat: "4.9%",
    statLabel: "+ 40¢ per transaction",
    description: "Accept card payments in-store or online with QR codes and payment links.",
  },
  {
    id: "beauty",
    title: "Beauty",
    shortTitle: "Beauty",
    image: "/webp/pleased-relaxed-woman-wears-bathrobe-wrapped-towel-head.webp",
    alt: "Spa client relaxing after paying for beauty services with HandyPay",
    stat: "2-3 days",
    statLabel: "payout to your bank",
    description: "Perfect for salons, spas, and freelance beauty professionals.",
  },
  {
    id: "services",
    title: "Services",
    shortTitle: "Services",
    image: "/webp/person-shopping-second-hand-market.webp",
    alt: "Service provider accepting card payment at outdoor market using HandyPay",
    stat: "17",
    statLabel: "countries supported",
    description: "Contractors, tutors, consultants—get paid from clients anywhere.",
  },
];

const AUTO_ADVANCE_INTERVAL = 5000; // 5 seconds

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Progress timer using CSS transition
  useEffect(() => {
    setProgress(0);
    const timeout = setTimeout(() => setProgress(100), 50);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const activeIndustry = industries[activeIndex];
  const inactiveIndustries = industries.filter((_, i) => i !== activeIndex);
  const nextIndex = (activeIndex + 1) % industries.length;

  return (
    <section className="py-20 md:py-28 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-3 block">
            Built for Every Industry
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-neutral-900">
            Keep your business growing
          </h2>
        </motion.div>

        {/* Industry Cards - Desktop */}
        <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-3">
          {/* Active Large Card */}
          <div
            className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setActiveIndex((activeIndex + 1) % industries.length)}
          >
            <Image
              src={activeIndustry.image}
              alt={activeIndustry.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
              {/* Title */}
              <h3 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white whitespace-pre-line leading-[1.1]"
                style={{ fontFamily: "var(--font-display), system-ui" }}
              >
                {activeIndustry.title}
              </h3>

              {/* Bottom Stats */}
              <div className="border-t border-white/30 pt-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {activeIndustry.stat}
                    </div>
                    <div className="text-sm text-neutral-300">
                      {activeIndustry.statLabel}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#11AD30] transition-colors">
                    Learn more
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inactive Cards */}
          {inactiveIndustries.map((industry) => {
            const originalIndex = industries.findIndex(ind => ind.id === industry.id);
            const isNext = originalIndex === nextIndex;
            
            return (
              <div key={industry.id} className="flex flex-col gap-2">
                <div
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setActiveIndex(originalIndex)}
                >
                  <Image
                    src={industry.image}
                    alt={industry.alt}
                    fill
                    className="object-cover brightness-50 group-hover:brightness-75 transition-[filter] duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Title */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#11AD30] transition-colors duration-300">
                      {industry.shortTitle}
                    </h3>
                  </div>
                </div>
                
                {/* Progress bar - only on next card */}
                {isNext && (
                  <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#11AD30] rounded-full"
                      style={{ 
                        width: `${progress}%`,
                        transition: progress === 0 ? 'none' : `width ${AUTO_ADVANCE_INTERVAL - 50}ms linear`,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Industry Cards - Mobile */}
        <div className="md:hidden">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
            <Image
              src={activeIndustry.image}
              alt={activeIndustry.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <h3 className="text-3xl font-bold text-white whitespace-pre-line leading-[1.1]">
                {activeIndustry.title}
              </h3>
              <div className="border-t border-white/30 pt-4">
                <div className="text-2xl font-bold text-white mb-1">{activeIndustry.stat}</div>
                <div className="text-sm text-neutral-300 mb-2">{activeIndustry.statLabel}</div>
                <p className="text-sm text-neutral-400">{activeIndustry.description}</p>
              </div>
            </div>
          </div>

          {/* Mobile Progress Dots */}
          <div className="flex justify-center gap-2">
            {industries.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === activeIndex ? '24px' : '8px' }}
              >
                <div className={`absolute inset-0 ${i === activeIndex ? 'bg-neutral-300' : 'bg-neutral-400'}`} />
                {i === activeIndex && (
                  <div 
                    className="absolute inset-0 bg-[#11AD30] rounded-full"
                    style={{ 
                      width: `${progress}%`,
                      transition: progress === 0 ? 'none' : `width ${AUTO_ADVANCE_INTERVAL - 50}ms linear`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
