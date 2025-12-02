import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tryhandypay.com";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HandyPay - Accept Card Payments with QR Codes in Jamaica",
    short_name: "HandyPay",
    description:
      "Accept digital payments with QR codes and payment links in Jamaica. Get paid directly to your Jamaican bank account or Western Union.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#11AD30",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    categories: ["finance", "business"],
    lang: "en-JM",
    dir: "ltr",
    orientation: "portrait-primary",
    scope: "/",
    id: siteUrl,
  };
}
