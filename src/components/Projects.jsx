import { motion } from 'framer-motion';
import { Github, ExternalLink, Atom, Shirt, Coins, Rocket, Cake, GraduationCap, BookOpen, Cpu } from 'lucide-react';
import { staggerContainer, cardReveal, fadeUp, VIEWPORT } from '../lib/motion';

const GITHUB_URL = 'https://github.com/HaiderNafees';

/**
 * PROJECTS — bento grid of every repo.
 * Layout: HSK App gets the hero slot (span 7, tall media),
 * ElysianThreads takes span 5, crypto twins share the middle band,
 * Sweet Delights + learning tools fill the floor.
 */
const PROJECTS = [
  {
    title: 'HSK App',
    desc: 'HSK language-learning platform — structured vocabulary and quiz practice across HSK levels, built to make Chinese proficiency study engaging and trackable.',
    tech: ['TypeScript', 'React'],
    github: 'https://github.com/HaiderNafees/hskapp',
    icon: BookOpen,
    span: 'span-7',
    media: 'media-tall',
  },
  {
    title: 'ElysianThreads',
    desc: 'Fashion & lifestyle platform — product browsing, curated collections and a polished, responsive storefront experience.',
    tech: ['TypeScript', 'React'],
    github: 'https://github.com/HaiderNafees/ElysianThreads',
    icon: Shirt,
    span: 'span-5',
    media: 'media-tall',
  },
  {
    title: 'Neko Cat Coin',
    desc: "Web3 landing for crypto's cutest cat — token showcase with tokenomics, roadmap and community sections in a responsive MUI layout.",
    tech: ['React', 'Material-UI', 'Web3'],
    github: 'https://github.com/HaiderNafees/nekocatcoin',
    live: 'https://haidernafees.github.io/nekocatcoin/',
    icon: Coins,
    span: 'span-6',
    media: 'media-16-9',
  },
  {
    title: 'MoonCoin',
    desc: 'Cryptocurrency project site for Mooncoin — clean presentation of vision, features and roadmap for a professional Web3 presence.',
    tech: ['React', 'Material-UI', 'Web3'],
    github: 'https://github.com/HaiderNafees/mooncoin',
    live: 'https://haidernafees.github.io/mooncoin/',
    icon: Rocket,
    span: 'span-6',
    media: 'media-16-9',
  },
  {
    title: 'Sweet Delights Cupcakes',
    desc: 'Business website for a cupcake shop — visually appealing responsive layout with engaging visuals and intuitive navigation.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/HaiderNafees/sweetdelight-cupcakes-theme',
    live: 'https://haidernafees.github.io/sweetdelight-cupcakes-theme/',
    icon: Cake,
    span: 'span-5',
    media: 'media-flat',
  },
];

const LEARNING_TOOLS = [
  {
    title: 'University Test',
    desc: 'Test-prep practice tool for university coursework revision.',
    github: 'https://github.com/HaiderNafees/universitytest',
    icon: GraduationCap,
  },
  {
    title: 'HTML Quiz',
    desc: 'Interactive quiz app for practicing core HTML concepts.',
    github: 'https://github.com/HaiderNafees/htmlquiz',
    icon: BookOpen,
  },
  {
    title: 'C Practice',
    desc: 'Hands-on C programming exercises and practice problems.',
    github: 'https://github.com/HaiderNafees/c-',
    icon: Cpu,
  },
];

/** Placeholder thumbnail with icon (per spec: thumbnail placeholder) */
function ProjectMedia({ project }) {
  const Icon = project.icon;
  return (
    <div className={`proj-card__media ${project.media}`}>
      <div className="proj-card__placeholder">
        <Icon size={64} strokeWidth={1.2} />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer(0.12)}
        >
          <span className="wm-badge">Projects</span>
          <h2 className="section-title section-title--grad" style={{ marginTop: 14 }}>
            Selected work
          </h2>
          <p className="section-sub">
            Everything below lives on my GitHub — from TypeScript platforms to Web3 launches.
          </p>
          <div className="accent-bar" />
        </motion.div>

        <motion.div
          className="bento"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ ...VIEWPORT, amount: 0.08 }}
        >
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.title}
                className={`wm-card wm-card--hover proj-card ${project.span}`}
                variants={cardReveal}
              >
                <ProjectMedia project={project} />
                <div className="proj-card__body">
                  <div className="proj-card__title">
                    <span>
                      <Icon size={17} style={{ verticalAlign: '-3px', marginRight: 8, color: 'var(--wm-pink)' }} />
                      {project.title}
                    </span>
                  </div>
                  <p className="proj-card__desc">{project.desc}</p>
                  <div className="tech-row">
                    {project.tech.map((t, i) => (
                      <span key={t} className={`tech-chip ${i % 2 ? 'tech-chip--green' : ''}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="proj-card__links">
                    <a className="proj-link" href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} /> Code
                    </a>
                    {project.live && (
                      <a className="proj-link" href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}

          {/* ---- Learning tools — compact cards ---- */}
          {LEARNING_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.article
                key={tool.title}
                className="wm-card wm-card--hover proj-card span-4"
                variants={cardReveal}
              >
                <div className="proj-card__body" style={{ padding: 22 }}>
                  <div className="proj-card__title">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Icon size={17} style={{ color: 'var(--wm-green)' }} />
                      {tool.title}
                    </span>
                  </div>
                  <p className="proj-card__desc">{tool.desc}</p>
                  <div className="proj-card__links">
                    <a className="proj-link" href={tool.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} /> Code
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <a className="btn btn--outline" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Github size={18} /> See all repositories
          </a>
        </motion.div>
      </div>
    </section>
  );
}
