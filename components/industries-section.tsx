"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const industries = [
  {
    id: "food",
    title: "Food +\nBeverage",
    shortTitle: "Food & Bev",
    image: "/african-lady-making-use-her-pos-machine.jpg",
    stat: "Instant",
    statLabel: "QR code generation",
    description: "Let customers pay at the table or counter—no hardware needed.",
  },
  {
    id: "retail",
    title: "Retail",
    shortTitle: "Retail",
    image: "/woman-making-mobile-payment.jpg",
    stat: "~5%",
    statLabel: "per transaction",
    description: "Accept card payments in-store or online with QR codes and payment links.",
  },
  {
    id: "beauty",
    title: "Beauty",
    shortTitle: "Beauty",
    image: "/pleased-relaxed-woman-wears-bathrobe-wrapped-towel-head.jpg",
    stat: "2-3 days",
    statLabel: "payout to your bank",
    description: "Perfect for salons, spas, and freelance beauty professionals.",
  },
  {
    id: "services",
    title: "Services",
    shortTitle: "Services",
    image: "/person-shopping-second-hand-market.jpg",
    stat: "17",
    statLabel: "countries supported",
    description: "Contractors, tutors, consultants—get paid from clients anywhere.",
  },
];

const AUTO_ADVANCE_INTERVAL = 5000; // 5 seconds

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const activeIndustry = industries[activeIndex];
  const inactiveIndustries = industries.filter((_, i) => i !== activeIndex);

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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setActiveIndex((activeIndex + 1) % industries.length)}
            >
              <Image
                src={activeIndustry.image}
                alt={activeIndustry.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                {/* Title */}
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white whitespace-pre-line leading-[1.1]"
                  style={{ fontFamily: "var(--font-display), system-ui" }}
                >
                  {activeIndustry.title}
                </motion.h3>

                {/* Bottom Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
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
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Inactive Cards */}
          {inactiveIndustries.map((industry, i) => {
            const originalIndex = industries.findIndex(ind => ind.id === industry.id);
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setActiveIndex(originalIndex)}
              >
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Title */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#11AD30] transition-colors">
                    {industry.shortTitle}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Industry Cards - Mobile */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4"
            >
              <Image
                src={activeIndustry.image}
                alt={activeIndustry.title}
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
            </motion.div>
          </AnimatePresence>

          {/* Mobile Dots */}
          <div className="flex justify-center gap-2">
            {industries.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-[#11AD30] w-6" : "bg-neutral-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
