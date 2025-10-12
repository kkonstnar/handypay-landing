"use client";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone } from "lucide-react";

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
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[320px]">
          <Dialog.Title className="text-lg font-semibold mb-2">Scan to download</Dialog.Title>
          <div className="flex items-center justify-center py-4">
            <QRCodeSVG value={APP_URL} size={200} includeMargin />
          </div>
          <p className="text-sm text-neutral-600 mb-4 break-all">{APP_URL}</p>
          <div className="flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
