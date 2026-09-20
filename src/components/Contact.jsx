import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Rocket, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { staggerContainer, cardReveal, fadeUp, VIEWPORT } from '../lib/motion';

const GITHUB_URL = 'https://github.com/HaiderNafees';
const LINKEDIN_URL = 'https://www.linkedin.com/in/nafeeshaider07/';
const EMAIL = 'haidernafees161@gmail.com';
const LIVE_URL = 'https://nafeeshaider.vercel.app/';

/**
 * CONTACT — info panel (socials, location, deployment note) plus
 * the original Formspree-powered form, restyled for Watermelon UI.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null); // { ok: boolean, msg: string }

  const SOCIALS = [
    { icon: Github, url: GITHUB_URL, label: 'GitHub' },
    { icon: Linkedin, url: LINKEDIN_URL, label: 'LinkedIn' },
    { icon: Mail, url: `mailto:${EMAIL}`, label: 'Email' },
  ];

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setToast({ ok: false, msg: 'Please fill in all fields.' });
      return;
    }
    setSending(true);
    try {
      const response = await fetch('https://formspree.io/f/mgvaklqo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer(0.12)}
        >
          <span className="wm-badge">Contact</span>
          <h2 className="section-title section-title--grad" style={{ marginTop: 14 }}>
            Let's build something
          </h2>
          <p className="section-sub">
            Open to freelance projects and full-time opportunities. Tell me about yours.
          </p>
          <div className="accent-bar" />
        </motion.div>

        <motion.div
          className="contact-grid"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* ---------- Info panel ---------- */}
          <motion.div className="wm-card contact-card" variants={cardReveal}>
            <div className="contact-line">
              <MapPin size={19} />
              <span>Islamabad, Pakistan</span>
            </div>
            <div className="contact-line">
              <Mail size={19} />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="contact-line">
              <Github size={19} />
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">github.com/HaiderNafees</a>
            </div>

            <div className="social-row">
              {SOCIALS.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  className="social-btn"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>

            {/* Deployment note */}
            <motion.div
              style={{
                marginTop: 22,
                padding: '18px 20px',
                borderRadius: 16,
                background: 'linear-gradient(120deg, rgba(255,61,113,0.08), rgba(34,197,94,0.08))',
                border: '1px solid var(--border)',
                display: 'flex',
                gap: 13,
              }}
              variants={fadeUp}
            >
              <Rocket size={19} style={{ color: 'var(--wm-pink)', flexShrink: 0, marginTop: 2 }} />
              <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.75 }}>
                Built with Vite + React, deployed on{' '}
                <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wm-pink-soft)', fontWeight: 600 }}>
                  Vercel
                </a>
                . Source on{' '}
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wm-pink-soft)', fontWeight: 600 }}>
                  GitHub
                </a>{' '}
                — every push to <code>main</code> ships automatically.
              </p>
            </motion.div>
          </motion.div>

          {/* ---------- Form ---------- */}
          <motion.form
            className="wm-card contact-form"
            onSubmit={handleSubmit}
            variants={cardReveal}
          >
            <div className="field-row">
              <div className="field">
                <label htmlFor="cf-name">Name</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                name="message"
                rows={6}
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn--primary" type="submit" disabled={sending}>
              <Send size={17} />
              {sending ? 'Sending…' : 'Send Message'}
            </button>
            <p className="form-note">
              Powered by Formspree — your message lands straight in my inbox.
            </p>
          </motion.form>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`form-toast ${toast.ok ? 'form-toast--ok' : 'form-toast--err'}`}
            initial={{ opacity: 0, y: 24, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 12, x: '-50%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {toast.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
