import { motion } from 'framer-motion';
import { Atom, Braces, Wind, Layers, Boxes, Gauge } from 'lucide-react';
import { staggerContainer, cardReveal, VIEWPORT } from '../lib/motion';

const FEATURED = {
  icon: Atom,
  title: 'React + Next.js',
  desc: 'My daily drivers. Component architecture, hooks, server-side rendering, App Router — from marketing sites to complex dashboards.',
  pills: ['Hooks & Context', 'App Router', 'SSR / SSG', 'React Query', 'Form Handling', 'Testing Library'],
};

const MEDIUM = [
  {
    icon: Braces,
    title: 'TypeScript',
    desc: 'Typed contracts end to end — safer refactors and self-documenting code across all recent projects.',
  },
  {
    icon: Wind,
    title: 'Tailwind CSS',
    desc: 'Utility-first styling with custom design tokens, dark mode and responsive layouts that scale.',
  },
  {
    icon: Layers,
    title: 'Material-UI',
    desc: 'Theming, customization and rapid accessible UI — used across several client and Web3 projects.',
  },
  {
    icon: Gauge,
    title: 'Performance & UX',
    desc: 'Core Web Vitals, lazy loading, code-splitting and accessibility baked into every build.',
  },
];

const SMALL = [
  { icon: Boxes, title: 'Redux' },
  { icon: Boxes, title: 'REST APIs' },
  { icon: Boxes, title: 'Node.js' },
  { icon: Boxes, title: 'WordPress' },
  { icon: Boxes, title: 'PWA' },
  { icon: Boxes, title: 'CI/CD' },
];

/**
 * SKILLS — bento grid.
 * Asymmetric layout: featured card spans wide, medium cards fill
 * the middle band, compact pill-cards finish the floor. All cards
 * reveal with the spec'd dim/scale → full animation, staggered.
 */
export default function Skills() {
  const FeaturedIcon = FEATURED.icon;

  return (
    <section className="section" id="skills">
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer(0.12)}
        >
          <span className="wm-badge">Skills</span>
          <h2 className="section-title section-title--grad" style={{ marginTop: 14 }}>
            My toolbox
          </h2>
          <p className="section-sub">
            The technologies I reach for to ship fast, polished and maintainable products.
          </p>
          <div className="accent-bar" />
        </motion.div>

        <motion.div
          className="bento"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ ...VIEWPORT, amount: 0.15 }}
        >
          {/* Featured card — spans 7 cols on desktop */}
          <motion.div className="wm-card wm-card--hover skill-card span-7" variants={cardReveal}>
            <div className="skill-card__icon">
              <FeaturedIcon size={22} />
            </div>
            <div className="skill-card__title">{FEATURED.title}</div>
            <p className="skill-card__desc">{FEATURED.desc}</p>
            <div className="pill-cloud">
              {FEATURED.pills.map((p) => (
                <span className="wm-pill" key={p}>{p}</span>
              ))}
            </div>
          </motion.div>

          {/* Compact identity card — spans 5 cols, green accent */}
          <motion.div className="wm-card wm-card--hover skill-card skill-card--green span-5" variants={cardReveal}>
            <div className="skill-card__icon">
              <Boxes size={22} />
            </div>
            <div className="skill-card__title">Also in rotation</div>
            <p className="skill-card__desc">
              Tools and libraries that round out my workflow day to day.
            </p>
            <div className="pill-cloud">
              {SMALL.map(({ icon: Icon, title }) => (
                <span className="wm-pill" key={title}>
                  <Icon size={14} style={{ color: 'var(--wm-green)' }} />
                  {title}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Medium cards — 4 cols each */}
          {MEDIUM.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              className="wm-card wm-card--hover skill-card span-4"
              variants={cardReveal}
            >
              <div className="skill-card__icon">
                <Icon size={22} />
              </div>
              <div className="skill-card__title">{title}</div>
              <p className="skill-card__desc">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
