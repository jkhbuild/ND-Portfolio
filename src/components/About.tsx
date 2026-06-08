import Image from "next/image";
import { Fragment } from "react";
import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";
import { splitHighlight } from "./textHelpers";

export function About() {
  const { about } = profile;
  const { portrait } = about;

  return (
    <section className="block" id="about">
      <div className="wrap">
        <Reveal className="block-head">
          <div className="section-index">{about.sectionIndex}</div>
          <h2>{about.title}</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal as="figure" className="portrait-frame">
            <div className="pf-img">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                sizes="(max-width: 880px) 92vw, 42vw"
                unoptimized={portrait.src.endsWith(".svg")}
              />
            </div>
            <figcaption>{portrait.caption}</figcaption>
          </Reveal>

          <Reveal className="about-body" delay={1}>
            <p>{about.lead}</p>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                {splitHighlight(paragraph, about.highlightPhrase).map((segment, index) =>
                  segment.marked ? (
                    <span className="hl" key={index}>
                      {segment.text}
                    </span>
                  ) : (
                    <Fragment key={index}>{segment.text}</Fragment>
                  )
                )}
              </p>
            ))}

            <div className="about-meta">
              {about.meta.map((item) => (
                <div key={item.label}>
                  <div className="k">{item.label}</div>
                  <div className="v">{item.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
