"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;

    // Reveal the outer section only, so nested sections never fade twice.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"))
      .filter((section) => !section.parentElement?.closest("section"));
    const reveal = (section: HTMLElement) => {
      section.classList.remove("scroll-reveal-pending");
      observer.unobserve(section);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      });
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

    sections.forEach((section) => {
      // Keep the initial view visible, and enhance only content below it.
      if (section.getBoundingClientRect().top >= window.innerHeight) {
        section.classList.add("scroll-reveal", "scroll-reveal-pending");
        observer.observe(section);
      }
    });

    const showAll = () => sections.forEach(reveal);
    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      if (target instanceof Element) {
        const section = target.closest<HTMLElement>(".scroll-reveal-pending");
        if (section) reveal(section);
      }
    };
    motion.addEventListener("change", showAll);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", showAll);
      document.removeEventListener("focusin", onFocus);
      sections.forEach((section) => section.classList.remove("scroll-reveal", "scroll-reveal-pending"));
    };
  }, [pathname]);

  return null;
}
