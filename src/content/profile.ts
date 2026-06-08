import type { Profile } from "./types";

/**
 * ============================================================================
 *  ABOUT / BIO / HEADINGS  —  edit your words here
 * ============================================================================
 *  This file holds the text for the top of the page (hero), the About section,
 *  the small intro lines, the footer, and the default theme.
 *
 *  To change your bio or any description: edit the text between the quotes.
 *  Keep the quotes and commas exactly where they are.
 *
 *  Tip: in `hero.lead`, anything wrapped in double curly braces {{ like this }}
 *  is shown in italic accent type.
 * ============================================================================
 */
export const profile: Profile = {
  eyebrow: "Architect & Image-maker — building inside the lines",

  name: {
    script: "Nirmita",
    display: "Dave",
  },

  hero: {
    lead: "{{Drawn to the grid, devoted to the glitch.}} A young licensed architect who builds precise structures by day and photographs imprecise, tender things the rest of the time.",
    bullets: [
      "Bachelor of Architecture",
      "Licensed, Council of Architecture (India)",
      "Working in New York",
    ],
  },

  // Put your résumé PDF in the /public folder and write its name here.
  resumePath: "/Nirmita-Dave-CV.pdf",

  about: {
    lead: "I design buildings the way I take photographs — looking for the one honest angle, then holding still long enough for the light to arrive.",
    paragraphs: [
      "Trained as an architect, I spend my days inside coordination models, construction schedules and the unglamorous arithmetic of getting a thing actually built. I like that rigour. I like knowing a wall will stand. But the part of me that refuses to fully conform keeps wandering off to photograph drowned trees, tangled wires and a single lotus that didn't ask permission to bloom.",
      "This portfolio holds both halves: the measured work and the unmeasured looking. One keeps the other honest.",
    ],
    // This phrase (found in the paragraphs above) is shown in accent colour.
    highlightPhrase: "refuses to fully conform",
    meta: [
      { label: "Discipline", value: "Architecture · BIM · Delivery" },
      { label: "Also", value: "Construction Management, QAQC, Photography" },
      { label: "Based", value: "New York / Ahmedabad" },
      { label: "Practising since", value: "2018" },
    ],
  },

  photography: {
    series: 'Series — "Still / Unstill" · 2021–2025',
    lead: "Found light, off the clock. Shot on phone & film, untidy on purpose.",
  },

  builtWork: {
    intro: "Selected — heavy civil & transit",
    minPlaceholders: 2,
  },

  footer: {
    blurb: [
      "Architect & image-maker",
      "Building inside the lines — photographing outside them.",
    ],
    copyright: "© 2026 Nirmita Dave — all images her own.",
  },

  theme: {
    defaultPalette: "dusk",
    defaultMode: "light",
    grain: true,
  },
};
