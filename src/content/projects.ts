import type { Project } from "./types";

/**
 * ============================================================================
 *  BUILT WORK  —  your construction projects
 * ============================================================================
 *
 *  HOW TO ADD A PROJECT  (3 steps):
 *    1. (Optional) Upload a photo into  public/images/work/
 *       (on GitHub: open that folder → "Add file" → "Upload files").
 *    2. Copy one whole { ... } block below.
 *    3. Paste it at the BOTTOM of the list (just above the  ]  line) and edit
 *       the details.  No photo yet?  Delete the  img:  line and it will show a
 *       tidy "coming soon" placeholder tile until you add one.
 *
 *  ORDERING: the newest project (BOTTOM of this list) shows FIRST (top) on the
 *  website. Just keep adding to the bottom — no numbering or reordering.
 *
 *  Projects without a photo yet can omit the img line (see instructions above).
 * ============================================================================
 */
export const projects: Project[] = [
  {
    img: "/images/work/tonnelle.jpg",
    title: "Tonnelle Avenue Bridge",
    tags: ["Heavy Civil", "Bridge Replacement", "Grade Separation"],
    desc: "Replacement of the Route 139 structure over Tonnelle Avenue — staged demolition and reconstruction kept the highway and local streets moving while new abutments, deck and retaining walls went in below. Day-to-day coordination of schedule, submittals, RFIs and site safety across a tight, traffic-bound footprint.",
    location: "Jersey City, NJ",
    year: "2023",
    role: "Project Engineer · Coordination",
  },
  {
    img: "/images/work/pkg6.jpg",
    title: "MTA PKG 6 — ADA Upgrades",
    tags: ["Transit", "ADA Accessibility", "Structural Steel"],
    desc: "Accessibility upgrades on the elevated subway line — new elevators, structural steel and platform reconstruction delivered over live tracks. Field coordination, documentation and RFI management threaded around active service windows and overnight outages.",
    location: "New York, NY",
    year: "2022",
    role: "Field Engineer · Coordination",
  },
  // ↓↓↓ ADD YOUR NEW PROJECT BELOW THIS LINE (newest shows first) ↓↓↓
];
