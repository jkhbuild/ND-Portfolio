import type { Photo } from "./types";

/**
 * ============================================================================
 *  VISION  —  your image gallery (§ 02)
 * ============================================================================
 *
 *  HOW TO ADD A PHOTO  (3 steps):
 *    1. Upload your image file into  public/images/photography/
 *       (on GitHub: open that folder → "Add file" → "Upload files").
 *    2. Copy one whole { ... } block below.
 *    3. Paste it at the BOTTOM of the list (just above the  ]  line) and
 *       change src / title / meta / alt to match your new photo.
 *
 *  ORDERING: the newest photo (the one at the BOTTOM of this list) shows up
 *  FIRST (top) on the website. You never have to reorder or number anything —
 *  just keep adding to the bottom.
 *
 *  Keep every block looking like the others: a comma after each } and quotes
 *  around every piece of text.
 *
 *  New photos without an uploaded file can temporarily use
 *  /images/photography/placeholder.svg until the real image is ready.
 * ============================================================================
 */
export const photos: Photo[] = [
  {
    src: "/images/photography/swan.jpeg",
    title: "Mute Swan, Still Canal",
    meta: "Green water · midday",
    alt: "A white swan on still green water",
  },
  {
    src: "/images/photography/lotus.jpeg",
    title: "Lotus, Before Noon",
    meta: "Lily pond · single bloom",
    alt: "A pink lotus flower among green lily pads",
  },
  {
    src: "/images/photography/pink-wires.jpeg",
    title: "Crossed Wires",
    meta: "Pink hour · overhead lines",
    alt: "Telephone wires crossing a pink evening sky",
  },
  {
    src: "/images/photography/brick-window.jpeg",
    title: "Shut for the Season",
    meta: "Old town · brick & deodar",
    alt: "A weathered wooden window set in an old brick wall",
  },
  {
    src: "/images/photography/tree-pond.jpeg",
    title: "The Tree That Stayed",
    meta: "Flooded grove · Rajasthan",
    alt: "A lone tree standing in still water at dusk",
  },
  // ↓↓↓ ADD YOUR NEW PHOTO BELOW THIS LINE (newest shows first) ↓↓↓
];
