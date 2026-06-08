# Turnover: Planning → Implementation split (Claude Code plans, Cursor/GPT implements)

- Created: 2026-06-07 21:15:00
- Project: C:/Users/jkhbu/Desktop/codex/nd-portfolio
- Branch: main (pushed to https://github.com/jkhbuild/ND-Portfolio.git)
- Continues from: docs/artifacts/handoffs/2026-06-07-210000_phase-2_complete.md

> **Read this first.** This project uses phased-workflow (`CLAUDE.md` has `<!-- managed-by: phased-workflow -->`). Two agents are splitting work:
> - **Claude Code** → finalize remaining **planning** (phase docs, closeouts, handoffs, ADR gaps). Do **not** implement production code unless explicitly asked.
> - **Cursor / GPT** → **implement** Phases 3–5 per the phase files Claude Code produces or confirms.

---

## 1. Current phase number and status

| Phase | Name | Status | Notes |
|-------|------|--------|-------|
| 1 | Scaffold & Theme System | **done** | Closeout + handoff written. |
| 2 | Static Content (Hero, About) | **done** | User confirmed lint/build + page on `http://localhost:3001`. Closeout + handoff written. |
| 3 | Photography Gallery | **in progress (code likely complete, not closed)** | `Photography.tsx`, `Lightbox.tsx`, `galleryLayout.ts`, placeholder asset exist. Execution log entry present; **Closeout empty**. User has **not** verified Phase 3 in browser yet this session. |
| 4 | Built Work + Skills/Certs | **planned** | `docs/04_built-work-skills.md` **does not exist**. `#work` and `#skills` are empty stubs in `page.tsx`. |
| 5 | Docs & Deploy | **planned** | `docs/05_docs-deploy.md` **does not exist**. |

`CLAUDE.md` Active phase: **Phase 3 — in progress**. Current turnover pointer still references Phase 2 complete handoff (update when Phase 3 closes).

---

## 2. What was completed (file-level snapshot)

### Done and verified (Phases 1–2)
- Next.js 16 app, theme system (Dusk/Pond × light/dark, no-flash, localStorage), Nav/Footer/Reveal shell.
- Hero + About from `profile.ts`; portrait placeholder at `public/images/portrait-placeholder.svg`.
- `npm run lint` + `npm run build` pass (user-terminal confirmed after `Reveal.tsx` ref fix).
- Dev server runs on **port 3001** when 3000 is busy.

### Implemented but not formally closed (Phase 3)
| File | Purpose |
|------|---------|
| `src/lib/galleryLayout.ts` | Pure 2→3→2→3 layout; newest-first reverse render |
| `src/components/Photography.tsx` | Gallery section + lightbox state |
| `src/components/Lightbox.tsx` | Accessible dialog (single image, no carousel) |
| `src/app/page.tsx` | `<Photography />` wired; `#work` / `#skills` still stubs |
| `public/images/photography/placeholder.svg` | Shared placeholder until Phase 5 real assets |
| `src/content/photos.ts` | All photos point at placeholder until real files uploaded |
| `docs/03_photography.md` | Phase contract; execution log has one entry; closeout empty |

### Not started (Phases 4–5)
- Built Work gallery + project modal (`#work`, `projects.ts`, design `pmodal` in `index.html`).
- Skills & Certifications unified lists (`#skills`, `skills.ts`).
- Owner README (GitHub web-UI editing guide), Vercel deploy, real assets, Lighthouse pass.

---

## 3. Test status

| Check | Status |
|-------|--------|
| `npm install` | Done; `package-lock.json` exists |
| `npm run lint` | **Pass** (user confirmed after Phase 2 fixes) |
| `npm run build` | **Pass** (user confirmed) |
| Phase 1 browser checks | Pass (theme, nav, reveal, 720px nav hide) |
| Phase 2 browser checks | Pass (user: "looks good" on 3001) |
| Phase 3 browser checks | **Not confirmed by user** this session — implementer wrote code; needs verify + closeout |
| Phase 4–5 | Not started |

---

## 4. Decisions (decision log — no new ADRs since Phase 1 Q&A)

All accepted: ADR-0001 through ADR-0007. See `docs/decisions/`.

**Locked defaults for remaining work (use unless user objects):**
- Owner-editable content **only** in `src/content/*.ts` — never hardcode copy/images in components.
- Append photos/projects at **bottom** of list → site renders **newest first**; indices computed at render.
- **Single-image** lightbox/modal (no carousel) — matches design handoff.
- Placeholder assets until Phase 5; real images deferred per `docs/00_plan.md` Deferred Q#1.
- **No commits** unless user explicitly asks (standing rule).
- **No new test framework** unless planner decides layout logic warrants it; browser + lint/build are the default gate.

---

## 5. Outstanding questions for the user (deferred — do not block planning)

| # | Question | Phase |
|---|----------|-------|
| 1 | Real portrait / photography / project images + CV PDF | 5 |
| 2 | Custom domain vs `*.vercel.app` | 5 |
| 3 | Film-grain default tuning | 5 |
| 4 | Vercel project ownership | 5 |
| 5 | Vercel Analytics | post-v1 |

---

## 6. Known issues and tech debt

- **No phase commits after initial "first commit"** — Phases 1–3 work is uncommitted on disk (user rule).
- **Port 3001** — dev often binds here because 3000 is occupied.
- **Placeholder images** — photography uses shared SVG; project paths in `projects.ts` may 404 until Phase 5 assets land (design reference assets exist under `design_handoff_portfolio/design-reference/assets/`).
- **Cursor API limit** — user hit Cursor usage limit; handoff created to continue in Claude Code + GPT/Cursor split.
- **Phase 3 closeout gap** — code exists; formal verification + handoff + CLAUDE.md update pending.

---

## 7. Files most relevant to next work

**Planning (Claude Code):**
- `docs/00_plan.md` — master plan, DoD, phase list
- `docs/01_scaffold-theme.md`, `docs/02_static-content.md`, `docs/03_photography.md` — phase contracts (01–02 closed; 03 needs closeout)
- `design_handoff_portfolio/design-reference/index.html` — Built Work ~L135–218, Skills ~L220–268, project modal ~L287–296 + JS ~L465+
- `design_handoff_portfolio/README.md` — token tables, behaviors

**Implementation (Cursor/GPT):**
- `src/content/projects.ts`, `src/content/skills.ts` — data sources for Phase 4
- `src/app/globals.css` — `.work-gallery`, `.work-tile`, `.pmodal`, `.skills-wrap`, `.skill-list` already ported
- `src/components/Lightbox.tsx` — pattern to mirror for Phase 4 project modal
- `src/lib/galleryLayout.ts` — pattern for Phase 4 work-tile span algorithm

---

## 8. Environment state

- Node: 24 LTS (`.nvmrc`); `package.json` requires `>=20.9`
- Database: none
- Env vars: none
- Dev URL: `http://localhost:3001` (or 3000 if free)

---

## 9. Exact command sequence to resume

```powershell
cd "C:\Users\jkhbu\Desktop\codex\nd-portfolio"
npm run lint
npm run build
npm run dev
```

Open the URL printed by Next (usually `http://localhost:3001`).

---

# INSTRUCTIONS FOR CLAUDE CODE (planning only)

**Goal:** Finalize all remaining phase planning so Cursor/GPT can implement without ambiguity.

**Do not implement production code. Do not commit unless user asks.**

### Task A — Close Phase 3 planning loop
1. Read `docs/03_photography.md`, `src/components/Photography.tsx`, `Lightbox.tsx`, `galleryLayout.ts`.
2. If implementation matches the locked plan, draft Phase 3 **Closeout** text (verification checklist for GPT to run).
3. Draft Phase 3 completion handoff filename: `docs/artifacts/handoffs/YYYY-MM-DD-HHMMSS_phase-3_complete.md`.
4. Specify CLAUDE.md updates: Phase 3 → done; Active phase → Phase 4 in progress.

### Task B — Author `docs/04_built-work-skills.md` (full 12-field phase file)
Use `docs/01_scaffold-theme.md` / `docs/03_photography.md` as templates. Pull scope from `docs/00_plan.md` Phase 4 row and design reference:

- **Built Work:** reverse render from `projects.ts`; auto tile spans (`span7`/`span5`) + placeholder tiles when no `img`; project modal (`pmodal`) — reuse lightbox a11y patterns (focus trap, Esc, scroll lock).
- **Skills/Certs:** unified indexed lists from `skills.ts` (ADR-0003); two columns; auto-generated numbers.

Include: Objective, Inputs, Skills (`nextjs`, `react-best-practices`), Steps, Tests that must pass, Acceptance criteria, Definition of done, Dependencies.

Extract pure layout fn suggestion: `src/lib/workLayout.ts` (mirror `galleryLayout.ts`).

### Task C — Author `docs/05_docs-deploy.md` (full phase file)
From `docs/00_plan.md` Phase 5 + project DoD:

- Comprehensive owner README (GitHub web UI: add photo, add project, edit bio, swap résumé, theme defaults).
- Copy/reference assets from `design_handoff_portfolio/design-reference/assets/` into `public/`.
- Vercel link + auto-deploy from `main`; `not-found.tsx`; `npm audit`; Lighthouse targets; responsive pass at 880/760/720/460.
- Skills: `nextjs`, `vercel-cli`, `deployments-cicd`.

### Task D — Sync master plan status
Update `docs/00_plan.md` phase table statuses (1–2 done, 3 in progress, 4–5 planned) — **only if user approves editing locked plan**; otherwise note status in handoff only (ADRs supersede; locked plan frozen by default).

### Task E — Deliverable for GPT
At end, write **`docs/artifacts/handoffs/YYYY-MM-DD-HHMMSS_planning-complete_for-cursor.md`** containing:
1. Phase 3 verification checklist (copy-paste for user/GPT).
2. Exact Phase 4 Phase Prompt (verbatim, like prior sessions).
3. Exact Phase 5 Phase Prompt (verbatim).
4. Ordered implementation sequence: finish Phase 3 verify/close → Phase 4 → Phase 5.
5. List of files Claude Code created/updated.

---

# INSTRUCTIONS FOR CURSOR / GPT (implementation)

**Goal:** Ship Phases 3–5 per phase files. Use `/implementer` or direct coding; follow phased-workflow Phase Execute mode.

**Standing rules:** No commit unless user asks. Content only in `src/content/*.ts`. `next/image`, `next/font`.

### Immediate next steps (in order)

1. **Verify Phase 3** — User runs lint/build/dev; scroll to Photography; test lightbox (click, Esc, focus). If pass → fill `docs/03_photography.md` Closeout, write Phase 3 handoff, update `CLAUDE.md`.

2. **Phase 4** — Read `docs/04_built-work-skills.md` (once Claude Code writes it). Build `BuiltWork.tsx` + `Skills.tsx` (or combined section components), `workLayout.ts`, project modal client component, wire `page.tsx`.

3. **Phase 5** — Read `docs/05_docs-deploy.md`. Owner README, real assets, Vercel deploy, final a11y/perf pass. Update `CLAUDE.md` → "All phases complete" when done.

### Resume prompts for Cursor

```
/implementer read docs/artifacts/handoffs/<latest-planning-complete>.md and docs/03_photography.md — verify and close Phase 3, then continue Phase 4
```

```
/implementer continue phase 4 per docs/04_built-work-skills.md
```

```
/implementer continue phase 5 per docs/05_docs-deploy.md
```

---

## Architecture quick reference

```
src/
  app/           layout.tsx, page.tsx, globals.css
  components/    Nav, Footer, ThemeControls, Reveal, Hero, About, Photography, Lightbox
  content/       profile.ts, photos.ts, projects.ts, skills.ts, types.ts
  lib/           galleryLayout.ts  (+ workLayout.ts in Phase 4)
public/images/   portrait/, photography/, work/ + placeholders
docs/            00_plan.md, 01–05 phase files, decisions/, artifacts/handoffs/
```

Design source: `design_handoff_portfolio/design-reference/{index.html,styles.css}` — CSS already ported to `globals.css`.
