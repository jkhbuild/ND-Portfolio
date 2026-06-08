# 0007. Scope trims: two palettes only, drop Tweaks panel, grain as config flag

- Status: accepted
- Date: 2026-06-07
- Supersedes: none
- Superseded-by: none

## Context
The design-reference CSS contains a third "wire" palette with no UI control, and a React-based "Tweaks" panel (film-grain toggle) the handoff describes as a prototyping tool, not a product feature.

## Decision
Ship exactly two palettes — **Dusk** (default) and **Pond** — each with light/dark. Drop the dormant "wire" palette and the entire Tweaks panel. Keep film grain as an optional subtle layer controlled by a single `profile.theme.grain` flag.

## Alternatives considered
- **Keep the "wire" palette** — no design control exists for it and the handoff specifies two; would add untested theme combinations.
- **Port the Tweaks panel** — explicitly a prototype affordance; adds React/Babel runtime weight for no product value.

## Consequences
- Positive: smaller surface, fewer untested theme combos, less JS.
- Negative: none meaningful; a third palette can be reintroduced later via a new ADR if wanted.
- Neutral: grain default intensity is tuned in Phase 5.
