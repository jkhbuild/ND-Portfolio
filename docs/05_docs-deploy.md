# Phase 5: Docs & Deploy

## Locked plan
(Frozen at plan time. Do not edit — design changes during execution become new ADRs that supersede conflicting plan content.)

### Objective
Make the portfolio shippable and owner-maintainable: write a comprehensive non-technical owner README for GitHub web-UI editing (add a photo, add a project, edit the bio, edit any description, swap the résumé, change theme defaults), promote the real client assets from the design handoff into `public/` (replacing every placeholder), add a `not-found.tsx`, and run the final hardening pass — `npm audit`, Lighthouse (Perf ≥ 90, A11y ≥ 95 desktop), and a responsive sweep at 880/760/720/460 — then connect the GitHub repo to Vercel (free hobby tier) with auto-deploy from `main`. No commit unless the user asks.

### Inputs
- `design_handoff_portfolio/design-reference/assets/` — real client assets to promote (use as-is):
  - `portrait.jpeg` → portrait (About).
  - Photography: `tree-pond.jpeg`, `brick-window.jpeg`, `pink-wires.jpeg`, `lotus.jpeg`, `swan.jpeg`.
  - Built Work: `tonnelle.jpg` (Tonnelle Avenue Bridge), `pkg6.jpg` (MTA PKG 6 — ADA Upgrades).
  - `Nirmita-Dave-CV.pdf` — résumé linked from the hero download button.
- `src/content/photos.ts` — 5 `src` fields currently point at `/images/photography/placeholder.svg`; bottom-of-list order maps newest-first to Swan, Lotus, Crossed Wires, Shut for the Season, Tree.
- `src/content/projects.ts` — 2 `img` fields currently point at `/images/work/placeholder.svg`.
- `src/content/profile.ts` — `portrait.src` = `/images/portrait-placeholder.svg`; `resumePath` = `/Nirmita-Dave-CV.pdf`; `theme.defaultPalette` / `theme.defaultMode` / grain flag (owner-editable defaults).
- `public/images/` — current tree: `photography/`, `portrait/`, `work/` dirs (with `.gitkeep`), placeholder SVGs, and `public/images/README.md`.
- `src/app/` — App Router root; no `not-found.tsx` yet; `app/page.tsx`, `app/layout.tsx`, `app/globals.css`.
- `docs/00_plan.md` — project DoD + "Fully-shipped checklist" (Phase 5 rows: Security checkpoint, A11y & perf budgets) + Deferred questions 1/2/4 (real assets, custom domain, Vercel ownership).
- Decisions: ADR-0005 (hosting Vercel auto-deploy), ADR-0002 (content data files, append→reverse), ADR-0006 (next/font, next/image), ADR-0007 (scope: no grain/tweaks/wire palette).
- `CLAUDE.md` — standing rules (owner content only in `src/content/*.ts`; append at bottom; free tier only; no commit unless asked).

### Skills to load
- nextjs
- vercel-cli
- deployments-cicd
(Authoritative list; Phase Start mode loads only these.)

### Steps
1. **Promote real assets into `public/`** (do not edit `design_handoff_portfolio/` — it stays globally ignored; copy out of it):
   - `portrait.jpeg` → `public/images/portrait/portrait.jpeg`.
   - 5 photography files → `public/images/photography/` (keep original filenames).
   - `tonnelle.jpg`, `pkg6.jpg` → `public/images/work/`.
   - `Nirmita-Dave-CV.pdf` → `public/Nirmita-Dave-CV.pdf` (matches existing `resumePath`).
2. **Repoint content data files** (the only place paths change — never hardcode in components):
   - `photos.ts`: set each `src` to its real photography path in append/newest-first order (bottom entry = Swan → `swan.jpeg`; then Lotus, Crossed Wires/`pink-wires.jpeg`, Shut for the Season/`brick-window.jpeg`, Tree/`tree-pond.jpeg`). Update each `alt` to describe the real image if still generic.
   - `projects.ts`: set the two `img` fields to `/images/work/tonnelle.jpg` and `/images/work/pkg6.jpg`.
   - `profile.ts`: set `portrait.src` to `/images/portrait/portrait.jpeg` and refine the portrait caption/alt; confirm `resumePath` resolves to the copied PDF.
   - Leave the placeholder SVGs in the repo (still used by any future entry that has no real image / no `img`).
