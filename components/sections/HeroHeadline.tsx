import type { CSSProperties } from "react";
import { content } from "@/app/content";

export default function HeroHeadline() {
  return <h1 id="hero-title" aria-label={content.hero.headline}>
    {content.hero.headline.split(" ").map((word, index) => <span
      aria-hidden="true"
      className={`hero-type-word${index === 2 || index === 3 ? " hero-headline-accent" : ""}`}
      style={{ "--type-delay": `${.15 + index * .045}s` } as CSSProperties}
      key={index}
    >{word}{" "}</span>)}
  </h1>;
}
