/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Bound to CSS custom properties — flip automatically in dark mode
        navy: {
          DEFAULT: 'var(--text)',
          light: 'var(--accent-text)',
          hover: 'var(--accent-hover)',
        },
        muted: 'var(--muted)',
        mist: 'var(--bg-soft)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
