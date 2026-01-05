import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TypingEffect from "./TypingEffect";
import { ArrowDown, Sparkles } from "lucide-react";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto w-full relative z-10">
        <div className={`space-y-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm text-foreground font-medium">
              Připraven na spolupráci
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">Bloby</span>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">CZ</span>
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
              <span className="inline-block w-1 h-8 md:h-10 bg-primary ml-2 animate-pulse rounded-full" />
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Vytvářím <span className="text-foreground font-medium">Discord boty</span> a <span className="text-foreground font-medium">Minecraft pluginy</span> s čistým kódem a moderním přístupem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#projects" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Zobrazit projekty
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary border border-border font-semibold rounded-xl hover:bg-secondary/80 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Kontaktovat
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 pt-16 mt-8">
            <div className="relative">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="pt-8">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">2+</div>
                <div className="text-sm text-muted-foreground mt-2 font-medium">Roky zkušeností</div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="pt-8">
                <div className="text-4xl md:text-5xl font-bold">10+</div>
                <div className="text-sm text-muted-foreground mt-2 font-medium">Projektů</div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="pt-8">
                <div className="text-4xl md:text-5xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground mt-2 font-medium">Spolehlivost</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
