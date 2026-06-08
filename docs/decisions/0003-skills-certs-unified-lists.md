# 0003. Skills & Certifications: unify as matching indexed lists

- Status: accepted
- Date: 2026-06-07
- Supersedes: none
- Superseded-by: none

## Context
In the prototype, Software is shown as pills/chips and Certifications as an indexed list — a visual mismatch the owner dislikes. They asked for one consistent treatment (pills OR list, not both).

## Decision
Render both Software and Certifications as the **same indexed list**: an auto-generated mono index (accent) + label (Cormorant) + optional small sub-label (`--ink-3`). Software rows are name-only; Certification rows carry a sub-label (e.g. "OSHA 30 — Construction Safety"). The chip/pill styling is removed.

## Alternatives considered
- **Both as pills** — compact and modern, but certification sub-labels don't fit a pill cleanly and would be dropped, losing useful credential context.

## Consequences
- Positive: visually consistent; preserves certification descriptors; matches the site's editorial hairline language (section indices, About meta-grid).
- Negative: short software tokens are less compact than pills; mitigated with a tight two-column list.
- Neutral: reversible preference — can switch to pills later if desired.
