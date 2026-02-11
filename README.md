# Portfolio (Vite + React + Tailwind + TypeScript)

- Pages: Home / Work / Contact
- Left sidebar navigation (icons) + right panel that swaps content **without changing the URL**
- Light/Dark mode swap (cream ↔ dark gray) with a **Radix UI Switch**
- Mobile polished: hamburger menu opens an accessible drawer (Escape + overlay close)

## Local dev
```bash
npm install
npm run dev
```

## Deploy (GitHub Pages + custom domain)
1. Push to GitHub (branch `main`)
2. Repo Settings → Pages → **Build and deployment: GitHub Actions**
3. This repo includes `public/CNAME` set to `danielstarks.com`.
4. Point your DNS at GitHub Pages per GitHub’s instructions.

## Notes
- Fonts are loaded from Google Fonts in `index.html`:
  - Titles: Playfair Display
  - Body/UI: Source Sans 3
