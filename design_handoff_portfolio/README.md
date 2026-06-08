# Handoff: Nirmita Dave — Portfolio Website

## Overview
A single-page, scrolling personal portfolio for **Nirmita Dave**, a young licensed
architect and construction-management professional who is also a photographer. The
site presents her dual identity — the rigor of an architect with the looseness of an
artist ("Drawn to the grid, devoted to the glitch"). It contains a hero, an About
section, a Photography gallery, a Built Work (construction projects) gallery, and a
Skills & Certifications section. There is **no contact/email section** by design.

The site supports **two colour palettes (Dusk / Pond)** × **light/dark mode**, switched
from always-visible controls in the top bar and persisted across visits.

---

## About the Design Files
The files in `design-reference/` are a **design reference created in HTML/CSS/JS** —
a working prototype that demonstrates the intended look, layout, type, colour system,
and interactions. **They are not meant to be shipped as-is.** The task is to **recreate
this design in the target codebase's environment** (e.g. React/Next, Vue, Astro,
plain static site, etc.) using that project's established patterns, component
conventions, and tooling. If no codebase exists yet, choose an appropriate modern
framework (a static React/Next or Astro site fits this content well) and implement the
design there.

The prototype uses two helper files — `tweaks-panel.jsx` and `tweaks-app.jsx` — that
power an in-prototype "Tweaks" panel (a design-time affordance for toggling film grain).
**This is a prototyping tool, not a product feature; it does not need to be ported.**
The film-grain overlay itself is optional flavour (see Design Tokens → Effects).

---

## Fidelity
**High-fidelity.** Colours, typography, spacing, layout, and interactions are final.
Recreate the UI pixel-faithfully using the codebase's libraries. Exact hex values,
font roles, and sizes are documented below.

---

## Global Structure & Theming

The whole theme is driven by **CSS custom properties** scoped on `<html>` via two
attributes:

- `data-palette="dusk" | "pond"`
- `data-mode="light" | "dark"`

All colours in components reference tokens (`var(--paper)`, `var(--ink)`,
`var(--accent)`, etc.), so switching the two attributes reskins the entire page. The
top-bar buttons set these attributes and persist the choice to `localStorage`
(`nd-palette`, `nd-mode`). Default = `dusk` + `light`.

A second attribute, `data-display`, is fixed to `cormorant` (the final display font).

### Reusable token classes
- `.mono` — Space Mono, 0.72rem, `letter-spacing: 0.18em`, uppercase, colour `--ink-3`. Used for all small technical labels.
- `.section-index` — Space Mono accent label like "§ 02", preceded by a 26px accent rule. Used as the eyebrow on each section header.
- `.reveal` — scroll-reveal animation hook (opacity 0 → 1, translateY 26px → 0, 0.9s `cubic-bezier(.2,.7,.2,1)`). Variants `.d1 .d2 .d3` add 0.08s stagger steps. Respects `prefers-reduced-motion`.

---

## Screens / Views (sections)

### 1. Top Bar (fixed nav)
- **Layout**: Fixed, full-width, `z-index:50`. Inner wrapper `width: min(1280px, 92vw)`, flex `space-between`. Left = wordmark; right = a flex group (`gap:26px`) holding nav links + theme controls. Background is a translucent `--paper` with `backdrop-filter: blur(10px)`. On scroll (>40px) it gains a 1px `--line` bottom border and reduces vertical padding (18px → 12px).
- **Wordmark** (`.nav-mark`): "Nirmita" in Pinyon Script 1.9rem, with a stacked Space Mono sub-label "DAVE · ARCHITECT" (0.62rem, tracked, `--ink-3`).
  - NOTE: the wordmark is the **only** place script type remains. Her name in the hero is **not** script (see Hero).
