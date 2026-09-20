import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/motion';

/**
 * PRELOADER — 1.8s cinematic intro.
 * Sequence: "NH" monogram scales in → widens to reveal the full
 * name → progress bar fills (Watermelon gradient) → whole screen
 * wipes upward → onDone() mounts the page content.
 */
export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('intro'); // intro | exiting | gone

  useEffect(() => {
    // Reduced motion: skip the show entirely.
    if (reduced) {
      onDone();
      return undefined;
    }

    // Simulated asset progress (eased, tabular-nums friendly).
    const started = performance.now();
    let rafId;
    const tick = (now) => {
      const t = Math.min(1, (now - started) / 1400);
      // easeOutCubic for a believable load curve
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase('exiting'), 250);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduced, onDone]);

  // Trigger the wipe + unmount.
  useEffect(() => {
    if (phase !== 'exiting') return undefined;
    const t = setTimeout(() => {
      setPhase('gone');
      onDone();
    }, 650);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
        >
          <motion.div
            className="preloader__veil"
            initial={{ scaleY: 0 }}
            animate={phase === 'exiting' ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          />
          <motion.div
            className="preloader__monogram"
            initial={{ width: 92, height: 92, fontSize: 30, borderRadius: 26 }}
            animate={{ width: 320, height: 64, fontSize: 15, borderRadius: 20 }}
            transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
          >
            {phase === 'intro' ? 'NH' : 'NAFEES HAIDER'}
          </motion.div>

          <motion.div
            style={{
              position: 'absolute',
              bottom: '38%',
              display: 'grid',
              justifyItems: 'center',
              gap: 12,
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
          >
            <div className="preloader__bar">
              <motion.div
                className="preloader__bar-fill"
                style={{ scaleX: progress / 100 }}
              />
            </div>
            <span className="preloader__pct">{progress}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
