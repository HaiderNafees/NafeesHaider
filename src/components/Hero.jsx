import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, MapPin, Code2, ChevronDown } from 'lucide-react';
import { EASE, heroRise } from '../lib/motion';
import LineMask from './LineMask';

const GITHUB_URL = 'https://github.com/HaiderNafees';

/**
 * HERO — MCP21 asymmetric composition.
 * Left: masked line-by-line name reveal, gradient role, tagline,
 * CTAs, stats. Right: portrait inside a rotating conic ring with
 * orbiting dashed circles and floating glass chips (depth layers).
 *
 * PERF: Intersection Observer pauses all CSS animations (orbit rings,
 * portrait ring, orbs) when the hero scrolls off-screen, freeing GPU
 * compositor layers for the sections below.
 */
export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero is not intersecting, pause all child animations
        el.classList.toggle('hero--paused', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Ambient orbs (decor) */}
      <motion.div
        aria-hidden
        className="orb orb--pink"
        style={{ width: 380, height: 380, top: '-8%', right: '-4%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.4, delay: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="orb orb--green"
        style={{ width: 320, height: 320, bottom: '-12%', left: '-6%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.4, delay: 0.55 }}
      />

      <div className="container hero__grid">
        {/* ---------- Left: copy ---------- */}
        <div>
          <motion.div
            className="hero__eyebrow"
            {...heroRise(0.05)}
          >
            <span className="wm-badge">
              <span className="hero__dot" />
              Available for work
            </span>
          </motion.div>

          <h1 className="hero__title">
            <LineMask i={0}>Nafees</LineMask>
            <LineMask i={1}>
              <span className="section-title--grad">Haider</span>
            </LineMask>
          </h1>

          <motion.p
            className="hero__role"
            {...heroRise(0.5)}
          >
            Frontend Developer
          </motion.p>

          <motion.p className="hero__tagline" {...heroRise(0.62)}>
            I build fast, modern, responsive web experiences with React,
            Next.js and TypeScript — turning ideas into polished products
            people love to use.
          </motion.p>

          <motion.div className="hero__cta" {...heroRise(0.74)}>
            <button className="btn btn--primary" onClick={() => scrollTo('projects')}>
              View Projects <ArrowRight size={18} />
            </button>
            <a
              className="btn btn--outline"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} /> GitHub
            </a>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } } }}
          >
            {[
              ['3+', 'Years Experience'],
              ['15+', 'Projects Built'],
              ['8+', 'Happy Clients'],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
              >
                <div className="hero__stat-value">{value}</div>
                <div className="hero__stat-label">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ---------- Right: stage with orbits ---------- */}
        <motion.div
          className="hero__stage"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        >
          {/* Orbit rings (MCP21 decorative depth) */}
          <div className="orbit" aria-hidden style={{ width: 470, height: 470, inset: 0, margin: 'auto' }}>
            <span className="orbit-node" />
          </div>
          <div className="orbit orbit--reverse" aria-hidden style={{ width: 560, height: 560, inset: 0, margin: 'auto' }}>
            <span className="orbit-node" style={{ background: 'linear-gradient(90deg, #22c55e, #4ade80)' }} />
          </div>

          {/* Rotating conic ring */}
          <div className="hero__portrait-ring" aria-hidden style={{ gridArea: '1 / 1' }} />

          {/* Portrait */}
          <motion.div
            className="hero__portrait"
            style={{ gridArea: '1 / 1' }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <img src="https://iili.io/3IdikFt.png" alt="Nafees Haider" decoding="async" />
          </motion.div>

          {/* Floating chips */}
          <motion.div
            className="hero__chip hero__chip--tl"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
          >
            <Code2 size={16} color="var(--wm-pink)" /> React • TypeScript
          </motion.div>
          <motion.div
            className="hero__chip hero__chip--br"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
          >
            <MapPin size={16} color="var(--wm-green)" /> Islamabad, PK
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        className="hero__scroll-hint"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ background: 'none', border: 'none' }}
      >
        Scroll
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
