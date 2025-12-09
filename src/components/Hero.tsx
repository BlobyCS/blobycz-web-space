import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TypingEffect from "./TypingEffect";
import { ArrowDown, Sparkles } from "lucide-react";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 px-6 lg:px-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto w-full relative z-10">
        <div className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Dostupný pro nové projekty
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4 mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
              <span className="gradient-text">Bloby</span>
              <span className="text-foreground">CZ</span>
            </h1>
            <div className="text-2xl sm:text-3xl md:text-4xl font-light text-muted-foreground">
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
              <span className="text-primary animate-pulse">_</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            Vytvářím moderní Discord boty, Minecraft pluginy a webové aplikace. 
            Čistý kód, spolehlivost a skvělá komunikace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#projects" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl hover:scale-105 transition-all duration-300 glow"
            >
              Prohlédnout projekty
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-border font-semibold rounded-2xl hover:bg-secondary hover:border-primary/30 transition-all duration-300"
            >
              Kontaktovat
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 mt-16 border-t border-border/50">
            {[
              { value: "2+", label: "Roky vývoje" },
              { value: "10+", label: "Dokončených projektů" },
              { value: "100%", label: "Spokojenost klientů" },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-4xl md:text-5xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
