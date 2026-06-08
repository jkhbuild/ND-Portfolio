# Turnover: Phase 5 complete — v1 shippable (deploy pending user)

- Created: 2026-06-08 03:05:00
- Project: C:/Users/jkhbu/Desktop/codex/nd-portfolio
- Branch: main (all Phases 1–5 work uncommitted on disk)
- Continues from: docs/artifacts/handoffs/2026-06-08-020000_phase-4_complete_session-turnover.md

## 1. Current phase number and status

| Phase | Status |
|-------|--------|
| 1–4 | **done** |
| 5 Docs & Deploy | **done** (agent-side) — Vercel prod URL pending user |

`CLAUDE.md` Active phase: **All phases complete**

## 2. What was completed this session, file by file

| File | Change |
|------|--------|
| `public/images/portrait/portrait.jpeg` | Promoted from design handoff |
| `public/images/photography/*.jpeg` (5) | Promoted real photography |
| `public/images/work/tonnelle.jpg`, `pkg6.jpg` | Promoted work photos |
| `public/Nirmita-Dave-CV.pdf` | Promoted résumé |
| `src/content/photos.ts` | Real `src` paths |
| `src/content/projects.ts` | Real `img` paths |
| `src/content/profile.ts` | Real portrait path + dimensions |
| `src/app/globals.css` | Portrait aspect-ratio fix; `.not-found` styles |
| `src/app/not-found.tsx` | Themed 404 page |
| `README.md` | Comprehensive owner guide (6 tasks) |
| `CLAUDE.md` | All phases complete |
| `docs/00_plan.md` | DoD + checklist ticks |
| `docs/05_docs-deploy.md` | Execution log + closeout |

## 3. Test status

| Command | Result |
|---------|--------|
| `npm run lint` | pass |
| `npm run build` | pass |
| `npm audit` | 2 moderate transitive (PostCSS via Next); no high/critical |
| Lighthouse desktop | Perf **96**, A11y **95** |

## 4. Decisions made and rationale (delta on the decision log)

- Portrait aspect-ratio corrected to 1206/769 (real JPEG) — prevents CLS.
- No new ADRs.

## 5. Outstanding questions for the user

1. **Custom domain** vs default `*.vercel.app` (Deferred Q2).
2. **Vercel/GitHub ownership** — who holds the Vercel project and repo (Deferred Q4).
3. **First production deploy** — GitHub connect failed during `vercel link`; user must finish in Vercel dashboard.

## 6. Known issues and tech debt

- **No commits** — all Phases 1–5 still uncommitted (user standing rule).
- Vercel project linked locally (`.vercel/project.json`) but no live `*.vercel.app` URL yet.
- Browser verification (themes, 404, résumé download, responsive pixels) not run by agent (no browser MCP).

## 7. Files most relevant to the next session

- `README.md` — owner editing guide
- `src/content/*.ts` — all editable content
- `public/images/` + `public/Nirmita-Dave-CV.pdf` — assets
- `docs/05_docs-deploy.md` — phase closeout

## 8. Environment state

- Node 24 LTS; Next.js 16.2.7
- Vercel CLI available via `npx vercel`; authenticated during session
- Vercel project: `nd-portfolio` (`prj_1bC5WKNCaIeoCMcySUq80BrNpBi3`)

## 9. Exact command sequence to finish deploy

```powershell
cd "C:\Users\jkhbu\Desktop\codex\nd-portfolio"

# 1. Commit + push all work (when ready)
git add -A
git commit -m "Ship v1: real assets, owner README, 404, Phase 5 closeout"
git push origin main

# 2. In Vercel dashboard: connect GitHub repo jkhbuild/ND-Portfolio → enable auto-deploy from main

# 3. Or CLI deploy:
npx vercel --prod

# 4. Verify live URL, then test a deliberate broken edit to confirm build-failure preserves last deploy
```
