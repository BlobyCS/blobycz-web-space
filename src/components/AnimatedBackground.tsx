import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Dynamic gradient that follows mouse */}
      <div 
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Main morphing blob - top center */}
        <div 
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full blur-[180px] opacity-50 animate-morph"
          style={{ 
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.2))',
            animationDuration: '12s' 
          }} 
        />
        
        {/* Secondary blob - right */}
        <div 
          className="absolute top-1/4 -right-40 w-[700px] h-[700px] rounded-full blur-[160px] opacity-40 animate-blob"
          style={{ 
            background: 'linear-gradient(225deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.15))',
            animationDuration: '15s',
            animationDelay: '2s'
          }}
        />
        
        {/* Tertiary blob - bottom left */}
        <div 
          className="absolute -bottom-40 -left-40 w-[800px] h-[800px] rounded-full blur-[180px] opacity-35 animate-morph"
          style={{ 
            background: 'linear-gradient(45deg, hsl(var(--accent) / 0.25), hsl(var(--primary) / 0.15))',
            animationDuration: '18s',
            animationDelay: '4s'
          }}
        />

        {/* Central floating orb */}
        <div 
          className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-30 animate-blob"
          style={{ 
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.3), transparent)',
            animationDuration: '20s',
            animationDelay: '1s'
          }}
        />

        {/* Small accent orbs */}
        <div 
          className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full blur-[80px] opacity-40 animate-float"
          style={{ 
            background: 'hsl(var(--primary) / 0.4)',
            animationDuration: '6s'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] rounded-full blur-[100px] opacity-35 animate-float"
          style={{ 
            background: 'hsl(var(--accent) / 0.35)',
            animationDuration: '8s',
            animationDelay: '3s'
          }}
        />
      </div>

      {/* Animated gradient mesh */}
      <div 
        className="fixed inset-0 -z-10 opacity-30 pointer-events-none animate-gradient"
        style={{
          background: `
            linear-gradient(217deg, hsl(var(--primary) / 0.12), transparent 70%),
            linear-gradient(127deg, hsl(var(--accent) / 0.08), transparent 70%),
            linear-gradient(336deg, hsl(var(--primary) / 0.1), transparent 70%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Gradient overlay for depth */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />
    </>
  );
};

export default AnimatedBackground;
