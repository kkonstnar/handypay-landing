"use client";

/**
 * Google Analytics 4 (GA4) Utilities
 *
 * For Google Ads integration and additional analytics
 * Tracks the same events as PostHog for consistency
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
    dataLayer: unknown[];
  }
}

// Initialize Google Analytics
export function initGA(measurementId: string) {
  if (typeof window === "undefined") return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.gtag = function (...args: any[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    page_path: window.location.pathname,
  });
}

// Track event to Google Analytics
export function trackGAEvent(
  eventName: string,
  parameters?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    const eventParams: Record<string, unknown> = {
      ...(parameters || {}),
    };

    // Ensure UTM parameters are included
    if (parameters?.utm_source) {
      eventParams.campaign_source = parameters.utm_source;
    }
    if (parameters?.utm_medium) {
      eventParams.campaign_medium = parameters.utm_medium;
    }
    if (parameters?.utm_campaign) {
      eventParams.campaign_name = parameters.utm_campaign;
    }

    window.gtag("event", eventName, eventParams);
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