- **Nav links** (`.nav-links`): four anchors — `01 About`, `02 Photography`, `03 Built Work`, `04 Skills`. Space Mono 0.72rem uppercase, the number in `--accent`. Animated underline on hover/active (`.active` set by scroll-spy). Hidden below 720px.
- **Theme controls** (`.nav-theme`): two pill "segmented" controls (`.seg`), each holding two `.seg-btn` buttons:
  - Palette: `[● Dusk | ● Pond]` — each button has an 8px colour dot (`.sw-dusk` = `#9a5736` with a teal shadow notch; `.sw-pond` = `#6e7038` with a lotus-pink notch).
  - Mode: `[Light | Dark]`.
  - Button: Space Mono 0.6rem uppercase, `padding: 6px 12px`, `border-radius: 999px`. Inactive colour `--ink-3`; **active** = filled `background: var(--ink)`, text `var(--paper)`. The `.seg` track is `--paper-2` with a `--line` border, `border-radius: 999px`, 2px padding.
  - Responsive: below 460px the colour dots hide and font drops to 0.55rem.

### 2. Hero (`#top .hero`)
- **Layout**: `min-height: 100vh`, vertically centered, `padding: 120px 0 64px`. Inner wrapper `min(1280px, 92vw)`.
- **Eyebrow**: `.mono` line — "Architect & Image-maker — building inside the lines".
- **Name** (`.hero-name.no-script`):
  - "Nirmita" (`.hn-script` in `.no-script` state) → **Cormorant Garamond italic 500**, `clamp(2.6rem, 8vw, 6rem)`, colour `--accent`, no rotation.
  - "Dave" (`.hn-display`) → **Cormorant Garamond 600**, `clamp(4.6rem, 21vw, 17rem)`, uppercase, `letter-spacing: -0.035em`, colour `--ink`, line-height 0.78, slightly overlapping the line above (`margin-top: -0.06em`).
- **Sub** (`.hero-sub`, flex, gap 40px, wraps): a lead paragraph (with an italic emphasis on "Drawn to the grid, devoted to the glitch.") + a `.mono` list:
  - "— Bachelor of Architecture"
  - "— Licensed, Council of Architecture (India)"
  - "— Working in New York"
- **Actions** (`.hero-actions`, flex, gap 28px):
  - **Download Résumé button** (`.cv-btn`): dark pill — `background: var(--ink)`, text `var(--paper)`, Space Mono 0.74rem uppercase, `padding: 13px 20px`, `border-radius: 999px`. Contains a "↓" arrow (nudges down on hover) and a divider-separated "PDF" tag. Hover → `background: var(--accent)`, lifts `translateY(-2px)`. Links to `assets/Nirmita-Dave-CV.pdf` with the `download` attribute.
  - **Scroll cue** (`.hero-scroll`): pulsing accent dot + "Scroll — begin the section index".

### 3. About (`#about`, `.block`)
- **Section header** (`.block-head`): "§ 01" + h2 "About". (No sub-tagline.)
  - h2 style across all sections: Cormorant Garamond italic 500, `clamp(2rem, 5vw, 3.6rem)`.
- **Layout** (`.about-grid`): 2-col grid `minmax(0,0.92fr) minmax(0,1.08fr)`, gap 64px. Collapses to 1 col below 880px.
  - **Left — portrait** (`.portrait-frame`): the black-and-white photo (`assets/portrait.jpeg`), `aspect-ratio: 1206/1481`, rotated `-1.5deg`, drop shadow, **grayscale + slight contrast** filter, scales to 1.04 on hover. A small accent-coloured caption tab sits at bottom-left: "Nirmita Dave — self, on film".
  - **Right — bio** (`.about-body`): first paragraph is the lead — Cormorant italic, 1.5rem. Following paragraphs Hanken 1.18rem/1.62, colour `--ink-2`, with an inline `.hl` accent span. Copy is provided in the HTML (filler bio — client may revise).
  - **Meta grid** (`.about-meta`): 2×2 grid of key/value cells separated by `--line` hairlines. Keys = Space Mono 0.64rem uppercase `--ink-3`; values = Cormorant 1.15rem. Current values:
    - Discipline → "Architecture · BIM · Delivery"
    - Also → "Construction Management, QAQC, Photography"
    - Based → "New York / Ahmedabad"
    - Practising since → "2018"

