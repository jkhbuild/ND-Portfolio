# Phase 4: Built Work + Skills/Certifications

## Locked plan
(Frozen at plan time. Do not edit — design changes during execution become new ADRs that supersede conflicting plan content.)

### Objective
Build the Built Work gallery (data-driven from `projects.ts`, newest-first, auto tile spans + placeholder tiles, accessible project modal) and the Skills & Certifications section (unified indexed lists from `skills.ts` per ADR-0003).

### Inputs
- `src/content/projects.ts` — `projects[]` (`img?`, `title`, `tags`, `desc`, `location`, `year`, `role`); append-at-bottom → newest-first.
- `src/content/skills.ts` — `software[]` + `certifications[]` (`name`, `sublabel`).
- `src/content/profile.ts` — `builtWork.*`, new `skills.*` section headings.
- `src/content/types.ts` — `Project`, `Skills`, `Profile` extensions.
- `src/app/page.tsx` — `#work` and `#skills` stubs.
- `src/app/globals.css` — `.work-gallery`, `.work-tile`, `.pmodal`, `.skills-wrap`, `.skill-list` already ported.
- `src/components/Lightbox.tsx` — a11y pattern to mirror for project modal.
- `src/lib/galleryLayout.ts` — pattern for `workLayout.ts`.
- `design_handoff_portfolio/design-reference/index.html` — Built Work ~L135–218, Skills ~L220–268, project modal ~L287–305 + JS ~L465–502.
- Decisions: ADR-0002 (content data files), ADR-0003 (unified skill lists), ADR-0004 (global CSS), ADR-0006 (next/font, next/image).

### Skills to load
- nextjs
- react-best-practices
(Authoritative list; Phase Start mode loads only these.)

### Steps
1. Extend `Profile` / `profile.ts` with `builtWork.sectionIndex`, `builtWork.title`, `builtWork.enlargeCue`, and a `skills` block (`sectionIndex`, `title`, `lead`, column labels).
2. Extract layout into `src/lib/workLayout.ts`: input = projects in source order + `minPlaceholders`; output = ordered tiles with `{ project, displayNumber, span: "span7"|"span5", lift, isPlaceholder, delay? }`. Reverse source array (newest first). Mark tiles placeholder when `!project.img`. Append generic placeholder projects until `minPlaceholders` empty slots exist, then pad to an even tile count. Row pattern: even rows `span7+span5`, odd rows `span5+span7` with `lift` on the second tile; second column gets `delay: 1`.
3. Build `src/components/BuiltWork.tsx` (`section.block#work`):
   - `block-head`: `§ 03`, `<h2>Built Work</h2>` (no lead).
   - `photo-intro`: `builtWork.intro` + `builtWork.enlargeCue`.
   - `.work-gallery` mapped from computed tiles; each tile is a `<button type="button" class="work-tile …">` inside `Reveal`.
   - Photo tiles: `next/image`, `.wt-corner`, hover `.wt-open`. Placeholder tiles: stripe pattern class, visible `.wt-label` with auto `wt-no`, title, kind line.
   - Wire shared work placeholder asset (`public/images/work/placeholder.svg`) — point `projects.ts` img paths at it until Phase 5 real files land.
4. Build `src/components/ProjectModal.tsx` as a client component mirroring Lightbox a11y: `role="dialog"`, `aria-modal`, Escape/backdrop/close, focus trap, scroll lock, focus return to trigger. Populate from active project: media pane (photo or stripe placeholder), `§ NN` index, title, tag pills, description, Location/Year/Role meta grid.
5. Build `src/components/Skills.tsx` (`section.block#skills`):
   - `block-head` with section index, title, lead from `profile.skills`.
   - `.skills-wrap` two columns; each column heading shows auto count (`software.length`, `certifications.length`).
   - Both columns use `.skill-list` rows: mono index + Cormorant label; certifications include `<small>` sublabel when non-empty (ADR-0003). **No chips/pills.**
6. Wire `<BuiltWork />` and `<Skills />` into `page.tsx`, replacing the empty stubs.
7. Do not hardcode copy or image paths in components; everything reads from content files.

### Tests that must pass
- `npm run build` and `npm run lint` complete with no new errors/warnings.
- No hydration-mismatch warnings in a clean browser console.
- Built Work renders newest-first with correct `span7`/`span5`/`lift` pattern; projects without `img` show placeholder tiles; `minPlaceholders` pads the grid; modal opens with correct data for real and placeholder tiles.
- Project modal: click opens; Escape, close button, and backdrop click close; focus trap + scroll lock + focus return to trigger.
- Skills: both columns use matching indexed `.skill-list` rows; counts in headings match array lengths; numbers auto-generated.
- Reveal still animates; `prefers-reduced-motion` shows content immediately.
- Responsive: work gallery single column at ≤880px; modal stacks at ≤760px; skills single column at ≤880px.

### Acceptance criteria (functional and visual)
- Functional: Built Work fully data-driven from `projects.ts` (append at bottom → appears first, layout reflows); modal keyboard-operable; Skills fully data-driven from `skills.ts` with unified list treatment.
- Visual: faithful to handoff across Dusk/Pond × light/dark — work tile hover/corner/placeholder stripes, modal card layout, skill hairline rows.

### Definition of done
Project-wide DoD plus:
- Built Work + Skills/Certs complete, data-driven, build/lint clean, browser-verified across four theme combos + reduced-motion + 880/760px breakpoints.

### Complexity / token weight
M

### Estimated time
1 session.

### Dependencies on other phases
- Depends on: Phase 1 (shell, tokens, Reveal), Phase 3 (lightbox/modal a11y pattern).
- Required by: Phase 5 (real work assets, deploy).

## Execution log
(Append-only during execution.)

- 2026-06-07: Implemented Phase 4 Built Work + Skills/Certs: authored this phase file, added `workLayout.ts`, `BuiltWork.tsx`, `ProjectModal.tsx`, `Skills.tsx`, extended `profile.ts`/`types.ts` with section headings, wired `page.tsx`, added `public/images/work/placeholder.svg`, pointed `projects.ts` img paths at placeholder until Phase 5. `npm run lint` and `npm run build` pass. Browser verification pending (user). No commit made.
- 2026-06-07: User verified photography modals, skills, themes. Removed auto-padded Built Work placeholder tiles — gallery renders only entries from `projects.ts` (a project with no `img` still shows as a stripe tile; no synthetic extras).
- 2026-06-08: Fixed empty Built Work gallery — `span7`/`span5` classes must live on the grid child (`Reveal as="figure"`), not an inner button. User confirmed tiles visible. No commit made.

## Closeout
Closed: 2026-06-08

### Verification evidence
- User browser check: Built Work tiles visible (2 projects), photography lightbox OK, skills list OK, all four theme combos OK.
- `npm run lint` / `npm run build` passed during implementation (agent-side).

### Acceptance criteria
- Functional: met. Built Work data-driven from `projects.ts`; project modal wired; Skills unified lists per ADR-0003.
- Visual: met for Phase 4 scope.

### Tech debt / follow-ups
- Work/photography use placeholder SVGs until Phase 5 real assets.
- No commit made (user standing rule).

### Decisions
- Built Work does **not** auto-add synthetic placeholder tiles (Photography-only padding behavior). Removed `minPlaceholders` from profile/types.
- No new ADRs. ADR-0001 through ADR-0007 remain accepted.
