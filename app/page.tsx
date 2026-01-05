"use client";
import Image from "next/image";
import Script from "next/script";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Landmark, FileText, Heart, Globe, Users, UserCircle, Repeat, Wallet, ThumbsUp, CreditCard, ChevronDown, Star } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import posthog from "posthog-js";
import { trackGAEvent } from "@/lib/google-analytics";
import { trackDownloadApp, trackGooglePlayClick } from "@/lib/google-ads";
import { Input } from "@/components/ui/input";

const RotatingEarth = dynamic(() => import("@/components/rotating-earth"), { ssr: false });
const GetStartedSection = dynamic(() => import("@/components/get-started-section"), { ssr: false });
const DemoSection = dynamic(() => import("@/components/demo-section"), { ssr: false });
const IndustriesSection = dynamic(() => import("@/components/industries-section"), { ssr: false });
import { FlagImage } from "@/components/flag-image";

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

const IOS_APP_URL = process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/jm/app/handypay/id6751820310";
const ANDROID_APP_URL = process.env.NEXT_PUBLIC_ANDROID_APP_URL || "https://play.google.com/store/apps/details?id=com.handypay.mobile&hl=en";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tryhandypay.com";
const QR_CODE_TRACKING_URL = `${siteUrl}/app/download?source=hero_section`;

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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const rotatingTexts = [
    "Accept Payments\nwith your phone.",
    "Create QR Codes\ninstantly.",
    "Get Paid in\n17 Countries.",
    "Send Payment Links\neverywhere.",
    "USD, JMD, CAD\nand more."
  ];

  const rotatingDescriptions = [
    "Free to download & accept payments in 17 countries. No monthly fees. Just 4.9% + 40¢ per transaction.",
    "Generate QR codes instantly for customers to scan and pay with their card.",
    "Receive payments directly to your bank account across 17 countries within 2 business days.",
    "Share payment links via WhatsApp, SMS, or email. Get paid wherever your customers are.",
    "Accept payments in multiple currencies across the Caribbean, Africa, and beyond."
  ];

  const rotatingImages = [
    "/webp/happy man.webp",
    "/webp/woman with phone.webp",
    "/webp/woman handypay.webp"
  ];

  // Rotating text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

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
    trackDownloadApp();

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
        trackGooglePlayClick();
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
        colors: ["#11AD30", "#22c55e", "#16a34a"],
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
    "@type": "SoftwareApplication",
    "name": "HandyPay",
    "description": "Mobile payment app for accepting card payments with QR codes and payment links in Jamaica",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "100",
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
      <section aria-label="Hero section" className="relative min-h-screen flex items-start px-4 pt-8 md:pt-16 pb-12 md:pb-20 w-full overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start w-full">
            {/* Mobile: Images at top, Desktop: Right Column - Rotating Images */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center md:justify-end relative h-full min-h-[250px] md:min-h-[380px] order-1 md:order-3 w-full"
            >
              <div className="rounded-3xl aspect-square w-full max-w-[380px] md:max-w-[480px] relative overflow-hidden mx-auto md:mx-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTextIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={rotatingImages[currentTextIndex % rotatingImages.length]}
                      alt={`Hero image ${(currentTextIndex % rotatingImages.length) + 1}`}
                      fill
                      className="object-cover rounded-3xl"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Left Column - Text Content */}
            <div className="text-left order-2 md:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 heading min-h-[180px] flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="whitespace-pre-line"
                >
                  {rotatingTexts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base text-neutral-600 mb-8 min-h-[3rem] flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="leading-relaxed"
                >
                  {rotatingDescriptions[currentTextIndex]}
            </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={IOS_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      const eventData = {
                        platform: "ios",
                        source: "hero_section",
                        device_type: isMobile() ? "mobile" : "desktop",
                      };
                      posthog.capture("app_download_clicked", eventData);
                      trackGAEvent("app_download_clicked", eventData);
                    }}
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
                  <a
                    href="https://play.google.com/store/apps/details?id=com.handypay.mobile&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      const eventData = {
                        platform: "android",
                        source: "hero_section",
                        device_type: isMobile() ? "mobile" : "desktop",
                      };
                      posthog.capture("app_download_clicked", eventData);
                      trackGAEvent("app_download_clicked", eventData);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-neutral-200/60 text-neutral-700 rounded-full text-sm hover:bg-white/90 hover:border-neutral-300 transition-all shadow-sm"
                  >
                    <Image
                      src="/webp/google-play-icon.webp"
                      alt="Google Play Store"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    <span>Get it on Google Play</span>
                  </a>
                </div>
                <a
                  href="#countries"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-full text-sm hover:bg-neutral-50 transition-colors"
                  onClick={() => {
                    const eventData = { link: "countries_info", location: "hero" };
                    posthog.capture("navigation_clicked", eventData);
                    trackGAEvent("navigation_clicked", eventData);
                  }}
                >
                  <Globe className="w-4 h-4" />
                  <span>17 Countries</span>
                </a>
              </div>

              {/* App Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-neutral-900">4.9</span>
                <span className="text-neutral-500 text-sm">(100) App Rating</span>
              </div>
            </motion.div>
           
              {/* Download Buttons - Commented out
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-4 mb-6 flex-wrap relative"
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
                  <span>Get the Beta App</span>
                </button>
                <AnimatePresence>
                  {showQRCode === "ios" && (
                    <motion.div
                      ref={iosQRRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-lg p-5 z-50 min-w-[200px]"
                    >
                      <div className="w-full aspect-square p-3 relative">
                        <QRCodeSVG value={QR_CODE_TRACKING_URL} className="w-full h-full" />
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
                    src="/webp/google-play-icon.webp" 
                    alt="Google Play Store logo" 
                    width={16} 
                    height={16}
                    className="w-4 h-4"
                  />
                  <span>Get the Beta App</span>
                </button>
                <AnimatePresence>
                  {showQRCode === "android" && (
                    <motion.div
                      ref={androidQRRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-lg p-5 z-50 min-w-[200px]"
                    >
                      <div className="w-full aspect-square p-3 relative">
                        <QRCodeSVG value={QR_CODE_TRACKING_URL} className="w-full h-full" />
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
            */}

              {/* Partners */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3"
            >
                <span className="text-sm text-neutral-600">Partnered with</span>
                <Image src="/stripe.svg" alt="Stripe" width={54} height={20} /> <span className="text-sm text-neutral-600">&</span>
                <Image src="/webp/wulogo.webp" alt="Western Union" width={54} height={20} />
            </motion.div>
          </div>

            {/* Middle Column - Vertical Loader */}
            <div className="hidden md:flex flex-col items-center justify-center py-8 order-2">
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-neutral-300 to-transparent relative">
                <motion.div
                  key={currentTextIndex}
                  className="absolute inset-0 bg-gradient-to-b from-[#11AD30] to-[#11AD30] rounded-full"
                  initial={{ scaleY: 0, opacity: 0.3 }}
                  animate={{
                    scaleY: [0, 1, 1, 0],
                    opacity: [0.3, 1, 1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.8, 1]
                  }}
                  style={{
                    transformOrigin: 'top'
                  }}
                />
              </div>
            </div>

          </div>
        </div>
        
        
        {/* <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 w-full flex justify-center"
        >
          <motion.a
            href="#get-started"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-neutral-500 text-black hover:bg-neutral-100 transition-colors cursor-pointer shadow-lg"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={(e) => {
              e.preventDefault();
              const getStartedSection = document.getElementById('get-started') || document.querySelector('[data-section="get-started"]');
              if (getStartedSection) {
                getStartedSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.a>
        </motion.div> */}
      </section>

      {/* Industries Section */}
      <IndustriesSection />

      {/* Demo Section */}
      <DemoSection />

      {/* Get Started Section - Hidden for now
      <GetStartedSection />
      */}

      

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 md:py-28 bg-white overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-light pointer-events-none" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left - Main Price */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#11AD30] mb-4 block">
                Pricing
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-6">
                4.9% <span className="text-3xl md:text-4xl lg:text-5xl">+ 40¢</span>
                <span className="block text-2xl md:text-3xl text-neutral-500 font-medium mt-2">per transaction</span>
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Free to download. No monthly fees. No setup costs. No hidden charges. 
                You only pay when you get paid.
              </p>
            </motion.div>

            {/* Right - Features Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { value: "$0", label: "Monthly fee" },
                { value: "$0", label: "Setup fee" },
                { value: "2-3 days", label: "Payout time" },
                { value: "All cards", label: "Visa, Mastercard, Amex" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="space-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-2xl font-bold text-neutral-900">{item.value}</div>
                  <div className="text-neutral-500 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* TODO: Accept Payments on Website & App Section - COMING SOON
          Uncomment when ready. The section code is in git history. */}

      {/* Global Reach Section */}
      <section id="countries" className="relative py-24 md:py-40 bg-neutral-50 overflow-hidden">
        {/* Large Background Globe */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] relative">
            <RotatingEarth width={1200} height={1200} className="w-full h-full" />
          </div>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-transparent to-neutral-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/80 via-transparent to-neutral-50/80" />

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-5xl px-6">
          <div className="text-center">
            <motion.span 
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#11AD30] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Global Reach
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-semibold text-neutral-900 mb-6 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Sign up from 17 countries.<br />
              <span className="text-neutral-500">Accept payments from anywhere.</span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Whether you&apos;re in Jamaica, Nigeria, the UK, or Canada—create your account and start accepting card payments from clients around the world.
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-neutral-900 mb-2">17</div>
                <div className="text-neutral-500 text-sm uppercase tracking-wider">Countries to sign up</div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-neutral-300" />
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-neutral-900 mb-2">195+</div>
                <div className="text-neutral-500 text-sm uppercase tracking-wider">Countries can pay you</div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-neutral-300" />
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-neutral-900 mb-2">17</div>
                <div className="text-neutral-500 text-sm uppercase tracking-wider">Currencies supported</div>
              </div>
            </motion.div>

            {/* Popular Countries */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {[
                { name: "Jamaica", slug: "jamaica", countryCode: "JM" },
                { name: "Nigeria", slug: "nigeria", countryCode: "NG" },
                { name: "Trinidad", slug: "trinidad-and-tobago", countryCode: "TT" },
                { name: "Ghana", slug: "ghana", countryCode: "GH" },
                { name: "USA", slug: "united-states", countryCode: "US" },
                { name: "Canada", slug: "canada", countryCode: "CA" },
              ].map((country) => (
                <a
                  key={country.slug}
                  href={`/countries/${country.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full text-sm text-neutral-700 hover:border-[#11AD30] hover:text-[#11AD30] transition-all"
                >
                  <FlagImage 
                    countryCode={country.countryCode} 
                    countryName={country.name} 
                    size="sm"
                  />
                  <span>{country.name}</span>
                </a>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="/countries"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#11AD30] text-white rounded-full font-medium hover:bg-[#0e9428] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              View all supported countries
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Merchant Tools Section
      <section className="py-32 bg-white overflow-x-hidden">
        <div className="container mx-auto max-w-6xl px-4 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-neutral-100 rounded-3xl aspect-square w-full relative overflow-hidden">
              <Image
                src="/webp/black man busines.webp"
                alt="Business owner using HandyPay"
                fill
                className="object-cover"
              />
                </div>
            <div>
              <span className="text-neutral-500 text-sm font-medium tracking-wider uppercase mb-4 block">MERCHANT TOOLS</span>
              <h2 className="text-4xl md:text-5xl font-medium mb-6 heading tracking-tight">
                Give your business
                <br />
                superpowers
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Empower your business with automatic payouts, instant notifications, and real-time sales tracking.
              </p>
              <a href="/businesses" className="inline-flex items-center justify-center px-8 py-3 border border-black text-black rounded-full font-medium hover:bg-neutral-50 transition-colors cursor-pointer">
                Learn More
              </a>
            </div>
                      </div>
                    </div>
      </section>

      Teenagers Business Section
      <section className="py-32 bg-white overflow-x-hidden">
        <div className="container mx-auto max-w-6xl px-4 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-neutral-500 text-sm font-medium tracking-wider uppercase mb-4 block">YOUTH EMPOWERMENT</span>
              <h2 className="text-4xl md:text-5xl font-medium mb-6 heading tracking-tight">
                Empowering teenagers
                <br />
                to do business
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Give young entrepreneurs the tools they need to start and grow their businesses. From school fundraisers to side hustles, HandyPay makes it easy for teens to accept payments and build financial confidence.
              </p>
              <a href="/individuals" className="inline-flex items-center justify-center px-8 py-3 border border-black text-black rounded-full font-medium hover:bg-neutral-50 transition-colors cursor-pointer">
                Learn More
              </a>
            </div>
            <div className="bg-neutral-100 rounded-3xl aspect-square w-full relative overflow-hidden">
              <Image
                src="/webp/generated teenagers.webp"
                alt="Teen entrepreneurs using HandyPay"
                fill
                className="object-cover"
              />
            </div>
                      </div>
                    </div>
      </section> */}

          {/* Testimonials Section */}
      <section id="testimonials" aria-label="Customer testimonials" className="relative py-32 bg-neutral-50 overflow-x-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container mx-auto max-w-6xl px-4 w-full relative z-10">
            <motion.div 
              className="text-center mb-16 space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl text-left md:text-center lg:text-6xl font-bold tracking-tight text-balance heading">
                Entrepreneurs love HandyPay
              </h2>
              <p className="text-lg md:text-xl text-left md:text-center text-neutral-600 max-w-3xl mx-auto text-balance leading-relaxed">
                Accept payments with QR codes and payment links, directly to your bank account or Western Union. <strong>Free to download. 4.9% + 40¢ per transaction.</strong>
              </p>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="flex flex-col gap-6">
                {/* Keisha Williams Card */}
                <div className="bg-white p-6 border border-neutral-200" style={{ borderRadius: '16px 6px 16px 6px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-medium text-neutral-900">Keisha Williams</span>
                    <Image 
                      src="/webp/verified-badge.webp"
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
                      src="/webp/verified-badge.webp"
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
                      src="/webp/verified-badge.webp"
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
                      src="/webp/verified-badge.webp"
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
                      src="/webp/verified-badge.webp"
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
                      src="/webp/verified-badge.webp"
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
          </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white border-t border-neutral-100 overflow-x-hidden">
        <div className="container mx-auto max-w-6xl px-4 w-full">
          <div className="grid md:grid-cols-12 gap-12">
            <motion.div 
              className="md:col-span-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-medium heading tracking-tight mb-4">
                Frequently Asked
                <br />
                Questions
              </h2>
              
              <a href="/faqs" className="text-[#11AD30] font-medium hover:text-[#2ea04a] flex items-center gap-2 mt-8 transition-colors">
                See More FAQs
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </motion.div>
            <motion.div 
              className="md:col-span-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-0">
                {[
                  {
                    q: "How much does HandyPay cost?",
                    a: "HandyPay is free to download and use. We only charge 4.9% + 40¢ per transaction—no monthly fees, no setup fees, no hidden costs."
                  },
                  {
                    q: "Is HandyPay safe?",
                    a: "Yes, HandyPay uses bank-grade encryption and security measures to protect your data and transactions."
                  },
                  {
                    q: "What networks does HandyPay support?",
                    a: "HandyPay works with all major card networks including Visa, Mastercard, American Express, and Discover. We also support Apple Pay and Google Pay."
                  }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-neutral-200">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                      className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                    >
                      <span className="text-xl font-medium text-neutral-900">{faq.q}</span>
                      <span className="flex-shrink-0 ml-4">
                        <motion.div
                          animate={{ rotate: openFaqIndex === i ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-6 h-6 text-[#11AD30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </motion.div>
                      </span>
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-neutral-600 pb-6 leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
