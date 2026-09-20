/**
 * ============================================================
 * SCROLL-REVEAL COMPONENTS
 * A tiny, dependency-free animation system built on
 * IntersectionObserver (supported by all modern browsers).
 * ------------------------------------------------------------
 * <ScrollReveal>      — wraps any element; reveals on scroll
 * <TextLineReveal>    — line-by-line masked text reveal
 * <SectionHeading>    — heading + growing accent bar
 * <Parallax>          — scroll-linked depth layer
 * useParallax         — hook for custom parallax layers
 * useReducedMotion    — live prefers-reduced-motion state
 *
 * BEHAVIOUR
 *  - Once revealed, elements stay visible (no reset on scroll up).
 *  - Delay/stagger via the `delay` prop (seconds) — inline per item.
 *  - Animations are pure CSS (GPU-friendly transform/opacity),
 *    so scrolling never re-renders React.
 *  - Wrappers are MUI <Box>, so `sx` props work like everywhere
 *    else in this codebase.
 * ============================================================
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@mui/material';

/* ------------------------------------------------------------
   Shared IntersectionObserver
   One observer instance for the whole page (cheaper than one
   per element). Elements register via a WeakMap of callbacks
   and unobserve themselves after revealing — so the animation
   plays exactly once and never resets on scroll-up.
   ------------------------------------------------------------ */
const revealCallbacks = new WeakMap();
let sharedObserver = null;

function getSharedObserver() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = revealCallbacks.get(entry.target);
            if (cb) cb();
            // Reveal is one-shot: stop watching this element.
            sharedObserver.unobserve(entry.target);
            revealCallbacks.delete(entry.target);
          }
        });
      },
      // Reveal slightly before the element is fully on screen —
      // this makes the motion feel intentional, not laggy.
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
  }
  return sharedObserver;
}

/**
 * Observe `ref.current`; when it enters the viewport, flip
 * `visible` state once. Falls back to "always visible" when
 * IntersectionObserver is unavailable or motion is reduced.
 */
function useRevealOnScroll(ref, enabled) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = enabled ? getSharedObserver() : null;
    if (!observer) {
      setVisible(true);
      return undefined;
    }

    revealCallbacks.set(node, () => setVisible(true));
    observer.observe(node);
    return () => {
      observer.unobserve(node);
      revealCallbacks.delete(node);
    };
  }, [ref, enabled]);

  return visible;
}

/**
 * Live `prefers-reduced-motion` state.
 * Listens for changes so the UI reacts instantly when the user
 * toggles the OS setting (no reload required).
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/* ------------------------------------------------------------
   <ScrollReveal>
   ------------------------------------------------------------
   Props:
   - variant : 'fade-up' | 'fade' | 'scale-up' | 'slide-left' |
               'slide-right' | 'zoom-in'   (default 'fade-up')
   - delay   : seconds before the transition starts (staggering)
   - component: element/component to render (default 'div')
   - className / sx / style : forwarded to the wrapper Box
   ------------------------------------------------------------ */
export function ScrollReveal({
  variant = 'fade-up',
  delay = 0,
  component = 'div',
  className = '',
  sx,
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const visible = useRevealOnScroll(ref, !reduced);

  return (
    <Box
      ref={ref}
      component={component}
      data-sr={variant}
      className={`${visible ? 'is-visible' : ''} ${className}`.trim()}
      sx={sx}
      style={{
        ...style,
        // Per-item delay lands inline so staggering is explicit.
        ...(delay ? { '--sr-delay': `${delay}s` } : null),
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------
   <TextLineReveal>
   ------------------------------------------------------------
   Splits `text` on newlines (or takes an array of lines) and
   slides each line up from behind an overflow mask, staggered —
   the signature product-page headline effect.
   ------------------------------------------------------------
   Props:
   - text    : string ("\n" separated) or array of lines
   - component: heading element (default 'h2')
   - delay   : base delay in seconds
   - step    : per-line delay in seconds (default 0.12s)
   ------------------------------------------------------------ */
export function TextLineReveal({
  text,
  component = 'h2',
  delay = 0,
  step = 0.12,
  className = '',
  sx,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const visible = useRevealOnScroll(ref, !reduced);

  const lines = Array.isArray(text) ? text : String(text).split('\n');

  return (
    <Box
      ref={ref}
      component={component}
      className={`${visible ? 'is-visible' : ''} ${className}`.trim()}
      sx={{ m: 0, ...sx }}
      {...rest}
    >
      {lines.map((line, i) => (
        <span className="sr-line-mask" key={`${line}-${i}`}>
          <span
            className={`sr-line ${visible ? 'is-visible' : ''}`}
            style={{ '--sr-delay': `${delay + i * step}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Box>
  );
}

/* ------------------------------------------------------------
   <SectionHeading>
   Masked line reveal + a growing gradient accent bar underneath,
   used on every section for a cohesive rhythm.
   ------------------------------------------------------------ */
export function SectionHeading({ text, accent = true, sx, ...rest }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 6,
      }}
    >
      <TextLineReveal
        text={text}
        component="h2"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #0a84ff, #5ac8fa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          ...sx,
        }}
        {...rest}
      />
      {accent && (
        <ScrollReveal
          variant="fade"
          delay={0.3}
          className="sr-heading-accent"
          aria-hidden
        />
      )}
    </Box>
  );
}

/* ------------------------------------------------------------
   PARALLAX
   Lightweight scroll-linked depth. Translates the layer on Y as
   the page scrolls, at `speed` × offset, clamped so far-off-
   screen elements don't drift infinitely.

   Implemented with requestAnimationFrame + a CSS variable, so
   scrolling never triggers a React re-render.
   ------------------------------------------------------------ */

/**
 * useParallax(ref, speed)
 * Writes translateY(px) into the node's --parallax-y CSS variable.
 * Positive speed = moves slower (background depth);
 * negative speed = moves faster (foreground depth).
 */
export function useParallax(ref, speed = 0.15) {
  const reduced = useReducedMotion();

  const update = useCallback(() => {
    const node = ref.current;
    if (!node) return;

    // Distance of the element's center from the viewport center.
    const rect = node.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const offset = rect.top + rect.height / 2 - viewportH / 2;

    // Clamp to ±150px of travel so layers stay composed.
    const clamped = Math.max(-150, Math.min(150, offset * speed));
    node.style.setProperty('--parallax-y', `${clamped.toFixed(2)}px`);
  }, [ref, speed]);

  useEffect(() => {
    if (reduced) {
      // Neutralise any previously-applied offset.
      ref.current?.style.setProperty('--parallax-y', '0px');
      return undefined;
    }

    let rafId = null;
    const onScroll = () => {
      if (rafId !== null) return; // one frame at a time
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    update(); // initial position
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reduced, update, ref]);

  return reduced;
}

/**
 * <Parallax speed={0.15}> — convenience wrapper around useParallax.
 * Renders an MUI Box, so `sx` works for positioning layers.
 */
export function Parallax({ speed = 0.15, sx, style, children, ...rest }) {
  const ref = useRef(null);
  useParallax(ref, speed);

  return (
    <Box
      ref={ref}
      className="sr-parallax"
      sx={sx}
      style={{ '--parallax-speed': speed, ...style }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default ScrollReveal;
