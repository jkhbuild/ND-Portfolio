"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealElement = "div" | "p" | "span" | "figure";

type RevealProps = {
  as?: RevealElement;
  className?: string;
  /** Optional stagger step: 1, 2 or 3 (adds a small delay). */
  delay?: 1 | 2 | 3;
  id?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * Wraps content in an element that fades/slides in when scrolled into view.
 * Honors prefers-reduced-motion (shows content immediately, no transform).
 */
export function Reveal({ as = "div", className = "", delay, id, style, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  if (as === "p") {
    return <p ref={setRef} id={id} className={cls} style={style}>{children}</p>;
  }

  if (as === "span") {
    return <span ref={setRef} id={id} className={cls} style={style}>{children}</span>;
  }

  if (as === "figure") {
    return <figure ref={setRef} id={id} className={cls} style={style}>{children}</figure>;
  }

  return <div ref={setRef} id={id} className={cls} style={style}>{children}</div>;
}
