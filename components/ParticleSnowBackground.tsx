"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
  orbit: number;
};

export function ParticleSnowBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const surface = canvas;
    const ctx = context;
    const pointer = { x: -9999, y: -9999 };
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function seedParticles() {
      particles.length = 0;
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 36 : Math.min(94, Math.floor((width * height) / 18000));

      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.22),
          vy: 0.08 + Math.random() * (isMobile ? 0.12 : 0.2),
          size: 0.8 + Math.random() * (isMobile ? 1.3 : 2.1),
          alpha: 0.22 + Math.random() * 0.42,
          hue: Math.random() > 0.62 ? 184 : 255,
          orbit: Math.random() * Math.PI * 2
        });
      }
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      surface.width = Math.floor(width * ratio);
      surface.height = Math.floor(height * ratio);
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      seedParticles();
    }

    function drawParticle(particle: Particle) {
      const color =
        particle.hue === 184
          ? `rgba(184, 140, 255, ${particle.alpha})`
          : `rgba(255, 255, 255, ${particle.alpha * 0.72})`;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.shadowColor = particle.hue === 184 ? "rgba(184, 140, 255, 0.55)" : "rgba(255,255,255,0.36)";
      ctx.shadowBlur = particle.size * 5;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (particle.size > 1.8) {
        ctx.strokeStyle = `rgba(184, 140, 255, ${particle.alpha * 0.28})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particle.x - particle.size * 2.4, particle.y);
        ctx.lineTo(particle.x + particle.size * 2.4, particle.y);
        ctx.moveTo(particle.x, particle.y - particle.size * 2.4);
        ctx.lineTo(particle.x, particle.y + particle.size * 2.4);
        ctx.stroke();
      }
    }

    function tick() {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const repelRadius = window.innerWidth < 768 ? 74 : 128;

        if (!reduceMotion && distance < repelRadius && distance > 0.01) {
          const force = (1 - distance / repelRadius) * 1.65;
          particle.vx += (dx / distance) * force * 0.08;
          particle.vy += (dy / distance) * force * 0.08;
        }

        if (!reduceMotion) {
          particle.orbit += 0.01;
          particle.x += particle.vx + Math.sin(frame * 0.006 + particle.orbit) * 0.08;
          particle.y += particle.vy;
          particle.vx *= 0.986;
          particle.vy *= 0.992;
        }

        if (particle.y > height + 18) particle.y = -18;
        if (particle.x < -18) particle.x = width + 18;
        if (particle.x > width + 18) particle.x = -18;

        drawParticle(particle);
      }

      animationId = window.requestAnimationFrame(tick);
    }

    function handlePointerMove(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    function handlePointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    resize();
    tick();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-75 mix-blend-screen"
    />
  );
}
