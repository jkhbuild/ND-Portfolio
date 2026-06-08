import type { Project } from "@/content/types";

export type WorkTileSpan = "span7" | "span5";

export interface WorkTile {
  project: Project;
  displayNumber: number;
  span: WorkTileSpan;
  lift: boolean;
  isPlaceholder: boolean;
  delay?: 1;
}

/**
 * Computes Built Work tile spans from display position.
 *
 * Source content is owner-edited oldest-to-newest; rendering reverses it.
 * Rows alternate span7+span5 and span5+span7 (with lift on the wider tile
 * in the second row). Only entries in projects.ts are rendered — no extra
 * placeholder tiles (unlike Photography).
 */
export function computeWorkLayout(sourceProjects: readonly Project[]): WorkTile[] {
  const orderedProjects = [...sourceProjects].reverse();

  return orderedProjects.map((project, index) => {
    const row = Math.floor(index / 2);
    const column = index % 2;
    const evenRow = row % 2 === 0;

    let span: WorkTileSpan;
    let lift = false;

    if (evenRow) {
      span = column === 0 ? "span7" : "span5";
    } else {
      span = column === 0 ? "span5" : "span7";
      lift = column === 1;
    }

    return {
      project,
      displayNumber: index + 1,
      span,
      lift,
      isPlaceholder: !project.img,
      delay: column === 1 ? 1 : undefined,
    };
  });
}
