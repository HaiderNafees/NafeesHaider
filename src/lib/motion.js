/**
 * ============================================================
 * SHARED MOTION VARIANTS — framer-motion
 * Signature easing: cubic-bezier(0.16, 1, 0.3, 1), 600–800ms,
 * staggered 100–150ms. Used by every section for cohesion.
 * ============================================================
 */

export const EASE = [0.16, 1, 0.3, 1];

/* Viewport config shared by all whileInView animations:
   triggers once (visible = stays visible), starts slightly early. */
export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' };

/* Parent container: staggers children as it enters view.
   stagger = seconds between children (spec: 100–150ms). */
export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/* Default child: fade + subtle upward slide (Infinix hero style) */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

/* Pure fade (badges, accents, secondary elements) */
export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

/* Cards: opacity 0, y 24, scale 0.95 → full (spec'd card rule) */
export const cardReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

/* Masked text lines: each line slides up from behind an
   overflow-hidden mask (see components/LineMask.jsx). */
export const lineMask = {
  hidden: { y: '110%' },
  show: (i = 0) => ({
    y: '0%',
    transition: { duration: 0.8, ease: EASE, delay: i * 0.12 },
  }),
};

/* Side slides for alternating/timeline elements */
export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};
export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

/* Slow entrance for decorative layers (orbits, orbs) */
export const orbitFloat = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: EASE },
  },
};

/* Load-time entrance (hero): delay-driven, not scroll-driven */
export const heroRise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});
