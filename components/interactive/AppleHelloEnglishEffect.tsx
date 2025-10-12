"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AppleHelloEnglishEffect({ speed = 1, className, onAnimationComplete }: { speed?: number; className?: string; onAnimationComplete?: () => void }) {
  const duration = 2 / speed;
  return (
    <motion.svg
      viewBox="0 0 500 140"
      className={cn("mx-auto w-[320px] md:w-[420px]", className)}
      fill="none"
      aria-label="Hello"
    >
      <motion.path
        d="M30 100 C 40 40, 80 40, 90 100"
        stroke="#111"
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut" }}
      />
      <motion.path d="M110 60 V100" stroke="#111" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration, ease: "easeInOut", delay: 0.1 }} />
      <motion.path d="M140 60 V100" stroke="#111" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration, ease: "easeInOut", delay: 0.2 }} />
      <motion.path d="M210 60 V100" stroke="#111" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration, ease: "easeInOut", delay: 0.3 }} />
      <motion.path d="M240 60 V100" stroke="#111" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration, ease: "easeInOut", delay: 0.35 }} />
      <motion.path d="M300 60 C 320 40, 360 40, 380 60" stroke="#111" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration, ease: "easeInOut", delay: 0.45 }} />
      <motion.path d="M430 60 V100" stroke="#111" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration, ease: "easeInOut", delay: 0.55 }} onAnimationComplete={onAnimationComplete} />
    </motion.svg>
  );
}