### 4. Photography (`#photography`, `.block`)
- **Header**: "§ 02" + h2 "Photography" + lead "Found light, off the clock. Shot on phone & film, untidy on purpose."
- **Intro row** (`.photo-intro`, flex space-between): "Series — "Still / Unstill" · 2021–2025" / "Tap any frame to enlarge ↗" (both `.mono`).
- **Gallery** (`.photo-gallery`, `#photoGallery`): **rendered by JS** from a `PHOTOS` array (see Interactions). 12-column CSS grid, gap 28px.
  - **Row rhythm**: rows cycle **2 → 3 → 2 → 3 …**. Each successive 2-photo row **swaps sides**: the first 2-row is tall-left / wide-right; the next 2-row is wide-left / tall-right; and so on.
  - Tile size classes: `.s-tall` (`grid-column: span 5`, `aspect-ratio: 1206/1500`), `.s-wide` (span 7, `16/11`), `.s-third` (span 4, `1/1`). The middle tile of each 3-row gets `.lift` (`translateY(40px)` off-grid drift).
  - **Tiles** (`figure.shot`): full-bleed `object-fit: cover` image. **No persistent caption or number** on the image. On hover: image scales to 1.05 and a bottom gradient caption (`.cap`) fades in — title in Cormorant italic 1.2rem (`#f4f0e8`) + a Space Mono meta line. Click → lightbox.
  - Below 880px: grid becomes 2-col; `.s-tall` spans both columns.
- **Photos** (in order; each has title + meta):
  1. `tree-pond.jpeg` — "The Tree That Stayed" / "Flooded grove · Rajasthan"
  2. `brick-window.jpeg` — "Shut for the Season" / "Old town · brick & deodar"
  3. `pink-wires.jpeg` — "Crossed Wires" / "Pink hour · overhead lines"
  4. `lotus.jpeg` — "Lotus, Before Noon" / "Lily pond · single bloom"
  5. `swan.jpeg` — "Mute Swan, Still Canal" / "Green water · midday"

### 5. Built Work (`#work`, `.block`)
- **Header**: "§ 03" + h2 "Built Work". (No lead.)
- **Intro row** (`.photo-intro`): "Selected — heavy civil & transit" / "Tap any frame to enlarge ↗".
- **Gallery** (`.work-gallery`): 12-col grid, gap 28px. **Static markup** (4 tiles). Default tile `grid-column: span 6`, `aspect-ratio: 16/10`; modifier `.span7` / `.span5`; `.lift` drifts one tile down. Layout = row 1: `span7` + `span5`; row 2: `span5` + `span7 lift`. Collapses to single column below 880px.
  - **Tile** (`figure.work-tile`): full-bleed `object-fit: cover` image, scales 1.05 on hover. **No persistent text overlay on photo tiles** (it was unreadable over busy site photos — intentionally removed). A bottom-left **corner bracket** (`.wt-corner`, a 16px L made of 1px borders, light over photos) and a hover-only "View ↗" pill (`.wt-open`, Space Mono 0.6rem, outlined) are the only on-tile elements. Click → project modal.
  - **Placeholder tiles** (`.work-tile.placeholder`): diagonal hairline stripe pattern (`repeating-linear-gradient(45deg, var(--line-2) 0 2px, transparent 2px 11px)` over `--paper-2`). These **keep** a small label (project name + "Details to follow") since it sits on a clean background. Used for future projects.
  - **Tiles**:
    1. `tonnelle.jpg` — **Tonnelle Avenue Bridge** (real photo)
    2. `pkg6.jpg` — **MTA PKG 6 — ADA Upgrades** (real photo)
    3. Placeholder — "Selected Project"
    4. Placeholder — "Selected Project"
