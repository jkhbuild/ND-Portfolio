# Nirmita Dave — Portfolio

Your personal portfolio website. Everything visitors see — your bio, Vision
gallery images, construction projects, skills, and résumé — can be edited **directly on GitHub**
through the web browser. No coding tools required.

When you save changes on the `main` branch, the site rebuilds automatically on
Vercel. If a change has a typo or broken formatting, the build fails and the
**last good version stays live** until you fix it.

---

## Quick map — what lives where

| What you want to change | Where to edit |
|---|---|
| Name, hero text, bio, section headings, footer, theme defaults | `src/content/profile.ts` |
| Vision gallery (§ 02) | `src/content/photos.ts` + images in `public/images/photography/` |
| Construction projects (Built Work) | `src/content/projects.ts` + images in `public/images/work/` |
| Software & certifications lists | `src/content/skills.ts` |
| Portrait photo | `public/images/portrait/` + `profile.ts` portrait fields |
| Résumé PDF | `public/Nirmita-Dave-CV.pdf` (or update path in `profile.ts`) |

**Important:** All editable words and image paths live in `src/content/*.ts`.
Never paste your bio or project descriptions into the component files under
`src/components/` — those files are code, not content.

---

## How to edit on GitHub (web UI)

1. Open your repository on [github.com](https://github.com).
2. Navigate to the file you need (use the table above).
3. Click the **pencil icon** (Edit this file).
4. Make your changes. Keep quotes, commas, and `{ }` brackets exactly as they are.
5. Scroll down, write a short commit message (e.g. "Add new photo"), and click
   **Commit changes** to `main`.
6. Wait 1–2 minutes for Vercel to rebuild. Refresh your live site to see updates.

---

## 1. Add a Vision image

**Step A — upload the image file**

1. In GitHub, open the folder `public/images/photography/`.
2. Click **Add file** → **Upload files**.
3. Drag in your `.jpg` or `.jpeg` file. Use a short, descriptive filename with
   no spaces (e.g. `canal-bridge.jpeg`).
4. Commit the upload to `main`.

**Step B — add the entry in the data file**

1. Open `src/content/photos.ts`.
2. Scroll to the **bottom** of the list — find the line that says
   `↓↓↓ ADD YOUR NEW PHOTO BELOW THIS LINE`.
3. Copy an existing `{ ... }` block above it.
4. Paste it **just above** the closing `];` at the very end of the list.
5. Edit the four fields:
   - `src` — path to your file, e.g. `"/images/photography/canal-bridge.jpeg"`
   - `title` — the image title shown on the site
   - `meta` — the small grey caption (location, mood, etc.)
   - `alt` — a short description for screen readers (what is in the image?)
6. Commit to `main`.

**Ordering rule:** The entry at the **bottom** of the list appears **first**
(top) on the website. Never reorder entries or type numbers yourself — just keep
appending new images to the bottom.

Until you upload a real file, you can temporarily set `src` to
`"/images/photography/placeholder.svg"`.

---

## 2. Add a construction project

**Step A — upload a project photo (optional)**

1. Open `public/images/work/` on GitHub.
2. **Add file** → **Upload files** → upload your `.jpg` or `.jpeg`.
3. Commit to `main`.

**Step B — add the project entry**

1. Open `src/content/projects.ts`.
2. Scroll to `↓↓↓ ADD YOUR NEW PROJECT BELOW THIS LINE`.
3. Copy an existing `{ ... }` block and paste it at the **bottom** (just above
   `];`).
4. Edit the fields:
   - `img` — optional. Path like `"/images/work/my-project.jpg"`. **Delete the
     entire `img` line** if you have no photo yet — the site shows a tidy
     "coming soon" placeholder tile until you add one.
   - `title` — project name
   - `tags` — array of short labels, e.g. `["Transit", "ADA"]`
   - `desc` — the full project description (paragraph)
   - `location` — city / state
   - `year` — e.g. `"2024"`
   - `role` — your role on the project
5. Commit to `main`.

**Ordering rule:** Same as photos — **bottom of the list = newest = shows first**
on the site. Never reorder or hand-number tiles.

---

## 3. Edit your bio

1. Open `src/content/profile.ts`.
2. Edit text inside the quotes for any of these sections:
   - `eyebrow` — small line above your name in the hero
   - `hero.lead` — main intro paragraph. Wrap a phrase in `{{ double curly
     braces }}` to show it in italic accent type.
   - `hero.bullets` — the three credential lines under the intro
   - `about.lead` — opening sentence in the About section
   - `about.paragraphs` — bio paragraphs (each one is a separate quoted string)
   - `about.highlightPhrase` — a phrase from your paragraphs that appears in
     accent colour (must match text exactly)
   - `about.meta` — the four info boxes (Discipline, Also, Based, Practising since)
   - `footer.blurb` and `footer.copyright`
3. Commit to `main`.

To change your portrait: upload a new image to `public/images/portrait/`, then
update `about.portrait.src`, `alt`, and `caption` in the same file. If the new
image has different dimensions, also update `width` and `height` (use the pixel
size from your photo editor or phone).

---

## 4. Edit any description

- **Project descriptions** — edit the `desc` field in `src/content/projects.ts`
  for the project you want to change.
- **Vision captions** — edit `title` and `meta` in `src/content/photos.ts`.
- **Section intros** — in `src/content/profile.ts`, edit fields under
  `photography` (Vision section), `builtWork`, or `skills` (e.g. `lead`, `intro`, `series`).
- **Skills lists** — edit `src/content/skills.ts` (`software` array and
  `certifications` entries).

Commit each change to `main`.

---

## 5. Swap the résumé

**Option A — keep the same filename (easiest)**

1. On GitHub, open `public/Nirmita-Dave-CV.pdf`.
2. Click the **⋯** menu → **Delete file** (or upload a replacement with the
   same name via **Upload files** in the `public/` folder).
3. Upload your new PDF as `Nirmita-Dave-CV.pdf` in `public/`.
4. No changes needed in `profile.ts` — `resumePath` already points here.

**Option B — use a different filename**

1. Upload your PDF to `public/` with your chosen name.
2. Open `src/content/profile.ts` and change `resumePath` to match, e.g.
   `"/My-New-Resume.pdf"`.
3. Commit to `main`.

The **Download Résumé** button in the hero uses this path automatically.

---

## 6. Change theme defaults

Open `src/content/profile.ts` and edit the `theme` block at the bottom:

```ts
theme: {
  defaultPalette: "dusk",   // or "pond"
  defaultMode: "light",     // or "dark"
  grain: true,              // film-grain overlay: true or false
},
```

- `defaultPalette` — `"dusk"` (warm terracotta/teal) or `"pond"` (olive/lotus pink)
- `defaultMode` — `"light"` or `"dark"`
- `grain` — `true` to show the subtle film-grain texture; `false` to hide it

Visitors can still switch palette and mode from the top navigation; their choice
is remembered in the browser. These defaults only apply on a first visit.

Commit to `main`.

---

## What NOT to touch

| Do not edit | Why |
|---|---|
| `src/components/` | React code — not content |
| `src/lib/` | Layout math (photo grid rhythm, tile sizing, auto-numbering) |
| `src/app/globals.css` | Visual design tokens and layout |
| `package.json`, `next.config.ts` | Build configuration |
| `docs/` | Developer planning notes |

Reordering entries in `photos.ts` or `projects.ts` will scramble what appears
"newest" on the site. **Always append at the bottom.**

---

## How edits go live

```
You edit on GitHub → commit to main → Vercel builds automatically → site updates
```

- A **successful** build deploys the new version (usually 1–2 minutes).
- A **failed** build (syntax error, missing comma, bad quotes) leaves the
  previous deploy live. GitHub shows the failed check; fix the file and commit again.

---

## For developers (local preview)

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other commands: `npm run build`, `npm start`,
`npm run lint`.

Project docs: [`docs/00_plan.md`](docs/00_plan.md), [`docs/decisions/`](docs/decisions/).
