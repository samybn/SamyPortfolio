"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/app/components/ui/utils";

interface MotionSubtitleProps {
  text: string;
  direction?: "top" | "bottom";
  speed?: number;
  stagger?: number;
  className?: string;
}

export function MotionSubtitle({
  text,
  direction = "top",
  speed = 1,
  stagger = 0.018,
  className,
}: MotionSubtitleProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const chars = container.querySelectorAll<HTMLSpanElement>(".ms-char");
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: direction === "top" ? -12 : 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5 / speed,
          stagger,
          ease: "power2.out",
        }
      );
    }, container);

    return () => ctx.revert();
  }, [text, direction, speed, stagger]);

  return (
    <span ref={containerRef} className={cn("inline-block", className)}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="ms-char inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
