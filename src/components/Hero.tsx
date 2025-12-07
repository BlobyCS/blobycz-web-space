import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TypingEffect from "./TypingEffect";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Large decorative text */}
      <div className="absolute top-1/4 right-0 text-[20vw] font-bold text-foreground/[0.02] leading-none select-none pointer-events-none">
        DEV
      </div>

      <div ref={ref} className="max-w-7xl mx-auto w-full relative z-10">
        <div className={`space-y-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary animate-pulse" />
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Available for work
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85]">
              <span className="block">BLOBY</span>
              <span className="block neon-text">CZ</span>
            </h1>
          </div>

          {/* Role with Typing */}
          <div className="flex items-center gap-4 border-l-4 border-primary pl-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-mono text-foreground/80">
              <span className="text-primary">{">"}</span>{" "}
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
              <span className="terminal-cursor" />
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-sans">
            Vytvářím Discord boty a Minecraft pluginy s čistým kódem a moderním přístupem. 
            Zaměřuji se na výkon, škálovatelnost a uživatelský zážitek.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#projects" className="brutal-button inline-block text-center">
              Projekty
            </a>
            <a href="#contact" className="brutal-outline inline-block text-center">
              Kontakt
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t-2 border-border mt-12">
            <div>
              <div className="text-4xl md:text-5xl font-bold neon-text">2+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Roky exp.</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold">10+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Projektů</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Spolehlivost</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <ArrowDown className="w-4 h-4 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
