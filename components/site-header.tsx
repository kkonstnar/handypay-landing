import Image from "next/image";
import Link from "next/link";
import { GetAppButton } from "@/components/get-app-button";
import { Instagram } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="w-full py-4">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/handypay-full.svg" alt="HandyPay" width={120} height={32} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-neutral-700">
          <a href="#features" className="hover:text-black">Features</a>
          <a href="#testimonials" className="hover:text-black">Testmonials</a>
          <div className="flex items-center gap-3">
            <a 
              href="https://www.instagram.com/handypay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-black transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.tiktok.com/@handypay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-black transition-colors cursor-pointer"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <GetAppButton />
        </div>
      </div>
    </header>
  );
}
