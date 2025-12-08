import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TypingEffect from "./TypingEffect";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 px-6 lg:px-12 relative overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto w-full relative z-10">
        <div className={`space-y-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Available for work
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              BlobyCZ
            </h1>
            <div className="text-xl sm:text-2xl text-muted-foreground">
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
              <span className="animate-pulse">|</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Vytvářím Discord boty a Minecraft pluginy s čistým kódem a moderním přístupem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Zobrazit projekty
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Kontaktovat
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 pt-12 mt-8 border-t border-border">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">2+</div>
              <div className="text-sm text-muted-foreground mt-1">Roky zkušeností</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">10+</div>
              <div className="text-sm text-muted-foreground mt-1">Projektů</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Spolehlivost</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
