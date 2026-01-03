"use client";

import Image from "next/image";

const IOS_APP_URL = process.env.NEXT_PUBLIC_IOS_APP_URL || "https://apps.apple.com/jm/app/handypay/id6751820310";
const ANDROID_APP_URL = process.env.NEXT_PUBLIC_ANDROID_APP_URL || "https://play.google.com/store/apps/details?id=com.handypay.mobile&hl=en";

export function CountryPageClient() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={IOS_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full font-medium transition-colors"
      >
        <Image
          src="/apple.svg"
          alt="Apple App Store"
          width={18}
          height={18}
          className="w-[18px] h-[18px] invert"
        />
        <span>Download on App Store</span>
      </a>
      <a
        href={ANDROID_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 bg-white/70 backdrop-blur-sm border border-neutral-200/60 text-neutral-700 rounded-full font-medium hover:bg-white/90 hover:border-neutral-300 transition-all shadow-sm"
      >
        <Image
          src="/webp/google-play-icon.webp"
          alt="Google Play Store"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
        <span>Get it on Google Play</span>
      </a>
    </div>
  );
}

