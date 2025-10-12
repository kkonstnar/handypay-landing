import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetAppButton } from "@/components/get-app-button";

export function SiteHeader() {
  return (
    <header className="w-full py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/handypay-full.svg" alt="HandyPay" width={120} height={32} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-neutral-700">
          <a href="#features" className="hover:text-black">Cards</a>
          <a href="#features" className="hover:text-black">Features</a>
        </nav>
        <div className="flex items-center gap-2">
          <GetAppButton />
        </div>
      </div>
    </header>
  );
}
