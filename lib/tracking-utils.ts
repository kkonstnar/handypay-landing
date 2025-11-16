"use client";

import posthog from "posthog-js";

/**
 * Utility functions for comprehensive tracking
 */

// Get device and OS information
export function getDeviceInfo() {
  if (typeof window === "undefined") {
    return {
      device_type: "unknown",
      os: "unknown",
      browser: "unknown",
      screen_width: 0,
      screen_height: 0,
    };
  }

  const userAgent = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
  const isTablet =
    /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);

  let deviceType = "desktop";
  if (isMobile) deviceType = "mobile";
  else if (isTablet) deviceType = "tablet";

  // Detect OS
  let os = "unknown";
  if (/Windows/i.test(userAgent)) os = "Windows";
  else if (/Mac/i.test(userAgent)) os = "macOS";
  else if (/Linux/i.test(userAgent)) os = "Linux";
  else if (/Android/i.test(userAgent)) os = "Android";
  else if (/iOS|iPhone|iPad|iPod/i.test(userAgent)) os = "iOS";

  // Detect Browser
  let browser = "unknown";
  if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) browser = "Chrome";
  else if (/Firefox/i.test(userAgent)) browser = "Firefox";
  else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent))
    browser = "Safari";
  else if (/Edg/i.test(userAgent)) browser = "Edge";

  return {
    device_type: deviceType,
    os,
    browser,
    screen_width: window.screen.width,
    screen_height: window.screen.height,
  };
}

// Extract UTM parameters from URL
export function getUTMParams() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ].forEach((param) => {
    const value = params.get(param);
    if (value) utmParams[param] = value;
  });

  return utmParams;
}

// Store UTM parameters in sessionStorage for later use
export function storeUTMParams() {
  if (typeof window === "undefined") return;

  const utmParams = getUTMParams();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem("utm_params", JSON.stringify(utmParams));

    // Also set as PostHog person properties
    if (posthog.__loaded) {
      posthog.identify(undefined, utmParams);
    }
  }
}

// Get stored UTM parameters
export function getStoredUTMParams() {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem("utm_params");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Track time spent on page
export function trackTimeOnPage(pageName: string, startTime: number) {
  const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds

  posthog.capture("time_on_page", {
    page: pageName,
    time_spent_seconds: timeSpent,
    ...getDeviceInfo(),
    ...getStoredUTMParams(),
  });
}

// Track click-away (user leaving page)
export function trackClickAway(pageName: string, startTime: number) {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);

  posthog.capture("click_away", {
    page: pageName,
    time_spent_seconds: timeSpent,
    exit_method: "navigation", // or "close_tab", "reload", etc.
    ...getDeviceInfo(),
    ...getStoredUTMParams(),
  });
}

// Track drop-off point (where user scrolled before leaving)
export function trackDropOff(
  pageName: string,
  maxScrollPercent: number,
  startTime: number
) {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);

  posthog.capture("drop_off", {
    page: pageName,
    max_scroll_percent: maxScrollPercent,
    time_spent_seconds: timeSpent,
    ...getDeviceInfo(),
    ...getStoredUTMParams(),
  });
}

// Track email link clicks
export function trackEmailClick(email: string, context?: string) {
  posthog.capture("email_link_clicked", {
    email: email, // Consider hashing for privacy
    context: context || "unknown",
    ...getDeviceInfo(),
    ...getStoredUTMParams(),
  });
}

// Track external link clicks
export function trackExternalLink(url: string, linkText?: string) {
  posthog.capture("external_link_clicked", {
    url: url,
    link_text: linkText,
    ...getDeviceInfo(),
    ...getStoredUTMParams(),
  });
}

// Track all clicks (comprehensive click tracking)
export function trackClick(element: HTMLElement, eventType: string = "click") {
  const tagName = element.tagName.toLowerCase();
  const id = element.id || null;
  const className = element.className || null;
  const text = element.textContent?.trim().substring(0, 100) || null;
  const href = (element as HTMLAnchorElement).href || null;

  posthog.capture("element_clicked", {
    tag_name: tagName,
    element_id: id,
    element_class: className,
    element_text: text,
    href: href,
    event_type: eventType,
    ...getDeviceInfo(),
    ...getStoredUTMParams(),
  });
}
