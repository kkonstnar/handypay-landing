"use client";

/**
 * Google Analytics 4 (GA4) Utilities
 *
 * For Google Ads integration and additional analytics
 * Tracks the same events as PostHog for consistency
 */

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export function initGA(measurementId: string) {
  if (typeof window === "undefined") return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    page_path: window.location.pathname,
  });
}

// Track event to Google Analytics
export function trackGAEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    window.gtag("event", eventName, {
      ...parameters,
      // Ensure UTM parameters are included
      ...(parameters?.utm_source && { campaign_source: parameters.utm_source }),
      ...(parameters?.utm_medium && { campaign_medium: parameters.utm_medium }),
      ...(parameters?.utm_campaign && {
        campaign_name: parameters.utm_campaign,
      }),
    });
  } catch (error) {
    console.error("Google Analytics tracking error:", error);
  }
}

// Track pageview
export function trackGAPageView(url: string, title?: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
      page_path: url,
      page_title: title,
    });
  } catch (error) {
    console.error("Google Analytics pageview error:", error);
  }
}

// Track conversion event (for Google Ads)
export function trackGAConversion(
  conversionLabel: string,
  value?: number,
  currency: string = "USD"
) {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    window.gtag("event", "conversion", {
      send_to: conversionLabel,
      value: value,
      currency: currency,
    });
  } catch (error) {
    console.error("Google Analytics conversion error:", error);
  }
}
