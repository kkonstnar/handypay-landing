"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import posthog from "posthog-js";
import { trackGAEvent } from "@/lib/google-analytics";
import { trackDownloadApp } from "@/lib/google-ads";

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const IOS_APP_URL = process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/jm/app/handypay/id6751820310";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tryhandypay.com";
const QR_CODE_TRACKING_URL = `${siteUrl}/app/download?source=header_button`;

interface GetAppButtonProps {
  variant?: "default" | "rounded";
}

export function GetAppButton({ variant = "default" }: GetAppButtonProps) {
  const [showQRCode, setShowQRCode] = React.useState(false);
  const qrRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    // Track button click to both PostHog and Google Analytics
    const buttonEventData = {
      location: "header",
      device_type: isMobile() ? "mobile" : "desktop",
    };
    posthog.capture("get_app_button_clicked", buttonEventData);
    trackGAEvent("get_app_button_clicked", buttonEventData);

    if (isMobile()) {
      // On mobile, redirect directly to App Store
      const downloadData = {
        platform: "ios",
        source: "header_button",
        device_type: "mobile",
      };
      const redirectData = {
        platform: "ios",
        source: "header_button",
        redirect_type: "app_store",
      };
      posthog.capture("app_download_clicked", downloadData);
      trackGAEvent("app_download_clicked", downloadData);
      trackDownloadApp();
      posthog.capture("app_download_redirected", redirectData);
      trackGAEvent("app_download_redirected", redirectData);
      window.location.href = IOS_APP_URL;
    } else {
      // Desktop: toggle QR code visibility
      setShowQRCode(!showQRCode);
      if (!showQRCode) {
        const qrData = {
          source: "header_button",
          platform: "desktop",
        };
        posthog.capture("qr_code_shown", qrData);
        trackGAEvent("qr_code_shown", qrData);
      }
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
        variant={variant === "rounded" ? "default" : "ghost"}
        size="sm" 
        aria-label="Get the app" 
        title="Get the app" 
        className={
          variant === "rounded"
            ? "bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-[13px] cursor-pointer"
            : "text-black hover:bg-neutral-100 cursor-pointer"
        }
      >
        {variant === "rounded" ? "Get App" : "Download the app"}
        <Smartphone className="ml-2 h-4 w-4" color={variant === "rounded" ? "white" : "black"} />
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
  );
}
