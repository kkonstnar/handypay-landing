"use client";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone, X } from "lucide-react";

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const APP_URL = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || "https://tryhandypay.org/app";

export function GetAppButton() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (isMobile()) {
      window.location.href = APP_URL;
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Button onClick={handleClick} variant="ghost" size="sm" aria-label="Get the app" title="Get the app" className="text-black hover:bg-neutral-100 cursor-pointer">
        Get the app
        <Smartphone className="ml-2 h-4 w-4" />
      </Button>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md w-[320px] md:w-[360px] p-5">
          <Dialog.Title className="sr-only">Scan to download</Dialog.Title>
          <Dialog.Close asChild>
            <button aria-label="Close" className="absolute top-3 right-3 text-neutral-500 hover:text-black cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>
          <div className="w-full">
            <div className="w-full aspect-square p-3">
              <QRCodeSVG value={APP_URL} className="w-full h-full" />
            </div>
            <p className="text-center text-base font-medium mt-2">Scan to download</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
