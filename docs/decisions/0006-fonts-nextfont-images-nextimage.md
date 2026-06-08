# 0006. Fonts via next/font, images via next/image

- Status: accepted
- Date: 2026-06-07
- Supersedes: none
- Superseded-by: none

## Context
The prototype loads Google Fonts via a `<link>` and uses plain `<img>`. On Next.js these hurt performance/CLS, and the `nextjs` skill explicitly flags external font links and raw `<img>`.

## Decision
Load the four fonts (Cormorant Garamond, Hanken Grotesk, Space Mono, Pinyon Script) with `next/font/google`, exposed as CSS variables. Use `next/image` for all photographs and the portrait, with appropriate `sizes`, lazy loading by default, and `priority` only where it aids LCP.

## Alternatives considered
- **Keep the Google Fonts `<link>` + `<img>`** — simplest port, but worse Core Web Vitals and flagged by tooling.

## Consequences
- Positive: zero-CLS self-hosted fonts; automatic responsive/optimized images for a photo-heavy site; better Lighthouse scores.
- Negative: image components need explicit dimensions or `fill` + a positioned wrapper (handled per tile).
- Neutral: owner-supplied images drop into `public/images/...`; the data files reference them by path.