3. **Confirm `next/image` config** handles the real raster assets: local files under `public/` need no `remotePatterns`; verify intrinsic sizing / `sizes` props still produce no layout shift or console warnings with real (non-square) photos.
4. **Add `src/app/not-found.tsx`** — a themed 404 using existing tokens/components (wordmark or `§`/mono treatment, a "back to top/home" link), respecting palette/mode and reduced-motion; no new owner-editable copy outside `src/content` unless trivially static. Verify graceful empty states (no photos / no projects) still render.
5. **Write the owner README** (`README.md` at repo root) for a **non-technical owner editing via the GitHub web UI** — step-by-step with file paths and "append at the bottom" emphasis:
   - **Add a photograph** — upload the image into `public/images/photography/`, then append a new `{ src, title, meta, alt }` object at the **end** of `photos.ts`; explain it renders newest-first and auto-numbers (never reorder/hand-number).
   - **Add a construction project** — upload into `public/images/work/`, append a `{ img, title, tags, desc, location, year, role }` object at the **end** of `projects.ts`; note that omitting `img` renders a stripe placeholder tile.
   - **Edit the bio / any description** — which fields in `profile.ts` (about lead/paragraphs, meta grid) and the `desc` fields in `projects.ts`.
   - **Swap the résumé** — replace `public/Nirmita-Dave-CV.pdf` (keep the filename, or update `resumePath` in `profile.ts`).
   - **Change theme defaults** — edit `theme.defaultPalette` / `theme.defaultMode` (and grain flag) in `profile.ts`.
   - **How edits go live** — committing on `main` in the web UI triggers a Vercel build; a broken edit fails the build and the last good deploy stays live.
   - Include a short "what NOT to touch" note (components, computed indices) and that all editable content lives in `src/content/*.ts` + `public/`.
6. **Security / dependency checkpoint:** run `npm audit` (and `npm audit fix` only for non-breaking) — record residual advisories; confirm the lockfile is committed and majors are pinned (no `latest`); verify external links carry `rel="noopener"`/`noreferrer`.
7. **Performance & a11y pass:** `npm run build` + production serve; run Lighthouse (desktop) on the built site and tune to **Perf ≥ 90, A11y ≥ 95** (image sizing/priority on the hero/portrait, font display, landmark/alt/contrast checks). Record scores.
8. **Responsive sweep** at **880 / 760 / 720 / 460** px: 880 → grids collapse (photo grid to 2-col), 760 → project modal stacks, 720 → nav links hide (theme controls stay), 460 → theme buttons compact / dots hidden; no horizontal scroll at any width.
9. **Vercel deploy (free hobby tier):** connect the GitHub repo to a Vercel project, framework preset Next.js, auto-deploy from `main` (per ADR-0005); confirm a production build succeeds and the `*.vercel.app` URL is live. **Defer** custom domain and final repo/Vercel ownership to the user (Deferred questions 2 & 4) — surface, don't decide. No paid features.
10. **Finalize docs:** update `CLAUDE.md` Active phase to "All phases complete", tick the project DoD + Fully-shipped checklist rows this phase closes, and write the phase closeout + handoff. Do **not** commit unless the user asks.

### Tests that must pass
- `npm run build` and `npm run lint` complete with no new errors/warnings; `design_handoff_portfolio` stays globally ignored (assets are copied, not referenced in place).
- Every section renders the **real** assets — portrait, 5 photographs, 2 project photos, downloadable résumé — with no remaining placeholder SVG visible in any populated slot, and no broken-image / 404 asset requests in the console or network tab.
- Résumé download button serves `public/Nirmita-Dave-CV.pdf` (correct file, `download` attribute works).
- `not-found.tsx` renders a themed 404 for an unknown route, respects palette/mode + reduced-motion, and offers a working link back; empty-state (no photos/projects) still renders gracefully.
- README contains complete, accurate, copy-pasteable steps for all six owner tasks (add photo, add project, edit bio, edit description, swap résumé, change theme defaults) with correct file paths and the append→newest-first convention.
- `npm audit` shows no unaddressed high/critical advisories (residuals documented); lockfile committed; no `latest` deps.
- Lighthouse (desktop, production build): **Performance ≥ 90, Accessibility ≥ 95**.
- No horizontal scroll and correct layout behavior at 880/760/720/460; `prefers-reduced-motion` honored.
- Vercel project builds from `main` and auto-deploys; the live `*.vercel.app` URL serves the current site; a deliberately broken content edit fails the build and leaves the previous deploy live (verify the failure mode without shipping the break).

### Acceptance criteria (functional and visual)
- **Functional:** the site is fully owner-maintainable through the GitHub web UI per the README (append a photo/project at the bottom → it appears first, auto-numbered; bio/descriptions/résumé/theme defaults editable in `src/content` + `public`); Vercel auto-deploys from `main` on free tier; broken edits fail the build and preserve the last good deploy; `not-found.tsx` and empty states behave; `npm audit` and Lighthouse targets met.
- **Visual:** real assets are faithful to the handoff across Dusk/Pond × light/dark — portrait grayscale/rotation/caption tab, photography gallery rhythm with real frames, work tiles + modal with real project photos — and responsive behavior matches at all four breakpoints. The 404 page is on-brand with the token system.

