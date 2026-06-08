import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Cormorant_Garamond,
  Hanken_Grotesk,
  Space_Mono,
  Pinyon_Script,
} from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

// Display serif (headings + the italic "Nirmita") — variable axis, italic + roman.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body sans — variable axis.
const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Technical labels — static weights.
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

// Signature script — single weight.
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nirmita Dave — Architect & Image-maker",
  description:
    "Portfolio of Nirmita Dave — licensed architect and construction-management professional. Built work, vision, skills & certifications.",
};

// Applies the saved palette/mode before first paint so there is no theme flash.
const themeScript = `(function(){try{var r=document.documentElement;var p=localStorage.getItem('nd-palette');var m=localStorage.getItem('nd-mode');if(p)r.setAttribute('data-palette',p);if(m)r.setAttribute('data-mode',m);}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = `${display.variable} ${body.variable} ${mono.variable} ${script.variable}`;
  return (
    <html
      lang="en"
      data-palette={profile.theme.defaultPalette}
      data-mode={profile.theme.defaultMode}
      className={fontVars}
      suppressHydrationWarning
    >
      <body className={profile.theme.grain ? "show-grain" : undefined}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {profile.theme.grain ? (
          <div className="grain-layer" aria-hidden="true" />
        ) : null}
        {children}
      </body>
    </html>
  );
}
