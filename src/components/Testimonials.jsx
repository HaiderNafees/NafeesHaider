import { Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const TESTIMONIALS = [
  {
    quote:
      'Working with Nafees was an absolute pleasure. His attention to detail and technical expertise helped us deliver a fantastic product that exceeded our expectations.',
    name: 'Sarah Johnson',
    role: 'Product Manager, TechCorp',
    initials: 'SJ',
  },
  {
    quote:
      'Nafees brought both technical excellence and creative innovation to our project. His ability to understand our vision and translate it into reality was impressive.',
    name: 'Michael Chen',
    role: 'CEO, StartupX',
    initials: 'MC',
  },
  {
    quote:
      'The level of professionalism and technical skill that Nafees brings to his work is outstanding. He consistently delivered high-quality solutions aligned perfectly with our design requirements.',
    name: 'Emily Rodriguez',
    role: 'Design Director, CreativeHub',
    initials: 'ER',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-heading">Testimonials</h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <ScrollReveal key={testimonial.name} delay={i * 0.1}>
              <figure className="portfolio-card flex h-full flex-col p-8">
                <Quote size={24} className="quote-mark mb-4" />
                <blockquote className="mb-6 flex-1 text-[0.95rem] leading-[1.8] text-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3.5">
                  <div className="avatar flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[0.85rem] font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-[0.95rem] font-bold text-navy">
                      {testimonial.name}
                    </div>
                    <div className="text-[0.85rem] text-muted">{testimonial.role}</div>
                  </div>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
