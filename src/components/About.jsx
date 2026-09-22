import { Award, MapPin, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const GITHUB_URL = 'https://github.com/HaiderNafees';

const FACTS = [
  { label: 'Based in', value: 'Islamabad, Pakistan' },
  { label: 'Focus', value: 'React · Next.js · TypeScript' },
  { label: 'Open to', value: 'Freelance & full-time' },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-heading">About</h2>
        </ScrollReveal>

        <div className="mt-12 grid items-start gap-10 md:grid-cols-[5fr_7fr]">
          {/* Portrait + certification */}
          <ScrollReveal>
            <div className="portfolio-card overflow-hidden">
              <img
                src="https://iili.io/3IdikFt.png"
                alt="Nafees Haider"
                loading="lazy"
                className="h-auto w-full"
              />
            </div>

            <a
              className="about-cert"
              href="https://www.freecodecamp.org/certification/haidernafees07/responsive-web-design"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="about-cert__icon">
                <Award size={18} />
              </span>
              <span className="about-cert__body">
                <strong>Responsive Web Design</strong>
                <small>freeCodeCamp Certification · Verified</small>
              </span>
              <ArrowUpRight size={16} className="ml-auto shrink-0 text-muted" />
            </a>
          </ScrollReveal>

          {/* Bio + quick facts */}
          <ScrollReveal delay={0.15}>
            <p className="about-lead">Turning ideas into interfaces.</p>

            <p className="about-p">
              I&rsquo;m <strong>Nafees Haider</strong>, a frontend developer based in{' '}
              <MapPin size={14} style={{ display: 'inline', verticalAlign: '-2px' }} />{' '}
              Islamabad, Pakistan. I specialize in building modern, performant web apps
              with <strong>React, Next.js and TypeScript</strong> — and I care about the
              details: clean code, smooth motion, accessible UX.
            </p>

            <p className="about-p">
              Over the last few years I&rsquo;ve shipped business sites, crypto landing
              pages and language-learning tools — always with a focus on responsive
              layouts and pixel-perfect execution. Lately I&rsquo;ve been deep in{' '}
              <strong>TypeScript</strong> and design-system thinking.
            </p>

            <div className="mt-7">
              {FACTS.map((fact) => (
                <div className="fact-row" key={fact.label}>
                  <span className="fact-label">{fact.label}</span>
                  <span className="fact-value">{fact.value}</span>
                </div>
              ))}
            </div>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-7 inline-flex"
            >
              Explore my GitHub <ArrowUpRight size={16} />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
