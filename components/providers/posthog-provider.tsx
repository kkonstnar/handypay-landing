"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { initPostHog } from "@/lib/posthog";
import {
  getDeviceInfo,
  getUTMParams,
  storeUTMParams,
  trackTimeOnPage,
  trackClickAway,
  trackDropOff,
} from "@/lib/tracking-utils";

function PostHogProviderInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageStartTime = useRef<number>(Date.now());
  const maxScrollPercent = useRef<number>(0);
  const pageName = useRef<string>("");

  useEffect(() => {
    initPostHog();
    
    // Store UTM parameters on initial load
    if (typeof window !== "undefined") {
      storeUTMParams();
    }
  }, []);

  useEffect(() => {
    // Track pageviews on route changes
    if (pathname && posthog.__loaded && typeof window !== "undefined") {
      const currentPageName = pathname === "/" ? "home" : pathname.replace("/", "");
      pageName.current = currentPageName;
      pageStartTime.current = Date.now();
      maxScrollPercent.current = 0;

      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      // Store UTM params if present
      storeUTMParams();

      // Track pageview with device info and UTM params
      posthog.capture("$pageview", {
        $current_url: url,
        page: currentPageName,
        ...getDeviceInfo(),
        ...getUTMParams(),
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
        trackTimeOnPage(currentPageName, pageStartTime.current);
        trackDropOff(currentPageName, maxScrollPercent.current, pageStartTime.current);
        trackClickAway(currentPageName, pageStartTime.current);
      };

      // Track visibility change (tab switch, minimize, etc.)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          trackTimeOnPage(currentPageName, pageStartTime.current);
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
        trackTimeOnPage(currentPageName, pageStartTime.current);
        trackDropOff(currentPageName, maxScrollPercent.current, pageStartTime.current);
      };
    }
  }, [pathname, searchParams]);

  // Track all clicks on the page
  useEffect(() => {
    if (typeof window === "undefined" || !posthog.__loaded) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Track email links
      if (target.tagName === "A") {
        const href = (target as HTMLAnchorElement).href;
        if (href && href.startsWith("mailto:")) {
          const email = href.replace("mailto:", "").split("?")[0];
          posthog.capture("email_link_clicked", {
            email: email,
            context: target.textContent?.trim() || "unknown",
            ...getDeviceInfo(),
            ...getUTMParams(),
          });
          return;
        }

        // Track external links
        if (href && !href.startsWith(window.location.origin)) {
          posthog.capture("external_link_clicked", {
            url: href,
            link_text: target.textContent?.trim() || "",
            ...getDeviceInfo(),
            ...getUTMParams(),
          });
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return <>{children}</>;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <PostHogProviderInner>{children}</PostHogProviderInner>
    </Suspense>
  );
}

