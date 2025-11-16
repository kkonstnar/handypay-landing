import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const sfRoundedHeading = localFont({ src: "../public/fonts/SF-Pro-Rounded-Regular.otf", variable: "--font-heading" });
const sfRounded = localFont({ src: "../public/fonts/SF-Pro-Rounded-Regular.otf", variable: "--font-body" });

export const metadata: Metadata = {
  title: "HandyPay",
  description: "HandyPay makes it easy for anyone to accept digital payments with QR codes and payment links, directly to their Jamaican bank account or Western Union.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfRoundedHeading.variable} ${sfRounded.variable} antialiased bg-white text-black`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