- **Project modal** (`.pmodal`): full-screen scrim (`rgba(12,11,10,0.93)`, blur). Card (`.pmodal-card`) `width: min(1040px, 100%)`, 2-col grid `1.15fr 0.85fr` (image | text); stacks below 760px.
  - Media pane shows the project photo (or the stripe placeholder if none).
  - Body: Space Mono index ("§ 01"), Cormorant 2.2rem title, Space Mono tag pills, description paragraph (`--ink-2`), and a 3-cell meta grid at the bottom: **Location · Year · Role**.
  - Close: "✕" pill top-right, click-scrim, or `Esc`.
  - Project data (filler — client to confirm specifics):
    - **Tonnelle Avenue Bridge** — tags: Heavy Civil / Bridge Replacement / Grade Separation. Location: Jersey City, NJ. Year: 2023. Role: Project Engineer · Coordination. Description in HTML.
    - **MTA PKG 6 — ADA Upgrades** — tags: Transit / ADA Accessibility / Structural Steel. Location: New York, NY. Year: 2022. Role: Field Engineer · Coordination. Description in HTML.

### 6. Skills & Certifications (`#skills`, `.block`)
- **Header**: "§ 04" + h2 "Skills & Certifications" + lead "The technical spine behind the work — tools, codes & credentials."
- **Layout** (`.skills-wrap`): 2-col grid, gap 56px; 1 col below 880px.
  - **Software** (`.chips`): flex-wrapped pills. Each `.chip` = Hanken 0.96rem, `--paper` bg, `--line` border, `border-radius: 4px`, `padding: 9px 16px`. Hover → inverts to `--ink` bg / `--paper` text, lifts 2px. Column header is Space Mono with a count badge.
    - Items: Primavera Unifier, Kahua, AutoCAD, Revit, Procore, BIM, Microsoft Project, Microsoft Office.
  - **Certifications** (`.certs`): stacked rows separated by hairlines. Each row = a Space Mono index (`--accent-2`) + a value (Cormorant ~1.04rem) with a small `--ink-3` sub-label.
    - OSHA 30 (Construction Safety); OSHA 10 (Construction Safety); Primavera P6 (Scheduling); NYC-SST 16-Hour (Site Safety Training); Licensed Architect (Council of Architecture, India); Procore Certified (BIM Manager · Project Management); Google Project Management (Professional Certificate).

### 7. Footer (`.foot`)
- Top border `--line`, `padding: 90px 0 50px`.
- **Name** (`.foot-big`): "Nirmita Dave" in Pinyon Script **2rem** (deliberately sized to match the header wordmark, not a giant display), with a Space Mono "Architect & Image-maker" tag beside it.
- **Row** (`.foot-row`, space-between): a `.mono` two-line blurb + a set of footer nav links (About / Photography / Built Work / ↑ Top).
- Fine print: "© 2026 Nirmita Dave — all images her own."

---

## Interactions & Behavior

All behavior is vanilla JS in the inline `<script>` at the bottom of `index.html`.
Reimplement using the target framework's idioms (component state, effects, router, etc.).

