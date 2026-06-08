# 0001. Framework: Next.js 16 (App Router, SSG)

- Status: accepted
- Date: 2026-06-07
- Supersedes: none
- Superseded-by: none

## Context
The site is a static single-page portfolio whose #1 requirement is easy content editing by a non-technical owner via the GitHub web UI, with a build-gated deploy so a bad edit can't take the live site down. Secondary goals: maintainability, performance, and good tooling/skill support in this environment.

## Decision
Build with Next.js 16 (App Router, React 19), statically generated, deployed on Vercel. Mostly Server Components; Client Components only for interactivity (theme toggle, lightbox, project modal, scroll reveal).

## Alternatives considered
- **Astro** — lighter and arguably the ideal content-site fit, but no dedicated skill/tooling in this environment and the chosen design needs only a few interactive islands that Next handles well.
- **Plain HTML/CSS/JS (GitHub Pages)** — simplest, zero build, but no build gate: a typo in the content edit can break the live site, which is unacceptable for a non-technical editor.

## Consequences
- Positive: build-gated safety (failed build keeps last good deploy live); strong skill support (`nextjs`, `react-best-practices`); `next/image` optimization for a photo-heavy site; componentized + maintainable.
- Negative: ships more JS than Astro/plain HTML; a framework toolchain to maintain.
- Neutral: requires Vercel (or equivalent) for the build/deploy pipeline.
