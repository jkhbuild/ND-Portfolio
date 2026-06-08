import type { Skills } from "./types";

/**
 * ============================================================================
 *  SKILLS & CERTIFICATIONS
 * ============================================================================
 *
 *  SOFTWARE: a simple list of tool names. Add or remove a line (keep the
 *  quotes and the comma). The little count next to the heading updates itself.
 *
 *  CERTIFICATIONS: each one has a name and a small grey sub-label. To add one,
 *  copy a { name: ..., sublabel: ... } line and edit it. Use sublabel: "" if
 *  there's nothing to put underneath.
 *
 *  Both lists are numbered automatically — you never type the numbers.
 * ============================================================================
 */
export const skills: Skills = {
  software: [
    "Primavera Unifier",
    "Kahua",
    "AutoCAD",
    "Revit",
    "Procore",
    "BIM",
    "Microsoft Project",
    "Microsoft Office",
  ],

  certifications: [
    { name: "OSHA 30", sublabel: "Construction Safety" },
    { name: "OSHA 10", sublabel: "Construction Safety" },
    { name: "Primavera P6", sublabel: "Scheduling" },
    { name: "NYC-SST 16-Hour", sublabel: "Site Safety Training" },
    { name: "Licensed Architect", sublabel: "Council of Architecture, India" },
    { name: "Procore Certified", sublabel: "BIM Manager · Project Management" },
    { name: "Google Project Management", sublabel: "Professional Certificate" },
  ],
};
