# Phase 1: Scaffold & Theme System

## Locked plan
(Frozen at plan time. Do not edit — design changes during execution become new ADRs that supersede conflicting plan content.)

### Objective
Stand up the Next.js 16 app and port the design's CSS-variable theming (Dusk/Pond × light/dark) with a no-flash persisted theme toggle, fonts, the global stylesheet, and the nav/footer/scroll-reveal shell.

### Inputs
- `design_handoff_portfolio/design-reference/styles.css` (full design system — port as global CSS)
- `design_handoff_portfolio/design-reference/index.html` (nav, footer markup + theme-control + reveal + scroll-spy JS)
- `design_handoff_portfolio/README.md` (token tables, font roles, behaviors)
- Decisions: ADR-0001 (Next.js), ADR-0004 (global CSS variables), ADR-0006 (next/font, next/image), ADR-0007 (2 palettes, no Tweaks panel)

### Skills to load
- nextjs
- react-best-practices
(Authoritative list; Phase Start mode loads only these.)

### Steps
1. Scaffold `create-next-app@latest` (TypeScript, App Router, ESLint, `src/`, no Tailwind). **Blocked until terminal backend is available.**
2. Configure `next/font/google`: Cormorant Garamond, Hanken Grotesk, Space Mono, Pinyon Script → CSS variables (`--font-display`, `--font-body`, `--font-mono`, `--font-script`).
3. Port `styles.css` into a global stylesheet imported in `app/layout.tsx`; drop the dormant `wire` palette and the `data-display` swap (Cormorant is the only display font).
4. Set up `src/content/profile.ts` skeleton with `theme` defaults + grain flag; type definitions in `src/content/types.ts`.
5. Build `ThemeProvider`/toggle as a client component: sets `data-palette`/`data-mode` on `<html>`, persists to `localStorage` (`nd-palette`, `nd-mode`). Add an inline `beforeInteractive` script in `layout.tsx` to apply stored theme before paint (no flash).
6. Build `Nav` (wordmark, links, segmented palette/mode controls) and `Footer` components from `profile.ts`.
7. Build a `Reveal` mechanism using IntersectionObserver (replaces the prototype's rect-based reveal) honoring `prefers-reduced-motion`; build nav scroll-spy (`scrolled` + active link).
8. Optional film-grain layer gated by `profile.theme.grain`.

### Tests that must pass
- `next build` and `next lint` complete with no errors/warnings.
- Theme toggle: switching palette/mode updates the whole page and persists across reload; no flash of wrong theme on load (verify with throttled reload).
- Nav: `scrolled` border appears past 40px; active link tracks the section in view; links hidden < 720px; theme controls remain.
- Reveal: elements animate in on scroll; with `prefers-reduced-motion` they are visible immediately (no transform).
- No hydration mismatch warnings in console.

### Acceptance criteria (functional and visual)
- Functional: all four theme combinations (Dusk/Pond × light/dark) reachable from the top bar and persisted; keyboard-operable controls with `aria-pressed`.
- Visual: nav + footer match the handoff (wordmark Pinyon Script, mono sub-label, segmented pills with colour dots; footer name Pinyon 2rem). Token colours match the handoff tables exactly in all four combos.

### Definition of done
Project-wide DoD plus:
- Theme system + shell complete; tokens verified against the handoff colour tables; no-flash confirmed; reveal + scroll-spy working.

### Complexity / token weight
M

### Estimated time
1–2 sessions (scaffold + theming is the heaviest plumbing).

### Dependencies on other phases
- Depends on: none
- Required by: phases 2, 3, 4, 5 (all build on the shell + tokens)

## Execution log
(Append-only during execution.)

- 2026-06-07 — Scaffold written manually (terminal backend was down, so `create-next-app` could not be run; files authored directly instead). Landed:
  - Config: `package.json` (Next ^16, React ^19, TS), `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `eslint.config.mjs` (flat config), `.gitignore` (standard Next + OS/editor), `.nvmrc` (24).
  - Theme/shell: `src/app/globals.css` (full design-system port; dropped `wire` palette + font-token block per ADR-0004/0007), `src/app/layout.tsx` (next/font for all 4 families → CSS vars; no-flash inline theme script; grain layer gated by `profile.theme.grain`), `src/app/page.tsx` (anchored section stubs).
  - Components: `Reveal` (IntersectionObserver, reduced-motion aware), `ThemeControls` (palette/mode segmented controls + persistence), `Nav` (scroll-spy + scrolled state + wordmark), `Footer`.
  - Content layer: `src/content/{types,profile,photos,projects,skills}.ts` populated from the handoff with owner-facing comments and the "append at bottom → newest first" convention.
  - Assets: `public/images/{portrait,photography,work}/` + `public/images/README.md`; root `README.md` (dev setup).
- **Pending verification (needs terminal):** `npm install`, then `next build` / `next dev`. 
  - **Watch item:** `next/font` Cormorant Garamond is configured as a variable font (no explicit `weight`, italic+roman). If the build errors with "Missing weight for font Cormorant_Garamond", add `weight: ["400","500","600"]` to that loader in `src/app/layout.tsx`.
- Not yet done in this phase: live verification of the 4 theme combos, no-flash check, scroll-spy/reveal behavior. Git branch/commit deferred (terminal down; commit only on request).
- 2026-06-07 — Resume attempt selected the pending Phase 1 verification track from the handoff. Terminal commands still returned no usable status/output, so `npm install`, `npm run build`, `npm run lint`, and live browser checks remain blocked. Static pass applied the known `next/font` watch item by adding explicit Cormorant Garamond weights (`400`, `500`, `600`) in `src/app/layout.tsx`.

## Closeout
(Filled at Phase End.)
