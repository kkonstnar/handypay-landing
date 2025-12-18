"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

const demos = [
  {
    id: "onboarding",
    title: "Onboarding demo",
    video: "/demos/onboarding-demo.mp4",
    poster: "/webp/happy man.webp",
    description:
      "Create your account, verify your identity, and connect your bank — all in under a minute.",
  },
  {
    id: "qr-code",
    title: "QR code creation",
    video: "/demos/qr-code-demo.mp4",
    poster: "/webp/woman with phone.webp",
    description:
      "Generate QR codes instantly for any amount. Customers scan and pay with their card.",
  },
  {
    id: "payment-link",
    title: "Payment link",
    video: "/demos/payment-link-demo.mp4",
    poster: "/webp/woman handypay.webp",
    description:
      "Create and share payment links via WhatsApp, SMS, or email in seconds.",
  },
  {
    id: "payouts",
    title: "Checking payouts",
    video: "/demos/payouts-demo.mp4",
    poster: "/webp/black man busines.webp",
    description:
      "Track earnings in real-time. See pending and completed payouts to your bank.",
  },
]

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState("onboarding")
  const [isPlaying, setIsPlaying] = useState(false)

  const currentDemo = demos.find((demo) => demo.id === activeTab) || demos[0]

  return (
    <section id="demo" className="py-16 md:py-24 bg-neutral-50 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl px-4 w-full">
        <div className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-12 items-center">
          {/* Left: Section Header + Stacked Text Items */}
          <div>
            {/* Section Header */}
            <div className="mb-10 lg:mb-12">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-3 block">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-neutral-900 leading-[1.1] tracking-tight">
                See how easy payments can be
              </h2>
            </div>
            
            {/* Stacked Text Items */}
            <div className="space-y-6 lg:space-y-8">
            {demos.map((demo) => {
              const isActive = activeTab === demo.id
              return (
                <button
                  key={demo.id}
                  onClick={() => {
                    setActiveTab(demo.id)
                    setIsPlaying(false)
                  }}
                  className={`w-full text-left transition-all duration-300 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <h3 className={`text-lg md:text-xl font-semibold mb-1.5 ${
                    isActive ? "text-neutral-900" : "text-neutral-600"
                  }`}>
                    {demo.title}
                  </h3>
                  <p className={`text-sm md:text-base leading-relaxed ${
                    isActive ? "text-neutral-600" : "text-neutral-400"
                  }`}>
                    {demo.description}
                  </p>
                </button>
              )
            })}
            </div>
          </div>

          {/* Right: Large Video Preview */}
          <div className="relative">
            <div className="relative aspect-[4/3] md:aspect-video bg-neutral-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-neutral-200">
              {isPlaying ? (
                <video
                  key={currentDemo.id}
                  src={currentDemo.video}
                  poster={currentDemo.poster}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <Image
                    src={currentDemo.poster}
                    alt={currentDemo.title}
                    fill
                    className="object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 hover:bg-white flex items-center justify-center transition-all hover:scale-105 shadow-xl"
                    >
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-neutral-900 ml-1" fill="currentColor" />
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {/* Decorative gradient blur */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#11AD30]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
