<!-- managed-by: phased-workflow -->
# Nirmita Dave — Portfolio

Single-page static portfolio (Next.js 16) for a licensed architect / photographer, built so the owner can edit all content through the GitHub web UI.

## Active phase
All phases complete

## Pointers
- Plan: [docs/00_plan.md](docs/00_plan.md)
- Decision log: [docs/decisions/](docs/decisions/)
- Current turnover: [docs/artifacts/handoffs/2026-06-08-030500_phase-5_complete_session-turnover.md](docs/artifacts/handoffs/2026-06-08-030500_phase-5_complete_session-turnover.md)
- Design source of truth: [design_handoff_portfolio/README.md](design_handoff_portfolio/README.md) + `design_handoff_portfolio/design-reference/`

## Phase index
| # | Name | Status | Closeout date | Phase file |
|---|------|--------|---------------|------------|
| 1 | Scaffold & Theme System | done | 2026-06-07 | [docs/01_scaffold-theme.md](docs/01_scaffold-theme.md) |
| 2 | Static Content (Hero, About) | done | 2026-06-07 | [docs/02_static-content.md](docs/02_static-content.md) |
| 3 | Photography Gallery | done | 2026-06-07 | [docs/03_photography.md](docs/03_photography.md) |
| 4 | Built Work + Skills/Certs | done | 2026-06-08 | [docs/04_built-work-skills.md](docs/04_built-work-skills.md) |
| 5 | Docs & Deploy | done | 2026-06-08 | [docs/05_docs-deploy.md](docs/05_docs-deploy.md) |

## Agent split
- **Planning & review:** user runs **Claude Opus 4.8** in terminal; Composer supplies paste-ready prompts (see `.cursor/rules/composer-orchestration.mdc`).
- **Implementation:** Composer orchestrates; may invoke **`/implementer`** in Cursor.

## Standing rules
- All paths use forward slashes.
- Free-tier services only (Vercel hobby) — no paid SaaS without an ADR.
- **Owner-editable content lives only in `src/content/*.ts`** — never hardcode copy/images into components.
- **Append new photos/projects at the END of their list** — the site renders newest-first and auto-numbers everything; never reorder or hand-number entries.
- Images via `next/image`, fonts via `next/font` — no external font `<link>` tags.
- Production design changes are recorded as new ADRs; the locked plan stays frozen.
