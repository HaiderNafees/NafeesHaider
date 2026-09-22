import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Built' },
  { value: '8+', label: 'Happy Clients' },
];

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <ScrollReveal>
          <h1 className="section-heading hero-name">Nafees Haider</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="hero-title">
            Frontend Engineer
            <span className="hero-title-sep">|</span>
            Web Developer
            <span className="hero-title-sep">|</span>
            Digital Solutions
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="hero-tagline">
            Passionate about building modern, responsive, high-performance web
            applications with React, Next.js and TypeScript.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="mt-10">
          <div className="flex flex-wrap justify-center gap-4">
            <button type="button" className="btn-primary" onClick={() => scrollTo('projects')}>
              View My Work <ArrowRight size={18} />
            </button>
            <button type="button" className="btn-secondary" onClick={() => scrollTo('contact')}>
              Get In Touch
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="hero-stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
