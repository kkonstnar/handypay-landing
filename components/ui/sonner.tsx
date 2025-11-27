"use client"

import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-center"
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4 text-green-600" />,
        info: <Info className="h-4 w-4 text-blue-600" />,
        warning: <TriangleAlert className="h-4 w-4 text-yellow-600" />,
        error: <OctagonX className="h-4 w-4 text-red-600" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin text-gray-600" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast bg-white text-gray-900 border border-gray-200 shadow-lg",
          description: "text-gray-600",
          actionButton: "bg-black text-white hover:bg-gray-800",
          cancelButton: "bg-gray-100 text-gray-600 hover:bg-gray-200",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
