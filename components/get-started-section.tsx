"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const tabs = [
  {
    id: "download",
    title: "Download the app",
    lottie: "/lotties/Touch Screen.json",
    description:
      "Sign up in just a few taps and start setting up your global account from your phone.",
  },
  {
    id: "verify",
    title: "Verify your identity",
    lottie: "/lotties/Face recognition-2.json",
    description:
      "Quick and secure identity verification using your government-issued ID. Verified in seconds.",
  },
  {
    id: "bank",
    title: "Connect bank account",
    lottie: "/lotties/payment Gateway bank with check mark.json",
    description:
      "Link your bank account to receive payouts directly. We support banks across 17 countries.",
  },
  {
    id: "payments",
    title: "Start receiving payments",
    lottie: "/lotties/earn online mobile and money bag.json",
    description:
      "Begin accepting payments from anywhere in the world. Connect with customers today.",
  },
]

const AUTO_ADVANCE_INTERVAL = 4000 // 4 seconds

export default function GetStartedSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lottieData, setLottieData] = useState<Record<string, unknown>>({})
  const [key, setKey] = useState(0) // Reset animation key

  const currentTab = tabs[activeIndex]

  // Load lottie data
  const loadLottie = useCallback(async (path: string) => {
    if (lottieData[path]) return lottieData[path]
    try {
      const response = await fetch(path)
      const data = await response.json()
      setLottieData(prev => ({ ...prev, [path]: data }))
      return data
    } catch (error) {
      console.error("Failed to load lottie:", error)
      return null
    }
  }, [lottieData])

  // Preload all lotties
  useEffect(() => {
    tabs.forEach(tab => loadLottie(tab.lottie))
  }, [loadLottie])

  // Auto-advance
  useEffect(() => {
    const advanceTimeout = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length)
      setKey(k => k + 1)
    }, AUTO_ADVANCE_INTERVAL)

    return () => clearTimeout(advanceTimeout)
  }, [activeIndex, key])

  const goToStep = (index: number) => {
    setActiveIndex(index)
    setKey(k => k + 1)
  }

  return (
    <section id="get-started" className="py-20 md:py-32 bg-white overflow-x-hidden">
      <div className="container mx-auto max-w-6xl px-4 w-full">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-center">
          
          {/* Left: Lottie Animation + Description */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square max-w-sm mx-auto lg:mx-0">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#11AD30]/5 to-transparent rounded-3xl" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  {lottieData[currentTab.lottie] ? (
                    <Lottie
                      animationData={lottieData[currentTab.lottie]}
                      loop={true}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-10 h-10 border-3 border-neutral-200 border-t-[#11AD30] rounded-full animate-spin" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Description + Download buttons */}
            <div className="mt-8 max-w-sm mx-auto lg:mx-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-semibold mb-3 text-neutral-900">{currentTab.title}</h3>
                  <p className="text-neutral-500 leading-relaxed mb-8">{currentTab.description}</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/jm/app/handypay/id6751820310"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-full font-medium text-sm hover:bg-neutral-800 transition-colors"
                >
                  <Image
                    src="/apple.svg"
                    alt="Apple"
                    width={16}
                    height={16}
                    className="w-4 h-4 invert"
                  />
                  <span>App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.handypay.mobile&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-full text-sm hover:bg-neutral-50 transition-colors"
                >
                  <Image
                    src="/64px-Google_Play_2022_icon.svg.png"
                    alt="Google Play Store"
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5"
                  />
                  <span>Get it on Google Play</span>
                </a>
              </div>
            </div>
            
            {/* Decorative gradient blur */}
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#11AD30]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Right: Stacked Tab Items */}
          <div className="space-y-3 order-1 lg:order-2">
            {tabs.map((tab, index) => {
              const isActive = activeIndex === index
              const isPast = index < activeIndex
              
              return (
                <button
                  key={tab.id}
                  onClick={() => goToStep(index)}
                  className={`w-full text-left py-3 pl-5 relative transition-all duration-300 ${
                    isActive || isPast
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-70"
                  }`}
                >
                  {/* Individual progress bar for each tab */}
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-neutral-200 overflow-hidden">
                    {/* Filled portion */}
                    {isPast && (
                      <div className="absolute inset-0 bg-[#11AD30] rounded-full" />
                    )}
                    {isActive && (
                      <motion.div
                        key={`progress-${key}`}
                        className="absolute top-0 left-0 right-0 bg-[#11AD30] rounded-full"
                        initial={{ height: "0%" }}
                        animate={{ height: "100%" }}
                        transition={{ 
                          duration: AUTO_ADVANCE_INTERVAL / 1000,
                          ease: "linear"
                        }}
                      />
                    )}
                  </div>
                  
                  <h3 className={`text-lg md:text-xl font-semibold mb-1.5 ${
                    isActive ? "text-neutral-900" : isPast ? "text-neutral-700" : "text-neutral-600"
                  }`}>
                    {tab.title}
                  </h3>
                  <p className={`text-sm md:text-base leading-relaxed ${
                    isActive ? "text-neutral-600" : "text-neutral-400"
                  }`}>
                    {tab.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
