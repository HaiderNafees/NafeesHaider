import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const STORAGE_KEY = 'theme';

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Light/dark switch for the navbar.
 * The inline script in index.html has already set `data-theme` before
 * first paint, so this just mirrors it and updates on user toggle.
 * Until the visitor picks a side themselves, the OS preference wins.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Follow OS theme changes only while the user has no stored choice.
  useEffect(() => {
    if (readStoredTheme()) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  };

  const isDark = theme === 'dark';
  const label = `Switch to ${isDark ? 'light' : 'dark'} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun key="sun" size={18} /> : <Moon key="moon" size={18} />}
    </button>
  );
}
