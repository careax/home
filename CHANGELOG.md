# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — 2026-05-29

### 🚀 Initial Release

#### Added
- **index.html** — Full single-page layout with semantic sections: `#hero`, `#about`, `#curriculum`, `#method`, `#voices`, `#contact`
- **css/style.css** — Dark-mode design system (CSS custom properties, responsive grid, ticker animation)
- **js/main.js** — Nav scroll detection, IntersectionObserver fade-in, curriculum filter tabs, smooth scroll, mobile hamburger menu
- **js/i18n.js** — KO/EN bilingual dictionary with `localStorage` persistence; `data-i18n` attribute–driven DOM updates
- **js/version-viewer.js** — Version badge (fixed bottom-right) → modal with version, commit hash, changelog
- **js/db-handler.js** — Contact form `fetch('/api/inquire')` with client-side validation and loading state
- **api/inquire.js** — Serverless function: Neon DB `INSERT` + Nodemailer email notification to `careax.rana@gmail.com`
- **.github/workflows/deploy.yml** — GitHub Actions → GitHub Pages auto-deploy on push to `main`
- **.gitignore** — Excludes `.env`, `node_modules`, build artifacts, OS files
- **.env.example** — Template with `DATABASE_URL=[YOUR_PASSWORD]` masking
- **CHANGELOG.md** — This file
- **README.md** — Full PRD specification (DB credentials masked)

#### Design
- Reference site: `https://careax.github.io/careax-home/`
- Dark background `#0a0a0a` with gold accent `#c9a84c`
- SVG diamond logo · Inter + Noto Sans KR typography
- Horizontal ticker animation (hero + stats)
- Mobile-responsive hamburger nav

#### Deployment
- Repository: `careax/home`
- Live URL: `https://careax.github.io/home/`
