import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TypingEffect from "./TypingEffect";
import { ArrowDown, Sparkles, Code2, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Parallax Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5 - scrollY * 0.3}px)`,
            transition: 'transform 0.3s ease-out'
          }} 
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-gradient-to-br from-primary/15 to-cyan-500/10 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3 - scrollY * 0.2}px)`,
            transition: 'transform 0.3s ease-out'
          }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-br from-primary/10 to-emerald-500/5 rounded-full blur-3xl"
          style={{ 
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
            transition: 'transform 0.3s ease-out'
          }} 
        />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 right-[15%] w-2 h-2 bg-primary rounded-full animate-float opacity-60"
          style={{ animationDelay: '0s', transform: `translateY(${-scrollY * 0.5}px)` }}
        />
        <div 
          className="absolute top-40 left-[20%] w-3 h-3 bg-primary/50 rounded-full animate-float opacity-40"
          style={{ animationDelay: '1s', transform: `translateY(${-scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-40 right-[25%] w-2 h-2 bg-primary/70 rounded-full animate-float opacity-50"
          style={{ animationDelay: '2s', transform: `translateY(${-scrollY * 0.4}px)` }}
        />
        <Code2 
          className="absolute top-32 right-[10%] w-6 h-6 text-primary/20 animate-float"
          style={{ animationDelay: '0.5s', transform: `translateY(${-scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)` }}
        />
        <Zap 
          className="absolute bottom-32 left-[10%] w-5 h-5 text-primary/20 animate-float"
          style={{ animationDelay: '1.5s', transform: `translateY(${-scrollY * 0.25}px) rotate(${-scrollY * 0.1}deg)` }}
        />
      </div>

      <div 
        ref={ref} 
        className="max-w-6xl mx-auto w-full relative z-10"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className={`space-y-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm hover:bg-primary/15 hover:border-primary/30 transition-all duration-300 cursor-default group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm text-foreground font-medium">
              Připraven na spolupráci
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary group-hover:rotate-12 transition-transform" />
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span 
                className="inline-block bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text hover:from-primary hover:to-primary/70 transition-all duration-500 cursor-default"
                style={{ transform: `translateX(${mousePosition.x * 0.05}px)` }}
              >
                Bloby
              </span>
              <span 
                className="inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent text-glow"
                style={{ transform: `translateX(${-mousePosition.x * 0.05}px)` }}
              >
                CZ
              </span>
            </h1>
            <div className="text-2xl sm:text-3xl md:text-4xl font-medium">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                <TypingEffect 
                  texts={[
                    "Discord Bot Developer",
                    "Java Developer",
                    "TypeScript Enthusiast",
                    "Minecraft Plugin Dev"
                  ]}
                  typingSpeed={80}
                  deletingSpeed={40}
                  delayBetweenTexts={2000}
                />
              </span>
              <span className="inline-block w-1 h-8 md:h-10 bg-primary ml-2 animate-pulse rounded-full glow-sm" />
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Vytvářím <span className="text-foreground font-medium hover:text-primary transition-colors cursor-default">Discord boty</span> a <span className="text-foreground font-medium hover:text-primary transition-colors cursor-default">Minecraft pluginy</span> s čistým kódem a moderním přístupem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#projects" 
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </span>
              <span className="relative z-10">Zobrazit projekty</span>
              <ArrowDown className="relative z-10 w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              <span className="absolute -inset-1 bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="#contact" 
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary border border-border font-semibold rounded-xl overflow-hidden hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Kontaktovat</span>
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 pt-16 mt-8">
            {[
              { value: "2+", label: "Roky zkušeností", gradient: true },
              { value: "10+", label: "Projektů", gradient: false },
              { value: "100%", label: "Spolehlivost", gradient: false },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="relative group cursor-default"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent group-hover:via-primary/50 transition-colors duration-300" />
                <div className="pt-8">
                  <div className={`text-4xl md:text-5xl font-bold group-hover:scale-105 transition-transform duration-300 ${
                    stat.gradient 
                      ? 'bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent' 
                      : 'group-hover:text-primary transition-colors'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 font-medium group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ 
            opacity: Math.max(0, 1 - scrollY / 200),
            transform: `translateX(-50%) translateY(${scrollY * 0.3}px)`
          }}
        >
          <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2 hover:border-primary/50 transition-colors">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;