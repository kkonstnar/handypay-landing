/**
 * Google Ads Conversion Tracking Utility
 * Track conversions for Join Waitlist, Download App, and Google Play button clicks
 */

declare global {
  function gtag(command: string, targetId: string, config?: Record<string, unknown>): void;
}

export const trackConversion = (conversionLabel: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-XXXXXXX'}/${conversionLabel}`,
      value: value || 0,
      currency: 'JMD'
    });
  }
};

// Predefined conversion actions
export const CONVERSION_ACTIONS = {
  JOIN_WAITLIST: 'JOIN_WAITLIST', // Replace with actual conversion label from Google Ads
  DOWNLOAD_APP: 'DOWNLOAD_APP', // Replace with actual conversion label from Google Ads
  GOOGLE_PLAY_CLICK: 'GOOGLE_PLAY_CLICK' // Replace with actual conversion label from Google Ads
} as const;

export const trackJoinWaitlist = () => trackConversion(CONVERSION_ACTIONS.JOIN_WAITLIST);
export const trackDownloadApp = () => trackConversion(CONVERSION_ACTIONS.DOWNLOAD_APP);
export const trackGooglePlayClick = () => trackConversion(CONVERSION_ACTIONS.GOOGLE_PLAY_CLICK);
