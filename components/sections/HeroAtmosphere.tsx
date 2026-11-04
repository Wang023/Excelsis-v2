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
      const spacing = Math.max(width < 600 ? 3.8 : 4.5, Math.sqrt(width * height / 56000));
      for (let x = -spacing; x < width + spacing; x += spacing) {
        const u = x / width;
        for (let y = -spacing; y < height + spacing; y += spacing) {
          const v = y / height;
          // A warped interference field creates broad organic islands and
          // dark channels, rather than separate, evenly spaced sine ribbons.
          const warp = Math.sin(v * 5.2 + time * .14) * .95;
          const field = Math.sin(u * 6.1 + v * 3.2 + warp - time * .13)
            + .72 * Math.cos(v * 5.8 - u * 2.2 + time * .11);
          const level = Math.max(0, Math.min(1, (field + .55) / 1.75));
          const envelope = level * level * (3 - 2 * level);
          // Stable fine grain adds the reference's woven halftone texture.
          const grain = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
          const noise = grain - Math.floor(grain);
          const intensity = Math.max(0, Math.min(1, envelope * (.65 + noise * .5)));
          if (intensity < .035) continue;
          const px = x + Math.sin(v * 7 + u * 3 + time * .12) * 2.5;
          const py = y + Math.sin(u * 6 - v * 2 - time * .11) * 3;
          const radius = .3 + intensity * spacing * .29;
          const path = paths[Math.min(7, Math.floor(intensity * 8))];
          path.moveTo(px + radius, py);
          path.arc(px, py, radius, 0, Math.PI * 2);
        }
      }
      paths.forEach((path, index) => {
        context.fillStyle = `rgba(${116 + index * 8}, ${184 + index * 8}, ${188 + index * 6}, ${.1 + index * .075})`;
        context.fill(path);
      });
    };

    const tick = (now: number) => {
      frame = 0;
      if (disposed || motion.matches || !inView || document.hidden) return;
      if (!previous || now - previous >= 1000 / 24) {
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