1. **Top-bar theme controls**: clicking a palette/mode button sets `data-palette`/`data-mode` on `<html>`, persists to `localStorage` (`nd-palette`, `nd-mode`), and marks the active button. State is restored on load before paint. Transition: `background`/`color` on `<body>` ease 0.6s.
2. **Scroll reveal**: elements with `.reveal` get `.in` when their top passes 92% of viewport height (rect-based check on scroll/resize + a couple of timed safety passes). One-shot. (IntersectionObserver is a fine substitute in production — it was avoided here only due to the prototype host.)
3. **Nav scroll state**: `.nav.scrolled` toggles past 40px scroll; nav links get `.active` via scroll-spy (active section = last whose `offsetTop` ≤ scroll + 35% viewport).
4. **Photography gallery render**: built from a `PHOTOS` array (`{src, title, meta, alt}`). The 2→3→2→3 row pattern and the alternating left/right swap on 2-rows are computed at render. **To add a photo, append to the array — layout follows automatically.** Reproduce this as a data-driven component (map over a photos array; derive row groups).
5. **Lightbox** (photography): clicking a `figure.shot` opens a full-screen overlay with the image and a "title — meta" caption. Close via the ✕, scrim click, or `Esc`.
6. **Project modal** (built work): clicking a `figure.work-tile` populates and opens `.pmodal` from the tile's `data-*` attributes (`data-img, data-no, data-title, data-tags` (pipe-separated), `data-desc, data-loc, data-year, data-role`). Placeholder tiles open with the stripe placeholder and "Details to follow" copy. Close via ✕, scrim, or `Esc`.
7. **Film grain**: a fixed SVG-noise overlay (`.grain-layer`, `mix-blend-mode: multiply`; `screen` in dark mode). In the prototype it's toggled by the Tweaks panel; in production make it a static subtle layer or drop it.
8. **Hover micro-interactions**: image zooms (scale 1.04–1.05), button lifts, underline grows, résumé arrow nudge — all documented per component above.

### Responsive behavior
- Content wrapper: `width: min(1280px, 92vw)`, centered.
- Breakpoints: **880px** (about/gallery/skills grids → 1 col; photo grid → 2 col), **760px** (project modal stacks), **720px** (nav links hide; theme controls stay), **460px** (theme buttons compact, dots hidden).
- Type scales fluidly via `clamp()` on hero name and section headings.

---

## State Management
Minimal:
- `palette` ("dusk" | "pond") and `mode` ("light" | "dark") — persisted to `localStorage`, applied as `<html>` attributes.
- `lightboxOpen` + current photo (photography).
- `projectModalOpen` + current project (built work).
- Scroll-derived UI state: nav `scrolled`, active section, reveal-in flags.
No data fetching — all content is static/local.

---

## Design Tokens

### Colour — Dusk (light)
| Token | Value |
|---|---|
| `--paper` | `#ece7df` |
| `--paper-2` | `#e3dcd0` |
| `--ink` | `#20201d` |
| `--ink-2` | `#4c4842` |
| `--ink-3` | `#7c766c` |
| `--accent` (terracotta) | `#9a5736` |
| `--accent-2` (teal) | `#5f8d92` |
| `--line` | `rgba(32,32,29,0.16)` |
| `--line-2` | `rgba(32,32,29,0.08)` |

### Colour — Dusk (dark)
| `--paper` `#16191a` · `--paper-2` `#1e2224` · `--ink` `#ece7df` · `--ink-2` `#bdb8ae` · `--ink-3` `#847f75` · `--accent` `#c67c54` · `--accent-2` `#82b2b7` · `--line` `rgba(236,231,223,0.15)` · `--line-2` `rgba(236,231,223,0.06)` |

### Colour — Pond (light)
| `--paper` `#e8e7da` · `--paper-2` `#dddcc8` · `--ink` `#1f221b` · `--ink-2` `#45483a` · `--ink-3` `#767a64` · `--accent` (olive) `#6e7038` · `--accent-2` (lotus pink) `#cd8d92` · `--line` `rgba(31,34,27,0.16)` · `--line-2` `rgba(31,34,27,0.08)` |

### Colour — Pond (dark)
| `--paper` `#14160f` · `--paper-2` `#1d2015` · `--ink` `#e8e7da` · `--ink-2` `#bbbaa6` · `--ink-3` `#7f7c66` · `--accent` `#9da350` · `--accent-2` `#d8a1a5` · `--line` `rgba(232,231,218,0.15)` · `--line-2` `rgba(232,231,218,0.06)` |

