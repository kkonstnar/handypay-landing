"use client";

/**
 * Unified Tracking Utility
 *
 * Tracks events to both PostHog and Google Analytics simultaneously
 * Ensures consistency across analytics platforms
 */

import posthog from "posthog-js";
import { trackGAEvent } from "./google-analytics";
import {
  getDeviceInfo,
  getUTMParams,
  getStoredUTMParams,
} from "./tracking-utils";

interface TrackEventOptions {
  // Event name
  eventName: string;
  // Event properties
  properties?: Record<string, unknown>;
  // Whether to track to PostHog (default: true)
  trackPostHog?: boolean;
  // Whether to track to Google Analytics (default: true)
  trackGA?: boolean;
}

/**
 * Track event to both PostHog and Google Analytics
 */
export function trackEvent({
  eventName,
  properties = {},
  trackPostHog = true,
  trackGA = true,
}: TrackEventOptions) {
  // Add device info and UTM params to all events
  const enrichedProperties = {
    ...properties,
    ...getDeviceInfo(),
    ...getUTMParams(),
    ...getStoredUTMParams(),
  };

  // Track to PostHog
  if (trackPostHog && typeof window !== "undefined" && posthog.__loaded) {
    try {
      posthog.capture(eventName, enrichedProperties);
    } catch (error) {
      console.error("PostHog tracking error:", error);
    }
  }

  // Track to Google Analytics
  if (trackGA && typeof window !== "undefined") {
    try {
      trackGAEvent(eventName, enrichedProperties);
    } catch (error) {
      console.error("Google Analytics tracking error:", error);
    }
  }
}

/**
 * Track conversion event (for Google Ads)
 */
export function trackConversion(
  conversionLabel: string,
  value?: number,
  currency: string = "USD"
) {
  if (typeof window === "undefined") return;

  // Track to Google Analytics as conversion
  if (window.gtag) {
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

  // Also track as regular event to PostHog
  if (posthog.__loaded) {
    try {
      posthog.capture("conversion", {
        conversion_label: conversionLabel,
        value: value,
        currency: currency,
        ...getDeviceInfo(),
        ...getStoredUTMParams(),
      });
    } catch (error) {
      console.error("PostHog conversion tracking error:", error);
    }
  }
}
