import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * APP — layout orchestrator.
 * Owns: preloader gating, theme (dark/light via data-theme),
 * scroll-driven background gradient shift (MCP21), and a global
 * click ripple micro-interaction.
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  );

  /* Reflect theme onto <html> for the CSS layer. */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /* ---- MCP21: background gradient shifts as the user scrolls.
     --bg-shift (0 → 1) is written on the .bg-wash node itself —
     scoped to one decorative element instead of <html>, so a scroll
     frame never invalidates styles document-wide. Quantized to
     0.5% steps to skip redundant writes. rAF-throttled. ---- */
  const washRef = useRef(null);
  useEffect(() => {
    const el = washRef.current;
    if (!el) return undefined;
    let rafId = null;
    let last = -1;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        const q = Math.round(p * 200) / 200;
        if (q !== last) {
          last = q;
          el.style.setProperty('--bg-shift', q.toFixed(3));
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  /* ---- Global ripple: click any .btn → spawn a ripple dot. ---- */
  useEffect(() => {
    const onClick = (e) => {
      const btn = e.target.closest?.('.btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const dot = document.createElement('span');
      dot.className = 'ripple-dot';
      dot.style.left = `${e.clientX - rect.left}px`;
      dot.style.top = `${e.clientY - rect.top}px`;
      btn.appendChild(dot);
      dot.addEventListener('animationend', () => dot.remove());
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handleLoaded = useCallback(() => setLoading(false), []);
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <MotionConfig reducedMotion="user">
      {/* Decorative fixed layers (behind everything) */}
      <div className="bg-wash" aria-hidden ref={washRef} />
      <div className="bg-grid" aria-hidden />

      {loading && <Preloader onDone={handleLoaded} />}

      {/* Page content mounts after the preloader finishes so its
          entrance animations play right as the veil lifts. */}
      {!loading && (
        <>
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <main>
            <Hero />
            <div className="wm-divider" aria-hidden />
            <About />
            <div className="wm-divider" aria-hidden />
            <Skills />
            <div className="wm-divider" aria-hidden />
            <Projects />
            <div className="wm-divider" aria-hidden />
            <Testimonials />
            <div className="wm-divider" aria-hidden />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </MotionConfig>
  );
}
