import { motion } from 'framer-motion';
import { lineMask } from '../lib/motion';

/**
 * LineMask — one line of a masked text reveal.
 * The wrapper clips; the inner span slides up from below the
 * fold with the signature easing. `i` = line index for stagger.
 */
export default function LineMask({ i = 0, children, className = '', style }) {
  return (
    <span className="line-mask" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em', ...style }}>
      {/* Self-driven trigger: plays on mount (hero is a load-time
          entrance, not scroll-revealed). custom={i} staggers lines. */}
      <motion.span
        variants={lineMask}
        custom={i}
        initial="hidden"
        animate="show"
        style={{ display: 'block', transformOrigin: 'left bottom' }}
        className={className}
      >
        {children}
      </motion.span>
    </span>
  );
}
