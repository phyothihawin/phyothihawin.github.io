"use client";
import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (window.innerWidth < 768) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    let stars = [];
    let animationFrameId;

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = [];

      // Create 3D galaxy stars (with Z depth coordinate)
      const isMobile = w < 768;
      const starCount = isMobile ? 50 : Math.min(Math.floor(w * h / 5000), 150);
      const maxDepth = 1000;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: (Math.random() - 0.5) * w * 1.5,
          y: (Math.random() - 0.5) * h * 1.5,
          z: Math.random() * maxDepth,
          radius: Math.random() * 1.2 + 0.4,
          type: Math.random() > 0.5 ? "white" : "blue"
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // Ease mouse offset for smooth parallax
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw rotating 3D stars (galaxy background with depth)
      const maxDepth = 1000;
      const fov = 350; // field of view/perspective strength
      
      for (let i = 0; i < stars.length; i++) {
        let s = stars[i];
        
        // Move stars forward on Z-axis (towards viewer)
        s.z -= 0.6;
        
        // Rotate around center on Z plane
        const angle = 0.0008;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const rx = s.x * cosA - s.y * sinA;
        const ry = s.x * sinA + s.y * cosA;
        s.x = rx;
        s.y = ry;

        // Reset stars that fly past the screen
        if (s.z <= 0) {
          s.z = maxDepth;
          s.x = (Math.random() - 0.5) * w * 1.5;
          s.y = (Math.random() - 0.5) * h * 1.5;
        }

        // 3D Perspective Projection
        const scale = fov / (fov + s.z);
        // Multi-layered mouse parallax (closer stars shift faster than distant stars)
        const x = cx + s.x * scale + mouse.x * (1 - scale) * 3;
        const y = cy + s.y * scale + mouse.y * (1 - scale) * 3;
        const r = s.radius * scale * 2.5;

        // Opacity and twinkle animation based on depth
        const twinkle = Math.sin(Date.now() * 0.0015 + i) * 0.35 + 0.65;
        const alpha = (1 - s.z / maxDepth) * twinkle;

        if (x >= 0 && x <= w && y >= 0 && y <= h) {
          const isDark = document.documentElement.classList.contains("dark");
          const starBaseColor = isDark
            ? (s.type === 'white' ? '255, 255, 255' : '150, 180, 255')
            : (s.type === 'white' ? '80, 80, 80' : '120, 140, 200');
          ctx.fillStyle = `rgba(${starBaseColor}, ${alpha * 0.65})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Glowing Square Graph lines (Coordinate grid)
      if (w < 768) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const gridSize = 60;
      const cols = Math.ceil(w / gridSize) + 1;
      const rows = Math.ceil(h / gridSize) + 1;

      // Mouse global position in canvas
      const mx = cx + mouse.x * 1.5;
      const my = cy + mouse.y * 1.5;

      const isDark = document.documentElement.classList.contains("dark");

      // 1. Draw base glowing square grid across full screen
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let col = 0; col < cols; col++) {
        const x = col * gridSize;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let row = 0; row < rows; row++) {
        const y = row * gridSize;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // 2. Draw intense glowing highlight grid lines near mouse cursor
      const range = 220;
      
      // Draw highlighted vertical lines segments
      for (let col = 0; col < cols; col++) {
        const x = col * gridSize;
        const dx = Math.abs(x - mx);
        if (dx < range) {
          const opacity = (1 - dx / range) * 0.15;
          ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity * 0.5})`;
          ctx.lineWidth = (1 - dx / range) * 1.0;
          ctx.beginPath();
          const startY = Math.max(0, my - Math.sqrt(range * range - dx * dx));
          const endY = Math.min(h, my + Math.sqrt(range * range - dx * dx));
          ctx.moveTo(x, startY);
          ctx.lineTo(x, endY);
          ctx.stroke();
        }
      }

      // Draw highlighted horizontal lines segments
      for (let row = 0; row < rows; row++) {
        const y = row * gridSize;
        const dy = Math.abs(y - my);
        if (dy < range) {
          const opacity = (1 - dy / range) * 0.15;
          ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity * 0.5})`;
          ctx.lineWidth = (1 - dy / range) * 1.0;
          ctx.beginPath();
          const startX = Math.max(0, mx - Math.sqrt(range * range - dy * dy));
          const endX = Math.min(w, mx + Math.sqrt(range * range - dy * dy));
          ctx.moveTo(startX, y);
          ctx.lineTo(endX, y);
          ctx.stroke();
        }
      }

      // Reset shadow effects for performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) * 0.1;
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) * 0.1;
    };

    init();
    draw();

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated glowing ambient nebulae spots */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen z-0 md:animate-pulse-glow"></div>
      <div className="absolute bottom-10 right-10 w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[160px] mix-blend-multiply dark:mix-blend-screen z-0 md:animate-pulse-glow-delayed"></div>
      <div className="absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-zinc-200/20 dark:bg-zinc-800/10 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen z-0 md:animate-pulse-glow"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-100/50 to-zinc-50 dark:from-black/20 dark:via-black/40 dark:to-black/95 z-10 transition-colors duration-300"></div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80 z-10 hidden md:block"></canvas>
    </div>
  );
}
