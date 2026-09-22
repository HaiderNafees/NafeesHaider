import ScrollReveal from './ScrollReveal';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'Design',
    skills: ['Responsive Design', 'UI/UX', 'Animation', 'Accessibility'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'Vite', 'REST APIs', 'Node.js Basics', 'WordPress'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section bg-mist">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-heading">Skills</h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SKILL_CATEGORIES.map((category, i) => (
            <ScrollReveal key={category.title} delay={i * 0.1}>
              <div className="portfolio-card h-full p-8">
                <h3 className="mb-5 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-navy-light">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
