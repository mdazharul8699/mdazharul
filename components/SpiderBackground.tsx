"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number; // অরিজিনাল পজিশন মনে রাখার জন্য
  baseY: number;
}

export default function SpiderBackground({ showLines = true }: { showLines?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    // মাউসের অবস্থান ট্র্যাকিং
    const mouse = { x: -2000, y: -2000, radius: 150 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    function init() {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const density = isMobile ? 12000 : 8000; 
      const particleCount = Math.min(
        Math.floor((canvas!.width * canvas!.height) / density), 
        isMobile ? 50 : 120
      );
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas!.width;
        const y = Math.random() * canvas!.height;
        particles.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: isMobile ? 1.5 : 2.5,
        });
      }
    }

    const animate = () => {
      ctx.fillStyle = `${theme.color}10`; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(5, 5, 5, 0.2)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // --- মাউস রিপালশন লজিক ---
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          // মাউস থেকে দূরে ঠেলে দেওয়ার বেগ
          p.x -= directionX * force * 5; 
          p.y -= directionY * force * 5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // স্ক্রিনের বাইরে গেলে বাউন্স করা
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.shadowBlur = 10;
        ctx.shadowColor = theme.color;
        ctx.fillStyle = theme.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (showLines) {
        const isMobile = window.innerWidth < 768;
        const limit = isMobile ? 130 : 190;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < limit) {
              ctx.beginPath();
              ctx.strokeStyle = theme.color;
              ctx.globalAlpha = (1 - dist / limit) * 0.5; 
              ctx.lineWidth = 0.6;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    // মাউস মুভমেন্ট ইভেন্ট লিসেনার
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // মাউস স্ক্রিনের বাইরে গেলে পজিশন রিসেট
    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme.color, showLines]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full block touch-none" 
    />
  );
}