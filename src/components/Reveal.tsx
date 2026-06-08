"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  className?: string;
  /** Optional stagger step: 1, 2 or 3 (adds a small delay). */
  delay?: 1 | 2 | 3;
  id?: string;
  children: ReactNode;
};

/**
 * Wraps content in a div that fades/slides in when scrolled into view.
 * Honors prefers-reduced-motion (shows content immediately, no transform).
 */
export function Reveal({ className = "", delay, id, children }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls = ["reveal", delay ? `d${delay}` : "", inView ? "in" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} id={id} className={cls}>
      {children}
    </div>
  );
}
