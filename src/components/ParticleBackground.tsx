import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ParticleConfig {
  count: number;
  maxSpeed: number;
  minSize: number;
  maxSize: number;
  minOpacity: number;
  maxOpacity: number;
  connectionDistance: number;
  connectionOpacity: number;
  color: string;
}

const DEFAULT_CONFIG: ParticleConfig = {
  count: 50,
  maxSpeed: 0.5,
  minSize: 1,
  maxSize: 3,
  minOpacity: 0.1,
  maxOpacity: 0.6,
  connectionDistance: 150,
  connectionOpacity: 0.15,
  color: "167, 139, 250", // Purple in RGB
};

const ParticleBackground = ({ config = DEFAULT_CONFIG }: { config?: Partial<ParticleConfig> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const fullConfig = { ...DEFAULT_CONFIG, ...config };

  const createParticle = useCallback((width: number, height: number): Particle => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * fullConfig.maxSpeed,
      vy: (Math.random() - 0.5) * fullConfig.maxSpeed,
      size: Math.random() * (fullConfig.maxSize - fullConfig.minSize) + fullConfig.minSize,
      opacity: Math.random() * (fullConfig.maxOpacity - fullConfig.minOpacity) + fullConfig.minOpacity,
    };
  }, [fullConfig]);

  const initializeParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from(
      { length: fullConfig.count },
      () => createParticle(width, height)
    );
  }, [fullConfig.count, createParticle]);

  const updateParticle = useCallback((particle: Particle, width: number, height: number) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Wrap around edges
    if (particle.x < 0) particle.x = width;
    else if (particle.x > width) particle.x = 0;
    
    if (particle.y < 0) particle.y = height;
    else if (particle.y > height) particle.y = 0;
  }, []);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${fullConfig.color}, ${particle.opacity})`;
    ctx.fill();
  }, [fullConfig.color]);

  const drawConnection = useCallback((
    ctx: CanvasRenderingContext2D,
    p1: Particle,
    p2: Particle,
    distance: number
  ) => {
    const opacity = fullConfig.connectionOpacity * (1 - distance / fullConfig.connectionDistance);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgba(${fullConfig.color}, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }, [fullConfig]);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current;
    const maxDist = fullConfig.connectionDistance;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const distance = Math.sqrt(distSq);
          drawConnection(ctx, p1, p2, distance);
        }
      }
    }
  }, [fullConfig.connectionDistance, drawConnection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      initializeParticles(innerWidth, innerHeight);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        updateParticle(particle, width, height);
        drawParticle(ctx, particle);
      });

      // Draw connections
      drawConnections(ctx);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initializeParticles, updateParticle, drawParticle, drawConnections]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-30 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
