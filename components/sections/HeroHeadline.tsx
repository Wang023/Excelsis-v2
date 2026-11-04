"use client";

import { useEffect, useState, type CSSProperties } from "react";

const headlines = [
  ["We fill the chair", "You fix a smile"],
  ["We handle the leads", "You bring the Smiles"],
];

export default function HeroHeadline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;
    let arrival = 0;
    const start = () => {
      clearInterval(interval);
      cancelAnimationFrame(arrival);
      if (motion.matches) return;
      // Randomise the first pair, then alternate so neither is repeated.
      arrival = requestAnimationFrame(() => setActive(Math.random() < .5 ? 0 : 1));
      interval = setInterval(() => {
        if (!document.hidden) setActive((previous) => 1 - previous);
      }, 8000);
    };
    start();
    motion.addEventListener("change", start);
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(arrival);
      motion.removeEventListener("change", start);
    };
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
