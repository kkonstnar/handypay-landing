"use client";

import Image from "next/image";
import { getFlagUrl } from "@/lib/countries-data";

interface FlagImageProps {
  countryCode: string;
  countryName: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeConfig = {
  sm: { width: 20, height: 15, cdnSize: "w20" as const },
  md: { width: 32, height: 24, cdnSize: "w40" as const },
  lg: { width: 48, height: 36, cdnSize: "w80" as const },
  xl: { width: 80, height: 60, cdnSize: "w160" as const },
};

export function FlagImage({ countryCode, countryName, size = "md", className = "" }: FlagImageProps) {
  const config = sizeConfig[size];
  
  return (
    <Image
      src={getFlagUrl(countryCode, config.cdnSize)}
      alt={`${countryName} flag`}
      width={config.width}
      height={config.height}
      className={`inline-block rounded-sm shadow-sm ${className}`}
      unoptimized // Use CDN directly
    />
  );
}

