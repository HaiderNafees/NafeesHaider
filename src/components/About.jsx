import { motion } from 'framer-motion';
import { Award, MapPin, Download } from 'lucide-react';
import { staggerContainer, fadeUp, cardReveal, slideLeft, slideRight, VIEWPORT } from '../lib/motion';

const GITHUB_URL = 'https://github.com/HaiderNafees';

const EXPERIENCE = [
  {
    role: 'Frontend Developer',
    meta: 'Freelance · 2021 – Present',
    desc: 'Designing and building responsive websites for clients across e-commerce and corporate sectors with HTML5, CSS3, JavaScript and React — from landing pages to full storefronts.',
  },
  {
    role: 'Frontend Web Developer',
    meta: 'MaltaThemes · Jun 2022 – Apr 2023',
    desc: 'Developed and maintained modern web applications focused on performance and UX. Collaborated on responsive designs and optimized frontend functionality across products.',
  },
];

/**
 * ABOUT — photo left (slides in from left), bio + timeline right.
 * Timeline nodes alternate pink/green on a gradient spine.
 */
export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer(0.12)}
        >
          <span className="wm-badge">About Me</span>
          <h2 className="section-title section-title--grad" style={{ marginTop: 14 }}>
            Turning ideas into interfaces
          </h2>
          <div className="accent-bar" />
        </motion.div>

        <div className="about__grid">
          {/* ---------- Photo + cert ---------- */}
          <motion.div
            className="about__photo-wrap"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className="about__photo">
              <img src="https://iili.io/3IdLevn.png" alt="Nafees Haider" loading="lazy" />
            </div>

            {/* freeCodeCamp certification badge */}
            <motion.a
              className="wm-card wm-card--hover about__cert"
              href="https://www.freecodecamp.org/certification/haidernafees07/responsive-web-design"
              target="_blank"
              rel="noopener noreferrer"
              variants={cardReveal}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              /* hover lift handled by CSS `translate` on .wm-card--hover */
            >
              <span className="skill-card__icon" style={{ width: 42, height: 42, margin: 0 }}>
                <Award size={20} />
              </span>
              <span>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>
                  Responsive Web Design
                </strong>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.84rem' }}>
                  freeCodeCamp Certification · Verified
                </span>
              </span>
            </motion.a>
          </motion.div>

          {/* ---------- Bio + timeline ---------- */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div
              className="about__text"
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.p variants={fadeUp}>
                I'm <strong>Nafees Haider</strong>, a frontend developer based in{' '}
                <MapPin size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Islamabad,
                Pakistan. I specialize in building modern, performant web apps with{' '}
                <strong>React, Next.js and TypeScript</strong> — and I care about the details:
                clean code, smooth motion, accessible UX.
              </motion.p>
              <motion.p variants={fadeUp}>
                Over the last few years I've shipped business sites, crypto landing pages and
                language-learning tools — always with a focus on responsive layouts and
                pixel-perfect execution. Lately I've been deep in <strong>TypeScript</strong> and
                design-system thinking.
              </motion.p>
            </motion.div>

            {/* Experience timeline */}
            <motion.div
              className="timeline"
              variants={staggerContainer(0.15, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {EXPERIENCE.map((job, i) => (
                <motion.div
                  key={job.role}
                  className={`tl-item ${i % 2 ? 'tl-item--green' : ''}`}
                  variants={fadeUp}
                >
                  <div className="tl-role">{job.role}</div>
                  <div className="tl-meta">{job.meta}</div>
                  <p className="tl-desc">{job.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              className="btn btn--outline"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              style={{ marginTop: 26 }}
            >
              <Download size={18} /> Explore my GitHub
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
