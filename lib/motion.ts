import type { Transition } from "framer-motion";

/** Scroll-triggered blocks (hero-adjacent feel). */
export const springReveal: Transition = {
  type: "spring",
  stiffness: 440,
  damping: 42,
  mass: 0.68,
};

/** Softer grids / dense lists. */
export const springRevealSoft: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 0.76,
};

/** Sticky chrome, drawers. */
export const springChrome: Transition = {
  type: "spring",
  stiffness: 520,
  damping: 40,
  mass: 0.52,
};

/** layoutId segmented controls. */
export const springLayout: Transition = {
  type: "spring",
  stiffness: 480,
  damping: 38,
};

/** Hover lift on cards / tiles. */
export const springHoverLift: Transition = {
  type: "spring",
  stiffness: 580,
  damping: 42,
  mass: 0.48,
};

/** Props tied to illustration scale. */
export const springTactile: Transition = {
  type: "spring",
  stiffness: 460,
  damping: 34,
};

/** Cursor-follow ring behind hero — slightly snappier than default UI springs. */
export const springHeroScribbleConfig = {
  stiffness: 188,
  damping: 28,
  mass: 0.36,
} as const;

export const viewportReveal = {
  once: true,
  margin: "-64px" as const,
};

export const viewportRevealLoose = {
  once: true,
  margin: "-48px" as const,
};

export const viewportRevealTight = {
  once: true,
  margin: "-40px" as const,
};

export function reducedOrSpring(
  reduce: boolean | null,
  spring: Transition,
  delay = 0,
): Transition {
  if (reduce) return { duration: 0 };
  return { ...spring, delay };
}

export const springTap: Transition = {
  type: "spring",
  stiffness: 680,
  damping: 44,
};
