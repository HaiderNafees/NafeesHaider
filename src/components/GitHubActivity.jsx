import { Github } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const CONTRIBUTION_LEVELS = [
  0, 1, 0, 2, 0, 0, 1, 0, 3, 0, 1, 0, 2, 0,
  0, 1, 0, 0, 2, 0, 4, 0, 1, 0, 3, 0, 0, 1,
  2, 0, 0, 1, 0, 3, 0, 0, 2, 0, 1, 0, 4, 0,
  0, 1, 0, 2, 0, 3, 0, 0, 1, 0, 2, 0, 0, 1,
  1, 0, 3, 0, 0, 2, 0, 0, 1, 0, 4, 0, 2, 0,
];

const STATS = [
  { value: '31', label: 'Repositories' },
  { value: '5', label: 'New repos (Sep 2026)' },
  { value: '3+', label: 'Years Active' },
];

const getLevelClass = (level) => {
  switch (level) {
    case 1:
      return 'active';
    case 2:
      return 'active-2';
    case 3:
      return 'active-3';
    case 4:
      return 'active-4';
    default:
      return '';
  }
};

export default function GitHubActivity() {
  return (
    <section id="github" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-heading">GitHub Activity</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="portfolio-card mt-12 flex flex-col gap-8 p-8 md:p-10">
            {/* Profile header */}
            <div className="flex flex-wrap items-center gap-5">
              <img
                src="https://iili.io/3IdLevn.png"
                alt="Nafees Haider GitHub avatar"
                width={72}
                height={72}
                className="avatar-ring h-[72px] w-[72px] rounded-full object-cover"
              />
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Github size={20} className="text-navy" />
                  <span className="text-xl font-bold text-navy">@HaiderNafees</span>
                </div>
                <p className="text-[0.9rem] text-muted">
                  31 Repositories · Active Contributor
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 md:gap-12">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-[1.8rem] font-extrabold tracking-tight text-navy-light">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[0.85rem] text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Simplified contribution graph */}
            <div>
              <p className="mb-3 text-[0.85rem] font-medium text-muted">
                Contribution Activity
              </p>
              <div className="flex flex-wrap gap-1">
                {CONTRIBUTION_LEVELS.map((level, i) => (
                  <div key={i} className={`contrib-dot ${getLevelClass(level)}`} />
                ))}
              </div>
            </div>

            <a
              href="https://github.com/HaiderNafees"
              target="_blank"
              rel="noopener noreferrer"
              className="proj-link w-fit"
            >
              View profile on GitHub →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
