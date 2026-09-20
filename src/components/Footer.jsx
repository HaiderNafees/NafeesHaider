import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { EASE } from '../lib/motion';

/**
 * FOOTER — copyright line + scroll-to-top button.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {year} — Designed & built by <span>Nafees Haider</span> · Islamabad, PK
        </p>

        <motion.button
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.3, ease: EASE }}
          aria-label="Scroll back to top"
        >
          <ArrowUp size={19} />
        </motion.button>
      </div>
    </footer>
  );
}
