import ScrollReveal from './ScrollReveal';

const MILESTONES = [
  {
    number: '01',
    role: 'Freelance Web Developer',
    period: '2021 – Present',
    description:
      'Designing and building responsive websites for clients across e-commerce and corporate sectors with HTML, CSS, JavaScript and React — from landing pages to full storefronts.',
  },
  {
    number: '02',
    role: 'Frontend Web Developer',
    company: 'MaltaThemes',
    period: 'Jun 2022 – Apr 2023',
    description:
      'Developed and maintained modern web applications focused on performance and UX. Collaborated on responsive designs and optimized frontend functionality across products.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-heading">Timeline</h2>
        </ScrollReveal>

        {/* Horizontal track with navy dots (desktop) */}
        <ScrollReveal className="mt-14 hidden md:block">
          <div className="timeline-track">
            <span className="timeline-dot" style={{ left: '25%' }} />
            <span className="timeline-dot" style={{ left: '75%' }} />
          </div>
        </ScrollReveal>

        {/* Milestone cards aligned below the markers */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:mt-10">
          {MILESTONES.map((milestone, i) => (
            <ScrollReveal key={milestone.number} delay={i * 0.1}>
              <article className="portfolio-card h-full p-8">
                <div className="timeline-num">{milestone.number}</div>
                <h3 className="timeline-role">{milestone.role}</h3>
                {milestone.company && (
                  <p className="timeline-company">{milestone.company}</p>
                )}
                <p className="timeline-period">{milestone.period}</p>
                <p className="timeline-desc">{milestone.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
