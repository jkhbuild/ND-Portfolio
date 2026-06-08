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
    actions: {
      resumeLabel: "Download Résumé",
      resumeFormat: "PDF",
      scrollLabel: "Scroll — begin the section index",
    },
  },

  // Put your résumé PDF in the /public folder and write its name here.
  resumePath: "/Nirmita-Dave-CV.pdf",

  about: {
    sectionIndex: "§ 01",
    title: "About",
    portrait: {
      src: "/images/portrait/portrait.jpeg",
      alt: "Portrait of Nirmita Dave",
      caption: "Nirmita Dave — architect & image-maker",
      width: 1206,
      height: 769,
    },
    lead: "I approach buildings the way I approach a difficult site — finding the honest constraint first, then holding still long enough for the right decision to surface.",
    paragraphs: [
      "Trained as an architect, I spend my days inside coordination models, construction schedules and the unglamorous arithmetic of getting a thing actually built. I like that rigour. I like knowing a wall will stand. But the part of me that refuses to fully conform keeps returning to drowned trees, tangled wires and a single lotus that didn't ask permission to bloom.",
      "This portfolio holds both halves: the measured work and the unmeasured looking. One keeps the other honest.",
    ],
    // This phrase (found in the paragraphs above) is shown in accent colour.
    highlightPhrase: "refuses to fully conform",
    meta: [
      { label: "Discipline", value: "Architecture · BIM · Delivery" },
      { label: "Also", value: "Construction Management · QAQC · Design" },
      { label: "Based", value: "New York / Ahmedabad" },
      { label: "Practising since", value: "2018" },
    ],
  },

  photography: {
    sectionIndex: "§ 02",
    title: "Vision",
    series: "Practice — Architecture · Construction Management · Design",
    lead: "How intent becomes structure in the field — coordination, documentation, and the visual judgment that holds a project together.",
    enlargeCue: "Tap any frame to enlarge ↗",
  },

  builtWork: {
    sectionIndex: "§ 03",
    title: "Built Work",
    intro: "Selected — heavy civil & transit",
    enlargeCue: "Tap any frame to enlarge ↗",
  },

  skills: {
    sectionIndex: "§ 04",
    title: "Skills & Certifications",
    lead: "The technical spine behind the work — tools, codes & credentials.",
    softwareLabel: "Software",
    certificationsLabel: "Certifications",
  },

  footer: {
    blurb: [
      "Architect & image-maker",
      "Building inside the lines — reading clearly outside them.",
    ],
    copyright: "© 2026 Nirmita Dave — all images her own.",
  },

  theme: {
    defaultPalette: "pond",
    defaultMode: "dark",
    grain: true,
  },
};
