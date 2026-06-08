"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { ThemeControls } from "./ThemeControls";

const LINKS = [
  { href: "#about", n: "01", label: "About" },
  { href: "#photography", n: "02", label: "Vision" },
  { href: "#work", n: "03", label: "Built Work" },
  { href: "#skills", n: "04", label: "Skills" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));

    function onScroll() {
      setScrolled(window.scrollY > 40);
      const pos = window.scrollY + window.innerHeight * 0.35;
      let idx = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) idx = i;
      });
      setActiveIndex(idx);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")} id="nav">
      <div className="wrap">
        <a href="#top" className="nav-mark">
          {profile.name.script}
          <b>{profile.name.display} · Architect</b>
        </a>
        <div className="nav-right">
          <div className="nav-links">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className={i === activeIndex ? "active" : undefined}
              >
                <span className="n">{link.n}</span>
                {link.label}
              </a>
            ))}
          </div>
          <ThemeControls />
        </div>
      </div>
    </nav>
  );
}
