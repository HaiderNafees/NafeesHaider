# Deploy Guide — nafeeshaider.vercel.app

The site is a **Vite + React** app wired to **Vercel** via GitHub.
Pushing to `main` triggers an automatic build & deploy.

---

## Push your changes

```bash
git add -A
git commit -m "Redesign: Watermelon UI + MCP21 theme, preloader, bento grids"
git push origin main
```

Vercel detects the push → builds → updates **https://nafeeshaider.vercel.app/** (usually within 1–2 minutes).

## Local preview before pushing

```bash
npm install       # only needed after pulling new deps
npm run dev       # http://localhost:5174
npm run build     # verify production build passes
npm run preview   # serve the dist/ build locally
```

## Build settings (already configured on Vercel)

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |
| Node version | 18+ (set via `package.json` engines or Vercel dashboard) |

## Rollback

Vercel keeps every deployment. In the Vercel dashboard:
**Deployments → pick a previous build → ⋯ → Promote to Production.**

## Notes

- Dependencies are minimal: `framer-motion` (animations) + `lucide-react` (icons).
- No environment variables are required — the contact form posts directly to Formspree.
- Fonts load from Google Fonts (`Inter`), preconnected in `index.html`.