> The palettes were sampled directly from her photographs (terracotta brick + teal pond = Dusk; olive water + lotus pink = Pond). Fixed overlay colours for scrims/captions use near-black `rgba(12,11,10,…)` and off-white `#f4f0e8` so they read in both modes.

### Typography
Google Fonts: **Cormorant Garamond** (display — italic 400–600 + roman 600), **Hanken Grotesk** (body, 300–600), **Space Mono** (labels, 400/700 + italic), **Pinyon Script** (wordmark + footer name only).
| Role | Family | Notes |
|---|---|---|
| Display / headings | Cormorant Garamond | italic 500 for headings & "Nirmita"; 600 uppercase for "DAVE" |
| Body | Hanken Grotesk | base 17px / line-height 1.6 |
| Labels / mono | Space Mono | 0.6–0.74rem, `letter-spacing` 0.1–0.18em, uppercase |
| Script accent | Pinyon Script | wordmark (1.9rem) + footer name (2rem) only |

Key sizes: hero "DAVE" `clamp(4.6rem,21vw,17rem)`; hero "Nirmita" `clamp(2.6rem,8vw,6rem)`; section h2 `clamp(2rem,5vw,3.6rem)`; modal title 2.2rem; body 17px; chips 0.96rem.

### Spacing / radii / effects
- Content max-width `min(1280px, 92vw)`; section vertical padding 110px; gallery gaps 28px; grid hairlines via `--line`.
- Border radius: pills/buttons/chips `999px` except chips `4px`; cards/tiles square (0).
- Shadows: portrait `0 30px 60px -30px rgba(0,0,0,0.5)`; modal card `0 40px 120px -30px rgba(0,0,0,0.7)`.
- Reveal easing `cubic-bezier(.2,.7,.2,1)` 0.9s; theme cross-fade 0.6s; hover transitions 0.25–0.4s.
- Film grain: inline SVG `feTurbulence` noise, `mix-blend-mode: multiply` (light) / `screen` (dark), ~0.28–0.5 opacity. Optional.

---

## Assets
All in `design-reference/assets/` (client's own images — use as-is):
- `portrait.jpeg` — black-and-white profile photo (About). Rendered grayscale.
- Photography: `tree-pond.jpeg`, `brick-window.jpeg`, `pink-wires.jpeg`, `lotus.jpeg`, `swan.jpeg`.
- Built Work: `tonnelle.jpg` (Tonnelle Avenue Bridge), `pkg6.jpg` (MTA PKG 6 ADA Upgrades). Slots 3 & 4 are placeholders awaiting real images.
- `Nirmita-Dave-CV.pdf` — résumé, linked from the hero download button.

No icon library is used — the only glyphs are typographic ("↓", "↗", "✕", "§", "·") and CSS-drawn marks (corner brackets, colour dots, pulse dot).

---

## Files
In `design-reference/`:
- `index.html` — all markup + the vanilla JS (theme controls, gallery render, reveal, lightbox, project modal, scroll-spy). **Primary reference.**
- `styles.css` — the full design system: palette/dark tokens, type roles, every component, responsive rules.
- `tweaks-app.jsx`, `tweaks-panel.jsx` — prototype-only "Tweaks" panel (film-grain toggle). **Do not port** — included only for completeness.
- `assets/` — all images + the résumé PDF.

### Build notes for the developer
- Port the **CSS-variable theming** as-is — it's the backbone. Two `data-*` attributes on the root × the token table = all four themes. A small theme-toggle component + localStorage replicates the top-bar controls.
- Make the **Photography gallery data-driven** (array → row groups with the 2/3 + alternating-swap rule) so the client can add photos by editing data only. The Built Work tiles can be data-driven the same way (they already carry all content in `data-*` attributes).
- Replace the rect-based reveal with **IntersectionObserver**.
- The Tweaks panel and film grain are optional; everything else is core.
