import type { Photo } from "@/content/types";

export type GalleryTileSize = "s-tall" | "s-wide" | "s-third";

export interface GalleryTile {
  photo: Photo;
  displayIndex: number;
  size: GalleryTileSize;
  lift: boolean;
  delay?: 1 | 2;
}

/**
 * Computes the art-directed photo rhythm from display position.
 *
 * Source content is owner-edited oldest-to-newest, so rendering starts from a
 * reversed copy. The DOM order stays newest-first while two-photo rows alternate
 * which side gets the tall/wide treatment.
 */
export function computeGalleryLayout(sourcePhotos: readonly Photo[]): GalleryTile[] {
  const orderedPhotos = [...sourcePhotos].reverse();
  const tiles: GalleryTile[] = [];
  let index = 0;
  let wantTwoRow = true;
  let twoRowCount = 0;

  while (index < orderedPhotos.length) {
    if (wantTwoRow) {
      const row = orderedPhotos.slice(index, index + 2);
      const swapped = twoRowCount % 2 === 1;

      row.forEach((photo, rowIndex) => {
        const isFirst = rowIndex === 0;
        tiles.push({
          photo,
          displayIndex: index + rowIndex,
          size: row.length === 1 ? "s-wide" : isFirst === swapped ? "s-wide" : "s-tall",
          lift: false,
          delay: rowIndex === 1 ? 1 : undefined,
        });
      });

      index += row.length;
      twoRowCount += 1;
    } else {
      const row = orderedPhotos.slice(index, index + 3);

      row.forEach((photo, rowIndex) => {
        tiles.push({
          photo,
          displayIndex: index + rowIndex,
          size: "s-third",
          lift: rowIndex === 1,
          delay: rowIndex === 1 ? 1 : rowIndex === 2 ? 2 : undefined,
        });
      });

      index += row.length;
    }

    wantTwoRow = !wantTwoRow;
  }

  return tiles;
}
