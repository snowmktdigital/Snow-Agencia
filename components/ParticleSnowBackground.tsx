"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVX: number;
  baseVY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  hue: number;
  drift: number;
  phase: number;
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
    let isMobile = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function createParticle(yPosition = Math.random() * height): Particle {
      const largeFlake = Math.random() > (isMobile ? 0.86 : 0.78);
      const size = largeFlake
        ? 1.9 + Math.random() * (isMobile ? 1.2 : 2.2)
        : 0.55 + Math.random() * (isMobile ? 1.25 : 1.85);
      const baseVY = 0.45 + Math.random() * (isMobile ? 0.55 : 0.92);
      const baseVX = (Math.random() - 0.5) * (isMobile ? 0.12 : 0.2);
      const targetAlpha = 0.18 + Math.random() * (largeFlake ? 0.42 : 0.32);

      return {
        x: Math.random() * width,
        y: yPosition,
        vx: baseVX,
        vy: baseVY,
        baseVX,
        baseVY,
        size,
        alpha: targetAlpha,
        targetAlpha,
        hue: Math.random() > 0.5 ? 184 : 255,
        drift: 0.4 + Math.random() * 1.45,
        phase: Math.random() * Math.PI * 2
      };
    }

    function seedParticles() {
      particles.length = 0;
      isMobile = window.innerWidth < 768;
      const count = isMobile ? 52 : Math.min(148, Math.floor((width * height) / 12200));

      for (let index = 0; index < count; index += 1) {
        particles.push(createParticle(Math.random() * height));
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
      const twinkle = 0.75 + Math.sin(frame * 0.018 + particle.phase) * 0.25;
      const alpha = Math.min(0.72, particle.alpha * twinkle);
      const color =
        particle.hue === 184
          ? `rgba(184, 140, 255, ${alpha})`
          : `rgba(255, 255, 255, ${alpha * 0.76})`;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.shadowColor = particle.hue === 184 ? "rgba(184, 140, 255, 0.62)" : "rgba(255,255,255,0.42)";
      ctx.shadowBlur = particle.size * 6.5;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (particle.size > 2) {
        ctx.strokeStyle = `rgba(184, 140, 255, ${alpha * 0.34})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particle.x - particle.size * 2.4, particle.y);
        ctx.lineTo(particle.x + particle.size * 2.4, particle.y);
        ctx.moveTo(particle.x, particle.y - particle.size * 2.4);
        ctx.lineTo(particle.x, particle.y + particle.size * 2.4);
        ctx.moveTo(particle.x - particle.size * 1.7, particle.y - particle.size * 1.7);
        ctx.lineTo(particle.x + particle.size * 1.7, particle.y + particle.size * 1.7);
        ctx.moveTo(particle.x + particle.size * 1.7, particle.y - particle.size * 1.7);
        ctx.lineTo(particle.x - particle.size * 1.7, particle.y + particle.size * 1.7);
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
        const repelRadius = isMobile ? 78 : 142;

        if (!reduceMotion && distance < repelRadius && distance > 0.01) {
          const force = (1 - distance / repelRadius) * 2.18;
          particle.x += (dx / distance) * force * 1.2;
          particle.y += (dy / distance) * force * 0.82;
          particle.vx += (dx / distance) * force * 0.12;
          particle.vy += (dy / distance) * force * 0.06;
        }

        if (!reduceMotion) {
          const drift = Math.sin(frame * 0.01 + particle.phase) * particle.drift * 0.28;
          particle.x += particle.vx + drift;
          particle.y += particle.vy;
          particle.vx += (particle.baseVX - particle.vx) * 0.012;
          particle.vy += (particle.baseVY - particle.vy) * 0.018;
          particle.alpha += (particle.targetAlpha - particle.alpha) * 0.02;
        }

        if (particle.y > height + 28) {
          Object.assign(particle, createParticle(-28 - Math.random() * 90));
        }
        if (particle.x < -28) particle.x = width + 28;
        if (particle.x > width + 28) particle.x = -28;

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
      className="pointer-events-none fixed inset-0 z-0 opacity-85 mix-blend-screen"
    />
  );
}
