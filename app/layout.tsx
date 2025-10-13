import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const coolvetica = localFont({ src: "../public/fonts/coolvetica-rg.ttf", variable: "--font-heading" });
const dmsans = localFont({ src: "../public/fonts/DMSans-Medium.ttf", variable: "--font-body" });

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
      <body className={`${coolvetica.variable} ${dmsans.variable} antialiased bg-white text-black`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
