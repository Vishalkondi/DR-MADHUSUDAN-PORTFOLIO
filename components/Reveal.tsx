"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const SPRING = [0.16, 0.84, 0.28, 1.02] as const;

type Dir = "up" | "left" | "right" | "scale" | "blur";

const offsets: Record<Dir, { x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { y: 30 },
  left: { x: -40 },
  right: { x: 40 },
  scale: { scale: 0.92 },
  blur: { y: 20, filter: "blur(8px)" },
};

/** Framer-Motion scroll reveal with directional + stagger support. */
export function Reveal({
  children,
  dir = "up",
  delay = 0,
  className,
  style,
  id,
}: {
  children: React.ReactNode;
  dir?: Dir;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const from = offsets[dir];
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, filter: "blur(0px)", ...from }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
          : {}
      }
      transition={{ duration: 0.9, ease: SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its direct Reveal-like children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: SPRING } },
};
