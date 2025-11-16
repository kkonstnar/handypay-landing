"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  initGA,
  trackGAEvent,
  trackGAPageView,
} from "@/lib/google-analytics";
import {
  getDeviceInfo,
  getUTMParams,
  getStoredUTMParams,
} from "@/lib/tracking-utils";

export function GoogleAnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageStartTime = useRef<number>(Date.now());
  const maxScrollPercent = useRef<number>(0);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Initialize GA when script loads
  const handleScriptLoad = () => {
    if (measurementId) {
      initGA(measurementId);
    }
  };

  // Track pageviews on route changes
  useEffect(() => {
    if (!measurementId || typeof window === "undefined" || !window.gtag) return;

    const currentPageName = pathname === "/" ? "home" : pathname.replace("/", "");
    pageStartTime.current = Date.now();
    maxScrollPercent.current = 0;

    let url = window.origin + pathname;
    if (searchParams && searchParams.toString()) {
      url = url + `?${searchParams.toString()}`;
    }

    // Track pageview
    trackGAPageView(pathname, currentPageName);

    // Track pageview event with additional data
    trackGAEvent("page_view", {
      page_title: currentPageName,
      page_location: url,
      page_path: pathname,
      ...getDeviceInfo(),
      ...getUTMParams(),
      ...getStoredUTMParams(),
    });

    // Track scroll depth for drop-off analysis
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );
      maxScrollPercent.current = Math.max(maxScrollPercent.current, scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track time on page and drop-off when leaving
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
      
      trackGAEvent("time_on_page", {
        page: currentPageName,
        time_spent_seconds: timeSpent,
        max_scroll_percent: maxScrollPercent.current,
        ...getDeviceInfo(),
        ...getStoredUTMParams(),
      });

      trackGAEvent("drop_off", {
        page: currentPageName,
        max_scroll_percent: maxScrollPercent.current,
        time_spent_seconds: timeSpent,
        ...getDeviceInfo(),
        ...getStoredUTMParams(),
      });
    };

    // Track visibility change (tab switch, minimize, etc.)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
        trackGAEvent("time_on_page", {
          page: currentPageName,
          time_spent_seconds: timeSpent,
          ...getDeviceInfo(),
          ...getStoredUTMParams(),
        });
      } else {
        pageStartTime.current = Date.now(); // Reset timer when tab becomes visible
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Track time spent when component unmounts (route change)
      const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
      trackGAEvent("time_on_page", {
        page: currentPageName,
        time_spent_seconds: timeSpent,
        max_scroll_percent: maxScrollPercent.current,
        ...getDeviceInfo(),
        ...getStoredUTMParams(),
      });
    };
  }, [pathname, searchParams, measurementId]);

  // Track all clicks on the page
  useEffect(() => {
    if (!measurementId || typeof window === "undefined" || !window.gtag) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Track email links
      if (target.tagName === "A") {
        const href = (target as HTMLAnchorElement).href;
        if (href && href.startsWith("mailto:")) {
          const email = href.replace("mailto:", "").split("?")[0];
          trackGAEvent("email_link_clicked", {
            email: email,
            context: target.textContent?.trim() || "unknown",
            ...getDeviceInfo(),
            ...getUTMParams(),
            ...getStoredUTMParams(),
          });
          return;
        }

        // Track external links
        if (href && !href.startsWith(window.location.origin)) {
          trackGAEvent("external_link_clicked", {
            url: href,
            link_text: target.textContent?.trim() || "",
            ...getDeviceInfo(),
            ...getUTMParams(),
            ...getStoredUTMParams(),
          });
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [measurementId]);

  if (!measurementId) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        onLoad={handleScriptLoad}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {children}
    </>
  );
}

