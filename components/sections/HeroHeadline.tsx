import type { CSSProperties } from "react";

const lines = ["Consults,", "not clicks."];

export default function HeroHeadline() {
  return (
    <h1 id="hero-title" aria-label="Consults, not clicks.">
      {lines.map((line, lineIndex) => (
        <span className={`hero-type-line${lineIndex ? " hero-type-accent" : ""}`} aria-hidden="true" key={line}>
          {Array.from(line).map((letter, index) => (
            <span className="hero-type-letter" style={{ "--type-delay": `${0.25 + (lineIndex * 9 + index) * 0.075}s` } as CSSProperties} key={index}>
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
