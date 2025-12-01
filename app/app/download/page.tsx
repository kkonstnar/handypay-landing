"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { trackGAEvent } from "@/lib/google-analytics";

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

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const IOS_APP_URL = process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/jm/app/handypay/id6751820310";
const ANDROID_APP_URL = process.env.NEXT_PUBLIC_ANDROID_APP_URL || "https://play.google.com/store/apps/details?id=com.handypay";
const APP_URL = process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/jm/app/handypay/id6751820310";

function DownloadPageInner() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "qr_code";

  useEffect(() => {
    // Track QR code scan event
    const deviceType = isMobile() ? "mobile" : "desktop";
    const os = getMobileOS();
    
    const scanEventData = {
      source: source,
      device_type: deviceType,
      platform: os || "unknown",
      scan_method: "qr_code",
    };

    // Track to both PostHog and Google Analytics
    posthog.capture("qr_code_scanned", scanEventData);
    trackGAEvent("qr_code_scanned", scanEventData);

    // Determine redirect URL based on device
    let redirectUrl = APP_URL;
    
    if (os === "ios") {
      redirectUrl = IOS_APP_URL;
      
      // Track iOS download redirect
      const redirectData = {
        platform: "ios",
        source: source,
        redirect_type: "qr_code_scan",
        device_type: deviceType,
      };
      posthog.capture("app_download_redirected", redirectData);
      trackGAEvent("app_download_redirected", redirectData);
    } else if (os === "android") {
      redirectUrl = ANDROID_APP_URL;
      
      // Track Android download redirect
      const redirectData = {
        platform: "android",
        source: source,
        redirect_type: "qr_code_scan",
        device_type: deviceType,
      };
      posthog.capture("app_download_redirected", redirectData);
      trackGAEvent("app_download_redirected", redirectData);
    } else {
      // Track other platform redirect
      const redirectData = {
        platform: "other",
        source: source,
        redirect_type: "qr_code_scan",
        device_type: deviceType,
      };
      posthog.capture("app_download_redirected", redirectData);
      trackGAEvent("app_download_redirected", redirectData);
    }

    // Small delay to ensure tracking events are sent before redirect
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 100);
  }, [source]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3AB75C] mx-auto mb-4"></div>
        <p className="text-neutral-600">Redirecting to app store...</p>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3AB75C] mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    }>
      <DownloadPageInner />
    </Suspense>
  );
}

