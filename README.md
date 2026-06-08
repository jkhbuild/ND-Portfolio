# Nirmita Dave — Portfolio

A single-page portfolio for Nirmita Dave (architect & image-maker), built with
Next.js. Designed so the content can be edited through simple text files on
GitHub — no coding required.

> Status: **in active development (Phase 1 of 5).** A complete, non-technical
> "how to edit your site" guide is added in the final docs phase. The notes
> below are the developer setup for now.

## Tech
- Next.js 16 (App Router) · React 19 · TypeScript
- Plain CSS with CSS-variable theming (Dusk/Pond × light/dark)
- Fonts via `next/font`, images via `next/image`
- Deploys on Vercel (auto-deploy from GitHub)

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

Other scripts: `npm run build` (production build), `npm start` (serve the build),
`npm run lint`.

## Where the content lives
All editable content is in `src/content/`:
- `profile.ts` — name, hero text, bio/About, intros, footer, theme defaults
- `photos.ts` — photography gallery (add new photos at the **bottom**; newest shows first)
- `projects.ts` — construction projects (add new ones at the **bottom**; newest shows first)
- `skills.ts` — software list + certifications

Images go in `public/images/` (see `public/images/README.md`); the résumé PDF
goes in `public/`.

## Project docs
- Plan & decisions: [`docs/00_plan.md`](docs/00_plan.md), [`docs/decisions/`](docs/decisions/)
- Design source of truth: [`design_handoff_portfolio/`](design_handoff_portfolio/)
