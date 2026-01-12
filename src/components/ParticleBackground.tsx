import { useEffect, useRef, useMemo } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
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
  maxSpeed: 0.4,
  minSize: 1,
  maxSize: 3,
  minOpacity: 0.2,
  maxOpacity: 0.6,
  connectionDistance: 150,
  connectionOpacity: 0.15,
  color: "74, 222, 128",
};

const ParticleBackground = ({ config }: { config?: Partial<ParticleConfig> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  
  const fullConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const createParticle = (width: number, height: number): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * fullConfig.maxSpeed,
      vy: (Math.random() - 0.5) * fullConfig.maxSpeed,
      size: Math.random() * (fullConfig.maxSize - fullConfig.minSize) + fullConfig.minSize,
      opacity: Math.random() * (fullConfig.maxOpacity - fullConfig.minOpacity) + fullConfig.minOpacity,
      pulseSpeed: 0.02 + Math.random() * 0.02,
      pulseOffset: Math.random() * Math.PI * 2,
    });

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      particlesRef.current = Array.from(
        { length: fullConfig.count },
        () => createParticle(innerWidth, innerHeight)
      );
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      timeRef.current += 1;

      const particles = particlesRef.current;
      const maxDist = fullConfig.connectionDistance;
      const maxDistSq = maxDist * maxDist;

      // Update and draw particles
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        else if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        else if (particle.y > height) particle.y = 0;

        // Pulsing effect
        const pulse = Math.sin(timeRef.current * particle.pulseSpeed + particle.pulseOffset);
        const currentOpacity = particle.opacity * (0.7 + 0.3 * pulse);
        const currentSize = particle.size * (0.9 + 0.1 * pulse);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${fullConfig.color}, ${currentOpacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const distance = Math.sqrt(distSq);
            const opacity = fullConfig.connectionOpacity * (1 - distance / maxDist);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${fullConfig.color}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [fullConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-40 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
