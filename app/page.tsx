"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Landmark, FileText, Heart, Globe, Users, UserCircle, Repeat, Smartphone, Wallet, ThumbsUp } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

function isMobile() {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function getMobileOS() {
  if (typeof window === "undefined") return null;
  const userAgent = navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera;
  
  if (!userAgent) return null;
  
  if (/android/i.test(userAgent)) {
    return "android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as Window & { MSStream?: unknown }).MSStream) {
    return "ios";
  }
  return null;
}

const IOS_APP_URL = process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/app/handypay";
const ANDROID_APP_URL = process.env.NEXT_PUBLIC_ANDROID_APP_URL || "https://play.google.com/store/apps/details?id=com.handypay";

export default function Home() {
  const [amount, setAmount] = useState(7250.0);
  const [showQRCode, setShowQRCode] = useState<"ios" | "android" | null>(null);
  const iosButtonRef = useRef<HTMLButtonElement>(null);
  const androidButtonRef = useRef<HTMLButtonElement>(null);
  const iosQRRef = useRef<HTMLDivElement>(null);
  const androidQRRef = useRef<HTMLDivElement>(null);
  const [featureReactions, setFeatureReactions] = useState<Record<string, number>>({});
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});

  // Load initial reactions from API
  useEffect(() => {
    const loadReactions = async () => {
      try {
        const response = await fetch("/api/features/reactions");
        if (response.ok) {
          const data = await response.json();
          setFeatureReactions(data);
          
          // Only load user reactions from localStorage after API data is loaded
          if (typeof window !== "undefined") {
            const savedReactions = localStorage.getItem("handypay-feature-reactions");
            if (savedReactions) {
              try {
                const parsed = JSON.parse(savedReactions);
                // Only set reactions that exist in the API data
                const validReactions: Record<string, boolean> = {};
                Object.keys(data).forEach(key => {
                  if (parsed[key] === true) {
                    validReactions[key] = true;
                  }
                });
                setUserReactions(validReactions);
              } catch {
                // Ignore parse errors
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to load reactions:", error);
      }
    };

    loadReactions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prev) => prev + Math.random() * 100 - 50);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Close QR code when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (showQRCode === "ios") {
        if (
          iosQRRef.current &&
          iosButtonRef.current &&
          !iosQRRef.current.contains(target) &&
          !iosButtonRef.current.contains(target)
        ) {
          setShowQRCode(null);
        }
      } else if (showQRCode === "android") {
        if (
          androidQRRef.current &&
          androidButtonRef.current &&
          !androidQRRef.current.contains(target) &&
          !androidButtonRef.current.contains(target)
        ) {
          setShowQRCode(null);
        }
      }
    };

    if (showQRCode) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQRCode]);

  const handleIOSClick = () => {
    if (isMobile()) {
      const os = getMobileOS();
      if (os === "ios") {
        window.location.href = IOS_APP_URL;
      } else {
        // On mobile but not iOS, still redirect
        window.location.href = IOS_APP_URL;
      }
    } else {
      // Desktop: toggle QR code
      setShowQRCode(showQRCode === "ios" ? null : "ios");
    }
  };

  const handleAndroidClick = () => {
    if (isMobile()) {
      const os = getMobileOS();
      if (os === "android") {
        window.location.href = ANDROID_APP_URL;
      } else {
        // On mobile but not Android, still redirect
        window.location.href = ANDROID_APP_URL;
      }
    } else {
      // Desktop: toggle QR code
      setShowQRCode(showQRCode === "android" ? null : "android");
    }
  };

  const handleFeatureReaction = async (featureId: string) => {
    const isCurrentlyReacted = userReactions[featureId];
    const action = isCurrentlyReacted ? "decrement" : "increment";

    // Show confetti when incrementing (thumbs up)
    if (!isCurrentlyReacted && typeof window !== "undefined") {
      // Small, subtle confetti effect
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.6 },
        colors: ["#3AB75C", "#22c55e", "#16a34a"],
        gravity: 0.8,
        ticks: 100,
        scalar: 0.6,
      });
    }

    // Optimistic update
    setFeatureReactions(prev => ({
      ...prev,
      [featureId]: isCurrentlyReacted 
        ? Math.max(0, prev[featureId] - 1)
        : (prev[featureId] || 0) + 1
    }));
    
    const newUserReactions = {
      ...userReactions,
      [featureId]: !isCurrentlyReacted
    };
    setUserReactions(newUserReactions);
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("handypay-feature-reactions", JSON.stringify(newUserReactions));
    }

    // Update on server
    try {
      const response = await fetch("/api/features/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featureId, action }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update with server response to ensure consistency
        setFeatureReactions(data.allReactions);
      } else {
        // Revert on error
        setFeatureReactions(prev => ({
          ...prev,
          [featureId]: isCurrentlyReacted 
            ? (prev[featureId] || 0) + 1
            : Math.max(0, (prev[featureId] || 0) - 1)
        }));
        setUserReactions(userReactions);
      }
    } catch (error) {
      console.error("Failed to update reaction:", error);
      // Revert on error
      setFeatureReactions(prev => ({
        ...prev,
        [featureId]: isCurrentlyReacted 
          ? (prev[featureId] || 0) + 1
          : Math.max(0, (prev[featureId] || 0) - 1)
      }));
      setUserReactions(userReactions);
    }
  };
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
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mt-8 mb-6 flex-wrap relative"
            >
              <div className="relative">
                <button
                  ref={iosButtonRef}
                  onClick={handleIOSClick}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black border border-neutral-300 rounded-full font-medium text-sm hover:bg-neutral-50 transition-colors"
                >
                  <Image 
                    src="/apple.svg" 
                    alt="" 
                    width={20} 
                    height={20}
                    className="w-5 h-5"
                  />
                  <span>Download on App Store</span>
                </button>
                <AnimatePresence>
                  {showQRCode === "ios" && (
                    <motion.div
                      ref={iosQRRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-lg p-5 z-50 min-w-[200px]"
                    >
                      <div className="w-full aspect-square p-3 relative">
                        <QRCodeSVG value={IOS_APP_URL} className="w-full h-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-lg p-0">
                            <Image 
                              src="/handypay.svg" 
                              alt="HandyPay" 
                              width={32} 
                              height={32}
                              className="w-8 h-8"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-center text-sm font-medium mt-2 text-neutral-700">Scan to download</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  ref={androidButtonRef}
                  onClick={handleAndroidClick}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black border border-neutral-300 rounded-full font-medium text-sm hover:bg-neutral-50 transition-colors"
                >
                  <Image 
                    src="/64px-Google_Play_2022_icon.svg.png" 
                    alt="" 
                    width={16} 
                    height={16}
                    className="w-4 h-4"
                  />
                  <span>Get it on Google Play</span>
                </button>
                <AnimatePresence>
                  {showQRCode === "android" && (
                    <motion.div
                      ref={androidQRRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-lg p-5 z-50 min-w-[200px]"
                    >
                      <div className="w-full aspect-square p-3 relative">
                        <QRCodeSVG value={ANDROID_APP_URL} className="w-full h-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-lg p-0">
                            <Image 
                              src="/handypay.svg" 
                              alt="HandyPay" 
                              width={32} 
                              height={32}
                              className="w-8 h-8"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-center text-sm font-medium mt-2 text-neutral-700">Scan to download</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
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
              className="flex justify-center relative -mt-2 md:-mt-4 bg-white"
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
          <h2 className="text-4xl font-bold text-center mb-16 heading">Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 relative">
                  <Image src="/home-tab.svg" alt="QR" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-semibold">QR Code Payments</h3>
              </div>
              <p className="text-neutral-600 mb-4">
                Generate a QR code and let customers pay instantly with their phone
              </p>
              <button
                onClick={() => handleFeatureReaction("qrCodePayments")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.qrCodePayments 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.qrCodePayments ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.qrCodePayments ?? 74} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 relative">
                  <Image src="/payment-link-green.svg" alt="Payment Link" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-semibold">Payment Links</h3>
              </div>
              <p className="text-neutral-600 mb-4">
                Share a link via WhatsApp, SMS, or social media to collect payments
              </p>
              <button
                onClick={() => handleFeatureReaction("paymentLinks")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.paymentLinks 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.paymentLinks ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.paymentLinks ?? 81} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Landmark className="w-8 h-8 text-[#3AB75C]" />
                <h3 className="text-xl font-semibold">Fast Payouts</h3>
              </div>
              <p className="text-neutral-600 mb-4">
                Get paid to your Jamaican bank account or Western Union in 2 business days.
              </p>
              <button
                onClick={() => handleFeatureReaction("fastPayouts")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.fastPayouts 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.fastPayouts ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.fastPayouts ?? 68} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-8 h-8 text-[#3AB75C]" />
                <h3 className="text-xl font-semibold">Donations</h3>
              </div>
              <p className="text-neutral-600 mb-4">
                Accept donations easily with QR codes and payment links for your cause or organization
              </p>
              <button
                onClick={() => handleFeatureReaction("donations")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.donations 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.donations ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.donations ?? 76} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-8 h-8 text-[#3AB75C]" />
                <h3 className="text-xl font-semibold">Multi-Currency</h3>
              </div>
              <p className="text-neutral-600 mb-4">
                Accept payments in USD or JMD - choose the currency that works best for your business
              </p>
              <button
                onClick={() => handleFeatureReaction("multiCurrency")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.multiCurrency 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.multiCurrency ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.multiCurrency ?? 72} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg relative opacity-75">
              <div className="flex items-center gap-3 mb-2">
                <Repeat className="w-8 h-8 text-neutral-400" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Subscriptions</h3>
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">Coming Soon</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mb-3">Jan 8, 2025</p>
              <p className="text-neutral-600 mb-4">
                Set up recurring payments and manage subscriptions effortlessly
              </p>
              <button
                onClick={() => handleFeatureReaction("subscriptions")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.subscriptions 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.subscriptions ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.subscriptions || 0} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg relative opacity-75">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-8 h-8 text-neutral-400" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Invoicing</h3>
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">Coming Soon</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mb-3">Feb 12, 2025</p>
              <p className="text-neutral-600 mb-4">
                Create and send professional invoices to your customers
              </p>
              <button
                onClick={() => handleFeatureReaction("invoicing")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.invoicing 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.invoicing ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.invoicing || 0} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg relative opacity-75">
              <div className="flex items-center gap-3 mb-2">
                <UserCircle className="w-8 h-8 text-neutral-400" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Customers</h3>
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">Coming Soon</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mb-3">Mar 20, 2025</p>
              <p className="text-neutral-600 mb-4">
                Track customer payment history and manage your customer relationships
              </p>
              <button
                onClick={() => handleFeatureReaction("customers")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.customers 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.customers ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.customers || 0} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg relative opacity-75">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-neutral-400" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Team Accounts</h3>
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">Coming Soon</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mb-3">Apr 15, 2025</p>
              <p className="text-neutral-600 mb-4">
                Collaborate with your team and manage multiple users on one account
              </p>
              <button
                onClick={() => handleFeatureReaction("teamAccounts")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.teamAccounts 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.teamAccounts ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.teamAccounts || 0} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg relative opacity-75">
              <div className="flex items-center gap-3 mb-2">
                <Smartphone className="w-8 h-8 text-neutral-400" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Virtual Cards</h3>
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">Coming Soon</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mb-3">May 22, 2025</p>
              <p className="text-neutral-600 mb-4">
                Issue virtual cards instantly for online payments and subscriptions
              </p>
              <button
                onClick={() => handleFeatureReaction("virtualCards")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.virtualCards 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.virtualCards ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.virtualCards || 0} />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg relative opacity-75">
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-8 h-8 text-neutral-400" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Physical Cards</h3>
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">Coming Soon</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mb-3">Jun 10, 2025</p>
              <p className="text-neutral-600 mb-4">
                Order physical cards delivered to your address for in-person payments
              </p>
              <button
                onClick={() => handleFeatureReaction("physicalCards")}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  userReactions.physicalCards 
                    ? "text-[#3AB75C]" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${userReactions.physicalCards ? "fill-current" : ""}`} />
                <NumberFlow value={featureReactions.physicalCards || 0} />
              </button>
            </div>
          </div>
          {/* Payment Methods */}
           <div className="text-center mb-32">
            <p className="text-sm text-neutral-600 mb-8">All major payment methods accepted</p>
            <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-12 h-6 relative">
                  <Image src={`/payment-${i + 1}.svg`} alt={`Payment method ${i + 1}`} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div id="testimonials" className="mb-16 w-full">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance heading">
                Entrepreneurs love HandyPay
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto text-balance leading-relaxed">
                Accept payments with QR codes and payment links, directly to your Jamaican bank account or Western Union.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="flex flex-col gap-6">
                {/* Keisha Williams Card */}
                <div className="bg-white p-6 border border-neutral-200" style={{ borderRadius: '16px 6px 16px 6px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-medium text-neutral-900">Keisha Williams</span>
                    <Image 
                      src="/verified-badge.png"
                      alt="Verified"
                      width={18}
                      height={18}
                      className="flex-shrink-0"
                    />
                  </div>
                  <p className="text-neutral-900 leading-relaxed mb-4">
                    Game changer for my business. Customers love scanning the QR code - it&apos;s so fast.
                  </p>
                  <p className="text-neutral-900 leading-relaxed">
                    Getting paid directly to my <span className="font-bold">Jamaican bank account</span> in just a few days? This is exactly what I needed.
                  </p>
                </div>

                <div className="bg-white p-6 border border-neutral-200" style={{ borderRadius: '12px 20px 12px 20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <p className="text-neutral-900 leading-relaxed mb-4">
                    The payment links are perfect for WhatsApp. I just send it and get paid instantly.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-600 text-sm">Marcus Thompson</span>
                    <Image 
                      src="/verified-badge.png"
                      alt="Verified"
                      width={16}
                      height={16}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-6">
                <div className="bg-white p-6 border border-neutral-200" style={{ borderRadius: '14px 8px 14px 8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <p className="text-neutral-900 leading-relaxed mb-4">
                    No more complicated payment setups. Just generate a QR code and you&apos;re done.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-600 text-sm">Aaliyah Johnson</span>
                    <Image 
                      src="/verified-badge.png"
                      alt="Verified"
                      width={16}
                      height={16}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>

                <div className="bg-white p-6 border border-neutral-200" style={{ borderRadius: '5px 18px 5px 18px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-medium text-neutral-900">Jamal Davis</span>
                    <Image 
                      src="/verified-badge.png"
                      alt="Verified"
                      width={18}
                      height={18}
                      className="flex-shrink-0"
                    />
                  </div>
                  <p className="text-neutral-900 leading-relaxed">
                    Western Union payouts are a lifesaver. <span className="font-bold">I wish I found HandyPay sooner.</span> Setting up payments used to take weeks, now it takes minutes.
                  </p>
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-6">
                <div className="bg-white p-6 border border-neutral-200" style={{ borderRadius: '20px 10px 20px 10px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-medium text-neutral-900">Tyrone Mitchell</span>
                    <Image 
                      src="/verified-badge.png"
                      alt="Verified"
                      width={18}
                      height={18}
                      className="flex-shrink-0"
                    />
                  </div>
                  <p className="text-neutral-900 leading-relaxed">
                    <span className="font-bold">HandyPay is awesome.</span> The QR code payments work flawlessly, and getting paid to my Jamaican bank account in 2 days is exactly what I needed. Best decision I made for my business.
                  </p>
                </div>

                <div className="bg-white p-6 border border-neutral-200" style={{ borderRadius: '8px 16px 8px 16px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <p className="text-neutral-900 leading-relaxed mb-4">
                    <span className="font-bold">@handypay</span> made accepting card payments so simple. The payment links work perfectly for my customers, and I love that I can get paid to Western Union too.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-600 text-sm">Jordan Washington</span>
                    <Image 
                      src="/verified-badge.png"
                      alt="Verified"
                      width={16}
                      height={16}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

         

          {/* Removed benefits card per request */}
        </div>
      </section>
    </div>
  );
}
