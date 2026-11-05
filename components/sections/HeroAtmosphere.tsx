"use client";

import { useEffect, useRef } from "react";
import { fragmentShader, vertexShader } from "./ditherShaders";

// Preserve the supplied shader's motion, noise scale and two-pixel Bayer cells.
const settings = { speed: 0.08, scale: 0.8, pxSize: 2 };

export default function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false });
    if (!gl) return; // The CSS dither texture remains visible without WebGL.

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    const shaders: WebGLShader[] = [];
    let timeUniform: WebGLUniformLocation | null = null;
    let resolutionUniform: WebGLUniformLocation | null = null;
    let ratioUniform: WebGLUniformLocation | null = null;
    let frame = 0;
    let elapsed = 0;
    let last = 0;
    let visible = true;
    let disposed = false;

    const release = () => {
      shaders.splice(0).forEach((shader) => gl.deleteShader(shader));
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      buffer = null;
      program = null;
    };
    const initialize = () => {
      release();
      try {
        program = gl.createProgram();
        if (!program) throw new Error("Unable to create shader program");
        for (const [type, source] of [[gl.VERTEX_SHADER, vertexShader], [gl.FRAGMENT_SHADER, fragmentShader]] as const) {
          const shader = gl.createShader(type);
          if (!shader) throw new Error("Unable to create shader");
          shaders.push(shader);
          gl.shaderSource(shader, source);
          gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation failed");
          gl.attachShader(program, shader);
        }
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader link failed");
        gl.useProgram(program);
        buffer = gl.createBuffer();
        if (!buffer) throw new Error("Unable to create shader buffer");
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "a_pos");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        const uniform = (name: string) => gl.getUniformLocation(program!, name);
        timeUniform = uniform("u_time");
        resolutionUniform = uniform("u_resolution");
        ratioUniform = uniform("u_pixelRatio");
        const style = getComputedStyle(document.documentElement);
        const rgb = (name: string, fallback: string) => {
          const hex = style.getPropertyValue(name).trim() || fallback;
          const value = parseInt(hex.replace("#", ""), 16);
          return [(value >> 16 & 255) / 255, (value >> 8 & 255) / 255, (value & 255) / 255];
        };
        gl.uniform3fv(uniform("u_colorBack"), rgb("--dither-bg", "#14213D"));
        gl.uniform3fv(uniform("u_colorFront"), rgb("--dither-front", "#7A3A4A"));
        gl.uniform1f(uniform("u_scale"), settings.scale);
        gl.uniform1f(uniform("u_pxSize"), settings.pxSize);
        canvas.dataset.renderer = "webgl";
        return true;
      } catch (error) {
        console.warn("Dither background is using its static fallback:", error);
        release();
        canvas.dataset.renderer = "fallback";
        return false;
      }
    };
    const draw = () => {
      if (!program || gl.isContextLost()) return;
      gl.useProgram(program);
      gl.uniform1f(timeUniform, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const resize = () => {
      if (!program || gl.isContextLost()) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform1f(ratioUniform, ratio);
      draw();
    };
    const tick = (now: number) => {
      frame = 0;
      if (disposed || motion.matches || !visible || document.hidden || gl.isContextLost()) return;
      if (last) elapsed += Math.min((now - last) / 1000, .1) * settings.speed;
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (disposed || !program || gl.isContextLost()) return;
      draw();
      if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const lost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      canvas.dataset.renderer = "fallback";
    };
    const restored = () => {
      if (!disposed && initialize()) { resize(); update(); }
    };

    if (!initialize()) return;
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    viewObserver.observe(canvas);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    canvas.addEventListener("webglcontextlost", lost);
    canvas.addEventListener("webglcontextrestored", restored);
    resize();
    update();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restored);
      release();
    };
  }, []);

  return <div className="hero-atmosphere" aria-hidden="true"><canvas ref={canvasRef} className="hero-dot-field" data-renderer="fallback" /></div>;
}
