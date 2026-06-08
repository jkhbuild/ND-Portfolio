# Nirmita Dave — Portfolio — Plan

## Product summary
A single-page, static personal portfolio for **Nirmita Dave** — a licensed architect / construction-management professional who is also a photographer. Sections: hero, About, Photography, Built Work, Skills & Certifications, footer. Two colour palettes (Dusk / Pond) × light/dark, persisted across visits. There is **no contact/email section** by design. Success for v1: pixel-faithful to the design handoff, fully responsive, and — the primary goal — **fully editable by a non-technical owner through the GitHub web UI** (add a photo, add a construction project, edit bio, edit any description, swap the résumé) with a comprehensive README.

## Stack
- Runtime / language: Node 24 LTS, TypeScript 5
- Framework: Next.js 16 (App Router, SSG), React 19
- Database: none (all content static, in-repo)
- Auth: none — public read-only site, no backend
- Hosting / deployment: Vercel, auto-deploy from GitHub `main`
- Other pinned dependencies: `next/font` (self-hosted Google fonts), `next/image`; no UI framework (bespoke CSS). ESLint via `create-next-app`.

## Data model
All owner-editable content lives in `src/content/*.ts` as typed, heavily-commented arrays/objects. No database.

- **profile** (single object) — `name` (script/display parts), `eyebrow`, `heroLead` (with emphasis span), `heroBullets[]`, `resumePath`, `about` `{ lead, paragraphs[], highlightWord }`, `aboutMeta { discipline, also, based, since }`, `photographyIntro { series, lead }`, `builtWorkIntro`, `footer { blurb, copyright }`, `theme { defaultPalette: "dusk"|"pond", defaultMode: "light"|"dark", grain: boolean }`.
- **photos[]** — `{ src, title, meta, alt }`. PK = array position. **Append at end; rendered reversed (newest first).** Layout (2→3→2→3 rhythm + alternating tall/wide swap) derived from display index.
- **projects[]** (Built Work) — `{ img?, title, tags: string[], desc, location, year, role }`. PK = array position. **Append at end; rendered reversed.** Tile spans + "coming soon" placeholder tiles derived automatically from count; a project with no `img` renders as a stripe placeholder.
- **skills** (object) — `software: string[]` + `certifications: { name, sublabel }[]`. Rendered as two matching indexed lists with auto-generated numbers.

All visible indices (`§ 01…`, photo numbers, certification numbers, tile sizing/placeholders) are **computed from position at render** — the owner never edits a number or reorders entries.

## Browser / device targets
Modern evergreen browsers (Chrome, Safari, Firefox, Edge), desktop + mobile responsive. Breakpoints from the design: 880px (grids → 1 col; photo grid → 2 col), 760px (modal stacks), 720px (nav links hide), 460px (theme buttons compact).

## Cross-cutting decisions
- Budget: free tier only (Vercel hobby).
- Data sensitivity: none — public portfolio, no user data, no PII collection, no forms.
- Regulatory: none.
- Offline behavior: none required.
- Accessibility: WCAG 2.1 AA target; `prefers-reduced-motion` respected (already in design); semantic landmarks, alt text on every image, keyboard-operable lightbox/modal/theme controls.
- i18n: none — English only.

## Out of scope (v1)
- Contact form / email / mailto section (explicitly omitted by design).
- Any CMS / admin UI / WYSIWYG editor — editing is via GitHub web UI + data files.
- Backend, database, authentication, server APIs.
- Blog, analytics (may add Vercel Analytics post-v1), e-commerce, search.
- The dormant third "wire" palette and the prototype "Tweaks" panel (see ADR-0007).
- Internationalisation.

