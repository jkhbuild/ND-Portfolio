# 0004. Styling: ported global CSS with CSS-variable theming (not Tailwind/shadcn)

- Status: accepted
- Date: 2026-06-07
- Supersedes: none
- Superseded-by: none

## Context
The design handoff is a bespoke, high-fidelity editorial design already expressed as hand-authored CSS driven entirely by CSS custom properties on `<html>` (two `data-*` attributes × a token table = all four themes). Vercel's default React/Next recommendation leans toward Tailwind + shadcn/ui.

## Decision
Port the handoff's `styles.css` into a global stylesheet and keep the CSS-variable theming as the backbone. Do **not** adopt Tailwind or shadcn/ui for this project.

## Alternatives considered
- **Tailwind + shadcn/ui (Vercel default)** — great for component-library UIs, but this is a one-off art-directed layout; re-expressing the finished CSS as utility classes adds churn and risks fidelity drift.
- **CSS Modules per component** — viable; deferred in favor of a single ported global sheet that matches the handoff 1:1, with component-scoped styles added only where helpful.

## Consequences
- Positive: 1:1 fidelity with the handoff; theming "just works" via two attributes; minimal CSS shipped.
- Negative: deviates from the Vercel-recommended styling stack (the `react-best-practices` skill will warn — this ADR is the justification).
- Neutral: theme switching is attribute-based, handled by a small client component + a no-flash inline script.
