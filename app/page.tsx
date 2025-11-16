"use client";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
import { Landmark, FileText, Heart, Globe, Users, UserCircle, Repeat, Smartphone, Wallet, ThumbsUp, CreditCard, ChevronDown } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import posthog from "posthog-js";
import { trackGAEvent } from "@/lib/google-analytics";

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
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

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

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !trackedDepths.has(milestone) &&
          maxScroll < milestone
        ) {
          trackedDepths.add(milestone);
          maxScroll = milestone;
          posthog.capture("scroll_depth", {
            depth: milestone,
            page: "home",
          });
          // Also track to Google Analytics
          trackGAEvent("scroll_depth", {
            depth: milestone,
            page: "home",
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    // Track download click to both PostHog and Google Analytics
    const eventData = {
      platform: "ios",
      source: "hero_section",
      device_type: isMobile() ? "mobile" : "desktop",
    };
    posthog.capture("app_download_clicked", eventData);
    trackGAEvent("app_download_clicked", eventData);

    if (isMobile()) {
      const os = getMobileOS();
      if (os === "ios") {
        const redirectData = {
          platform: "ios",
          source: "hero_section",
          redirect_type: "direct",
        };
        posthog.capture("app_download_redirected", redirectData);
        trackGAEvent("app_download_redirected", redirectData);
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
    // Track download click to both PostHog and Google Analytics
    const eventData = {
      platform: "android",
      source: "hero_section",
      device_type: isMobile() ? "mobile" : "desktop",
    };
    posthog.capture("app_download_clicked", eventData);
    trackGAEvent("app_download_clicked", eventData);

    if (isMobile()) {
      const os = getMobileOS();
      if (os === "android") {
        const redirectData = {
          platform: "android",
          source: "hero_section",
          redirect_type: "direct",
        };
        posthog.capture("app_download_redirected", redirectData);
        trackGAEvent("app_download_redirected", redirectData);
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

    // Track feature reaction to both PostHog and Google Analytics
    const reactionData = {
      feature_id: featureId,
      action: action,
      feature_name: featureId.replace(/([A-Z])/g, " $1").trim(),
    };
    posthog.capture("feature_reaction", reactionData);
    trackGAEvent("feature_reaction", reactionData);

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tryhandypay.org";

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does HandyPay work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "HandyPay allows you to accept digital payments in Jamaica using QR codes and payment links. Simply generate a QR code or share a payment link, and customers can pay you directly. Funds are deposited to your Jamaican bank account or Western Union account within 2 business days."
        }
      },
      {
        "@type": "Question",
        "name": "What payment methods does HandyPay accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "HandyPay accepts all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support Apple Pay and Google Pay for contactless payments."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to receive payments in Jamaica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Payments are processed and deposited to your Jamaican bank account or Western Union account within 2 business days after the transaction is completed."
        }
      },
      {
        "@type": "Question",
        "name": "Can I accept payments in both USD and JMD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, HandyPay supports multi-currency payments. You can accept payments in both USD (US Dollars) and JMD (Jamaican Dollars), allowing you to choose the currency that works best for your business."
        }
      },
      {
        "@type": "Question",
        "name": "Is HandyPay available for iOS and Android?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, HandyPay is available for both iOS and Android devices. You can download it from the App Store for iPhone or Google Play Store for Android devices."
        }
      }
    ]
  };

  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "HandyPay",
    "description": "Mobile payment app for accepting card payments with QR codes and payment links in Jamaica",
    "brand": {
      "@type": "Brand",
      "name": "HandyPay"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.75",
      "reviewCount": "6",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Keisha Williams"
        },
        "datePublished": "2024-01-01",
        "reviewBody": "Game changer for my business. Customers love scanning the QR code - it's so fast. Getting paid directly to my Jamaican bank account in just a few days? This is exactly what I needed.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Marcus Thompson"
        },
        "datePublished": "2024-01-01",
        "reviewBody": "The payment links are perfect for WhatsApp. I just send it and get paid instantly.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Aaliyah Johnson"
        },
        "datePublished": "2024-01-01",
        "reviewBody": "No more complicated payment setups. Just generate a QR code and you're done.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jamal Davis"
        },
        "datePublished": "2024-01-01",
        "reviewBody": "Western Union payouts are a lifesaver. I wish I found HandyPay sooner. Setting up payments used to take weeks, now it takes minutes.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Tyrone Mitchell"
        },
        "datePublished": "2024-01-01",
        "reviewBody": "HandyPay is awesome. The QR code payments work flawlessly, and getting paid to my Jamaican bank account in 2 days is exactly what I needed. Best decision I made for my business.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jordan Washington"
        },
        "datePublished": "2024-01-01",
        "reviewBody": "@handypay made accepting card payments so simple. The payment links work perfectly for my customers, and I love that I can get paid to Western Union too.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  };

  return (
    <main className="flex flex-col">
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Script
        id="review-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }}
      />
      {/* Hero Section */}
      <section aria-label="Hero section" className="min-h-screen flex items-end px-4">
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
              className="text-base text-neutral-600 max-w-2xl mx-auto mb-6"
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
                  className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black border border-neutral-300 rounded-full font-medium text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <Image 
                    src="/apple.svg" 
                    alt="Apple App Store logo" 
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
                  className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black border border-neutral-300 rounded-full font-medium text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <Image 
                    src="/64px-Google_Play_2022_icon.svg.png" 
                    alt="Google Play Store logo" 
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
              className="hidden md:flex items-center justify-center gap-6 mt-4 mb-2"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => {
                    const rating = 4.8;
                    const starValue = i + 1;
                    const isFilled = starValue <= Math.floor(rating);
                    return (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${isFilled ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`} 
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    );
                  })}
                </div>
                <span className="text-sm text-neutral-600 font-medium">4.8</span>
                <span className="text-xs text-neutral-500">App Store</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => {
                    const rating = 4.7;
                    const starValue = i + 1;
                    const isFilled = starValue <= Math.floor(rating);
                    return (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${isFilled ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`} 
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    );
                  })}
                </div>
                <span className="text-sm text-neutral-600 font-medium">4.7</span>
                <span className="text-xs text-neutral-500">Google Play</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 mt-6"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm text-neutral-600">Partnered with</span>
                <Image src="/stripe.svg" alt="Stripe" width={54} height={20} /> <span className="text-sm text-neutral-600">&</span>
                <Image src="/wulogo.png" alt="Western Union" width={54} height={20} />
              </div>
              
            </motion.div>
          </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center relative -mt-2 md:-mt-4 bg-white"
              style={{height: 460}}
            >
            <Image 
              src="/iphone-mockup.svg" 
              alt="HandyPay mobile app interface showing QR code payment feature on iPhone" 
              width={300} 
              height={560} 
              priority 
              sizes="(max-width: 768px) 100vw, 300px"
              loading="eager"
            />
            <div className="absolute top-24 md:top-38">
              <Image 
                src="/qr-icon.svg" 
                alt="QR code for accepting payments with HandyPay" 
                width={140} 
                height={140}
                sizes="140px"
                loading="lazy"
              />
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
      <section id="features" aria-label="Features" className="py-20 -mt-20 md:-mt-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 heading">Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 relative">
                  <Image 
                    src="/home-tab.svg" 
                    alt="QR code payment icon" 
                    fill 
                    className="object-contain"
                    sizes="32px"
                    loading="lazy"
                  />
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
                  <Image 
                    src="/payment-link-green.svg" 
                    alt="Payment link icon for sharing payment requests" 
                    fill 
                    className="object-contain"
                    sizes="32px"
                    loading="lazy"
                  />
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
            <AnimatePresence>
              {showMoreFeatures && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="bg-white p-8 rounded-lg relative opacity-75"
                  >
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
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
                    className="bg-white p-8 rounded-lg relative opacity-75"
                  >
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
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                    className="bg-white p-8 rounded-lg relative opacity-75"
                  >
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
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    className="bg-white p-8 rounded-lg relative opacity-75"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="w-8 h-8 text-neutral-400" />
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
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="bg-white p-8 rounded-lg relative opacity-75"
                  >
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
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          {!showMoreFeatures && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={() => {
                  const eventData = { section: "features" };
                  posthog.capture("more_features_clicked", eventData);
                  trackGAEvent("more_features_clicked", eventData);
                  setShowMoreFeatures(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black border border-neutral-300 rounded-full font-medium text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                More Features
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}
          {/* Payment Methods */}
           <div className="text-center mb-32 mt-20">
            <p className="text-sm text-neutral-600 mb-8">All major payment methods accepted</p>
            <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
              {[
                "Visa",
                "Mastercard", 
                "American Express",
                "Discover",
                "Apple Pay",
                "Google Pay",
                "Stripe"
              ].map((name, i) => (
                <div key={i} className="w-12 h-6 relative">
                  <Image 
                    src={`/payment-${i + 1}.svg`} 
                    alt={`${name} payment method accepted`} 
                    fill 
                    className="object-contain"
                    sizes="48px"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <section id="testimonials" aria-label="Customer testimonials" className="mb-16 w-full">
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
          </section>

         

          {/* Removed benefits card per request */}
        </div>
      </section>
    </main>
  );
}
