"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PhoneWord({ speed = 1, className }: { speed?: number; className?: string }) {
  const textRef = useRef<SVGTextElement | null>(null);
  const [length, setLength] = useState(300);

  useEffect(() => {
    if (textRef.current) {
      try {
        const l = textRef.current.getComputedTextLength();
        if (Number.isFinite(l) && l > 0) setLength(l);
      } catch {}
    }
  }, []);

  const duration = 1.2 / speed;

  return (
    <span className={cn("inline-block align-baseline", className)}>
      <motion.svg
        viewBox="0 0 300 80"
        width="auto"
        height="1em"
        preserveAspectRatio="xMinYMid meet"
        aria-label="phone"
        className="inline-block"
      >
        <motion.text
          ref={textRef}
          x="0"
          y="60%"
          dominantBaseline="middle"
          style={{
            strokeDasharray: length,
            strokeDashoffset: length,
          }}
          initial={{ strokeDashoffset: length, opacity: 1 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration, ease: "easeInOut" }}
          fontSize="64"
          fontWeight={600}
          stroke="#111"
          strokeWidth={6}
          fill="transparent"
        >
          phone
        </motion.text>
      </motion.svg>
    </span>
  );
}


