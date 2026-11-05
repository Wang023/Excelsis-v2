"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 400);
    const initial = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return <button
    type="button"
    className={`back-to-top${visible ? " is-visible" : ""}`}
    aria-label="Back to top"
    title="Back to top"
    disabled={!visible}
    onClick={() => {
      document.querySelector<HTMLElement>(".revival-header .logo")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }}
  ><ArrowUp size={21} aria-hidden="true" /></button>;
}
