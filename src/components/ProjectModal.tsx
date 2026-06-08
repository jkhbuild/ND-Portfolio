"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
} from "react";
import type { Project } from "@/content/types";

type ProjectModalProps = {
  project: Project | null;
  displayNumber: number | null;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

const focusableSelector = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function ProjectModal({
  project,
  displayNumber,
  onClose,
  returnFocusRef,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    const returnFocusElement = returnFocusRef.current;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      returnFocusElement?.focus();
    };
  }, [project, returnFocusRef]);

  if (!project || displayNumber === null) return null;

  const hasImage = Boolean(project.img);

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
    );

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="pmodal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      ref={dialogRef}
      onClick={closeFromBackdrop}
      onKeyDown={trapFocus}
    >
      <div className="pmodal-card">
        <div className={`pmodal-media${hasImage ? "" : " placeholder"}`}>
          <button
            className="pmodal-x"
            type="button"
            onClick={onClose}
            ref={closeButtonRef}
          >
            [ esc ] close ✕
          </button>
          {hasImage ? (
            <Image
              src={project.img!}
              alt={project.title}
              fill
              sizes="(max-width: 760px) 100vw, 60vw"
              unoptimized={project.img!.endsWith(".svg")}
            />
          ) : (
            <span>Image coming soon</span>
          )}
        </div>
        <div className="pmodal-body">
          <div className="pm-no">§ {String(displayNumber).padStart(2, "0")}</div>
          <h3 id={titleId}>{project.title}</h3>
          <div className="pm-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="pm-desc">{project.desc}</p>
          <div className="pm-meta">
            <div>
              <div className="k">Location</div>
              <div className="v">{project.location}</div>
            </div>
            <div>
              <div className="k">Year</div>
              <div className="v">{project.year}</div>
            </div>
            <div>
              <div className="k">Role</div>
              <div className="v">{project.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
