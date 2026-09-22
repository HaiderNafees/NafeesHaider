import { Github, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const PROJECTS = [
  {
    title: 'HSK App',
    url: 'hskapp-iota.vercel.app',
    description:
      'HSK language-learning platform — structured vocabulary and quiz practice across HSK levels, built to make Chinese proficiency study engaging and trackable.',
    tech: ['TypeScript'],
    github: 'https://github.com/HaiderNafees/hskapp',
    live: 'https://hskapp-iota.vercel.app/',
    isNew: true,
  },
  {
    title: 'ElysianThreads',
    url: 'elysianthreads.vercel.app',
    description:
      'Fashion & lifestyle platform — product browsing, curated collections and a polished, responsive storefront experience.',
    tech: ['TypeScript'],
    github: 'https://github.com/HaiderNafees/ElysianThreads',
    live: 'https://elysianthreads.vercel.app/',
  },
  {
    title: 'Neko Coin',
    url: 'haidernafees.github.io/nekocatcoin',
    description:
      "Web3 landing for crypto's cutest cat — token showcase with tokenomics, roadmap and community sections in a responsive layout.",
    tech: ['React', 'Material-UI', 'Web3'],
    github: 'https://github.com/HaiderNafees/nekocatcoin',
    live: 'https://haidernafees.github.io/nekocatcoin/',
  },
  {
    title: 'MoonCoin',
    url: 'haidernafees.github.io/mooncoin',
    description:
      'Cryptocurrency project site — clean presentation of vision, features and roadmap for a professional Web3 presence.',
    tech: ['React'],
    github: 'https://github.com/HaiderNafees/mooncoin',
    live: 'https://haidernafees.github.io/mooncoin/',
  },
  {
    title: 'Sweet Delights Cupcakes',
    url: 'haidernafees.github.io/sweetdelight-cupcakes-theme',
    description:
      'Business website for a cupcake shop — visually appealing responsive layout with engaging visuals and intuitive navigation.',
    tech: ['HTML/CSS/JS', 'Bootstrap'],
    github: 'https://github.com/HaiderNafees/sweetdelight-cupcakes-theme',
    live: 'https://haidernafees.github.io/sweetdelight-cupcakes-theme/',
  },
];

const JS_TOOLS = [
  { title: 'UniversityTest', github: 'https://github.com/HaiderNafees/universitytest' },
  { title: 'HTMLQuiz', github: 'https://github.com/HaiderNafees/htmlquiz' },
];

/** Browser-chrome preview card: dots + URL bar + abstract page mock. */
function BrowserFrame({ url, letter }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-url">{url}</span>
      </div>
      <div className="browser-view">
        <span className="browser-letter">{letter}</span>
        <div className="browser-mock-title" />
        <div className="browser-mock-line" />
        <div className="browser-mock-line browser-mock-line--short" />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section bg-mist">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-heading">Featured Projects</h2>
        </ScrollReveal>

        <div className="mt-14 flex flex-col gap-16 md:gap-20">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={project.title} delay={(i % 2) * 0.1}>
              <div className="project-row">
                {/* Left: browser-style preview */}
                <BrowserFrame url={project.url} letter={project.title.charAt(0)} />

                {/* Right: project info */}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-2xl font-bold text-navy md:text-[1.75rem]">
                      {project.title}
                    </h3>
                    {project.isNew && (
                      <span className="badge-new">New · Sep 2026</span>
                    )}
                  </div>

                  <p className="mt-4 text-[0.97rem] leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-link"
                    >
                      <Github size={16} /> Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link"
                      >
                        <ExternalLink size={16} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Small JavaScript tools */}
        <ScrollReveal delay={0.1}>
          <h3 className="mt-20 font-serif text-xl font-bold text-navy">
            JavaScript Tools
          </h3>
        </ScrollReveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {JS_TOOLS.map((tool, i) => (
            <ScrollReveal key={tool.title} delay={0.1 + i * 0.1}>
              <a
                href={tool.github}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card flex items-center gap-3 p-5 font-semibold text-navy"
              >
                <Github size={18} className="shrink-0 text-muted" />
                <span className="text-[0.95rem]">{tool.title}</span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
