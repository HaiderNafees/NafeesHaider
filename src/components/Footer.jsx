import { Github, Linkedin, Mail } from 'lucide-react';

const GITHUB_URL = 'https://github.com/HaiderNafees';
const LINKEDIN_URL = 'https://www.linkedin.com/in/nafeeshaider07/';
const EMAIL = 'haidernafees161@gmail.com';

const SOCIALS = [
  { icon: Github, url: GITHUB_URL, label: 'GitHub' },
  { icon: Linkedin, url: LINKEDIN_URL, label: 'LinkedIn' },
  { icon: Mail, url: `mailto:${EMAIL}`, label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy/10 bg-white py-12">
      <div className="container flex flex-col items-center gap-8 text-center">
        <blockquote className="footer-quote">
          &ldquo;The only way to do great work is to love what you do.&rdquo;
          <cite>— Steve Jobs</cite>
        </blockquote>

        <div className="flex gap-4">
          {SOCIALS.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="footer-social"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <p className="text-[0.85rem] text-muted">
          © {year} Nafees Haider · Built with React &amp; Vite
        </p>
      </div>
    </footer>
  );
}
