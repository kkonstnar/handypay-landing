"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function getMobileOS() {
  if (typeof navigator === "undefined") return null;
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

// TODO: Replace with actual app store URLs
const IOS_APP_URL = process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/app/handypay";
const ANDROID_APP_URL = process.env.NEXT_PUBLIC_ANDROID_APP_URL || "https://play.google.com/store/apps/details?id=com.handypay";
const APP_URL = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || "https://tryhandypay.org/app";

export function GetAppButton() {
  const [showQRCode, setShowQRCode] = React.useState(false);
  const qrRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isMobile()) {
      const os = getMobileOS();
      if (os === "ios") {
        window.location.href = IOS_APP_URL;
      } else if (os === "android") {
        window.location.href = ANDROID_APP_URL;
      } else {
        // Fallback for other mobile devices
        window.location.href = APP_URL;
      }
    } else {
      // Desktop: toggle QR code visibility
      setShowQRCode(!showQRCode);
    }
  };

  // Close QR code when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showQRCode &&
        qrRef.current &&
        buttonRef.current &&
        !qrRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowQRCode(false);
      }
    };

    if (showQRCode) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQRCode]);

  return (
    <div className="relative">
      <Button 
        ref={buttonRef}
        onClick={handleClick} 
        variant="ghost" 
        size="sm" 
        aria-label="Get the app" 
        title="Get the app" 
        className="text-black hover:bg-neutral-100 cursor-pointer"
      >
        Get the app
        <Smartphone className="ml-2 h-4 w-4" />
      </Button>
      
      <AnimatePresence>
        {showQRCode && (
          <motion.div
            ref={qrRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-lg p-5 z-50 min-w-[200px]"
          >
            <div className="w-full aspect-square p-3 relative">
              <QRCodeSVG value={APP_URL} className="w-full h-full" />
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
  );
}
