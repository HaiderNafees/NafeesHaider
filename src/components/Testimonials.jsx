import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { staggerContainer, cardReveal, VIEWPORT } from '../lib/motion';

const TESTIMONIALS = [
  {
    quote:
      'Working with Nafees was an absolute pleasure. His attention to detail and technical expertise helped us deliver a fantastic product that exceeded our expectations.',
    name: 'Sarah Johnson',
    role: 'Product Manager at TechCorp',
    tone: 'pink',
  },
  {
    quote:
      'Nafees brought both technical excellence and creative innovation to our project. His ability to understand our vision and translate it into reality was impressive.',
    name: 'Michael Chen',
    role: 'CEO of StartupX',
    tone: 'green',
  },
  {
    quote:
      'The level of professionalism and technical skill that Nafees brings to his work is outstanding. He consistently delivered high-quality solutions aligned perfectly with our design requirements.',
    name: 'Emily Rodriguez',
    role: 'Design Director at CreativeHub',
    tone: 'pink',
  },
];

const AVATAR_TONES = {
  pink: 'quote-card__avatar',
  green: 'quote-card__avatar quote-card__avatar--green',
};

/**
 * TESTIMONIALS — quote cards with gradient initial avatars,
 * staggered in with the shared card reveal.
 */
export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer(0.12)}
        >
          <span className="wm-badge">Testimonials</span>
          <h2 className="section-title section-title--grad" style={{ marginTop: 14 }}>
            Kind words
          </h2>
          <div className="accent-bar" />
        </motion.div>

        <motion.div
          className="quotes-grid"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ ...VIEWPORT, amount: 0.1 }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure className="wm-card wm-card--hover quote-card" key={t.name} variants={cardReveal}>
              <Quote className="quote-card__mark" size={26} />
              <blockquote className="quote-card__text">{t.quote}</blockquote>
              <figcaption className="quote-card__who">
                <span className={AVATAR_TONES[t.tone]}>
                  {t.name.split(' ').map((w) => w[0]).join('')}
                </span>
                <span>
                  <span className="quote-card__name">{t.name}</span>
                  <br />
                  <span className="quote-card__role">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
