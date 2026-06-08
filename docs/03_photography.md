# Phase 3: Photography Gallery

## Locked plan
(Frozen at plan time. Do not edit — design changes during execution become new ADRs that supersede conflicting plan content.)

### Objective
Build the Photography section as a data-driven gallery fed entirely by `src/content/photos.ts` — rendered newest-first, following the 2->3->2->3 row rhythm with alternating tall/wide swap and computed display layout, images via `next/image` — plus an accessible, keyboard-operable lightbox.

### Inputs
- `src/content/photos.ts` — `photos[]` (`src`, `title`, `meta`, `alt`); append-at-bottom -> newest-first convention.
- `src/content/types.ts` — `Photo` type; `Profile.photography` (`series`, `lead`).
- `src/content/profile.ts` — `photography.series`, `photography.lead`.
- `src/app/page.tsx` — existing `section.block#photography` stub.
- `src/app/globals.css` — gallery + lightbox classes already ported: `.photo-intro`, `.photo-gallery`, `figure.shot`, `.shot.s-tall/.s-wide/.s-third/.lift`, `.cap .t`/`.cap .x`, `.lightbox`, `.lightbox.open`, `.lb-cap`, `.lb-x`; 880px collapse rules.
- `src/components/Reveal.tsx` — reveal wrapper.
- `design_handoff_portfolio/design-reference/index.html` — photography markup, lightbox markup, gallery layout JS, lightbox JS.
- Decisions: ADR-0002 (content data files), ADR-0004 (global CSS variables), ADR-0006 (next/font, next/image).

### Skills to load
- nextjs
- react-best-practices
(Authoritative list; Phase Start mode loads only these.)

### Steps
1. Extract the layout algorithm into a pure module such as `src/lib/galleryLayout.ts`: input = photos in source order; output = ordered tiles with `{ photo, displayIndex, size: "s-tall" | "s-wide" | "s-third", lift: boolean, delay?: 1 | 2 }`. It must reverse the array (newest first), walk a 2->3->2->3 rhythm, swap tall/wide sides on alternating 2-rows, render a lone leftover as `s-wide`, and in 3-rows mark the middle tile `lift d1` and the third `d2`.
2. Build `src/components/Photography.tsx` for `section.block#photography`:
   - `block-head` with `section-index` "§ 02", `<h2>Photography</h2>`, and `.lead` from `profile.photography.lead`,
   - `photo-intro` with two `.mono` lines: `profile.photography.series` and a tap-to-enlarge cue,
   - `.photo-gallery` mapped from the computed tiles.
3. Build gallery tiles as `figure.shot` elements wrapped by `Reveal as="figure"` with computed `delay`/`lift`, containing `next/image` and `figcaption.cap` (`.t` = title, `.x` = meta). The trigger must be a real `<button>` with an accessible name such as `Enlarge {title}`.
4. Build `src/components/Lightbox.tsx` as a client component:
   - `role="dialog"` + `aria-modal="true"` + labelled caption,
   - Escape closes, focus moves into the dialog on open and returns to the trigger on close, focus is trapped while open,
   - close button and backdrop click close the dialog,
   - body scroll locks while open,
   - image rendered via `next/image`; caption is `{title} — {meta}`.
5. Add a shared photography placeholder asset if current `photos.ts` image paths are not backed by files yet, and keep final real assets deferred to Phase 5.
6. Wire `<Photography />` into `src/app/page.tsx`, replacing only the empty `#photography` stub.
7. Do not hardcode copy or image paths in components; everything reads from `photos.ts` / `profile.ts`.

### Tests that must pass
- `npm run build` and `npm run lint` complete with no new errors/warnings; `design_handoff_portfolio` stays globally ignored.
- No hydration-mismatch warnings in a clean browser console.
- Gallery renders newest-first, with correct 2->3->2->3 rhythm, alternating tall/wide swap, lone-leftover handling, and 3-row lift/delay behavior.
- Lightbox: click/Enter/Space on a tile opens the correct image + caption; Escape, close button, and backdrop click close; focus moves in on open and returns to the trigger on close; focus is trapped while open; background scroll locks.
- Images render via `next/image` with `alt` from `photos.ts`.
- Reveal still animates on scroll; with `prefers-reduced-motion` tiles are visible immediately (no transform).
- Responsive: at <=880px the gallery collapses to 2 columns with no horizontal scroll; lightbox usable on mobile widths.

### Acceptance criteria (functional and visual)
- Functional: gallery is fully data-driven from `photos.ts` (appending a photo at the bottom makes it appear first and reflows the layout with no manual numbering); lightbox is keyboard-operable and screen-reader-announced as a modal dialog; all tiles have meaningful `alt`.
- Visual: gallery + lightbox faithful to the handoff across all four Dusk/Pond x light/dark combos — caption typography, hover scale + caption reveal, tall/wide/third spans, lift drift, and dark lightbox overlay with mono caption.

### Definition of done
Project-wide DoD plus:
- Photography gallery + accessible lightbox complete, data-driven from `photos.ts`, build/lint clean, browser-verified across the four theme combos + reduced-motion + the 880px collapse, with keyboard + focus-management checks on the lightbox.

### Complexity / token weight
M

### Estimated time
1 session.

### Dependencies on other phases
- Depends on: Phase 1 (shell, tokens, Reveal, fonts), Phase 2 (content/layout pattern reused).
- Required by: none directly; lightbox/focus-management pattern informs the Phase 4 project modal.

## Execution log
(Append-only during execution.)

- 2026-06-07: Implemented the data-driven Photography section from `photos.ts`/`profile.ts`, including the pure `computeGalleryLayout` helper, newest-first gallery rendering, real button triggers with `next/image`, an accessible single-image lightbox, shared placeholder photography asset wiring for missing Phase 5 images, and CSS adjustments for focus/hover/lift behavior. No commit made.
- 2026-06-07: Verified Phase 3 with `npm run lint` and `npm run build` passing cleanly. Browser checks passed in production on `http://localhost:3002`: newest-first order (`Swan`, `Lotus`, `Crossed Wires`, `Shut for the Season`, `Tree`), expected `2->3` tile classes/delays/lift, image alt text, no horizontal overflow, 880px two-column collapse, reduced-motion visible/no-transform behavior, Dusk/Pond x light/dark theme token swaps, and lightbox click/Escape/close/backdrop/focus-trap/scroll-lock behavior. Cursor's dev-browser instrumentation can trigger a dev-only `data-cursor-ref` hydration overlay on `next dev`; production smoke had no dev overlay. No commit made.

## Closeout
Closed: 2026-06-07

### Verification evidence
- `npm run lint` and `npm run build`: passed.
- Browser production smoke on `http://localhost:3002`: newest-first order, 2->3 rhythm with tall/wide swap, lift/delays, alt text, four theme combos, reduced-motion visibility, 880px two-column collapse, no horizontal overflow.
- Lightbox: click/Escape/close/backdrop, focus trap, scroll lock verified.

### Acceptance criteria
- Functional: met. Gallery is data-driven from `photos.ts`; lightbox is keyboard-operable with modal semantics; placeholder asset wired until Phase 5.
- Visual: met for Phase 3 scope against the handoff baseline.

### Tech debt / follow-ups
- No commit made (user standing rule).
- Real photography files deferred to Phase 5.
- Dev-only `data-cursor-ref` hydration overlay possible in Cursor-controlled `next dev`; production smoke had no overlay.

### Decisions
- No new ADRs. ADR-0001 through ADR-0007 remain accepted.
