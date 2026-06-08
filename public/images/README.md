# Where the images go

Drop image files into these folders, then reference them from the matching
content file in `src/content/`. Filenames are case-sensitive.

## Folders
- `portrait/` — the About portrait. Referenced in Phase 2.
- `photography/` — gallery photos. Listed in `src/content/photos.ts`.
- `work/` — construction project photos. Listed in `src/content/projects.ts`.

## Files the site currently expects
These paths are referenced by the content files today. The site shows a broken
image until the real file is added (placeholders for projects appear
automatically if you omit a project image).

**Photography** (`photography/`)
- `tree-pond.jpeg`
- `brick-window.jpeg`
- `pink-wires.jpeg`
- `lotus.jpeg`
- `swan.jpeg`

**Built Work** (`work/`)
- `tonnelle.jpg`
- `pkg6.jpg`

**Portrait** (`portrait/`)
- `portrait.jpeg`

## Résumé
Put the résumé PDF directly in `public/` (one level up) as
`Nirmita-Dave-CV.pdf`, or change the name in `src/content/profile.ts`
(`resumePath`).

> A full, step-by-step "how to add/replace images on GitHub" guide will live in
> the main README at the project root (added in the docs phase).
