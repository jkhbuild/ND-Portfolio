"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { photos } from "@/content/photos";
import type { Photo } from "@/content/types";
import { profile } from "@/content/profile";
import { computeGalleryLayout, type GalleryTile } from "@/lib/galleryLayout";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";

const galleryTiles = computeGalleryLayout(photos);

function tileClassName(tile: GalleryTile) {
  return ["shot", tile.size, tile.lift ? "lift" : ""].filter(Boolean).join(" ");
}

export function Photography() {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const { photography } = profile;

  const openLightbox = (tile: GalleryTile, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger;
    setActivePhoto(tile.photo);
  };

  return (
    <>
      <section className="block" id="photography">
        <div className="wrap">
          <Reveal className="block-head">
            <div className="section-index">{photography.sectionIndex}</div>
            <h2>{photography.title}</h2>
            <p className="lead">{photography.lead}</p>
          </Reveal>

          <Reveal className="photo-intro" delay={1}>
            <p className="mono">{photography.series}</p>
            <p className="mono">{photography.enlargeCue}</p>
          </Reveal>

          <div className="photo-gallery">
            {galleryTiles.map((tile) => (
              <Reveal
                as="figure"
                className={tileClassName(tile)}
                delay={tile.delay}
                key={`${tile.displayIndex}-${tile.photo.title}`}
              >
                <button
                  type="button"
                  className="shot-trigger"
                  style={{ position: "absolute", inset: 0 }}
                  aria-label={`Enlarge ${tile.photo.title}`}
                  onClick={(event) => openLightbox(tile, event.currentTarget)}
                >
                  <Image
                    src={tile.photo.src}
                    alt={tile.photo.alt}
                    fill
                    sizes="(max-width: 880px) 50vw, 33vw"
                    unoptimized={tile.photo.src.endsWith(".svg")}
                  />
                </button>
                <figcaption className="cap">
                  <span className="t">{tile.photo.title}</span>
                  <span className="x">{tile.photo.meta}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
        returnFocusRef={returnFocusRef}
      />
    </>
  );
}
