import { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const GITHUB_URL = 'https://github.com/HaiderNafees';
const LINKEDIN_URL = 'https://www.linkedin.com/in/nafeeshaider07/';
const EMAIL = 'haidernafees161@gmail.com';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setToast({ ok: false, msg: 'Please fill in all fields.' });
      setTimeout(() => setToast(null), 4200);
      return;
    }
    setSending(true);
    try {
      const response = await fetch('https://formspree.io/f/mgvaklqo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _replyto: form.email,
          _subject: `Portfolio Contact from ${form.name}`,
        }),
      });
      if (!response.ok) throw new Error('send failed');
      setToast({ ok: true, msg: "Message sent — I'll get back to you soon!" });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setToast({ ok: false, msg: 'Failed to send. Please try again.' });
    } finally {
      setSending(false);
      setTimeout(() => setToast(null), 4200);
    }
  };

  const socials = [
    { icon: Github, url: GITHUB_URL, label: 'GitHub' },
    { icon: Linkedin, url: LINKEDIN_URL, label: 'LinkedIn' },
    { icon: Mail, url: `mailto:${EMAIL}`, label: 'Email' },
  ];

  return (
    <section id="contact" className="section bg-mist">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-heading">Get In Touch</h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Info panel */}
          <ScrollReveal>
            <div className="portfolio-card flex h-full flex-col gap-5 p-8">
              <div className="contact-line">
                <Mail size={18} className="shrink-0 text-navy-light" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
              <div className="contact-line">
                <Github size={18} className="shrink-0 text-navy-light" />
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  github.com/HaiderNafees
                </a>
              </div>
              <div className="contact-line">
                <Linkedin size={18} className="shrink-0 text-navy-light" />
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/nafeeshaider07
                </a>
              </div>

              <div className="mt-auto flex gap-3 pt-4">
                {socials.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-btn"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="portfolio-card flex h-full flex-col gap-4 p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="form-label" htmlFor="cf-name">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="cf-email">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="cf-message">
                  Message
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  className="form-input"
                  placeholder="Tell me about your project…"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary mt-1 justify-center"
                disabled={sending}
                style={{ opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}
              >
                <Send size={16} />
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>

      {toast && (
        <div className={`toast ${toast.ok ? '' : 'toast--err'}`} role="status">
          {toast.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}
    </section>
  );
}
