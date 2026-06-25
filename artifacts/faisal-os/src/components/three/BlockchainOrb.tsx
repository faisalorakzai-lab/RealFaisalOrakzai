import { useEffect, useRef } from "react";

export default function BlockchainOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const mouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Build particles
    const GOLD = "#F3BA2F";
    const GOLD_DIM = "rgba(243,186,47,0.15)";

    interface Particle {
      theta: number; phi: number; r: number; size: number; speed: number; phase: number;
    }

    const particles: Particle[] = Array.from({ length: 180 }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      r: 1.25 + Math.random() * 0.9,
      size: Math.random() * 1.5 + 0.5,
      speed: (Math.random() - 0.5) * 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    // Wireframe lat/lon lines
    const LAT = 12;
    const LON = 18;

    let t = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.004;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2 + (mouse.x - 0.5) * 30;
      const cy = H / 2 + (mouse.y - 0.5) * 20;
      const R = Math.min(W, H) * 0.38;

      const rotX = (mouse.y - 0.5) * 0.3 + t * 0.25;
      const rotY = (mouse.x - 0.5) * 0.4 + t * 0.18;

      const project = (theta: number, phi: number, r = 1) => {
        const x0 = r * Math.sin(phi) * Math.cos(theta);
        const y0 = r * Math.sin(phi) * Math.sin(theta);
        const z0 = r * Math.cos(phi);
        // rotate X
        const y1 = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
        const z1 = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);
        // rotate Y
        const x2 = x0 * Math.cos(rotY) + z1 * Math.sin(rotY);
        const z2 = -x0 * Math.sin(rotY) + z1 * Math.cos(rotY);
        return { sx: cx + x2 * R, sy: cy + y1 * R, depth: z2 };
      };

      // Glow background
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.4);
      grd.addColorStop(0, "rgba(243,186,47,0.06)");
      grd.addColorStop(0.5, "rgba(243,186,47,0.02)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Wireframe latitude lines
      for (let i = 1; i < LAT; i++) {
        const phi = (i / LAT) * Math.PI;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 60; j++) {
          const theta = (j / 60) * Math.PI * 2;
          const { sx, sy, depth } = project(theta, phi);
          const alpha = (depth + 1) / 2;
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(243,186,47,${0.04 + 0.06 * ((i / LAT))})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Wireframe longitude lines
      for (let j = 0; j < LON; j++) {
        const theta = (j / LON) * Math.PI * 2;
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= 40; i++) {
          const phi = (i / 40) * Math.PI;
          const { sx, sy } = project(theta, phi);
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(243,186,47,0.05)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Rings
      const ringConfigs = [
        { tiltX: 0, tiltY: 0, r: 1.02, opacity: 0.5, width: 1.5, speed: 0.4 },
        { tiltX: 0.8, tiltY: 0.3, r: 1.1, opacity: 0.2, width: 0.8, speed: -0.3 },
        { tiltX: -0.5, tiltY: 0.9, r: 1.18, opacity: 0.15, width: 0.6, speed: 0.25 },
      ];

      ringConfigs.forEach(({ tiltX, tiltY, r, opacity, width, speed }) => {
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= 80; i++) {
          const angle = (i / 80) * Math.PI * 2 + t * speed;
          const phi = Math.PI / 2 + Math.sin(angle) * tiltX;
          const theta = angle + tiltY;
          const { sx, sy, depth } = project(theta, phi, r);
          const a = opacity * Math.max(0.1, (depth + 1) / 2);
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(243,186,47,${opacity})`;
        ctx.lineWidth = width;
        ctx.stroke();
      });

      // Nodes on surface
      for (let i = 0; i < 24; i++) {
        const theta = (i / 24) * Math.PI * 2 + t * 0.1;
        const phi = Math.acos(Math.cos((i * 0.618) * Math.PI));
        const { sx, sy, depth } = project(theta, phi, 1.01);
        if (depth < -0.2) continue;
        const a = 0.3 + 0.7 * ((depth + 1) / 2);
        const pulse = 0.5 + 0.5 * Math.sin(t * 3 + i * 0.8);
        ctx.beginPath();
        ctx.arc(sx, sy, 2 + pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243,186,47,${a * pulse})`;
        ctx.fill();
        // glow
        const ng = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
        ng.addColorStop(0, `rgba(243,186,47,${a * 0.3})`);
        ng.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(sx, sy, 8, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();
      }

      // Floating particles
      particles.forEach((p) => {
        p.theta += p.speed + t * 0.001;
        const { sx, sy, depth } = project(p.theta, p.phi, p.r);
        const a = Math.max(0, (depth + 1) / 2) * (0.4 + 0.4 * Math.sin(t * 2 + p.phase));
        ctx.beginPath();
        ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243,186,47,${a})`;
        ctx.fill();
      });

      // Core center glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.3);
      cg.addColorStop(0, "rgba(243,186,47,0.08)");
      cg.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
