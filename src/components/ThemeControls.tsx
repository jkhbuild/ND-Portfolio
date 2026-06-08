"use client";

import { useEffect, useState } from "react";
import type { Mode, Palette } from "@/content/types";
import { profile } from "@/content/profile";

/**
 * The two segmented controls in the top bar (palette + light/dark).
 * Sets data-palette / data-mode on <html> and persists the choice to
 * localStorage. The matching no-flash restore happens in app/layout.tsx.
 */
export function ThemeControls() {
  const [palette, setPalette] = useState<Palette>(profile.theme.defaultPalette);
  const [mode, setMode] = useState<Mode>(profile.theme.defaultMode);

  // Sync UI state from whatever the no-flash script already applied.
  useEffect(() => {
    const root = document.documentElement;
    const storedPalette =
      (localStorage.getItem("nd-palette") as Palette | null) ??
      (root.getAttribute("data-palette") as Palette | null) ??
      profile.theme.defaultPalette;
    const storedMode =
      (localStorage.getItem("nd-mode") as Mode | null) ??
      (root.getAttribute("data-mode") as Mode | null) ??
      profile.theme.defaultMode;
    setPalette(storedPalette);
    setMode(storedMode);
    root.setAttribute("data-palette", storedPalette);
    root.setAttribute("data-mode", storedMode);
  }, []);

  function choosePalette(next: Palette) {
    setPalette(next);
    document.documentElement.setAttribute("data-palette", next);
    try {
      localStorage.setItem("nd-palette", next);
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
  }

  function chooseMode(next: Mode) {
    setMode(next);
    document.documentElement.setAttribute("data-mode", next);
    try {
      localStorage.setItem("nd-mode", next);
    } catch {
      /* ignore storage errors */
    }
  }

  return (
    <div className="nav-theme">
      <div className="seg" role="group" aria-label="Colour story">
        <button
          type="button"
          className={"seg-btn" + (palette === "dusk" ? " active" : "")}
          aria-pressed={palette === "dusk"}
          onClick={() => choosePalette("dusk")}
        >
          <span className="sw sw-dusk" />
          Dusk
        </button>
        <button
          type="button"
          className={"seg-btn" + (palette === "pond" ? " active" : "")}
          aria-pressed={palette === "pond"}
          onClick={() => choosePalette("pond")}
        >
          <span className="sw sw-pond" />
          Pond
        </button>
      </div>
      <div className="seg" role="group" aria-label="Light or dark mode">
        <button
          type="button"
          className={"seg-btn" + (mode === "light" ? " active" : "")}
          aria-pressed={mode === "light"}
          onClick={() => chooseMode("light")}
        >
          Light
        </button>
        <button
          type="button"
          className={"seg-btn" + (mode === "dark" ? " active" : "")}
          aria-pressed={mode === "dark"}
          onClick={() => chooseMode("dark")}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
