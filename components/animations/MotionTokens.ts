/**
 * VISTAR Motion Design Tokens
 * Standardized easing curves, durations, and spring transitions.
 */

export const EASINGS = {
  // Smooth cubic bezier easing for clean agency UI transitions
  easeOutCubic: [0.215, 0.61, 0.355, 1] as const,
  easeOutQuart: [0.165, 0.84, 0.44, 1] as const,
  easeOutExpo: [0.19, 1, 0.22, 1] as const,
  easeInOutCubic: [0.645, 0.045, 0.355, 1] as const,
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 30,
  } as const,
  gentleSpring: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  } as const,
  bouncySpring: {
    type: "spring",
    stiffness: 500,
    damping: 25,
  } as const,
};

export const DURATIONS = {
  micro: 0.18, // 180ms: button hover, icon shift, link underlines
  fast: 0.3,   // 300ms: small elements, dropdowns, tag pills
  normal: 0.5, // 500ms: card reveals, section entrances
  slow: 0.8,   // 800ms: hero reveals, large image entrances
};

export const STAGGERS = {
  tight: 0.04,  // 40ms: letters or dense list items
  normal: 0.08, // 80ms: cards, menu links
  relaxed: 0.12, // 120ms: hero elements, section pillars
};
