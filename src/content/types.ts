/**
 * Shared types for the editable content files in this folder.
 *
 * You normally do NOT need to touch this file. It just describes the shape of
 * the data in profile.ts, photos.ts, projects.ts and skills.ts so the editor
 * can warn you if something is filled in wrong.
 */

export type Palette = "dusk" | "pond";
export type Mode = "light" | "dark";

/** One photograph in the Photography gallery. */
export interface Photo {
  /** Image path under /public — e.g. "/images/photography/lotus.jpeg" */
  src: string;
  /** Short title shown on hover and in the lightbox. */
  title: string;
  /** One-line caption, e.g. "Lily pond · single bloom". */
  meta: string;
  /** Description for screen readers / when the image can't load. */
  alt: string;
}

/** One construction project in the Built Work section. */
export interface Project {
  /**
   * Image path under /public — e.g. "/images/work/tonnelle.jpg".
   * Leave this out entirely to show a "coming soon" placeholder tile.
   */
  img?: string;
  /** Project name. */
  title: string;
  /** Short labels shown as a row of tags, e.g. ["Heavy Civil", "Bridge"]. */
  tags: string[];
  /** A paragraph describing the project (shown in the pop-up). */
  desc: string;
  /** e.g. "Jersey City, NJ" */
  location: string;
  /** e.g. "2023" */
  year: string;
  /** e.g. "Project Engineer · Coordination" */
  role: string;
}

/** One certification row. */
export interface Certification {
  /** e.g. "OSHA 30" */
  name: string;
  /** Small grey sub-label, e.g. "Construction Safety". Use "" for none. */
  sublabel: string;
}

export interface Skills {
  /** Software / tools — short names. Shown as a numbered list. */
  software: string[];
  /** Certifications & credentials. Shown as a matching numbered list. */
  certifications: Certification[];
}

export interface Profile {
  /** Small eyebrow line above the name in the hero. */
  eyebrow: string;
  name: {
    /** Italic accent first name in the hero (e.g. "Nirmita"). */
    script: string;
    /** Big uppercase last name in the hero (e.g. "Dave"). */
    display: string;
  };
  hero: {
    /** Lead sentence; wrap the emphasised part in {{ }} to italicise it. */
    lead: string;
    /** Bullet lines under the lead (each its own line). */
    bullets: string[];
  };
  /** Path to the résumé PDF under /public, e.g. "/Nirmita-Dave-CV.pdf". */
  resumePath: string;
  about: {
    /** First (large, italic) paragraph. */
    lead: string;
    /** Remaining paragraphs. */
    paragraphs: string[];
    /** A word/phrase inside `paragraphs` to highlight in accent colour. */
    highlightPhrase: string;
    /** 2×2 facts grid (label → value). */
    meta: { label: string; value: string }[];
  };
  photography: {
    /** Small left intro line, e.g. 'Series — "Still / Unstill" · 2021–2025'. */
    series: string;
    /** Section sub-heading. */
    lead: string;
  };
  builtWork: {
    /** Small left intro line, e.g. "Selected — heavy civil & transit". */
    intro: string;
    /**
     * How many empty "coming soon" tiles to keep at the end of the gallery.
     * The site also auto-pads to an even number of tiles. Set 0 for none.
     */
    minPlaceholders: number;
  };
  footer: {
    /** Two-line blurb in the footer (each item is a line). */
    blurb: string[];
    /** Fine print at the very bottom. */
    copyright: string;
  };
  theme: {
    defaultPalette: Palette;
    defaultMode: Mode;
    /** Subtle film-grain overlay. true = on, false = off. */
    grain: boolean;
  };
}
