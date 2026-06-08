"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Mode, Palette } from "@/content/types";
import { profile } from "@/content/profile";

const THEME_EVENT = "nd-theme-change";
const DEFAULT_SNAPSHOT = `${profile.theme.defaultPalette}:${profile.theme.defaultMode}`;
const PALETTES: Palette[] = ["dusk", "pond"];
const MODES: Mode[] = ["light", "dark"];

function isPalette(value: string | null): value is Palette {
  return PALETTES.includes(value as Palette);
}

function isMode(value: string | null): value is Mode {
  return MODES.includes(value as Mode);
}

function readThemeSnapshot() {
  if (typeof document === "undefined") return DEFAULT_SNAPSHOT;

  const root = document.documentElement;
  const storedPalette = safeStorageGet("nd-palette");
  const storedMode = safeStorageGet("nd-mode");
  const rootPalette = root.getAttribute("data-palette");
  const rootMode = root.getAttribute("data-mode");
  const palette = isPalette(storedPalette)
    ? storedPalette
    : isPalette(rootPalette)
      ? rootPalette
      : profile.theme.defaultPalette;
  const mode = isMode(storedMode)
    ? storedMode
    : isMode(rootMode)
      ? rootMode
      : profile.theme.defaultMode;

  return `${palette}:${mode}`;
}

function safeStorageGet(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function subscribeTheme(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_EVENT, onStoreChange);
  };
}

function writeTheme(next: { palette: Palette; mode: Mode }) {
  document.documentElement.setAttribute("data-palette", next.palette);
  document.documentElement.setAttribute("data-mode", next.mode);
  try {
    localStorage.setItem("nd-palette", next.palette);
    localStorage.setItem("nd-mode", next.mode);
  } catch {
    /* ignore storage errors (private mode, etc.) */
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

function parseThemeSnapshot(snapshot: string) {
  const [palette, mode] = snapshot.split(":");
  return {
    palette: isPalette(palette) ? palette : profile.theme.defaultPalette,
    mode: isMode(mode) ? mode : profile.theme.defaultMode,
  };
}

/**
 * The two segmented controls in the top bar (palette + light/dark).
 * Sets data-palette / data-mode on <html> and persists the choice to
 * localStorage. The matching no-flash restore happens in app/layout.tsx.
 */
export function ThemeControls() {
  const snapshot = useSyncExternalStore(
    subscribeTheme,
    readThemeSnapshot,
    () => DEFAULT_SNAPSHOT
  );
  const { palette, mode } = parseThemeSnapshot(snapshot);

  // Keep the document attributes aligned with the rendered control state.
  useEffect(() => {
    document.documentElement.setAttribute("data-palette", palette);
    document.documentElement.setAttribute("data-mode", mode);
  }, [palette, mode]);

  function choosePalette(next: Palette) {
    writeTheme({ ...parseThemeSnapshot(readThemeSnapshot()), palette: next });
  }

  function chooseMode(next: Mode) {
    writeTheme({ ...parseThemeSnapshot(readThemeSnapshot()), mode: next });
  }

  return (
    <div className="nav-theme">
      <div className="seg" role="group" aria-label="Colour story">
        <button
          type="button"
          suppressHydrationWarning
          className={"seg-btn" + (palette === "dusk" ? " active" : "")}
          aria-pressed={palette === "dusk"}
          onClick={() => choosePalette("dusk")}
        >
          <span className="sw sw-dusk" />
          Dusk
        </button>
        <button
          type="button"
          suppressHydrationWarning
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
          suppressHydrationWarning
          className={"seg-btn" + (mode === "light" ? " active" : "")}
          aria-pressed={mode === "light"}
          onClick={() => chooseMode("light")}
        >
          Light
        </button>
        <button
          type="button"
          suppressHydrationWarning
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
