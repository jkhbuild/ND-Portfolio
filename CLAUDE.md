<!-- managed-by: phased-workflow -->
# Nirmita Dave — Portfolio

Single-page static portfolio (Next.js 16) for a licensed architect / photographer, built so the owner can edit all content through the GitHub web UI.

## Active phase
Phase 1: Scaffold & Theme System — in progress (scaffold files written manually; `npm install` + `next build` verification pending terminal availability)

## Pointers
- Plan: [docs/00_plan.md](docs/00_plan.md)
- Decision log: [docs/decisions/](docs/decisions/)
- Current turnover: [docs/artifacts/handoffs/2026-06-07-195200_phase-1_scaffold.md](docs/artifacts/handoffs/2026-06-07-195200_phase-1_scaffold.md)
- Design source of truth: [design_handoff_portfolio/README.md](design_handoff_portfolio/README.md) + `design_handoff_portfolio/design-reference/`

## Phase index
| # | Name | Status | Closeout date | Phase file |
|---|------|--------|---------------|------------|
| 1 | Scaffold & Theme System | in progress | — | [docs/01_scaffold-theme.md](docs/01_scaffold-theme.md) |
| 2 | Static Content (Hero, About) | planned | — | docs/02_static-content.md (created at phase start) |
| 3 | Photography Gallery | planned | — | docs/03_photography.md (created at phase start) |
| 4 | Built Work + Skills/Certs | planned | — | docs/04_built-work-skills.md (created at phase start) |
| 5 | Docs & Deploy | planned | — | docs/05_docs-deploy.md (created at phase start) |

## Standing rules
- All paths use forward slashes.
- Free-tier services only (Vercel hobby) — no paid SaaS without an ADR.
- **Owner-editable content lives only in `src/content/*.ts`** — never hardcode copy/images into components.
- **Append new photos/projects at the END of their list** — the site renders newest-first and auto-numbers everything; never reorder or hand-number entries.
- Images via `next/image`, fonts via `next/font` — no external font `<link>` tags.
- Production design changes are recorded as new ADRs; the locked plan stays frozen.
