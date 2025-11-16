"use client";

import posthog from "posthog-js";

/**
 * PostHog Initialization
 *
 * This landing page uses the SAME PostHog project as the mobile app.
 * PostHog automatically tags events with library type:
 * - Web events: $lib = "posthog-js"
 * - Mobile events: $lib = "posthog-react-native"
 *
 * This allows you to:
 * - See the full user journey (web → mobile) in one place
 * - Filter by $lib property to separate web vs mobile events
 * - Use unified dashboards
 *
 * API Key: Uses mobile app's PostHog project key
 * Can be overridden with NEXT_PUBLIC_POSTHOG_KEY environment variable
 */
export function initPostHog() {
  if (typeof window === "undefined") return null;

  // Use same PostHog project as mobile app (can be overridden via env var)
  const apiKey =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    "phc_n5IVXNCgQe9a2tT4VfPIeGDNdOgNT9NMBmPFZ5wkGLN";
  const apiHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

  if (!posthog.__loaded) {
    posthog.init(apiKey, {
      api_host: apiHost,
      // Privacy-focused session recording
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "*",
      },
      // Only capture in production
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "production") {
          posthog.opt_in_capturing();
        }
      },
      // Capture pageviews automatically
      capture_pageview: false, // We handle this manually in PostHogProvider
      capture_pageleave: true,
      // Disable autocapture in development
      autocapture: process.env.NODE_ENV === "production",
    });
  }

  return posthog;
}

// Safe wrapper for capturing events
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (typeof window === "undefined") return;

  try {
    if (posthog.__loaded) {
      posthog.capture(eventName, properties);
    } else {
      // Queue event if PostHog isn't loaded yet
      initPostHog();
      if (posthog.__loaded) {
        posthog.capture(eventName, properties);
      }
    }
  } catch (error) {
    console.error("PostHog tracking error:", error);
  }
}
