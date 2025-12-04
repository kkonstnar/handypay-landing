"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const tabs = [
  {
    id: "download",
    title: "Download the app",
    lottie: "/lotties/Touch Screen.json",
    description:
      "Sign up in just a few taps and start setting up your global account from your phone — no paperwork, no long forms.",
  },
  {
    id: "verify",
    title: "Verify your identity",
    lottie: "/lotties/Face recognition-2.json",
    description:
      "Quick and secure identity verification using your government-issued ID. Our advanced system verifies your identity in seconds.",
  },
  {
    id: "bank",
    title: "Connect bank account",
    lottie: "/lotties/payment Gateway bank with check mark.json",
    description:
      "Link your bank account to receive payouts directly. We support banks across 17 countries with fast, secure transfers.",
  },
  {
    id: "payments",
    title: "Start receiving payments",
    lottie: "/lotties/earn online mobile and money bag.json",
    description:
      "Begin accepting payments from anywhere in the world. Connect with customers and start growing your business today.",
  },
]

export default function GetStartedSection() {
  const [activeTab, setActiveTab] = useState("download")
  const [lottieData, setLottieData] = useState<Record<string, unknown>>({})

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0]

  // Load lottie data when tab changes
  const loadLottie = async (path: string) => {
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
  }

  // Preload current tab's lottie
  useState(() => {
    loadLottie(currentTab.lottie)
  })

  return (
    <section id="get-started" className="py-16 md:py-32 bg-white overflow-x-hidden">
      <div className="container mx-auto max-w-6xl px-4 w-full">
        <h2 className="mb-12 md:mb-16 text-center text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight heading">
          Sign-up <br/> in 30 seconds
        </h2>
        
        <div className="rounded-3xl bg-white p-6 md:p-10 lg:p-14 ">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr_280px] lg:gap-10">
            {/* Left: Tabs */}
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    loadLottie(tab.lottie)
                  }}
                  className={`w-full border-b py-4 text-left text-lg transition-all ${
                    activeTab === tab.id
                      ? "translate-x-3 border-[#11AD30] font-semibold text-neutral-900"
                      : "border-neutral-200 text-neutral-500 hover:text-neutral-700 hover:translate-x-1"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Center: Lottie Animation */}
            <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              <div className="w-full max-w-md">
                {lottieData[currentTab.lottie] ? (
                  <Lottie
                    animationData={lottieData[currentTab.lottie]}
                    loop={true}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="aspect-square bg-neutral-100 rounded-2xl flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-neutral-200 border-t-[#11AD30] rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Description */}
            <div className="flex flex-col justify-center space-y-6">
              <p className="text-lg leading-relaxed text-neutral-600">{currentTab.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/jm/app/handypay/id6751820310"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full font-medium text-sm hover:bg-neutral-800 transition-colors"
                >
                  <Image
                    src="/apple.svg"
                    alt="Apple"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] invert"
                  />
                  <span>Download on App Store</span>
                </a>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-500 rounded-full text-sm">
                  <Image
                    src="/64px-Google_Play_2022_icon.svg.png"
                    alt="Google Play Store"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span>Android Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