### Definition of done
Project-wide DoD plus:
- Owner README complete and accurate for all six web-UI tasks; all real assets promoted into `public/` and wired through `src/content/*.ts` (no placeholders in populated slots); `not-found.tsx` added; `npm audit` clean (residuals documented); Lighthouse Perf ≥ 90 / A11y ≥ 95; responsive verified at 880/760/720/460; Vercel project live with auto-deploy from `main` on the free hobby tier; `CLAUDE.md` Active phase reads "All phases complete"; build/lint clean; browser-verified across the four theme combos + reduced-motion. Custom domain and final repo/Vercel ownership surfaced to the user as open items (Deferred questions 2 & 4). No commit unless the user asks.

### Complexity / token weight
M

### Estimated time
1 session.

### Dependencies on other phases
- Depends on: Phases 1–4 (shell/tokens/fonts, content data pattern, photography gallery + lightbox, Built Work + Skills) — all sections must be complete to run the final asset/a11y/perf/deploy pass.
- Required by: none — this is the terminal phase (ships v1).

## Execution log
(Append-only during execution.)

- 2026-06-08: Step 1 — Copied real assets from `design_handoff_portfolio/design-reference/assets/` into `public/`: portrait, 5 photography JPEGs, 2 work JPGs, `Nirmita-Dave-CV.pdf`. Design handoff folder untouched.
- 2026-06-08: Step 2 — Repointed `photos.ts`, `projects.ts`, `profile.ts` to real paths; updated portrait intrinsic dimensions (1206×769) and CSS `aspect-ratio` to match.
- 2026-06-08: Step 3 — Confirmed `next.config.ts` needs no `remotePatterns` for local `public/` rasters; existing `sizes` props retained.
- 2026-06-08: Step 4 — Added `src/app/not-found.tsx` + `.not-found` styles (themed §404, home link, reduced-motion).
- 2026-06-08: Step 5 — Replaced root `README.md` with comprehensive owner guide (all six GitHub web-UI tasks).
- 2026-06-08: Step 6 — `npm audit`: 2 moderate transitive PostCSS advisories via `next`; `npm audit fix` (non-breaking) had no effect; documented residuals. No `target=_blank` external links in codebase.
- 2026-06-08: Step 7 — `npm run lint` pass; `npm run build` pass (Next.js 16.2.7). Lighthouse desktop (production serve on :3000): **Performance 96**, **Accessibility 95**.
- 2026-06-08: Step 8 — Responsive sweep (code/CSS review at 880/760/720/460): `@media (max-width: 880px)` collapses about-grid, photo-gallery→2-col, work-gallery→full-width, skills→1-col; `@media (max-width: 760px)` stacks project modal; `@media (max-width: 720px)` hides nav-links, compacts nav-right; `@media (max-width: 460px)` compacts theme seg buttons, hides palette dots; `body { overflow-x: hidden }` + `prefers-reduced-motion` rules present. Browser pixel-check deferred to user.
- 2026-06-08: Step 9 — `npx vercel link` succeeded (project `nd-portfolio`, id `prj_1bC5WKNCaIeoCMcySUq80BrNpBi3`). GitHub repo connect failed (`jkhbuild/ND-Portfolio` — access/typo). `npx vercel --prod` not run (deploy approval blocked in agent env). User must connect GitHub + deploy.
- 2026-06-08: Step 10 — Updated `CLAUDE.md`, `docs/00_plan.md` DoD/checklist, this closeout, phase handoff. No commit (user standing rule).

## Closeout
Closed: 2026-06-08

### Verification evidence
- `npm run lint` — pass (no errors/warnings).
- `npm run build` — pass; static `/` + `/_not-found` prerendered.
- Real assets present under `public/images/` and `public/Nirmita-Dave-CV.pdf`; content files wired.
- Lighthouse desktop (CLI, production server): Performance **96**, Accessibility **95**.
- `npm audit`: 0 high/critical; 2 moderate transitive (PostCSS via Next — fix requires breaking downgrade).

### Acceptance criteria
- **Functional:** met except live Vercel auto-deploy URL (project linked; GitHub connect + prod deploy deferred to user). Owner README, real assets, `not-found.tsx`, audit/build/lint, Lighthouse targets met.
- **Visual:** real assets wired; responsive CSS breakpoints verified in code; browser theme-combo check deferred to user.

### Tech debt / follow-ups
- Vercel: connect `jkhbuild/ND-Portfolio` on dashboard, run first production deploy, confirm `*.vercel.app` URL.
- Custom domain (Deferred Q2) and repo/Vercel ownership (Deferred Q4) — user decision.
- User browser verification: four theme combos, reduced-motion, résumé download, 404 route, responsive at 880/760/720/460.
- Build-failure mode (broken content edit preserves last deploy) — verify after GitHub auto-deploy is live.
- No commit made (user standing rule).

### Decisions
- Portrait `aspect-ratio` updated from 1206/1481 (placeholder) to 1206/769 (real JPEG) to prevent layout shift.
- No new ADRs. ADR-0005 (Vercel hobby auto-deploy) remains accepted; deploy wiring incomplete pending user GitHub connect.
