import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { EASE } from '../lib/motion';

const LINKS = ['About', 'Skills', 'Projects', 'GitHub', 'Contact'];
const GITHUB_URL = 'https://github.com/HaiderNafees';

/**
 * NAVBAR — fixed, transparent at top, glass-morphism once the
 * user scrolls. Active section gets a sliding gradient underline
 * (framer-motion layoutId). Mobile: animated dropdown sheet.
 */
export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  /* Glass state + active-section spy in ONE rAF-throttled handler.
     PERF: previously two unthrottled listeners ran 5
     getBoundingClientRect() reads per scroll event (layout thrash).
     Now rect reads happen at most once per frame, and state only
     updates when a value actually changes. */
  useEffect(() => {
    const ids = ['about', 'skills', 'projects', 'testimonials', 'contact'];
    let rafId = null;

    const measure = () => {
      rafId = null;
      setScrolled(window.scrollY > 24);

      const probe = window.innerHeight * 0.35;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    if (id === 'github') {
      window.open(GITHUB_URL, '_blank', 'noopener');
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  const linkHref = (id) => (id === 'github' ? GITHUB_URL : `#${id}`);

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
    >
      <div className="nav__inner">
        {/* Logo */}
        <a
          className="nav__logo"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
          }}
        >
          <span className="nav__logo-mark">NH</span>
          <span>
            Nafees<span style={{ color: 'var(--wm-pink)' }}>.</span>Haider
          </span>
        </a>

        {/* Desktop links */}
        <ul className="nav__links nav__links--desktop">
          {LINKS.map((label) => {
            const id = label.toLowerCase();
            const isActive = id === active;
            return (
              <li key={label}>
                <a
                  className={`nav__link ${isActive ? 'nav__link--active' : ''}`}
                  href={linkHref(id)}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(id);
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="nav__underline"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Theme toggle + burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            className="social-btn"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            style={{ width: 40, height: 40, borderRadius: 12 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav__sheet"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <ul className="nav__sheet-list">
              {LINKS.map((label, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: EASE }}
                >
                  <a
                    className="nav__sheet-link"
                    href={linkHref(label.toLowerCase())}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(label.toLowerCase());
                    }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
