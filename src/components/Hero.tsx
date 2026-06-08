import { Fragment } from "react";
import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";
import { splitEmphasis } from "./textHelpers";

export function Hero() {
  const { hero } = profile;

  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-title">
          <Reveal as="p" className="mono" delay={1} style={{ marginBottom: "0.4em" }}>
            {profile.eyebrow}
          </Reveal>
          <h1 className="hero-name no-script">
            <Reveal as="span" className="hn-script" delay={1}>
              {profile.name.script}
            </Reveal>
            <Reveal as="span" className="hn-display" delay={2}>
              {profile.name.display}
            </Reveal>
          </h1>
        </div>

        <Reveal className="hero-sub" delay={3}>
          <p>
            {splitEmphasis(hero.lead).map((segment, index) =>
              segment.marked ? (
                <em key={index}>{segment.text}</em>
              ) : (
                <Fragment key={index}>{segment.text}</Fragment>
              )
            )}
          </p>
          <p className="mono" style={{ lineHeight: 1.9, color: "var(--ink-3)" }}>
            {hero.bullets.map((bullet, index) => (
              <span key={bullet}>
                — {bullet}
                {index < hero.bullets.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal className="hero-actions" delay={3}>
          <a
            href={profile.resumePath}
            download
            className="cv-btn"
            aria-label={hero.actions.resumeLabel}
          >
            <span className="cv-arrow" aria-hidden="true">
              ↓
            </span>
            {hero.actions.resumeLabel}
            <span className="cv-ext">{hero.actions.resumeFormat}</span>
          </a>
          <a href="#about" className="hero-scroll mono">
            <span className="dot" aria-hidden="true" />
            {hero.actions.scrollLabel}
          </a>
        </Reveal>
      </div>
    </header>
  );
}
