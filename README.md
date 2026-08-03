# Felix Ivander — Portfolio

Personal portfolio built as a **system logbook**: a technical, document-style single-page site with an interactive 3D lanyard ID badge.

Live at **https://felixivander.vercel.app**

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **three.js** + **@react-three/fiber** — 3D badge (lazy-loaded island, not in initial bundle)
- TypeScript, CSS custom properties (no UI framework)

## Features

- **3D lanyard badge** — drag to move, flip, and spring it around; canvas-drawn card faces (front + back), cloth-strap physics. Falls back to a flat card when WebGL is unavailable or off-screen.
- **EN / ID language toggle** with persistent preference (no flash of wrong language on load).
- **Dark / light theme** with system preference detection and manual toggle.
- Fully static page (prerendered), self-hosted Google Fonts, responsive layout (card hidden on ≤980px).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The production build is served locally with:

```bash
npm run build && npm start
```

Lint: `npm run lint`

## Project Structure

- `app/page.tsx` — single client page (content comes from the language dictionary)
- `app/content.ts` — full EN/ID content dictionary + shared constants (email, links, CV path)
- `app/components/event-badge.tsx` — 3D badge scene (physics, straps, card textures)
- `app/components/badge-slot.tsx` — lazy badge island + flat fallback
- `app/components/language-provider.tsx` / `theme-toggle.tsx` — language & theme systems
- `app/layout.tsx` — fonts, metadata, FOUC-prevention scripts

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`): lint + build, then deploy to **production** on Vercel via `amondnet/vercel-action` (requires the `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets).
