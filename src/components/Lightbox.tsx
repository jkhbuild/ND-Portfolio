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
import type { Photo } from "@/content/types";

type LightboxProps = {
  photo: Photo | null;
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

export function Lightbox({ photo, onClose, returnFocusRef }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const captionId = useId();

  useEffect(() => {
    if (!photo) return;

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
  }, [photo, returnFocusRef]);

  if (!photo) return null;

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
      className="lightbox open"
      role="dialog"
      aria-modal="true"
      aria-labelledby={captionId}
      ref={dialogRef}
      onClick={closeFromBackdrop}
      onKeyDown={trapFocus}
    >
      <button className="lb-x" type="button" onClick={onClose} ref={closeButtonRef}>
        [ esc ] close ✕
      </button>
      <div className="lb-frame">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          unoptimized={photo.src.endsWith(".svg")}
        />
      </div>
      <div className="lb-cap" id={captionId}>
        {photo.title} — {photo.meta}
      </div>
    </div>
  );
}
