# 0005. Hosting: Vercel with auto-deploy from GitHub

- Status: accepted
- Date: 2026-06-07
- Supersedes: none
- Superseded-by: none

## Context
The owner edits content via GitHub and expects changes to go live automatically, with safety against breaking edits.

## Decision
Host on Vercel (hobby/free tier), connected to the GitHub repo with auto-deploy on push to `main`. Production builds are gated: a failed build keeps the previous successful deployment live.

## Alternatives considered
- **Netlify** — equivalent capability; Vercel chosen because it's already wired up in this environment and pairs natively with Next.js.
- **GitHub Pages** — free, but needs a build Action for Next and offers a weaker safety story for a non-technical editor.

## Consequences
- Positive: zero-touch deploys on edit; preview deploys for PRs; failed build can't take the site down; native `next/image` optimization.
- Negative: ties production to a third-party platform (acceptable for a personal site).
- Neutral: custom domain decision deferred to the deploy phase.
