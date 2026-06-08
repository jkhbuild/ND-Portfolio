# 0002. Content model: commented data files, newest-first via reverse render, auto-generated indices

- Status: accepted
- Date: 2026-06-07
- Supersedes: none
- Superseded-by: none

## Context
The owner must add/edit content through the GitHub web UI without breaking layout or touching ordering logic. The owner explicitly wants newly added photos/projects (appended to the back of the list) to appear first in the display (top), without manipulating any order/index field.

## Decision
Store each section's content in a single, heavily-commented TypeScript file under `src/content/` (`profile.ts`, `photos.ts`, `projects.ts`, `skills.ts`). The owner appends new entries at the END of the relevant array. The site renders lists **reversed** (newest first). All visible numbering (`§ 01…`, photo numbers, certification numbers) and Built Work tile sizing/placeholders are **computed from display position at render** — never stored or hand-edited.

## Alternatives considered
- **One Markdown/MDX file per item (content collections)** — friendly isolation, but ordering requires a sort key (date or filename), which violates the "no manual ordering field" requirement.
- **JSON files** — no comments to guide the editor and trailing-comma/quote errors are common; TS gives inline guidance, trailing-comma tolerance, and build-time type checks.

## Consequences
- Positive: meets "append → shows first" exactly; type errors caught at build with clear messages; rich `// HOW TO ADD…` comments live next to the data; one mental model for all sections.
- Negative: a single malformed array can fail the section's build (mitigated by the build gate keeping the last good deploy live, and by clear comments/types).
- Neutral: components must treat content as the source of truth and never hardcode copy/images.
