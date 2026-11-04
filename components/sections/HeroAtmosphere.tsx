"use client";

import { useEffect, useRef } from "react";

/** A locally rendered halftone field: no video download or external service. */
export default function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;
    let previous = 0;
    let inView = true;
    let disposed = false;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const paths = Array.from({ length: 8 }, () => new Path2D());
      const spacing = Math.max(width < 600 ? 8 : 7, Math.sqrt(width * height / 22000));
      for (let x = -spacing; x < width + spacing; x += spacing) {
        const u = x / width;
        // Broad, overlapping ribbons drift across a finer fabric-like wave.
        const ridge = .38 + .25 * Math.sin(u * 5.6 + time * .22);
        const second = .7 + .22 * Math.cos(u * 5 - time * .18);
        for (let y = -spacing; y < height + spacing; y += spacing) {
          const v = y / height;
          const a = Math.exp(-Math.pow((v - ridge) / .2, 2));
          const b = Math.exp(-Math.pow((v - second) / .16, 2));
          const weave = .7 + .3 * Math.sin(u * 13 + v * 9 + time * .3);
          const intensity = Math.min(1, (a * .8 + b * .65) * weave);
          if (intensity < .045) continue;
          const px = x + Math.sin(v * 9 + time * .18) * 7;
          const py = y + Math.sin(u * 8 - time * .2) * 9;
          const radius = .35 + intensity * 1.35;
          const path = paths[Math.min(7, Math.floor(intensity * 8))];
          path.moveTo(px + radius, py);
          path.arc(px, py, radius, 0, Math.PI * 2);
        }
      }
      paths.forEach((path, index) => {
        context.fillStyle = `rgba(${110 + index * 9}, ${183 + index * 8}, ${190 + index * 7}, ${.08 + index * .055})`;
        context.fill(path);
      });
    };

    const tick = (now: number) => {
      frame = 0;
      if (disposed || motion.matches || !inView || document.hidden) return;
      if (!previous || now - previous >= 1000 / 30) {
        if (previous) time += Math.min((now - previous) / 1000, .1);
        previous = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (motion.matches) { time = 0; draw(); }
      else if (inView && !document.hidden && !disposed) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(host);
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    viewObserver.observe(host);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    resize();
    update();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return <div className="hero-atmosphere" aria-hidden="true"><canvas ref={canvasRef} className="hero-dot-field" /></div>;
}
