import { skills } from "@/content/skills";
import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";

function formatRowNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function Skills() {
  const { skills: skillsSection } = profile;

  return (
    <section className="block" id="skills">
      <div className="wrap">
        <Reveal className="block-head">
          <div className="section-index">{skillsSection.sectionIndex}</div>
          <h2>{skillsSection.title}</h2>
          <p className="lead">{skillsSection.lead}</p>
        </Reveal>

        <div className="skills-wrap">
          <Reveal className="skills-col">
            <h3>
              {skillsSection.softwareLabel} <span>{skills.software.length}</span>
            </h3>
            <div className="skill-list">
              {skills.software.map((name, index) => (
                <div className="row" key={name}>
                  <span className="rn">{formatRowNumber(index)}</span>
                  <span className="rv">{name}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="skills-col" delay={1}>
            <h3>
              {skillsSection.certificationsLabel}{" "}
              <span>{skills.certifications.length}</span>
            </h3>
            <div className="skill-list">
              {skills.certifications.map((cert, index) => (
                <div className="row" key={cert.name}>
                  <span className="rn">{formatRowNumber(index)}</span>
                  <span className="rv">
                    {cert.name}
                    {cert.sublabel ? <small>{cert.sublabel}</small> : null}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
