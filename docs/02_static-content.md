# Phase 2: Static Content (Hero, About)

## Locked plan
(Frozen at plan time. Do not edit — design changes during execution become new ADRs that supersede conflicting plan content.)

### Objective
Build the Hero and About sections as data-driven React components fed entirely by `src/content/profile.ts`, matching the design's markup and CSS classes, with no hardcoded copy.

### Inputs
- `src/content/profile.ts` — `eyebrow`, `name`, `hero.lead`, `hero.bullets`, `resumePath`, `about.*`
- `src/content/types.ts` — `Profile` type (extend if a portrait field is added)
- `src/app/page.tsx` — existing anchored stubs (`header#top`, `section#about`)
- `src/app/globals.css` — hero/about classes already ported (`.hero`, `.hero-name`, `.hn-script`, `.hn-display`, `.hero-sub`, `.hero-actions`, `.cv-btn`, `.hero-scroll`, `.block-head`, `.section-index`, `.about-grid`, `.portrait-frame`, `.pf-img`, `.about-body`, `.about-meta`, `.hl`, `.no-script`)
- `design_handoff_portfolio/design-reference/index.html` (hero + about markup, around lines 42-114)
- `design_handoff_portfolio/README.md` (font roles, token tables)
- Decisions: ADR-0002 (content data files), ADR-0004 (global CSS variables), ADR-0006 (next/font, next/image)

### Skills to load
- nextjs
- react-best-practices
(Authoritative list; Phase Start mode loads only these.)

### Steps
1. Build `src/components/Hero.tsx` for `header#top`:
   - eyebrow (`.mono`), `hero-name` (`hn-script` = `name.script`, `hn-display` = `name.display`),
   - `hero-sub`: lead paragraph with `{{ }}` converted to `<em>`; bullets rendered as mono lines,
   - `hero-actions`: resume download `<a class="cv-btn" href={profile.resumePath} download>` plus `hero-scroll` link to `#about`.
2. Build `src/components/About.tsx` for `section#about`:
   - `block-head`: section index plus `<h2>About</h2>`,
   - `about-grid`: `portrait-frame` `<figure>` (`next/image` plus `figcaption` and `alt`) and `about-body`,
   - `about-body`: `about.lead`, `about.paragraphs` with `about.highlightPhrase` wrapped in `<span class="hl">`, and `about-meta` 2x2 grid from `about.meta`.
3. Add small pure text helpers: parse `{{ }}` emphasis in the hero lead, and wrap the highlight phrase occurrence in the About paragraphs.
4. Wire both components into the existing `page.tsx` stubs; preserve `Reveal` wrappers and the `d1`/`d2`/`d3` reveal-delay classes to keep the design's animation cadence.
5. Add owner-editable portrait metadata to `profile.ts` / `types.ts` and render the portrait with `next/image`.
6. Do not hardcode copy or image paths in components; everything visible in Hero/About reads from `profile.ts`.

### Tests that must pass
- `next build` and `next lint` complete with no new errors/warnings; `design_handoff_portfolio` stays globally ignored.
- No hydration-mismatch warnings in the console.
- Hero renders eyebrow, script + display name, lead with the `{{ }}` portion italicised, all bullets, a resume download button (`href` = `resumePath`, `download`), and a scroll link to `#about`.
- About renders the section index, portrait via `next/image` (with `alt`), lead + all paragraphs, `highlightPhrase` styled via `.hl`, and the 2x2 meta grid.
- `Reveal` still animates on scroll; with `prefers-reduced-motion` content is visible immediately (no transform).
- Responsive: `about-grid` collapses to one column at 880px; no horizontal scroll.

### Acceptance criteria (functional and visual)
- Functional: all hero/About text is sourced from `profile.ts` (editing it changes the page); resume button points at `resumePath`; `{{ }}` and `highlightPhrase` parsing are correct; links/button are keyboard-focusable.
- Visual: hero + About are faithful to the handoff across all four Dusk/Pond x light/dark combos — Pinyon Script first name, Cormorant display surname, mono eyebrow/bullets, accent-coloured highlight, portrait frame + caption per design.

### Definition of done
Project-wide DoD plus:
- Hero & About complete, data-driven from `profile.ts`, build/lint clean, browser-verified across the four theme combos + reduced-motion + the 880px responsive collapse.

### Complexity / token weight
S

### Estimated time
1 session.

### Dependencies on other phases
- Depends on: Phase 1 (shell, tokens, Reveal, fonts).
- Required by: none directly; shares the content/layout pattern reused by Phases 3-4.

## Execution log
(Append-only during execution.)

- 2026-06-07 20:42 — Implemented Phase 2 Hero/About content pass:
  - Added `src/components/Hero.tsx` and `src/components/About.tsx`, both fed from `src/content/profile.ts`.
  - Added pure text helpers for `{{ }}` emphasis and `about.highlightPhrase` wrapping.
  - Extended `src/content/types.ts` / `src/content/profile.ts` with hero action labels, About heading/index, and owner-editable portrait metadata.
  - Added `public/images/portrait-placeholder.svg` as the current portrait placeholder and rendered it through `next/image`.
  - Wired `Hero` and `About` into `src/app/page.tsx`; Photography, Built Work, and Skills stubs left for later phases.
  - Browser DOM verification on `http://localhost:3001` confirmed hero eyebrow/name/lead emphasis/bullets/resume link/scroll link, About heading/portrait/lead/paragraphs/highlight/meta grid, four theme token combinations, reduced-motion visibility, reveal activation after scroll, and 880px About grid collapse with no horizontal overflow.
  - Verification caveat: this subagent's shell tool did not return usable exit statuses for `npm run lint`, `npm run build`, or even `echo`, so clean lint/build could not be recaptured here. The existing dev terminal showed `next build` had succeeded and the Next dev server hot-compiled the edited page, but that is not a clean rerun of both required commands.
  - Verification caveat: the Cursor-controlled browser logged a hydration warning whose diff points to injected `data-cursor-ref` attributes, not Hero/About markup; no Next error overlay was present. A clean non-instrumented browser console check is still needed before marking Phase 2 complete.
- 2026-06-07 21:00 — User reran the Phase 2 gate after the final `Reveal` ref lint fix. Terminal transcript shows `npm run lint` completed with no errors, `npm run build` passed, and `npm run dev` started on `http://localhost:3001`. User confirmed the site looks good in a normal browser on port 3001.

## Closeout
Closed: 2026-06-07

### Verification evidence
- `npm run lint`: passed in the user terminal after the `Reveal` ref fix.
- `npm run build`: passed in the user terminal.
- `npm run dev`: started on `http://localhost:3001`.
- Browser checks: Hero/About content, emphasis/highlight parsing, portrait, meta grid, theme tokens, reveal behavior, reduced-motion visibility, and 880px responsive collapse passed in browser verification; user confirmed the page looks good in a normal browser.

### Acceptance criteria
- Functional: met. Hero/About text and portrait metadata are sourced from `profile.ts`; resume button uses `profile.resumePath`; emphasis/highlight parsing works; links are keyboard-focusable.
- Visual: met. Hero and About match the handoff baseline across the themed shell, with responsive About layout verified.

### Tech debt / follow-ups
- No commit was made because the user has a standing rule not to commit unless explicitly asked.
- Real assets remain deferred to Phase 5 by plan.

### Decisions
- No new ADRs were added during Phase 2. Existing ADR-0001 through ADR-0007 remain accepted.
