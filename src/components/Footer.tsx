import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#photography", label: "Vision" },
  { href: "#work", label: "Built Work" },
  { href: "#top", label: "↑ Top" },
];

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <Reveal className="foot-big">
          {profile.name.script} {profile.name.display}
          <b>Architect &amp; Image-maker</b>
        </Reveal>
        <Reveal className="foot-row" delay={1}>
          <div className="mono">
            {profile.footer.blurb.map((line, i) => (
              <span key={i}>
                {line}
                {i < profile.footer.blurb.length - 1 ? <br /> : null}
              </span>
            ))}
          </div>
          <div className="foot-links">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
        <div className="mono" style={{ marginTop: 40, color: "var(--ink-3)" }}>
          {profile.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
