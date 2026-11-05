"use client";

import { useEffect, useState, type CSSProperties } from "react";

const headlines = [
  ["We fill the chair", "You fix a smile"],
  ["We handle the leads", "You bring the Smiles"],
];

export default function HeroHeadline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const arrival = requestAnimationFrame(() => {
      let next = Math.random() < .5 ? 0 : 1;
      try {
        const previous = sessionStorage.getItem("excelsis-hero-headline");
        if (previous === "0" || previous === "1") next = 1 - Number(previous);
        sessionStorage.setItem("excelsis-hero-headline", String(next));
      } catch {
        // Random selection still works when browser storage is unavailable.
      }
      setActive(next);
    });
    return () => cancelAnimationFrame(arrival);
  }, []);

  const lines = headlines[active];
  return (
    <h1 id="hero-title" aria-label={lines.join(". ")}>
      {lines.map((line, lineIndex) => (
        <span className={`hero-type-line${lineIndex ? " hero-type-accent" : ""}`} aria-hidden="true" key={line}>
          {Array.from(line).map((letter, index) => (
            <span className="hero-type-letter" style={{ "--type-delay": `${0.2 + ((lineIndex ? lines[0].length : 0) + index) * 0.055}s` } as CSSProperties} key={index}>
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
