"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { profile } from "@/content/profile";
import { computeWorkLayout, type WorkTile } from "@/lib/workLayout";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./Reveal";

const workTiles = computeWorkLayout(projects);

function tileClassName(tile: WorkTile) {
  return [
    "work-tile",
    tile.span,
    tile.isPlaceholder ? "placeholder" : "",
    tile.lift ? "lift" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function tileKind(tile: WorkTile) {
  if (tile.isPlaceholder && !tile.project.img) {
    return "Details to follow";
  }

  const tag = tile.project.tags[0];
  return tag ? `${tag} · ${tile.project.location}` : tile.project.location;
}

function formatTileNumber(displayNumber: number) {
  return String(displayNumber).padStart(2, "0");
}

export function BuiltWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeDisplayNumber, setActiveDisplayNumber] = useState<number | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const { builtWork } = profile;

  const openModal = (tile: WorkTile, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger;
    setActiveProject(tile.project);
    setActiveDisplayNumber(tile.displayNumber);
  };

  const closeModal = () => {
    setActiveProject(null);
    setActiveDisplayNumber(null);
  };

  return (
    <>
      <section className="block" id="work">
        <div className="wrap">
          <Reveal className="block-head">
            <div className="section-index">{builtWork.sectionIndex}</div>
            <h2>{builtWork.title}</h2>
          </Reveal>

          <Reveal className="photo-intro" delay={1}>
            <p className="mono">{builtWork.intro}</p>
            <p className="mono">{builtWork.enlargeCue}</p>
          </Reveal>

          <div className="work-gallery">
            {workTiles.map((tile) => (
              <Reveal
                as="figure"
                className={tileClassName(tile)}
                delay={tile.delay}
                key={`${tile.displayNumber}-${tile.project.title}`}
              >
                <button
                  type="button"
                  className="work-tile-trigger"
                  aria-label={`View ${tile.project.title}`}
                  onClick={(event) => openModal(tile, event.currentTarget)}
                >
                  <span className="wt-corner" aria-hidden="true" />
                  {tile.project.img ? (
                    <Image
                      src={tile.project.img}
                      alt={tile.project.title}
                      fill
                      sizes="(max-width: 880px) 100vw, 50vw"
                      unoptimized={tile.project.img.endsWith(".svg")}
                    />
                  ) : null}
                  <div className="wt-label">
                    <div>
                      <div className="wt-no">{formatTileNumber(tile.displayNumber)}</div>
                      <div className="wt-name">{tile.project.title}</div>
                      <div className="wt-kind">{tileKind(tile)}</div>
                    </div>
                    <span className="wt-open">View ↗</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        displayNumber={activeDisplayNumber}
        onClose={closeModal}
        returnFocusRef={returnFocusRef}
      />
    </>
  );
}