## Definition of Done (project-wide)
- [ ] All planned phases closed (DoD met + handoff written for each).
- [ ] All 6 sections pixel-faithful to the handoff across Dusk/Pond × light/dark.
- [ ] Fully responsive at 880/760/720/460; no horizontal scroll; `prefers-reduced-motion` honored.
- [ ] Photos & projects are data-driven, newest-first by appending to the end of a list; all indices auto-generated.
- [ ] Skills & Certifications unified as matching indexed lists.
- [ ] Theme choice persists (localStorage) with no hydration flash.
- [ ] Images via `next/image`; fonts via `next/font`; no console errors; `next build` clean.
- [ ] README explains, for a non-technical owner via GitHub web UI: add a photography photo, add a construction project, edit bio, edit any description, replace the résumé, change theme defaults — with step-by-step instructions.
- [ ] Deploys on Vercel from GitHub with auto-deploy; a broken content edit fails the build and leaves the last good deploy live.
- [ ] Lighthouse (desktop): Performance ≥ 90, Accessibility ≥ 95 (target).
- [ ] CLAUDE.md "Active phase" reads "All phases complete".
- [ ] All ADRs active or properly superseded; no `TODO`/`FIXME` without a tracked follow-up.

## Fully-shipped checklist
- [ ] **Secrets/config:** none required (no secrets); `.gitignore` excludes `.env*` and build output. — *committed (Phase 1)*
- [ ] **Security checkpoint:** static site, no inputs/endpoints; `npm audit` clean; external links `rel="noopener"`. — *Phase 5*
- [ ] **Error handling:** `not-found.tsx`; graceful empty states (no photos/projects). — *Phases 3–4*
- [ ] **Observability:** none-by-design for v1 (optional Vercel Analytics later). — *waived v1*
- [ ] **Dependency hygiene:** lockfile committed; pinned majors; no `latest`. — *Phase 1*
- [ ] **Documentation discipline:** README updated each phase; ADRs for significant choices. — *ongoing*
- [ ] **A11y & performance budgets:** WCAG 2.1 AA + Lighthouse targets above. — *Phase 5*
- [ ] **Backup/data export:** N/A — all content is plain text/images in the git repo. — *waived*

## Deferred questions
| # | Question | Will revisit in phase |
|---|---|---|
| 1 | Real image assets (portrait, 5 photography images, 2 project photos) + real CV PDF | Phase 5 (owner provides; scaffold uses placeholders) |
| 2 | Custom domain vs default `*.vercel.app` | Phase 5 (deploy) |
| 3 | Film-grain default intensity / on-off | Phase 1 (config flag), tuned Phase 5 |
| 4 | GitHub repo ownership/remote + who holds Vercel project | Phase 5 (deploy) |
| 5 | Optional Vercel Analytics | post-v1 |

## Phase list
| # | Name | Objective | Skills to load | Complexity | Est. sessions | Dependencies | Status |
|---|------|-----------|----------------|------------|---------------|--------------|--------|
| 1 | Scaffold & Theme System | Stand up Next.js 16 app, port CSS-variable theming (Dusk/Pond × light/dark) with no-flash toggle, fonts, global CSS, and nav/footer/reveal shell. | nextjs, react-best-practices | M | 1–2 | none | planned |
| 2 | Static Content (Hero, About) | Build hero + About sections driven by `profile.ts`. | nextjs, react-best-practices | S | 1 | phase 1 | planned |
| 3 | Photography Gallery | Data-driven gallery (reverse render, 2→3 rhythm + alternating swap, auto-index, `next/image`) + accessible lightbox. | nextjs, react-best-practices | M | 1 | phase 1 | planned |
| 4 | Built Work + Skills/Certs | Data-driven work gallery (reverse render, auto-spans + auto placeholders) + project modal; redesigned unified Skills/Certifications lists. | nextjs, react-best-practices | M | 1–2 | phase 1 | planned |
| 5 | Docs & Deploy | Comprehensive owner README (GitHub web-UI editing), placeholder→real asset system, Vercel deploy + auto-deploy, final a11y/perf/responsive pass. | nextjs, vercel-cli, deployments-cicd | M | 1 | phases 1–4 | planned |

Each phase has its own file at `docs/0N_<phase-name>.md` (created at phase start; phase 1 created now).
