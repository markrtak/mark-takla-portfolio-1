"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  reducedOrSpring,
  springReveal,
  viewportReveal,
} from "@/lib/motion";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

export function FadeIn({
  children,
  delay = 0,
  className,
  y = 20,
}: FadeInProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportReveal}
      transition={reducedOrSpring(reduce, springReveal, delay)}
    >
      {children}
    </motion.div>
  );
}
