import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/handypay.svg" alt="HandyPay" width={24} height={24} />
          <p className="text-sm text-neutral-600">© {new Date().getFullYear()} HandyPay</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/terms">Terms</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/privacy">Privacy</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/delete-account">Delete Account</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
